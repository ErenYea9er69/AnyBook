"use client";

import { useEffect, useRef } from "react";

export default function Header() {
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
        <div className="logo" style={{ alignItems: 'center', gap: '2px' }}>
          <img src="/logo.png" alt="AnyBook Logo" style={{ height: '50px', width: 'auto', marginRight: '-8px', marginLeft: '-6px' }} />
          Any<span className="dot">Book</span>
        </div>
        <nav className="links">
          <a href="#mission">Our mission</a>
          <a href="#how">How it works</a>
          <a href="#what">What you get</a>
          <a href="#request">Request a book</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div style={{ display: 'flex', gap: '12px', marginLeft: '16px' }}>
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => {
              const params = new URLSearchParams(window.location.search);
              params.set("auth", "login");
              window.history.pushState({}, "", "?" + params.toString());
              window.dispatchEvent(new Event("popstate"));
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            className="btn btn-gold btn-sm"
            onClick={() => {
              const params = new URLSearchParams(window.location.search);
              params.set("auth", "signup");
              window.history.pushState({}, "", "?" + params.toString());
              window.dispatchEvent(new Event("popstate"));
            }}
          >
            Sign Up
          </button>
        </div>
      </div>
    </header>
  );
}
