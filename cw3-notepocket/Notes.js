import Note from './Note.js';
import Db from './Db.js';
import NotesUI from './NotesUI.js';

export default class Notes {
    constructor() {
        this.notesArr = [];
        this.db = new Db();
        this.notesUi = new NotesUI('[data-notes]');
    }

    init() {
        const notesFromLs = this.db.getNotes();
        this.notesArr = [...notesFromLs];
        this.notesUi.renderNotes(this.notesArr);
    }

    addNote(note) {
        this.notesArr.push(note);
        this.db.saveNotes(this.notesArr);
        // console.log(this.notesArr);

        this.notesUi.renderHtmlNote(note);
    }

    removeNote(id) {
        const updatedNote = this.notesArr.filter((el) => el.id !== id);
        this.notesArr = updatedNote;
        const deletedNote = document.getElementById(id);
        this.notesUi.container.removeChild(deletedNote);
        this.db.saveNotes(this.notesArr);
    }
}
