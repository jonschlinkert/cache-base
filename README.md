# cache-base [![NPM version](https://img.shields.io/npm/v/cache-base.svg?style=flat)](https://www.npmjs.com/package/cache-base) [![NPM monthly downloads](https://img.shields.io/npm/dm/cache-base.svg?style=flat)](https://npmjs.org/package/cache-base) [![NPM total downloads](https://img.shields.io/npm/dt/cache-base.svg?style=flat)](https://npmjs.org/package/cache-base) [![Linux Build Status](https://img.shields.io/travis/jonschlinkert/cache-base.svg?style=flat&label=Travis)](https://travis-ci.org/jonschlinkert/cache-base)

> Basic object cache with `get`, `set`, `del`, and `has` methods for node.js/javascript projects.

Please consider following this project's author, [Jon Schlinkert](https://github.com/jonschlinkert), and consider starring the project to show your :heart: and support.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save cache-base
```

## Usage

```js
const Cache = require('cache-base');
```

**Instantiate**

```js
// instantiate
const cache = new Cache();

// set values
cache.set('a', 'b');
cache.set('c.d', 'e');

// get values
console.log(cache.get('a'));
//=> 'b'
console.log(cache.get('c'));
//=> { d: 'e' }
console.log(cache);
//=> Cache { a: 'b' }
```

**Initialize with an object**

```js
// instantiate
const cache = new Cache({ a: 'b', c: { d: 'e' } });

// get values
console.log(cache.get('a'));
//=> 'b'
console.log(cache.get('c'));
//=> { d: 'e' }
console.log(cache.get('c.d'));
//=> 'e'
console.log(cache);
//=> Cache { a: 'b' }
```

**Inherit**

```js
class MyApp extends Cache {}

var cache = new MyApp();
cache.set('a', 'b');
console.log(cache.get('a'));
//=> 'b'
```

**Custom namespace**

Define a custom property name for storing values. By default, values are stored directly on the instance (for example, when `cache.set('foo', 'bar')` is used, `cache.foo` would be `bar`).

```js
const Cache = require('cache-base');
const cache = new Cache('data', { a: 'b' });
cache.set('c.d', 'e');

// get values
console.log(cache.get('a'));
//=> 'b'
console.log(cache.get('c'));
//=> { d: 'e' }
console.log(cache.data);
//=> { a: 'b', c: { d: 'e' } }
console.log(cache);
//=> Cache { data: { a: 'b', c: { d: 'e' } } }
```

## API

**Params**

* `cache` **{Object}**: Optionally pass an object to initialize with.

**Example**

```js
const cache = new Cache();
```

### [.set](index.js#L65)

Assign `value` to `key`. Also emits `set` with the key and value.

**Params**

* `key` **{String|Array}**: The name of the property to set. Dot-notation or an array of object path segments may be used.
* `value` **{any}**
* `returns` **{Object}**: Returns the instance for chaining.

**Events**

* `emits`: `set` with `key` and `value` as arguments.

**Example**

```js
cache.on('set', function(key, val) {
  // do something when `set` is emitted
});

cache.set(key, value);

// also takes an object or array
cache.set({name: 'Halle'});
cache.set([{foo: 'bar'}, {baz: 'quux'}]);
console.log(cache);
//=> {name: 'Halle', foo: 'bar', baz: 'quux'}
```

### [.union](index.js#L95)

Union `array` to `key`. Also emits `set` with the key and value.

**Params**

* `key` **{String|Array}**: The name of the property to union. Dot-notation or an array of object path segments may be used.
* `value` **{any}**
* `returns` **{Object}**: Returns the instance for chaining.

**Example**

```js
cache.union('a.b', ['foo']);
cache.union('a.b', ['bar']);
console.log(cache.get('a'));
//=> {b: ['foo', 'bar']}
```

### [.get](index.js#L125)

Return the value of `key`. Dot notation may be used to get [nested property values](https://github.com/jonschlinkert/get-value).

**Params**

* `key` **{String|Array}**: The name of the property to get. Dot-notation or an array of object path segments may be used.
* `returns` **{any}**: Returns the value of `key`

**Events**

* `emits`: `get` with `key` and `value` as arguments.

**Example**

```js
cache.set('a.b.c', 'd');
cache.get('a.b');
//=> { c: 'd' }

