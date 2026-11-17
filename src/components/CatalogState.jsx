import { Link } from 'react-router-dom';
import Icon from './Icon';
import { useStore } from '../context/StoreContext';

export default function CatalogState({ children }) {
  const { loading, error, retry } = useStore();
  if (loading) return <div className="loading-state" role="status"><div className="loader" /><h2>Abriendo nuevas historias…</h2><p>Estamos preparando tu próxima lectura.</p></div>;
  if (error) return <div className="empty-state" role="alert"><Icon name="book" size={36} /><h2>Una pequeña pausa en la lectura</h2><p>{error}</p><button className="button primary" onClick={retry}>Volver a intentar <Icon name="arrow" size={16} /></button></div>;
  return children;
}

export function EmptyState({ favorites = false }) {
  return <div className="empty-state"><Icon name={favorites ? 'heart' : 'search'} size={36} /><h2>{favorites ? 'Tus próximas lecturas viven aquí' : 'Esta historia todavía no aparece'}</h2><p>{favorites ? 'Toca el corazón de un libro para guardarlo. Así siempre sabrás cuál leer después.' : 'Prueba con otro título, autor o categoría. Hay muchas historias por descubrir.'}</p><Link to="/catalogo" className="button primary">Explorar el catálogo <Icon name="arrow" size={16} /></Link></div>;
}
