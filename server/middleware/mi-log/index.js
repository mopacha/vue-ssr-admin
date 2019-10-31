const log4js = require('log4js')
const config = require('config')
const log4jsConf = config.log4js

module.exports = () => {
  let appName = config.appName
  log4js.configure(log4jsConf)
  return async (ctx, next) => {
    const logger =log4js.getLogger(appName)
    ctx.log = logger
    await next()
  }
}
