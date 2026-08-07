"use client";

import { openAuthModal } from "@/lib/auth-modal";
import Bookshelf from "./Bookshelf";
import SearchMock from "./SearchMock";

export default function Hero() {

  return (
    <section className="hero">
      <div className="wrap">
        <div>
          <div className="eyebrow">A library of summaries, written by us</div>
          <h1>
            Any book.
            <br />
            Every <em>angle</em>.
            <br />
            Ten minutes.
          </h1>
          <p className="lede">
            Search the library for the core argument, the full chapter map,
            the quotes worth keeping, and the points critics push back on.
            Every summary is read and written by us, not generated on the
            spot. Can&apos;t find your title? Ask us to add it.
          </p>
          <div className="hero-actions">
            <a
              href="#"
              className="btn btn-gold"
              onClick={(e) => {
                e.preventDefault();
                openAuthModal("signup");
              }}
            >
              Search a book
            </a>
            <a href="#formats" className="btn btn-outline">
              Request a title
            </a>
          </div>
          <SearchMock />
          <div className="stat-row">
            <div className="stat">
              <b>Free</b>
              <span>no account needed</span>
            </div>
            <div className="stat">
              <b>9 min</b>
              <span>average read</span>
            </div>
            <div className="stat">
              <b>6</b>
              <span>angles per summary</span>
            </div>
          </div>
        </div>

        <Bookshelf />
      </div>
    </section>
  );
}
