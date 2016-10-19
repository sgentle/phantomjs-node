// @flow

import Phantom from './phantom';

type Logger = {info: (s: string) => void, info: (s: string) => void, error: (s: string) => void};
type Config = {logger: Logger, phantomPath: string, logLevel: string}
/**
 * Retuns a Promise of a new Phantom class instance
 * @param args command args to pass to phantom process
 * @param [config] configuration object
 * @param [config.phantomPath] path to phantomjs executable
 * @param [config.logger] object containing functions used for logging
 * @param [config.logLevel] log level to apply on the logger (if unset or default)
 * @returns {Promise}
 */
function create(args: string[], config: Config): Promise<Phantom> {
    return new Promise(resolve => resolve(new Phantom(args, config)));
}

export default {create};
