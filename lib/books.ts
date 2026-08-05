export type ChapterEntry = { t: string; d: string };

export type ChapterGroup = {
  partTitle: string;
  chapters: ChapterEntry[];
};

export type BookAngles = {
  argument: string;
  chapters: ChapterGroup[];
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

/* ---------- chapter parser helper ---------- */
type RawChapter = {
  chapter_number?: number | string;
  title: string;
  summary?: string;
  text?: string;
  how_it_builds_on_previous_chapter?: string;
  key_turning_point_or_evidence?: string;
  analysis?: string;
  worked_example?: string;
  core_thesis?: string;
  key_frameworks_and_models?: string;
  step_by_step_processes?: string;
  real_world_examples_and_case_studies?: string;
  tactical_lists_and_cheat_codes?: string;
  psychological_mechanisms?: string;
  actionable_takeaways?: string;
  placement_in_the_arc?: string;
  detailed_argument_reconstruction?: string;
  key_terminology_and_translation_nuances?: string;
  historical_and_contemporary_evidence?: string;
  direct_prescriptive_advice?: string;
  notable_quotations?: string;
};

function parseChapters(rawChapters: RawChapter[]): ChapterEntry[] {
  return rawChapters.map((ch) => {
    const parts: string[] = [];
    if (ch.summary) parts.push(ch.summary);
    if (ch.core_thesis) parts.push(`Core Thesis: ${ch.core_thesis}`);
    if (ch.placement_in_the_arc) parts.push(`Placement in Arc: ${ch.placement_in_the_arc}`);
    if (ch.detailed_argument_reconstruction) parts.push(`Detailed Argument Reconstruction: ${ch.detailed_argument_reconstruction}`);
    if (ch.text) parts.push(ch.text);
    if (ch.how_it_builds_on_previous_chapter)
      parts.push(`How it builds: ${ch.how_it_builds_on_previous_chapter}`);
    if (ch.key_turning_point_or_evidence)
      parts.push(`Key evidence: ${ch.key_turning_point_or_evidence}`);
    if (ch.historical_and_contemporary_evidence)
      parts.push(`Historical & Contemporary Evidence: ${ch.historical_and_contemporary_evidence}`);
    if (ch.key_frameworks_and_models)
      parts.push(`Frameworks & Models: ${ch.key_frameworks_and_models}`);
    if (ch.step_by_step_processes)
      parts.push(`Step-by-step: ${ch.step_by_step_processes}`);
    if (ch.real_world_examples_and_case_studies)
      parts.push(`Case studies: ${ch.real_world_examples_and_case_studies}`);
    if (ch.worked_example)
      parts.push(`Worked example: ${ch.worked_example}`);
    if (ch.analysis)
      parts.push(`Analysis: ${ch.analysis}`);
    if (ch.key_terminology_and_translation_nuances)
      parts.push(`Key Terminology & Translation Nuances: ${ch.key_terminology_and_translation_nuances}`);
    if (ch.direct_prescriptive_advice)
      parts.push(`Direct Prescriptive Advice: ${ch.direct_prescriptive_advice}`);
    if (ch.tactical_lists_and_cheat_codes)
      parts.push(`Tactics & Cheat codes: ${ch.tactical_lists_and_cheat_codes}`);
    if (ch.psychological_mechanisms)
      parts.push(`Psychological mechanisms: ${ch.psychological_mechanisms}`);
    if (ch.actionable_takeaways)
      parts.push(`Actionable takeaways: ${ch.actionable_takeaways}`);
    if (ch.notable_quotations)
      parts.push(`Notable Quotations: ${ch.notable_quotations}`);

    return {
      t: ch.chapter_number ? `Chapter ${ch.chapter_number}: ${ch.title}` : ch.title,
      d: parts.join("\n\n"),
    };
  });
}

/* ------------------------------------------------------------------ */
/*  Transform raw JSON (the structured format) into a Book object     */
/* ------------------------------------------------------------------ */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseBookFromJSON(raw: any, colorIndex = 0): Book {
  const facts = raw.section_1_quick_facts || raw.quick_facts;

  // Group chapters by part, preserving the structure from the JSON
  const chapterGroups: ChapterGroup[] = [];

  if (raw.part_1_chapters?.length) {
    chapterGroups.push({
      partTitle: "Part One — The Seductive Character",
      chapters: parseChapters(raw.part_1_chapters),
    });
  }
  if (raw.part_2_chapters?.length) {
    chapterGroups.push({
      partTitle: "Part Two — The Seductive Process",
      chapters: parseChapters(raw.part_2_chapters),
    });
  }
  if (raw.section_3_chapter_breakdowns?.length) {
    chapterGroups.push({
      partTitle: "Chapters",
      chapters: parseChapters(raw.section_3_chapter_breakdowns),
    });
  }
  if (raw.appendices?.length) {
    chapterGroups.push({
      partTitle: "Appendices",
      chapters: parseChapters(raw.appendices),
    });
  }

  // Fallback: if none of the above keys exist, try a flat array
  if (chapterGroups.length === 0 && raw.chapters?.length) {
    chapterGroups.push({
      partTitle: "Chapters",
      chapters: parseChapters(raw.chapters),
    });
  }

  const quotes: string[] = (raw.section_5_notable_quotes || []).map(
    (q: { quote: string; location?: string; analysis?: string; attributed_to?: string }) => {
      const parts = [`"${q.quote}"`];
      if (q.location) parts.push(`— ${q.location}`);
      if (q.attributed_to) parts.push(`— ${q.attributed_to}`);
      if (q.analysis) parts.push(q.analysis);
      return parts.join("\n");
    }
  );

  const usesRaw = raw.section_6_real_world_use_lessons_and_takeaways || raw.section_6_real_world_use_and_lessons || [];
  const uses: string[] = usesRaw.map(
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

  let authorBg: string = "";
  if (typeof raw.section_8_author_background === "string") {
    authorBg = raw.section_8_author_background;
  } else if (typeof raw.section_8_author_background === "object" && raw.section_8_author_background !== null) {
    authorBg = Object.values(raw.section_8_author_background).join("\n\n");
  }

  const categoryStr = facts.fiction_or_non_fiction 
    ? `${facts.fiction_or_non_fiction} · ${facts.genre}`.replace(/\.\s*$/, "")
    : facts.genre;

  const hookStr = facts.description || facts.core_premise || "";

  return {
    id: slugify(facts.title),
    title: facts.title,
    author: facts.author,
    category: categoryStr,
    hook: hookStr,
    cover: COVER_COLORS[colorIndex % COVER_COLORS.length],
    angles: {
      argument: raw.section_2_core_argument || raw.core_argument || "",
      chapters: chapterGroups,
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
  "/data/100M_Offers_structured.json",
  "/data/The_Prince_structured.json",
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
