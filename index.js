'use strict';

var util = require('util');
var chalk = require('chalk');
var typeOf = require('kind-of');
var Options = require('option-cache');
var omit = require('object.omit');
var pick = require('object.pick');
var get = require('get-value');
var _ = require('lodash');

/**
 * Expose `Cache`
 */

module.exports = Cache;

/**
 * Create a new instance of `Cache`
 *
 * ```js
 * var app = new Cache();
 * ```
 *
 * @class Cache
 * @param {Object} `cache` Optionally pass an object to initialize with.
 * @constructor
 * @api public
 */

function Cache(cache) {
  Options.call(this);
  this.cache = cache || {};
}

util.inherits(Cache, Options);

/**
 * Assign `value` to `key` or return the value of `key`.
 *
 * ```js
 * app.set(key, value);
 *
 * // extend
 * app.set({a: 'b'});
 * ```
 *
 * @param {String} `key`
 * @param {*} `value`
 * @return {Cache} for chaining
 * @api public
 */

Cache.prototype.set = function (key, value) {
  if (typeOf(key) === 'object') {
    _.extend(this.cache, key);
  } else {
    this.cache[key] = value;
  }
  return this;
};

/**
 * Return the stored value of `key`. If `key` is not defined,
 * the `cache` is returned.
 *
 * ```js
 * app.set('foo', 'bar');
 * app.get('foo');
 * // => "bar"
 * ```
 *
 * @param {String} `key`
 * @api public
 */

Cache.prototype.get = function (key) {
  if (!key) {
    return _.cloneDeep(this.cache);
  }
  if (key.indexOf('.') !== -1) {
    return get(this.cache, key, true);
  }
  return this.cache[key];
};

/*
 * Return `true` if the element exists. Dot notation
 * may be used for nested properties.
 *
 * **Example**
 *
 * ```js
 * app.exists('author.name');
 * //=> true
 * ```
 *
 * @param {String} `key`
 * @return {Boolean}
 * @api public
 */

Cache.prototype.exists = function(key) {
  if (this.hasOwn(key)) {
    return true;
  }
  return get(this.cache, key, true) !== undefined;
};

/**
 * Extend the `cache` with the given object.
 *
 * **Example**
 *
 * ```js
 * app
 *   .extend({a: 'b'}, {c: 'd'});
 *   .extend('e', {f: 'g'});
 * ```
 *
 * @chainable
 * @return {Object} `Cache` to enable chaining.
 * @api public
 */

Cache.prototype.extend = function(val) {
  var args = [].concat.apply([], arguments);

  if (typeof val === 'string') {
    var rest = args.slice(1);
    var o = this.get(val) || {};
    o = _.extend.apply(_, [o].concat(rest));
    this.cache[val] = o;
    return this;
  }

  _.extend.apply(_, [this.cache].concat(args));
  return this;
};

/**
 * Deep merge an object onto the `cache`.
 *
 * **Example**
 *
 * ```js
 * app.merge({a: {one: 'one'}}, {a: {two: 'two'}});
 * console.log(app.get('a'));
 * //=> {a: {one: 'one', two: 'two'}}
 * ```
 *
 * @chainable
 * @return {Object} `Cache` to enable chaining.
 * @api public
 */

Cache.prototype.merge = function(val) {
  var args = [].concat.apply([], arguments);

  if (typeof val === 'string') {
    var rest = args.slice(1);
    var o = this.get(val) || {};
    o = _.merge.apply(_, [o].concat(rest));
    this.cache[val] = o;
    return this;
  }

  _.merge.apply(_, [this.cache].concat(args));
  return this;
};

/**
 * Extend the cache with only the specified values from the given
 * object.
 *
 * ```js
 * var obj = {a: 'a', b: 'b', c: 'c'};
 * app.pick(obj, 'a');
 * //=> {a: 'a'}
 *
 * app.pick(obj, ['a', 'b']);
 * //=> {a: 'a', b: 'b'}
 * ```
 *
 * @param {String|Array} `key` The key(s) to pick from the object and extend onto `app.cache`
 * @api public
 */

Cache.prototype.pick = function(o, keys) {
  this.extend(pick(o, keys));
};

/**
 * Omit a property or array of properties from the cache
 *
 * ```js
 * app.omit('foo');
 * // or
 * app.omit(['foo', 'bar']);
 * ```
 *
 * @param {String|Array} `key` The key(s) to omit from the cache
 * @api public
 */

Cache.prototype.omit = function(keys) {
  this.cache = omit(this.cache, keys);
};

/**
 * Return the keys on `obj` or `this.cache`.
 *
 * ```js
 * app.forOwn();
 * ```
 *
 * @param {Object} `obj` Optionally pass an object.
 * @return {Array} Array of keys.
 * @api public
 */

Cache.prototype.forOwn = function (o, fn, thisArg) {
  if (typeof o === 'function') {
    thisArg = fn; fn = o; o = this.cache;
  }
  return _.forOwn(o, fn, thisArg || this);
};

/**
 * Return the keys on `obj` or `this.cache`.
 *
 *
 * ```js
 * app.keys();
 * ```
 *
 * @param {Object} `obj` Optionally pass an object.
 * @return {Array} Array of keys.
 * @api public
 */

Cache.prototype.keys = function (o) {
  return Object.keys(o || this.cache);
};

/**
 * Return an object of only the properties on `this.cache` or the given `obj`
 * that have function values.
 *
 * ```js
 * app.functions('foo')
 * //=> {set: [function], get: [function], functions: [function]}
 * ```
 *
 * @param {Object} `obj`
 * @return {Array}
 * @api public
 */

Cache.prototype.functions = function(o) {
  o = o || this.cache;
  var fns = [];

  _.forIn(o, function (val, key) {
    if (typeof val === 'function') {
      fns[key] = val;
    }
  });

  return fns;
};

/**
 * Return true if a deep property is on the given object or
 * `this.cache`.
 *
 * ```js
 * app.has('a.b.c');
 * ```
 *
 * @param {Object} `obj` Optionally pass an object.
 * @return {String} `lookup` Prop string to use for the lookup, e.g. `a.b`
 * @api public
 */

Cache.prototype.has = function (val, lookup) {
  if (arguments.length === 1 && typeof val === 'string') {
    return get(this.cache, val) !== undefined;
  }
  return get(val, lookup) !== undefined;
};

/**
 * Return true if `key` is an own, enumerable property
 * of `this.cache` or the given `obj`.
 *
 * ```js
 * app.hasOwn(key);
 * // or
 * app.hasOwn(obj, key);
 * ```
 *
 * @param  {String} `key`
 * @param  {Object} `obj` Optionally pass an object to check.
 * @return {Boolean}
 * @api public
 */

Cache.prototype.hasOwn = function (o, key) {
  if (typeof o === 'string') {
    key = o; o = this.cache;
  }
  return {}.hasOwnProperty.call(o, key);
};

/**
 * Clone the given `obj` or `cache`.
 *
 * ```js
 * app.clone();
 * ```
 *
 * @param  {Object} `obj` Optionally pass an object to clone.
 * @return {Boolean}
 * @api public
 */

Cache.prototype.clone = function(o) {
  return _.cloneDeep(o || this.cache);
};

/**
 * Remove `key` from the cache, or if no value is
 * specified the entire cache is reset.
 *
 * **Example:**
 *
 * ```js
 * app.clear();
 * ```
 *
 * @param {String} `key` The property to remove.
 * @api public
 */

Cache.prototype.clear = function (key) {
  if (key) {
    delete this.cache[key];
  } else {
    this.cache = {};
  }
};