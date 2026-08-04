"use client";

import { useSearchOverlay } from "@/lib/search-overlay-context";
import Reveal from "./Reveal";

export default function FinalCTA() {
  const { openOverlay } = useSearchOverlay();

  return (
    <section className="final-cta">
      <div className="wrap">
        <Reveal as="h2">
          Pick a book.
          <br />
          Read every angle.
        </Reveal>
        <Reveal as="p" delay={1}>
          Search a title. Read in minutes.
        </Reveal>
        <Reveal
          as="a"
          delay={2}
          className="btn btn-dark"
          href="#"
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            openOverlay("");
          }}
        >
          Search a book
        </Reveal>
        <div className="fine">Free. No account. No card.</div>
      </div>
    </section>
  );
}
