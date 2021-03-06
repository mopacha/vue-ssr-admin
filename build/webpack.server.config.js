const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const base = require('./webpack.base.config')()
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isProd = process.env.NODE_ENV === 'production'

class ServerMiniCssExtractPlugin extends MiniCssExtractPlugin {
	getCssChunkObject(mainChunk) {
		return {}
	}
}

module.exports = function () {
	const config = merge(base, {
		mode: 'production',
		// 指定生成后的运行环境在node
		target: 'node',
		// 设置代码调试map
		devtool: '#cheap-module-source-map',
		// 配置编译的入口文件
		entry: path.join(process.cwd(), 'src/entry-server.js'),
		// 设置输出文件名，并设置模块导出为commonjs2类型
		output: {
			filename: 'server-bundle.js',
			libraryTarget: 'commonjs2'
		},
		resolve: {
			alias: {
				'~http': path.resolve(`src/http/index-server.js`),
			}
		},
		// 外置化应用程序依赖模块。可以使服务器构建速度更快，
		// 并生成较小的 bundle 文件。
		externals: nodeExternals({
			// 不要外置化 webpack 需要处理的依赖模块。
			// 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
			// 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
			whitelist: [/\.vue$/, /\.css$/]
		}),

		module: {
			rules: [
				{
					test: /\.vue$/,
					loader: 'vue-loader',
					options: {
						compilerOptions: {
							preserveWhitespace: false
						},
						loaders: {
							css: [isProd ? ServerMiniCssExtractPlugin.loader : 'vue-style-loader', 'css-loader', 'postcss-loader'],
							stylus: [isProd ? ServerMiniCssExtractPlugin.loader : 'vue-style-loader', 'css-loader', 'postcss-loader',
							{ loader: 'stylus-loader', options: isProd ? {} : { sourceMap: 'inline' } },
							],
							scss: [isProd ? ServerMiniCssExtractPlugin.loader : 'vue-style-loader', 'css-loader', 'postcss-loader',
							{ loader: 'sass-loader', options: isProd ? {} : { sourceMap: true } },
							]
						}
					}
				},
				{
					test: /\.css$/,
					use: [isProd ? ServerMiniCssExtractPlugin.loader : 'vue-style-loader', 'css-loader', 'postcss-loader']
				},
				{
					test: /\.(styl|stylus)$/,
					use: [isProd ? ServerMiniCssExtractPlugin.loader : 'vue-style-loader', 'css-loader', 'postcss-loader',
					{
						loader: 'stylus-loader',
						options: isProd ? {} : { sourceMap: 'inline' }
					}
					]
				},
				{
					test: /\.scss$/,
					use: [isProd ? ServerMiniCssExtractPlugin.loader : 'vue-style-loader', 'css-loader', 'postcss-loader',
					{
						loader: 'sass-loader',
						options: isProd ? {} : { sourceMap: true }
					}
					]
				},
			]
		},

		// 这是将服务器的整个输出
		// 构建为单个 JSON 文件的插件。
		// 默认文件名为 `vue-ssr-server-bundle.json`
		plugins: [
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
				'process.env.VUE_ENV': '"server"'
			}),
			new VueSSRServerPlugin()
		]
	})

	if (isProd) {
		config.plugins = (config.plugins || []).concat([
			// 分离css文件
			new ServerMiniCssExtractPlugin({
				filename: '[name].[chunkhash:8].min.css',
				//chunkFilename: '[name].[chunkhash:8].css',
			})
		])
	}

	return config
}






