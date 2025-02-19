console.log("this is the Review Collectors");

const reviewForm = document.querySelector("form");
const reviewLists = document.querySelector("ul");

reviewForm.addEventListener("submit", (ev) => {
  ev.preventDefault();
  const userInput = reviewForm[0].value;
  const createListElement = document.createElement("li");
  createListElement.innerText = userInput;
  reviewLists.appendChild(createListElement);
  reviewForm[0].value = "";
});
