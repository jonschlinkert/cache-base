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
      assert.equal(app.cache.one, 1);
      assert.equal(app.cache.two, 2);
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

  describe('.set()', function() {
    it('should set a value', function() {
      app.set('a', 'b');
      assert.equal(app.get('a'), 'b');
    });

    it('should set properties on the `cache` object.', function() {
      app.set('a', 'b');
      assert.equal(app.cache.a, 'b');
    });

    it('should allow an object to be set directly.', function() {
      app.set({x: 'y'});
      assert.equal(app.cache.x, 'y');
      assert.equal(app.get('x'), 'y');
    });

    it('should set nested properties on the `cache` object.', function() {
      app.set('c', {d: 'e'});
      assert.equal(app.get('c').d, 'e');
    });

    it('should return `this` for chaining', function() {
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

    it('should otherwise return the value', function() {
      app.set('a', 'b');
      assert.equal(app.get('a'), 'b');
    });
  });
});

describe('events', function() {
  beforeEach(function() {
    cache = require('..');
    Cache = cache.namespace('data');
    app = new Cache();
  });

  it('should emit a set event', function() {

  });
});


describe('namespace events', function() {
  beforeEach(function() {
    cache = require('..');
    Cache = cache.namespace('data');
    app = new Cache();
  });


});

describe('namespace', function() {
  beforeEach(function() {
    cache = require('..');
    Cache = cache.namespace('data');
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
      assert.equal(app.data.one, 1);
      assert.equal(app.data.two, 2);
    });
  });

  describe('get/set:', function() {
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

  describe('.set()', function() {
    it('should set a value', function() {
      app.set('a', 'b');
      assert.equal(app.get('a'), 'b');
    });

    it('should set properties on the `cache` object.', function() {
      app.set('a', 'b');
      assert.equal(app.data.a, 'b');
    });

    it('should allow an object to be set directly.', function() {
      app.set({x: 'y'});
      assert.equal(app.data.x, 'y');
      assert.equal(app.get('x'), 'y');
    });

    it('should set nested properties on the `cache` object.', function() {
      app.set('c', {d: 'e'});
      assert.equal(app.get('c').d, 'e');
    });

    it('should return `this` for chaining', function() {
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

    it('should otherwise return the value', function() {
      app.set('a', 'b');
      assert.equal(app.get('a'), 'b');
    });
  });
});