(()=>{"use strict";const t={randomUUID:"undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};let e;const n=new Uint8Array(16);function i(){if(!e&&(e="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!e))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return e(n)}const d=[];for(let t=0;t<256;++t)d.push((t+256).toString(16).slice(1));const s=function(e,n,s){if(t.randomUUID&&!n&&!e)return t.randomUUID();const c=(e=e||{}).random||(e.rng||i)();if(c[6]=15&c[6]|64,c[8]=63&c[8]|128,n){s=s||0;for(let t=0;t<16;++t)n[s+t]=c[t];return n}return function(t,e=0){return(d[t[e+0]]+d[t[e+1]]+d[t[e+2]]+d[t[e+3]]+"-"+d[t[e+4]]+d[t[e+5]]+"-"+d[t[e+6]]+d[t[e+7]]+"-"+d[t[e+8]]+d[t[e+9]]+"-"+d[t[e+10]]+d[t[e+11]]+d[t[e+12]]+d[t[e+13]]+d[t[e+14]]+d[t[e+15]]).toLowerCase()}(c)};class c{constructor(t,e,n,i,d){this._title=t,this._description=e,this._dueDate=n,this._priority=i,this._id=s().slice(0,8)}get title(){return this._title}get description(){return this._description}get dueDate(){return this._dueDate}get priority(){return this._priority}get checked(){return this._checked}set title(t){this._title=t}set description(t){this._description=t}set dueDate(t){this._dueDate=t}set priority(t){this._priority=t}set checked(t){this._checked=t}}class o{constructor(t){this._listName=t,this._items=[],this._id=s().slice(0,8)}get listName(){return this._listName}set listName(t){this._listName=t}get id(){return this._id}listPush(t){this._items.push(t)}listRemove(t){const e=this._items.indexOf(t);this._items.splice(e,1)}}!function(){const t=[],e=document.querySelector(".btn"),n=document.querySelector(".modal"),i=document.querySelector(".close"),d=document.querySelector(".home"),s=document.querySelector(".today"),r=document.querySelector(".week"),a=document.querySelector(".middle");d.addEventListener("click",(function(){a.textContent="Home",e.disabled=!0})),s.addEventListener("click",(function(){a.textContent="Today",e.disabled=!0})),r.addEventListener("click",(function(){a.textContent="This Week",e.disabled=!0})),e.disabled=!0,e.addEventListener("click",(function(){n.classList.toggle("hidden")})),i.addEventListener("click",(function(){n.classList.toggle("hidden")}));const l=document.querySelector(".todoBtnn"),u=document.querySelector(".form1");l.addEventListener("click",(function(){u.classList.toggle("hidden"),u.classList.contains("hidden")?e.disabled=!1:e.disabled=!0})),document.querySelector(".submit").addEventListener("click",(function(t){t.preventDefault();const e=document.getElementById("project-title"),n=e.value.trim();""!=n?(e.value="",m(n),u.classList.toggle("hidden")):u.classList.toggle("hidden")}));const m=function(e){const n=new o(e);t.push(n),p(n)},p=function(t){const n=document.getElementById("ProjectListContainer"),i=document.createElement("div");i.classList.add("projectTitle");const d=document.createElement("div");d.classList.add("JS-Projects"),d.setAttribute("data-id",t.id),n.append(d),d.append(i);const s=document.createElement("div");s.textContent=t.listName,s.classList.add("title"),i.append(s);const c=document.createElement("div");c.classList.add("right-side"),i.append(c);const o=document.createElement("button");o.classList.add("xSide"),o.textContent="x",c.append(o);const r=document.querySelector(`[data-id='${t.id}']`);o.addEventListener("click",(function(){r.remove(),e.disabled=!0})),i.addEventListener("click",(function(){h(t)}))},h=function(t){a.textContent=t.listName,e.disabled=!1,y(t)},y=function(t){document.getElementById("itemsContainer").innerHTML="",t._items.forEach((t=>{v(t)}))},f=(document.querySelector(".ModalSubmit").addEventListener("click",(function(t){t.preventDefault(),n.classList.toggle("hidden");const e=document.getElementById("title"),i=document.getElementById("description"),d=document.getElementById("priority"),s=document.getElementById("dueDate"),c=e.value,o=i.value,r=d.value,l=s.value;e.value="",i.value="",d.value="",s.value="",f(c,o,r,l,a.textContent)})),function(t,e,n,i,d){const s=new c(t,e,n,i),o=g(d);o&&(o.listPush(s),v(s))}),v=function(t){const e=document.getElementById("itemsContainer"),n=document.createElement("div");n.classList.add("items"),n.setAttribute("data-id",t.id),e.append(n);const i=document.createElement("div");i.classList.add("listLeft"),n.append(i);const d=document.createElement("div");d.classList.add("Title"),d.textContent=t.title,i.append(d);const s=document.createElement("div");s.classList.add("listRight"),n.append(s);const c=document.createElement("div");c.classList.add("priority"),c.textContent=t.priority,s.append(c);const o=document.createElement("div");o.classList.add("dueDate"),o.textContent=t.dueDate,s.append(o);const r=document.createElement("button"),a=document.createElement("button");r.classList.add("edit"),a.classList.add("xMain"),r.textContent="Edit",a.innerHTML="&times;",s.append(r),s.append(a);const l=document.querySelector(`[data-id='${t.id}']`);a.addEventListener("click",(function(){const e=g();e&&e.listRemove(t),l.remove()}))},g=function(e){return t.find((t=>t.listName===e))}}()})();