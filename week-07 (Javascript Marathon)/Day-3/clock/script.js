console.log("this is the clock");

const time = document.querySelector("#time");
const date = document.querySelector("#date");

function getTime() {
  const nowTime = new Date();
  const hour = nowTime.getHours() % 12 || 12;
  const minute = nowTime.getMinutes();
  const second = nowTime.getSeconds();

  const setSeconds = second < 10 ? `0${second}` : `${second}`;
  const setMinutes = minute < 10 ? `0${minute}` : `${minute}`;
  const setHours = hour < 10 ? `0${hour}` : `${hour}`;
  const ampm = nowTime.getHours >= 12 ? `PM` : "AM";
  time.innerText = `${setHours} : ${setMinutes} : ${setSeconds} ${ampm} `;
  getDate();
}

function getDate() {
  const nowDate = new Date();
  //   date.innerText = nowDate.toLocaleDateString();
  date.innerText = nowDate.toDateString();
}

setInterval(getTime, 1000);

getTime();
