'use strict';
const winston = require('winston');
const fs = require('fs');
const env = process.env.NODE_ENV || 'development';
const logDir = 'log';

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}
const tsFormat = () => (new Date()).toLocaleTimeString();
const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      timestamp: tsFormat,
      colorize: true,
      level: 'info'
    }),
    new (require('winston-daily-rotate-file'))({
      filename: `${logDir}/-results.log`,
      timestamp: tsFormat,
      datePattern: 'yyyy-MM-dd',
      prepend: true,
      level: env === 'development' ? 'verbose' : 'info'
    })
  ]
});
let blankError = {
  err: undefined,
  method: undefined,
  action: undefined
}
const loggerExport = function(err, method, action) {
  let errorObject = Object.assign({}, blankError);
  errorObject.err = err;
  errorObject.method = method;
  errorObject.action = action;
  logger.error(errorObject);
}

module.exports = loggerExport;
