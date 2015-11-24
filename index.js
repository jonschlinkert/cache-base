'use strict';

var isObject = require('isobject');
var visit = require('collection-visit');
var get = require('get-value');
var has = require('has-value');
var set = require('set-value');
var unset = require('unset-value');

/**
 * Create a `Cache` constructor that, when instantiated, will
 * store values on the given `prop`.
 *
 * ```js
 * var Cache = require('cache-base').namespace('data');
 * var cache = new Cache();
 * ```
 * @param {String} `prop` The property name to use for storing values.
 * @return {Function} Returns a custom `Cache` constructor
 * @api public
 */

function namespace(prop) {
  prop = prop || 'cache';

  /**
   * Create a new `Cache`. Internally the `Cache` constructor is created using
   * the `namespace` function, with `cache` defined as the storage object.
   *
   * ```js
   * var app = new Cache();
   * ```
   * @param {Object} `cache` Optionally pass an object to initialize with.
   * @constructor
   * @api public
   */

  function Cache(cache) {
    this[prop] = {};
    if (cache) {
      this.set(cache);
    }
  }

  /**
   * Set property `key` with the given `value`.
   *
   * ```js
   * app.set('a', 'b');
   * // or
   * app.set({a: 'b'});
   * ```
   *
   * @param {String} `key`
   * @param {any} `value`
   * @return {Cache} Returns the instance for chaining
   * @api public
   */

  Cache.prototype.set = function(key, value) {
    if (isObject(key)) {
      return this.visit('set', key);
    }
    set(this[prop], key, value);
    return this;
  };

  /**
   * Return the stored value of `key`. If `key` is not defined,
   * the `cache` is returned.
   *
   * ```js
   * app.set('foo', 'bar');
   * app.get('foo');
   * //=> "bar"
   * ```
   *
   * @param {String} `key`
   * @api public
   */

  Cache.prototype.get = function(key) {
    return get(this[prop], key);
  };

  /**
   * Return true if cache `key` is not undefined or null.
   *
   * ```js
   * app.set('foo', 'bar');
   * app.has('foo');
   * //=> true
   * ```
   *
   * @param {String} `key`
   * @api public
   */

  Cache.prototype.has = function(key) {
    return has(this[prop], key);
  };

  /**
   * Delete one or more properties from the cache.
   *
   * ```js
   * app.del('foo');
   * // or
   * app.del(['foo', 'bar']);
   * ```
   * @param {String|Array} `keys`
   * @api public
   */

  Cache.prototype.del = function(key) {
    if (Array.isArray(key)) {
      return this.visit('del', key);
    }
    unset(this[prop], key);
    return this;
  };

  /**
   * Reset the entire cache to an empty object.
   *
   * ```js
   * app.clear();
   * ```
   * @api public
   */

  Cache.prototype.clear = function() {
    this[prop] = {};
  };

  /**
   * Visit `method`, or map-visit `method`, over each property in `val`.
   *
   * ```js
   * app.visit('set', {a: 'b'});
   * ```
   * @param {String} `method` The name of the method to call.
   * @param {Object|Array} `val` The object or array to iterate over.
   * @api public
   */

  Cache.prototype.visit = function(method, val) {
    visit(this, method, val);
    return this;
  };

  return Cache;
}

/**
 * Expose `Cache`
 */

module.exports = namespace('cache');

/**
 * Expose `Cache.namespace`
 */

module.exports.namespace = namespace;
