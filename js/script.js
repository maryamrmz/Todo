const form = document.querySelector(".add-tasks");
const taskInput = document.getElementById("task");
const clearBtn = document.querySelector(".clear-tasks");
const taskList = document.querySelector(".collection");
const filter = document.querySelector("#filter");

// Event Listener
loadEventListeners();

// load all event listeners
function loadEventListeners() {
    // DOM Load event
    document.addEventListener("DOMContentLoaded", getTasks);

    // Add task event
    form.addEventListener("submit", addTask);

    // Remove task event
    taskList.addEventListener("click", removeTask);

    // Clear task event
    clearBtn.addEventListener("click", clearTasks);

    // Filter tasks event
    filter.addEventListener("keyup", filterTasks);
}

// Get Tasks from LS
function getTasks() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task) {
        // Create li element
        const li = document.createElement("li");
        // Add class
        li.className = "collection-list";
        // Create span
        const span = document.createElement("span");
        // Create text node and append to span
        span.appendChild(document.createTextNode(task));
        // Append the span to li
        li.appendChild(span);
        // Create div
        const div = document.createElement("div");
        // Add class
        div.className = "a";
        // Append div to li
        li.appendChild(div);
        // Create new delete Link element
        const deleteLink = document.createElement("a");
        // Add class
        deleteLink.className = "delete-item";
        // Add icon html
        deleteLink.innerHTML =
            '<i class="fa fa-remove fa-fw" title="Delete"></i>';
        // Append delete link to div
        div.appendChild(deleteLink);

        // Append li to ul
        taskList.appendChild(li);
    });
}

// Add Task
function addTask(e) {
    if (taskInput.value === "") {
        alert("Add a task");
    } else {
        // Create li element
        const li = document.createElement("li");
        // Add class
        li.className = "collection-list";
        // Create span
        const span = document.createElement("span");
        // Create text node and append to span
        span.appendChild(document.createTextNode(taskInput.value));
        // Append the span to li
        li.appendChild(span);
        // Create div
        const div = document.createElement("div");
        // Add class
        div.className = "a";
        // Append div to li
        li.appendChild(div);
        // Create new delete Link element
        const deleteLink = document.createElement("a");
        // Add class
        deleteLink.className = "delete-item";
        // Add icon html
        deleteLink.innerHTML =
            '<i class="fa fa-remove fa-fw" title="Delete"></i>';
        // Append delete link to div
        div.appendChild(deleteLink);

        // Append li to ul
        taskList.appendChild(li);

        // Store in LS
        storeTaskInLocalStorage(taskInput.value);

        // Clear input
        taskInput.value = "";
    }

    e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove Task
function removeTask(e) {
    if (e.target.parentElement.classList.contains("delete-item")) {
        if (confirm("Are You Sure?")) {
            e.target.parentElement.parentElement.parentElement.remove();

            // Remove from LS
            removeTaskFromLocalStorage(
                e.target.parentElement.parentElement.parentElement
            );
        }
    }
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task, index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear Tasks
function clearTasks() {
    if (confirm("Are You Sure?")) {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
    }

    // Clear from LS
    clearTasksFromLocalStorage();
}

// Clear from LS
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll(".collection-list").forEach(function(task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }
    });
}
