"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchOverlay } from "@/lib/search-overlay-context";
import { fetchAllBooks, type Book } from "@/lib/books";
import { ANGLE_DEFS, ANGLE_ICONS, estimateReadMinutes, type AngleKey } from "@/lib/angles";

const KNOWN_PREFIXES = [
  "Core Thesis", "Placement in Arc", "Detailed Argument Reconstruction",
  "How it builds", "Key evidence", "Historical & Contemporary Evidence",
  "Frameworks & Models", "Step-by-step", "Case studies", "Worked example",
  "Analysis", "Key Terminology & Translation Nuances", "Direct Prescriptive Advice",
  "Tactics & Cheat codes", "Psychological mechanisms", "Actionable takeaways",
  "Notable Quotations"
];

function formatChapterPara(para: string, j: number) {
  let match = null;
  for (const p of KNOWN_PREFIXES) {
    if (para.startsWith(p + ":")) {
      match = p;
      break;
    }
  }

  const wrapperStyle = j > 0 ? { marginTop: "1em", display: "block", opacity: 0.85 } : { display: "block", opacity: 0.85 };

  if (match) {
    const lines = para.split("\n").filter(l => l.trim() !== "");
    const firstLineText = lines[0].slice(match.length + 1).trim();
    const hasMultipleItems = lines.length > 1;

    return (
      <span key={j} style={wrapperStyle}>
        <span style={{ display: "block" }}>
          <strong style={{ color: "var(--gold, #C7A05A)" }}>{match}:</strong>{" "}
          {!hasMultipleItems ? firstLineText : ""}
        </span>
        {hasMultipleItems && (
          <span style={{ display: "block", paddingLeft: "1em" }}>
            {firstLineText && (
              <span style={{ display: "block", marginTop: "0.3em" }}>1. {firstLineText}</span>
            )}
            {lines.slice(1).map((line, k) => (
              <span key={k} style={{ display: "block", marginTop: "0.3em" }}>
                {(firstLineText ? k + 2 : k + 1)}. {line}
              </span>
            ))}
          </span>
        )}
      </span>
    );
  }

  return (
    <span key={j} style={wrapperStyle}>
      {para.split("\n").map((line, k) => (
        <span key={k} style={k > 0 ? { display: "block", marginTop: "0.3em" } : undefined}>
          {line}
        </span>
      ))}
    </span>
  );
}

