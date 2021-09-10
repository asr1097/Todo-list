import { getObjectFromStorage,
     deleteProject, 
     addTodo, 
     getNewKey,
    addProject,
    deleteTodo,
    editTodo } from "./app";

import {format} from 'date-fns';

import Delete from './images/delete.jpg';
import Edit from './images/edit.jpg';
import Add from './images/add.png';
import Close from './images/close.png';

let activeProjectKey;

const createBase = () => {
    //Create basic divs
    let content = document.getElementById('content');
    let sideDivb = document.createElement('div');
    sideDivb.id = 'sideDiv';
    let mainDivb = document.createElement('div');
    mainDivb.id = 'mainDiv';
    

    //Set up newTodo div
    let newTodo = document.createElement('div');
    newTodo.classList.toggle('hidden');
    newTodo.id = 'newTodoDiv';
    newTodo.classList.add('newTodoDiv')
    let todoForm = document.createElement('form')
    todoForm.id = 'newTodoForm'
    todoForm.name = 'newTodoForm'
    let titleForm = document.createElement('input')
    titleForm.name = 'title'
    let titleLabel = document.createElement('label')
    titleLabel.for = 'title'
    titleLabel.textContent = 'Title'
    let descForm = document.createElement('input')
    descForm.name = 'description'
    let descLabel = document.createElement('label')
    descLabel.for = 'description'
    descLabel.textContent = 'Description'
    let dateForm = document.createElement('input')
    dateForm.type = 'datetime-local';
    dateForm.name = 'date'
    let dateLabel = document.createElement('label')
    dateLabel.for = 'date'
    dateLabel.textContent = 'Due date'
    let setPriority = document.createElement('input')
    setPriority.type = 'checkbox';
    setPriority.name = 'priority';
    let priorityLabel = document.createElement('label')
    priorityLabel.for = 'priority'
    priorityLabel.textContent = 'Priority'
    let newTodoBtnDiv = document.createElement('div')
    newTodoBtnDiv.classList.add('newTodoBtnsDiv');
    let addImg = document.createElement('img')
    addImg.src = Add;
    addImg.classList.add('addImg')
    let addTodoBtn = document.createElement('button')
    addTodoBtn.id = 'addTodoBtn'
    addTodoBtn.appendChild(addImg)
    let closeImg = document.createElement('img')
    closeImg.src = Close;
    closeImg.classList.add('closeImg')
    let closeTodoBtn = document.createElement('button')
    closeTodoBtn.id = 'closeTodoBtn'
    closeTodoBtn.appendChild(closeImg)
    newTodoBtnDiv.appendChild(addTodoBtn)
    newTodoBtnDiv.appendChild(closeTodoBtn)
    todoForm.appendChild(titleLabel)
    todoForm.appendChild(titleForm)
    todoForm.appendChild(descLabel)
    todoForm.appendChild(descForm)
    todoForm.appendChild(dateLabel)
    todoForm.appendChild(dateForm)
    todoForm.appendChild(priorityLabel)
    todoForm.appendChild(setPriority)
    todoForm.appendChild(newTodoBtnDiv)
    newTodo.appendChild(todoForm);

    //set up newProject div
    let newProj = document.createElement('div');
    newProj.classList.toggle('hidden')
    newProj.classList.add('newProjectDiv');
    let projectForm = document.createElement('form')
    projectForm.id = 'newProjectForm'
    projectForm.name = 'newProjectForm'
    let projTitleForm = document.createElement('input')
    projTitleForm.name = 'title'
    projTitleForm.id = 'projTitleForm'
    let projTitleLabel = document.createElement('label')
    projTitleLabel.for = 'title'
    projTitleLabel.textContent = 'Title'
    projTitleLabel.id = "projTitleLabel"

    let newProjBtnDiv = document.createElement('div')
    newProjBtnDiv.classList.add('newProjectBtnDiv')
    let addProjImg = document.createElement('img')
    addProjImg.src = Add;
    addProjImg.classList.add('addImg')
    let addProjBtn = document.createElement('button')
    addProjBtn.id = 'addProjBtn'
    addProjBtn.appendChild(addProjImg)
    let closeProjImg = document.createElement('img')
    closeProjImg.src = Close;
    closeProjImg.classList.add('closeImg')
    let closeProjBtn = document.createElement('button')
    closeProjBtn.id = 'closeProjBtn'
    closeProjBtn.appendChild(closeProjImg)
    newProjBtnDiv.appendChild(addProjBtn)
    newProjBtnDiv.appendChild(closeProjBtn)
    projectForm.appendChild(projTitleLabel)
    projectForm.appendChild(projTitleForm)
    projectForm.appendChild(newProjBtnDiv)
    newProj.appendChild(projectForm)
    
    //Set up editTodo div
    let editTodo = document.createElement('div');
    editTodo.classList.toggle('hidden');
    editTodo.id = 'editTodoDiv';
    editTodo.classList.add('editTodoDiv')
    let etodoForm = document.createElement('form')
    etodoForm.id = 'editTodoForm'
    etodoForm.name = 'editTodoForm'
    let etitleForm = document.createElement('input')
    etitleForm.name = 'title'
    let etitleLabel = document.createElement('label')
    etitleLabel.for = 'title'
    etitleLabel.textContent = 'Title'
    let edescForm = document.createElement('input')
    edescForm.name = 'description'
    let edescLabel = document.createElement('label')
    edescLabel.for = 'description'
    edescLabel.textContent = 'Description'
    let edateForm = document.createElement('input')
    edateForm.type = 'datetime-local';
    edateForm.id = 'editDateForm'
    edateForm.name = 'date'
    let edateLabel = document.createElement('label')
    edateLabel.for = 'date'
    edateLabel.textContent = 'Due date'
    let esetPriority = document.createElement('input')
    esetPriority.type = 'checkbox';
    esetPriority.name = 'priority';
    let epriorityLabel = document.createElement('label')
    epriorityLabel.for = 'priority'
    epriorityLabel.textContent = 'Priority'
    let editTodoBtnDiv = document.createElement('div')
    editTodoBtnDiv.classList.add('editTodoBtnDiv')
    let editTodoImg = document.createElement('img')
    editTodoImg.src = Edit;
    let editTodoBtn = document.createElement('button')
    editTodoBtn.id = 'editTodoBtn'
    editTodoBtn.appendChild(editTodoImg)
    let ecloseTodoImg = document.createElement('img')
    ecloseTodoImg.src = Close;
    let ecloseTodoBtn = document.createElement('button')
    ecloseTodoBtn.id = 'closeTodoBtn'
    ecloseTodoBtn.appendChild(ecloseTodoImg);
    editTodoBtnDiv.appendChild(editTodoBtn)
    editTodoBtnDiv.appendChild(ecloseTodoBtn)
    etodoForm.appendChild(etitleLabel)
    etodoForm.appendChild(etitleForm)
    etodoForm.appendChild(edescLabel)
    etodoForm.appendChild(edescForm)
    etodoForm.appendChild(edateLabel)
    etodoForm.appendChild(edateForm)
    etodoForm.appendChild(epriorityLabel)
    etodoForm.appendChild(esetPriority)
    etodoForm.appendChild(editTodoBtnDiv)
    editTodo.appendChild(etodoForm)

    //Set up startDiv
    let startDiv = document.createElement('div')
    startDiv.id = 'startDiv'
    startDiv.classList.add('hidden')
    let startP = document.createElement('p')
    startP.textContent = 'Select a project or create a new one';
    startP.id = 'startP';
    startDiv.appendChild(startP);


    mainDivb.appendChild(newTodo)
    mainDivb.appendChild(newProj)
    mainDivb.appendChild(editTodo)
    mainDivb.appendChild(startDiv);
    content.appendChild(sideDivb);
    content.appendChild(mainDivb);
    
    //Create base for sideDiv
    const sideDiv = document.getElementById('sideDiv');
    let p1 = document.createElement('p');
    p1.id = 'mainP';
    p1.textContent = 'Projects';

    let wrapperDiv = document.createElement('div');
    wrapperDiv.id = 'wrapperDiv';

    let addBtnDiv1 = document.createElement('div')
    addBtnDiv1.id = 'newProjectButtonDiv';
    let addProjBtnImg = document.createElement('img')
    addProjBtnImg.src = Add;
    addProjBtnImg.classList.add('addImgMain')
    let addBtn1 = document.createElement('button')
    addBtn1.id = 'newProject';
    addBtn1.appendChild(addProjBtnImg)
    addBtnDiv1.appendChild(addBtn1);

    sideDiv.appendChild(p1);
    sideDiv.appendChild(wrapperDiv);
    sideDiv.appendChild(addBtnDiv1);

    document.getElementById('newProject').addEventListener('click', showNewProjectForm);

    //Create base for mainDiv (table)
    const mainDiv = document.getElementById('mainDiv');
    let projectTitle = document.createElement('p');
    projectTitle.id = 'projectTitle';
    let tableDiv = document.createElement('div');
    tableDiv.id = 'tableDiv';
    let table = document.createElement('table');
    table.id = 'table';
    let thead = document.createElement('thead');
    thead.id = 'thead';
    let tbody = document.createElement('tbody');
    tbody.id = 'tbody';
    let tr = document.createElement('tr');
    let th1 = document.createElement('th');
    th1.textContent = 'Title';
    let th2 = document.createElement('th');
    th2.textContent = 'Description';
    let th3 = document.createElement('th');
    th3.textContent = 'Due date';
    let addTodoBtnImg = document.createElement('img')
    addTodoBtnImg.src = Add;
    addTodoBtnImg.classList.add('addImgMain')
    let addBtn = document.createElement('button');
    addBtn.id = 'newTodo';
    addBtn.appendChild(addTodoBtnImg)
    let addBtnDiv = document.createElement('div')
    addBtnDiv.classList.add('newTodoButtonDiv');
    addBtnDiv.appendChild(addBtn);
    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    thead.appendChild(tr);
    table.appendChild(thead);
    table.appendChild(tbody);
    tableDiv.appendChild(table);
    mainDiv.appendChild(projectTitle);
    mainDiv.appendChild(tableDiv);
    mainDiv.appendChild(addBtnDiv);

    document.getElementById('newTodo').addEventListener('click', showNewTodoForm);
};

