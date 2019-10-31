module.exports = {
  appenders: {
    console: {
      type: 'console'
    },
    app: {
      type: 'dateFile',
      filename: `logs/vue-ssr-admin`,
      pattern: '-yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      backups: 5,
      maxLogSize: 10485760,
      compress: true
    }
  },
  categories: {
    default: {
      appenders: ['console', 'app'],
      level: 'debug'  // ['trace', 'debug', 'info', 'warn', 'error', 'fatal', 'mark']
    }
  },
  pm2: true,
  pm2InstanceVar: 'INSTANCE_ID'
}
