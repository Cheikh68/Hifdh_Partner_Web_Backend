import { Qurandb } from "./db.js";
import { verseRef } from "./types.js";
import { VerseSummary, SurahSummary, IdenticalVerseGroup } from "./types.js";
import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Caching verse to page map
export const versePageMap = new Map<verseRef, number>();

export function initializeVersePageCache() {
  const stmt = Qurandb.prepare("SELECT id, surah_id, page_number FROM Verse");
  const allVerses = stmt.all() as VerseSummary[];

  for (const v of allVerses) {
    versePageMap.set({ surahId: v.surah_id, verseId: v.id }, v.page_number);
  }
}

// Caching surah id to surah
export const surahSummaryMap = new Map<number, SurahSummary>();

export function initializeSurahSummaryCache() {
  const stmt = Qurandb.prepare(
    "SELECT id, name, transliteration, translation FROM Surah"
  );
  const allSurahs = stmt.all() as SurahSummary[];

  for (const s of allSurahs) {
    surahSummaryMap.set(s.id, s);
  }
}

// Caching identical verses map
export const identicalVerseMap = new Map<string, Set<string>>();

function serializeRef(ref: verseRef): string {
  return `${ref.surahId}:${ref.verseId}`;
}

export function initializeIdenticalVerseCache() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  const filePath = path.join(__dirname, "..", "data", "repeated_verses.json");
  const fileData = readFileSync(filePath, "utf-8");
  const jsonData = JSON.parse(fileData) as IdenticalVerseGroup[];

  for (const group of jsonData) {
    for (const ref of group.refs) {
      const key = serializeRef(ref);
      if (!identicalVerseMap.has(key)) {
        identicalVerseMap.set(key, new Set());
      }

      for (const other of group.refs) {
        if (ref.surahId !== other.surahId || ref.verseId !== other.verseId) {
          identicalVerseMap.get(key)!.add(serializeRef(other));
        }
      }
    }
  }
}
