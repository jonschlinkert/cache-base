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

  describe('.merge()', function() {
    it('should merge the `cache` object.', function() {
      config
        .merge({x: 'x', y: 'y', z: 'z'})
        .merge({a: 'a', b: 'b', c: 'c'});

      config.get().should.have.property('a');
      config.get().should.have.property('b');
      config.get().should.have.property('c');
      config.get().should.have.property('x');
      config.get().should.have.property('y');
      config.get().should.have.property('z');
    });
  });

  describe('when a string is passed as the first param.', function() {
    it('should merge that property on the cache.', function() {
      config
        .merge('foo', {x: 'x', y: 'y', z: 'z'})
        .merge('bar', {a: 'a', b: 'b', c: 'c'});

      config.get('bar').should.have.property('a');
      config.get('bar').should.have.property('b');
      config.get('bar').should.have.property('c');
      config.get('foo').should.have.property('x');
      config.get('foo').should.have.property('y');
      config.get('foo').should.have.property('z');
    });
  });

  describe('when a string is passed as the first param.', function() {
    it('should merge that property on the cache.', function() {
      config
        .merge('foo.xyz', {x: 'x', y: 'y', z: 'z'})
        .merge('bar.xyz', {a: 'a', b: 'b', c: 'c'});

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

    it('should merge deep properties.', function() {
      config.merge('a.b.c.d.xyz', {x: 'x', y: 'y', z: 'z'})

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
