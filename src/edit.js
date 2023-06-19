import { buttons } from "./buttons";

export function functions();{

    const checkSameName = function(projectInput){
        return projectz.some(function(project){
            return project.listName===projectInput;
        });
    }
    const projectCreation = function(projectInput){
        const newlist = new ListCreation(projectInput);
        projectz.push(newlist);
        ProjectDisplay(newlist);
    }
}