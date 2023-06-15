import { Item } from "./items";
import { ListCreation } from "./list";
export function buttons(){

    const projectz =[];
    //modal opening and closing 
    const toDoAdd = document.querySelector('.btn');
    const modal = document.querySelector('.modal');
    const close = document.querySelector('.close');
    const home =document.querySelector('.home');
    const today= document.querySelector('.today');
    const week= document.querySelector('.week');
    const currentList= document.querySelector('.middle');

    home.addEventListener('click',function(){
        currentList.textContent='Home';
        toDoAdd.disabled = true;
    });

    today.addEventListener('click',function(){
        currentList.textContent='Today';
        toDoAdd.disabled = true;
    });

    week.addEventListener('click',function(){
        currentList.textContent='This Week';
        toDoAdd.disabled = true;
    });

    toDoAdd.disabled = true;
    toDoAdd.addEventListener('click',function(){
        modal.classList.toggle('hidden');
    });

    close.addEventListener('click',function(){
        modal.classList.toggle('hidden');
    })

    //add project open and closing 
    const addProject = document.querySelector('.todoBtnn');
    const form = document.querySelector('.form1');

   addProject.addEventListener('click', function() {
        form.classList.toggle('hidden');
        if (form.classList.contains('hidden')) {
          toDoAdd.disabled = false;
        } else {
          toDoAdd.disabled = true;
        }
      });


    //form submission for the side 
    const submitSide = document.querySelector('.submit');
    submitSide.addEventListener('click',function(e){
        e.preventDefault();
        const projectTitle = document.getElementById('project-title');
        const projectInput = projectTitle.value.trim();
        if(projectInput != ''){
        // currentList.textContent=projectInput;
        projectTitle.value='';
        projectCreation(projectInput);
        form.classList.toggle('hidden');
        }
        else {
            form.classList.toggle('hidden');
        }
        // toDoAdd.disabled = false;
    });

    //project creation
    const projectCreation = function(projectInput){
        const newlist = new ListCreation(projectInput);
        projectz.push(newlist);
        ProjectDisplay(newlist);
    }

    const ProjectDisplay = function(newlist) {

        const projectContainer = document.getElementById('ProjectListContainer');
        const projectDiv = document.createElement('div');
        projectDiv.classList.add('projectTitle');
        const Jsprojects = document.createElement('div');
        Jsprojects.classList.add('JS-Projects');
        Jsprojects.setAttribute('data-id',newlist.id);
        projectContainer.append(Jsprojects);
        Jsprojects.append(projectDiv);
        const projectInputDiv = document.createElement('div');
        projectInputDiv.textContent=newlist.listName;
        projectInputDiv.classList.add('title');
        projectDiv.append(projectInputDiv);
        const rightSide = document.createElement('div')
        rightSide.classList.add('right-side');
        projectDiv.append(rightSide);
        const xSideR=document.createElement('button'); 
        xSideR.classList.add('xSide');
        xSideR.textContent='x'
        rightSide.append(xSideR);

        //remove projects from side bar 
        const jsproj = document.querySelector(`[data-id='${newlist.id}']`);
        xSideR.addEventListener('click',function(){
             jsproj.remove();
             toDoAdd.disabled = true;
        });  

        projectDiv.addEventListener('click', function() {
                setCurrentProject(newlist);
        });
            


    }
    const setCurrentProject = function(project) {
        currentList.textContent = project.listName;
        toDoAdd.disabled = false;
        updateListItems(project);
    }
    
    const updateListItems = function(project) {
        const itemsContainer = document.getElementById('itemsContainer');
        itemsContainer.innerHTML = ''; // Clear existing items
    
        // Iterate through the project's items and display them
        project._items.forEach(item => {
            itemDisplay(item);
        });
    }

//////////////////////////////////////////////////////////////////////////////

const ModalSubmit = document.querySelector('.ModalSubmit');
const sub = ModalSubmit.addEventListener('click', function(e) {
    e.preventDefault();
    modal.classList.toggle('hidden');
    const title = document.getElementById('title');
    const description = document.getElementById('description');
    const priority = document.getElementById('priority');
    const dueDate = document.getElementById('dueDate');
    const titleValue = title.value;
    const descriptionValue = description.value;
    const priorityValue = priority.value;
    const dueDateValue = dueDate.value;
    title.value='';
    description.value='';
    priority.value='';
    dueDate.value='';
    itemCreation(titleValue, descriptionValue, priorityValue, dueDateValue, currentList.textContent);

});

const itemCreation = function(titleValue, descriptionValue, priorityValue, dueDateValue,projectName) {
    const newItem = new Item(titleValue, descriptionValue, priorityValue, dueDateValue);
    const currentProject = findProjectByName(projectName);
    if (currentProject) {
      currentProject.listPush(newItem);
      itemDisplay(newItem);
    }
}

const itemDisplay = function(newItem) {
    const itemsContainer = document.getElementById('itemsContainer');
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('items');
    itemDiv.setAttribute('data-id', newItem.id);
    itemsContainer.append(itemDiv);
    const listLeft = document.createElement('div');
    listLeft.classList.add('listLeft');
    itemDiv.append(listLeft);
    const titleItem = document.createElement('div');
    titleItem.classList.add('Title');
    titleItem.textContent = newItem.title;
    listLeft.append(titleItem);
    const listRight = document.createElement('div');
    listRight.classList.add('listRight');
    itemDiv.append(listRight);
    const priorityDiv = document.createElement('div');
    priorityDiv.classList.add('priority');
    priorityDiv.textContent = newItem.priority;
    listRight.append(priorityDiv);
    const dueDateDiv = document.createElement('div');
    dueDateDiv.classList.add('dueDate');
    dueDateDiv.textContent = newItem.dueDate;
    listRight.append(dueDateDiv);
    const editButton = document.createElement('button');
    const xButton = document.createElement('button');
    editButton.classList.add('edit');
    xButton.classList.add('xMain');
    editButton.textContent = 'Edit';
    xButton.innerHTML = '&times;';
    listRight.append(editButton);
    listRight.append(xButton);

    const jsitem = document.querySelector(`[data-id='${newItem.id}']`);
    xButton.addEventListener('click', function() {
        const currentProject = findProjectByName();
        if (currentProject) {
            currentProject.listRemove(newItem);
        }
        jsitem.remove();
    });
}

 
const findProjectByName = function(projectName) {
    return projectz.find(project => project.listName === projectName);
  }
}