const populateSideDiv = () => {
    clearSideDiv();
    let wrapperDiv = document.getElementById('wrapperDiv');

    for (let i = 0; i < localStorage.length; i++) {
        let index = localStorage.key(i)
        let obj = getObjectFromStorage(index);
        let p2 = document.createElement('p');
        p2.classList.add('titleP');
        p2.textContent = obj.title;
        p2.dataset.index = index;
        let projDiv = document.createElement('div');
        projDiv.dataset.project = index;
        projDiv.classList.add('projectDiv');
        let btnImg = document.createElement('img')
        btnImg.src = Delete;
        btnImg.dataset.projectindex = localStorage.key(i);
        let btn = document.createElement('button');
        btn.dataset.projectindex = localStorage.key(i);
        btn.classList.add('deleteProjectButton');
        btn.appendChild(btnImg)
        projDiv.appendChild(p2);
        projDiv.appendChild(btn);
        wrapperDiv.appendChild(projDiv);
    };

    if (activeProjectKey === undefined || activeProjectKey === null) {
        showStartDiv();
    }
   
    document.querySelectorAll('.titleP').forEach(title => title.addEventListener('click',
        populateMainDiv));

    document.querySelectorAll('.deleteProjectButton').forEach(proj => proj.addEventListener
        ('click', deleteProject));
};

