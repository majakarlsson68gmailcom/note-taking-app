
const addBtn = document.getElementById("add-note-btn"); // Add button
const noteDialog = document.getElementById("note-dialog"); // dialog
const searchInput = document.getElementById("search-notes");
const grid = document.querySelector(".notes-grid");
const STORAGE_KEY = "notes";
const notes = getNotes(); // hämtar arrayen från localstorage

renderNotes(notes);

// tar emot en array, returnerar inget och sparar den i local storage. Den rör inte arrayen
function storeNotes(array) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(array))
}

// Funktionen inte emot något, den returnerar en array eller tom array från localStorage, den rör inte arrayen
function getNotes(){
    const noteData = localStorage.getItem(STORAGE_KEY);
    return noteData !== null ? JSON.parse(noteData) : [];
}

// Open and close dialog
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  noteDialog.showModal();
});

const closeBtn = document.getElementById("close-btn");
closeBtn.addEventListener("click", () => {
  noteDialog.close();
});

// lyssnar på button med type submit.
const noteForm = document.querySelector(".new-note-form")
noteForm.addEventListener("submit", (e) => {
    e.preventDefault();
  
    const newNote = getNoteData();  // spara objektet i variabeln newNote
    notes.push(newNote);
    storeNotes(notes); // spara den uppdaterade arrayen i localStorage
   
    noteDialog.close();
    noteForm.reset();
    
    renderNotes(notes);
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

// Skapa html elementet
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
    return card;    
}

// renderar Notes
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
    renderNotes(notes); // Måste rendera rätt array utifrån om användaren faktiskt sökt och sedan tagit bort något
}



// Filter funktionalitet
function filterByName(e) {
    const searchTerm = e.target.value;

    notes.forEach(function(item) {
        if(item.title.includes(searchTerm)) {
            // Do nothing
        } else {
            item.style.display = "none"
        }
    })
    console.log(searchTerm)
}

searchInput.addEventListener("keyup", (e) => {
    filterByName(e);
})