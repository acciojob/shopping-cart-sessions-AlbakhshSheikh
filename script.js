// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// Initialize cart from sessionStorage or empty array
let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

// Function to update sessionStorage
function updateSessionStorage() {
  sessionStorage.setItem("cart", JSON.stringify(cart));
}

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = ""; // Clear current cart display
  cart.forEach((item, index) => {
    const product = products.find((p) => p.id === item.id);
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="remove-from-cart-btn" data-id="${product.id}" data-index="${index}">Remove</button>`;
    cartList.appendChild(li);
  });

  // Add event listeners for remove buttons
  document.querySelectorAll(".remove-from-cart-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = parseInt(e.target.dataset.id);
      removeFromCart(productId);
    });
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  cart.push({ id: product.id, name: product.name, price: product.price });
  updateSessionStorage();
  renderCart();
}

// Remove item from cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateSessionStorage();
  renderCart();
}

// Clear cart
function clearCart() {
  cart = [];
  updateSessionStorage();
  renderCart();
}

// Event listeners
productList.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-to-cart-btn")) {
    const productId = parseInt(e.target.dataset.id);
    addToCart(productId);
  }
});

clearCartBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();