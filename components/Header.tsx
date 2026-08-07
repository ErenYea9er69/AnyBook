"use client";

import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { openAuthModal } from "@/lib/auth-modal";

function getInitials(name: string | null | undefined, email: string | null | undefined) {
  if (name) {
    const parts = name.trim().split(/\s+/);
    const initials = parts.length > 1 ? parts[0][0] + parts[1][0] : parts[0].slice(0, 2);
    return initials.toUpperCase();
  }
  if (email) return email.slice(0, 2).toUpperCase();
  return "?";
}

export default function Header() {
  const { user, loading } = useAuth();
  const navRef = useRef<HTMLElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

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

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const displayName = user?.displayName || user?.email?.split("@")[0] || "";

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
        <div style={{ display: 'flex', gap: '12px', marginLeft: '16px', alignItems: 'center' }}>
          {!loading && user ? (
            <div className={`user-menu${menuOpen ? " open" : ""}`} ref={menuRef}>
              <button type="button" className="user-chip" onClick={() => setMenuOpen((v) => !v)}>
                <span className="user-avatar">{getInitials(user.displayName, user.email)}</span>
                <span className="user-name">{displayName}</span>
                <svg className="chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {menuOpen && (
                <div className="user-dropdown">
                  <div className="user-dropdown-header">
                    <div className="full-name">{displayName}</div>
                    {user.email && <div className="email">{user.email}</div>}
                  </div>
                  <button
                    type="button"
                    className="dropdown-item"
                    onClick={() => {
                      setMenuOpen(false);
                      signOut(auth);
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : !loading ? (
            <>
              <button type="button" className="btn btn-outline btn-sm" onClick={() => openAuthModal("login")}>
                Sign In
              </button>
              <button type="button" className="btn btn-gold btn-sm" onClick={() => openAuthModal("signup")}>
                Sign Up
              </button>
            </>
          ) : null}
        </div>
      </div>
    </header>
  );
}