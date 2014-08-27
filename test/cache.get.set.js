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

  describe('.set()', function () {
    it('should set a value', function () {
      config.set('a', 'b');
      config.get('a').should.equal('b');
    });

    it('should set properties on the `cache` object.', function () {
      config.set('a', 'b');
      config.cache.a.should.equal('b');
    });

    it('should allow an object to be set directly.', function () {
      config.set({x: 'y'});
      config.cache.x.should.equal('y');
      config.get('x').should.equal('y');
    });

    it('should set nested properties on the `cache` object.', function () {
      config.set('c', {d: 'e'});
      config.get('c').d.should.equal('e');
    });

    it('should use dot notation to `set` values.', function () {
      config.set('h.i', 'j');
      config.get('h').should.eql({i: 'j'});
    });

    it('should use dot notation to `get` values.', function () {
      config.set('h', {i: 'j'});
      config.get('h.i').should.equal('j');
    });

    it('should return `this` for chaining', function () {
      config.set('a', 'b').should.equal(config);
      config
        .set('aa', 'bb')
        .set('bb', 'cc')
        .set('cc', 'dd');
      config.get('aa').should.equal('bb');
      config.get('bb').should.equal('cc');
      config.get('cc').should.equal('dd');
    });

    it('should expand template strings in the config.', function () {
      config
        .set('l', 'm')
        .set('j', {k: '${l}'}, true);
      config.cache.j.k.should.eql('m');
      config.get('j.k').should.eql('m');
    });

    it('should return undefined when not set', function () {
      config.set('a', undefined).should.equal(config);
    });
  });

  describe('.get()', function () {
    it('should return undefined when no set', function () {
      assert(config.get('a') === undefined);
    });

    it('should otherwise return the value', function () {
      config.set('a', 'b');
      config.get('a').should.equal('b');
    });
  });


  describe('.exists()', function () {
    it('should return `false` when not set', function () {
      config.exists('alsjls').should.be.false;
    });

    it('should return `true` when set.', function () {
      config.set('baba', 'zz');
      config.exists('baba').should.be.ok;
    });
  });
});