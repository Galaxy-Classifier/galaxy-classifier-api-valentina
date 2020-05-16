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
  level, message, lbl, tstamp,
}) => (`${tstamp} | [${lbl}]::${level} => ${message}`));

const logger = createLogger({
  level: 2,
  format: combine(
    label({ label: `${name}:${version}` }),
    timestamp(),
    logFormat,
  ),
  transports: [
    new transports.Console(),
    new transports.File(`${name}.logs`),
  ],
});

module.exports = logger;
