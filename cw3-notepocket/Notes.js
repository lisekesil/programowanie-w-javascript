import Db from './Db.js';
import NotesUI from './NotesUI.js';

export default class Notes {
    constructor() {
        this.notesArr = [];
        this.db = new Db();
        this.notesUi = new NotesUI('[data-notes]', '[data-pinnedNotes]');

        this.isEdit = false;
    }

    init() {
        const notesFromLs = this.db.getNotes();
        if (notesFromLs) {
            this.notesArr = [...notesFromLs];
            this.notesUi.renderNotes(this.notesArr);
            this.addEventListeners();
        }
    }

    addNote(note) {
        this.notesArr.push(note);

        this.db.saveNotes(this.notesArr);

        this.notesUi.renderNotes(this.notesArr);
        this.addEventListeners();

        this.notesUi.clearForm();
    }

    removeNote(id) {
        const updatedNote = this.notesArr.filter((el) => el.id !== id);
        this.notesArr = updatedNote;
        const deletedNote = document.getElementById(id);
        deletedNote.parentElement.removeChild(deletedNote);
        this.db.saveNotes(this.notesArr);
    }

    editNote(id) {
        const editedNote = this.getNote(id);

        this.notesUi.title.value = editedNote.title;
        this.notesUi.content.value = editedNote.content;
        this.notesUi.pinned.checked = editedNote.pinned;
        this.notesUi.color.value = editedNote.color;

        this.notesUi.noteID.innerHTML = editedNote.id;

        this.isEdit = !this.isEdit;
        this.notesUi.switchDisabledBtns(this.isEdit);
    }

    saveEditedNote(id) {
        const editedNote = this.getNote(id);

        editedNote.title = this.notesUi.title.value;
        editedNote.content = this.notesUi.content.value;
        editedNote.color = this.notesUi.color.value;
        editedNote.pinned = this.notesUi.pinned.checked;

        this.notesUi.clearForm();
        this.notesUi.renderNotes(this.notesArr);
        this.addEventListeners();

        this.db.saveNotes(this.notesArr);

        this.isEdit = !this.isEdit;
        this.notesUi.switchDisabledBtns(this.isEdit);
    }

    addEventListeners() {
        const deleteBtns = document.querySelectorAll('[data-deleteBtn]');
        const editBtns = document.querySelectorAll('[data-editBtn]');

        deleteBtns.forEach((btn) => {
            btn.addEventListener('click', (ev) => {
                const id = ev.target.dataset.id;
                this.removeNote(id);
            });
        });

        editBtns.forEach((btn) => {
            btn.addEventListener('click', (ev) => {
                const id = ev.target.dataset.id;
                this.editNote(id);
            });
        });
    }

    getNotes() {
        return this.notesArr;
    }

    getNote(id) {
        return this.notesArr.find((el) => el.id === id);
    }
}
