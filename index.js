/*!
 * simple-cache <https://github.com/jonschlinkert/simple-cache>
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');
var getobject = require('getobject');
var expander = require('expander');
var expand = expander.process;


/**
 * Initialize a new `Cache`
 *
 * ```js
 * var cache = new Cache();
 * ```
 *
 * @class Cache
 * @param {Object} `obj` Optionally pass an object to initialize with.
 * @constructor
 * @api public
 */

var Cache = module.exports = function(namespace, cache) {
  if (typeof namespace !== 'string') {
    cache = namespace;
    namespace = 'cache';
  }

  this.namespace = namespace || 'cache';

  if (typeof cache !== 'object') {
    cache = {};
  }

  this[this.namespace] = cache || {};
  this.options = this[this.namespace].options || {};
};


/**
 * Set or get an option.
 *
 * ```js
 * cache.option('a', true)
 * cache.option('a')
 * // => true
 * ```
 *
 * @param {String} `key` The option name.
 * @param {*} `value` The value to set.
 * @return {*|Object} Returns `value` if `key` is supplied, or `Cache` for chaining when an option is set.
 * @api public
 */

Cache.prototype.option = function(key, value) {
  var args = [].slice.call(arguments);

  if (args.length === 1 && typeof key === 'string') {
    return this.options[key];
  }

  if (typeOf(key) === 'object') {
    _.extend.apply(_, [this.options].concat(args));
    return this;
  }

  this.options[key] = value;
  return this;
};


/**
 * Assign `value` to `key` or return the value of `key`.
 *
 * ```js
 * cache.set(key, value);
 * ```
 *
 * If `expand` is defined as true, the value will be set using [expander].
 *
 * **Examples:**
 *
 * ```js
 * // as a key-value pair
 * cache.set('a', {b: 'c'});
 *
 * // or as an object
 * cache.set({a: {b: 'c'}});
 *
 * // chaining is possible
 * cache
 *   .set({a: {b: 'c'}})
 *   .set('d', 'e');
 * ```
 *
 * Expand template strings with expander:
 *
 * ```js
 * cache.set('a', {b: '${c}', c: 'd'}, true);
 * ```
 *
 * Visit the [expander] docs for more info.
 *
 *
 * [expander]: https://github.com/tkellen/expander
 * [getobject]: https://github.com/cowboy/node-getobject
 *
 * @param {String} `key`
 * @param {*} `value`
 * @param {Boolean} `expand` Resolve template strings with [expander]
 * @return {Cache} for chaining
 * @api public
 */

Cache.prototype.set = function(key, value, expand) {
  if (arguments.length === 1 && typeOf(key) === 'object') {
    this.extend(key);
    return this;
  }

  if (expand) {
    value = this.process(value, this[this.namespace]);
    this.set(key, value, false);
  } else {
    getobject.set(this[this.namespace], key, value);
  }

  return this;
};


/**
 * Return the stored value of `key`. If `key` is not defined,
 * the `cache` is returned.
 *
 * If the value does **not** exist on the cache, you may pass
 * `true` as a second parameter to tell [getobject] to initialize
 * the value as an empty object.
 *
 * ```js
 * cache.set('foo', 'bar');
 * cache.get('foo');
 * // => "bar"
 * ```
 *
 * @param {*} `key`
 * @param {Boolean} `create`
 * @return {*}
 * @api public
 */

Cache.prototype.get = function(key, create) {
  if (!key) {
    return this[this.namespace];
  }
  return getobject.get(this[this.namespace], key, create);
};


/**
 * Use [expander] to recursively expand template strings into
 * their resolved values.
 *
 * **Example**
 *
 * ```js
 * cache.process({a: '<%= b %>', b: 'c'});
 * //=> {a: 'c', b: 'c'}
 * ```
 *
 * @param {*} `lookup` Any value to process, usually strings with a
 *                     cache template, like `<%= foo %>` or `${foo}`.
 * @param {*} `opts` Options to pass to Lo-Dash `_.template`.
 * @api public
 */

Cache.prototype.process = function(lookup, context) {
  var args = [].slice.call(arguments);

  if (!args.length) {
    lookup = context = this[this.namespace];
  } else {
    context = context || this[this.namespace];
    if (typeOf(lookup) === 'object') {
      context = _.extend({}, context, lookup);
    }
  }

  var methods = this.methods(context);
  var o = expand(context, lookup, {
    imports: methods
  });

  if (!args.length) {
    _.extend(this[this.namespace], o);
  }

  return o;
};


/**
 * Check if `key` is enabled (truthy).
 *
 * ```js
 * cache.enabled('foo')
 * // => false
 *
 * cache.enable('foo')
 * cache.enabled('foo')
 * // => true
 * ```
 *
 * @param {String} `key`
 * @return {Boolean}
 * @api public
 */

