export type ChapterEntry = { t: string; d: string };

export type BookAngles = {
  argument: string;
  chapters: ChapterEntry[];
  quotes: string[];
  uses: string[];
  pushback: string;
  authorBg: string;
};

export type Book = {
  id: string;
  title: string;
  author: string;
  category: string;
  hook: string;
  cover: string;
  angles: BookAngles;
};

/* ---------- colour palette for book covers ---------- */
const COVER_COLORS = [
  "var(--rust)",
  "#C7A05A",
  "#B4543A",
  "#83A78E",
  "#5E7F91",
  "#CBA35F",
  "#E7DBBE",
];

/* ---------- slug helper ---------- */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/* ------------------------------------------------------------------ */
/*  Transform raw JSON (the structured format) into a Book object     */
/* ------------------------------------------------------------------ */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseBookFromJSON(raw: any, colorIndex = 0): Book {
  const facts = raw.section_1_quick_facts;

  // Combine all chapters from part_1, part_2, and appendices
  const allChapters = [
    ...(raw.part_1_chapters || []),
    ...(raw.part_2_chapters || []),
    ...(raw.appendices || []),
  ];

  const chapters: ChapterEntry[] = allChapters.map(
    (ch: {
      chapter_number?: number | string;
      title: string;
      summary?: string;
      text?: string;
      how_it_builds_on_previous_chapter?: string;
      key_turning_point_or_evidence?: string;
      analysis?: string;
      worked_example?: string;
    }) => {
      // Combine all available content fields from the JSON
      const parts: string[] = [];
      if (ch.summary) parts.push(ch.summary);
      if (ch.text) parts.push(ch.text);
      if (ch.how_it_builds_on_previous_chapter)
        parts.push(`How it builds: ${ch.how_it_builds_on_previous_chapter}`);
      if (ch.key_turning_point_or_evidence)
        parts.push(`Key evidence: ${ch.key_turning_point_or_evidence}`);
      if (ch.worked_example)
        parts.push(`Worked example: ${ch.worked_example}`);
      if (ch.analysis)
        parts.push(`Analysis: ${ch.analysis}`);

      return {
        t: ch.chapter_number ? `Chapter ${ch.chapter_number}: ${ch.title}` : ch.title,
        d: parts.join("\n\n"),
      };
    }
  );

  const quotes: string[] = (raw.section_5_notable_quotes || []).map(
    (q: { quote: string; location?: string; analysis?: string }) => {
      const parts = [`"${q.quote}"`];
      if (q.location) parts.push(`— ${q.location}`);
      if (q.analysis) parts.push(q.analysis);
      return parts.join("\n");
    }
  );

  const uses: string[] = (raw.section_6_real_world_use_lessons_and_takeaways || []).map(
    (u: { title: string; text: string }) => `${u.title}: ${u.text}`
  );

  // Pushback can be a string or an array of objects
  let pushback: string;
  if (Array.isArray(raw.section_7_pushback_and_criticism)) {
    pushback = raw.section_7_pushback_and_criticism
      .map((p: { title: string; text: string }) => `${p.title}: ${p.text}`)
      .join("\n\n");
  } else {
    pushback = raw.section_7_pushback_and_criticism || "";
  }

  const authorBg: string = raw.section_8_author_background || "";

  return {
    id: slugify(facts.title),
    title: facts.title,
    author: facts.author,
    category: `${facts.fiction_or_non_fiction} · ${facts.genre}`.replace(/\.\s*$/, ""),
    hook: facts.description,
    cover: COVER_COLORS[colorIndex % COVER_COLORS.length],
    angles: {
      argument: raw.section_2_core_argument || "",
      chapters,
      quotes,
      uses,
      pushback,
      authorBg,
    },
  };
}

/* ------------------------------------------------------------------ */
/*  Manifest: list of JSON files that make up the library.            */
/*  To add a new book, just drop another structured JSON in           */
/*  public/data/ and add the filename here.                           */
/* ------------------------------------------------------------------ */

export const BOOK_DATA_FILES: string[] = [
  "/data/the_art_of_seduction_structured.json",
];

/* ------------------------------------------------------------------ */
/*  Fetch all books at runtime                                        */
/* ------------------------------------------------------------------ */

export async function fetchAllBooks(): Promise<Book[]> {
  const results = await Promise.all(
    BOOK_DATA_FILES.map(async (url, i) => {
      const res = await fetch(url);
      if (!res.ok) {
        console.error(`Failed to fetch ${url}: ${res.status}`);
        return null;
      }
      const raw = await res.json();
      return parseBookFromJSON(raw, i);
    })
  );
  return results.filter((b): b is Book => b !== null);
}
