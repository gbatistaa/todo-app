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
const deleteButtons = document.getElementsByClassName('delete-button');

// Auxiliar funtion to add classes in elements:

const addClass = (className) => (element) => {
    element.classList.add(className);
}

const removeClass = (className) => (element) => {
    element.classList.remove(className);
}

// Auxiliar function to transform an HTMLCollection in an array:

const arrayMaker = (collection) => {
    let array = [];
    for (let i = 0; i < collection.length; i++) {
        if (collection[i].id !== 'template') {
            array.push(collection[i]);
        }
    }
    return array;
}

// Funtion to add a new item on the list with pre-settings: 

const addTodo = () => {
    const userTodoName = userInput.value;
    const newTodo = templateItem.cloneNode(true);
    const checkBox = newTodo.children[0].children[0];
    checkBox.checked = false;
    checkBox.addEventListener('click', function () {
        manyLeft(visibleItems);
    })
    if (userTodoName !== '') {
        newTodo.children[1].value = userTodoName;
        todoMaker.children[1].value = ''
    } else {
        newTodo.children[1].value = 'Untitled';
    }
    newTodo.id = '';
    todoList.appendChild(newTodo);
    showAll();

    return newTodo;
}

// New function to calculate how many todos are still left:

const manyLeft = function (collection) {
    let howMany = 0;
    const list = arrayMaker(collection);
    for (const item of list) {
        try {
            if (item.classList.contains('list-item')) {
                const check = item.children[0].children[0];
                if (check.checked === false && item.id !== 'template') howMany++;
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    itemsLeft.innerHTML = howMany.toString();
};
manyLeft(listItems);

// Variables that stores each filter button element:

const all = filters[0];
const active = filters[1];
const completed = filters[2];

// Function to change estilization of the list management if there is or not elements on the list:

let visibleItems = [];

const hasVisibleItems = () => {
    if (visibleItems.length > 0) {
        listManagement.className = 'main-item';
        for (const item of visibleItems) removeClass('on-top')(item);
        addClass('on-top')(visibleItems[0]);
    } else listManagement.className = 'main-item no-items';
    
}
// Function to show again all of the todos:

const showAll = () => {
    
    visibleItems = [];

    for (let i = 0; i < listItems.length; i++) {
        const item = listItems[i];
        if (item.id !== 'template') {
            removeClass('no-display')(item);
            visibleItems.push(item);
        }
    };
    
    hasVisibleItems();
    manyLeft(visibleItems);

};

// Function to display only the todos that are still not done:

const showActive = () => {

    visibleItems = [];

    for (let i = 0; i < listItems.length; i++) {
        const item = listItems[i];
        const checkbox = item.children[0].children[0];
        if (item.id !== 'template') {           
            if (item.nodeType === 1 && checkbox.checked === false) {
                removeClass('no-display')(item);
                visibleItems.push(item);
            } else {
                addClass('no-display')(item);
            }
        }
    }

    hasVisibleItems();
    manyLeft(visibleItems);

  };

// Function to display only the todos that are already done:

const showCompleted = () => {

    visibleItems = [];

    for (let i = 0; i < listItems.length; i++) {
        const item = listItems[i];
        const checkbox = item.children[0].children[0];
        if (item.id !== 'template') {
            if (item.nodeType === 1 && checkbox.checked === false) {
                addClass('no-display')(item);
            } else {
                removeClass('no-display')(item);
                visibleItems.push(item);
            };
        }
    };

    hasVisibleItems();
    manyLeft(visibleItems);

};

// Function to delete the completed list items:

const clearCompleted = () => {

    visibleItems = [];

    const list = arrayMaker(listItems);
    for (const item of list) {
        const checkbox = item.children[0].children[0];
        if (checkbox.checked) item.remove();
        else if (item.classList.contains('no-display') === false) {
            visibleItems.push(item);
        }
    }

    hasVisibleItems();
    manyLeft(visibleItems);

}

// The addition of events in HTML elements:

all.addEventListener('click', showAll);
active.addEventListener('click', showActive);
completed.addEventListener('click', showCompleted);
clearDone.addEventListener('click', clearCompleted);

createTodo.addEventListener('click', (ev) => {
    const createdNode = addTodo();
    const deleteButton = createdNode.children[2];
    manyLeft(visibleItems);
    deleteButton.addEventListener('click', function() {

        visibleItems = [];
        const list = arrayMaker(listItems);

        for (const item of list) {
            if (!this.parentElement.isSameNode(item)) visibleItems.push(item);
        }

        manyLeft(visibleItems);
        hasVisibleItems();
        this.parentElement.remove();
    });
});

window.addEventListener('keyup', (ev) => {
    if (ev.key === 'Enter') {
        const createdNode = addTodo();
        const deleteButton = createdNode.children[2];
        manyLeft(visibleItems);
        deleteButton.addEventListener('click', function() {

            visibleItems = [];
            const list = arrayMaker(listItems);

            for (const item of list) {
                if (!this.parentElement.isSameNode(item)) visibleItems.push(item);
            }

            manyLeft(visibleItems);
            hasVisibleItems();
            this.parentElement.remove();
        });
    }
});
