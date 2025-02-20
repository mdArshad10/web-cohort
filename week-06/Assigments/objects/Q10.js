// Problem Statement
// In many applications, data is stored in deeply nested objects. Accessing a property from a deeply nested object requires multiple checks to avoid errors. Instead of manually checking each level, we need a function that safely retrieves a value from a nested object using a dot-separated key path.

// Challenge
// Write a function that takes a nested object and a key path string (e.g., "user.address.city") and returns the value. If any part of the path is missing, return "Key not found".

// Constraints
// • The input object should be valid.
// • The key path should be a string with dot notation (.) separating keys.
// • If a key is missing, return "Key not found".
// • The function should handle deeply nested objects.

// function getNestedValue(obj, keyPath) {
//   const arr = keyPath.split(".");
//   const modifyObj = obj[arr[0]];

//   const modifyKeyPath = arr.slice(1).join(".");
//   if (arr.length == 1) {
//     if (modifyObj == undefined) {
//       return "Key not found";
//     }
//     return modifyObj;
//   } else {
//     return getNestedValue(modifyObj, modifyKeyPath);
//   }
// }

function getNestedValue(obj, keyPath) {
  let keys = keyPath.split(".");

  let curr = obj;

  for (let key of keys) {
    if (curr[key] == undefined) {
      console.log(curr[key]);

      return "Key not found";
    } else {
      curr = curr[key];
      console.log(curr);
    }
  }

  return curr;
}

const obj = {
  user: { address: { city: { abkc: "abcd" } } },
};

const newObj = getNestedValue(obj, "user.address.city");
console.log(newObj);
