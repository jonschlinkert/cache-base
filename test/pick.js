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


describe('app.pick()', function () {
  beforeEach(function() {
    app = new Cache();
  });

  describe('.pick()', function () {
    it('should extend the cache with specified values on the given object:', function () {
      app.extend({x: 'x', y: 'y', z: 'z'});
      var o = {a: 'a', b: 'b', c: 'c'};
      app.pick(o, ['a', 'b']);

      app.cache.should.have.properties(['a', 'b', 'x', 'y', 'z']);
      app.cache.a.should.equal('a');
      app.cache.b.should.equal('b');
      app.cache.should.not.have.property(['c']);
    });
  });
});
