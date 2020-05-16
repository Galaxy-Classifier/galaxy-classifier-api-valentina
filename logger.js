const { createLogger, format: { printf, combine, timestamp, label } } = require('winston');
const { name, version } = require('./package.json');

const logFormat = printf(({ level, message, label, timestamp }) => (`${timestamp} | [${label}]::${level} => ${message}`));

const logger = createLogger({
  level: 2,
  format: combine (
    label({ label: `${name}:${version}` }),
    timestamp(),
    logFormat
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File(`${name}.logs`),
  ]
});

module.exports = logger;