const populateMainDiv = (ev) => {
    let projectIndex = ev.target.dataset.index;
    let previousActiveProj = activeProjectKey;
    activeProjectKey = projectIndex;
    hideStartDiv();
    if (activeProjectKey === undefined || activeProjectKey === null) {
        showStartDiv();
    }
    else {
        let table = document.getElementById('table');
        let tableDiv = document.getElementById('tableDiv');
        let addBtnDiv = document.getElementById('newTodoDiv');
        let projectTitle = document.getElementById('projectTitle');
        
        let obj = localStorage.getItem(projectIndex);
        obj = JSON.parse(obj);
        let todo = obj.todoList;
        projectTitle.textContent = obj.title;

        if (previousActiveProj) {changeActiveClass(previousActiveProj, projectIndex)}
        else if(localStorage.length < 2) {document.querySelector('.projectDiv').classList.
            add('active')}
        else {ev.target.parentNode.classList.add('active')};

        let tbody = document.getElementById('tbody');
        clearMainDiv();

        for (let i = 0; i < todo.length; i++) {
            let tr1 = document.createElement('tr');
            tr1.dataset.rowIndex = i;
            let td1 = document.createElement('td')
            td1.textContent = todo[i].title;
            let td2 = document.createElement('td');
            td2.textContent = todo[i].description;
            let td3 = document.createElement('td');
            let formatedDate = format(new Date(todo[i].dueDate), 'Pp');
            td3.textContent = formatedDate;
            if (todo[i].priority) {tr1.classList.add('priority')};
            let btnDiv = document.createElement('div')
            btnDiv.classList.add('todoBtnDiv');
            let td4 = document.createElement('td');
            let editBtn = document.createElement('button');
            let editImg = document.createElement('img')
            editImg.src = Edit;
            editImg.classList.add('editImg')
            editImg.dataset.project = projectIndex
            editImg.dataset.index = i;
            editBtn.classList.add('editBtn');
            editBtn.dataset.project = projectIndex;
            editBtn.dataset.index = i;
            editBtn.appendChild(editImg)
            let deleteBtn = document.createElement('button');
            let deleteImg = document.createElement('img');
            deleteImg.src = Delete;
            deleteImg.classList.add('deleteImg')
            deleteImg.dataset.project = projectIndex
            deleteImg.dataset.index = i;
            deleteBtn.classList.add('deleteTodoButton');
            deleteBtn.dataset.project = projectIndex;
            deleteBtn.dataset.index = i;
            deleteBtn.appendChild(deleteImg)
            btnDiv.appendChild(editBtn)
            btnDiv.appendChild(deleteBtn)
            td4.appendChild(btnDiv);
            tr1.appendChild(td1);
            tr1.appendChild(td2);
            tr1.appendChild(td3);
            tr1.appendChild(td4);
            tbody.appendChild(tr1);
            table.appendChild(tbody);
            tableDiv.appendChild(table);
        }

        document.querySelectorAll('.editBtn').forEach(btn => btn.addEventListener('click', 
            showEditDiv));
        document.querySelectorAll('.deleteTodoButton').forEach(btn=>btn.addEventListener
            ('click', deleteTodo))
        };
}

