const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const base = require('./webpack.base.config')()
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
//const Smp = new SpeedMeasurePlugin()
const isProd = process.env.NODE_ENV === 'production'

module.exports = function () {
	const config = merge(base, {
		entry: {
			app: path.join(process.cwd(), 'src/entry-client.js'),
		},
		resolve: {
			alias: {
				'~http': path.resolve(`src/http/index-client.js`),
			}
		},
		optimization: {
			splitChunks: {
				chunks: "all",
				cacheGroups: {
					vendors: {
						name: "vendors-chunk",
						test: /[\\/]node_modules[\\/]/,
						priority: 5,
						chunks: "initial" // 只打包初始时依赖的第三方
					},
					elementUI: {
						name: "elementUI-chunk", // 单独将 elementUI 拆包
						priority: 10, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
						test: /[\\/]node_modules[\\/]element-ui[\\/]/
					},
					commons: {
						name: "commons-chunk",
						test: path.resolve(process.cwd(), 'src/components'), // 可自定义拓展你的规则
						minChunks: 2, // 最小共用次数
						priority: 2,
						reuseExistingChunk: true
					}
				}
			}
		},
		mode: isProd ? 'production' : 'development',

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
							css: [isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader', 'css-loader', 'postcss-loader'],
							stylus: [isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader', 'css-loader', 'postcss-loader',
							{ loader: 'stylus-loader', options: isProd ? {} : { sourceMap: 'inline' } },
							],
							scss: [isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader', 'css-loader', 'postcss-loader',
							{ loader: 'sass-loader', options: isProd ? {} : { sourceMap: true } },
							]
						}
					}
				},
				{
					test: /\.css$/,
					use: [isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader', 'css-loader', 'postcss-loader']
				},
				{
					test: /\.(styl|stylus)$/,
					use: [isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader', 'css-loader', 'postcss-loader',
					{
						loader: 'stylus-loader',
						options: isProd ? {} : { sourceMap: 'inline' }
					}
					]
				},
				{
					test: /\.scss$/,
					use: [isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader', 'css-loader', 'postcss-loader',
					{
						loader: 'sass-loader',
						options: isProd ? {} : { sourceMap: true }
					}
					]
				},
			]

		},

		plugins: [
			// strip dev-only code in Vue source
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
				'process.env.VUE_ENV': '"client"'
			}),
			new VueSSRClientPlugin()
		]
	})


	if (isProd) {
		config.plugins = (config.plugins || []).concat([
			// 分离css文件
			new MiniCssExtractPlugin({
				filename: '[name].[chunkhash:8].min.css',
				//chunkFilename: '[name].[chunkhash:8].css',
			})
		])
	}
	//Smp.wrap(config)
	return config
}
