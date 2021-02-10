const addInput = document.querySelector('.add-input');
const searchInput = document.querySelector('.search-input');
const addBtn = document.querySelector('.add');
const searchBtn = document.querySelector('.search');
const listContainer = document.querySelector('.list-container');
const clearAll = document.querySelector('.clear-all')
const listItems = document.getElementsByClassName('task');
const tasks = document.querySelector('.active-tasks');
let toDoList = [];
let editCheck = true;
let searchCheck = true;

const renderList = () => {
    listContainer.textContent = "";
    toDoList.forEach((toDoElement, key) => {
        toDoElement.dataset.key = key;
        listContainer.appendChild(toDoElement);
    });
}

const editTask = (edit, spn, editInput) => {
    editInput.classList.toggle("show");
    spn.classList.toggle("hide");
    if (editCheck) {
        editCheck = !editCheck;
        edit.innerHTML = `<i class="fas fa-check"></i>`;
        edit.style.color = "#85c967";
    } else {
        editCheck = !editCheck;
        edit.innerHTML = `<i class="far fa-edit"></i>`;
        edit.style.color = "gray";
        const newInputValue = editInput.value;

        if (newInputValue.length > 38) {
            alert("add text not longer than 38 chars.");
            editInput.value = '';
            return;
        }

        spn.textContent = newInputValue;
    }
}

const removeTask = (e) => {
    e.target.parentNode.remove();
    const index = e.target.parentNode.dataset.key;
    tasks.textContent = `number of tasks : ${listItems.length}`;
    toDoList.splice(index, 1);
    renderList();
}

const completedTask = (text) => {
    text.classList.toggle('complete');
}

const createListElement = (addInputValue) => {
    const task = document.createElement('div');
    task.className = "task";
    listContainer.appendChild(task);

    const isComplete = document.createElement('INPUT');
    isComplete.type = "checkbox";
    isComplete.className = "check";
    task.appendChild(isComplete);
    task.querySelector('.check').addEventListener('click', () => {
        completedTask(text);
    });

    const text = document.createElement('div');
    text.className = "text";
    task.appendChild(text);

    const spn = document.createElement('span');
    spn.className = "task-value";
    spn.textContent = addInputValue;
    text.appendChild(spn);

    const editInput = document.createElement('INPUT');
    editInput.placeholder = "...";
    editInput.className = "edit-input";
    text.appendChild(editInput);

    const edit = document.createElement('div');
    edit.innerHTML = `<i class="far fa-edit"></i>`
    edit.className = "edit";
    task.appendChild(edit);
    task.querySelector('.edit').addEventListener('click', () => {
        editTask(edit, spn, editInput);
    });

    const remove = document.createElement('div');
    remove.textContent = "X";
    remove.className = "delete";
    task.appendChild(remove);
    task.querySelector('.delete').addEventListener('click', removeTask);

    toDoList.push(task);
}

const searchTask = (e) => {
    searchInput.addEventListener('input', (e) => {
        const searchText = e.target.value.toLowerCase();
        const callBack = toDoList.filter(task => task.textContent.toLowerCase().includes(searchText));
        listContainer.textContent = "";
        callBack.forEach(element => {
            listContainer.appendChild(element);
        });
        tasks.textContent = `found tasks : ${listItems.length}`;
    })
}

const addTask = (e) => {

    const addInputValue = addInput.value;
    if (addInputValue === "") {
        alert("add something to the list first!");
        return;
    }
    if (addInputValue.length > 38) {
        alert("add text not longer than 38 chars.");
        addInput.value = '';
        return;
    }
    createListElement(addInputValue);
    renderList();
    tasks.textContent = `number of tasks : ${listItems.length}`;
    addInput.value = "";
}

const runFuncions = function () {
    addBtn.addEventListener('click', addTask);

    const enter = (e) => {
        if (e.keyCode === 13) {
            addTask();
        }
    }
    window.addEventListener('keydown', enter)

    searchBtn.addEventListener('click', () => {

        if (searchCheck) {
            searchCheck = !searchCheck;
            searchInput.classList.add('show');
            searchBtn.classList.add('search-on');
            addInput.classList.add('hide');
            searchTask();
        } else {
            if (searchInput.value != "") {
                alert("clear input first!");
                return;
            }
            searchCheck = !searchCheck;
            searchInput.classList.remove('show');
            addInput.classList.remove('hide');
            searchBtn.classList.remove('search-on');
        }
        tasks.textContent = `number of tasks : ${listItems.length}`;
    })

    clearAll.addEventListener('click', () => {
        listContainer.textContent = "";
        toDoList = [];
        renderList();
        tasks.textContent = `number of tasks : ${listItems.length}`;
    })

}
runFuncions();