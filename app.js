var taskInput = document.getElementById('taskInput'),
    taskList = document.getElementById('taskList');

function addTask() {
    if (!taskInput.value) return alert('Please enter a task.');

    var li = createLi(taskInput.value);
    taskList.prepend(li);
    taskInput.value = '';
}

function createLi(title) {
    var li = document.createElement('li'),
        span = document.createElement('span');

    span.textContent = title;
    li.className = 'task';
    li.appendChild(span);

    return li;
}