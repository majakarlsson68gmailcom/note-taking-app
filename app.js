
const addBtn = document.getElementById("add-note-btn"); // Add button
const noteDialog = document.getElementById("note-dialog"); // dialog
const searchInput = document.getElementById("search-notes"); // Sökfältet
const searchForm = document.querySelector(".search-form");
const grid = document.querySelector(".notes-grid");
const STORAGE_KEY = "notes";
const notes = getNotes(); // hämtar arrayen från localstorage
let editingNoteId = null; // Variabel som håller koll på vilket id som redigeras

renderNotes(notes);

// tar emot en array, returnerar inget och sparar den i local storage. Den rör inte arrayen
function storeNotes(array) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(array))
}

// Funktionen tar inte emot något, den returnerar en array eller tom array från localStorage, den rör inte arrayen
function getNotes(){
    const noteData = localStorage.getItem(STORAGE_KEY);
    return noteData !== null ? JSON.parse(noteData) : [];
}

// Open dialog
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  noteDialog.showModal();
});

noteDialog.addEventListener("close", () => {
    noteForm.reset();
    editingNoteId = null;
})

// Close dialog
const closeBtn = document.getElementById("close-btn");
closeBtn.addEventListener("click", () => {
    noteDialog.close();
});

// Lägger in nytt objekt i notes arrayen, uppdaterar localStorage, renderar anteckningarna på nytt.
const noteForm = document.querySelector(".new-note-form")
noteForm.addEventListener("submit", (e) => {
    e.preventDefault();
   
    // Hämtar hämtar vilken note som ska redigeras, lagrar anteckningen och renderar på nytt.
    if(editingNoteId !== null){
        const noteToEdit = notes.find(note => note.id === editingNoteId);
        noteToEdit.title = titleInput.value;
        noteToEdit.content = contentInput.value;
        storeNotes(notes);
        editingNoteId = null; // Nollställer editingNoteId -> inte pekar på samma id som klickats
        noteDialog.close();
        noteForm.reset();
        
        renderFilteredNotes();

    } else {
        const newNote = getNoteData();  // spara objektet i variabeln newNote
        notes.push(newNote);
        storeNotes(notes); // spara den uppdaterade arrayen i localStorage
    
        noteDialog.close();
        noteForm.reset();
    
        searchInput.value = ""; // Töm sökfältet när ny note läggs till
        renderFilteredNotes();
    }
})

// Funtkion som hämtar och returnerar data i form av ett objekt
const titleInput = document.getElementById("note-title");
const contentInput = document.getElementById("note-content");

function getNoteData(){
    const title = titleInput.value;
    const content = contentInput.value;
    const date = Temporal.Now.plainDateISO().toString();
    
    return {
        title: title,
        content: content,
        id: crypto.randomUUID(),
        date: date,
    }
}

// Skapa html elementet med lyssnare för ta bort knappen och returnerar kortet.
function createCardElement(note, onDelete) {
    const cardTemplate = document.getElementById("card-template");
    const card = cardTemplate.content.cloneNode(true); 
    card.querySelector(".card-title").textContent = note.title;
    card.querySelector(".note-content").textContent = note.content;
    card.querySelector(".note-date").textContent = note.date;

    const deleteBtn = card.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
        onDelete(note);
    });

    // Ger editinNoteId rätt id, sätter inputs fältens värden och öppnar modalen
    const editBtn = card.querySelector(".edit-btn");
    editBtn.addEventListener("click", () => {
        setEditNoteId(note);
        titleInput.value = note.title;
        contentInput.value = note.content;
        noteDialog.showModal();
        
    })
    return card;    
}

// renderar notes objekten, tar emot en array som argument.
function renderNotes(notesToRender) {
    grid.replaceChildren();

    notesToRender.forEach(note => {
       const card = createCardElement(note, deleteNote);
       grid.appendChild(card); 
    });
}

function deleteNote(note) {
    const indexToDelete = notes.findIndex(n => n.id === note.id);
    if (indexToDelete !== -1) {
     notes.splice(indexToDelete, 1)
    }
    storeNotes(notes); // Spara den uppdaterade arrayen i localStorage
    renderFilteredNotes()
}

// Filter funktionalitet, om inget står i input -> alla anteckninngar hamnar i den nya arrayen och renderas. Körs på varje ställe där notes ändras ("Vad som ska synas just nu")
function renderFilteredNotes() {
  
    const searchTerm = getSearchValue();
    // Filter returnerar varje note som uppfyller callbackens krav som körs för varje element i notes arrayen
    const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(searchTerm))
    renderNotes(filteredNotes);
}

// Hämta värdet från sökfältet och returnera dess värde
function getSearchValue(){
    return searchInput.value.toLowerCase();
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();

    renderFilteredNotes();
    
})
searchInput.addEventListener("input", () => {
       renderFilteredNotes();
})


// Funktion som ska editingNoteId till det samma id vars anteckning som klickas
function setEditNoteId(note){
    editingNoteId = note.id;
}