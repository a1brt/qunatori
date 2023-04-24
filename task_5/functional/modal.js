
export const modal = () => {
  const body = document.querySelector("body");
  const modalContainer = document.createElement("div");
  modalContainer.setAttribute("class", "modal__container");
  body.appendChild(modalContainer);
  modalContainer.style.display = "flex";

  const containerInside = document.createElement("div");
  containerInside.setAttribute("class", "modal__container__inside");
  modalContainer.appendChild(containerInside);

  const title = document.createElement("div");
  title.setAttribute("class", "modal__container__inside__title");

  const titleText = document.createElement("h2");
  titleText.innerText = "Add New Task";
  title.appendChild(titleText);

  const todo = document.createElement("div");
  todo.setAttribute("class", "modal__container__input__todo");

  const input = document.createElement("input");
  input.setAttribute("type", "text");
  input.addEventListener("click", () => (input.value = ""));
  input.addEventListener("blur", getTodo);
  todo.appendChild(input);

  const options = document.createElement("div");
  options.setAttribute("class", "modal__container__input__options");

  const optionsTypes = document.createElement("div");
  optionsTypes.setAttribute("class", "modal__container__input__options__type");

  const health = document.createElement("div");
  health.setAttribute("class", "modal__container__input__options__type health");
  health.innerText = "health";

  const work = document.createElement("div");
  work.setAttribute("class", "modal__container__input__options__type work");
  work.innerText = "work";

  const home = document.createElement("div");
  home.setAttribute("class", "modal__container__input__options__type home");
  home.innerText = "home";

  const other = document.createElement("div");
  other.setAttribute("class", "modal__container__input__options__type other");
  other.innerText = "other";

  const tagList = [health, work, home, other];
  tagList.forEach((type) => optionsTypes.appendChild(type));
  tagList.forEach((type) =>
    type.addEventListener("click", event => {
      event.preventDefault();
      checkTodoType(event);
    })
  );
  const optionsDate = document.createElement("input");
  optionsDate.setAttribute("type", "date");
  optionsDate.setAttribute("class", "modal__container__input__options__date");
  optionsDate.addEventListener("mouseleave", () => validateEntries());
  options.appendChild(optionsTypes);
  options.appendChild(optionsDate);

  const buttons = document.createElement("div");
  buttons.setAttribute("class", "modal__container__inside__buttons");

  const addButton = document.createElement("button");
  addButton.setAttribute("class", "modal__container__inside__buttons__add");
  addButton.disabled = true;

  const addText = document.createElement("h3");
  addText.innerText = "Add task";
  addButton.appendChild(addText);

  const cancleButton = document.createElement("button");
  cancleButton.setAttribute(
    "class",
    "modal__container__inside__buttons__cancel"
  );
  const cancelText = document.createElement("h3");
  cancelText.innerText = "Cancel";
  cancleButton.appendChild(cancelText);
  cancleButton.onclick = e => {
    e.preventDefault();
    const cancelButton = document.getElementsByClassName(
      "modal__container__inside__buttons__cancel"
    )[0];

    let modalContainer = document.getElementsByClassName("modal__container")[0];
    cancelButton.addEventListener("click", () => {
      modalContainer.style.display = "none";
    });
    document.location.reload(true);
  }

  buttons.appendChild(cancleButton);
  buttons.appendChild(addButton);

  const insideNodes = [title, todo, options, buttons];
  insideNodes.forEach((child) => containerInside.appendChild(child));
  function closeModal() {
    const modalContainer = document.getElementsByClassName("modal__container")[0];
    modalContainer.style.display = "none";
    console.log("modal window closed");
  }

  function checkTodoType(check) {
    const todoTypes = document.getElementsByClassName(
      "modal__container__input__options__type"
    );
    console.log(todoTypes);

    const color = check.target.style.color;
    const typeName = check.target.className.split(" ")[1];
    check.target.style.border = `1px solid ${color}`;
    [...todoTypes].forEach((type) => {
      if (!type.classList.contains(typeName)) {
        type.style.border = "none";
        type.setAttribute("selected", false);
      } else {
        type.setAttribute("selected", true);
      }
    });
  }

  function getTodo() {
    const input = document.querySelector(".modal__container__input__todo input");
    return input.value.trim() || null;
  }

  function getType() {
    const selectedType = document.querySelector(".modal__container__input__options__type [selected]");
    return selectedType?.innerHTML || null;
  }

  function getDueDate() {
    const input = document.querySelector(".modal__container__input__options__date");
    return input ? formatDate(input.value) : null;
  }

  function validateEntries() {
    const todo = getTodo();
    const dueDate = getDueDate();
    const todoType = getType();
    const addButton = document.querySelector(".modal__container__inside__buttons__add");

    if (todo && dueDate && todoType) {
      const todoItem = {
        task: todo,
        date: dueDate,
        type: todoType,
        status: "pending",
        id: Math.floor(Math.random() * 10000).toString()
      };
      addButton.disabled = false;
      addButton.style.backgroundColor = "#3C86F4";
      addButton.onclick = e => {
        e.preventDefault();
        addTask(todoItem);
        closeModal();
        document.location.reload(true);
      };
    } else {
      console.log("Some entries are invalid");
    }
  };

  function addTask(task) {
    const existingTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    existingTasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(existingTasks));
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric"
    };

    if (now.toDateString() === date.toDateString()) {
      return "Today";
    }

    now.setDate(now.getDate() + 1);
    if (now.toDateString() === date.toDateString()) {
      return "Tomorrow";
    }

    return date.toLocaleString(window.navigator.language, options);
  }
};


export function showModal() {
  let modalContainer = document.getElementsByClassName("modal__container")[0];
  modalContainer.style.display = "flex";
}
export function hideModal() {
  let modalContainer = document.getElementsByClassName("modal__container")[0];
  modalContainer.style.display = "none";
}