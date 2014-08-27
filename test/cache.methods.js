/*!
 * config-cache <https://github.com/jonschlinkert/config-cache>
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var should = require('should');
var Config = require('..');
var config = new Config();

describe('config methods', function() {
  describe('.methods()', function() {
    it('should be object.', function() {
      config.methods(config).should.be.an.object;
    });

    it('should return the methods on an object.', function() {
      config.methods(config).should.have.property('set');
      config.methods(config).should.have.property('get');
    });
  });
});
