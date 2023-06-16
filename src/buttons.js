import { Item } from "./items";
import { ListCreation } from "./list";
import { format, compareAsc } from 'date-fns'


export function buttons(){

    const projectz =[];  //array to store projects 

    //modal opening and closing 
    const toDoAdd = document.querySelector('.btn');
    const modal = document.querySelector('.modal');
    const Emodal = document.querySelector('.Emodal');
    const close = document.querySelector('.close');
    const Eclose = document.querySelector('.Eclose');
    const home =document.querySelector('.home');
    const today= document.querySelector('.today');
    const week= document.querySelector('.week');
    const currentList= document.querySelector('.middle');

    home.addEventListener('click',function(){
        currentList.textContent='Home';
        toDoAdd.disabled = true;
        clearMainDiv();
        projectz.forEach(function(project){
            project._items.forEach(function(item){
                itemDisplay(item);
            });
        });
    });


    week.addEventListener('click', function() {
            currentList.textContent = 'This week';
            toDoAdd.disabled = true;
            clearMainDiv();
          
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            const todayy = `${month}/${day}`;
          
            const weekEnd = new Date(today);
            weekEnd.setDate(weekEnd.getDate() + 6);
            const week = weekEnd.getDate();
            const weeky = `${month}/${String(week).padStart(2, '0')}`;
          
            projectz.forEach(function(project) {
              project._items.forEach(function(item) {
                const dueDate = new Date(item.dueDate);
                const diffInDays = Math.floor((dueDate - today) / (1000 * 60 * 60 * 24)); // Difference in days
          
                if (diffInDays >= 0 && diffInDays <= 7) {
                  itemDisplay(item);
                }
              });
            });
          });
          

    today.addEventListener('click',function(){
        currentList.textContent='Today';
        toDoAdd.disabled = true;
        clearMainDiv();
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        const todayy = `${month}/${day-1}/${year}`;
        projectz.forEach(function(project){
            project._items.forEach(function(item){
                if(item.dueDate==todayy){
                    itemDisplay(item);
                }
            });
        });
    });

    toDoAdd.disabled = true;
    toDoAdd.addEventListener('click',function(){
        modal.classList.toggle('hidden');
    });

    close.addEventListener('click',function(){
        modal.classList.toggle('hidden');
    });

    Eclose.addEventListener('click',function(){
        Emodal.classList.toggle('hidden');
    });

    //add project open and closing 
    const addProject = document.querySelector('.todoBtnn');
    const form = document.querySelector('.form1');

   addProject.addEventListener('click', function() {
        form.classList.toggle('hidden');
      });

    
    const checkSameName = function(projectInput){
        return projectz.some(function(project){
            return project.listName===projectInput;
        });
    }
    
    //form submission for the side 
    const submitSide = document.querySelector('.submit');
    submitSide.addEventListener('click',function(e){
        e.preventDefault();
        const projectTitle = document.getElementById('project-title');
        const projectInput = projectTitle.value.trim();
       const sameName = checkSameName(projectInput);
        if(projectInput !== '' && !sameName){
        projectTitle.value='';
        projectCreation(projectInput);
        form.classList.toggle('hidden');
        }
        else {
            form.classList.toggle('hidden');
        }
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
       Jsprojects.classList.add(`${newlist.listName}`);
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
        const jsproj = document.querySelector(`.${newlist.listName}`);


        xSideR.addEventListener('click', function(e) {
            e.stopPropagation();
            jsproj.remove();
            const index = newlist.listName;
            for (let i = projectz.length - 1; i >= 0; i--) {
                if (projectz[i].listName === index) {
                    projectz.splice(i, 1);
                }
            }
        });
        
        projectDiv.addEventListener('click', function() {
                setCurrentProject(newlist);
                toDoAdd.disabled = false;
        });
            


    }
    const setCurrentProject = function(project) {
        currentList.textContent = project.listName;
        toDoAdd.disabled = false;
        updateListItems(project);
    }
    
    const updateListItems = function(project) {
        const itemsContainer = document.getElementById('itemsContainer');
        itemsContainer.innerHTML=''; // Clear existing items
   
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
    const dueDateValue = dateString(dueDate.value);
    title.value='';
    description.value='';
    priority.value='';
    dueDate.value='';
    itemCreation(titleValue, descriptionValue, priorityValue, dueDateValue, currentList.textContent);

 });

 const itemCreation = function(titleValue, descriptionValue, priorityValue, dueDateValue,projectName) {
    let projectId;
    projectz.forEach(function(project) {
        if (project.listName === projectName) {
          projectId = project.id;
        }
      });
    const newItem = new Item(titleValue, descriptionValue,dueDateValue,priorityValue);
    newItem.id=projectId;

    const currentProject = findProjectByName(newItem.id);
    if (currentProject) {
      currentProject.listPush(newItem);
    //   newItem.id=currentProject.id;
      itemDisplay(newItem);
    }
 }

 const itemDisplay = function(newItem) {
    console.log(newItem.id2);
    const itemsContainer = document.getElementById('itemsContainer');
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('items');
    itemDiv.setAttribute('data-id', newItem.id2);
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


    const jsitem = document.querySelector(`[data-id='${newItem.id2}']`);
    xButton.addEventListener('click', function() {
        const currentProject = findProjectByName(newItem.id);
        if (currentProject) {
            currentProject.listRemove(newItem);
        }
        jsitem.remove();
    });

    editButton.addEventListener('click',function(){
        const currentProject = findProjectByName(newItem.id);
        if (currentProject) {
            const currentItem = findItemById(newItem.id2);
            if (currentItem){
                const titleInput = document.getElementById('Etitle');
                const descriptionInput = document.getElementById('Edescription');
                const priorityInput = document.getElementById('Epriority');
                const dueDateInput = document.getElementById('EdueDate');
                titleInput.value = currentItem.title;
                descriptionInput.value = currentItem.description;
                priorityInput.value = currentItem.priority;
                dueDateInput.value = currentItem.dueDate;

                editSubmit.addEventListener('click', function(e) {
                    e.preventDefault();
                    currentItem.title = titleInput.value;
                    currentItem.description = descriptionInput.value;
                    currentItem.priority = priorityInput.value;
                    currentItem.dueDate = dateString(dueDateInput.value);

                    titleItem.textContent = currentItem.title;
                    priorityDiv.textContent = currentItem.priority;
                    dueDateDiv.textContent = currentItem.dueDate;

                Emodal.classList.add('hidden');
                });
                Emodal.classList.toggle('hidden'); 
            }
        }
    });
 }

 const findProjectByName = function(projectName) {
    return projectz.find(project => project.id === projectName);
}

const findItemById = function(id2) {
    let foundItem = null;

    projectz.forEach(function(project) {
        const item = project._items.find(function(item) {
            return item.id2 === id2;
        });

        if (item) {
            foundItem = item;
            return; // Exit the loop if the item is found
        }
    });

    return foundItem;
};

const clearMainDiv = function(){
    const itemsContainer = document.getElementById('itemsContainer');
        itemsContainer.innerHTML=''; // Clear existing items
}
//sort by date and edit button

const dateString = function(dueDateValue){
    const date = new Date(dueDateValue);
    return format(date, 'MM/dd/yyyy');
}

const editSubmit = document.querySelector('.EditSubmit');



}