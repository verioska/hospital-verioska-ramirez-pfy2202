import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { filterBooks, formatPrice } from '../src/utils/catalog.js';

const { books, categories } = JSON.parse(await readFile(new URL('../server/db.json', import.meta.url), 'utf8'));

test('el catálogo contiene seis categorías únicas y todos sus libros tienen datos válidos', () => {
  assert.equal(categories.length, 6);
  assert.equal(new Set(categories.map((item) => item.id)).size, categories.length);
  assert.equal(new Set(books.map((book) => book.id)).size, books.length);
  for (const book of books) {
    assert.ok(categories.some((category) => category.id === book.categoryId));
    assert.ok(book.title && book.author && book.description && book.motif && book.theme);
    assert.ok(Number.isFinite(book.price) && book.price > 0);
    assert.ok(book.rating > 0 && book.rating <= 5);
  }
});

test('la búsqueda ignora tildes y mayúsculas y busca por autor', () => {
  assert.deepEqual(filterBooks(books, { query: '  ESPIRITUS ' }).map((book) => book.id), ['1']);
  assert.deepEqual(filterBooks(books, { query: 'GARCIA MARQUEZ' }).map((book) => book.id), ['5']);
});

test('combina categoría, favoritos y búsqueda sin alterar el catálogo original', () => {
  const idsBefore = books.map((book) => book.id);
  assert.deepEqual(filterBooks(books, { category: 'ciencia-ficcion', favorites: ['2', '3'], query: 'dune' }).map((book) => book.id), ['2']);
  assert.deepEqual(filterBooks(books, { favorites: [] }), []);
  assert.deepEqual(filterBooks(books, { query: 'un libro inexistente' }), []);
  assert.deepEqual(books.map((book) => book.id), idsBefore);
});

test('ordena por precio y título y maneja un criterio de orden desconocido', () => {
  const ascending = filterBooks(books, { sort: 'price-asc' });
  const descending = filterBooks(books, { sort: 'price-desc' });
  assert.equal(ascending[0].price, Math.min(...books.map((book) => book.price)));
  assert.equal(descending[0].price, Math.max(...books.map((book) => book.price)));
  const alphabetical = filterBooks(books, { sort: 'title' }).map((book) => book.title);
  assert.deepEqual(alphabetical, [...alphabetical].sort((a, b) => a.localeCompare(b, 'es')));
  assert.deepEqual(filterBooks(books, { sort: 'desconocido' }), filterBooks(books));
  assert.ok(formatPrice(18990).includes('18.990'));
});
