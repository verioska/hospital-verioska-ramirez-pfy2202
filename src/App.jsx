import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { StoreProvider, useStore } from './context/StoreContext';
import Icon from './components/Icon';
import CatalogPage from './pages/CatalogPage';
import BookPage from './pages/BookPage';
import AboutPage from './pages/AboutPage';

function Brand() {
  return <Link to="/" className="brand" aria-label="Entre páginas, inicio"><span className="brand-icon"><Icon name="book" size={29} /></span><span>entre páginas<span className="brand-dot">.</span><small>HISTORIAS QUE SE QUEDAN CONTIGO</small></span></Link>;
}

function Header() {
  const { favorites } = useStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => { setMenuOpen(false); setSearchOpen(false); }, [location.pathname]);

  function handleSearch(event) {
    event.preventDefault();
    navigate(`/catalogo${search.trim() ? `?q=${encodeURIComponent(search.trim())}` : ''}`);
    setSearchOpen(false);
  }

  return <><div className="announcement"><Icon name="sparkles" size={13} /><span>Un libro abierto, un mundo por descubrir.</span><Icon name="sparkles" size={13} /></div><header className="site-header"><div className="container header-inner"><Brand /><nav className={`main-nav ${menuOpen ? 'open' : ''}`} id="main-navigation" aria-label="Navegación principal"><NavLink to="/" end>Inicio</NavLink><NavLink to="/catalogo" className={({ isActive }) => isActive || location.pathname.startsWith('/categorias/') ? 'active' : ''}>Explorar libros</NavLink><NavLink to="/nosotros">Nuestra librería</NavLink></nav><div className="header-actions"><button className="icon-button" type="button" aria-label={searchOpen ? 'Cerrar búsqueda' : 'Abrir búsqueda'} aria-expanded={searchOpen} aria-controls="header-search" onClick={() => setSearchOpen(!searchOpen)}><Icon name={searchOpen ? 'close' : 'search'} size={21} /></button><span className="header-divider" /><NavLink to="/favoritos" className="favorites-nav" aria-label={`Mis favoritos, ${favorites.length} libros`}><Icon name="heart" size={21} /><span className="favorites-label">Mis favoritos</span><span className="favorites-count">{favorites.length}</span></NavLink><button className="icon-button menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen} aria-controls="main-navigation"><Icon name={menuOpen ? 'close' : 'menu'} /></button></div></div>{searchOpen && <form id="header-search" className="header-search container" onSubmit={handleSearch}><label htmlFor="global-search">¿Qué te gustaría leer?</label><div><input id="global-search" autoFocus type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Título o autor…" /><button className="button primary" type="submit">Buscar <Icon name="search" size={17} /></button></div></form>}</header></>;
}

function Footer() {
  return <footer className="site-footer"><div className="container footer-top"><div><Brand /><p>Para quienes encuentran un hogar<br />entre las páginas de un libro.</p></div><div className="footer-links"><span>UN POCO MÁS</span><Link to="/catalogo">Explorar libros</Link><Link to="/favoritos">Mis favoritos</Link><Link to="/nosotros">Nuestra librería</Link></div><div className="footer-quote"><span aria-hidden="true">“</span><p>Siempre es un buen momento<br />para empezar otra historia.</p><Icon name="sparkles" size={19} /></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Entre páginas · Hecho con amor por los libros.</span><span>Verioska Ramírez · Desarrollo Frontend II · PFY2202</span></div></footer>;
}

function NavigationEffects() {
  const { pathname, hash } = useLocation();
  const mainRef = useRef(null);
  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, behavior: 'instant' });
    const titles = { '/': 'Historias que se quedan contigo', '/catalogo': 'Explorar libros', '/favoritos': 'Mis favoritos', '/nosotros': 'Nuestra librería' };
    document.title = `${titles[pathname] || (pathname.startsWith('/categorias/') ? 'Categorías' : pathname.startsWith('/libros/') ? 'Descubre tu próxima lectura' : 'Página no encontrada')} · Entre páginas`;
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname, hash]);
  return <main id="contenido" ref={mainRef} tabIndex={-1}><Routes><Route path="/" element={<CatalogPage home />} /><Route path="/catalogo" element={<CatalogPage />} /><Route path="/categorias/:categoryId" element={<CatalogPage />} /><Route path="/libros/:bookId" element={<BookPage />} /><Route path="/favoritos" element={<CatalogPage saved />} /><Route path="/nosotros" element={<AboutPage />} /><Route path="*" element={<div className="empty-state not-found"><div className="eyebrow">PÁGINA 404</div><Icon name="book" size={44} /><h1>Parece que saltamos una página.</h1><p>Esta historia no está aquí, pero tenemos muchas otras esperando por ti.</p><Link to="/" className="button primary">Volver al inicio <Icon name="arrow" size={18} /></Link></div>} /></Routes></main>;
}

export default function App() {
  return <StoreProvider><a className="skip-link" href="#contenido">Saltar al contenido</a><Header /><NavigationEffects /><Footer /></StoreProvider>;
}
