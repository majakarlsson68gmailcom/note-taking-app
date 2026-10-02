
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

// Save button in dialog, get inputvalue
const saveBtn = document.getElementById("save-btn");
saveBtn.addEventListener("click", (e) => {
    e.preventDefault();
  
    const newNote = getNoteData();  // spara objektet i variabeln newNote
    notes.push(newNote);
   
    noteDialog.close();
    createCardElement(newNote)

    titleInput.value = "";
    contentInput.value = "";
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

    return card;
    // grid.appendChild(card);
    
}

// renderar Notes
function renderNotes(notes) {
    grid.replaceChildren();

    notes.forEach(note => {
       const card = createCardElement(note);
       grid.appendChild(card); 
    });
    
    
}

