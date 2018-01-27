/*!
 * cache-base <https://github.com/jonschlinkert/cache-base>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

require('mocha');
var assert = require('assert');
var Cache;
var cache;
var app;

describe('cache-base', function() {
  beforeEach(function() {
    Cache = require('..');
    app = new Cache();
  });

  describe('constructor:', function() {
    it('should create an instance of Cache', function() {
      assert(app instanceof Cache);
    });

    it('should set ', function() {
      var app = new Cache({
        one: 1,
        two: 2
      });
      assert.equal(app.one, 1);
      assert.equal(app.two, 2);
    });
  });

  describe('get/set:', function() {
    beforeEach(function() {
      Cache = require('..');
      app = new Cache();
    });

    afterEach(function() {
      app.clear();
    });

    describe('set() - add:', function() {
      it('should set a new property with the given value', function() {
        app.set('one', 1);
        assert.equal(app.get('one'), 1);
      });
    });

    describe('set() - update:', function() {
      it('should update an existing property with the given value', function() {
        app.set('one', 2);
        assert.equal(app.get('one'), 2);
      });

      it('should get the given property', function() {
        app.set('a', 'b');
        assert.equal(app.get('a'), 'b');
      });
    });
  });

  describe('.union()', function() {
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

  describe('.set()', function() {
    it('should set a value', function() {
      app.set('a', 'b');
      assert.equal(app.get('a'), 'b');
    });

    it('should set properties on the `cache` object.', function() {
      app.set('a', 'b');
      assert.equal(app.a, 'b');
    });

    it('should allow an object to be set directly.', function() {
      app.set({x: 'y'});
      assert.equal(app.x, 'y');
      assert.equal(app.get('x'), 'y');
    });

    it('should set nested properties on the `cache` object.', function() {
      app.set('c', {d: 'e'});
      assert.equal(app.get('c').d, 'e');
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

  describe('.get()', function() {
    it('should return undefined when no set', function() {
      assert(app.get('a') === undefined);
    });

    it('should get a value', function() {
      app.set('a', 'b');
      assert.equal(app.get('a'), 'b');
    });

    it('should get a nested property value', function() {
      app.set('a.b.c', 'z');
      assert.equal(app.a.b.c, 'z');
      assert.deepEqual(app.get('a.b'), {c: 'z'});
    });
  });
});

describe('events', function() {
  beforeEach(function() {
    Cache = require('..');
    app = new Cache();
  });

  describe('set', function() {
    it('should emit a "set" event', function(cb) {
      app.on('set', function(key, val) {
        cb();
      });
      app.set('a', 'b');
    });

    it('should emit the key with "set" events', function(cb) {
      app.on('set', function(key, val) {
        assert.equal(key, 'a');
        cb();
      });
      app.set('a', 'b');
    });

    it('should emit the value with "set" events', function(cb) {
      app.on('set', function(key, val) {
        assert.equal(val, 'b');
        cb();
      });
      app.set('a', 'b');
    });
  });

  describe('get', function() {
    it('should emit a get event', function(cb) {
      app.on('get', () => cb());
      app.get('a');
    });

    it('should emit the key with "get" events', function(cb) {
      app.on('get', function(key, val) {
        assert.equal(key, 'a');
        cb();
      });
      app.set('a', 'b');
      app.get('a');
    });

    it('should emit the value with "get" events', function(cb) {
      app.on('get', function(key, val) {
        assert.equal(val, 'b');
        cb();
      });
      app.set('a', 'b');
      app.get('a');
    });
  });

  describe('has', function() {
    it('should emit a has event', function(cb) {
      app.on('has', () => cb());
      app.has('a');
    });

    it('should emit the key with "has" events', function(cb) {
      app.on('has', function(key, val) {
        assert.equal(key, 'a');
        cb();
      });
      app.set('a', 'b');
      app.has('a');
    });

    it('should emit the value with "has" events', function(cb) {
      app.on('has', function(key, val) {
        assert.equal(val, true);
        cb();
      });
      app.set('a', 'b');
      app.has('a');
    });
  });

  describe('hasOwn', function() {
    it('should return true if a key exists `.hasOwn()` on the cache', function() {
      app.set('foo', 'bar');
      app.set('baz', null);
      app.set('qux', undefined);

      assert(app.hasOwn('foo'));
      assert(!app.hasOwn('bar'));
      assert(app.hasOwn('baz'));
      assert(app.hasOwn('qux'));
    });

    it('should work with escaped keys', function() {
      app.set('foo\\.baz', 'bar');
      app.set('baz', null);
      app.set('qux', undefined);

      assert(!app.hasOwn('foo'));
      assert(!app.hasOwn('bar'));
      assert(app.hasOwn('foo.baz'));
      assert(app.hasOwn('baz'));
      assert(app.hasOwn('qux'));
    });

    it('should return true if a nested key exists `.hasOwn()` on the cache', function() {
      app.set('a.b.c.d', { x: 'zzz' });
      app.set('a.b.c.e', { f: null });
      app.set('a.b.g.j', { k: undefined });

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
    it('should emit a del event', function(cb) {
      app.on('del', () => cb());
      app.del('a');
    });

    it('should emit the key with "del" events', function(cb) {
      app.on('del', function(key) {
        assert.equal(key, 'a');
        cb();
      });
      app.set('a', 'b');
      app.del('a');
    });

    it('should emit each deleted key when an array is passed', function(cb) {
      var keys = [];
      app.on('del', function(key) {
        keys.push(key);
      });

      app.set('a', 'b');
      app.set('c', 'd');

      app.del(['a', 'c']);
      assert.deepEqual(keys, ['a', 'c']);
      assert(!app.a);
      assert(!app.c);
      cb();
    });
  });
});

describe('namespace', function() {
  beforeEach(function() {
    Cache = require('..');
    app = new Cache('data');
  });

  describe('constructor:', function() {
    it('should create an instance of Cache', function() {
      assert(app instanceof Cache);
    });

    it('should set ', function() {
      var app = new Cache('data', {
        one: 1,
        two: 2
      });
      assert.equal(app.data.one, 1);
      assert.equal(app.data.two, 2);
    });
  });

  describe('get/set:', function() {
    describe('set() - add:', function() {
      it('should set a new property with the given value', function() {
        app.set('one', 1);
        assert.equal(app.get('one'), 1);
        assert.equal(app.data.one, 1);
      });
    });

    describe('set() - update:', function() {
      it('should update an existing property with the given value', function() {
        app.set('one', 2);
        assert.equal(app.get('one'), 2);
        assert.equal(app.data.one, 2);
      });

      it('should get the given property', function() {
        app.set('a', 'b');
        assert.equal(app.get('a'), 'b');
        assert.equal(app.data.a, 'b');
      });
    });
  });

  describe('.set()', function() {
    it('should set a value', function() {
      app.set('a', 'b');
      assert.equal(app.get('a'), 'b');
      assert.equal(app.data.a, 'b');
    });

    it('should set properties on the `data` object.', function() {
      app.set('a', 'b');
      assert.equal(app.data.a, 'b');
    });

    it('should allow an object to be set directly.', function() {
      app.set({x: 'y'});
      assert.equal(app.data.x, 'y');
      assert.equal(app.get('x'), 'y');
    });

    it('should set nested properties on the `data` object.', function() {
      app.set('c', {d: 'e'});
      assert.equal(app.get('c').d, 'e');
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

      assert.equal(app.data.aa, 'bb');
      assert.equal(app.data.bb, 'cc');
      assert.equal(app.data.cc, 'dd');
    });

    it('should return undefined when not set', function() {
      assert.equal(app.set('sfsfsdfs', undefined), app);
    });
  });

  describe('.get()', function() {
    it('should return undefined when no set', function() {
      assert(app.get('a') === undefined);
    });

    it('should otherwise return the value', function() {
      app.set('a', 'b');
      assert.equal(app.get('a'), 'b');
      assert.equal(app.data.a, 'b');
    });
  });
});
