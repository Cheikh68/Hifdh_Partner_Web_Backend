import express from "express";
import surahs from "./routes/surahs.js";
import mutashaabihaat from "./routes/mutashaabihaat.js";
import finishVerse from "./routes/finishVerse.js";
import errorHandler from "./middleware/error.js";
import {
  initializeVersePageCache,
  initializeSurahSummaryCache,
  initializeIdenticalVerseCache,
} from "./caches.js";

const port = process.env.PORT || 8000;
const app = express();

initializeVersePageCache(); // Caching a verseRef to page number map
initializeSurahSummaryCache(); // caching a surah id to surah summary map
initializeIdenticalVerseCache(); // Caching identical verses map

// Routes
app.use("/api/surahs", surahs);
app.use("/api/mutashaabihaat", mutashaabihaat);
app.use("/api/finish-verse", finishVerse);

app.use(errorHandler); // Error handler middleware
app.listen(port, () => console.log(`Server is running on port ${port}`));
