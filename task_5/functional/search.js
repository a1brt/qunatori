export function search(query, status = "pending") {
  const tasks = document.querySelectorAll(
    ".main__container__tasks__pending__list__item__content__title[status='" + status + "']"
  );
  tasks.forEach((task) => {
    if (!task.innerText.startsWith(query)) {
      task.parentElement.parentElement.style.display = "none";
    } else {
      task.parentElement.parentElement.style.display = "flex";
    }
  });
}
