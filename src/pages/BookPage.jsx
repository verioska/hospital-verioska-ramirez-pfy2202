import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../services/api';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/catalog';
import BookCover from '../components/BookCover';
import BookCard from '../components/BookCard';
import Icon from '../components/Icon';
import CatalogState from '../components/CatalogState';

export default function BookPage() {
  const { bookId } = useParams();
  const { books, categories, favorites, toggleFavorite } = useStore();
  const [book, setBook] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError('');
    api.getBook(bookId, controller.signal).then(setBook).catch((err) => {
      if (err.name !== 'AbortError') setError(err instanceof TypeError ? 'No pudimos conectar con la API. Revisa que el servidor esté encendido.' : err.message);
    }).finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [bookId, attempt]);

  const category = categories.find((item) => item.id === book?.categoryId);
  const related = books.filter((item) => item.categoryId === book?.categoryId && item.id !== book?.id).slice(0, 4);
  const favorite = favorites.includes(book?.id);

  return <div className="container detail-page"><Link to="/catalogo" className="back-link"><Icon name="back" size={17} /> Volver al catálogo</Link>
    {loading ? <div className="loading-state" role="status"><div className="loader" /><p>Buscando tu historia…</p></div> : error ? <div className="empty-state" role="alert"><h1>Esta página necesita otra oportunidad</h1><p>{error}</p><button className="button primary" onClick={() => setAttempt((value) => value + 1)}>Volver a intentar</button></div> : book && <>
      <div className="book-detail"><div className={`detail-cover-space display-${book.theme}`}><BookCover book={book} /><span>Una historia que merece su lugar en tu estante.</span></div><div className="detail-copy"><Link to={`/categorias/${book.categoryId}`} className="eyebrow">{category?.name || 'Descubre esta lectura'}</Link><h1>{book.title}</h1><p className="detail-author">{book.author}</p><div className="detail-rating"><span className="rating"><Icon name="star" size={17} /> {book.rating.toFixed(1)}</span><span>{book.badge}</span></div><p className="description">{book.description}</p><div className="detail-price">{formatPrice(book.price)}<span>Precio referencial · CLP</span></div><button className={`button ${favorite ? 'secondary' : 'primary'}`} onClick={() => toggleFavorite(book)} aria-pressed={favorite}><Icon name={favorite ? 'check' : 'heart'} size={19} />{favorite ? 'Guardado en mis favoritos' : 'Guardar en mis favoritos'}</button><p className="detail-hint">Guárdalo para encontrarlo fácilmente en tu próxima visita.</p><dl className="book-facts"><div><dt>Páginas</dt><dd>{book.pages}</dd></div><div><dt>Primera publicación</dt><dd>{book.year}</dd></div><div><dt>Editorial de referencia</dt><dd>{book.publisher}</dd></div><div><dt>Idioma</dt><dd>Español</dd></div></dl></div></div>
      <CatalogState>{!!related.length && <section className="related"><div className="section-heading"><div><div className="eyebrow">SIGUE EXPLORANDO</div><h2>Una historia lleva a otra<span className="title-dot">.</span></h2></div><Link to={`/categorias/${book.categoryId}`} className="text-link">Más de {category?.name} <Icon name="arrow" size={16} /></Link></div><div className="book-grid">{related.map((item) => <BookCard key={item.id} book={item} />)}</div></section>}</CatalogState>
    </>}
  </div>;
}
