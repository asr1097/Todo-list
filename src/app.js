import { deleteProjectDom,
        hideTodoForm,
        populateSideDiv,
        triggerClickEvent,
        hideProjectForm,
        updateDatasetIndex,
        deleteTodoDom } from './dom'

import {format} from 'date-fns';


const createProject = (title, todoList = []) => {
    return {
        title: title,
        todoList: todoList
    };
};

const createTodo = (title, description, dueDate, priority) => {
    return {
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority,
    };
};

const getObjectFromStorage = (index) => {
    let obj = localStorage.getItem(index);
    obj = JSON.parse(obj);

    return obj;
}

const getNewKey = () => {
    let lastKey = localStorage.key(localStorage.length-1);
    if (localStorage.length < 1) {return 0}
    return parseInt(lastKey) + 1;
}

const deleteProject = (ev) => {
    let key = ev.target.dataset.projectindex;
    localStorage.removeItem(key);
    deleteProjectDom(key);
}

const deleteTodo = (ev) => {
    let proj = ev.target.dataset.project;
    let index = ev.target.dataset.index;

    let obj = getObjectFromStorage(proj)
    obj.todoList.splice(index, 1)
    let newObj = createProject(obj.title, obj.todoList)

    localStorage.removeItem(proj)
    localStorage.setItem(proj, JSON.stringify(newObj))
    deleteTodoDom(index)
    updateDatasetIndex(proj)
    triggerClickEvent();
}

//!!!
const addTodo = (key) => {
    let obj = getObjectFromStorage(key);
    let newObj = obj;
    let title = document.forms['newTodoForm']['title'].value
    let desc = document.forms['newTodoForm']['description'].value
    let date = document.forms['newTodoForm']['date'].value
    let priority = document.forms['newTodoForm']['priority'].checked
    let newTodo = createTodo(title, desc, date, priority)
    newObj.todoList.push(newTodo)
    localStorage.removeItem(key);
    newObj = JSON.stringify(newObj)
    window.localStorage.setItem(key, newObj)
    hideTodoForm();
    populateSideDiv();
    triggerClickEvent();
}

const addProject = (key) => {
    let title = document.forms['newProjectForm']['title'].value
    let newProject = createProject(title);
    newProject = JSON.stringify(newProject)
    localStorage.setItem(key, newProject)
    hideProjectForm();
    populateSideDiv();
}

const addDefaultProject = () => {
    const myProject = createProject('My Project');
    let date = format(new Date(), 'Pp')
    const myTodo = createTodo('My Todo', 'Default Todo list', date, false)

    myProject.todoList.push(myTodo);
    localStorage.setItem('0', JSON.stringify(myProject));
}

const editTodo = (proj, index) => {
    let newTitle = document.forms['editTodoForm']['title'].value
    let newDesc = document.forms['editTodoForm']['description'].value
    let newDate = document.getElementById('editDateForm').value
    let newPrior = document.forms['editTodoForm']['priority'].checked
    let oldObj = getObjectFromStorage(proj)
    
    oldObj.todoList.splice(index, 1)
    let newTodo = createTodo(newTitle, newDesc, newDate, newPrior)
    oldObj.todoList.push(newTodo)
    let newObj = createProject(oldObj.title, oldObj.todoList)

    localStorage.removeItem(proj)
    newObj = JSON.stringify(newObj)
    localStorage.setItem(proj, newObj)
}



export {
createProject,
createTodo, 
getObjectFromStorage, 
getNewKey, 
deleteProject,
addTodo,
addProject,
addDefaultProject,
editTodo,
deleteTodo
}