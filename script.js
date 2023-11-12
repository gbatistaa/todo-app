// Acessing the HTML elements with the DOM: 

const theme = document.getElementById('theme-icon');
const todoMaker = document.getElementById('div-aux');
const choreNames = document.getElementsByClassName('chore-name');
const createTodo = document.getElementById('create-button');
const todoList = document.getElementById('todo-list');
const listItems = document.getElementsByClassName('list-item');
const templateItem = document.getElementById('template');
const itemsLeft = document.getElementById('number-left');
const filters = document.getElementsByClassName('list-filter');
const clearDone = document.getElementById('clear-done');

// Auxiliar funtion to add classes in elements:

const addClass = (className) => (element) => {
    element.classList.add(className);
}

// Funtion to add a new item on the list: 

const addTodo = () => {
    const userTodoName = todoMaker.children[1].value;
    const newTodo = templateItem.cloneNode(true);
    if (userTodoName !== '') {
        newTodo.children[1].value = userTodoName;
        todoMaker.children[1].value = ''
    } else {
        newTodo.children[1].value = 'Untitled';
    }
    newTodo.id = '';
    todoList.appendChild(newTodo);
}

createTodo.addEventListener('click', addTodo);