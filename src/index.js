import { Item } from "./items";
import { ListCreation } from "./list";
const newlist = new ListCreation('gym');
const gymitem = new Item('volume','increase volume','6/20',false);
const gymitem1 = new Item('volume','increase volume','6/20',false);
const gymitem2 = new Item('volume','increase volume','6/20',false);

// console.log(newlist);
// console.log(gymitem);
newlist.listPush(gymitem);
newlist.listPush(gymitem1);
newlist.listPush(gymitem2);
console.log(newlist);
console.log(newlist._items);
console.log(newlist._items[2]._id);
