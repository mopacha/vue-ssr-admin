const log4js = require('./log4js')

module.exports = {
	appName: "vue-ssr",
	log4js: log4js,
	staticHost: "", //http://static.cdn.com
	staticPath: "/vue-static",
	apiHost: "https://www.fastmock.site" //后端host
}
