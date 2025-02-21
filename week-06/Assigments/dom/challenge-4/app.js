/**
 * Write your challenge solution here
 */
/**
 * Write your challenge solution here
 */
console.log("the task manager");
const taskInput = document.querySelector("#taskInput");
const submitBtn = document.querySelector("#addButton");
const taskList = document.querySelector("#taskList");
const totalTaskStatus = document.querySelector("#totalTasks");
const completedTasksStatus = document.querySelector("#completedTasks");
const completedTasksList = document.querySelectorAll(".completed");
console.log(completedTasksList);

const tasksList = document.querySelectorAll(".task-item");
let taskCount = tasksList.length;
let taskCompleteCount = completedTasksList.length;

submitBtn.addEventListener("click", (event) => {
  if (taskInput.value == "") {
    console.log("plz add the value");
  } else {
    //create a new list
    const li = document.createElement("li");
    li.className = "task-item";

    // create a new input
    const inputEle = document.createElement("input");
    inputEle.setAttribute("type", "checkbox");
    inputEle.setAttribute("class", "complete-checkbox");
    li.appendChild(inputEle);

    // change the checkbox
    inputEle.addEventListener("change", (event) => {
      if (inputEle.checked) {
        inputEle.parentElement.classList.add("completed");
        taskCompleteCount++;
      } else {
        inputEle.parentElement.classList.remove("completed");
        taskCompleteCount--;
      }
      completedTasksStatus.innerText = `Completed: ${taskCompleteCount}`;
    });

    // create a div
    const divElem = document.createElement("div");
    divElem.className = "task-text";
    divElem.innerText = taskInput.value;
    li.appendChild(divElem);

    // create a button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-button";
    deleteBtn.innerText = "Delete";

    // delete button
    deleteBtn.addEventListener("click", () => {
      li.remove();
      taskCount--;
      totalTaskStatus.innerText = `Total tasks: ${taskCount}`;
    });

    // appendChild
    li.appendChild(deleteBtn);
    taskList.prepend(li);
    taskInput.value = "";
    taskCount++;
    totalTaskStatus.innerText = `Total tasks: ${taskCount}`;
  }
});

totalTaskStatus.innerText = `Total tasks: ${taskCount}`;
completedTasksStatus.innerText = `Completed: ${taskCompleteCount}`;
