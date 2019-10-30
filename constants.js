
module.exports = {
	staticHost: '', //http://qcstatic.ppdaicorp.com
	staticPath: '/vue-static',
  proxy: {
    '/api': 'http://restapi.amap.com/',
  },
  prodProxy: {
    '/api': 'http://restapi.amap.com/',
  }
}