Cache.prototype.enabled = function(key) {
  return !!this.get(key);
};


/**
 * Check if `key` is disabled.
 *
 * ```js
 * cache.disabled('foo')
 * // => true
 *
 * cache.enable('foo')
 * cache.disabled('foo')
 * // => false
 * ```
 *
 * @param {String} `key`
 * @return {Boolean}
 * @api public
 */

Cache.prototype.disabled = function(key) {
  return !this.get(key);
};


/**
 * Enable `key`.
 *
 * **Example**
 *
 * ```js
 * cache.enable('foo');
 * ```
 *
 * @param {String} `key`
 * @return {Cache} for chaining
 * @api public
 */

Cache.prototype.enable = function(key) {
  return this.set(key, true);
};


/**
 * Disable `key`.
 *
 * **Example**
 *
 * ```js
 * cache.disable('foo');
 * ```
 *
 * @param {String} `key`
 * @return {Cache} for chaining
 * @api public
 */

Cache.prototype.disable = function(key) {
  return this.set(key, false);
};


/*
 * Return `true` if the element exists. Dot notation
 * may be used for nested properties.
 *
 * **Example**
 *
 * ```js
 * cache.exists('author.name');
 * //=> true
 * ```
 *
 * @param   {String}  `key`
 * @return  {Boolean}
 * @api public
 */

Cache.prototype.exists = function(key) {
  return getobject.exists(this[this.namespace], key);
};


/**
 * Add values to an array on the `cache`. This method
 * is chainable.
 *
 * **Example**
 *
 * ```js
 * // config.cache['foo'] => ['a.hbs', 'b.hbs']
 * cache
 *   .union('foo', ['b.hbs', 'c.hbs'], ['d.hbs']);
 *   .union('foo', ['e.hbs', 'f.hbs']);
 *
 * // config.cache['foo'] => ['a.hbs', 'b.hbs', 'c.hbs', 'd.hbs', 'e.hbs', 'f.hbs']
 * ```
 *
 * @chainable
 * @return {Cache} for chaining
 * @api public
 */

Cache.prototype.union = function(key) {
  var args = [].slice.call(arguments, 1);
  var arr = this.get(key) || [];

  if (!Array.isArray(arr)) {
    throw new Error('Cache#union expected an array but got', arr);
  }

  this.set(key, _.union.apply(_, [arr].concat(args)));
  return this;
};


/**
 * Extend the `cache` with the given object.
 * This method is chainable.
 *
 * **Example**
 *
 * ```js
 * cache
 *   .defaults({foo: 'bar'}, {baz: 'quux'});
 *   .defaults({fez: 'bang'});
 * ```
 *
 * Or define the property to defaults:
 *
 * ```js
 * cache
 *   // defaults `cache.a`
 *   .defaults('a', {foo: 'bar'}, {baz: 'quux'})
 *   // defaults `cache.b`
 *   .defaults('b', {fez: 'bang'})
 *   // defaults `cache.a.b.c`
 *   .defaults('a.b.c', {fez: 'bang'});
 * ```
 *
 * @chainable
 * @return {Cache} for chaining
 * @api public
 */

Cache.prototype.defaults = function() {
  var args = [].slice.call(arguments);

  if (typeof args[0] === 'string') {
    var o = this.get(args[0]) || {};
    o = _.defaults.apply(_, [o].concat(_.rest(args)));
    this.set(args[0], o);
    return this;
  }

  _.defaults.apply(_, [this[this.namespace]].concat(args));
  return this;
};


/**
 * Extend the `cache` with the given object.
 * This method is chainable.
 *
 * **Example**
 *
 * ```js
 * cache
 *   .extend({foo: 'bar'}, {baz: 'quux'});
 *   .extend({fez: 'bang'});
 * ```
 *
 * Or define the property to extend:
 *
 * ```js
 * cache
 *   // extend `cache.a`
 *   .extend('a', {foo: 'bar'}, {baz: 'quux'})
 *   // extend `cache.b`
 *   .extend('b', {fez: 'bang'})
 *   // extend `cache.a.b.c`
 *   .extend('a.b.c', {fez: 'bang'});
 * ```
 *
 * @chainable
 * @return {Cache} for chaining
 * @api public
 */

Cache.prototype.extend = function() {
  var args = [].slice.call(arguments);

  if (typeof args[0] === 'string') {
    var o = this.get(args[0]) || {};
    o = _.extend.apply(_, [o].concat(_.rest(args)));
    this.set(args[0], o);
    return this;
  }

  _.extend.apply(_, [this[this.namespace]].concat(args));
  return this;
};


