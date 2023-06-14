import { Item } from "./items";
import { ListCreation } from "./list";
export function buttons(){

    //modal opening and closing 
    const toDoAdd = document.querySelector('.btn');
    const modal = document.querySelector('.modal');
    const close = document.querySelector('.close');
    // const modalSubmit = document.querySelector('.ModalSubmit');

    toDoAdd.addEventListener('click',function(){
        modal.classList.toggle('hidden');
    });

    close.addEventListener('click',function(){
        modal.classList.toggle('hidden');
    })

    // modalSubmit.addEventListener('click',function(){
    //     modal.classList.toggle('hidden');
    // });  not sure if needed but will leave it incase it is 


    //add project open and closing 
    const addProject = document.querySelector('.todoBtnn');
    const form = document.querySelector('.form1');
    // const submit = document.querySelector('.submit');

   addProject.addEventListener('click', function() {
        form.classList.toggle('hidden');
        if (form.classList.contains('hidden')) {
          toDoAdd.disabled = false;
        } else {
          toDoAdd.disabled = true;
        }
      });

    // submit.addEventListener('click',function(){
    //     form.classList.toggle('hidden');
    // }); not sure if needed but will leave incase 
    
    //form submission for the side 
    const submitSide = document.querySelector('.submit');
    submitSide.addEventListener('click',function(e){
        e.preventDefault();
        const projectTitle = document.getElementById('project-title');
        const projectInput = projectTitle.value;
        projectTitle.value='';
        projectCreation(projectInput);
        console.log(projectInput);
        form.classList.toggle('hidden');
    });

    //project creation
    const projectCreation = function(projectInput){
        const newlist = new ListCreation(projectInput);
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
        projectDiv.append(projectInputDiv);
        const rightSide = document.createElement('div')
        rightSide.classList.add('right-side');
        projectDiv.append(rightSide);
        const editR=document.createElement('button'); 
        editR.classList.add('edit');
        editR.textContent='Edit';
        const xSideR=document.createElement('button'); 
        xSideR.classList.add('xSide');
        xSideR.textContent='x'
        rightSide.append(editR);
        rightSide.append(xSideR);

        //remove projects from side bar 
        const jsproj = document.querySelector(`[data-id='${newlist.id}']`);
        xSideR.addEventListener('click',function(){
        jsproj.remove();
    });
    
    }

    //create edit button to change name 
    
}
