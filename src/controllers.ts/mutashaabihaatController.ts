import { Request, Response, NextFunction } from "express";
import { mutashaabihaatQuestions } from "../db.js";
import { Mutashaabihaat } from "../types.js";

export function getAllMutashaabihaat(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result: Mutashaabihaat[] = mutashaabihaatQuestions;
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export function getMutashaabihaatBySurah(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const sortedQuestions = mutashaabihaatQuestions.sort((a, b) => {
      const minA = Math.min(...a.surahs);
      const minB = Math.min(...b.surahs);
      return minA - minB;
    });
    res.status(200).json(sortedQuestions);
  } catch (error) {
    next(error);
  }
}

export function getMutashaabihaatToSpecificSurah(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = parseInt(req.params.id);
    const filtered = mutashaabihaatQuestions.filter((q) =>
      q.surahs.includes(id)
    );
    res.status(200).json(filtered);
  } catch (error) {
    next(error);
  }
}
