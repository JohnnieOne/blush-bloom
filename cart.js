// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart count on page load
document.addEventListener("DOMContentLoaded", () => {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.textContent = cart.length;
  }

  // Add click event to all Add to Bag buttons
  document.querySelectorAll(".add-to-bag").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();

      const name = button.dataset.name;
      const price = button.dataset.price;

      cart.push({ name, price });
      localStorage.setItem("cart", JSON.stringify(cart));

      updateCartCount();
    });
  });
});

function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}
