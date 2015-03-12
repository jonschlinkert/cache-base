# cache-base [![NPM version](https://badge.fury.io/js/cache-base.svg)](http://badge.fury.io/js/cache-base)  [![Build Status](https://travis-ci.org/jonschlinkert/cache-base.svg)](https://travis-ci.org/jonschlinkert/cache-base) 

> Generic object cache for node.js/javascript projects.

## Install with [npm](npmjs.org)

```bash
npm i cache-base --save
```

## Usage

Create an instance:

```js
var App = require('cache-base');
var app = new App();
```

**Inherit**

```js
var util = require('util');
var App = require('cache-base');

function App() {
  App.call(this);
}

util.inherits(App, App);
```

**Example usage**

```js
var app = new App();

app.set('a', 'b');
app.get('a');
//=> 'b'

app.enable('abc');
console.log(app.enabled('abc'));
//=> 'true'
```

## API
### [Cache](./index.js#L31)

Create a new instance of `Cache`

* `cache` **{Object}**: Optionally pass an object to initialize with.    

```js
var app = new Cache();
```

### [.set](./index.js#L54)

Assign `value` to `key` or return the value of `key`.

* `key` **{String}**    
* `value` **{*}**    
* `returns` **{Cache}**: for chaining  

```js
app.set(key, value);

// extend
app.set({a: 'b'});
```

### [.get](./index.js#L77)

Return the stored value of `key`. If `key` is not defined, the `cache` is returned.

* `key` **{String}**    

```js
app.set('foo', 'bar');
app.get('foo');
// => "bar"
```

### [.exists](./index.js#L100)

Return `true` if the element exists. Dot notation may be used for nested properties.

* `key` **{String}**    
* `returns`: {Boolean}  

```js
app.exists('author.name');
//=> true
```

### [.extend](./index.js#L122)

Extend the `cache` with the given object.

* `returns` **{Object}** `Cache`: to enable chaining.  

```js
app
  .extend({a: 'b'}, {c: 'd'});
  .extend('e', {f: 'g'});
```

### [.merge](./index.js#L151)

Deep merge an object onto the `cache`.

* `returns` **{Object}** `Cache`: to enable chaining.  

```js
app.merge({a: {one: 'one'}}, {a: {two: 'two'}});
console.log(app.get('a'));
//=> {a: {one: 'one', two: 'two'}}
```

### [.pick](./index.js#L183)

Extend the cache with only the specified values from the given object.

* `key` **{String|Array}**: The key(s) to pick from the object and extend onto `app.cache`    

```js
var obj = {a: 'a', b: 'b', c: 'c'};
app.pick(obj, 'a');
//=> {a: 'a'}

app.pick(obj, ['a', 'b']);
//=> {a: 'a', b: 'b'}
```

### [.omit](./index.js#L200)

Omit a property or array of properties from the cache

* `key` **{String|Array}**: The key(s) to omit from the cache    

```js
app.omit('foo');
// or
app.omit(['foo', 'bar']);
```

### [.forOwn](./index.js#L216)

Return the keys on `obj` or `this.cache`.

* `obj` **{Object}**: Optionally pass an object.    
* `returns` **{Array}**: Array of keys.  

```js
app.forOwn();
```

### [.keys](./index.js#L236)

Return the keys on `obj` or `this.cache`.

* `obj` **{Object}**: Optionally pass an object.    
* `returns` **{Array}**: Array of keys.  

```js
app.keys();
```

### [.functions](./index.js#L254)

Return an object of only the properties on `this.cache` or the given `obj` that have function values.

* `obj` **{Object}**    
* `returns`: {Array}  

```js
app.functions('foo')
//=> {set: [function], get: [function], functions: [function]}
```

### [.has](./index.js#L280)

Return true if a deep property is on the given object or `this.cache`.

* `obj` **{Object}**: Optionally pass an object.    
* `returns` **{String}** `lookup`: Prop string to use for the lookup, e.g. `a.b`  

```js
app.has('a.b.c');
```

### [.hasOwn](./index.js#L303)

Return true if `key` is an own, enumerable property of `this.cache` or the given `obj`.

* `key` **{String}**    
* `obj` **{Object}**: Optionally pass an object to check.    
* `returns`: {Boolean}  

```js
app.hasOwn(key);
// or
app.hasOwn(obj, key);
```

### [.clone](./index.js#L322)

Clone the given `obj` or `cache`.

* `obj` **{Object}**: Optionally pass an object to clone.    
* `returns`: {Boolean}  

```js
app.clone();
```

### [.clear](./index.js#L340)

Remove `key` from the cache, or if no value is specified the entire cache is reset.

* `key` **{String}**: The property to remove.    

**Example:**

```js
app.clear();
```


## Related
* [option-cache](https://github.com/jonschlinkert/option-cache): Simple API for managing options in JavaScript applications.
* [config-cache](https://github.com/jonschlinkert/config-cache): General purpose JavaScript object storage methods.
* [engine-cache](https://github.com/jonschlinkert/engine-cache): express.js inspired template-engine manager.
* [loader-cache](https://github.com/jonschlinkert/loader-cache): Register loader functions that dynamically read, parse or otherwise transform file contents when the name of the loader matches a file extension. You can also compose loaders from other loaders.
* [parser-cache](https://github.com/jonschlinkert/parser-cache): Cache and load parsers, similiar to consolidate.js engines.
* [helper-cache](https://github.com/jonschlinkert/helper-cache): Easily register and get helper functions to be passed to any template engine or node.js application. Methods for both sync and async helpers.

## Contributing
Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/jonschlinkert/cache-base/issues)

## Running tests
Install dev dependencies.

```bash
npm i -d && npm test
```

## Author

**Jon Schlinkert**
 
+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert) 

## License
Copyright (c) 2014-2015 Jon Schlinkert  
Released under the MIT license

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on March 11, 2015._
<!-- deps:mocha -->