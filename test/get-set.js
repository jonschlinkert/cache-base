/*!
 * cache-base <https://github.com/jonschlinkert/cache-base>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT license.
 */

'use strict';

var assert = require('assert');
var should = require('should');
var Cache = require('..');
var app;


describe('app.get()/app.set()', function () {
  beforeEach(function() {
    app = new Cache();
  });

  describe('.set()', function () {
    it('should set a value', function () {
      app.set('a', 'b');
      app.get('a').should.equal('b');
    });

    it('should set properties on the `cache` object.', function () {
      app.set('a', 'b');
      app.cache.a.should.equal('b');
    });

    it('should allow an object to be set directly.', function () {
      app.set({x: 'y'});
      app.cache.x.should.equal('y');
      app.get('x').should.equal('y');
    });

    it('should set nested properties on the `cache` object.', function () {
      app.set('c', {d: 'e'});
      app.get('c').d.should.equal('e');
    });

    it('should return `this` for chaining', function () {
      app.set('a', 'b').should.equal(app);
      app
        .set('aa', 'bb')
        .set('bb', 'cc')
        .set('cc', 'dd');
      app.get('aa').should.equal('bb');
      app.get('bb').should.equal('cc');
      app.get('cc').should.equal('dd');
    });

    it('should return undefined when not set', function () {
      app.set('a', undefined).should.equal(app);
    });
  });

  describe('.get()', function () {
    it('should return undefined when no set', function () {
      assert(app.get('a') === undefined);
    });

    it('should otherwise return the value', function () {
      app.set('a', 'b');
      app.get('a').should.equal('b');
    });
  });

});