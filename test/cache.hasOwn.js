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


describe('config hasOwnProperty', function () {
  afterEach(function() {
    config.clear();
  });

  describe('.hasOwn()', function () {
    it('should return `true` if the property is on the cache.', function () {
      config.set('a', 'b');
      config.get('a').should.equal('b');
      config.get('a').should.be.ok;

      config.hasOwn('a').should.be.ok;
      config.hasOwn('a', {}).should.be.false;
    });

    it('should return `true` if the property is on the given object.', function () {
      config.set('a', 'b');
      config.hasOwn('a').should.be.true;
      config.hasOwn('a', {}).should.be.false;
    });


    it('should return `false` when the property does not exist on the cache.', function () {
      config.set('a', 'b');
      config.hasOwn('b').should.be.false;
    });

    it('should return `false` when the property does not exist on the given object.', function () {
      config.set('a', 'b');
      config.hasOwn('a').should.be.true;
      config.hasOwn('a', {}).should.be.false;
    });

  });
});