import { Request, Response, NextFunction } from "express";
import { FinishVerseQuestions } from "../db.js";
import { FinishVerse } from "../types.js";

export function getAllFinishVerse(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result: FinishVerse[] = FinishVerseQuestions;
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export function getFinishVerseByType(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const sorted = [...FinishVerseQuestions].sort((a, b) => a.type - b.type);
    res.status(200).json(sorted);
  } catch (error) {
    next(error);
  }
}

export function getFinishVerseBySurah(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const sortedQuestions = [...FinishVerseQuestions].sort(
      (a, b) => a.surahId - b.surahId
    );
    res.status(200).json(sortedQuestions);
  } catch (error) {
    next(error);
  }
}

export function getFinishVerseToSpecificSurah(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" });
    }
    const filtered = FinishVerseQuestions.filter((q) => q.surahId === id);
    res.status(200).json(filtered);
  } catch (error) {
    next(error);
  }
}
