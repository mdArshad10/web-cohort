const startButton = document.querySelector("button");

startButton.addEventListener("click", (event) => {
  const inputEle = document.querySelector("input");
  const countdownDisplay = document.querySelector("#countdownDisplay");
  if (isNaN(inputEle.value)) {
    countdownDisplay.innerText = "plz add the valid number";
  }
  if (inputEle.value < 0) {
    countdownDisplay.innerText = "plz add the negative number";
  }
  const timerFunction = countDownFunction(
    Number(inputEle.value),
    countdownDisplay
  );
  timerFunction();
});

const countDownFunction = (timer, elem) => {
  let countDownTimer = timer;
  return function () {
    const id = setInterval(() => {
      elem.innerText = countDownTimer;
      if (countDownTimer == 0) {
        elem.innerText = "Time up ⏰";
        clearInterval(id);
      }
      countDownTimer--;
    }, 1000);
  };
};
