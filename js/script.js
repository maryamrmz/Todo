const form = document.querySelector(".add-tasks");
const taskInput = document.getElementById("task");
const taskList = document.querySelector(".collection");

// Event Listener
loadEventListeners();

// load all event listeners
function loadEventListeners() {
    // Add task event
    form.addEventListener("submit", addTask);
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

        // Append li to ul
        taskList.appendChild(li);

        // Clear input
        taskInput.value = "";
    }

    e.preventDefault();
}
