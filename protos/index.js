const fs = require('fs');
const path = require('path');

module.exports = {
  getProtoPaths(logger) {
    const protos = fs.readdirSync(__dirname, { encoding: 'utf-8' }).filter((value) => value.split('.').pop() === 'proto');

    logger.info(`Protos found: ${protos}`);

    return protos.map((proto) => path.join(__dirname, proto));
  },
};
