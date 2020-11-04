// const localStorageNotesKey = 'notes';
// let notes = [];

// document.querySelector('#noteAdd').addEventListener('click', onNewNote);

// function onNewNote() {
//     const title = document.querySelector('#noteTitle').value;
//     const content = document.querySelector('#noteContent').value;
//     const newNote = {
//         title: title,
//         content: content,
//         colour: '#ff0000',
//         pinned: false,
//         createDate: new Date(),
//     };

//     notes.push(newNote);
//     console.log(notes);
// }
// // nowa notatka
// const note = {
//     title: 'nowa notatka',
//     content: 'treść notatki',
//     colour: '#ff0000',
//     pinned: false,
//     createDate: new Date(),
// };

// // notatka dodana do tablicy notatek
// notes.push(note);
// notes.push(note);
// notes.push(note);

// // tablica zapisana w localStorage
// localStorage.setItem(localStorageNotesKey, JSON.stringify(notes));

// // odczytanie tablicy notatek z localStorage
// const notesFromStorage = JSON.parse(localStorage.getItem(localStorageNotesKey));
// notes = notesFromStorage.map((note) => {
//     note.createDate = new Date(note.createDate);
//     return note;
// });

// // zmiana html-a z poziomu js-a - sposób brutalny, mało kontrolowany
// for (let note of notes) {
//     const htmlNote = `
//         <section class="note">
//         <h1>${note.title}</h1>
//         <p>${note.content}</p>
//         <h4>${note.createDate.toLocaleString()}</h4>
//         </section>
//     `;
//     const main = document.querySelector('main');
//     main.innerHTML += htmlNote;
// }
// // zmiana html-a z poziomu js-a - sposób obiektowy
// for (let note of notes) {
//     const htmlSection = document.createElement('section');
//     const htmlTitle = document.createElement('h1');
//     const htmlContent = document.createElement('p');
//     const htmlDate = document.createElement('h4');

//     htmlSection.classList.add('note');
//     htmlTitle.innerHTML = note.title;
//     htmlContent.innerHTML = note.content;
//     htmlDate.innerHTML = note.createDate.toLocaleString();

//     htmlSection.appendChild(htmlTitle);
//     htmlSection.appendChild(htmlContent);
//     htmlSection.appendChild(htmlDate);

//     const main = document.querySelector('main');
//     main.appendChild(htmlSection);
// }
// // usuwanie elementów
// // main.removeChild()

// // notatka:
// // Tytuł
// // Treść
// // Kolor notatki
// // Możliwość przypięcia do góry na liście notatek
// // Datę utworzenia
