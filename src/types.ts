export interface verse {
  id: number;
  text: string;
  translation: string;
  page_number: number;
}

export interface verseRef {
  surahId: number;
  verseId: number;
}

export interface surah {
  id: number;
  name: string;
  transliteration: string;
  translation: string;
  type: string;
  total_verses: number;
  verses: verse[];
}

export interface SurahSummary {
  id: number;
  name: string;
  transliteration: string;
  translation: string;
}

export interface VerseSummary {
  id: number;
  surah_id: number;
  page_number: number;
}

export interface IdenticalVerseGroup {
  text: string;
  refs: verseRef[];
}

export interface Mutashaabihaat {
  passages: string[];
  references: verseRef[];
  surahs: number[];
  correctMatches: {
    [key: string]: verseRef;
  };
  type: string;
  explanation: string;
}

export interface FinishVerse {
  id: number;
  prompt: string;
  correctAnswer: string;
  type: number;
  specificOptions: string[];
  surahId: number;
  verseId: number;
}
