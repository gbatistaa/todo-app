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
const listManagement = document.getElementById('list-management');
const itemsLeft = document.getElementById('number-left');
const filters = document.getElementsByClassName('list-filter');
const clearDone = document.getElementById('clear-done');

// Auxiliar funtion to add classes in elements:

const addClass = (className) => (element) => {
    element.classList.add(className);
}

const removeClass = (className) => (element) => {
    element.classList.remove(className);
}

// Funtion to add a new item on the list: 

const addTodo = () => {
    const userTodoName = userInput.value;
    const newTodo = templateItem.cloneNode(true);
    const checkBox = newTodo.children[0].children[0];
    checkBox.checked = false;
    checkBox.addEventListener('click', manyLeft)
    if (userTodoName !== '') {
        newTodo.children[1].value = userTodoName;
        todoMaker.children[1].value = ''
    } else {
        newTodo.children[1].value = 'Untitled';
    }
    removeClass('no-items')(listManagement);
    addClass('with-items')(listManagement);
    newTodo.id = '';
    todoList.appendChild(newTodo);
}

// New function to calculate how many todos are still left:

const manyLeft = () => {
    let howMany = 0;
    for (const item of listItems) {
        try {
            if (item.classList.contains('list-item')) {
                try {
                    const check = item.children[0].children[0];
                    if (check.checked === false && item.id !== 'template') {
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
manyLeft();

// Variables that stores each filter button element:

const all = filters[0];
const active = filters[1];
const completed = filters[2];

// Function to show again all of the todos:

const showAll = () => {
    for (let i = 0; i < listItems.length; i++) {
        const item = listItems[i];
        removeClass('no-display')(item);
    };
};

// Funtion to display only the todos that are still not done:

const showActive = () => {
    for (let i = 0; i < listItems.length; i++) {
        const item = listItems[i];
        const checkbox = item.children[0].children[0];
        if (item.nodeType === 1 && checkbox.checked) {
            addClass('no-display')(item);
        } else {
            removeClass('no-display')(item);
        };
    };
};

// Funtion to display only the todos that are already done:

const showCompleted = () => {
    for (let i = 0; i < listItems.length; i++) {
        const item = listItems[i];
        const checkbox = item.children[0].children[0];
        if (item.nodeType === 1 && checkbox.checked === false) {
            addClass('no-display')(item);
        } else {
            removeClass('no-display')(item);
        };
    };
}

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