import { Router } from "express";
import {
  getAllMutashaabihaat,
  getMutashaabihaatToSpecificSurah,
  getMutashaabihaatBySurah,
} from "../controllers.ts/mutashaabihaatController.js";

const router = Router();

router.get("/", getAllMutashaabihaat);
router.get("/sort-by-surah", getMutashaabihaatBySurah);
router.get("/:id", getMutashaabihaatToSpecificSurah);

export default router;
