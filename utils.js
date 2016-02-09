'use strict';

/**
 * Module dependencies
 */

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('component-emitter', 'Emitter');
require('collection-visit', 'visit');
require('isobject', 'isObject');
require('unset-value', 'del');
require('get-value', 'get');
require('has-value', 'has');
require('set-value', 'set');
require('to-object-path', 'toPath');
require = fn;

/**
 * Expose `utils` modules
 */

module.exports = utils;
