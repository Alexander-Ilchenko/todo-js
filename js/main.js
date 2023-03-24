// находим элементы на странице

const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");
let tasks = [];

// добавление задачи
form.addEventListener("submit", addTask);
// удаление задачи
tasksList.addEventListener("click", deleteTask);
// Отмечаем задачу как завершенную
tasksList.addEventListener("click", doneTask);

function addTask(event) {
  // отменяем отправку формы
  event.preventDefault();
  //  Достаем текст задачи из поля ввода
  const taskText = taskInput.value;
  const newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };
  //   Добавляем задачу в масив с задачами
  tasks.push(newTask);
  //   Формируем cssкласс
  const cssClass = newTask.done ? "task-title task-title--done" : "task-title";

  //   формируем разметку для новой задачи
  const taskHTML = `<li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
    <span class="${cssClass}">${newTask.text}</span>
    <div class="task-item__buttons">
        <button type="button" data-action="done" class="btn-action">
            <img src="./img/tick.svg" alt="Done" width="18" height="18">
        </button>
        <button type="button" data-action="delete" class="btn-action">
            <img src="./img/cross.svg" alt="Done" width="18" height="18">
        </button>
    </div>
  </li>`;
  // Добавляем задачу на страницу
  tasksList.insertAdjacentHTML("beforeend", taskHTML);
  //   Очищаем поле ввода и возвращаем на него фокус
  taskInput.value = "";
  taskInput.focus();
  if (tasksList.children.length > 1) {
    emptyList.classList.add("none");
  }
}
function deleteTask(event) {
  // проверяем что клик был по кнопке "Удалить задачу"
  if (event.target.dataset.action !== "delete") {
    return;
  }
  const parentNode = event.target.closest(".list-group-item");
  //   Удаляем задачу из данных
  // Определяем ID задачи
  const id = parentNode.id;
  //   Находим индекс задачи в масиве
  const index = tasks.findIndex(function (task) {
    return task.id == id;
  });
  //   Удаляем задачу из масива
  tasks.splice(index, 1);

  //   Удаляем задачу из разметки
  parentNode.remove();
  if (tasksList.children.length === 1) {
    emptyList.classList.remove("none");
  }
}

function doneTask(event) {
  // проверяем что клик был по кнопке "Задача завершенна"
  if (event.target.dataset.action !== "done") {
    return;
  }
  const parentNode = event.target.closest(".list-group-item");
  const id = Number(parentNode.id);
  const task = tasks.find(function (task) {
    if (task.id === id) {
      return true;
    }
  });
  task.done = !task.done;

  const taskTitle = parentNode.querySelector(".task-title");
  taskTitle.classList.toggle("task-title--done");
}
