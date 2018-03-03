const CacheBase = require('..');
const app = new CacheBase();

app.default('foo', 42);
app.default('fez', 42);
app.set('foo', 1);
app.set('bar', 2);
app.set('baz', 3);
app.set('qux', 4);
app.set('fez', 5);

console.log(app.cache);
console.log(app.defaults);
console.log('---');

app.clear();

console.log(app.cache);
console.log(app.defaults);
console.log('---');

app.on('clear', key => (app.defaults = {}));
app.clear();

console.log(app.cache);
console.log(app.defaults);
console.log('---');
