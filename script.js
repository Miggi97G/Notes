let notes = [];
let trashNotes = [];

let allNotes = {
'notes': ['Test', 'Bruh'],
'trashNotes': ['TrashTest', 'Bruh']
}

function moveNote(indexNote, start, destination) {
    let trashContentRef = document.getElementById('trashContent'); //Definiert contentRef als id element content
    trashContentRef.innerHTML = ""; //Leert contentRef

    for (let indexTrashNote = 0; indexTrashNote < allNotes.trashNotes.length; indexTrashNote++) { //Definiert indexNote als 0, indexNote kleiner als notes.length, indexNote +1
        trashContentRef.innerHTML += getTrashNoteTemplate(indexTrashNote); //Fügt note in contentRef hinzu
    }


    saveData();
    renderNotes();
    renderTrashNotes();
    
}


function renderNotes() {
    getLocalStorage();
    let contentRef = document.getElementById('content');
    contentRef.innerHTML = "";

    for (let indexNote = 0; indexNote < notes.length; indexNote++) {
        contentRef.innerHTML += getNoteTemplate(indexNote);
    }
    
}

function addNote() { //Definiert addNote
    let noteInputRef = document.getElementById('noteInput'); //Definiert noteInputRef als id element note_input
    let noteInput = noteInputRef.value; //Definiert noteInput als noteInputRef.value

    if (noteInput !== "") { // Überprüft, ob der noteInput nicht leer ist
        notes.push(noteInput); // Fügt noteInput in notes hinzu
        saveData(); // Speichert die Daten
        renderNotes(); // Rendert notes
    } else {
        console.log("Keine gültige Note eingegeben");
    }
}

function renderTrashNotes() {
    let trashContentRef = document.getElementById('trashContent'); //Definiert contentRef als id element content
    trashContentRef.innerHTML = ""; //Leert contentRef

    for (let indexTrashNote = 0; indexTrashNote < allNotes.trashNotes.length; indexTrashNote++) { //Definiert indexNote als 0, indexNote kleiner als notes.length, indexNote +1
        trashContentRef.innerHTML += getTrashNoteTemplate(indexTrashNote); //Fügt note in contentRef hinzu
    }
}

function getNoteTemplate(indexNote) { //Definiert getNoteTemplate als note
    return ` <p><button class="button" onclick="pushToTrash(${indexNote})"><span class="material-symbols-outlined">
delete_sweep</span></button>${allNotes.notes[indexNote]}</p>`;     //Gibt note als p zurück 
}

function getTrashNoteTemplate(indexTrashNote) { //Definiert getNoteTemplate als note
    return ` <p><button class="button" onclick="deleteNote(${indexTrashNote})">X</button>${allNotes.trashNotes[indexTrashNote]}</p>`;     //Gibt note als p zurück 
}

function pushToTrash(indexNote) {
    let trashNote = notes.splice(indexNote, 1);
    trashNotes.push(trashNote);
    saveData();
    renderNotes();
    renderTrashNotes();
}

function deleteNote(indexTrashNote) {
    trashNotes.splice(indexTrashNote, 1);
    renderTrashNotes();
}

function saveData() {
    let inputRef = document.getElementById('noteInput');

    if (inputRef.value !== "") {
        saveLocalStorage();
        inputRef.value = "";
    }
    saveLocalStorage();
}

function saveLocalStorage() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function getLocalStorage() {
    let myArr = JSON.parse(localStorage.getItem("notes"));
    if (myArr !== null) {
        notes = myArr;
    }
}

