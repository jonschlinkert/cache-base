const Cache = require('..');
const app = new Cache('data');

app.set('a', 'b');
app.set({ c: 'd' });
app.set('e.f', 'g')

console.log(app.get('e.f'));
//=> 'g'

console.log(app.get());
//=> { a: 'b', c: 'd', e: { f: 'g' } }

console.log(app.data);
//=> { a: 'b', c: 'd', e: { f: 'g' } }

console.log(app);
//=> Cache { data: { a: 'b', c: 'd', e: { f: 'g' } } }
