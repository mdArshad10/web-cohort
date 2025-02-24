/**
 * Write your challenge solution here
 */
console.log("this is for clocking the time");
const hourHand = document.querySelector(".hour");
const minuteHand = document.querySelector(".minute");
const secondHand = document.querySelector(".second");
const digitalClock = document.querySelector(".digital-clock");

function setDigitalClock() {
  const nowDate = new Date();

  const digitalClockHourHand = document.querySelector(
    "#digital-clock-hour-hand"
  );
  const digitalClockMinuteHand = document.querySelector(
    "#digital-clock-minute-hand"
  );
  const digitalClockSecondHand = document.querySelector(
    "#digital-clock-second-hand"
  );

  digitalClockSecondHand.innerText =
    nowDate.getSeconds() > 10
      ? nowDate.getSeconds()
      : "0" + nowDate.getSeconds();
  digitalClockMinuteHand.innerText =
    nowDate.getMinutes() > 10
      ? nowDate.getMinutes()
      : "0" + nowDate.getMinutes();
  digitalClockHourHand.innerText =
    nowDate.getHours() > 10 ? nowDate.getHours() : "0" + nowDate.getHours();
}

function getSecondHand() {
  const nowDate = new Date();
  const second = nowDate.getSeconds() / 60;
  const minute = (second + nowDate.getMinutes()) / 60;
  const hour = (minute + nowDate.getHours()) / 12;

  secondHand.style.rotate = `${second * 360}deg`;
  minuteHand.style.rotate = `${minute * 360}deg`;
  hourHand.style.rotate = `${hour * 360}deg`;
}

setInterval(() => {
  setDigitalClock();
  getSecondHand();
}, 1000);
