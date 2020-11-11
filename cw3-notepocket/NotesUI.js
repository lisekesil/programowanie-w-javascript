import UI from './UI.js';

export default class NotesUI extends UI {
    constructor(containerSelector, pinnedContainerSelector) {
        super();
        this.container = this.qs(containerSelector);
        this.pinnedContainer = this.qs(pinnedContainerSelector);

        this.title = this.qs(this.UiSelectors.titleInput);
        this.content = this.qs(this.UiSelectors.contentInput);
        this.color = this.qs(this.UiSelectors.colorInput);
        this.pinned = this.qs(this.UiSelectors.pinnedCheckbox);
        this.noteID = this.qs(this.UiSelectors.noteID);

        this.addBtn = this.qs(this.UiSelectors.addBtn);
        this.saveEditBtn = this.qs(this.UiSelectors.saveEditBtn);
    }

    switchDisabledBtns(isEdit) {
        if (isEdit) {
            this.addBtn.disabled = true;
            this.saveEditBtn.disabled = false;
        } else {
            this.addBtn.disabled = false;
            this.saveEditBtn.disabled = true;
        }
    }

    renderNotes(notes) {
        this.container.innerHTML = '';
        this.pinnedContainer.innerHTML = '';
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
        htmlImgEdit.setAttribute('data-id', note.id);
        htmlImgDelete.setAttribute('data-deleteBtn', '');
        htmlImgEdit.setAttribute('data-editBtn', '');

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

    clearForm() {
        this.title.value = '';
        this.content.value = '';
        this.color.value = '#e2ffbf';
        this.pinned.checked = false;
        this.noteID.innerHTML = '';
    }
}
