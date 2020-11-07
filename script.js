// Define UI elements
productList = document.querySelector('ol')
cartList = document.querySelector('ul');


// Event listener
productList.addEventListener('click', addItem);
cartList.addEventListener('click', removeItem);
document.addEventListener('DOMContentLoaded', getTasks);

// Functions
// Add items to the cart
function addItem(e) {
    if(e.target.hasAttribute('id')){
        // Creating a link to remove
        let link = document.createElement('a');
        link.href = "#";
        link.innerHTML = "x"
        // Creating a list element
        let list = document.createElement('li');
        text = e.target.parentElement.textContent;
        list.innerHTML = text + " ";
        list.appendChild(link);
        cartList.appendChild(list);
        // console.log(text);
        // Storing in local storage
        storeTaskInLocalStorage(text);

        text = '';


    }
    
    e.preventDefault();
}

// Remove items from the cart
function removeItem(e) {
    if (e.target.hasAttribute('href')) {
        let ele = e.target.parentElement;
        // console.log(ele)
        ele.remove();
        // Removing from local 
        removeFromLS(ele);
    }
    
}

// Store in local storage
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null ) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null ) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(task => {
        let link = document.createElement('a');
        link.href = "#";
        link.innerHTML = "x"
        // Creating a list element
        let list = document.createElement('li');
        list.innerHTML = task + " ";
        list.appendChild(link);
        cartList.appendChild(list);
    });
}

function removeFromLS(cartItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null ) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    let li = cartItem;
    li.removeChild(li.lastChild);
    // console.log(li.textContent.trim().length)
    tasks.forEach((task, index) => {
        // console.log(task.trim().length, index);
        if(li.textContent.trim() === task.trim()) {
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}