import { dateKey, type ReadingDayMap, type ReadingDepth } from "@/lib/reading-storage";

export type GridCell = { key: string; date: Date; depth: ReadingDepth } | null;

/**
 * Builds a commit-graph-style grid: columns of weeks, seven rows for the
 * days in each week, ending on today. A null cell means that day has not
 * happened yet (it pads the last, partial week).
 */
export function buildYearGrid(readingDays: ReadingDayMap, weeks: number = 53): GridCell[][] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const start = new Date(today);
  start.setDate(start.getDate() - (weeks * 7 - 1));
  start.setDate(start.getDate() - start.getDay()); // roll back to the Sunday on or before start

  const columns: GridCell[][] = [];
  const cursor = new Date(start);

  for (let w = 0; w < weeks + 1; w++) {
    const column: GridCell[] = [];
    for (let d = 0; d < 7; d++) {
      if (cursor > today) {
        column.push(null);
      } else {
        const key = dateKey(cursor);
        column.push({ key, date: new Date(cursor), depth: readingDays[key] ?? 0 });
      }
      cursor.setDate(cursor.getDate() + 1);
    }
    columns.push(column);
  }

  // Drop trailing columns that are entirely future, so the grid ends at today.
  while (columns.length > 0 && columns[columns.length - 1].every((c) => c === null)) {
    columns.pop();
  }

  return columns;
}

/** One label per column: the short month name, only on the column where a new month starts. */
export function columnMonthLabels(columns: GridCell[][]): (string | null)[] {
  let prevMonth: number | null = null;
  return columns.map((column) => {
    const firstDay = column.find((c): c is NonNullable<GridCell> => c !== null);
    if (!firstDay) return null;
    const month = firstDay.date.getMonth();
    if (month !== prevMonth) {
      prevMonth = month;
      return firstDay.date.toLocaleDateString(undefined, { month: "short" });
    }
    return null;
  });
}

/** How many days so far this week (Sunday to today) have any reading logged. */
export function currentWeekActiveDays(readingDays: ReadingDayMap): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const start = new Date(today);
  start.setDate(start.getDate() - start.getDay());

  let count = 0;
  for (let i = 0; i < 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    if (d > today) break;
    if ((readingDays[dateKey(d)] ?? 0) > 0) count++;
  }
  return count;
}