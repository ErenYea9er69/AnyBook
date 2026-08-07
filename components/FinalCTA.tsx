"use client";

import { openAuthModal } from "@/lib/auth-modal";
import Reveal from "./Reveal";

export default function FinalCTA() {

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
            openAuthModal("signup");
          }}
        >
          Search a book
        </Reveal>
        <div className="fine">Free. No account. No card.</div>
      </div>
    </section>
  );
}
