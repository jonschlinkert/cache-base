# simple-cache [![NPM version](https://badge.fury.io/js/simple-cache.png)](http://badge.fury.io/js/simple-cache)

> Basic, general purpose object hash, for node.js/javascript projects.

## Install
#### Install with [npm](npmjs.org):

```bash
npm i simple-cache --save-dev
```

## Usage

```js
var Config = require('simple-cache');
var config = new Config();
```

## API
### [Cache](index.js#L29)

Initialize a new `Cache`

* `obj` **{Object}**: Optionally pass an object to initialize with.    

```js
var cache = new Cache();
```

### [.option](index.js#L50)

Set or get an option.

* `key` **{String}**: The option name.    
* `value` **{*}**: The value to set.    
* `returns` **{*|Object}**: Returns `value` if `key` is supplied, or `Cache` for chaining when an option is set.  

```js
cache.option('a', true)
cache.option('a')
// => true
```

### [.set](index.js#L110)

Assign `value` to `key` or return the value of `key`.

* `key` **{String}**    
* `value` **{*}**    
* `expand` **{Boolean}**: Resolve template strings with [expander]    
* `returns` **{Cache}**: for chaining  

```js
cache.set(key, value);
```

If `expand` is defined as true, the value will be set using [expander].

**Examples:**

```js
// as a key-value pair
cache.set('a', {b: 'c'});

// or as an object
cache.set({a: {b: 'c'}});

// chaining is possible
cache
  .set({a: {b: 'c'}})
  .set('d', 'e');
```

Expand template strings with expander:

```js
cache.set('a', {b: '${c}', c: 'd'}, true);
```

Visit the [expander] docs for more info.

[expander]: https://github.com/tkellen/expander
[getobject]: https://github.com/cowboy/node-getobject

### [.get](index.js#L147)

Return the stored value of `key`. If `key` is not defined, the `cache` is returned.

* `key` **{*}**    
* `create` **{Boolean}**    
* `returns`: {*}  

If the value does **not** exist on the cache, you may pass
`true` as a second parameter to tell [getobject] to initialize
the value as an empty object.

```js
cache.set('foo', 'bar');
cache.get('foo');
// => "bar"
```

### [.process](index.js#L172)

Use [expander] to recursively expand template strings into their resolved values.

* `lookup` **{*}**: Any value to process, usually strings with a cache template, like `<%= foo %>` or `${foo}`.    
* `opts` **{*}**: Options to pass to Lo-Dash `_.template`.    

**Example**

```js
cache.process({a: '<%= b %>', b: 'c'});
//=> {a: 'c', b: 'c'}
```

### [.enabled](index.js#L214)

Check if `key` is enabled (truthy).

* `key` **{String}**    
* `returns`: {Boolean}  

```js
cache.enabled('foo')
// => false

cache.enable('foo')
cache.enabled('foo')
// => true
```

### [.disabled](index.js#L236)

Check if `key` is disabled.

* `key` **{String}**    
* `returns`: {Boolean}  

```js
cache.disabled('foo')
// => true

cache.enable('foo')
cache.disabled('foo')
// => false
```

### [.enable](index.js#L255)

Enable `key`.

* `key` **{String}**    
* `returns` **{Cache}**: for chaining  

**Example**

```js
cache.enable('foo');
```

### [.disable](index.js#L274)

Disable `key`.

* `key` **{String}**    
* `returns` **{Cache}**: for chaining  

**Example**

```js
cache.disable('foo');
```

### [.union](index.js#L320)

Add values to an array on the `cache`. This method is chainable.

* `returns` **{Cache}**: for chaining  

**Example**

```js
// config.cache['foo'] => ['a.hbs', 'b.hbs']
cache
  .union('foo', ['b.hbs', 'c.hbs'], ['d.hbs']);
  .union('foo', ['e.hbs', 'f.hbs']);

// config.cache['foo'] => ['a.hbs', 'b.hbs', 'c.hbs', 'd.hbs', 'e.hbs', 'f.hbs']
```

