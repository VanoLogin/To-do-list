//Написати Todo-list де можна створювати, видаляти елементи та реалізувати збереження списку в локал сторедж

/*
1. 
*/

//1. создать каждой новой li span со значением крестик при нажатии на который(добавить класс close и текст контент Х)
//2. создать функцыю которая будет дисплей нан на всю li
//3. повесить слушателя на клик на всю ul что бы доавился класс checked на li
//4
// import fillTasksList from "../interfaceLsChecklist/renderOldNotes.js";
import * as lsItnerface from "./interfaceLsChecklist/interfaceLS.js";

const refs = {
  noteListItem: document.getElementsByTagName("li"),
  noteList: document.getElementById("myUL"),
  myInput: document.getElementById("myInput"),
  addBtn: document.getElementById("addBtn"),
};

refs.addBtn.addEventListener("click", addNewNote);
refs.noteList.addEventListener("click", hadleNoteClick);

const classNames = {
  checked: "checked",
  close: "close",
};
// isDone: Boolean - true/false либо сделанная задача, либо нет

let currentId = 1;

fillTasksList();

function hadleNoteClick(event) {
  const lsArray = lsItnerface.load();

  if (event.target.tagName === "LI") {
    event.target.classList.toggle(classNames.checked);
    const index = lsArray.findIndex(
      ({ id }) => id === Number(event.target.dataset.id)
    );
    lsArray[index].isDone = !lsArray[index].isDone; 
  } else if (event.target.classList.contains(classNames.close)) {
    event.target.parentElement.remove();
    const indexToDelete = lsArray.findIndex(
      ({ id }) => id === Number(event.target.parentElement.dataset.id)
    );

    lsArray.splice(indexToDelete, 1);
  }

  lsItnerface.save(lsArray);
}

function addNewNote() {
  const lsArray = lsItnerface.load();
  const inputValue = refs.myInput.value.trim();
  if (inputValue !== "") {
    createLi(inputValue);
    refs.myInput.value = "";

    lsArray.push({
      id: currentId,
      note: inputValue,
      isDone: false,
    });

    lsItnerface.save(lsArray);
    currentId += 1;
  }
}

function fillTasksList() {
  const lsArray = lsItnerface.load();
  if (lsArray) {
    lsArray.forEach(({ id, note, isDone }) => createLi(note, id, isDone));
    currentId = lsArray.length !== 0 ? lsArray[lsArray.length - 1].id + 1 : 1;
  }
}

function createLi(note, id = currentId, isDone = false) {
  const lisEl = document.createElement("li");
  lisEl.textContent = note;
  lisEl.dataset.id = id;
  if (isDone) {
    lisEl.classList.add(classNames.checked);
  }
  createCloseButton(lisEl);
  refs.noteList.prepend(lisEl);
}

function createCloseButton(target) {
  const span = document.createElement("SPAN");
  span.textContent = "X";
  span.className = "close";
  target.append(span);
}
