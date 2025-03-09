console.log("this is the task container");

const taskContainer = document.querySelector(".task-container-add-btn");
const todoFormSubmit = document.querySelector("#todo-form");
const backgroundBlack = document.querySelector(".background-black");
const parentContainer = document.querySelector("#container");

const totalTask = [
  {
    cid: "1",
    title: "Personal",
    description: "This is my personal task",
    tasks: [{ tid: 1, task: "listening the stroy", createdAt: "07/03/2025" }],
  },
  {
    cid: "2",
    title: "Professional",
    description: "here we added the professional task",
    tasks: [
      { tid: 1, task: "watch the anime", createdAt: "03/03/2025" },
      { tid: 2, task: "Watch the drama", createdAt: "05/03/2025" },
    ],
  },
];

function displayElement() {
  localStorage.setItem("task", JSON.stringify(totalTask));
  console.log(taskContainer);

  const taskItems = JSON.parse(localStorage.getItem("task"));
  console.log(taskItems);

  taskItems.forEach(({ description, tasks, title }) => {
    console.log({ description, tasks, title });

    const taskContainer = createTaskContainerHeader(
      title,
      tasks.length,
      description
    );
    console.log();

    tasks.forEach(({ task, createdAt }) => {
      createTaskContainer(taskContainer.children[2], task, false, createdAt);
    });
  });
  const addTaskBtns = document.querySelectorAll(".addTaskBtn");
  const kanadanTask = document.querySelectorAll(".item-container");

  addingOrRemovingClass(kanadanTask);
  dragAndDropLogic(kanadanTask);
  addItemButtonLogic(addTaskBtns, kanadanTask);
}

displayElement();

const kanadanTask = document.querySelectorAll(".item-container");

// for setting and removing the className
function addingOrRemovingClass(targetElement) {
  const mainTaskContainerContentTasks = document.querySelectorAll(
    ".task-container-task"
  );
  targetElement.forEach((item) => {
    console.log(item);

    item.addEventListener("dragstart", () => {
      item.classList.add("flyingTask");
      console.log(item);
    });
    item.addEventListener("dragend", () => {
      item.classList.remove("flyingTask");
      console.log(item);
    });
    item.addEventListener("click", (event) => {
      const tagetElement = event.target;
      const value = tagetElement.getAttribute("class");
      // for deleting the props
      if (value == "ri-delete-bin-line") {
        console.log("delete the particular div");

        if (confirm("Are you really want to delete the task ? ")) {
          item.remove();
        }
      }

      // update the value
      if (value == "ri-pencil-line") {
        const message = prompt("you want to update the value");
        const currentElement = event.currentTarget;
        const task = currentElement.children[1];
        const date = currentElement.querySelector("span");
        const currentDate = new Date().toLocaleString();

        task.innerText = message;
        date.innerHTML = `Updated At:<span class="date">${currentDate} </span>`;
      }
    });
  });
  dragAndDropLogic(mainTaskContainerContentTasks);
}

// drag the and drop logic
function dragAndDropLogic(targetElement) {
  targetElement.forEach((singleContainer) => {
    singleContainer.addEventListener("dragover", (event) => {
      const flyingTask = document.querySelector(".flyingTask");
      singleContainer.appendChild(flyingTask);
    });
  });
}

// add item button logic
function addItemButtonLogic(targetElement) {
  console.log("add Item is click");

  targetElement.forEach((item) => {
    item.addEventListener("click", (event) => {
      const message = prompt("add new Task");
      console.log(message);
      const parent = item.parentElement.parentElement;
      const parentElement = parent.querySelector(".task-container-task");

      if (message) {
        createTaskContainer(parentElement, message);
      }
    });
  });
}

taskContainer.addEventListener("click", (event) => {
  backgroundBlack.setAttribute("style", "display:block");
  const closeBtn = document.querySelector(".close-btn");
  closeBtn.addEventListener("click", (event) => {
    backgroundBlack.setAttribute("style", "display:none");
  });
});

function submitTask() {
  todoFormSubmit.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputs = document.querySelectorAll("form>div>input");
    inputs.forEach((item) => {
      console.log(item.value);
    });
    backgroundBlack.setAttribute("style", "display:none");
  });
}

function createElementWithClass(elem = "div", className = "", text = "") {
  const createElement = document.createElement(elem);
  createElement.setAttribute("class", className);
  createElement.innerText = text;
  return createElement;
}

function createTaskContainer(
  parentElement,
  message,
  taskModification = false,
  date = ""
) {
  const createDraggableDiv = createElementWithClass(
    "div",
    "item item-container"
  );
  createDraggableDiv.setAttribute("draggable", "true");

  const createItemContainerHeader = createElementWithClass(
    "div",
    "item-container-headers"
  );

  const createParaText = `Task - ${Math.floor(Math.random() * 10)}`;
  const createPara = createElementWithClass("p", "", createParaText);

  const createTaskItemModification = createElementWithClass(
    "div",
    "task-item-modification"
  );
  createTaskItemModification.innerHTML = `<i class="ri-delete-bin-line"></i>
                  <i class="ri-pencil-line"></i>`;

  const taskPara = createElementWithClass("p", "", message);

  const currentDate = new Date().toLocaleString();
  const dateSpan = createElementWithClass("span");
  dateSpan.innerHTML =
    taskModification == true
      ? `Updated At:<span class="date">${currentDate} </span>`
      : `Created At:<span class="date">${
          date != "" ? date : currentDate
        } </span>`;

  createDraggableDiv.appendChild(createItemContainerHeader);
  createItemContainerHeader.appendChild(createPara);
  createItemContainerHeader.appendChild(createTaskItemModification);

  createDraggableDiv.appendChild(taskPara);
  createDraggableDiv.appendChild(dateSpan);

  parentElement.appendChild(createDraggableDiv);
  return parentElement;
}

function createTaskContainerHeader(
  title = "Todo",
  taskLength = 0,
  description = "Add the Item"
) {
  const container = document.querySelector("#container");

  const taskContainer = createElementWithClass("div", "task-container");

  const taskContainerHeading = createElementWithClass(
    "div",
    "task-container-heading"
  );

  taskContainer.appendChild(taskContainerHeading);
  const taskContainerTitle = createElementWithClass("h3", "", title);
  taskContainerHeading.appendChild(taskContainerTitle);
  const spanLength = createElementWithClass("span", "task-count", taskLength);
  taskContainerHeading.appendChild(spanLength);
  const taskContainerParagraph = createElementWithClass(
    "p",
    "task-container-description",
    description
  );
  taskContainer.appendChild(taskContainerParagraph);
  const taskContainerTask = createElementWithClass(
    "div",
    "task-container-task"
  );
  taskContainer.appendChild(taskContainerTask);
  const taskContainerModification = createElementWithClass(
    "div",
    "task-container-modification"
  );
  taskContainerModification.innerHTML = `<button class="addTaskBtn">
              Add Item
              <i class="ri-add-line"></i>
            </button>
            <button class="deleteTaskBtn">
              Delete
              <i class="ri-delete-bin-2-line"></i>
            </button>`;
  taskContainer.appendChild(taskContainerModification);
  container.appendChild(taskContainer);
  return taskContainer;
}

function randstr(prefix) {
  return Math.random()
    .toString(36)
    .replace("0.", prefix || "");
}
