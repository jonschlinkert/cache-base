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

describe('custom property', function() {
  beforeEach(function() {
    app = new Cache('data');
  });

  describe('constructor:', function() {
    it('should create an instance of Cache', function() {
      assert(app instanceof Cache);
    });

    it('should set ', function() {
      app = new Cache('data', { one: 1, two: 2 });
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

    it('should set properties on the `data` object', function() {
      app.set('a', 'b');
      assert.equal(app.data.a, 'b');
    });

    it('should allow an object to be set directly', function() {
      app.set({x: 'y'});
      assert.equal(app.data.x, 'y');
      assert.equal(app.get('x'), 'y');
    });

    it('should set nested properties on the `data` object', function() {
      app.set('c', {d: 'e'});
      assert.equal(app.get('c').d, 'e');
    });

    it('should return the instance', function() {
      assert.equal(app.set('a', 'b'), app);
    });

    it('should be chainable', function() {
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
    it('should otherwise return the value', function() {
      app.set('a', 'b');
      assert.equal(app.get('a'), 'b');
      assert.equal(app.data.a, 'b');
      assert.equal(app.get('zllzzl'), undefined);
    });
  });
});
