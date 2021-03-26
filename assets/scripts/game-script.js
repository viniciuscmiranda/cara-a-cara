/* elements */
const charContainer = document.getElementById("char-container");
const openNotesButton = document.getElementById("open-notes");
const notesList = document.getElementById("notes-list");
const saveNoteButton = document.getElementById("save-note");
const notesCheckbox = document.getElementById("notes-checkbox");
const noteInput = document.getElementById("note-input");
const notesContainer = document.getElementById("notes-container");

/* init */
shuffle(characters)
  .map((name, id) => ({
    id,
    name,
  }))
  .forEach((char) => {
    const button = document.createElement("div");
    button.tabIndex = 0;

    button.classList.add("char-button");

    function handleClick() {
      if (this.classList.contains("char-button--disabled")) {
        this.classList.remove("char-button--disabled");
      } else {
        this.classList.add("char-button--disabled");
      }
    }

    button.addEventListener("click", handleClick);
    button.addEventListener("keypress", function (event) {
      if (event.keyCode === 13) handleClick.bind(this)();
    });

    const background = document.createElement("div");
    background.style.backgroundImage = `url("../assets/images/${folder}/characters/${char.name}.${extension}")`;

    const name = document.createElement("p");
    name.innerHTML = char.name;

    button.appendChild(background);
    button.appendChild(name);

    charContainer.appendChild(button);
  });

/* listeners */
saveNoteButton.addEventListener("click", saveInput);

noteInput.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) saveInput();
});

openNotesButton.addEventListener("click", () => {
  if (!notesCheckbox.checked) {
    setTimeout(() => noteInput.focus());
  }
});

/* init animations */
setTimeout(() => {
  notesContainer.style.transition = "0.35s ease";
}, 500);

/* functions */
function saveInput() {
  const note = noteInput.value;
  if (!note) return;
  const buttonId = makeid(10);

  const button = document.createElement("button");
  button.innerHTML = '<img src="../assets/images/x.svg">';
  button.addEventListener("click", () => {
    const li = document.getElementById(buttonId);

    const parent = li.parentElement;

    parent.removeChild(li);
  });

  const li = document.createElement("li");
  li.id = buttonId;
  li.innerHTML = note;
  li.appendChild(button);

  notesList.appendChild(li);
  notesList.scrollTo(0, notesList.scrollHeight);
  noteInput.value = "";
}

function makeid(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
