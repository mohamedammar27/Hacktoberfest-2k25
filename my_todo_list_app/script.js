document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addButton = document.getElementById('add-button');
    const todoList = document.getElementById('todo-list');

    addButton.addEventListener('click', addTask);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    function addTask() {
        const taskText = todoInput.value.trim();
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${taskText}</span>
            <button>Delete</button>
        `;

        todoList.appendChild(listItem);
        todoInput.value = '';

        const deleteButton = listItem.querySelector('button');
        deleteButton.addEventListener('click', () => {
            todoList.removeChild(listItem);
        });

        listItem.querySelector('span').addEventListener('click', () => {
            listItem.classList.toggle('completed');
        });
    }
});