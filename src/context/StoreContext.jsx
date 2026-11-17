import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

const StoreContext = createContext(null);
const FAVORITES_KEY = 'entre-paginas-favoritos';

function readFavorites() {
  try {
    const stored = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
    return Array.isArray(stored) ? stored.filter((id) => typeof id === 'string') : [];
  } catch {
    return [];
  }
}

export function StoreProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  const [favorites, setFavorites] = useState(readFavorites);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError('');
    Promise.all([api.getCategories(controller.signal), api.getBooks(controller.signal)])
      .then(([nextCategories, nextBooks]) => {
        setCategories(nextCategories);
        setBooks(nextBooks);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setError('No pudimos conectar con la librería. Revisa que el servidor de la API esté encendido y vuelve a intentarlo.');
      })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [attempt]);

  useEffect(() => {
    try { localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites)); } catch { /* Los favoritos siguen disponibles durante esta sesión. */ }
  }, [favorites]);

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(''), 3000);
    return () => clearTimeout(timer);
  }, [notice]);

  function toggleFavorite(book) {
    const exists = favorites.includes(book.id);
    setFavorites((previous) => previous.includes(book.id) ? previous.filter((id) => id !== book.id) : [...previous, book.id]);
    setNotice(exists ? `Quitaste «${book.title}» de tus favoritos.` : `Guardaste «${book.title}» en tus favoritos.`);
  }

  return (
    <StoreContext.Provider value={{ books, categories, loading, error, favorites, toggleFavorite, retry: () => setAttempt((value) => value + 1) }}>
      {children}
      <div className={`toast ${notice ? 'visible' : ''}`} role="status" aria-live="polite">{notice}</div>
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);
