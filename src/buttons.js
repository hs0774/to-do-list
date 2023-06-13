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
}
