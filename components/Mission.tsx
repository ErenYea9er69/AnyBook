import Reveal from "./Reveal";

export default function Mission() {
  return (
    <section id="mission">
      <div className="wrap">
        <Reveal className="mission-head">
          <div className="eyebrow">Our mission</div>
          <h2>
            We own no book content.
            <br />
            We help you save <em>time</em>.
          </h2>
        </Reveal>
        <div className="mission-body">
          <Reveal as="p" delay={1}>
            Every book on AnyBook belongs to the author. We do not host the
            original text. We do not republish any part of the original
            text. Copyright stays with the author and the publisher. We read
            each book from start to finish. Then we write an original
            summary in our own words.
          </Reveal>
          <Reveal as="p" delay={2}>
            Our mission stays simple. We do not try to replace the book. We
            try to save you time. Six angles reach you in minutes, not
            hours. You get the core argument, the chapter map, and the
            lines worth keeping, fast.
          </Reveal>
        </div>
        <div className="mission-pillars">
          <Reveal as="div" delay={1} className="pillar">
            <span className="pillar-mark"></span>
            <h3>No book content, ever</h3>
            <p>
              No scanned pages. No lifted chapters. We write our own words
              about each book.
            </p>
          </Reveal>
          <Reveal as="div" delay={2} className="pillar">
            <span className="pillar-mark"></span>
            <h3>Read first, write after</h3>
            <p>
              A person reads the whole book first. The same person writes
              the summary.
            </p>
          </Reveal>
          <Reveal as="div" delay={3} className="pillar">
            <span className="pillar-mark"></span>
            <h3>Save you time</h3>
            <p>Six angles fit in one sitting. You get minutes back in your day.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
