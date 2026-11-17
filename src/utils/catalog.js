export const formatPrice = (value) => new Intl.NumberFormat('es-CL', {
  style: 'currency', currency: 'CLP', maximumFractionDigits: 0,
}).format(value);

export const normalizeText = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

export function filterBooks(books, { category, query = '', sort = 'recommended', favorites } = {}) {
  const normalizedQuery = normalizeText(query.trim());
  const result = books.filter((book) =>
    (!category || book.categoryId === category) &&
    (!favorites || favorites.includes(book.id)) &&
    (!normalizedQuery || normalizeText(`${book.title} ${book.author}`).includes(normalizedQuery)),
  );
  const comparators = {
    recommended: (a, b) => b.rating - a.rating,
    'price-asc': (a, b) => a.price - b.price,
    'price-desc': (a, b) => b.price - a.price,
    title: (a, b) => a.title.localeCompare(b.title, 'es'),
  };
  return result.sort(comparators[sort] || comparators.recommended);
}
