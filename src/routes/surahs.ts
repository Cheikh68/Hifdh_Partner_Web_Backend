import { Router } from "express";
import {
  getAllSurahs,
  getSurahById,
  getVersesForSurah,
} from "../controllers.ts/surahController.js";

const router = Router();

router.get("/", getAllSurahs);
router.get("/:id", getSurahById);
router.get("/verses/:id", getVersesForSurah);

export default router;
