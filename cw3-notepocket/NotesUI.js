import UI from './UI.js';

export default class NotesUI extends UI {
    constructor(containerSelector) {
        super();
        this.container = this.qs(containerSelector);
        this.pinnedContainer = this.qs('.pinnedNotes');
    }

    renderNotes(notes) {
        this.container.innerHTML = '';
        notes.forEach((note) => {
            this.renderHtmlNote(note);
        });
    }

    renderHtmlNote(note) {
        const htmlSection = document.createElement('section');
        const htmlTitle = document.createElement('h1');
        const htmlContent = document.createElement('p');
        const htmlFooter = document.createElement('div');
        const htmlImgEdit = document.createElement('img');
        const htmlDate = document.createElement('h4');
        const htmlImgDelete = document.createElement('img');

        htmlSection.classList.add('note');
        htmlTitle.classList.add('note__title');
        htmlContent.classList.add('note__content');
        htmlFooter.classList.add('note__footer');
        htmlImgEdit.classList.add('note__img');
        htmlImgDelete.classList.add('note__img');
        htmlDate.classList.add('note__date');

        htmlTitle.innerHTML = note.title;
        htmlContent.innerHTML = note.content;
        htmlDate.innerHTML = note.createDate.toLocaleString();
        htmlSection.id = note.id;
        htmlImgDelete.setAttribute('data-id', note.id);
        htmlImgDelete.setAttribute('data-deleteBtn', '');

        htmlImgEdit.src = './edit.png';
        htmlImgDelete.src = './delete.png';
        htmlSection.style.backgroundColor = note.color;

        htmlFooter.appendChild(htmlImgEdit);
        htmlFooter.appendChild(htmlDate);
        htmlFooter.appendChild(htmlImgDelete);

        htmlSection.appendChild(htmlTitle);
        htmlSection.appendChild(htmlContent);
        htmlSection.appendChild(htmlFooter);

        if (note.pinned) {
            this.pinnedContainer.insertAdjacentElement('afterbegin', htmlSection);
        } else {
            this.container.insertAdjacentElement('afterbegin', htmlSection);
        }
    }
}