cache.get(['a', 'b']);
//=> { c: 'd' }
```

### [.has](index.js#L152)

Return true if cache has a stored value for `key`, false only if value is `undefined`.

**Params**

* `key` **{String|Array}**: The name of the property to check. Dot-notation or an array of object path segments may be used.
* `returns` **{Boolean}**

**Events**

* `emits`: `has` with `key` and true or false as arguments.

**Example**

```js
cache.set('foo', 'bar');
cache.has('foo');
//=> true
```

### [.del](index.js#L180)

Delete one or more properties from the instance.

**Params**

* `key` **{String|Array}**: The name of the property to delete. Dot-notation or an array of object path segments may be used.
* `returns` **{Object}**: Returns the instance for chaining.

**Events**

* `emits`: `del` with the `key` as the only argument.

**Example**

```js
cache.del(); // delete all
// or
cache.del('foo');
// or
cache.del(['foo', 'bar']);
```

### [.visit](index.js#L201)

Visit `method` over the properties in the given object, or map
visit over the object-elements in an array.

**Params**

* `key` **{String|Array}**: The name of the method to visit. Dot-notation or an array of object path segments may be used.
* `val` **{Object|Array}**: The object or array to iterate over.
* `returns` **{Object}**: Returns the instance for chaining.

**Example**

```js
cache.clear();
```

## About

<details>
<summary><strong>Contributing</strong></summary>

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

</details>

<details>
<summary><strong>Running Tests</strong></summary>

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```

</details>
<details>
<summary><strong>Building docs</strong></summary>

_(This project's readme.md is generated by [verb](https://github.com/verbose/verb-generate-readme), please don't edit the readme directly. Any changes to the readme must be made in the [.verb.md](.verb.md) readme template.)_

To generate the readme, run the following command:

```sh
$ npm install -g verbose/verb#dev verb-generate-readme && verb
```

</details>

### Related projects

You might also be interested in these projects:

* [base-methods](https://www.npmjs.com/package/base-methods): base-methods is the foundation for creating modular, unit testable and highly pluggable node.js applications, starting… [more](https://github.com/jonschlinkert/base-methods) | [homepage](https://github.com/jonschlinkert/base-methods "base-methods is the foundation for creating modular, unit testable and highly pluggable node.js applications, starting with a handful of common methods, like `set`, `get`, `del` and `use`.")
* [get-value](https://www.npmjs.com/package/get-value): Use property paths (`a.b.c`) to get a nested value from an object. | [homepage](https://github.com/jonschlinkert/get-value "Use property paths (`a.b.c`) to get a nested value from an object.")
* [has-value](https://www.npmjs.com/package/has-value): Returns true if a value exists, false if empty. Works with deeply nested values using… [more](https://github.com/jonschlinkert/has-value) | [homepage](https://github.com/jonschlinkert/has-value "Returns true if a value exists, false if empty. Works with deeply nested values using object paths.")
* [option-cache](https://www.npmjs.com/package/option-cache): Simple API for managing options in JavaScript applications. | [homepage](https://github.com/jonschlinkert/option-cache "Simple API for managing options in JavaScript applications.")
* [set-value](https://www.npmjs.com/package/set-value): Create nested values and any intermediaries using dot notation (`'a.b.c'`) paths. | [homepage](https://github.com/jonschlinkert/set-value "Create nested values and any intermediaries using dot notation (`'a.b.c'`) paths.")
* [unset-value](https://www.npmjs.com/package/unset-value): Delete nested properties from an object using dot notation. | [homepage](https://github.com/jonschlinkert/unset-value "Delete nested properties from an object using dot notation.")

### Contributors

| **Commits** | **Contributor** | 
| --- | --- |
| 57 | [jonschlinkert](https://github.com/jonschlinkert) |
| 2 | [wtgtybhertgeghgtwtg](https://github.com/wtgtybhertgeghgtwtg) |

### Author

**Jon Schlinkert**

* [linkedin/in/jonschlinkert](https://linkedin.com/in/jonschlinkert)
* [github/jonschlinkert](https://github.com/jonschlinkert)
* [twitter/jonschlinkert](https://twitter.com/jonschlinkert)

### License

Copyright © 2017, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT License](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.6.0, on December 17, 2017._