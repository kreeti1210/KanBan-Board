let rightClickedCard = null;
const themeValue = document.getElementById("theme");

document.addEventListener("DOMContentLoaded", loadTasksfromLocalStorage());
function toggleTheme() {
  const innerValue = themeValue.innerText;
  const list = document.getElementsByClassName("column");
  if (innerValue === "Toggle Mode" || innerValue === "Light Mode") {
    document.body.style.background = "#ffffff";
    themeValue.innerText = "Dark Mode";
    document.querySelector("h1").style.color = "#19142e";
    for (let i = 0; i < 3; i++) {
      list[i].style.background = "#dae3ef";
      list[i].querySelector("h2").style.color = "#19142e";
      list[i].querySelectorAll(".card").forEach((element) => {        
        element.style.background = "#ffffff"
      });
    }
  }
  if (innerValue === "Dark Mode") {
    document.body.style.background = "#19142e";
    themeValue.innerText = "Light Mode";
    document.querySelector("h1").style.color = "#ffffff";
    for (let i = 0; i < 3; i++) {
      list[i].style.background = "#393e46";
      list[i].querySelector("h2").style.color = "#ffffff";
      list[i].querySelectorAll(".card").forEach((element) => {
        element.style.background = "#e1d89f";
      });
      
  }
}
}

function addTask(colId) {
  const input = document.getElementById(colId + "-input");
  const taskText = input.value.trim();
  if (taskText === "") {
    return;
  }
  const taskDate = new Date().toLocaleString();
  const taskElement = createTaskElement(taskText, taskDate);
  document.getElementById(colId + "-tasks").appendChild(taskElement);
  input.value = "";
  updateTasksCount(colId);
  saveTaskstoLocalStorage(colId, taskText, taskDate);
}
function createTaskElement(taskText, taskDate) {
  const taskElement = document.createElement("div");
  taskElement.innerHTML = `<span>${taskText}</span><br><small class="time">${taskDate}</small>`;
  taskElement.classList.add("card");
  //   taskElement.setAttribute("draggable",true);
  taskElement.draggable = true;
  taskElement.addEventListener("dragstart", dragStart);
  taskElement.addEventListener("dragend", dragEnd);
  taskElement.addEventListener("contextmenu", function (event) {
    event.preventDefault();
    rightClickedCard = this;
    showContextMenu(event.pageX, event.pageY); //cursor ke x &y
  });
  return taskElement;
}
function dragStart() {
  this.classList.add("dragging"); // this is dragging element
}
function dragEnd() {
  this.classList.remove("dragging");
  ["todo", "doing", "done"].forEach((columnId) => {
    updateTasksCount(columnId);
    updateLocalStorage();
  });
}

const columns = document.querySelectorAll(".tasks");
columns.forEach((column) => {
  column.addEventListener("dragover", dragOver);
});

function dragOver(event) {
  event.preventDefault(); //html ka default static nature hata rha hai
  const draggedCard = document.querySelector(".dragging");
  this.appendChild(draggedCard);
  const afterElement = getDragAfterElement(this, event.pageY);
  if (afterElement === null) {
    this.appendChild(draggedCard);
  } else {
    this.insertBefore(draggedCard, afterElement);
  }
}
function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".card:not(.dragging)"),
  ];
  const result = draggableElements.reduce(
    //aray ke elemets reduce krke ek pas krata hai
    (closestElementUnderMouse, currentTask) => {
      const box = currentTask.getBoundingClientRect();
      const offset = y - (box.top + box.height / 2); //pointer se content ke mid tk ka distance
      if (offset < 0 && offset > closestElementUnderMouse.offset) {
        return { offset: offset, element: currentTask };
      } else {
        return closestElementUnderMouse;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  );
  return result.element;
}

//context menu event gets fired on right click
const contextmenu = document.querySelector(".context-menu");
function showContextMenu(x, y) {
  contextmenu.style.left = `${x}px`;
  contextmenu.style.top = `${y}px`;
  contextmenu.style.display = "block";
}
document.addEventListener("click", () => {
  contextmenu.style.display = "none";
});

function editTask() {
  if (rightClickedCard !== null) {
    const textValue = rightClickedCard.querySelector("span").textContent;
    const newTaskText = prompt("Edit task - ", textValue);
    if (newTaskText !== "") {
      rightClickedCard.querySelector("span").textContent = newTaskText;
      updateLocalStorage();
    }
  }
}
function deleteTask() {
  if (rightClickedCard !== null) {
    const colId = rightClickedCard.parentElement.id.replace("-tasks", "");
    rightClickedCard.remove();
    updateTasksCount(colId);
    updateLocalStorage();
  }
}

function updateTasksCount(columnId) {
  const count = document.querySelectorAll(`#${columnId}-tasks .card`).length;
  document.getElementById(`${columnId}-count`).textContent = count;
}

function saveTaskstoLocalStorage(colId, taskText, taskDate) {
  const tasks = JSON.parse(localStorage.getItem(colId)) || [];
  tasks.push({ text: taskText, date: taskDate });
  localStorage.setItem(colId, JSON.stringify(tasks));
}
function loadTasksfromLocalStorage() {
  ["todo", "doing", "done"].forEach((columnId) => {
    const tasks = JSON.parse(localStorage.getItem(columnId)) || [];
    tasks.forEach(({ text, date }) => {
      const taskElement = createTaskElement(text, date);
      document.getElementById(`${columnId}-tasks`).appendChild(taskElement);
    });
    updateTasksCount(columnId);
  });
}
function updateLocalStorage() {
  ["todo", "doing", "done"].forEach((columnId) => {
    const tasks = [];
    document.querySelectorAll(`#${columnId}-tasks .card`).forEach((card) => {
      const taskText = card.querySelector("span").textContent;
      const taskDate = card.querySelector("small").textContent;
      tasks.push({ text: taskText, date: taskDate });
    });
    localStorage.setItem(columnId, JSON.stringify(tasks));
  });
}