/**
 * Extend the cache with the given object.
 * This method is chainable.
 *
 * **Example**
 *
 * ```js
 * cache
 *   .merge({foo: 'bar'}, {baz: 'quux'});
 *   .merge({fez: 'bang'});
 * ```
 *
 * @chainable
 * @return {Cache} for chaining
 * @api public
 */

Cache.prototype.merge = function() {
  var args = [].slice.call(arguments);
  if (typeof args[0] === 'string') {
    var o = this.get(args[0]) || {};
    o = _.merge.apply(_, [o].concat(_.rest(args)));
    this.set(args[0], o);
    return this;
  }
  _.merge.apply(_, [this[this.namespace]].concat(args));
  return this;
};


/**
 * Return the keys on `this[this.namespace]`.
 *
 * ```js
 * cache.keys();
 * ```
 *
 * @return {Boolean}
 * @api public
 */

Cache.prototype.keys = function() {
  return Object.keys(this[this.namespace]);
};


/**
 * Return true if `key` is an own, enumerable property
 * of `this[this.namespace]` or the given `obj`.
 *
 * ```js
 * cache.hasOwn([key]);
 * ```
 *
 * @param  {String} `key`
 * @param  {Object} `obj` Optionally pass an object to check.
 * @return {Boolean}
 * @api public
 */

Cache.prototype.hasOwn = function(key, o) {
  return {}.hasOwnProperty.call(o || this[this.namespace], key);
};


/**
 * Clone the given `obj` or `cache`.
 *
 * ```js
 * cache.clone();
 * ```
 *
 * @param  {Object} `obj` Optionally pass an object to clone.
 * @return {Boolean}
 * @api public
 */

Cache.prototype.clone = function(o) {
  return _.cloneDeep(o || this[this.namespace]);
};


/**
 * Return methods on `this[this.namespace]` or the given `obj`.
 *
 * ```js
 * cache.methods('foo')
 * //=> ['set', 'get', 'enable', ...]
 * ```
 *
 * @param {Object} `obj`
 * @return {Array}
 * @api public
 */

Cache.prototype.methods = function(o) {
  o = o || this[this.namespace];
  return _.pick(o, _.methods(o));
};


/**
 * Call `fn` on each property in `this[this.namespace]`.
 *
 * ```js
 * cache.each(fn, obj);
 * ```
 *
 * @param  {Function} `fn`
 * @param  {Object} `obj` Optionally pass an object to iterate over.
 * @return {Object} Resulting object.
 * @api public
 */

Cache.prototype.each = function(fn, o) {
  o = o || this[this.namespace];
  for (var key in o) {
    if (this.hasOwn(key)) {
      fn(key, o[key]);
    }
  }
  return o;
};


/**
 * Traverse each _own property_ of `this[this.namespace]` or the given object,
 * recursively calling `fn` on child objects.
 *
 * ```js
 * cache.visit(obj, fn);
 * ```
 *
 * @param {Object|Function} `obj` Optionally pass an object.
 * @param {Function} `fn`
 * @return {Object} Return the resulting object.
 * @api public
 */

Cache.prototype.visit = function(o, fn) {
  var cloned = {};
  if (arguments.length === 1) {
    fn = o;
    o = this[this.namespace];
  }
  o = o || this[this.namespace];
  for (var key in o) {
    if (this.hasOwn(key, o)) {
      var child = o[key];
      fn.call(this, key, child);
      if (child != null && typeOf(child) === 'object') {
        child = this.visit(child, fn);
      }
      cloned[key] = child;
    }
  }
  return cloned;
};


/**
 * # Clearing the cache
 *
 * > Methods for clearing the cache, removing or reseting specific
 * values on the cache.
 *
 *
 * Omit properties and their from the `cache`.
 *
 * **Example:**
 *
 * ```js
 * cache
 *   .omit('foo');
 *   .omit('foo', 'bar');
 *   .omit(['foo']);
 *   .omit(['foo', 'bar']);
 * ```
 *
 * @chainable
 * @return {Cache} for chaining
 * @api public
 */

Cache.prototype.omit = function() {
  var args = [].slice.call(arguments);
  this[this.namespace] = _.omit.apply(_, [this[this.namespace]].concat(args));
  return this;
};


/**
 * Remove `key` from the cache, or if no value is
 * specified the entire cache is reset.
 *
 * **Example:**
 *
 * ```js
 * cache.clear();
 * ```
 *
 * @chainable
 * @api public
 */

Cache.prototype.clear = function(key) {
  if (key) {
    delete this[this.namespace][key];
  } else {
    this[this.namespace] = {};
  }
};


/**
 * Return a string indicating the type of the
 * given value.
 *
 * @param {*} `value`
 * @api private
 */

function typeOf(value) {
  return Object.prototype.toString.call(value)
    .toLowerCase()
    .replace(/\[object ([\S]+)\]/, '$1');
}
