import { Router } from "express";
import {
  getAllFinishVerse,
  getFinishVerseToSpecificSurah,
  getFinishVerseByType,
  getFinishVerseBySurah,
} from "../controllers.ts/finishVerseController.js";

const router = Router();

router.get("/", getAllFinishVerse);
router.get("/type", getFinishVerseByType);
router.get("/surah", getFinishVerseBySurah);
router.get("/:id", getFinishVerseToSpecificSurah);

export default router;
