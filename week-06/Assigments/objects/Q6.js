// Problem Statement
// You are working on a system that stores user profile information from multiple sources. Sometimes, the same user has two different records, and you need to merge them into a single object.
// Challenge
// Write a function that takes two objects and merges them into one. If a key exists in both objects, the value from the second object should overwrite the value from the first object.
// Constraints
// • Both inputs should be valid objects.
// • If an object is empty, return the other object as it is.
// • If both objects are empty, return {}.

function mergeObjects(obj1, obj2) {
  // Merge obj1 and obj2 into a single object
    const newObj = { ...obj1, ...obj2 };
    return newObj;

//   const newObj = {};
//   for (const key in obj1) {
//     console.log(obj1[key]);

//     newObj[key] = obj1[key];
//   }
//   for (const key in obj2) {
//     console.log(obj2[key]);

//     newObj[key] = obj2[key];
//   }

//   return newObj;
}

const obj1 = {
  name: "arshad",
  age: 12,
};
const obj2 = {
  isSingle: true,
  age: 12,
};

const newObject = mergeObjects(obj1, obj2);
console.log(newObject);
