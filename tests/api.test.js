import { after, before, test } from 'node:test';
import assert from 'node:assert/strict';
import jsonServer from 'json-server';
import { fileURLToPath } from 'node:url';

let server;
let baseUrl;

before(async () => {
  const app = jsonServer.create();
  app.use(jsonServer.defaults({ logger: false, noCors: false }));
  app.use(jsonServer.router(fileURLToPath(new URL('../server/db.json', import.meta.url))));
  await new Promise((resolve, reject) => {
    server = app.listen(0, '127.0.0.1', resolve);
    server.once('error', reject);
  });
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  if (server?.listening) await new Promise((resolve) => server.close(resolve));
});

test('GET /categories devuelve las categorías por HTTP y en formato JSON', async () => {
  const response = await fetch(`${baseUrl}/categories`);
  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type'), /application\/json/);
  const categories = await response.json();
  assert.equal(categories.length, 6);
  assert.ok(categories.some((category) => category.name === 'Ciencia ficción'));
});

test('GET /books permite listar todos los libros y filtrar por categoría', async () => {
  const response = await fetch(`${baseUrl}/books`);
  assert.equal(response.status, 200);
  assert.equal((await response.json()).length, 12);
  const filtered = await (await fetch(`${baseUrl}/books?categoryId=ficcion`)).json();
  assert.ok(filtered.length > 0);
  assert.ok(filtered.every((book) => book.categoryId === 'ficcion'));
});

test('GET /books/:id devuelve el detalle y un id inexistente responde 404', async () => {
  const response = await fetch(`${baseUrl}/books/1`);
  assert.equal(response.status, 200);
  assert.equal((await response.json()).title, 'La casa de los espíritus');
  assert.equal((await fetch(`${baseUrl}/books/no-existe`)).status, 404);
});
