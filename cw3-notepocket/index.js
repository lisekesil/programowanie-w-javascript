import Notes from './Notes.js';
import Note from './Note.js';
import UI from './UI.js';

const ui = new UI();
const notes = new Notes();
notes.init();

let deleteBtns = ui.qsAll(ui.UiSelectors.deleteBtn);

const noteAdd = document.querySelector('#noteAdd');

const title = ui.qs(ui.UiSelectors.titleInput);
const content = ui.qs(ui.UiSelectors.contentInput);
const color = ui.qs(ui.UiSelectors.colorInput);
const pinned = ui.qs(ui.UiSelectors.pinnedCheckbox);

noteAdd.addEventListener('click', () => {
    notes.addNote(new Note(title.value, content.value, color.value, pinned.checked));
    // deleteBtns = ui.qsAll(ui.UiSelectors.deleteBtn);
});

deleteBtns.forEach((btn) => {
    btn.addEventListener('click', (ev) => {
        const id = ev.target.dataset.id;
        notes.removeNote(id);
    });
});
