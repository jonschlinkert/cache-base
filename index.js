'use strict';

const isObject = require('isobject');
const Emitter = require('@sellside/emitter');
const visit = require('collection-visit');
const hasOwn = require('has-own-deep');
const union = require('union-value');
const del = require('unset-value');
const get = require('get-value');
const set = require('set-value');

/**
 * Create a new `Cache`. Internally the `Cache` constructor is created using
 * the `namespace` function, with `cache` defined as the storage object.
 *
 * ```js
 * const cache = new Cache();
 * ```
 * @param {Object} `cache` Optionally pass an object to initialize with.
 * @constructor
 * @api public
 */

class Cache extends Emitter {
  constructor(prop, cache) {
    super();

    if (typeof prop === 'string') {
      Reflect.defineProperty(this, 'prop', { value: prop });
      this[this.prop] = {};
    } else {
      cache = prop || cache;
    }

    if (cache) {
      this.set(cache);
    }
  }

  /**
   * Assign `value` to `key`. Also emits `set` with
   * the key and value.
   *
   * ```js
   * cache.on('set', function(key, val) {
   *   // do something when `set` is emitted
   * });
   *
   * cache.set(key, value);
   *
   * // also takes an object or array
   * cache.set({name: 'Halle'});
   * cache.set([{foo: 'bar'}, {baz: 'quux'}]);
   * console.log(cache);
   * //=> {name: 'Halle', foo: 'bar', baz: 'quux'}
   * ```
   *
   * @name .set
   * @emits `set` with `key` and `value` as arguments.
   * @param {String|Array} `key` The name of the property to set. Dot-notation or an array of object path segments may be used.
   * @param {any} `value`
   * @return {Object} Returns the instance for chaining.
   * @api public
   */

  set(key, val) {
    if (isObject(key) || Array.isArray(key)) {
      this.visit('set', key);
      return this;
    }

    set(this.prop ? this[this.prop] : this, key, val);
    this.emit('set', key, val);
    return this;
  }

  /**
   * Union `array` to `key`. Also emits `set` with
   * the key and value.
   *
   * ```js
   * cache.union('a.b', ['foo']);
   * cache.union('a.b', ['bar']);
   * console.log(cache.get('a'));
   * //=> {b: ['foo', 'bar']}
   * ```
   * @name .union
   * @param {String|Array} `key` The name of the property to union. Dot-notation or an array of object path segments may be used.
   * @param {any} `value`
   * @return {Object} Returns the instance for chaining.
   * @api public
   */

  union(key, val) {
    if (Array.isArray(key) && arguments.length === 2) {
      key = key.join('.');
    }
    const ctx = this.prop ? this[this.prop] : this;
    union(ctx, key, val);
    this.emit('union', val);
    return this;
  }

  /**
   * Return the value of `key`. Dot notation may be used to
   * get [nested property values][get-value].
   *
   * ```js
   * cache.set('a.b.c', 'd');
   * cache.get('a.b');
   * //=> { c: 'd' }
   *
   * cache.get(['a', 'b']);
   * //=> { c: 'd' }
   * ```
   *
   * @name .get
   * @emits `get` with `key` and `value` as arguments.
   * @param {String|Array} `key` The name of the property to get. Dot-notation or an array of object path segments may be used.
   * @return {any} Returns the value of `key`
   * @api public
   */

  get(key) {
    const ctx = this.prop ? this[this.prop] : this;
    const val = get(ctx, key);
    this.emit('get', key, val);
    return val;
  }

  /**
   * Return true if `cache[key]` is not `undefined`.
   *
   * ```js
   * cache.set('foo', true);
   * cache.set('baz', null);
   * cache.set('bar', undefined);
   *
   * cache.has('foo'); //=> true
   * cache.has('bar'); //=> true
   * cache.has('baz'); //=> false
   * ```
   *
   * @name .has
   * @emits `has` with `key` and true or false as arguments.
   * @param {String|Array} `key` The name of the property to check. Supports [dot-notation](#dot-notation).
   * @return {Boolean}
   * @api public
   */

  has(key) {
    const ctx = this.prop ? this[this.prop] : this;
    const has = typeof get(ctx, key) !== 'undefined';
    this.emit('has', key, has);
    return has;
  }

  /**
   * Returns a boolean indicating whether the object has the specified property as an
   * own (not inherited) property. Similar to [.has()](#has), but returns true even
   * when the value is `undefined`.
   *
   * ```js
   * cache.set('a.b.c', 'd');
   * cache.set('x', false);
   * cache.set('y', null);
   * cache.set('z', undefined);
   *
   * cache.hasOwn('a');      //=> true
   * cache.hasOwn('b');      //=> true
   * cache.hasOwn('c');      //=> true
   * cache.hasOwn('a.b.c');  //=> true
   * cache.hasOwn('x');      //=> true
   * cache.hasOwn('y');      //=> true
   * cache.hasOwn('z');      //=> true
   * cache.hasOwn('lslsls'); //=> false
   * ```
   * @name .hasOwn
   * @param  {String} `prop`
   * @return {Boolean} Returns true if object `prop` exists. Supports [dot-notation](#dot-notation).
   * @api public
   */

  hasOwn(key) {
    const ctx = this.prop ? this[this.prop] : this;
    const has = hasOwn(ctx, key);
    this.emit('hasOwn', key, has);
    return has;
  }

  /**
   * Delete one or more properties from the instance.
   *
   * ```js
   * cache.del(); // delete all
   * // or
   * cache.del('foo');
   * // or
   * cache.del(['foo', 'bar']);
   * ```
   * @name .del
   * @emits `del` with the `key` as the only argument.
   * @param {String|Array} `key` The name of the property to delete. Dot-notation or an array of object path segments may be used.
   * @return {Object} Returns the instance for chaining.
   * @api public
   */

  del(key) {
    if (Array.isArray(key)) {
      this.visit('del', key);
      return this;
    }

    del(this.prop ? this[this.prop] : this, key);
    this.emit('del', key);
    return this;
  }

  /**
   * Visit `method` over the properties in the given object, or map
   * visit over the object-elements in an array.
   *
   * @name .visit
   * @param {String|Array} `key` The name of the method to visit. Dot-notation or an array of object path segments may be used.
   * @param {Object|Array} `val` The object or array to iterate over.
   * @return {Object} Returns the instance for chaining.
   * @api public
   */

  visit(key, val) {
    visit(this, key, val);
    return this;
  }

  /**
   * Reset the entire cache to an empty object.
   *
   * ```js
   * cache.clear();
   * ```
   * @api public
   */

  clear() {
    if (this.prop) {
      delete this[this.prop];
      return this;
    }

    for (const key of Object.keys(this)) {
      delete this[key];
    }
    return this;
  }
}

/**
 * Expose `Cache`
 */

module.exports = Cache;
