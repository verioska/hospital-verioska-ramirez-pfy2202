import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { filterBooks } from '../utils/catalog';
import Icon from '../components/Icon';
import BookCover from '../components/BookCover';
import BookCard from '../components/BookCard';
import CatalogState, { EmptyState } from '../components/CatalogState';

function Hero() {
  const { books } = useStore();
  const heroBooks = ['3', '1', '2'].map((id) => books.find((book) => book.id === id)).filter(Boolean);
  return (
    <section className="hero container">
      <div className="hero-copy">
        <div className="eyebrow"><span /> PARA QUIENES AMAN PERDERSE EN UN LIBRO</div>
        <h1>Tu próxima historia<br />empieza <em>aquí.</em></h1>
        <p>Hay un libro para cada momento de la vida.<br className="desktop-break" /> Encuentra el tuyo y descubre hasta dónde puede llevarte.</p>
        <a href="#catalogo" className="button primary">Encuentra tu próxima lectura <Icon name="arrow" size={19} /></a>
        <div className="hero-note"><span className="tiny-stars">✦ ✦ ✦</span> Historias que se quedan contigo.</div>
      </div>
      <div className="hero-illustration" aria-label="Una selección de libros de nuestra librería" role="img">
        <div className="hero-orbit" /><span className="drawn-star star-one">✧</span><span className="drawn-star star-two">✦</span>
        <div className="hero-books">{heroBooks.map((book, index) => <BookCover key={book.id} book={book} className={`hero-book hero-book-${index}`} />)}</div>
        <div className="hero-sticker"><Icon name="book" size={24} /><span>Un libro,<br /><strong>mil posibilidades.</strong></span></div>
        <span className="hero-caption">UN PEQUEÑO REFUGIO ENTRE PÁGINAS</span>
      </div>
    </section>
  );
}

export default function CatalogPage({ home = false, saved = false }) {
  const { categoryId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { books, categories, favorites, loading, error } = useStore();
  const query = searchParams.get('q') || '';
  const sort = searchParams.get('orden') || 'recommended';
  const category = categories.find((item) => item.id === categoryId);
  const results = filterBooks(books, { category: categoryId, query, sort, favorites: saved ? favorites : undefined });

  function updateParameter(key, value) {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value); else next.delete(key);
    setSearchParams(next, { replace: true, preventScrollReset: true });
  }

  const title = saved ? 'Tus historias pendientes' : category ? category.name : home ? 'Un mundo por descubrir' : 'Encuentra tu próxima lectura';
  const description = saved ? 'Ese libro que te llamó la atención. Esa historia que quieres leer. Todos, en un mismo lugar.' : category ? category.description : 'Sigue tu curiosidad. Nosotros ponemos los libros.';

  return <>
    {home && <Hero />}
    {!home && <div className="container breadcrumb"><Link to="/">Inicio</Link><span>/</span><span>{saved ? 'Mis favoritos' : category?.name || 'Catálogo'}</span></div>}
    <section className={`catalog-section container ${!home ? 'inner-catalog' : ''}`} id="catalogo">
      <div className="section-heading"><div><div className="eyebrow">{saved ? 'TU BIBLIOTECA PERSONAL' : 'ENCUENTRA ALGO QUE TE INSPIRE'}</div><h2>{title}<span className="title-dot">.</span></h2><p>{description}</p></div><span className="section-doodle" aria-hidden="true">✳</span></div>
      <CatalogState>
        {!loading && !error && categoryId && !category ? <div className="empty-state"><h2>No encontramos esta categoría</h2><Link to="/catalogo" className="button primary">Ver todas las categorías</Link></div> : <>
          {!saved && <nav className="category-tabs" aria-label="Categorías de libros">
            <Link to={`/catalogo${query ? `?q=${encodeURIComponent(query)}` : ''}`} className={`category-tab ${!categoryId ? 'selected' : ''}`} aria-current={!categoryId ? 'page' : undefined}><Icon name="grid" size={16} />Todos los libros</Link>
            {categories.map((item) => <Link to={`/categorias/${item.id}${query ? `?q=${encodeURIComponent(query)}` : ''}`} key={item.id} className={`category-tab ${categoryId === item.id ? 'selected' : ''}`} aria-current={categoryId === item.id ? 'page' : undefined}><Icon name={item.icon} size={17} />{item.name}</Link>)}
          </nav>}
          <div className="catalog-controls">
            <label className="catalog-search"><Icon name="search" size={18} /><input type="search" placeholder="Busca un título o tu autor favorito…" aria-label="Buscar por título o autor" value={query} onChange={(event) => updateParameter('q', event.target.value)} /></label>
            <div className="catalog-sort"><span className="result-count" aria-live="polite">{results.length} {results.length === 1 ? 'libro' : 'libros'}</span><label htmlFor="sort">Ordenar por</label><select id="sort" value={sort} onChange={(event) => updateParameter('orden', event.target.value)}><option value="recommended">Recomendados</option><option value="price-asc">Menor precio</option><option value="price-desc">Mayor precio</option><option value="title">Título: A–Z</option></select></div>
          </div>
          {results.length ? <div className="book-grid">{results.map((book) => <BookCard key={book.id} book={book} />)}</div> : <EmptyState favorites={saved && !query} />}
          {!!results.length && <p className="catalog-end"><span />Cada libro es una puerta. ¿Cuál vas a abrir?<Icon name="sparkles" size={16} /><span /></p>}
        </>}
      </CatalogState>
    </section>
    {home && <section className="reading-banner container"><span className="banner-icon"><Icon name="book" size={40} /></span><div><h2>A veces, todo lo que necesitas es un buen libro.</h2><p>Un ratito para ti. Una historia por descubrir. Un mundo que te espera.</p></div><Link to="/nosotros">Conoce nuestra librería <Icon name="arrow" size={18} /></Link></section>}
  </>;
}
