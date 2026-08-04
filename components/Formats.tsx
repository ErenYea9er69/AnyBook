import Reveal from "./Reveal";

export default function Formats() {
  return (
    <section className="on-paper" id="formats">
      <div className="wrap">
        <Reveal className="section-head">
          <div className="eyebrow">Read it, or request one</div>
          <h2>Read what&apos;s here. Ask for what&apos;s missing.</h2>
        </Reveal>
        <div className="format-row">
          <Reveal as="div" delay={1} className="format-card">
            <div className="icon">
              <svg width="30" height="30" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="9" y="7" width="22" height="26" rx="2" />
                <line x1="14" y1="14" x2="26" y2="14" />
                <line x1="14" y1="20" x2="26" y2="20" />
                <line x1="14" y1="26" x2="21" y2="26" />
              </svg>
            </div>
            <h3>Text</h3>
            <p>8 to 12 minutes, with headers for each angle.</p>
          </Reveal>
          <Reveal as="div" delay={2} className="format-card is-soon">
            <div className="icon">
              <svg width="30" height="30" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M13 24V16a7 7 0 0 1 14 0v8" />
                <rect x="9" y="22" width="6" height="9" rx="2" />
                <rect x="25" y="22" width="6" height="9" rx="2" />
              </svg>
            </div>
            <h3>
              Audio <span className="soon-badge">Coming soon</span>
            </h3>
            <p>
              Narrated versions are on the way, for listening on a commute,
              a walk, or a workout. Not live yet.
            </p>
          </Reveal>
          <Reveal as="div" delay={3} className="format-card">
            <div className="icon">
              <svg width="30" height="30" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 9v22M9 20h22" />
              </svg>
            </div>
            <h3>Request a title</h3>
            <p>Don&apos;t see a book yet? Send us the title and we&apos;ll read it and add a summary ourselves.</p>
            <a href="#request" className="link">
              Send us a title →
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
