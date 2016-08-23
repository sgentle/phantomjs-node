import Phantom from "./phantom";
import winston from "winston";

const logLevel = process.env.DEBUG === 'true' ? 'debug' : 'info';
const logger = new winston.Logger({
    transports: [
        new winston.transports.Console({
            level: logLevel,
            colorize: true
        })
    ]
});

/**
 * Retuns a Promise of a new Phantom class instance
 * @param args command args to pass to phantom process
 * @param [config] configuration object
 * @param [config.phantomPath] path to phantomjs executable
 * @param [config.logger] object containing functions used for logging
 * @param [config.logLevel] log level to apply on the logger (if unset or default)
 * @returns {Promise}
 */
module.exports.create = (args, config = {logger: logger, logLevel: logLevel}) => {
    if(!config.logger) {
        config.logger = logger;
    }
    if(config.logger === logger && config.logLevel && process.env.DEBUG !== 'true') {
        logger.transports.console.level = config.logLevel;
    }
    return new Promise(resolve => resolve(new Phantom(args, config)));
};
