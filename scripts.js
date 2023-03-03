"use strict";

const task_list_ul = document.getElementById("task-list-ul");
const main_input = document.getElementById("main-input");

function delete_task(event){
    let task = event.target;
    let task_list_item = task.parentNode.parentNode.parentNode;
    task_list_item.parentNode.removeChild(task_list_item);
}

function strike_task(event){
    let task = event.target;
    let task_text = task.parentNode.parentNode.querySelector(".task-text");
    task_text.classList.toggle("strike");
}

function add_task(){
    let text = main_input.value;
    if(text != ""){
        // Create task list item
        let task_list_item = document.createElement("li");
        task_list_item.classList.add("task-item");
        task_list_ul.appendChild(task_list_item);
        
        // Create task text
        let task_text = document.createElement("p");
        task_text.classList.add("task-text");
        task_text.innerHTML = text;
        task_list_item.appendChild(task_text);
        
        // Create task options container
        let task_options = document.createElement("span");
        task_options.classList.add("task-options");
        task_list_item.appendChild(task_options);
        
        // Create task checkbox
        let task_checkbox = document.createElement("input");
        task_checkbox.type = "checkbox";
        task_checkbox.classList.add("task-complete");
        task_checkbox.addEventListener("click", (event) => strike_task(event));
        task_options.appendChild(task_checkbox);
        
        // Create task delete button
        let task_delete = document.createElement("span");
        task_delete.classList.add("task-delete");
        task_delete.addEventListener("click" ,(event) => delete_task(event));
        task_options.appendChild(task_delete);
        
        // Create task delete icon
        let x_mark = document.createElement("i");
        x_mark.classList.add("fa-solid", "fa-xmark");
        task_delete.appendChild(x_mark);
        
        // Create hr break
        let hr_break = document.createElement("hr");
        task_list_item.appendChild(hr_break);
        
        // Clear input
        main_input.value = "";
    }
}

main_input.addEventListener("keydown", (event) => {
    if(event.key == "Enter"){
        event.preventDefault();
        add_task();
    }
})