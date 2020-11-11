export default class UI {
    constructor() {
        this.UiSelectors = {
            notes: '[data-notes]',
            pinnedNotes: '[data-pinnedNotes]',
            titleInput: '[data-titleInput]',
            contentInput: '[data-contentInput]',
            colorInput: '[data-colorInput]',
            pinnedCheckbox: '[data-pinnedCheckbox]',
            noteID: '[data-noteID]',

            deleteBtn: '[data-deleteBtn]',
            editBtn: '[data-editBtn]',
            addBtn: '[data-addBtn]',
            saveEditBtn: '[data-saveEditBtn]',
        };
    }

    qs(selector) {
        return document.querySelector(selector);
    }

    qsAll(selector) {
        return document.querySelectorAll(selector);
    }
}
