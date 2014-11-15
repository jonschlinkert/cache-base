/*!
 * cache-base <https://github.com/jonschlinkert/cache-base>
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var should = require('should');
var Cache = require('..');
var app;


describe('app.hasOwn()', function () {
  beforeEach(function() {
    app = new Cache();
  });

  describe('.hasOwn()', function () {
    it('should return `true` if the property is on the cache.', function () {
      app.set('a', 'b');
      app.hasOwn('a').should.be.true;
    });

    it('should return `false` if the property is not on the cache.', function () {
      app.set('a', 'b');
      app.hasOwn('b').should.be.false;
    });
  });

  describe('.hasOwn()', function () {
    it('should return `true` if the property is on the cache.', function () {
      app.set('a', 'b');
      app.get('a').should.equal('b');

      app.hasOwn('a').should.be.true;
      app.hasOwn({}, 'a').should.be.false;
    });

    it('should return `true` if the property is on the given object.', function () {
      app.set('a', 'b');
      app.hasOwn('a').should.be.true;
      app.hasOwn({}, 'a').should.be.false;
    });


    it('should return `false` when the property does not exist on the cache.', function () {
      app.set('a', 'b');
      app.hasOwn('b').should.be.false;
    });

    it('should return `false` when the property does not exist on the given object.', function () {
      app.set('a', 'b');
      app.hasOwn('a').should.be.true;
      app.hasOwn({}, 'a').should.be.false;
    });
  });
});