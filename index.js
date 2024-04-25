const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list');
const clearButton = document.getElementById('clear')
const mainContainer = document.getElementById('main')
const filter = document.getElementById('filter')


// Event Listeners
itemForm.addEventListener('submit', addNewItem );
itemList.addEventListener('click', removeItem);
clearButton.addEventListener('click', clearItems)
mainContainer.addEventListener('click', checkUI)
filter.addEventListener('input', filterItems)

let itemsFromStorage = [];

document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    }
    else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'))
        itemsFromStorage.forEach( item => {
            console.log('l')
            addItemToDOM(item)
        })
    }
    checkUI()
   

})


// add item to list
function addNewItem(event) {
    event.preventDefault();

    const newItem = itemInput.value

    if (newItem === '') {
        alert('please add an item');
        return;
    }

    if (checkItemExists(newItem)) {
        alert ('That item already exists')
        return;
    }

    addItemToDOM(newItem)
    addItemToStorage(newItem)

    itemInput.value = ''
    checkUI()
}

function createItem(classes) {
    const button = document.createElement('button')
    button.className = classes;

    const icon = document.createElement('i')
    icon.className = 'fa-solid fa-xmark'

    button.appendChild(icon);
    return button;
}

function addItemToStorage(item) {
    itemsFromStorage.push(item);
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function addItemToDOM(item) {
    const li = document.createElement('li')
    li.innerText = item;
    li.addEventListener('click', editItem);
   
    const button = createItem('remove-item btn-link text-red')
    li.appendChild(button)

    itemList.appendChild(li)
}

function editItem(){

}


// remove item for list
function removeItem(event) {
    const clickedElement = event.target 
    if ( clickedElement.classList.contains('remove-item')){
        clickedElement.parentElement.remove()
        removeItemFromStorage(clickedElement.parentElement.innerText)
    }
    else if (clickedElement.parentElement.classList.contains('remove-item')){
        clickedElement.parentElement.parentElement.remove()
        removeItemFromStorage(clickedElement.parentElement.parentElement.innerText)
    }
}

// clear items from list
function clearItems() {
    if(confirm('are you sure')){
       [...itemList.children].forEach(li => {
            li.remove()
            removeItemFromStorage(li.innerText)
        })  
      
    }
     
}

function removeItemFromStorage(item){
    itemsFromStorage.splice(itemsFromStorage.indexOf(item), 1)
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}




// keep track of UI
function checkUI(){
    const items = document.querySelectorAll('li')
    if (items.length === 0) {
        clearButton.style.display = 'none'
    }
    else {
        clearButton.style.display = 'block'
    }
}

// filtering logic
function filterItems(event) {
    const items = [...document.querySelectorAll('li')] 
    items.forEach( item => {
        if(item.innerText.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1) {
            item.style.display = 'flex'
        }
        else {
            item.style.display = 'none'
        }
    })
}

function checkItemExists(item) {
    return itemsFromStorage.includes(item.toLowerCase())
}