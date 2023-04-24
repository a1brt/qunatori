import { modal, showModal, hideModal } from "./modal.js";
import { renderTaskList } from "./task.js";
import { search } from "./search.js";

export function tasksRender() {
  const body = document.querySelector("body");

  const main = document.createElement("section");
  main.setAttribute("class", "main__container");
  body.appendChild(main);
  modal();
  hideModal();

  const header = document.createElement("header");
  header.innerText = "To Do List";

  const searchContainer = document.createElement("div");
  searchContainer.setAttribute("class", "main__container__searchbar");

  const searchField = document.createElement("input");
  searchField.setAttribute("type", "search");
  searchField.setAttribute("class", "main__container__searchfield");
  searchField.setAttribute("placeholder", "Search Task");
  searchField.addEventListener("keyup", (event) => {
    search(event.target.value);
  });

  const newTaskButton = document.createElement("button");
  newTaskButton.setAttribute("class", "main__container__newTask");
  newTaskButton.innerText = "+ New Task";
  newTaskButton.addEventListener("click", () => showModal());
  [searchField, newTaskButton].forEach(component => searchContainer.appendChild(component));

  const tasksContainer = document.createElement("div");
  tasksContainer.setAttribute("class", "main__container__tasks");

  const pendingTasks = document.createElement("div");
  pendingTasks.setAttribute("class", "main__container__tasks__pending");

  const pendingTitle = document.createElement("p");
  pendingTitle.innerText = "All Tasks";
  pendingTasks.appendChild(pendingTitle);

  const completedTasks = document.createElement("div");
  completedTasks.setAttribute("class", "main__container__tasks__completed");

  const completedTitle = document.createElement("p");
  completedTitle.innerText = "Completed Tasks";
  completedTasks.appendChild(completedTitle);
  [pendingTasks, completedTasks].forEach(task =>
    tasksContainer.appendChild(task)
  );
  [header, searchContainer, tasksContainer].forEach((task) =>
    main.appendChild(task)
  );
  renderTaskList("pending");
  renderTaskList("completed");
}
tasksRender();