"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchOverlay } from "@/lib/search-overlay-context";
import { BOOKS, type Book } from "@/lib/books";
import { ANGLE_DEFS, ANGLE_ICONS, estimateReadMinutes, type AngleKey } from "@/lib/angles";

function renderAngleContent(book: Book, key: AngleKey) {
  const data = book.angles[key];
  if (key === "chapters") {
    return (
      <>
        {book.angles.chapters.map((ch, i) => (
          <div className="chapter-item" key={i}>
            <b>{ch.t}</b>
            <span>{ch.d}</span>
          </div>
        ))}
      </>
    );
  }
  if (key === "quotes") {
    return (
      <ul className="quote-list">
        {book.angles.quotes.map((q, i) => (
          <li key={i}>{q}</li>
        ))}
      </ul>
    );
  }
  if (key === "uses") {
    return (
      <ul className="use-list">
        {book.angles.uses.map((u, i) => (
          <li key={i}>{u}</li>
        ))}
      </ul>
    );
  }
  return <p>{data as string}</p>;
}

export default function SearchOverlay() {
  const { isOpen, query, closeOverlay } = useSearchOverlay();
  const [searchValue, setSearchValue] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [scrollPct, setScrollPct] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [trackHeight, setTrackHeight] = useState(0);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const sectionRefs = useRef<Map<AngleKey, HTMLDivElement>>(new Map());

  // reset to the results view every time the overlay is opened
  useEffect(() => {
    if (!isOpen) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing local view state with the isOpen/query props from context
    setSearchValue(query);
    setSelectedId(null);
    setScrollPct(0);
    document.body.classList.add("no-scroll");
    const t = setTimeout(() => inputRef.current?.focus(), 200);
    return () => {
      clearTimeout(t);
      document.body.classList.remove("no-scroll");
    };
  }, [isOpen, query]);

  // escape closes it
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeOverlay();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, closeOverlay]);

  const matches = useMemo(() => {
    const q = searchValue.trim().toLowerCase();
    if (!q) return BOOKS;
    return BOOKS.filter(
      (b) =>
        b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
    );
  }, [searchValue]);

  const selectedBook = useMemo(
    () => BOOKS.find((b) => b.id === selectedId) ?? null,
    [selectedId]
  );

  function openBook(id: string) {
    setSelectedId(id);
    setActiveIndex(0);
    setScrollPct(0);
    sectionRefs.current.clear();
    requestAnimationFrame(() => {
      if (panelRef.current) panelRef.current.scrollTop = 0;
    });
  }

  function backToResults() {
    setSelectedId(null);
  }

  // measure the rail track (top/bottom dot positions) whenever a book is open
  useEffect(() => {
    if (!selectedBook) return;

    function measure() {
      const rail = railRef.current;
      if (!rail || getComputedStyle(rail).display === "none") {
        setTrackHeight(0);
        return;
      }
      const dots = rail.querySelectorAll<HTMLElement>(".rail-dot");
      if (!dots.length) return;
      const railRect = rail.getBoundingClientRect();
      const firstRect = dots[0].getBoundingClientRect();
      const lastRect = dots[dots.length - 1].getBoundingClientRect();
      const firstCenter = firstRect.top + firstRect.height / 2 - railRect.top;
      const lastCenter = lastRect.top + lastRect.height / 2 - railRect.top;
      rail.style.setProperty("--rail-line-top", firstCenter + "px");
      rail.style.setProperty(
        "--rail-line-bottom",
        railRect.height - lastCenter + "px"
      );
      setTrackHeight(Math.max(0, lastCenter - firstCenter));
    }

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [selectedBook]);

  // scroll-spy: highlight whichever angle section is in view
  useEffect(() => {
    if (!selectedBook) return;
    const panel = panelRef.current;
    if (!panel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const key = entry.target.getAttribute("data-angle") as AngleKey;
          const idx = ANGLE_DEFS.findIndex((d) => d.key === key);
          if (idx !== -1) setActiveIndex(idx);
        });
      },
      { root: panel, rootMargin: "-12% 0px -70% 0px", threshold: 0 }
    );

    sectionRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [selectedBook]);

  function handlePanelScroll() {
    const panel = panelRef.current;
    if (!panel || !selectedBook) return;
    const max = panel.scrollHeight - panel.clientHeight;
    const pct = max > 0 ? Math.min(100, (panel.scrollTop / max) * 100) : 0;
    setScrollPct(pct);
  }

  const total = ANGLE_DEFS.length;
  const finished = scrollPct >= 99;
  const progressIndex = finished ? total - 1 : activeIndex;
  const progressHeight =
    total > 1 ? (progressIndex / (total - 1)) * trackHeight : 0;

  return (
    <div
      className={`search-overlay${isOpen ? " is-open" : ""}`}
      id="searchOverlay"
      aria-hidden={!isOpen}
    >
      <div
        className="search-overlay-backdrop"
        id="overlayBackdrop"
        onClick={closeOverlay}
      />
      <div className="search-overlay-panel" ref={panelRef} onScroll={handlePanelScroll}>
        <div className="wrap">
          <div className="overlay-top">
            <form
              className={`header-search big${selectedBook ? " is-hidden" : ""}`}
              id="overlaySearchForm"
              onSubmit={(e) => e.preventDefault()}
            >
              <button type="submit" className="search-icon-btn" aria-label="Search">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
              <input
                type="text"
                id="overlaySearchInput"
                placeholder="Search the library"
                autoComplete="off"
                ref={inputRef}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </form>
            <button
              className="overlay-close"
              id="overlayClose"
              type="button"
              aria-label="Close search"
              onClick={closeOverlay}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>
          </div>

          {!selectedBook && (
            <div className="overlay-meta" id="overlayMeta">
              {matches.length === 0
                ? `No results for "${searchValue}"`
                : searchValue.trim()
                ? `${matches.length} result${matches.length === 1 ? "" : "s"} for "${searchValue}"`
                : `${matches.length} books in the library`}
            </div>
          )}

          {!selectedBook && matches.length > 0 && (
            <div className="results-grid" id="resultsGrid">
              {matches.map((book) => (
                <button
                  type="button"
                  className="result-card"
                  key={book.id}
                  onClick={() => openBook(book.id)}
                >
                  <div className="result-cover" style={{ background: book.cover }}>
                    {book.title.charAt(0)}
                  </div>
                  <span className="result-cat">{book.category}</span>
                  <h4>{book.title}</h4>
                  <div className="result-author">{book.author}</div>
                  <div className="result-hook">{book.hook}</div>
                </button>
              ))}
            </div>
          )}

          {!selectedBook && matches.length === 0 && (
            <div className="results-empty" id="resultsEmpty">
              <p>No match in the library yet.</p>
              <a
                href="#request"
                className="btn btn-gold"
                id="emptyRequestLink"
                onClick={closeOverlay}
              >
                Request this title
              </a>
            </div>
          )}

          {selectedBook && (
            <div className="book-detail" id="bookDetail">
              <div className="detail-progress-track">
                <div
                  className="detail-progress-bar"
                  id="detailProgress"
                  style={{ width: `${scrollPct}%` }}
                />
              </div>
              <aside className="angle-rail" id="angleRail" ref={railRef} aria-label="Jump to a section">
                <div
                  className="rail-progress"
                  id="railProgress"
                  style={{ height: `${progressHeight}px` }}
                />
                {ANGLE_DEFS.map((def, i) => (
                  <button
                    key={def.key}
                    type="button"
                    className={`rail-item${
                      !finished && i === activeIndex ? " is-active" : ""
                    }${finished || i < activeIndex ? " is-complete" : ""}`}
                    onClick={() => {
                      const el = sectionRefs.current.get(def.key);
                      el?.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                  >
                    <span className="rail-dot">
                      <svg className="dot-active" width="7" height="7" viewBox="0 0 7 7">
                        <circle cx="3.5" cy="3.5" r="3.5" fill="currentColor" />
                      </svg>
                      <svg
                        className="dot-check"
                        width="9"
                        height="9"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="4 12 9 17 20 6" />
                      </svg>
                    </span>
                    <span className="rail-label">{def.label}</span>
                  </button>
                ))}
              </aside>

              <div className="detail-main">
                <button className="back-link" id="backToResults" type="button" onClick={backToResults}>
                  &larr; All results
                </button>
                <div className="detail-head">
                  <div className="detail-cover" id="detailCover" style={{ background: selectedBook.cover }}>
                    <span id="detailCoverLetter">{selectedBook.title.charAt(0)}</span>
                  </div>
                  <div>
                    <span className="detail-category" id="detailCategory">
                      {selectedBook.category}
                    </span>
                    <h3 id="detailTitle">{selectedBook.title}</h3>
                    <p className="detail-author" id="detailAuthor">
                      {selectedBook.author}
                    </p>
                    <div className="detail-meta" id="detailMeta">
                      <span>{ANGLE_DEFS.length} angles</span>
                      <span>~{estimateReadMinutes(selectedBook)} min read</span>
                    </div>
                  </div>
                </div>

                <div className="angle-sections" id="angleSections">
                  {ANGLE_DEFS.map((def) => (
                    <div
                      className="angle-section"
                      id={`angle-${def.key}`}
                      data-angle={def.key}
                      key={def.key}
                      ref={(el) => {
                        if (el) sectionRefs.current.set(def.key, el);
                        else sectionRefs.current.delete(def.key);
                      }}
                    >
                      <div className="angle-label">
                        <svg
                          className="angle-icon"
                          width="16"
                          height="16"
                          viewBox="0 0 40 40"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          dangerouslySetInnerHTML={{ __html: ANGLE_ICONS[def.key] }}
                        />
                        <span>{def.label}</span>
                      </div>
                      <div className="angle-panel">{renderAngleContent(selectedBook, def.key)}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
