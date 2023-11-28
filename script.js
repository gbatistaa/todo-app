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
const filtersMobile = document.getElementsByClassName('filter-mobile');

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

// Function to change estilization of the list management if there is or not elements on the list:

let visibleItems = [];

const hasVisibleItems = () => {
    if (visibleItems.length > 0) {
        listManagement.className = 'main-item';
        for (const item of visibleItems) removeClass('on-top')(item);
        addClass('on-top')(visibleItems[0]);
    } else listManagement.className = 'main-item no-items';
    
}

// Funtion to add a new item on the list with pre-settings: 

let count = 0;

const addTodo = () => {
    const userTodoName = userInput.value;
    const newTodo = templateItem.cloneNode(true);
    const checkBox = newTodo.children[0].children[0];

    checkBox.checked = false;
    checkBox.addEventListener('click', function () {
        manyLeft(visibleItems);
    });

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

// Function that brings back the previous created items inside the Local Storage:

const restoreItems = () => {
    
    visibleItems = [];
    const properties = Object.keys(localStorage).sort((a, b) => a - b);
    
    for (let index = properties[0]; index < properties[properties.length - 1] + 1; index++) {
        if (localStorage[index] !== undefined) {
            const item = localStorage[index];
            const itemSettings = JSON.parse(item);
            const savedTodo = templateItem.cloneNode(true);
            const checkBox = savedTodo.children[0].children[0];
            
            savedTodo.id = '';
            checkBox.addEventListener('click', function () {
                manyLeft(visibleItems);
            });
            
            savedTodo.children[1].value = itemSettings.name;
            const deleteButton = savedTodo.children[2];
            
            //Function to remove the element of the todo list and the localStorage:
            
            deleteButton.addEventListener('click', function() {
                
                const propsUpdate = Object.keys(localStorage).sort((a, b) => a - b);

                visibleItems = [];
                const list = arrayMaker(listItems);
                
                const inputName = this.parentElement.children[1].value;

                // Operation to calculate how many items are gonna be visible, except the deleted one

                for (const item of list) {
                    const itemNameVector = item.children[1].value;
                    if ((inputName === itemNameVector) === false) {
                        visibleItems.push(item);
                    }
                }
                
                manyLeft(visibleItems);
                hasVisibleItems();
                this.parentElement.remove();
                
                // Operation to remove the todo item from the localStorage:
    
                const todoName = itemSettings.name;

                for (let index = propsUpdate[0]; index < propsUpdate[propsUpdate.length - 1] + 1; index++) {
                    try {
                        const elementString = localStorage[index];
                        const elementObject = JSON.parse(elementString);
                        
                        if (todoName === elementObject.name) {
                            localStorage.removeItem(index);
                            break
                        }
                    } catch (error){

                    }
                    
                }
                
            });
            todoList.appendChild(savedTodo);
            visibleItems.push(savedTodo);
        }
    }

    manyLeft(visibleItems);
    hasVisibleItems();
    
}

restoreItems();



// Variables that stores each filter button element:

const all = filters[0];
const active = filters[1];
const completed = filters[2];

const allMobile = filtersMobile[0];
const activeMobile = filtersMobile[1];
const completedMobile = filtersMobile[2];

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

//Click event function for creating elements: 

const creating = () => {
    const createdNode = addTodo();
    const input = createdNode.children[1];
    const checkBox = createdNode.children[0].children[0];
    const deleteButton = createdNode.children[2];
    manyLeft(visibleItems);
    const propsUpdate = Object.keys(localStorage).sort((a, b) => a - b);

    deleteButton.addEventListener('click', function() {
        

        visibleItems = [];
        const list = arrayMaker(listItems);
        
        for (const item of list) {
            if (!this.parentElement.isSameNode(createdNode)) visibleItems.push(item);
        }
        
        manyLeft(visibleItems);
        hasVisibleItems();
        this.parentElement.remove();
        
        // Operation to remove the todo item from the localStorage:

        const todoName = input.value;

        for (let index = propsUpdate[0]; index < propsUpdate[propsUpdate.length - 1] + 1; index++) {
            try {
                const elementString = localStorage[index];
                const elementObject = JSON.parse(elementString);
                
                //console.log(`${todoName} | ${elementObject.name}`)
                
                if (todoName === elementObject.name) {
                    localStorage.removeItem(index);
                    break
                }
            } catch (error){
                console.log(error)
            }
            
        }
    });

    // Saving new List Items in the Local Storage:

    localStorage.setItem(`${count}`, JSON.stringify({
        name: createdNode.children[1].value,
        checked: checkBox.checked
    }));

    count += 1;
}

// The addition of events in HTML elements:

all.addEventListener('click', showAll);
active.addEventListener('click', showActive);
completed.addEventListener('click', showCompleted);
clearDone.addEventListener('click', clearCompleted);

allMobile.addEventListener('click', showAll);
activeMobile.addEventListener('click', showActive);
completedMobile.addEventListener('click', showCompleted);

createTodo.addEventListener('click', creating);

window.addEventListener('keyup', (ev) => {
    if (ev.key === 'Enter') {
        creating();
    }
});
