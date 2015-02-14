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

describe('app.forOwn()', function () {
  beforeEach(function() {
    app = new Cache();
  });

  describe('constructor:', function () {
    it('when new Cache() is defined:', function () {
      var app = new Cache({
        one: 1,
        two: 2
      });
      app.get('one').should.eql(1);
      app.get('two').should.eql(2);
      app.should.be.instanceOf(Cache);
    });
  });

  describe('keys():', function () {
    var app = new Cache();
    it('should return the keys of properties on the cache.', function () {
      app.set('a', 1);
      app.set('b', 2);
      app.set('c', 3);
      app.keys().should.eql(['a', 'b', 'c']);
    });
  });

  describe('get/set:', function () {
    var app = new Cache();

    afterEach(function() {
      app.clear();
    });

    describe('set() - add:', function () {
      it('should set a new property with the given value', function () {
        app.set('one', 1);
        app.get('one').should.eql(1);
      });
    });

    describe('set() - update:', function () {
      it('should update an existing property with the given value', function () {
        app.set('one', 2);
        app.get('one').should.eql(2);
      });

      it('should get the given property', function () {
        app.set('a', 'b');
        app.get('a').should.eql('b');
      });
    });
  });


});
