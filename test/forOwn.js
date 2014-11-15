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

describe('app.forOwn()', function () {
  beforeEach(function() {
    app = new Cache();
  });

  it('should loop through all properties on the cache.', function () {
    var o = {a: {b: 'c'}, d: {e: 'f'}, g: {h: 'i'}};
    app.extend(o);
    var values = [];
    var keys = [];

    app.forOwn(function (value, key, obj) {
      o.should.eql(obj);
      keys.push(key);
      values.push(value);
    });

    keys.should.eql(['a', 'd', 'g']);
    values.should.eql([{b: 'c'}, {e: 'f'}, {h: 'i'}]);
  });

  it('should loop through all properties on the given object.', function () {
    var obj = {a: 'foo', b: 'bar', c: 'baz'};
    var values = [];
    var keys = [];

    app.forOwn(obj, function (value, key, o) {
      o.should.eql(obj);
      keys.push(key);
      values.push(value);
    });

    keys.should.eql(['a', 'b', 'c']);
    values.should.eql(['foo', 'bar', 'baz']);
  });

  it('should expose `this` object.', function () {
    app.extend({a: {b: 'c'}, d: {e: 'f'}, g: {h: 'i'}});
    app.forOwn(function (value, key, obj) {
      this.cache.should.have.property('a');
    });
  });

  it('should allow custom `thisArg` to be passed.', function () {
    app.extend({a: {b: 'c'}, d: {e: 'f'}, g: {h: 'i'}});
    app.forOwn(function (value, key, obj) {
      this.should.have.property('foo', 'b');
    }, {foo: 'b'});
  });
});