import Database from "better-sqlite3";
import {Mutashaabihaat, FinishVerse} from "./types.js"
import mutashaabihaatdb from "../data/Mutashaabihaat.json" with { type: "json" };
import finishVersedb from "../data/FinishVerse.json" with { type: "json" };
 
export const Qurandb = new Database("./data/quran_en.db", { readonly: true });
export const mutashaabihaatQuestions : Mutashaabihaat[] = mutashaabihaatdb;
export const FinishVerseQuestions : FinishVerse[] = finishVersedb;