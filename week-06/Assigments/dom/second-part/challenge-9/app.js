/**
 * Write your challenge solution here
 */
console.log("click on model");
const toggleBtn = document.querySelector(".toggle-btn");
const body = document.querySelector("body");
const modalPanel = document.querySelector(".panel");

body.addEventListener(
  "click",
  (event) => {
    if (modalPanel.classList.contains("active")) {
      modalPanel.classList.remove(["active"]);
    } else {
      toggleBtn.addEventListener("click", (event) => {
        modalPanel.classList.add(["active"]);


        const closeBtn = document.querySelector(".close-btn");
        closeBtn.addEventListener("click", (event) => {
          modalPanel.classList.remove(["active"]);
        });
      });
    }
  },
  { capture: true }
);
