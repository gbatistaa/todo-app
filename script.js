// Acessing the HTML elements with the DOM: 

const theme = document.getElementById('theme-icon');
const todoMaker = document.getElementById('div-aux');
const userInput = document.getElementById('main-input');
const choreNames = document.getElementsByClassName('chore-name');
const createTodo = document.getElementById('create-button');
const todoList = document.getElementById('todo-list');
const listItems = document.getElementsByClassName('list-item');
const checkBoxes = document.getElementsByClassName('checkbox');
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
    const userTodoName = userInput.value;
    const newTodo = templateItem.cloneNode(true);
    const checkBox = newTodo.children[0].children[0];
    console.log(checkBox)
    if (userTodoName !== '') {
        newTodo.children[1].value = userTodoName;
        todoMaker.children[1].value = ''
    } else {
        newTodo.children[1].value = 'Untitled';
    }
    newTodo.id = '';
    todoList.appendChild(newTodo);
}

// New function to 

const manyLeft = () => {
    let howMany = 0;
    for (const item of listItems) {
        try {
            if (item.classList.contains('list-item')) {
                try {
                    const check = item.children[0].children[0];
                    if (check.checked === false) {
                        howMany++;
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
    itemsLeft.innerHTML = howMany.toString();
};

manyLeft()

const filteredAddEvent = (element) => {
    if (element.nodeType === 1 && element.classList.contains('not-functional') === false) {
        element.addEventListener('click', manyLeft)
    }
}

createTodo.addEventListener('click', (ev) => {
    addTodo();
    manyLeft();
});

window.addEventListener('keyup', (ev) => {
    if (ev.key === 'Enter') {
        addTodo();
        manyLeft();
    }
})