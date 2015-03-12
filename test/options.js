/*!
 * cache-base <https://github.com/jonschlinkert/cache-base>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var should = require('should');
var Cache = require('..');
var app;

describe('option', function () {
  beforeEach(function() {
    app = new Cache();
  });

  describe('.option()', function () {
    it('should set an option from a key-value pair.', function () {
      app.option('a', {b: 'c'});
      app.option('a').should.eql({b: 'c'});
    });

    it('should set an option from an object.', function () {
      app.option({b: {d: 'e'}});
      app.option('b').should.eql({d: 'e'});
    });

    it('should set multiple options from an object.', function () {
      app.option({a: 'b', c: 'd', e: 'f'});
      app.options.should.have.properties(['a', 'c', 'e']);
      app.options.should.have.property('a', 'b');
      app.options.should.have.property('c', 'd');
      app.options.should.have.property('e', 'f');
    });
    it('should set options from multiple objects.', function () {
      app.option({a: 'b'}, {c: 'd'}, {e: 'f'});
      app.options.should.have.properties(['a', 'c', 'e']);
      app.options.should.have.property('a', 'b');
      app.options.should.have.property('c', 'd');
      app.options.should.have.property('e', 'f');
    });

    it('should set an option.', function() {
      app.option('a', 'b');
      app.options.should.have.property('a');
    });

    it('should get an option.', function() {
      app.option('a', 'b');
      app.option('a').should.equal('b');
    });

    it('should extend the `options` object.', function() {
      app.option({x: 'xxx', y: 'yyy', z: 'zzz'});
      app.option('x').should.equal('xxx');
      app.option('y').should.equal('yyy');
      app.option('z').should.equal('zzz');
    });

    it('options should be on the `options` object.', function() {
      app.option({x: 'xxx', y: 'yyy', z: 'zzz'});
      app.options.x.should.equal('xxx');
      app.options.y.should.equal('yyy');
      app.options.z.should.equal('zzz');
    });

    it('should be chainable.', function() {
      app
        .option({x: 'xxx', y: 'yyy', z: 'zzz'})
        .option({a: 'aaa', b: 'bbb', c: 'ccc'});

      app.option('x').should.equal('xxx');
      app.option('a').should.equal('aaa');
    });

    it('should extend the `options` object when the first param is a string.', function() {
      app
        .option('foo', {x: 'xxx', y: 'yyy', z: 'zzz'})
        .option('bar', {a: 'aaa', b: 'bbb', c: 'ccc'});

      app.option('foo').should.have.property('x');
      app.option('bar').should.have.property('a');

      app.options.foo.should.have.property('x');
      app.options.bar.should.have.property('a');
    });
  });
});