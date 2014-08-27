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


describe('config get/set', function () {
  afterEach(function() {
    config.clear();
  });

  describe('.enable()', function () {
    it('should set the value to true', function () {
      config.enable('foo').should.equal(config);
      config.get('foo').should.be.ok;
    });
  });

  describe('.enabled()', function () {
    it('should default to false', function () {
      config.enabled('xyz').should.be.false;
    });

    it('should return true when set', function () {
      config.set('a', 'b');
      config.enabled('a').should.be.ok;
    });

    it('should return true when set', function () {
      config.set('a', false);
      config.enabled('a').should.be.false;
    });
  });

  describe('.disable()', function () {
    it('should set the value to false', function () {
      config.disable('foo').should.equal(config);
      config.get('foo').should.be.false;
    });
  });
  describe('.disabled()', function () {
    it('should default to true', function () {
      config.disabled('xyz').should.be.ok;
    });

    it('should return false when set', function () {
      config.set('abc', 'xyz');
      config.disabled('abc').should.be.false;
    });
  });
});