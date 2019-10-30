
module.exports = {
	staticHost: '', //http://qcstatic.ppdaicorp.com
	staticPath: '/vue-static',
	proxy: {
		'/api': 'https://www.fastmock.site/',
	},
	prodProxy: {
		'/api': 'https://www.fastmock.site/',
	}
}
