/*!
 * cache-base <https://github.com/jonschlinkert/cache-base>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var should = require('should');
var Cache = require('..');
var app;

describe('app.merge()', function () {
  beforeEach(function() {
    app = new Cache();
  });

  describe('.merge()', function() {
    it('should merge a value onto the `cache`.', function() {
      app.merge({a: 'b'});
      app.get('a').should.equal('b');
    });

    it('should deep merge a value onto the `cache`.', function() {
      app.merge({a: {b: 'b'}});
      app.merge({a: {c: 'c'}});
      app.get('a').should.eql({b: 'b', c: 'c'});
    });

    it('should merge the `cache` with an object.', function() {
      app
        .merge({x: 'x', y: 'y', z: 'z'})
        .merge({a: 'a', b: 'b', c: 'c'});

      app.get().should.have.property('a');
      app.get().should.have.property('b');
      app.get().should.have.property('c');
      app.get().should.have.property('x');
      app.get().should.have.property('y');
      app.get().should.have.property('z');
    });
  });

  describe('when the same property is set more than once.', function() {
    it('should merge the `cache` with the last value defined.', function() {
      app.merge({a: 'B'}, {a: 'C'});
      app.get('a').should.equal('C');
    });

    it('should merge the `cache` with the last value defined.', function() {
      app
        .merge({a: 'B'})
        .merge({a: 'C'});

      app.get('a').should.equal('C');
    });
  });

  describe('when a string is passed as the first param.', function() {
    it('should merge that property on the cache.', function() {
      app
        .merge('foo', {x: 'x', y: 'y', z: 'z'})
        .merge('bar', {a: 'a', b: 'b', c: 'c'});

      app.get('bar').should.have.property('a');
      app.get('bar').should.have.property('b');
      app.get('bar').should.have.property('c');
      app.get('foo').should.have.property('x');
      app.get('foo').should.have.property('y');
      app.get('foo').should.have.property('z');
    });

    it('should merge the `cache.data` object.', function() {
      app
        .merge('data', {x: 'x', y: 'y', z: 'z'})
        .merge('data', {a: 'a', b: 'b', c: 'c'});

      app.get('data').should.have.property('a');
      app.get('data').should.have.property('b');
      app.get('data').should.have.property('c');
      app.get('data').should.have.property('x');
      app.get('data').should.have.property('y');
      app.get('data').should.have.property('z');
    });
  });

  describe('.merge()', function () {
    it('should merge the cache with a key-value pair.', function () {
      app.merge('a', {b: 'c'});
      app.hasOwn('a').should.be.true;
      app.cache.should.have.property('a', {b: 'c'});
    });

    it('should merge the cache with an object.', function () {
      app.merge({a: 'b', c: 'd'});
      app.hasOwn('a').should.be.true;
      app.hasOwn('c').should.be.true;
    });
  });

  // describe('when a string is passed as the first param.', function() {
  //   it('should merge that property on the cache.', function() {
  //     app
  //       .merge('foo', {xyz: {x: 'x', y: 'y', z: 'z'}})
  //       .merge('bar', {xyz: {a: 'a', b: 'b', c: 'c'}});

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

  //   it('should merge deep properties.', function() {
  //     app.merge('a.b.c.d.xyz', {x: 'x', y: 'y', z: 'z'})

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