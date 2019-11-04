//# koa2开发模式实现hot热更新
const path = require('path')
const MFS = require('memory-fs')
const webpack = require('webpack')
const clientConfig = require('../build/webpack.client.config')
const serverConfig = require('../build/webpack.server.config')
const webpackDevMiddleware = require('koa-webpack-dev-middleware')
const webpackHotMiddleware = require('koa-webpack-hot-middleware')
const convert = require('koa-convert')

const open = require('open')
const readFile = (fs, file) => fs.readFileSync(path.join(clientConfig.output.path, file), 'utf-8')

module.exports = function setupDevServer(app, uri, cb) {
	let bundle
	let template

	const update = () => {
		if (bundle && template) {
			cb(bundle, {
				template,
			})
		}
	}

	//  client
	clientConfig.entry.app = ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true', clientConfig.entry.app]
	clientConfig.output.filename = '[name].js'
	clientConfig.plugins.push(
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	)

	// webpack config
	const clientCompiler = webpack(clientConfig)

	// dev middleware
	const devMiddleware = webpackDevMiddleware(clientCompiler, {
		publicPath: clientConfig.output.publicPath,
		noInfo: true,
		headers: { 'Access-Control-Allow-Origin': '*' },
		stats: {
			colors: true,
		},
		watchOptions: {
			ignored: /node_modules/,
			aggregateTimeout: 300,
			poll: true
		},
	})

	app.use(convert(devMiddleware))

	// hot update
	clientCompiler.hooks.done.tap('BuildStatsPlugin', stats => {

		const fs = devMiddleware.fileSystem
		stats = stats.toJson()
		stats.errors.forEach(err => console.error(err))
		stats.warnings.forEach(err => console.warn(err))
		if (stats.errors.length) return

		console.log('\nclient-dev...\n')

		let filePath = path.join(clientConfig.output.path, 'index.html')
		if (fs.existsSync(filePath)) {
			// 读取内存模板
			template = readFile(fs, 'index.html')
		}
		update()
	})

	// hot middleware
	app.use(convert(webpackHotMiddleware(clientCompiler)))

	// server
	const serverCompiler = webpack(serverConfig)
	const mfs = new MFS()
	serverCompiler.outputFileSystem = mfs
	serverCompiler.watch({}, (err, stats) => {
		if (err) throw err
		stats = stats.toJson()
		if (stats.errors.length) return
		bundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json'))
		update()
	})

	devMiddleware.waitUntilValid(() => {
		console.log('\n> Listening at ' + uri + '\n')
		//open(uri)
	})
}
