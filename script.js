document.addEventListener('DOMContentLoaded', loadTask);

function loadTask() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskToDOM(task));
}

function addTask() {
    let textInput = document.getElementById('taskInput');
    let taskText = textInput.value.trim();

    if (!taskText) {
        alert("Task cannot be empty!");
        return;
    }

    addTaskToDOM(taskText);

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    textInput.value = "";
}

function addTaskToDOM(taskText) {
    let ul = document.getElementById('taskList');
    let li = document.createElement('li');
    li.innerHTML = `
        <span>${taskText}</span>
        <span>
            <span class="edit" onclick="editTask(this)">Edit</span>
            <span class="delete" onclick="deleteTask(this)">Delete</span>
        </span>
    `;
    ul.appendChild(li);
}

function deleteTask(element) {
    let li = element.parentElement.parentElement;
    let taskText = li.firstElementChild.innerText;

    li.remove();

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function editTask(element) {
    let li = element.parentElement.parentElement;
    let oldTaskText = li.firstElementChild.innerText;

    let newTaskText = prompt("Edit your task:", oldTaskText);
    if (newTaskText === null || newTaskText.trim() === "") {
        alert("Task update canceled or empty.");
        return;
    }

    li.firstElementChild.innerText = newTaskText;

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    let taskIndex = tasks.indexOf(oldTaskText);
    if (taskIndex > -1) {
        tasks[taskIndex] = newTaskText;
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
