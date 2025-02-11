// Problem: Create an array containing different types of teas.

// solution-1:
const teas = [
  "Green Tea",
  "Black Tea",
  "oolong Tea",
  "white tea",
  "Herbal Tea",
];

//solution-2:
const myTeas = new Array(
  "Green Tea",
  "Black Tea",
  "oolong Tea",
  "white tea",
  "Herbal Tea"
);

// Problem: Add 'Chamomil Tea" to the existing list of teas.
teas.push("Chamomile Tea");
// console.log(teas);

// Problem: Remove 'Oolong Tea' from the list of teas.
// Solution - 1:
const newTeas = teas.filter((item) => item !== "oolong Tea");

// Solution - 2:
// const indexOfTea = teas.findIndex((item)=> item=='oolong Tea');
const indexOfTea = teas.indexOf("oolong Tea");
console.log(indexOfTea);

if (indexOfTea > -1) {
  const newTeas = teas.slice(indexOfTea, 1);
}
console.log(newTeas);

// Problem: Filter the list to only include teas that are caffeinated.
// Solution:
const caffeinatedTea = teas.filter((item) => item !== "Herbal Tea");

// Problem: Sort the list of teas in alphabetical order.
const sortedTeas = teas.sort();

// Problem: Use a for loop to print each type of tea in the array.
for (let i = 0; i < teas.length; i++) {
  console.log(teas[i]);
}

// Problem: Use a for loop to count how many teas are caffeinated (excluding 'Herbal Tea')
let count = 0;
for (let i = 0; i < teas.length; i++) {
  if (teas[i] !== "Herbal Tea") {
    count++;
  }
}

// Problem: Use a for loop to create a new array with all tea names in uppercase.
const uppercaseTea = teas.map((item) => {
  return item.toUpperCase();
});
console.log(uppercaseTea);

// problem: Use a for loop to find the tea name with the most characters.
let mostChar = teas[0];
let index = -1;
for (let i = 1; i < teas.length; i++) {
  if (mostChar.length < teas[i].length) {
    mostChar = teas[i];
  }
}
console.log(mostChar);
// Problem: Use a for loop to reverse the order of teas in the array.
// Solution-1
console.log(myTeas.reverse());

// solution - 2:
const reversedArray = [];
for (let i = myTeas.length - 1; i >= 0; i--) {
  reversedArray.unshift(myTeas[i]);
}
console.log(reversedArray);
