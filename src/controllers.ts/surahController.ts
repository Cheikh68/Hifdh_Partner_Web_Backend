import { Request, Response, NextFunction } from "express";
import { Qurandb } from "../db.js";
import { surah, verse } from "../types.js";

export function getAllSurahs(req: Request, res: Response, next: NextFunction) {
  try {
    const surahStmt = Qurandb.prepare("SELECT * FROM Surah");
    const verseStmt = Qurandb.prepare("SELECT * FROM Verse WHERE surah_id = ?");

    const allSurahs = surahStmt.all() as Omit<surah, "verses">[];

    const result: surah[] = allSurahs.map((s) => ({
      ...s,
      verses: verseStmt.all(s.id) as verse[],
    }));

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export function getSurahById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseInt(req.params.id);
    const surahStmt = Qurandb.prepare("SELECT * FROM Surah WHERE rowid = ?");
    const verseStmt = Qurandb.prepare("SELECT * FROM Verse WHERE surah_id = ?");

    const surah = surahStmt.get(id) as Omit<surah, "verses"> | undefined;
    const verses = verseStmt.all(id) as verse[];

    if (!surah) {
      // No surah with that id
      res.status(404).json({ error: "Surah not found" });
      return;
    }

    const result: surah = {
      ...surah,
      verses,
    };

    res.json(result);
  } catch (error) {
    next(error);
  }
}

export function getVersesForSurah(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);

    const stmt = Qurandb.prepare("SELECT * FROM Verse WHERE surah_id = ?");
    const verses = stmt.all(id) as verse[];

    if (verses.length === 0) {
      // No surah with that id
      res.status(404).json({ error: "Surah not found" });
      return;
    }

    res.json(verses);
  } catch (error) {
    next(error);
  }
}