const clearMainDiv = () => {
    let tbody = document.getElementById('tbody');
    while (tbody.firstChild) {
        tbody.firstChild.remove();
    };
}

const clearSideDiv = () => {
    let wrapperDiv = document.getElementById('wrapperDiv');
    while (wrapperDiv.firstChild) {
        wrapperDiv.firstChild.remove();
    }
}

const deleteProjectDom = (key) => {
    let proj = document.querySelector(`[data-project='${key}']`);
    proj.remove();
    activeProjectKey = localStorage.key(0);
    if (localStorage.length < 1) {activeProjectKey = undefined}
    populateSideDiv();
    if (activeProjectKey) {triggerClickEvent()};
}

const clearTodoForm = () => {
    document.forms['newTodoForm']['title'].value = '';
    document.forms['newTodoForm']['description'].value = '';
    document.forms['newTodoForm']['date'].value = '';
    document.forms['newTodoForm']['priority'].value = '';
    hideTodoForm();
}

const showNewTodoForm = () => {
    document.getElementById('tableDiv').classList.add('hidden');
    document.querySelector('.newTodoButtonDiv').classList.add('hidden');
    document.getElementById('projectTitle').classList.add('hidden');
    document.getElementById('newTodoDiv').classList.remove('hidden')

    document.getElementById('addTodoBtn').addEventListener('click', 
        addTodo.bind(this, activeProjectKey));
    document.getElementById('closeTodoBtn').addEventListener('click', clearTodoForm);
}

