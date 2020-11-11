import Notes from './Notes.js';
import Note from './Note.js';
import UI from './UI.js';

const ui = new UI();
const notes = new Notes();
notes.init();

const noteAdd = ui.qs(ui.UiSelectors.addBtn);
const noteEdit = ui.qs(ui.UiSelectors.saveEditBtn);

const title = ui.qs(ui.UiSelectors.titleInput);
const content = ui.qs(ui.UiSelectors.contentInput);
const color = ui.qs(ui.UiSelectors.colorInput);
const pinned = ui.qs(ui.UiSelectors.pinnedCheckbox);
const noteID = ui.qs(ui.UiSelectors.noteID);

noteAdd.addEventListener('click', () => {
    notes.addNote(new Note(title.value, content.value, color.value, pinned.checked));
});

noteEdit.addEventListener('click', () => {
    notes.saveEditedNote(noteID.innerHTML);
});