function renderAngleContent(book: Book, key: AngleKey) {
  const data = book.angles[key];
  if (key === "chapters") {
    return (
      <>
        {book.angles.chapters.map((group, gi) => (
          <div key={gi} className="chapter-part-section">
            <h4 className="chapter-part-heading">{group.partTitle}</h4>
            {group.chapters.map((ch, ci) => (
              <div
                className="chapter-item"
                key={ci}
                data-chapter-id={`${gi}-${ci}`}
              >
                <b>{ch.t}</b>
                {ch.d.split("\n\n").map((para, j) => formatChapterPara(para, j))}
              </div>
            ))}
          </div>
        ))}
      </>
    );
  }
  if (key === "quotes") {
    return (
      <ul className="quote-list">
        {book.angles.quotes.map((q, i) => {
          const lines = q.split("\n");
          return (
            <li key={i}>
              {lines.map((line, j) => (
                <span key={j} style={j > 0 ? { display: "block", marginTop: "0.3em", opacity: 0.75, fontSize: "0.92em" } : undefined}>
                  {line}
                </span>
              ))}
            </li>
          );
        })}
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
  const textData = (data as string) || "";
  return (
    <>
      {textData.split(/\n+/).map((para, i) => (
        <p key={i}>{para}</p>
      ))}
    </>
  );
}

export default function SearchOverlay() {
  const { isOpen, query, closeOverlay } = useSearchOverlay();
  const [books, setBooks] = useState<Book[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [scrollPct, setScrollPct] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [trackHeight, setTrackHeight] = useState(0);
  const [railOpenPart, setRailOpenPart] = useState<number>(-1);
  const [activeChapterId, setActiveChapterId] = useState<string | null>(null);
  const [chaptersDone, setChaptersDone] = useState(false);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Fetch book data from JSON files on mount
  useEffect(() => {
    fetchAllBooks().then(setBooks).catch(console.error);
  }, []);
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
    if (!q) return books;
    return books.filter(
      (b) =>
        b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
    );
  }, [searchValue, books]);

  const selectedBook = useMemo(
    () => books.find((b) => b.id === selectedId) ?? null,
    [selectedId, books]
  );

  function openBook(id: string) {
    setSelectedId(id);
    setActiveIndex(0);
    setScrollPct(0);
    setChaptersDone(false);
    setRailOpenPart(-1);
    setActiveChapterId(null);
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
          if (idx !== -1) {
            setActiveIndex(idx);
            // When we scroll past the chapters section, auto-close the chapter sub-nav
            if (key !== "chapters") {
              setChaptersDone(true);
            } else {
              setChaptersDone(false);
            }
          }
        });
      },
      { root: panel, rootMargin: "-12% 0px -70% 0px", threshold: 0 }
    );

    sectionRefs.current.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [selectedBook]);

  // chapter-level scroll-spy: track which individual chapter is in view
  useEffect(() => {
    if (!selectedBook) return;
    const panel = panelRef.current;
    if (!panel) return;

    const chapterEls = panel.querySelectorAll<HTMLElement>("[data-chapter-id]");
    if (!chapterEls.length) return;

    const chObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute("data-chapter-id");
          if (id) {
            setActiveChapterId(id);
            // auto-open the matching part group in the rail
            const partIdx = parseInt(id.split("-")[0], 10);
            if (!isNaN(partIdx)) setRailOpenPart(partIdx);
            // scroll the active chapter into view within the rail
            requestAnimationFrame(() => {
              const rail = railRef.current;
              if (!rail) return;
              const activeBtn = rail.querySelector(`.rail-ch-name.is-active`) as HTMLElement | null;
              activeBtn?.scrollIntoView({ behavior: "smooth", block: "nearest" });
            });
          }
        });
      },
      { root: panel, rootMargin: "-10% 0px -75% 0px", threshold: 0 }
    );

    chapterEls.forEach((el) => chObserver.observe(el));
    return () => chObserver.disconnect();
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
                {ANGLE_DEFS.map((def, i) => {
                  const isActive = !finished && i === activeIndex;
                  const isComplete = finished || i < activeIndex;
                  const isChapters = def.key === "chapters";
                  const showChapterSubs = isChapters && (isActive || isComplete) && !chaptersDone;

                  return (
                    <div key={def.key} className="rail-item-wrap">
                      <button
                        type="button"
                        className={`rail-item${isActive ? " is-active" : ""}${isComplete ? " is-complete" : ""}`}
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

                      {/* Nested chapter sub-nav inside the rail */}
                      {isChapters && selectedBook && (
                        <div className={`rail-chapters-sub${showChapterSubs ? " is-visible" : ""}`}>
                          <div className="rail-chapters-sub-inner">
                          {selectedBook.angles.chapters.map((group, gi) => (
                            <div key={gi} className="rail-part-group">
                              <button
                                type="button"
                                className={`rail-part-btn${railOpenPart === gi ? " is-open" : ""}`}
                                onClick={() => setRailOpenPart(railOpenPart === gi ? -1 : gi)}
                              >
                                <svg className="rail-part-chevron" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="9 6 15 12 9 18" />
                                </svg>
                                <span>{group.partTitle}</span>
                              </button>
                              <div className={`rail-ch-list${railOpenPart === gi ? " is-open" : ""}`}>
                                <div className="rail-ch-list-inner">
                                  {group.chapters.map((ch, ci) => {
                                    const chId = `${gi}-${ci}`;
                                    const isActiveChapter = activeChapterId === chId;
                                    return (
                                      <button
                                        type="button"
                                        key={ci}
                                        className={`rail-ch-name${isActiveChapter ? " is-active" : ""}`}
                                        onClick={() => {
                                          const el = panelRef.current?.querySelector(
                                            `[data-chapter-id="${chId}"]`
                                          );
                                          el?.scrollIntoView({ behavior: "smooth", block: "start" });
                                        }}
                                      >
                                        {ch.t}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
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
