/*!
 * config-cache <https://github.com/jonschlinkert/config-cache>
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var assert = require('assert');
var should = require('should');
var Config = require('..');
var config = new Config();


describe('config omit', function () {
  describe('.omit()', function () {

    it('should omit a value from the cache', function () {
      config.set('a', 'b');

      // property should be on the cache
      config.get('a').should.equal('b');
      config.omit('a');

      // property should not be on the cache
      assert(config.get('a') === undefined);
    });

    it('should omit an array of values from the cache', function () {
      config
      	.set('a', 'a')
      	.set('b', 'b')
      	.set('c', 'c')
      	.set('d', 'd');

      // properties should be on the cache
      config.get('a').should.equal('a');
      config.get('b').should.equal('b');
      config.get('c').should.equal('c');
      config.get('d').should.equal('d');

      config.omit(['a', 'b', 'c', 'd']);

      // properties should not be on the cache
      assert(config.get('a') === undefined);
      assert(config.get('b') === undefined);
      assert(config.get('c') === undefined);
      assert(config.get('d') === undefined);
    });

  });
});