# Hifdh Partner Web App Backend

This is the backend service for the **Hifdh Partner App**, built with **Node.js**, **Express**, and **TypeScript**.  
It provides a REST API to support Quran memorization and revision features.

---

## Features

- **Quran Data (Read-only)**  
  - Powered by a SQLite database (`quran_en.db`).  
  - Endpoints for retrieving surahs, verses, and summaries.

- **Question Queries**  
  - `Finish the Verse` dataset (JSON-based).  
  - `Mutashaabihaat` dataset (similar/identical verses, JSON-based).  
  - Filtering and sorting options by surah or type.

- **Caching for Efficiency**  
  - Surah summaries, verse-to-page mapping, and repeated verse groups cached in memory.  
  - Reduces redundant DB lookups and improves API performance.

- **Error Handling**  
  - Centralized Express error handler with meaningful responses.

---

## Tech Stack

- **Node.js** + **Express**
- **TypeScript**
- **SQLite** (read-only database)
- **Custom caching system** (in-memory maps)
- **JSON datasets** for question banks

---

## Getting Started

### 1. Clone the repository
`git clone https://github.com/your-username/hifdh-partner-backend.git`  
`cd hifdh-partner-backend`  

### 2. Install dependencies  
`npm install`  

### 3. Run the server
`npm run dev`   # development (with ts-node-dev)  
`npm run build` # compile TypeScript  
`npm start`     # run compiled code  


The API runs on http://localhost:8000 by default.  

## API Endpoints
### Surahs  
GET /api/surahs → Get all surahs with verses.  
GET /api/surahs/:id → Get a single surah by ID (with verses).  
GET /api/surahs/verses/:id → Get all verses for a surah.  

### Mutashaabihaat  
GET /api/mutashaabihaat → Get all questions.  
GET /api/mutashaabihaat/sort-by-surah → Sorted by surah ID.  
GET /api/mutashaabihaat/:id → Questions linked to a specific surah.  

### Finish the Verse  
GET /api/finish-verse → Get all questions.  
GET /api/finish-verse/type → Sorted by question type.  
GET /api/finish-verse/surah → Sorted by surah.  
GET /api/finish-verse/:id → Questions for a specific surah.  

## Project Structure  
src/
 ├── server.ts  
 ├── db.ts  
 ├── types.ts  
 ├── routes/  
 │    ├── surahs.ts  
 │    ├── mutashaabihaat.ts  
 │    └── finishVerse.ts  
 ├── controllers/  
 │    ├── surahController.ts  
 │    ├── mutashaabihaatController.ts  
 │    └── finishVerseController.ts  
 ├── caches.ts  
 └── errors.ts  

## Future Work
Add authentication and user-specific progress tracking.
Connect with the upcoming frontend web app.
Extend APIs for memorization cycle planning.  

## License
MIT
