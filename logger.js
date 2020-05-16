const path = require('path');
const {
  createLogger,
  transports,
  format: {
    printf,
    combine,
    timestamp,
    label,
  },
} = require('winston');
const { name, version } = require('./package.json');

const logFormat = printf(({
  level, message, label: lbl, timestamp: tstamp,
}) => (`${tstamp} | [${lbl}]::${level}  => ${message}`));

const logger = createLogger({
  format: combine(
    label({ label: `${name}:${version}` }),
    timestamp(),
    logFormat,
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: path.join(__dirname, `${name}.logs`) }),
  ],
});

module.exports = logger;
