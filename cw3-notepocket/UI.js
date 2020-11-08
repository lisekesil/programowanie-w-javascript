export default class UI {
    constructor() {
        this.UiSelectors = {
            notes: '[data-notes]',
            titleInput: '[data-titleInput]',
            contentInput: '[data-contentInput]',
            colorInput: '[data-colorInput]',
            pinnedCheckbox: '[data-pinnedCheckbox]',
            deleteBtn: '[data-deleteBtn]',
        };
    }

    qs(selector) {
        return document.querySelector(selector);
    }

    qsAll(selector) {
        return document.querySelectorAll(selector);
    }
}
