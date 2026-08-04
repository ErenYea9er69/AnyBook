import Reveal from "./Reveal";

const QUOTES = [
  {
    no: "ATOMIC HABITS",
    q: "\u201cProgress rarely feels dramatic in the moment — it shows up later, all at once, as the sum of habits repeated long before anyone noticed.\u201d",
    who: "James Clear",
    book: "Atomic Habits",
  },
  {
    no: "MEDITATIONS",
    q: "\u201cWhat stands in the way becomes the way, once you stop resisting it.\u201d",
    who: "Marcus Aurelius",
    book: "Meditations",
  },
  {
    no: "MAN'S SEARCH FOR MEANING",
    q: "\u201cEverything can be taken from a person except the choice of how to respond to what happens.\u201d",
    who: "Viktor Frankl",
    book: "Man's Search for Meaning",
  },
];

export default function Quotes() {
  return (
    <section className="on-paper">
      <div className="wrap">
        <Reveal className="section-head">
          <div className="eyebrow">From the library</div>
          <h2>Lines worth keeping.</h2>
          <p>A few of the quotes readers save from the &quot;Notable lines&quot; angle of a summary.</p>
        </Reveal>
        <div className="quote-row">
          {QUOTES.map((qt, i) => (
            <Reveal as="div" delay={((i + 1) as 1 | 2 | 3)} key={qt.no} className="quote-card">
              <span className="card-no">{qt.no}</span>
              <p className="q">{qt.q}</p>
              <div className="who">
                <b>{qt.who}</b>, {qt.book}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
