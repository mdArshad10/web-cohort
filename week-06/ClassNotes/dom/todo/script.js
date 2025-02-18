console.log("let's create a todo list");

const inputValue = document.querySelector("input");
const addBtn = document.querySelector("#addBtn");
const taskLists = document.querySelector("#taskLists");

function createElement(HTMLelement, innerText) {
  const element = document.createElement(HTMLelement);
  if (innerText) {
    element.innerHTML = innerText;
  }
  return element;
}

addBtn.addEventListener("click", () => {
  const userInput = inputValue.value;
  
  if (userInput != "") {
    // const li = document.createElement("li");
    // const btn = document.createElement("button");
    // const span = document.createElement("span");
    // span.innerText = userInput;
    // btn.innerText = "X";
    const btn = createElement("button", "X");
    const span = createElement("span", userInput);

    const li = createElement("li");
    li.appendChild(span);
    li.appendChild(btn);
    taskLists.append(li);

    inputValue.value = "";
  } 
});
