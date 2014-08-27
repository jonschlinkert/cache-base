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
var _ = require('lodash');

describe('config option', function() {
  describe('.option()', function() {
    beforeEach(function () {
      config = new Config();
    })

    it('should set an option.', function() {
      config.option('a', 'b');
      config.options.should.have.property('a');
    });

    it('should get an option.', function() {
      config.option('a', 'b');
      config.option('a').should.equal('b');
    });

    it('should extend the `options` object.', function() {
      config.option({x: 'xxx', y: 'yyy', z: 'zzz'});
      config.option('x').should.equal('xxx');
      config.option('y').should.equal('yyy');
      config.option('z').should.equal('zzz');
    });

    it('options should be on the `options` object.', function() {
      config.option({x: 'xxx', y: 'yyy', z: 'zzz'});
      config.options.x.should.equal('xxx');
      config.options.y.should.equal('yyy');
      config.options.z.should.equal('zzz');
    });

    it('should be chainable.', function() {
      config
        .option({x: 'xxx', y: 'yyy', z: 'zzz'})
        .option({a: 'aaa', b: 'bbb', c: 'ccc'});

      config.option('x').should.equal('xxx');
      config.option('a').should.equal('aaa');
    });

    it('should extend the `options` object when the first param is a string.', function() {
      config
        .option('foo', {x: 'xxx', y: 'yyy', z: 'zzz'})
        .option('bar', {a: 'aaa', b: 'bbb', c: 'ccc'});

      config.option('foo').should.have.property('x');
      config.option('bar').should.have.property('a');

      config.options.foo.should.have.property('x');
      config.options.bar.should.have.property('a');
    });
  });

});
