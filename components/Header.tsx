"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchOverlay } from "@/lib/search-overlay-context";

export default function Header() {
  const { openOverlay } = useSearchOverlay();
  const [value, setValue] = useState("");
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = navRef.current;
      if (!el) return;
      el.style.borderBottomColor =
        window.scrollY > 8
          ? "rgba(199,160,90,0.35)"
          : "rgba(199,160,90,0.16)";
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="nav" id="top" ref={navRef}>
      <div className="wrap">
        <div className="logo" style={{ alignItems: 'center' }}>
          <img src="/logo.svg" alt="AnyBook Logo" style={{ height: '32px', width: 'auto', marginRight: '4px' }} />
          Any<span className="dot">Book</span>
        </div>
        <nav className="links">
          <a href="#mission">Our mission</a>
          <a href="#how">How it works</a>
          <a href="#what">What you get</a>
          <a href="#request">Request a book</a>
          <a href="#faq">FAQ</a>
        </nav>
        <form
          className="header-search"
          id="headerSearchForm"
          onSubmit={(e) => {
            e.preventDefault();
            openOverlay(value);
          }}
        >
          <button type="submit" className="search-icon-btn" aria-label="Search">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          <input
            type="text"
            id="headerSearchInput"
            placeholder="Search the library"
            autoComplete="off"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </form>
      </div>
    </header>
  );
}
