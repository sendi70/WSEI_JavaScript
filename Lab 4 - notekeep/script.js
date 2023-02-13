const titleInput = document.querySelector('#title')
const contenstInput = document.querySelector('#contenst')
const colorInput = document.querySelector('#color')
const addButton = document.querySelector('#addNote')
const notesContainer = document.querySelector('.notesContainer')

let editingNote = null;

addButton.addEventListener('click', addNote)

function addNote() {
    const noteId = generateUUID();
    let note;
    if (editingNote != null) {
        note = buildNoteJSON(editingNote);
        const existingNode = document.getElementById(editingNote)
        existingNode.replaceWith(document.createRange().createContextualFragment(buildNoteNode(note)))
        editingNote = null;
        addButton.innerText = 'Add note'
    }
    else {
        note = buildNoteJSON(noteId);
        notesContainer.insertAdjacentHTML('beforeEnd', buildNoteNode(note))
    }
    localStorage.setItem(note.id, JSON.stringify(note))
}

function buildNoteJSON(noteId) {
    let note = {}
    note.id = noteId
    note.title = titleInput.value;
    note.contenst = contenstInput.value;
    note.color = colorInput.value;
    note.time = new Date().toISOString();
    return note;
}
function buildNoteNode(note) {
    let noteContainer = `<div class="note" id=${note.id} style="background-color:${note.color}">
            <div class="noteHeader">
                <div class="controls">    
                    <button id="pinButton" onclick="pinNote(this)">PIN</button>
                    <button id="deleteButton" onclick="deleteNote(this)">Delete</button>
                    <button id="editButton" onclick="editNote(this)">Edit</button>
                </div>
                <h2>${note.title}</h2>
            </div>
            <div class="noteContenst">
                ${note.contenst}
            </div>
            <p>${note.time.toLocaleString()}</p>
        </div>`
    return noteContainer;
}

function pinNote(e) {
    if (e.innerText == 'PIN') {
        e.parentNode.parentNode.parentNode.style.order = -1
        e.innerText = 'UNPIN'
    }
    else if (e.innerText == 'UNPIN') {
        e.parentNode.parentNode.parentNode.style.order = 0
        e.innerText = 'PIN'
    }
    console.log(e.parentNode.parentNode.parentNode.id)
}

function deleteNote(e) {
    localStorage.removeItem(e.parentNode.parentNode.parentNode.id)
    e.parentNode.parentNode.parentNode.remove()
}

function editNote(e) {
    addButton.innerText = 'Edit note'
    noteId = e.parentNode.parentNode.parentNode.id;
    editingNote = noteId;
    noteNode = document.getElementById(editingNote);
    noteJson = JSON.parse(localStorage.getItem(noteId));
    titleInput.value = noteJson.title;
    contenstInput.value = noteJson.contenst;
    colorInput.value = noteJson.color
}

const generateUUID = () => {
    let
        d = new Date().getTime(),
        d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        let r = Math.random() * 16;
        if (d > 0) {
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c == 'x' ? r : (r & 0x7 | 0x8)).toString(16);
    });
};