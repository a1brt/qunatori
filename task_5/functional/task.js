import { tasksRender } from "./functional.js";
export function task(todo) {
  const taskContainer = document.createElement("div");
  taskContainer.setAttribute(
    "class",
    "main__container__tasks__pending__list__item"
  );
  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.setAttribute("serial", `${todo?.id}`);
  if (todo.status === "completed") {
    checkBox.checked = true;
  }
  checkBox.addEventListener(
    "change",

    function () {
      this.checked ? markCompleted(this) : notCompleted(this);
      removeAllChildNodes();
    }
  );
  const todoContent = document.createElement("div");
  todoContent.setAttribute(
    "class",
    "main__container__tasks__pending__list__item__content"
  );
  const taskTitle = document.createElement("div");
  taskTitle.setAttribute(
    "class",
    "main__container__tasks__pending__list__item__content__title"
  );
  taskTitle.setAttribute("status", todo?.status);
  taskTitle.innerHTML = todo?.task;
  const dateType = document.createElement("div");
  dateType.setAttribute(
    "class",
    "main__container__tasks__pending__list__item__content__dateType"
  );
  const type = document.createElement("div");
  type.setAttribute(
    "class",
    "main__container__tasks__pending__list__item__content__type"
  );
  type.setAttribute("class", `${todo.type}`);
  type.innerText = todo?.type;
  const date = document.createElement("div");
  date.setAttribute(
    "class",
    "main__container__tasks__pending__list__item__content__date"
  );
  date.innerText = todo?.date;
  [type, date].forEach((el) => dateType.appendChild(el));
  [taskTitle, dateType].forEach((el) => todoContent.appendChild(el));
  const deleteTodo = document.createElement("div");
  deleteTodo.setAttribute(
    "class",
    "main__container__tasks__pending__list__item__removeIcon"
  );
  deleteTodo.setAttribute("serial", `${todo?.id}`);
  deleteTodo.onclick = () => {
    const id = deleteTodo.getAttribute("serial");
    removeTodo(id);

    removeAllChildNodes();
  };
  const deleteIcon = document.createElement("div");
  deleteIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="15" fill="none"><path fill="#838383" d="M6 2.5h2a1 1 0 0 0-2 0Zm-1 0a2 2 0 1 1 4 0h4a.5.5 0 0 1 0 1h-.564l-1.205 8.838A2.5 2.5 0 0 1 8.754 14.5H5.246a2.5 2.5 0 0 1-2.477-2.162L1.564 3.5H1a.5.5 0 0 1 0-1h4ZM6 6a.5.5 0 0 0-1 0v5a.5.5 0 0 0 1 0V6Zm2.5-.5A.5.5 0 0 1 9 6v5a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm-4.74 6.703A1.5 1.5 0 0 0 5.246 13.5h3.508a1.5 1.5 0 0 0 1.487-1.297L11.427 3.5H2.573l1.187 8.703Z"/></svg>`
  deleteTodo.appendChild(deleteIcon);
  [checkBox, todoContent, deleteTodo].forEach((el) =>
    taskContainer.appendChild(el)
  );
  return taskContainer;
}

export function renderTaskList(status) {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const filtered = tasks.filter((todo) => todo.status === status);
  const listContainer = document.getElementsByClassName(
    `main__container__tasks__${status}`
  )[0];
  filtered.forEach((todo) => listContainer.appendChild(task(todo)));
}
export function markCompleted(object) {
  const idToMark = object.getAttribute("serial");
  console.log(idToMark.trim());

  const tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.forEach((todo) => {
    console.log(todo.id);
    if (todo.id.toString() === idToMark) {
      todo.status = "completed";
      console.log(todo);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  removeBodyChildren();

  tasksRender();
  document.location.reload(true);
}
export function notCompleted(object) {
  const idToMark = object.getAttribute("serial");
  console.log(idToMark.trim());

  const tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.forEach((todo) => {
    console.log(todo.id);
    if (todo.id.toString() === idToMark) {
      todo.status = "pending";
      console.log(todo);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  removeBodyChildren();

  tasksRender();
  document.location.reload(true);
}
export function removeTodo(id) {
  const tasks = JSON.parse(localStorage.getItem("tasks"));
  const filtered = tasks.filter((todo) => todo.id.toString() !== id);
  localStorage.setItem("tasks", JSON.stringify(filtered));
  removeBodyChildren();

  tasksRender();
  document.location.reload(true);
}
export function removeAllChildNodes() {
  const pendingContainer = document.getElementsByClassName(
    "main__container__tasks__pending"
  )[0];
  const completedContainer = document.getElementsByClassName(
    "main__container__tasks__completed"
  )[0];
  while (pendingContainer.firstChild) {
    pendingContainer.removeChild(pendingContainer.lastChild);
  }
  while (completedContainer.firstChild) {
    completedContainer.removeChild(completedContainer.lastChild);
  }
}
export function removeBodyChildren() {
  const body = document.getElementsByTagName("body");
  while (body.firstChild) {
    body.removeChild(body.lastChild);
  }
}