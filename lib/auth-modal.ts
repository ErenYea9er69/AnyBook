
export type AuthMode = "login" | "signup";

/**
 * Opens the AuthModal by setting the `auth` query param, the same
 * mechanism AuthModal already listens for via popstate. Any component
 * (Header, SearchMock, a locked book page, etc.) can call this instead
 * of duplicating the URL logic.
 */
export function openAuthModal(mode: AuthMode) {
  const params = new URLSearchParams(window.location.search);
  params.set("auth", mode);
  window.history.pushState({}, "", "?" + params.toString());
  window.dispatchEvent(new Event("popstate"));
}