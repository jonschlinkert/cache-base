/*!
 * config-cache <https://github.com/jonschlinkert/config-cache>
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var should = require('should');
var Cache = require('..');

describe('Cache', function () {
  describe('constructor:', function () {
    it('when new Cache() is defined:', function () {
      var config = new Cache({
        one: 1,
        two: 2
      });
      config.get('one').should.eql(1);
      config.get('two').should.eql(2);
      config.should.be.instanceOf(Cache);
    });
  });

  describe('keys():', function () {
    var config = new Cache();
    it('should return the keys of properties on the cache.', function () {
      config.set('a', 1);
      config.set('b', 2);
      config.set('c', 3);
      config.keys().should.eql(['a', 'b', 'c']);
    });
  });

  describe('get/set:', function () {
    var config = new Cache();

    afterEach(function() {
      config.clear();
    });

    describe('set() - add:', function () {
      it('should set a new property with the given value', function () {
        config.set('one', 1);
        config.get('one').should.eql(1);
      });
    });

    describe('set() - update:', function () {
      it('should update an existing property with the given value', function () {
        config.set('one', 2);
        config.get('one').should.eql(2);
      });

      it('should get the given property', function () {
        config.set('a', 'b');
        config.get('a').should.eql('b');
      });
    });
  });

  describe('get():', function () {
    var config = new Cache();
    var obj = {a: {b: {c: 1, d: '', e: null, f: undefined, 'g.h.i': 2}}};
    config.merge(obj);

    it('should get immediate properties.', function() {
      config.get('a').should.eql(obj.a);
    });
    it('should get nested properties.', function() {
      config.get('a.b').should.eql(obj.a.b);
    });
    it('should return undefined for nonexistent properties.', function() {
      (typeof config.get('a.x')).should.be.undefined;
    });
    it('should return values.', function() {
      config.get('a.b.c').should.eql(1);
    });
    it('should return values.', function() {
      config.get('a.b.d').should.eql('');
    });
    it('should return values.', function() {
      (typeof config.get('a.b.e')).should.be.an.object;
      // config.get('a.b.e').should.equal.null;
    });
    it('should return values.', function() {
      (typeof config.get('a.b.f')).should.be.undefined;
    });
    it('literal backslash should escape period in property name.', function() {
      config.get('a.b.g\\.h\\.i').should.equal(2);
    });
    it('should just return existing properties.', function() {
      config.get('a', true).should.eql(config.cache.a);
    });
    it('should create immediate properties.', function() {
      config.get('b', true).should.eql(config.cache.b);
    });
    it('should create nested properties.', function() {
      config.get('c.d.e', true).should.eql(config.cache.c.d.e);
    });
  });

  describe('all:', function () {
    var config = new Cache();

    it('should list the entire cache', function () {
      config.get().should.eql(config.cache);
    });
  });

  describe('set()/get():', function () {
    var config = new Cache();
    it('should return immediate property value.', function() {
      config.set('a', 1);
      config.get('a').should.eql(1)
    });
    it('should set property value.', function() {
      config.cache.a.should.eql(1);
    });
    it('should return nested property value.', function() {
      config.set('b.c.d', 1);
      config.get('b.c.d').should.eql(1);
    });
    it('should set property value.', function() {
      config.cache.b.c.d.should.eql(1);
    });
    it('literal backslash should escape period in property name.', function() {
      config.set('e\\.f\\.g', 1);
      config.get('e\\.f\\.g').should.eql(1);
      config.cache['e.f.g'].should.eql(1);
    });
  });

  describe('exists():', function () {
    var config = new Cache();
    var obj = {a: {b: {c: 1, d: '', e: null, f: undefined, 'g.h.i': 2}}};

    config.merge(obj);

    it('immediate property should exist.', function() {
      config.exists('a').should.be.ok;
    });
    it('nested property should exist.', function() {
      config.exists('a.b').should.be.ok;
    });
    it('nested property should exist.', function() {
      config.exists('a.b.c').should.be.ok;
    });
    it('nested property should exist.', function() {
      config.exists('a.b.d').should.be.ok;
    });
    it('nested property should exist.', function() {
      config.exists('a.b.e').should.be.ok;
    });
    it('nested property should exist.', function() {
      config.exists('a.b.f').should.be.ok;
    });
    it('literal backslash should escape period in property name.', function() {
      config.exists('a.b.g\\.h\\.i').should.be.ok;
    });
    it('nonexistent property should not exist.', function() {
      config.exists('x').should.eql(false);
    });
    it('nonexistent property should not exist.', function() {
      config.exists('a.x').should.eql(false);
    });
    it('nonexistent property should not exist.', function() {
      config.exists('a.b.x').should.eql(false);
    });
  });
});
