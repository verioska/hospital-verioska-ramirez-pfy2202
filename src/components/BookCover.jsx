function Artwork({ motif }) {
  const illustrations = {
    house: <><circle cx="90" cy="57" r="31" fill="currentColor" opacity=".24" /><path d="m33 103 57-48 57 48v75H33Z" fill="currentColor" opacity=".75" /><path d="M79 178v-46h23v46M51 108h14v18H51Zm63 0h14v18h-14Z" fill="var(--cover-bg)" /><path d="M24 178h134M90 54V37" stroke="currentColor" strokeWidth="3" /><path d="M19 174c-8-31 6-46 18-52M154 175c13-25 7-39-7-51" stroke="currentColor" fill="none" strokeWidth="3" /></>,
    dunes: <><circle cx="113" cy="53" r="30" fill="currentColor" /><path d="M-20 161Q62 65 201 139v80H-20Z" fill="currentColor" opacity=".45" /><path d="M-20 188Q75 98 201 164v55H-20Z" fill="currentColor" opacity=".75" /><path d="m89 130 5 17-8 9" stroke="var(--cover-bg)" strokeWidth="3" fill="none" /></>,
    planet: <><circle cx="90" cy="119" r="47" fill="currentColor" opacity=".6" /><ellipse cx="90" cy="119" rx="77" ry="17" transform="rotate(-27 90 119)" fill="none" stroke="currentColor" strokeWidth="2" /><path d="m40 31 3 8 8 3-8 3-3 8-3-8-8-3 8-3Zm98 38 2 6 6 2-6 2-2 6-2-6-6-2 6-2Z" fill="currentColor" /><circle cx="120" cy="24" r="2" fill="currentColor" /><circle cx="24" cy="99" r="2" fill="currentColor" /><circle cx="147" cy="169" r="2" fill="currentColor" /></>,
    flower: <><path d="M92 193c-13-38 1-68-2-105M90 152c-24 5-36-7-39-24 26-1 36 6 39 24Zm2-24c24 5 36-7 39-24-26-1-36 6-39 24Z" fill="none" stroke="currentColor" strokeWidth="3" /><g fill="currentColor" opacity=".85"><ellipse cx="90" cy="58" rx="16" ry="30" /><ellipse cx="90" cy="58" rx="16" ry="30" transform="rotate(60 90 58)" /><ellipse cx="90" cy="58" rx="16" ry="30" transform="rotate(120 90 58)" /></g><circle cx="90" cy="58" r="10" fill="var(--cover-bg)" /></>,
    leaves: <><path d="M90 198V30" stroke="currentColor" strokeWidth="3" />{[55, 95, 135, 175].map((y) => <g key={y} fill="currentColor"><path d={`M90 ${y}Q29 ${y-5} 31 ${y-40}Q88 ${y-45} 90 ${y}Z`} opacity=".7" /><path d={`M90 ${y+17}q61-5 59-40Q92 ${y-28} 90 ${y+17}Z`} opacity=".9" /></g>)}</>,
    flame: <><path d="M91 19C76 72 26 84 39 143c9 43 90 58 107 0 12-43-20-53-17-86-25 23-17 34-30 50 9-48-9-50-8-88Z" fill="currentColor" /><path d="M90 103c-4 32-24 32-19 58 6 28 47 19 41-5-3-14-18-19-22-53Z" fill="var(--cover-bg)" /></>,
    mountain: <><circle cx="127" cy="42" r="24" fill="currentColor" opacity=".4" /><path d="M-10 182 69 46l44 75 28-39 51 100Z" fill="currentColor" opacity=".7" /><path d="m44 89 25-43 25 43-25-13Z" fill="var(--cover-bg)" /><path d="M-5 183q90-32 190 0M-5 195q90-32 190 0" stroke="currentColor" strokeWidth="2" fill="none" /></>,
    train: <><path d="M50 47q40-22 80 0v112H50Z" fill="currentColor" opacity=".75" /><path d="M61 65h58v39H61Z" fill="var(--cover-bg)" /><circle cx="69" cy="138" r="7" fill="var(--cover-bg)" /><circle cx="111" cy="138" r="7" fill="var(--cover-bg)" /><path d="m63 158-32 47m85-47 32 47M42 189h96M50 176h80" stroke="currentColor" strokeWidth="3" /><path d="M90 24v22" stroke="currentColor" strokeWidth="5" /></>,
    moon: <><circle cx="102" cy="76" r="48" fill="currentColor" /><circle cx="122" cy="57" r="43" fill="var(--cover-bg)" /><path d="M-4 182q79-78 187-10v45H-4Z" fill="currentColor" opacity=".5" /><path d="M34 184V95m0 31-21-19m21 41 26-30M153 182v-57m0 25-18-14" stroke="currentColor" strokeWidth="3" fill="none" /></>,
    window: <><path d="M42 183V73a48 48 0 0 1 96 0v110Z" fill="currentColor" opacity=".7" /><path d="M90 28v155M43 95h95M43 145h95" stroke="var(--cover-bg)" strokeWidth="4" /><path d="M28 184h125" stroke="currentColor" strokeWidth="3" /></>,
  };
  return <svg viewBox="0 0 180 210" className="cover-art" aria-hidden="true">{illustrations[motif] || illustrations.leaves}</svg>;
}

export default function BookCover({ book, className = '' }) {
  return (
    <div className={`book-cover cover-${book.theme} ${className}`} aria-hidden="true">
      <div className="cover-author">{book.author}</div>
      <div className={`cover-title ${book.title.length > 35 ? 'long-title' : ''}`}>{book.title}</div>
      <Artwork motif={book.motif} />
      <div className="cover-edition">BIBLIOTECA ENTRE PÁGINAS</div>
    </div>
  );
}
