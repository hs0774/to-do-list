export class ListCreation{
    constructor(listName){
        this._listName = listName;
        this._items=[];
    }

    get listName(){
        return this._listName;
    }

    set listName(newListName){
        this._listName=newListName;
    }

    listPush(item){
        this._items.push(item);
    }

    listRemove(item){
        const index = this._items.indexOf(item);
        this._items.splice(index,1);
    }
}