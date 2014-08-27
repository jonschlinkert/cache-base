/*!
 * config-cache <https://github.com/jonschlinkert/config-cache>
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var should = require('should');
var Config = require('..');
var config = new Config();

describe('config data', function() {
  beforeEach(function() {
    config.clear();
  });

  describe('.extend()', function() {
    it('should extend the `cache` with a value.', function() {
      config.extend({a: 'b'});
      config.get('a').should.equal('b');
    });

    it('should extend the `cache` with an object.', function() {
      config
        .extend({x: 'x', y: 'y', z: 'z'})
        .extend({a: 'a', b: 'b', c: 'c'});

      config.get().should.have.property('a');
      config.get().should.have.property('b');
      config.get().should.have.property('c');
      config.get().should.have.property('x');
      config.get().should.have.property('y');
      config.get().should.have.property('z');
    });
  });

  describe('when the same property is set more than once.', function() {
    it('should extend the `cache` with the last value defined.', function() {
      config.extend({a: 'B'}, {a: 'C'});
      config.get('a').should.equal('C');
    });

    it('should extend the `cache` with the last value defined.', function() {
      config
        .extend({a: 'B'})
        .extend({a: 'C'});

      config.get('a').should.equal('C');
    });
  });

  describe('when a string is passed as the first param.', function() {
    it('should extend that property on the cache.', function() {
      config
        .extend('foo', {x: 'x', y: 'y', z: 'z'})
        .extend('bar', {a: 'a', b: 'b', c: 'c'});

      config.get('bar').should.have.property('a');
      config.get('bar').should.have.property('b');
      config.get('bar').should.have.property('c');
      config.get('foo').should.have.property('x');
      config.get('foo').should.have.property('y');
      config.get('foo').should.have.property('z');
    });

    it('should extend the `cache.data` object.', function() {
      config
        .extend('data', {x: 'x', y: 'y', z: 'z'})
        .extend('data', {a: 'a', b: 'b', c: 'c'});

      config.get('data').should.have.property('a');
      config.get('data').should.have.property('b');
      config.get('data').should.have.property('c');
      config.get('data').should.have.property('x');
      config.get('data').should.have.property('y');
      config.get('data').should.have.property('z');
    });
  });

  describe('when a string is passed as the first param.', function() {
    it('should extend that property on the cache.', function() {
      config
        .extend('foo.xyz', {x: 'x', y: 'y', z: 'z'})
        .extend('bar.xyz', {a: 'a', b: 'b', c: 'c'});

      config.get('bar.xyz').should.have.property('a');
      config.get('bar.xyz').should.have.property('b');
      config.get('bar.xyz').should.have.property('c');
      config.get('foo.xyz').should.have.property('x');
      config.get('foo.xyz').should.have.property('y');
      config.get('foo.xyz').should.have.property('z');

      config.cache.bar.should.have.property('xyz');
      config.cache.bar.should.have.property('xyz');
      config.cache.bar.should.have.property('xyz');
      config.cache.foo.should.have.property('xyz');
      config.cache.foo.should.have.property('xyz');
      config.cache.foo.should.have.property('xyz');
    });

    it('should extend deep properties.', function() {
      config.extend('a.b.c.d.xyz', {x: 'x', y: 'y', z: 'z'})

      config.get('a.b.c.d.xyz').should.have.property('x');
      config.get('a.b.c.d.xyz').should.have.property('y');
      config.get('a.b.c.d.xyz').should.have.property('z');

      config.cache.a.b.c.d.should.have.property('xyz');
      config.cache.a.b.c.d.should.have.property('xyz');
      config.cache.a.b.c.d.should.have.property('xyz');

      config.cache.a.b.c.d.xyz.should.have.property('x');
      config.cache.a.b.c.d.xyz.should.have.property('x');
      config.cache.a.b.c.d.xyz.should.have.property('x');
    });
  });
});
