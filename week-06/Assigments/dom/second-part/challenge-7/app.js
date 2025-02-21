/**
 * Write your challenge solution here
 */
console.log("create a accordion");

const accordionList = document.querySelectorAll(".accordion-item");
const accordionButton = document.querySelectorAll(".accordion-button");
const arrowBtn = document.querySelectorAll(".arrow");

accordionButton.forEach((item) => {
  item.addEventListener("click", (event) => {
    if (item.parentElement.classList.item(1) == "active") {
      item.parentElement.classList.remove(["active"]);
    } else {
      accordionList.forEach((ele) => {
        ele.classList.remove(["active"]);
      });
      item.childNodes[1].classList.add("active");
      item.parentElement.classList.add("active");
    }
  });
});
