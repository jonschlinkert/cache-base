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
var _ = require('lodash');


describe('config visitor', function () {
  afterEach(function() {
    config.clear();
  });

  describe('.visit()', function () {
    it('should visit each property on the cache, .', function () {
      var obj = {
        a: 'a',
        b: {
          c: 'd',
          e: {
            f: 'f',
            g: {h: {i: {j: 'k'}}}
          }
        }
      };

      var o = _.cloneDeep(obj);
      config.visit(obj, function (key, i) {
        _.extend(o, i);
      });

      o.should.have.property('a');
      o.should.have.property('b');
      o.should.have.property('c');
      o.should.have.property('e');
      o.should.have.property('f');
      o.should.have.property('g');
      o.should.have.property('h');
      o.should.have.property('i');
      o.should.have.property('j');
    });
  });
});