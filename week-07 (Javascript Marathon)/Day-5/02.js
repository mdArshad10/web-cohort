// Throttling Concept
function ptaNhi(fn, delay) {
  let myId = null;
  return (...args) => {
    if (myId == null) {
      fn(...args);
      myId = setTimeout(() => {
        myId = null;
      }, delay);
    }
  };
}

const greet = (name) => {
  console.log(`${name} welcome to throttling`);
};

const sachMeNhiPat = ptaNhi(() => greet("arshad"), 3000);

console.log("starting");
sachMeNhiPat();
sachMeNhiPat();
sachMeNhiPat();
sachMeNhiPat();
sachMeNhiPat();
sachMeNhiPat();
console.log("ending");
