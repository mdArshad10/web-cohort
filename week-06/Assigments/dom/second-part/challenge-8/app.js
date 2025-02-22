/**
 * Write your challenge solution here
 */
console.log("add the element");

const cartItems = document.querySelector("#cart-items");
const totalCost = document.querySelector("#cart-total");
const btns = document.querySelectorAll("button");
const totalPriceStatus = document.querySelector("#cart-total>h3");

const cartItem = document.querySelectorAll(".cart-item");
let products = [];

function addToCart(product, price, quantity = 1) {
  const findProduct = products.find((item) => item.product === product);

  if (!findProduct) {
    products.push({ product, price, quantity });
  }
  displayList();
}

function displayList() {
  cartItems.innerHTML = "";

  products.forEach((item) => {
    const divEle = document.createElement("div");
    divEle.className = "cart-item";
    divEle.innerHTML = `<span class="ProductName">${item.product}</span>
    <div class="quantity-controls">
    <button onclick="decrementPrice('${item.product}')"> - </button>
    <span class="qunatity">${item.quantity}</span>
    <button onclick="incrementPrice('${item.product}')">+</button>
    <span class="productTotalPrice">$ ${(item.price * item.quantity).toFixed(
      2
    )}</span>
    <button class="remove" onclick="removeProduct('${
      item.product
    }')">Remove</button>
    </div>`;
    cartItems.appendChild(divEle);
  });
  displayTotalPrice();
}

function removeProduct(productName) {
  products = products.filter((item) => item.product !== productName);
  displayList();
}

function decrementPrice(productName) {
  const particularProduct = products.find(
    (item) => item.product == productName
  );

  if (particularProduct.quantity >= 1) {
    particularProduct.quantity--;
  }

  displayList();
}

function incrementPrice(productName) {
  const particularProduct = products.find(
    (item) => item.product == productName
  );
  particularProduct.quantity++;

  displayList();
}

function displayTotalPrice() {
  const productSum = products.reduce((prev, cur) => {
    const price = cur.price * cur.quantity;
    return prev + price;
  }, 0);
  console.log(productSum);
  totalPriceStatus.innerText = `Total: $${productSum.toFixed(2)}`;
}

displayList();
