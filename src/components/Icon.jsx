const paths = {
  book: <><path d="M12 6c-3-3-7-3-10-2v15c4-1 7 0 10 2 3-2 6-3 10-2V4c-3-1-7-1-10 2Z" /><path d="M12 6v15" /></>,
  search: <><circle cx="10.8" cy="10.8" r="7" /><path d="m16 16 5 5" /></>,
  heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />,
  arrow: <><path d="M4 12h16M14 6l6 6-6 6" /></>,
  back: <><path d="M20 12H4m6 6-6-6 6-6" /></>,
  sparkles: <><path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3ZM20 2v4m-2-2h4" /></>,
  planet: <><circle cx="12" cy="12" r="7" /><ellipse cx="12" cy="12" rx="12" ry="3" transform="rotate(-30 12 12)" /></>,
  feather: <><path d="M20 4C12-4 1 10 5 17c7 4 21-7 15-13ZM3 21 16 8M6 14h5v5" /></>,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 1v2m0 18v2M1 12h2m18 0h2M4 4l1.5 1.5m13 13L20 20M4 20l1.5-1.5m13-13L20 4" /></>,
  star: <path d="m12 2 3 6.5 7 .9-5.1 5 1.3 7-6.2-3.3L5.8 21l1.3-6.6-5.1-5 7-.9Z" />,
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
  check: <path d="m5 12 4 4L19 6" />,
};

export default function Icon({ name, size = 20, className = '' }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">{paths[name] || paths.book}</svg>;
}
