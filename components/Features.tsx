import Reveal from "./Reveal";

const FEATURES: { icon: string; tag: string; title: string; body: string }[] = [
  {
    icon: '<circle cx="20" cy="20" r="15"/><circle cx="20" cy="20" r="9"/><circle cx="20" cy="20" r="2.4" fill="currentColor" stroke="none"/>',
    tag: "01",
    title: "Core argument",
    body: "The single claim the book builds toward, stated in one tight paragraph.",
  },
  {
    icon: '<line x1="8" y1="12" x2="32" y2="12"/><line x1="8" y1="20" x2="26" y2="20"/><line x1="8" y1="28" x2="29" y2="28"/>',
    tag: "02",
    title: "Chapter map",
    body: "Every chapter, covered in order. No chapter skipped, no two chapters merged into one.",
  },
  {
    icon: '<path d="M10 14c0-3 2-5 5-5v4c-1.5 0-2 1-2 2v2h2v6h-6v-9Z"/><path d="M23 14c0-3 2-5 5-5v4c-1.5 0-2 1-2 2v2h2v6h-6v-9Z"/>',
    tag: "03",
    title: "Notable quotes",
    body: "Five to ten lines taken straight from the text, each with a note on why it stays with you.",
  },
  {
    icon: '<path d="M8 21l7 7L33 12"/>',
    tag: "04",
    title: "Real world use",
    body: "Concrete steps you act on, each one tied to the chapter it comes from.",
  },
  {
    icon: '<line x1="9" y1="20" x2="20" y2="20"/><polyline points="14,15 9,20 14,25"/><line x1="20" y1="20" x2="31" y2="20"/><polyline points="26,15 31,20 26,25"/>',
    tag: "05",
    title: "Pushback",
    body: "Where critics disagree with the book, or the weakest point in its own argument.",
  },
  {
    icon: '<path d="M12 28L26 14a2.8 2.8 0 0 1 4 4L16 32l-6 2 2-6Z"/>',
    tag: "06",
    title: "Author background",
    body: "Who wrote the book, their experience, and the reason they wrote this one.",
  },
];

export default function Features() {
  return (
    <section id="what">
      <div className="wrap">
        <Reveal className="section-head">
          <div className="eyebrow">What you get</div>
          <h2>One summary. Six angles.</h2>
          <p>Every AnyBook summary covers the same six angles, book after book.</p>
        </Reveal>
        <Reveal className="angle-ticks">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </Reveal>

        <div className="feature-grid">
          {FEATURES.map((f, i) => (
            <Reveal
              as="div"
              delay={((i + 1) as 1 | 2 | 3 | 4 | 5 | 6)}
              key={f.title}
              className="feature-card"
            >
              <div
                className="icon"
                dangerouslySetInnerHTML={{
                  __html: `<svg width="32" height="32" viewBox="0 0 40 40" fill="none" stroke="currentColor" stroke-width="1.5">${f.icon}</svg>`,
                }}
              />
              <span className="tag">{f.tag}</span>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
