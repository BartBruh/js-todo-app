"use strict";

const task_list_ul = document.getElementById("task-list-container");
const main_input = document.getElementById("main-input");

var todos = JSON.parse(localStorage.getItem("todos")) || [];
var input_control_key_pressed = false;

var add_new_todos_to_top = false;

function display_todos() {
    todos = JSON.parse(localStorage.getItem("todos")) || [];
    // clearing current task list
    task_list_ul.innerHTML = "";

    todos.forEach(todo => {
        // create task list item
        let task_list_item = document.createElement("li");
        task_list_item.classList.add("task-item");
        if (add_new_todos_to_top) task_list_ul.prepend(task_list_item);
        else task_list_ul.appendChild(task_list_item);

        // create task item main container
        let task_item_main = document.createElement("span");
        task_item_main.classList.add("task-item-main");
        task_list_item.appendChild(task_item_main);

        // create task text
        let task_text = document.createElement("p");
        task_text.classList.add("task-text");
        if (todo.checked) task_text.classList.add("strike");
        task_text.innerText = todo.content;
        task_item_main.appendChild(task_text);

        // create task options container
        let task_options = document.createElement("span");
        task_options.classList.add("task-options");
        task_item_main.appendChild(task_options);

        // create task checkbox
        let task_checkbox = document.createElement("input");
        task_checkbox.type = "checkbox";
        task_checkbox.checked = todo.checked;
        task_checkbox.classList.add("task-checkbox");
        task_checkbox.addEventListener("change", event => strike_task(event, todo));
        task_options.appendChild(task_checkbox);

        // create task edit button
        let task_edit = document.createElement("button");
        task_edit.classList.add("task-edit");
        task_edit.addEventListener("click", event => edit_task(event, todo));
        task_options.appendChild(task_edit);
        // create task edit icon
        let pen_mark = document.createElement("i");
        pen_mark.classList.add("fa-solid", "fa-pen");
        task_edit.appendChild(pen_mark);

        // create task delete button
        let task_delete = document.createElement("button");
        task_delete.classList.add("task-delete");
        task_delete.addEventListener("click", event => delete_task(todo));
        task_options.appendChild(task_delete);
        // create task delete icon
        let x_mark = document.createElement("i");
        x_mark.classList.add("fa-solid", "fa-xmark");
        task_delete.appendChild(x_mark);

        // create hr break
        let hr_break = document.createElement("hr");
        task_list_item.appendChild(hr_break);

        // scroll to the newly added list item
        task_list_item.scrollIntoView();
    });
}

function strike_task(event, todo) {
    todo.checked = event.target.checked;
    update_todos();
}

function edit_task(event, todo) {
    // getting the task element and old value of the task text
    let task = event.target.parentNode.parentNode.parentNode;
    let task_text = task.querySelector(".task-text");
    let task_text_old_val = todo.content;

    // creating textarea element for new input
    let task_edit_input = document.createElement("textarea");
    task_edit_input.classList.add("task-edit-input");
    task_edit_input.value = task_text_old_val;
    task_text.innerText = "";
    task_text.appendChild(task_edit_input);
    task_edit_input.focus();
    // setting height of task edit textarea element
    task_edit_input.style.height = task_edit_input.scrollHeight + "px";

    // adding event listeners to task edit textarea element
    task_edit_input.addEventListener("keydown", (event) => {
        input_control_key_pressed = false;
        if (event.key == "Enter") {
            if (task_edit_input.value.trim() == "") delete_task(todo);
            else {
                input_control_key_pressed = true;
                todo.content = task_edit_input.value;
                update_todos();
            }
        } else if (event.key == "Escape") {
            input_control_key_pressed = true;
            todo.content = task_text_old_val;
            update_todos();
        }
    })
    task_edit_input.addEventListener("blur", () => {
        if (!input_control_key_pressed) {
            todo.content = task_edit_input.value;
            update_todos();
        }
    })
    // dynamically changing textarea height with text input
    task_edit_input.addEventListener("input", () => {
        task_edit_input.style.height = task_edit_input.scrollHeight + "px";
    })
}

function delete_task(todo) {
    todos = todos.filter(t => t != todo);
    update_todos();
}

function add_task() {
    let todo_content = main_input.value.trim();
    // pushing new todo in todos object
    if (todo_content) {
        todos.push({
            "content": todo_content,
            "checked": false,
        })
    }
    // clearing main input
    main_input.value = "";
    update_todos();
}

function update_todos() {
    localStorage.setItem("todos", JSON.stringify(todos));
    display_todos()
}

main_input.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        event.preventDefault();
        add_task();
    }
})

display_todos();