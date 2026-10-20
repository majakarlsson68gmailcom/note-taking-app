# Notes

A simple note-taking app built with plain HTML, CSS and JavaScript. You can create, edit, search and delete notes. Notes are saved in the browser with `localStorage`, so they are still there when you reload the page.

## Features

- **Create notes** with a title and content in a modal dialog
- **Edit notes** by reusing the same dialog, pre-filled with the note's current values
- **Delete notes** directly from each card
- **Live search** that filters notes by title as you type
- **Dark mode** toggle that remembers your choice
- **Persistent storage** with `localStorage`, so no backend or account is needed
- **Date stamp** on each note, set when the note is created

## Built with

- HTML5 (`<dialog>`, `<template>`)
- CSS with custom properties for light and dark themes
- Vanilla JavaScript (ES modules)
- [Temporal API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal) for dates
- `crypto.randomUUID()` for unique note IDs
- [Outfit](https://fonts.google.com/specimen/Outfit) from Google Fonts

## Getting started

The app uses ES modules, so it needs to be served over HTTP. Opening `index.html` directly from the file system will not load the scripts.

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd note-taking-app
   ```
2. Start a local server, for example:
   - the **Live Server** extension in VS Code, or
   - `npx serve .`, or
   - `python3 -m http.server`
3. Open the address the server prints (for example `http://localhost:8000`) in your browser.

> **Note:** The app uses the Temporal API, which is not yet supported in every browser. If notes can't be created, try a recent version of Chrome or Firefox.

## Project structure

```
note-taking-app/
├── index.html        # Markup, note dialog and card template
├── style.css         # Styles, theme variables and dark mode
├── assets/
│   └── icons/        # SVG icons
└── js/
    ├── app.js        # Rendering, create/edit/delete and search logic
    ├── storage.js    # Reading and writing notes to localStorage
    └── darkmode.js   # Dark mode toggle and saved preference
```

## How it works

- All notes live in one array that is loaded from `localStorage` when the page starts.
- Every change (add, edit, delete) updates the array, saves it with `storeNotes()` and renders the list again.
- Rendering always goes through `renderFilteredNotes()`, so the current search term is applied after every change.
- Note cards are created by cloning the `<template id="card-template">` element in `index.html`.

## Possible improvements

- Search note content as well as titles
- Sort notes by date
- Ask for confirmation before deleting a note
- Show an empty state when there are no notes
