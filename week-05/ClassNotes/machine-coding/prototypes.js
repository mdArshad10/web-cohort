// polyfill => Array.forEach
if (!Array.prototype.myForEach) {
  Array.prototype.myForEach = function (userFunction) {
    for (let i = 0; i < this.length; i++) {
      userFunction(this[i], i, this);
    }
  };
}

// Array.map
if (!Array.prototype.myMap) {
  Array.prototype.myMap = function (cb) {
    let newArr = [];
    for (let i = 0; i < this.length; i++) {
      newArr.push(cb(this[i], i));
    }
    return newArr;
  };
}

// Array.filter
if (!Array.prototype.myFilter) {
  Array.prototype.myFilter = function (cb) {
    let newArr = [];
    for (let i = 0; i < this.length; i++) {
      if (cb(this[i], i, this)) {
        newArr.push(this[i]);
      }
    }
    return newArr;
  };
}

const arr = [1, 2, 3, 4, 5];
arr.myForEach((item) => {
  console.log(item);
});

const newArray = arr.myMap((item) => item * 2);
console.log(newArray);

const myNewFilter = arr.myFilter((item) => item % 3 != 0);
console.log(myNewFilter);
