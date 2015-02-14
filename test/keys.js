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


describe('app.keys()', function () {
  beforeEach(function() {
    app = new Cache();
  });

  describe('.keys()', function () {
    it('should return the keys from objects on the `cache`.', function () {
      app.set('a', 'b');
      app.keys().should.eql(['a']);
      app.set('c', 'd');
      app.keys().should.eql(['a', 'c']);
    });

    it('should return the keys from the given object', function () {
      app.keys({a: 'a', b: 'b'}).should.eql(['a', 'b']);
    });
  });
});