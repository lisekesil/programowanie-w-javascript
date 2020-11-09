export default class UI {
    constructor() {
        this.UiSelectors = {
            recordBtns: '.recordTrack',
            playBtns: '.playTrack',
            playAllBtn: '.playAllTracks',
        };
    }

    getElement(selector) {
        return document.querySelector(selector);
    }

    getElements(selector) {
        return document.querySelectorAll(selector);
    }
}
