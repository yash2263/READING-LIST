# Reading List App

A simple, responsive reading-list web app for students, built with **HTML, CSS and JavaScript** (Lecture 11).

**Live app:** https://reading-list-app-wheat.vercel.app/

## Features
- Add a book with a title and a status: **Want to Read**, **Reading** or **Finished**
- Change a book's status from its card
- Filter books by status (All / Want to Read / Reading / Finished)
- Empty state: *"Your reading list is empty. Add your first book."*
- **Delete** button on every book card
- **Summary** section: Total Books, Currently Reading, Finished
- All data is saved in the browser (`localStorage`). No login, no database, no external APIs.

## Defects fixed
| Defect | Fix | Message shown |
|---|---|---|
| Same title could be added twice | Titles are compared after trimming, collapsing extra spaces and lowercasing | *"This book is already in your reading list."* |
| Very long titles were accepted | Titles are limited to 60 characters, with a live character counter | *"Book title must be 60 characters or fewer."* |

## Run locally
Open `index.html` in a browser. No install needed.

## Deploy
Import this repository into [Vercel](https://vercel.com) → **Deploy**. No build settings are needed for a static site.

## Files
| File | Purpose |
|---|---|
| `index.html` | Page layout: form, summary, filters, list |
| `style.css` | Styling and mobile layout |
| `script.js` | Add / validate / filter / change status / delete / save logic |
