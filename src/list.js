export class ListCreation{
    constructor(listName){
        this._listName = listName;
        this._items=[];
    }

    get listName(){
        return this.listName;
    }

    set listName(newListName){
        this._listName=newListName;
    }

    listPush(item){
        this._items.push(item);
    }

    listRemove(){
        
    }
}