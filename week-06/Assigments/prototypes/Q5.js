// Problem statement
// Create a Shopping Cart system where items can be added with a price. Implement a method getTotalPrice() that calculates the total price of all items in the cart.

// Challenge
// • Implement a constructor function ShoppingCart that initializes an empty items array.
// • Attach addItem(price) to the prototype to add items.
// • Attach getTotalPrice() to calculate the total price of items.

function ShoppingCart() {
  this.prices = [];
}

ShoppingCart.prototype.addItem = function (price) {
  this.prices.push(price);
};

ShoppingCart.prototype.getTotalPrice = function () {
  const sum = this.prices.reduce((preVal, currVal) => preVal + currVal, 0);
  return sum;
};

const shoppingCart = new ShoppingCart();
console.log(shoppingCart.prices);
shoppingCart.addItem(10);
shoppingCart.addItem(20);
shoppingCart.addItem(30);
shoppingCart.addItem(40);
console.log(shoppingCart.prices);

console.log(shoppingCart.getTotalPrice());
