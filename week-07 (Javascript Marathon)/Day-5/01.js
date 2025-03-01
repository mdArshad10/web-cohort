// Debounce Concept
function pataNhi(fn, delay) {
  let myId;
  return function (...args) {
    clearTimeout(myId);
    myId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

const greet = (name) => {
  console.log(`welcome ${name}`);
};

const sachMeNhiPat = pataNhi(() => greet("arshad"), 3000);
console.log("starting");

sachMeNhiPat();
sachMeNhiPat();

console.log("Ending");

// Story: Ek Choti bacchi hai ji ko chocolate chahey tha. to use ki mami ne kaha tumhi 3 minutes ki bad mile per age is bech dobara mango gaye to 3 minute extend ho jaye ga. to jise hi choti bacchi 3 minutes se 1 second phile bhi manga phir se use se 3 mintues wait karna hoga.
