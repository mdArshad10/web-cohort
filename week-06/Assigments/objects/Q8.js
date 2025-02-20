// Problem Statement
// In your web application, some objects contain unnecessary properties. To optimize performance, you need to remove all properties that have null or undefined values.

// Challenge
// Write a function that removes all properties with null or undefined values from an object.

// Constraints
// • The input should be a valid object.
// • If the object has no valid properties left, return {}.

function cleanObject(obj) {
  let newObj = {};
  for (const key in obj) {
    if (obj[key] !== undefined && obj[key] !== null) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}

const user = {
  name: "arshad",
  isSingle: undefined,
  bankBalance: null,
  age: 25,
};

const newObj = cleanObject(user);
console.log(newObj);
