// Problem: Create an object representing a type of tea with properties for name, type, and caffeine content.
const teas = {
  name: "Lemon tea",
  type: "Green",
  caffine: "low",
};

// problem: Access and print the name and type properties of the tea object.
console.log(teas.name);
console.log(teas["type"]);

// Problem: Add a new property origin to the tea object.
teas.origin = "Assam";

// problem: Change the caffeine level of the tea object to 'Medium'.
teas.caffine = "Medium";

// problem: Remove the type property from the tea object.
delete teas.type;
console.log(teas);

// Problem: check if the tea object has a property origin.
console.log("origin" in teas); // way - 1
console.log(teas.origin !== undefined); // Way - 2
console.log(teas.hasOwnProperty("origin")); // Way - 3

//Problem: use a for...in loop to print all properties of the tea object.
for (const key in teas) {
  console.log(teas[key]);
}

// Problem: Create a nested Object representing different types of teas and their properties.
const myTeas = {
  greenTea: {
    name: "green Tea",
    type: "Green",
    caffine: "low",
  },
  blackTea: {
    name: "black tea",
    type: "black",
    caffine: "low",
  },
};

// Problem: Create a copy of the tea object.
// Way - 1
const myTeaStr = JSON.stringify(myTeas);
const myTeaCopy = JSON.parse(myTeaStr);

// Way - 2
const newMyTeaCopy = {};
Object.assign(newMyTeaCopy, myTeas);
newMyTeaCopy.greenTea.name = "yellow";
console.log(myTeas);
console.log(newMyTeaCopy);

// Way - 3
// Note: it is not copy the function's inside the object
// 'structuredClone' has circular reference
const newCloneTea = structuredClone(myTeaCopy);
console.log(newCloneTea);

// Problem: Add a custom method describe to the tea object that returns a description string.
teas.describe = function () {
  return this.name;
};

// Problem: Merge two objects representing different teas into one.
const person = {
  name: "arshad",
  like: ["coding", "listening songs"],
};

const address = {
  country: "IND",
  state: "WB",
};
// Way - 1
const personDetail1 = { ...person, ...address };
// Way - 2
const personDetail = Object.assign({}, person, address);
