
const addBtn = document.getElementById("add-note-btn"); // Add button
const noteDialog = document.getElementById("note-dialog"); // dialog
const grid = document.querySelector(".notes-grid");
const notes = []; // arrayen som håller mina anteckningar


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
function createCardElement(note) {
    const cardTemplate = document.getElementById("card-template");
    const card = cardTemplate.content.cloneNode(true); 
    card.querySelector(".card-title").textContent = note.title;
    card.querySelector(".note-content").textContent = note.content;
    card.querySelector(".note-date").textContent = note.date;

    const deleteBtn = card.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
       const indexToDelete = notes.findIndex(n => n.id === note.id);
       if (indexToDelete !== -1) {
        notes.splice(indexToDelete, 1)
       }
       renderNotes(notes);
    });
    
    return card;    
}

// renderar Notes
function renderNotes(notesToRender) {
    grid.replaceChildren();

    notesToRender.forEach(note => {
       const card = createCardElement(note);
       grid.appendChild(card); 
    });
}