const hideTodoForm = () => {
    document.getElementById('tableDiv').classList.remove('hidden');
    document.querySelector('.newTodoButtonDiv').classList.remove('hidden');
    document.getElementById('projectTitle').classList.remove('hidden');
    document.getElementById('newTodoDiv').classList.add('hidden')
}

const showNewProjectForm = () => {
    document.getElementById('tableDiv').classList.add('hidden');
    document.querySelector('.newTodoButtonDiv').classList.add('hidden');
    document.getElementById('projectTitle').classList.add('hidden');
    hideStartDiv();
    document.querySelector('.newProjectDiv').classList.remove('hidden')

    let key = getNewKey();
    document.getElementById('addProjBtn').addEventListener('click', 
        addProject.bind(this, key));
    document.getElementById('closeTodoBtn').addEventListener('click', clearProjectForm)
}

const hideProjectForm = () => {
    document.getElementById('tableDiv').classList.remove('hidden');
    document.querySelector('.newTodoButtonDiv').classList.remove('hidden');
    document.getElementById('projectTitle').classList.remove('hidden');
    document.getElementById('newProjectDiv').classList.add('hidden')
}

const showEditDiv = (ev) => {
    document.getElementById('tableDiv').classList.add('hidden');
    document.querySelector('.newTodoButtonDiv').classList.add('hidden');
    document.getElementById('projectTitle').classList.add('hidden');
    document.getElementById('editTodoDiv').classList.remove('hidden')
    let proj = ev.target.dataset.project;
    let index = ev.target.dataset.index;
    let obj = getObjectFromStorage(proj)
    populateEditForm(obj.todoList[index]);
    
    document.getElementById('editTodoBtn').addEventListener('click', 
        editTodo.bind(this, proj, index))
    document.getElementById('closeTodoBtn').addEventListener('click', hideEditForm)
}

const populateEditForm = (obj) => {
    document.forms['editTodoForm']['title'].value = obj.title;
    document.forms['editTodoForm']['description'].value = obj.description;
    let date = new Date(obj.dueDate);
    date = date.toISOString();
    date = date.slice(0, date.length - 8)
    document.getElementById('editDateForm').value = date;
    document.forms['editTodoForm']['priority'].checked = obj.priority;
}

const updateDatasetIndex = (proj) => {
    let editBtns = document.querySelectorAll('.editBtn')
    let deleteBtns = document.querySelectorAll('.deleteTodoButton')

    for (let i = 0; i < editBtns.length; i++) {
        editBtns[i].dataset.index = i;
        deleteBtns[i].dataset.index = i;
    }
}

const hideEditForm = () => {
    document.getElementById('tableDiv').classList.remove('hidden');
    document.querySelector('.newTodoButtonDiv').classList.remove('hidden');
    document.getElementById('projectTitle').classList.remove('hidden');
    document.getElementById('editProjectDiv').classList.add('hidden') 
}

const clearProjectForm = () => {
    document.forms['newProjectFrom']['title'].value = "";
    hideProjectForm();
}

const deleteTodoDom = (index) => {
    let todo = document.querySelector(`[data-row-index="${index}"]`);
    todo.remove()
}

const showStartDiv = () => {
    let startDiv = document.getElementById('startDiv');
    startDiv.classList.remove('hidden');
}

const hideStartDiv = () => {
    let startDiv = document.getElementById('startDiv');
    startDiv.classList.add('hidden'); 
}

const changeActiveClass = (oldTitleKey, newTitleKey) => {
    let oldTitle = document.querySelector(`[data-project="${oldTitleKey}"`);
    oldTitle.classList.remove('active');
    let newTitle = document.querySelector(`[data-project="${newTitleKey}"`);
    newTitle.classList.add('active');
}

const triggerClickEvent = () => {
    let project = document.querySelector(`[data-index="${activeProjectKey}"`);
    project.dispatchEvent(new Event('click'));
}

export { createBase, 
    populateMainDiv, 
    populateSideDiv, 
    deleteProjectDom,
    hideTodoForm,
    triggerClickEvent,
    hideProjectForm,
    updateDatasetIndex,
    deleteTodoDom};