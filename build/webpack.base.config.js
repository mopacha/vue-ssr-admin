const path = require('path')
const webpack = require('webpack')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const TimeFixPlugin = require('time-fix-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const appConfig = require('../app.config')

const {
	staticPath,
	staticHost
} = appConfig

const resolveAlias = appConfig.webpack.resolveAlias

const isProd = process.env.NODE_ENV === 'production'
// 版本号
const appVersion = new Date().getTime()
const favicon = path.join(process.cwd(), 'public/favicon.ico')

function resolve(dir) {
	return path.resolve(process.cwd(), dir)
}


module.exports = function () {
	const config = {
		devtool: isProd ? false : '#cheap-module-source-map',
		optimization: {
			minimizer: [
				// 自定义js优化配置，
				new TerserPlugin({
					terserOptions: {
						cache: true,
						parallel: true, // 开启并行压缩，充分利用cpu
						sourceMap: true,
						extractComments: true, // 移除注释
						compress: {
							unused: true,
							warnings: false,
							drop_debugger: true
						},
						output: {
							comments: false,
							ascii_only: true
						}
					}
				}),
				// 用于优化css文件
				new OptimizeCssAssetsPlugin({
					assetNameRegExp: /\.css$/g,
					cssProcessor: require('cssnano'),
					cssProcessorOptions: {
						safe: true,
						autoprefixer: { disable: true }, 	// postcss那边已经处理过autoprefixer了，这里把它关掉，否则会导致浏览器前缀兼容范围问题
						mergeLonghand: false,
						discardComments: {
							removeAll: true // 移除注释
						}
					},
					canPrint: true
				})
			]
		},
		// 输出模块配置
		output: {
			// 输出到这个目录下
			path: resolve(`dist${staticPath}/`),
			// 生成的文件名, [name] 即为entry配置中的key
			filename: '[name].[chunkhash:8].js',
			// 异步模块文件名
			//chunkFilename: '[id].[chunkhash:8].js',
			publicPath: `${staticHost}${staticPath}/`
		},

		// 寻找模块时的一些缺省设置
		resolve: {
			// 补充扩展名
			extensions: ['.js', '.vue', '.json'],
			// 别名，可以直接使用别名来代表设定的路径以及其他
			alias: Object.assign({}, resolveAlias, {
				'vue': 'vue/dist/vue.esm.js',
				'@': resolve('src'),
			})
		},

		module: {
			unknownContextCritical: false,
			noParse: /es6-promise\.js$/, // avoid webpack shimming process
			rules: [
				{
					test: /\.js$/,
					use: {
						loader: 'babel-loader'
					},
					exclude: /node_modules/,
				},

				{
					test: /\.json$/,
					use: 'json-loader',
				},
				{
					test: /\.svg$/,
					loader: 'svg-sprite-loader',
					include: [resolve('src/icons')],
					options: {
						symbolId: 'icon-[name]'
					}
				},
				{
					test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
					loader: 'url-loader',
					exclude: [resolve('src/icons')],
					options: {
						limit: 10000,
						name: 'images/[name].[hash:8].[ext]'
					}
				},

				{
					test: /\.(woff|woff2|eot|ttf)(\?.*)?$/,
					loader: 'url-loader',
					options: {
						limit: 10000,
						name: 'fonts/[name].[hash:8].[ext]'
					}
				}
			]
		},

		performance: {
			maxEntrypointSize: 300000,
			hints: false
		},

		plugins: [
			// 由于mac不区分大小写，linux区分大小写，可能导致mac上正常，在部署时出错，所以强制区分大小写
			new CaseSensitivePathsPlugin(),
			// 读取HTML模板文件，并输出HTML文件，开发环境实际输出到内存中
			new HtmlWebpackPlugin({
				appVersion,
				favicon,
				filename: 'index.html',
				template: path.join(process.cwd(), 'src/index.template.ejs'),
				inject: !isProd,
			}),
			new FriendlyErrorsPlugin(),
			new VueLoaderPlugin(),
			//new webpack.optimize.LimitChunkCountPlugin({
			//  maxChunks: 1
			//})
		],
	}

	if (isProd) {
		config.plugins = (config.plugins || []).concat([
			// 限制文件最小KB
			//new webpack.optimize.MinChunkSizePlugin({
			//  minChunkSize: 20000
			// }),
		])
	} else {
		config.plugins = (config.plugins || []).concat([
			new webpack.NamedModulesPlugin(),
			new TimeFixPlugin(),
			new ProgressBarPlugin()
		])
	}

	return config
}
