function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
  
    // Get the task value from the input field
    const taskValue = taskInput.value.trim();
  
    // Check if the task is not empty
    if (taskValue !== '') {
      // Create a new list item
      const li = document.createElement('li');
      li.textContent = taskValue;
  
      // Create a delete button
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.onclick = function() {
        taskList.removeChild(li);
      };
  
      // Append the delete button to the list item
      li.appendChild(deleteButton);
  
      // Append the list item to the task list
      taskList.appendChild(li);
  
      // Clear the input field
      taskInput.value = '';
    } else {
      alert('Please enter a task.');
    }
  }
  