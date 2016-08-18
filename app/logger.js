'use strict'

const winston = require('winston')
const fs = require('fs')

const env = process.env.NODE_ENV || 'development'
const logDir = 'logs'

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir)
}

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)(require('winston-console-formatter').config({
      timestamp: () => (new Date()).toLocaleTimeString(),
      level: env === 'development' ? 'debug' : 'info'
    })),
    new (require('winston-daily-rotate-file'))({
      filename: `${logDir}/-winston.log`,
      timestamp: new Date(),
      datePattern: 'yyyy-MM-dd',
      prepend: true,
      level: env === 'development' ? 'verbose' : 'info'
    })
  ]
})

module.exports = logger

// logging level : { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
