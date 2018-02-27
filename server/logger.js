const log4js = require('log4js');

const config = require('./config/log4js.json');

log4js.configure(config);

const logger = log4js.getLogger('poseidon');

module.exports = logger;
