import { v4 as uuidv4 } from 'uuid';

export class Item {
    constructor(title,description,dueDate,priority,id){
        this._title=title;
        this._description=description;
        this._dueDate=dueDate;
        this._priority=priority; //low, med,high
        this._id = id;
        this._id2= uuidv4().replace(/[^a-z]/gi, '').slice(0,10);
    } 

    //getters
    get title(){
        return this._title;
    }
    get description(){
        return this._description;
    }
    get dueDate(){
        return this._dueDate;
    }
    get priority(){
        return this._priority;
    }
    // get checked(){
    //     return this._checked;
    // }
    get id(){
        return this._id;
    }
    get id2(){
        return this._id2;
    }

    //setters
    set title(newTitle){
        this._title=newTitle;
    }
    set description(newDescription){
        this._description=newDescription;
    }
    set dueDate(newDueDate){
        this._dueDate=newDueDate;
    }
    set priority(newPriority){
        this._priority=newPriority;
    }
    // set checked(newChecked){
    //     this._checked=newChecked;
    // }
    set id(newId){
        this._id=newId;
    }

}