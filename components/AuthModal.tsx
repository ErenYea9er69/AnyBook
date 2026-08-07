"use client";

import { useEffect, useState } from "react";

export default function AuthModal() {
  const [authMode, setAuthMode] = useState<"login" | "signup" | null>(null);

  useEffect(() => {
    const handlePopState = () => {
      const params = new URLSearchParams(window.location.search);
      const mode = params.get("auth") as "login" | "signup" | null;
      if (mode === "login" || mode === "signup") {
        setAuthMode(mode);
        document.body.classList.add("no-scroll");
      } else {
        setAuthMode(null);
        document.body.classList.remove("no-scroll");
      }
    };
    handlePopState();
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
      document.body.classList.remove("no-scroll");
    };
  }, []);

  if (!authMode) return null;

  const closeOverlay = () => {
    const params = new URLSearchParams(window.location.search);
    params.delete("auth");
    const newUrl = params.toString() ? "?" + params.toString() : window.location.pathname;
    window.history.pushState({}, "", newUrl);
    window.dispatchEvent(new Event("popstate"));
  };

  const toggleMode = () => {
    const nextMode = authMode === "login" ? "signup" : "login";
    const params = new URLSearchParams(window.location.search);
    params.set("auth", nextMode);
    window.history.pushState({}, "", "?" + params.toString());
    window.dispatchEvent(new Event("popstate"));
  };

  return (
    <div className="auth-overlay">
      <div className="auth-overlay-backdrop" onClick={closeOverlay} />
      <div className="auth-modal">
        <button className="auth-close" onClick={closeOverlay} aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        </button>
        <div className="auth-modal-content">
          <h2>{authMode === "login" ? "Welcome back" : "Create an account"}</h2>
          <p className="auth-subtitle">
            {authMode === "login"
              ? "Sign in to access your saved books and highlights."
              : "Join AnyBook to save your favorite summaries."}
          </p>

          <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
            {authMode === "signup" && (
              <div className="form-group">
                <label htmlFor="auth-name">Full Name</label>
                <input type="text" id="auth-name" placeholder="John Doe" />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="auth-email">Email</label>
              <input type="email" id="auth-email" placeholder="john@example.com" />
            </div>
            <div className="form-group">
              <label htmlFor="auth-password">Password</label>
              <input type="password" id="auth-password" placeholder="••••••••" />
            </div>
            <button type="submit" className="btn btn-gold auth-submit">
              {authMode === "login" ? "Sign In" : "Sign Up"}
            </button>
          </form>

          <div className="auth-switch">
            {authMode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button type="button" onClick={toggleMode}>
              {authMode === "login" ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
