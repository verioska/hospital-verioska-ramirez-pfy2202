import { Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/catalog';
import Icon from './Icon';
import BookCover from './BookCover';

export default function BookCard({ book }) {
  const { categories, favorites, toggleFavorite } = useStore();
  const favorite = favorites.includes(book.id);
  const category = categories.find((item) => item.id === book.categoryId);
  return (
    <article className="book-card">
      <div className={`book-display display-${book.theme}`}>
        <Link to={`/libros/${book.id}`} className="cover-link" aria-label={`Ver ${book.title}`}><BookCover book={book} /></Link>
        <button className={`favorite-button ${favorite ? 'is-favorite' : ''}`} type="button" onClick={() => toggleFavorite(book)} aria-label={`${favorite ? 'Quitar' : 'Guardar'} ${book.title} ${favorite ? 'de' : 'en'} favoritos`} aria-pressed={favorite} title={favorite ? 'Quitar de favoritos' : 'Guardar en favoritos'}><Icon name="heart" size={18} /></button>
      </div>
      <div className="book-meta"><Link to={`/categorias/${book.categoryId}`} className="category-label">{category?.name}</Link><span className="rating"><Icon name="star" size={13} /> {book.rating.toFixed(1)}</span></div>
      <h3><Link to={`/libros/${book.id}`}>{book.title}</Link></h3>
      <p className="book-author">{book.author}</p>
      <div className="book-bottom"><span className="price">{formatPrice(book.price)}</span><Link to={`/libros/${book.id}`} className="detail-link" aria-label={`Ver detalles de ${book.title}`}><Icon name="arrow" size={19} /></Link></div>
    </article>
  );
}
