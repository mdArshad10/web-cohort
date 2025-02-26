// Q-1: set and get the value of negative index like arr[-1]
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

// console.log(arr[-1]); // undefined

const proxyArr = new Proxy(arr, {
  get(target, prop) {
    const index = Number(prop);
    if (index <= -1) {
      return target[target.length + index];
    }
    return target[index];
  },

  set(target, prop, value) {
    const index = Number(prop);
    console.log(value);

    if (index <= -1) {
      target[target.length + index] = value;
    } else {
      target[index] = value;
    }
    return true;
  },
});

console.log(proxyArr[-5]);
proxyArr[-1] = 1000;
console.log(proxyArr[-1]);

// Note: It is the reference type so, it change the value of real array
