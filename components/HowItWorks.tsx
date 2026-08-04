import Reveal from "./Reveal";

export default function HowItWorks() {
  return (
    <section className="on-paper" id="how">
      <div className="wrap">
        <Reveal className="section-head">
          <div className="eyebrow">How it works</div>
          <h2>Search the library, or ask us to grow it.</h2>
          <p>No app to install. No account to make. No bot writing your summary.</p>
        </Reveal>
        <div className="steps">
          <Reveal as="div" delay={1} className="step">
            <div className="num">01</div>
            <h3>Search</h3>
            <p>Type any title. If it&apos;s already in the library, you&apos;ll find it right away.</p>
          </Reveal>
          <Reveal as="div" delay={2} className="step">
            <div className="num">02</div>
            <h3>Not there? Request it</h3>
            <p>Send us the title. We read the book ourselves, cover to cover, before writing a single word.</p>
          </Reveal>
          <Reveal as="div" delay={3} className="step">
            <div className="num">03</div>
            <h3>Get every angle</h3>
            <p>Read one summary covering the argument, the chapter map, the quotes, the uses, and the pushback.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
