"use client";

import { useEffect, useState } from "react";
import { auth, googleProvider } from "@/lib/firebase";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

export default function AuthModal() {
  const [authMode, setAuthMode] = useState<"login" | "signup" | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [shake, setShake] = useState(false);

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

    setEmail("");
    setPassword("");
    setName("");
    setError("");
    setShowPassword(false);
  };

  const switchTo = (mode: "login" | "signup") => {
    if (mode === authMode) return;
    const params = new URLSearchParams(window.location.search);
    params.set("auth", mode);
    window.history.pushState({}, "", "?" + params.toString());
    window.dispatchEvent(new Event("popstate"));
    setError("");
  };

  const triggerShake = (message: string) => {
    setError(message);
    setShake(true);
    setTimeout(() => setShake(false), 400);
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithPopup(auth, googleProvider);
      closeOverlay();
    } catch (err: any) {
      triggerShake(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (authMode === "signup") {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (name) {
          await updateProfile(userCredential.user, { displayName: name });
        }
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      closeOverlay();
    } catch (err: any) {
      triggerShake(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-overlay-backdrop" onClick={closeOverlay} />
      <div className={`auth-modal${shake ? " shake" : ""}`}>
        <button className="auth-close" onClick={closeOverlay} aria-label="Close">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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

          <div className="auth-tabs" data-mode={authMode}>
            <div className="tab-indicator" />
            <button type="button" className={authMode === "login" ? "active" : ""} onClick={() => switchTo("login")}>
              Sign In
            </button>
            <button type="button" className={authMode === "signup" ? "active" : ""} onClick={() => switchTo("signup")}>
              Sign Up
            </button>
          </div>

          <button type="button" className="btn btn-google" onClick={handleGoogleSignIn} disabled={loading}>
            <svg viewBox="0 0 48 48" width="20" height="20">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.7 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
              <path fill="none" d="M0 0h48v48H0z"/>
            </svg>
            Continue with Google
          </button>

          <div className="auth-divider">
            <span>or</span>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {authMode === "signup" && (
              <div className="form-group">
                <input
                  type="text"
                  id="auth-name"
                  placeholder=" "
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                />
                <label htmlFor="auth-name">Full name</label>
              </div>
            )}
            <div className="form-group">
              <input
                type="email"
                id="auth-email"
                placeholder=" "
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              <label htmlFor="auth-email">Email</label>
            </div>
            <div className="form-group">
              <input
                type={showPassword ? "text" : "password"}
                id="auth-password"
                placeholder=" "
                required
                className="has-toggle"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
              <label htmlFor="auth-password">Password</label>
              <button
                type="button"
                className="pw-toggle"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M3 3l18 18" />
                    <path d="M10.6 10.6a2 2 0 0 0 2.83 2.83" />
                    <path d="M9.4 5.5A9.9 9.9 0 0 1 12 5c5 0 9 4 10 7-0.4 1.1-1.1 2.3-2.1 3.4M6.2 6.2C4.3 7.5 2.9 9.3 2 12c1 3 5 7 10 7 1.2 0 2.4-.2 3.5-.6" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
            {error && (
              <div className="auth-error">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ flexShrink: 0 }}>
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="13" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {error}
              </div>
            )}
            <button type="submit" className="btn btn-gold auth-submit" disabled={loading}>
              {loading ? <span className="spinner" /> : authMode === "login" ? "Sign In" : "Sign Up"}
            </button>
          </form>

          <div className="auth-switch">
            {authMode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button type="button" onClick={() => switchTo(authMode === "login" ? "signup" : "login")}>
              {authMode === "login" ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
