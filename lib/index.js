"use strict";

var _phantom = require("./phantom");

var _phantom2 = _interopRequireDefault(_phantom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Retuns a new instance of Phantom class
 * @param args
 * @returns {Promise}
 */
module.exports.create = function (args) {
  return new Promise(function (resolve) {
    return resolve(new _phantom2.default(args));
  });
};