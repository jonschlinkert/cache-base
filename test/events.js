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

describe('events', function() {
  beforeEach(function() {
    app = new Cache();
  });

  describe('set', function() {
    it('should emit a "set" event', function(cb) {
      app.on('set', () => cb());
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

    it('should emit each deleted key when multiple properties are deleted', function(cb) {
      var keys = [];
      app.on('del', key => keys.push(key));

      app.set('a', 'b');
      app.set('c', 'd');

      app.del('a');
      app.del('c');
      assert.deepEqual(keys, ['a', 'c']);
      assert(!app.a);
      assert(!app.c);
      cb();
    });
  });
});
