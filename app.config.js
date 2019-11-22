//app配置
const path = require('path')
const conf = require('./config/default')
const devConf = require('./config/development')
const isProd = process.env.NODE_ENV === 'production'

module.exports = {
	staticHost: isProd ? conf.staticHost : devConf.staticHost,
	staticPath: isProd ? conf.staticPath : devConf.staticPath,
	//webpack的差异化配置
	webpack: {
		entry: {
      app: path.join(__dirname, 'src/app.js'), // 入口
    },
		resolveAlias: {
			// 自定义Alias设置
		}
	},
	appPort: process.env.PORT,//主服务启动端口
	//代理配置，可支持多个代理，key为前缀，命中后，会把前缀去掉，转发到代理服务器
	proxy: {
		'/fastApp': isProd ? conf.apiHost : devConf.apiHost,
		'/waterApp': isProd ? conf.apiHost2 : devConf.apiHost2,
		'/bahasaApp': isProd ? conf.apiHost3 : devConf.apiHost3
	}
}
