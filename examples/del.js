const CacheBase = require('..');
const app = new CacheBase();

// app.on('del', key => app.set(key, app.default(key)));

app.set('foo', 'xxx');
app.default('foo', 'one');

console.log(app.get('foo')); //=> 'xxx'
console.log(app.cache.foo);  //=> 'xxx'
app.del('foo');

console.log(app.get('foo')); //=> 'xxx'
console.log(app.cache.foo);  //=> undefined
