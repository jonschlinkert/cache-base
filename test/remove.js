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

describe('app.clear()', function () {
  beforeEach(function() {
    app = new Cache();
  });

  it('should remove a single property from the cache.', function () {
    app.extend({a: {b: 'c'}, d: {e: 'f'}, g: {h: 'i'}});
    app.cache.should.have.properties('a', 'd', 'g');
    app.clear('a');
    app.cache.should.have.properties('d', 'g');
    app.cache.should.not.have.property('a');
  });
});

describe('app.omit()', function () {
  beforeEach(function() {
    app = new Cache();
  });

  it('should remove a single property from the cache.', function () {
    app.extend({a: {b: 'c'}, d: {e: 'f'}, g: {h: 'i'}});
    app.cache.should.have.properties('a', 'd', 'g');
    app.omit('a');
    app.cache.should.have.properties('d', 'g');
    app.cache.should.not.have.property('a');
  });

  it('should remove multiple properties from the cache.', function () {
    app.extend({a: {b: 'c'}, d: {e: 'f'}, g: {h: 'i'}});
    app.cache.should.have.properties('a', 'd', 'g');
    app.omit(['a', 'g']);
    app.cache.should.have.property('d');
    app.cache.should.not.have.properties('a', 'g');
  });
});
