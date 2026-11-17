const API_URL = (import.meta.env.VITE_API_URL || '/api').replace(/\/$/, '');

async function request(path, signal) {
  const response = await fetch(`${API_URL}${path}`, { signal });
  if (!response.ok) {
    if (response.status === 404) throw new Error('No encontramos lo que estás buscando.');
    throw new Error('No pudimos cargar el catálogo. Inténtalo de nuevo.');
  }
  return response.json();
}

export const api = {
  getCategories: (signal) => request('/categories', signal),
  getBooks: (signal) => request('/books', signal),
  getBook: (id, signal) => request(`/books/${encodeURIComponent(id)}`, signal),
};
