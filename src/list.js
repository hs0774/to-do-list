import { v4 as uuidv4 } from 'uuid';

export class ListCreation{
    constructor(listName){
        this._listName = listName;
        this._items=[];
        this._id = uuidv4().replace(/[^a-z]/gi, '').slice(0,10);
    }

    get listName(){
        return this._listName;
    }

    set listName(newListName){
        this._listName=newListName;
    }

    get id(){
        return this._id;
    }

    listPush(item){
        this._items.push(item);
    }

    listRemove(item){
        const index = this._items.indexOf(item);
        if(index !==-1){
        this._items.splice(index,1);
        }
    }

}