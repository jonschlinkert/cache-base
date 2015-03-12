/*!
 * cache-base <https://github.com/jonschlinkert/cache-base>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var assert = require('assert');
var should = require('should');
var Cache = require('..');
var app;

describe('app.forOwn()', function () {
  beforeEach(function() {
    app = new Cache();
  });

  describe('.extend()', function() {
    it('should extend the `cache` object with an object.', function() {
      app.extend({a: 'b'});
      app.get('a').should.equal('b');
    });

    it('should extend the given object with a key/value pair.', function() {
      app.set('a', {b: 'c'});
      app.extend('a', {d: 'e'});
      app.get('a').should.eql({b: 'c', d: 'e'});
    });

    it('should extend the `cache` object with a list of values.', function() {
      app.extend({a: 'b'}, {c: 'd'});
      app.get().should.eql({a: 'b', c: 'd'});
    });

    it('should extend the `cache` object with an array of values.', function() {
      app.extend([{a: 'b'}, {c: 'd'}]);
      app.get().should.eql({a: 'b', c: 'd'});
    });

    it('should extend the `cache` object a mixture of list values and array values.', function() {
      app.extend({a: 'b'}, [{c: 'd'}, {e: 'f'}]);
      app.get().should.eql({a: 'b', c: 'd', e: 'f'});
    });

    it('should be chainable.', function() {
      app
        .extend({x: 'x', y: 'y', z: 'z'})
        .extend({a: 'a', b: 'b', c: 'c'});

      app.get().should.have.properties('a', 'b', 'c', 'x', 'y', 'z');
    });
  });

  describe('when the same property is set more than once.', function() {
    it('should extend the `cache` object with the last value defined.', function() {
      app.extend({a: 'B'}, {a: 'C'});
      app.get('a').should.equal('C');
    });

    it('should extend the `cache` object with the last value defined.', function() {
      app
        .extend({a: 'B'})
        .extend({a: 'C'});

      app.get('a').should.equal('C');
    });
  });

  describe('when a string is passed as the first param.', function() {
    it('should extend that property on the cache.', function() {
      app
        .extend('foo', {x: 'x', y: 'y', z: 'z'})
        .extend('bar', {a: 'a', b: 'b', c: 'c'});

      app.get('bar').should.have.property('a');
      app.get('bar').should.have.property('b');
      app.get('bar').should.have.property('c');
      app.get('foo').should.have.property('x');
      app.get('foo').should.have.property('y');
      app.get('foo').should.have.property('z');
    });

    it('should extend the `cache.data` object.', function() {
      app
        .extend('data', {x: 'x', y: 'y', z: 'z'})
        .extend('data', {a: 'a', b: 'b', c: 'c'});

      app.get('data').should.have.property('a');
      app.get('data').should.have.property('b');
      app.get('data').should.have.property('c');
      app.get('data').should.have.property('x');
      app.get('data').should.have.property('y');
      app.get('data').should.have.property('z');
    });
  });

  describe('.extend()', function () {
    it('should extend the cache with a key-value pair.', function () {
      app.extend('a', {b: 'c'});
      app.hasOwn('a').should.be.true;
      app.cache.should.have.property('a', {b: 'c'});
    });

    it('should extend the cache with an object.', function () {
      app.extend({a: 'b', c: 'd'});
      app.hasOwn('a').should.be.true;
      app.hasOwn('c').should.be.true;
    });
  });

  // describe('when a string is passed as the first param.', function() {
  //   it('should extend that property on the cache.', function() {
  //     app
  //       .extend('foo', {xyz: {x: 'x', y: 'y', z: 'z'}})
  //       .extend('bar', {xyz: {a: 'a', b: 'b', c: 'c'}});

  //     app.get('bar.xyz').should.have.property('a');
  //     app.get('bar.xyz').should.have.property('b');
  //     app.get('bar.xyz').should.have.property('c');
  //     app.get('foo.xyz').should.have.property('x');
  //     app.get('foo.xyz').should.have.property('y');
  //     app.get('foo.xyz').should.have.property('z');

  //     app.cache.bar.should.have.property('xyz');
  //     app.cache.bar.should.have.property('xyz');
  //     app.cache.bar.should.have.property('xyz');
  //     app.cache.foo.should.have.property('xyz');
  //     app.cache.foo.should.have.property('xyz');
  //     app.cache.foo.should.have.property('xyz');
  //   });

  //   it('should extend deep properties.', function() {
  //     app.extend('a.b.c.d.xyz', {x: 'x', y: 'y', z: 'z'})

  //     app.get('a.b.c.d.xyz').should.have.property('x');
  //     app.get('a.b.c.d.xyz').should.have.property('y');
  //     app.get('a.b.c.d.xyz').should.have.property('z');

  //     app.cache.a.b.c.d.should.have.property('xyz');
  //     app.cache.a.b.c.d.should.have.property('xyz');
  //     app.cache.a.b.c.d.should.have.property('xyz');

  //     app.cache.a.b.c.d.xyz.should.have.property('x');
  //     app.cache.a.b.c.d.xyz.should.have.property('x');
  //     app.cache.a.b.c.d.xyz.should.have.property('x');
  //   });
  // });
});