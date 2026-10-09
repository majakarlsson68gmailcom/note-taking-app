const STORAGE_KEY = "notes";

// tar emot en array, returnerar inget och sparar den i local storage. Den rör inte arrayen
export function storeNotes(array) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(array))
}

// Funktionen tar inte emot något, den returnerar en array eller tom array från localStorage, den rör inte arrayen
export function getNotes(){
    const noteData = localStorage.getItem(STORAGE_KEY);
    return noteData !== null ? JSON.parse(noteData) : [];
}

