"use strict";

const state = {
    todos: [],
};

const parentElement = document.getElementById("toDoListApp");
const taskInput = document.getElementById("taskInput");
const deleteBtn = `<button id="taskDelete"><svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g stroke-width="0"></g><g stroke-linecap="round" stroke-linejoin="round"></g><g><path fill="#000000" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"></path></g></svg></button>`;

// Save items to the localStorage
const saveTasks = function (todos) {
    localStorage.setItem("wpbean-task-list", JSON.stringify(todos));
};

// Get saved items from the localStorage
const getSavedTasks = function () {
    const items = localStorage.getItem("wpbean-task-list");
    if (!items) return;
    return JSON.parse(localStorage.getItem("wpbean-task-list"));
};

console.log(getSavedTasks());

// get clicked list item index
const getClickedIndex = function (element) {
    const listItems = Array.from(
        parentElement.querySelectorAll("#taskList .task-item")
    );
    return listItems.findIndex((item) => item === element);
};

// update ui
const updateUi = function (items) {
    const taskList = parentElement.querySelector("#taskList");
    taskList.innerHTML = "";
    if (!items || items.length === 0) return;

    items.forEach((item, i) => {
        const list = document.createElement("li");
        list.textContent = item.name;
        list.classList = `task-item ${item.status}`;
        list.insertAdjacentHTML("beforeend", deleteBtn);
        taskList.appendChild(list);
    });
};

// Show the list on page load
window.addEventListener("load", function (e) {
    state.todos = getSavedTasks() || [];
    updateUi(state.todos);
});

// Add new task
parentElement.addEventListener("click", function (e) {
    e.preventDefault();
    if (e.target.id !== "addTaskButton") return;

    const task = taskInput.value.trim();
    if (!task) return;

    state.todos.push({ name: task, status: "" });
    saveTasks(state.todos);
    updateUi(state.todos);
    taskInput.value = "";
});

// Update the task status
parentElement.addEventListener("click", function (e) {
    if (!e.target.classList.contains("task-item")) return;

    const index = getClickedIndex(e.target);

    if (state.todos?.[index]) {
        state.todos[index].status =
            state.todos[index].status !== "completed" ? "completed" : "";
        saveTasks(state.todos);
        updateUi(state.todos);
    }
});

// Delete a task
parentElement.addEventListener("click", function (e) {
    const deleteBtn = e.target.closest("#taskDelete");
    if (!deleteBtn) return;

    const listItem = deleteBtn.closest(".task-item");
    const index = getClickedIndex(listItem);

    if (index > -1) {
        state.todos.splice(index, 1);
        saveTasks(state.todos);
        updateUi(state.todos);
    }
});
