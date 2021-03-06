const CacheBase = require('..');
const app = new CacheBase();

app.set('foo', 'xxx');
app.default('foo', 'one');
app.default('bar', 'two');
app.default('baz', 'three');
app.set('baz', 'zzz');

console.log(app.get('foo'));
//=> 'xxx'

console.log(app.get('bar'));
//=> 'two'

console.log(app.get('baz'));
//=> 'zzz'

console.log(app);
// Cache {
//   cache: { foo: 'xxx', bar: 'two', baz: 'zzz' },
//   defaults: { foo: 'one', bar: 'two', baz: 'three' } }
