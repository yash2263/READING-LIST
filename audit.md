# README Claims Audit

| Claim in README | True? | Evidence |
|---|---|---|
| Add a book with title and status | Yes | Tested in browser |
| Change status from the card | Yes | Changing a card to Finished updated the Finished count |
| Filter by status | Yes | "Reading" filter showed only the Reading book |
| Empty-list message | Yes | Shows "Your reading list is empty. Add your first book." |
| Duplicate titles blocked (case and spaces ignored) | Yes | "  atomic   HABITS " after "Atomic Habits" → "This book is already in your reading list." |
| 60-character limit | Yes | 61 characters → "Book title must be 60 characters or fewer." |
| Delete button removes only that book | Yes | Total went from 3 to 2 |
| Summary counts update | Yes | Total / Reading / Finished updated after add, status change and delete |
| Data stays after refresh | Yes | Count unchanged after reload (localStorage) |
| No login, database or external API | Yes | Only `localStorage`; no network calls in `script.js` |
| Live Vercel link | Yes | https://reading-list-app-wheat.vercel.app/ |
