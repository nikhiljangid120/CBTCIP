const newTask = document.querySelector("#taskInput");
const addButton = document.querySelector(".btn");
const taskList = document.querySelector("#taskList");
const completedTaskList = document.querySelector("#completedTaskList");

// Function to add a new task
function addTask() {
    const taskText = newTask.value.trim();
    if (taskText !== '') {
        // Check if the task already exists
        const existingTasks = Array.from(taskList.querySelectorAll('li span'));
        if (existingTasks.some(task => task.textContent === taskText)) {
            alert("Task already exists!");
            return;
        }

        const listItem = document.createElement('li');
        const taskSpan = document.createElement('span');
        taskSpan.textContent = taskText;
        listItem.appendChild(taskSpan);

        // Create delete, edit, and tick buttons
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';

        deleteButton.classList.add('delete-btn');
        // Here classList.add is adding a class to the buttons
        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fas fa-edit"></i>';
        editButton.classList.add('edit-btn');

        const tickButton = document.createElement('button');
        tickButton.innerHTML = '<i class="fas fa-check"></i>';
        tickButton.classList.add('tick-btn');

        // Append buttons to the list item
        listItem.appendChild(deleteButton);
        listItem.appendChild(editButton);
        listItem.appendChild(tickButton);

        taskList.appendChild(listItem);
        newTask.value = '';
    } else {
        alert("Please don't leave it blank.");
    }
}

// Function to mark a task as completed
function completeTask(event) {
    const listItem = event.target.parentNode;
    const taskText = listItem.querySelector('span').textContent;

    // Create completed task item
    const completedListItem = document.createElement('li');
    completedListItem.textContent = taskText;

    // Create delete button for completed task
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
    deleteButton.classList.add('delete-btn');

    // Append delete button to the completed task list item
    completedListItem.appendChild(deleteButton);

    // Append completed task item to the completed task list
    completedTaskList.appendChild(completedListItem);

    // Remove task from the task list
    listItem.remove();
}

// Event listener for delete buttons in the completed task list
completedTaskList.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-btn')) {
        event.target.parentNode.remove();
    }
});

// Event listener for adding a task with debounce
let debounceTimeout;
addButton.addEventListener('click', function() {
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(addTask, 300);
});

// Function to delete a task
function deleteTask(event) {
    const listItem = event.target.parentNode;
    listItem.remove();
}

// Function to edit a task
function editTask(event) {
    const listItem = event.target.parentNode;
    const taskText = listItem.querySelector('span').textContent;
    const newText = prompt('Edit Task:', taskText);
    if (newText !== null && newText.trim() !== '') {
        listItem.querySelector('span').textContent = newText.trim();
    }
}

// Delegate event handling to the task list for edit, delete, and tick buttons
taskList.addEventListener('click', function(event) {
    const target = event.target;
    if (target.classList.contains('delete-btn')) {
        deleteTask(event);
    } else if (target.classList.contains('edit-btn')) {
        editTask(event);
    } else if (target.classList.contains('tick-btn')) {
        completeTask(event);
    }
});