### [.defaults](index.js#L362)

Extend the `cache` with the given object. This method is chainable.

* `returns` **{Cache}**: for chaining  

**Example**

```js
cache
  .defaults({foo: 'bar'}, {baz: 'quux'});
  .defaults({fez: 'bang'});
```

Or define the property to defaults:

```js
cache
  // defaults `cache.a`
  .defaults('a', {foo: 'bar'}, {baz: 'quux'})
  // defaults `cache.b`
  .defaults('b', {fez: 'bang'})
  // defaults `cache.a.b.c`
  .defaults('a.b.c', {fez: 'bang'});
```

### [.extend](index.js#L406)

Extend the `cache` with the given object. This method is chainable.

* `returns` **{Cache}**: for chaining  

**Example**

```js
cache
  .extend({foo: 'bar'}, {baz: 'quux'});
  .extend({fez: 'bang'});
```

Or define the property to extend:

```js
cache
  // extend `cache.a`
  .extend('a', {foo: 'bar'}, {baz: 'quux'})
  // extend `cache.b`
  .extend('b', {fez: 'bang'})
  // extend `cache.a.b.c`
  .extend('a.b.c', {fez: 'bang'});
```

### [.merge](index.js#L438)

Extend the cache with the given object. This method is chainable.

* `returns` **{Cache}**: for chaining  

**Example**

```js
cache
  .merge({foo: 'bar'}, {baz: 'quux'});
  .merge({fez: 'bang'});
```

### [.keys](index.js#L462)

Return the keys on `this.cache`.

* `returns`: {Boolean}  

```js
cache.keys();
```

### [.hasOwn](index.js#L481)

Return true if `key` is an own, enumerable property of `this.cache` or the given `obj`.

* `key` **{String}**    
* `obj` **{Object}**: Optionally pass an object to check.    
* `returns`: {Boolean}  

```js
cache.hasOwn([key]);
```

### [.clone](index.js#L498)

Clone the given `obj` or `cache`.

* `obj` **{Object}**: Optionally pass an object to clone.    
* `returns`: {Boolean}  

```js
cache.clone();
```

### [.methods](index.js#L516)

Return methods on `this.cache` or the given `obj`.

* `obj` **{Object}**    
* `returns`: {Array}  

```js
cache.methods('foo')
//=> ['set', 'get', 'enable', ...]
```

### [.each](index.js#L535)

Call `fn` on each property in `this.cache`.

* `fn` **{Function}**    
* `obj` **{Object}**: Optionally pass an object to iterate over.    
* `returns` **{Object}**: Resulting object.  

```js
cache.each(fn, obj);
```

### [.visit](index.js#L560)

Traverse each _own property_ of `this.cache` or the given object, recursively calling `fn` on child objects.

* `obj` **{Object|Function}**: Optionally pass an object.    
* `fn` **{Function}**    
* `returns` **{Object}**: Return the resulting object.  

```js
cache.visit(obj, fn);
```

### [.Clearing the cache](index.js#L605)

> Methods for clearing the cache, removing or reseting specific values on the cache.

* `returns` **{Cache}**: for chaining  

Omit properties and their from the `cache`.

**Example:**

```js
cache
  .omit('foo');
  .omit('foo', 'bar');
  .omit(['foo']);
  .omit(['foo', 'bar']);
```

### [.clear](index.js#L626)

Remove `key` from the cache, or if no value is specified the entire cache is reset.

**Example:**

```js
cache.clear();
```

## Author

**Jon Schlinkert**
 
+ [github/jonschlinkert](https://github.com/jonschlinkert)
+ [twitter/jonschlinkert](http://twitter.com/jonschlinkert) 

## License
Copyright (c) 2014 Jon Schlinkert, contributors.  
Released under the MIT license

***

_This file was generated by [verb-cli](https://github.com/assemble/verb-cli) on August 27, 2014._