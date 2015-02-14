/*!
 * cache-base <https://github.com/jonschlinkert/cache-base>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT license.
 */

'use strict';

var should = require('should');
var Cache = require('..');
var app;


describe('app.has()', function () {
  beforeEach(function() {
    app = new Cache();
  });

  describe('.has()', function () {
    it('should return `true` if a deep property is on the cache.', function () {
      app.set('a', {b: 'c'});
      app.has('a.b').should.be.true;
    });

    it('should return `false` if a deep property is not on the cache.', function () {
      app.set('a', 'b');
      app.has('a.c').should.be.false;
    });
  });
});