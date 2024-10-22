document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskButton = document.getElementById('add-task-button');
    const taskList = document.getElementById('task-list');
    const filterButtons = document.querySelectorAll('.filter-button');
    let tasks = [];
    const addTask = () => {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        tasks.push(task);
        renderTasks(tasks);
        taskInput.value = '';
    };
    const editTask = (id) => {
        const newTaskText = prompt('Edit your task:');
        if (newTaskText === null || newTaskText.trim() === '') return;

        tasks = tasks.map(task => task.id === id ? {...task, text: newTaskText} : task);
        renderTasks(tasks);
    };
    const deleteTask = (id) => {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks(tasks);
    };
    const toggleTaskCompletion = (id) => {
        tasks = tasks.map(task => task.id === id ? {...task, completed: !task.completed} : task);
        renderTasks(tasks);
    };
    const filterTasks = (filter) => {
        let filteredTasks = [];
        if (filter === 'all') {
            filteredTasks = tasks;
        } else if (filter === 'completed') {
            filteredTasks = tasks.filter(task => task.completed);
        } else if (filter === 'pending') {
            filteredTasks = tasks.filter(task => !task.completed);
        }
        renderTasks(filteredTasks);
    };
    const renderTasks = (tasksToRender) => {
        taskList.innerHTML = '';
        tasksToRender.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
            const taskText = document.createElement('span');
            taskText.className = 'task-text';
            taskText.textContent = task.text;
            const taskButtons = document.createElement('div');
            taskButtons.className = 'task-buttons';
            const completeButton = document.createElement('button');
            completeButton.className = 'complete-button';
            completeButton.textContent = task.completed ? 'Undo' : 'Complete';
            completeButton.onclick = () => toggleTaskCompletion(task.id);
            const editButton = document.createElement('button');
            editButton.className = 'edit-button';
            editButton.textContent = 'Edit';
            editButton.onclick = () => editTask(task.id);
            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-button';
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = () => deleteTask(task.id);
            taskButtons.append(completeButton, editButton, deleteButton);
            taskItem.append(taskText, taskButtons);
            taskList.append(taskItem);
        });
    };
    addTaskButton.addEventListener('click', addTask);
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => filterTasks(e.target.dataset.filter));
    });
});
