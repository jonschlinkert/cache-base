/*!
 * cache-base <https://github.com/jonschlinkert/cache-base>
 *
 * Copyright (c) 2014-2018, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

require('mocha');
const assert = require('assert');
const Cache = require('../');
let app, cache;

describe('cache-base', function() {
  beforeEach(function() {
    app = new Cache();
  });

  describe('constructor:', function() {
    it('should create an instance of Cache', function() {
      assert(app instanceof Cache);
    });

    it('should set values passed on the ctor', function() {
      app = new Cache({ one: 1, two: 2 });
      assert.equal(app.cache.one, 1);
      assert.equal(app.cache.two, 2);
    });
  });

  describe('prime', function() {
    it('should prime a property on the cache with the given value', function() {
      app.prime('life', 42);
      assert.equal(app.cache.life, 42);
    });

    it('should not prime a property if it already exists', function() {
      app.set('life', 51);
      app.prime('life', 42);
      assert.equal(app.cache.life, 51);
    });

    it('should prime an object', function() {
      app.prime({ life: 42 });
      assert.equal(app.cache.life, 42);
    });
  });

  describe('default', function() {
    it('should set a default value on cache.defaults', function() {
      app.default('life', 42);
      assert.equal(app.defaults.life, 42);
    });

    it('should not set a default value on the cache object', function() {
      app.default('life', 42);
      assert.equal(app.cache.life, undefined);
    });

    it('should be overridden when values are set', function() {
      app.default('life', 42);
      app.set('life', 51);
      assert.equal(app.cache.life, 51);
    });

    it('should not set a default if it already exists', function() {
      app.set('life', 51);
      app.default('life', 42);
      assert.equal(app.cache.life, 51);
    });

    it('should take an object', function() {
      app.default({ life: 41 });
      assert.equal(app.defaults.life, 41);
    });

    it('should take an array of objects', function() {
      app.default([{ meaning: 41, life: 42 }]);
      assert.equal(app.defaults.meaning, 41);
      assert.equal(app.defaults.life, 42);
    });

    it('should return a value from cache.defaults when only the key is passed', function() {
      app.default({ foo: 1, bar: 2 });
      assert.equal(app.default('foo'), 1);
    });

    it('should return the default value with `.get()`', function() {
      app.default({ foo: 1, bar: 2 });

      app.set('foo', 42);
      assert.equal(app.get('foo'), 42);

      app.del('foo');
      assert.equal(app.get('foo'), 1);
      assert.equal(app.get('bar'), 2);
    });
  });

  describe('set', function() {
    it('should set a value', function() {
      app.set('a', 'b');
      assert.equal(app.get('a'), 'b');
    });

    it('should set properties on `app.cache` when defined as key-value pairs', function() {
      app.set('a', 'b');
      assert.equal(app.cache.a, 'b');
    });

    it('should set properties on `app.cache` when defined as as an object', function() {
      app.set({x: 'y'});
      assert.equal(app.cache.x, 'y');
      assert.equal(app.get('x'), 'y');
    });

    it('should set nested properties on the `app.cache`', function() {
      app.set('c', {d: 'e'});
      assert.equal(app.get('c.d'), 'e');
    });

    it('should be chainable', function() {
      assert.equal(app.set('a', 'b'), app);
      app
        .set('aa', 'bb')
        .set('bb', 'cc')
        .set('cc', 'dd');
      assert.equal(app.get('aa'), 'bb');
      assert.equal(app.get('bb'), 'cc');
      assert.equal(app.get('cc'), 'dd');
    });

    it('should return undefined when not set', function() {
      assert.equal(app.set('a', undefined), app);
    });
  });

  describe('get', function() {
    it('should return undefined when no set', function() {
      assert(app.get('a') === undefined);
    });

    it('should get a value', function() {
      app.set('a', 'b');
      assert.equal(app.get('a'), 'b');
    });

    it('should get a nested property value', function() {
      app.set('a.b.c', 'z');
      assert.equal(app.cache.a.b.c, 'z');
      assert.deepEqual(app.get('a.b'), {c: 'z'});
    });

    it('should support passing key as an array', function() {
      app.set('a.b.c', 'z');
      assert.equal(app.cache.a.b.c, 'z');
      assert.deepEqual(app.get(['a', 'b']), {c: 'z'});
    });
  });

  describe('union', function() {
    it('should union a string value', function() {
      app.union('a', 'b');
      assert.deepEqual(app.get('a'), ['b']);
    });

    it('should union multiple string values', function() {
      app.union('a', 'b');
      app.union('a', 'c');
      app.union('a', 'd');
      assert.deepEqual(app.get('a'), ['b', 'c', 'd']);
    });

    it('should union multiple arrays', function() {
      app.union('a', ['b']);
      app.union('a', ['c']);
      app.union('a', ['d']);
      assert.deepEqual(app.get('a'), ['b', 'c', 'd']);
    });

    it('should union strings and arrays', function() {
      app.union('a', 'a');
      app.union('a', ['b']);
      app.union('a', ['c', 'd']);
      assert.deepEqual(app.get('a'), ['a', 'b', 'c', 'd']);
    });

    it('should union nested string values', function() {
      app.union('a.b', 'b');
      app.union('a.b', 'c');
      app.union('a.b', 'd');
      assert.deepEqual(app.get('a'), {b: ['b', 'c', 'd']});
    });

    it('should union and uniquify arrays', function() {
      app.union('a.b', ['b', 'foo']);
      app.union('a.b', ['c', 'foo']);
      app.union('a.b', ['d', 'foo']);
      assert.deepEqual(app.get('a'), {b: ['b', 'foo', 'c', 'd']});
    });
  });

  describe('has', function() {
    it('should return true if cache has a value for the given key', function() {
      app.set('foo', 'bar');
      app.set('baz', null);
      app.set('qux', undefined);

      assert(app.has('foo'));
      assert(!app.has('bar'));
      assert(app.has('baz'));
      assert(!app.has('qux'));
    });

    it('should work with escaped keys', function() {
      app.set('foo\\.baz', 'bar');

      assert(!app.has('foo'));
      assert(!app.has('bar'));
      assert(app.has('foo.baz'));
    });

    it('should return true if a nested key value on the cache', function() {
      app.set('a.b.c.d', { x: 'zzz' });
      app.set('a.b.c.e', { f: null });
      app.set('a.b.g.j', { k: undefined });

      assert(app.has('a'));
      assert(app.has('a.b'));
      assert(app.has('a.b.c'));
      assert(app.has('a.b.c.d'));
      assert(app.has('a.b.c.d.x'));
      assert(app.has('a.b.c.e.f'));
      assert(!app.has('a.b.g.j.k'));

      assert(!app.has('a.b.bar'));
      assert(!app.has('a.b.c.d.z'));
      assert(!app.has('a.b.c.e.bar'));
      assert(!app.has('a.b.g.j.foo'));
    });
  });

  describe('hasOwn', function() {
    it('should return true if a cache has own key', function() {
      app.set('foo', 'bar');
      app.set('baz', null);
      app.set('qux', undefined);

      assert(app.hasOwn('foo'));
      assert(!app.hasOwn('bar'));
      assert(app.hasOwn('baz'));
      assert(!app.hasOwn('qux'));
    });

    it('should work with escaped keys', function() {
      app.set('foo\\.baz', 'bar');
      app.set('baz', null);
      app.set('qux', undefined);

      assert(!app.hasOwn('foo'));
      assert(!app.hasOwn('bar'));
      assert(app.hasOwn('foo.baz'));
      assert(app.hasOwn('baz'));
    });

    it('should return true if a nested key exists `.hasOwn()` on the cache', function() {
      app.set('a.b.c.d', { x: 'zzz' });
      app.set('a.b.c.e', { f: null });
      app.set('a.b.g.j', { k: undefined });

      assert(app.hasOwn('a'));
      assert(app.hasOwn('a.b'));
      assert(app.hasOwn('a.b.c'));
      assert(app.hasOwn('a.b.c.d'));
      assert(app.hasOwn('a.b.c.d.x'));
      assert(app.hasOwn('a.b.c.e.f'));
      assert(app.hasOwn('a.b.g.j.k'));
      assert(app.hasOwn('a.b.g.j.k'));
      assert(app.hasOwn('a.b.c.e.f'));

      assert(!app.hasOwn('a.b.bar'));
      assert(!app.hasOwn('a.b.c.d.z'));
      assert(!app.hasOwn('a.b.c.e.bar'));
      assert(!app.hasOwn('a.b.g.j.foo'));
    });
  });

  describe('del', function() {
    it('should delete a property from the cache', function() {
      app.set('foo', 42);
      app.set('bar', 43);

      assert.equal(app.get('foo'), 42);
      assert.equal(app.get('bar'), 43);
      app.del('foo');

      assert.equal(app.get('foo'), undefined);
      assert.equal(app.get('bar'), 43);
    });

    it('should delete all property from the cache when no key is passed', function() {
      app.set('foo', 42);
      app.set('bar', 43);

      assert.equal(app.get('foo'), 42);
      assert.equal(app.get('bar'), 43);
      app.del();

      assert.equal(app.get('foo'), undefined);
      assert.equal(app.get('bar'), undefined);
    });
  });

  describe('keys', function() {
    it('should return all enumerable property names from the cache', function() {
      app.set('foo', 42);
      app.set('bar', null);
      app.set('baz', undefined);

      assert.deepEqual(app.keys, ['foo', 'bar']);
    });
  });

  describe('size', function() {
    it('should return the length of cache.keys', function() {
      app.set('foo', 'bar');
      app.set('baz', null);
      app.set('qux', undefined);

      assert.equal(app.size, 2);
    });
  });
});
