let cart = JSON.parse(localStorage.getItem("cart")) || [];

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderCart();
});

// Add to bag buttons
document.querySelectorAll(".add-to-bag").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();

    const name = button.dataset.name;
    const price = parseFloat(button.dataset.price);

    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
  });
});

// Update cart count
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

// Render cart page
function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (!cartItems || !cartTotal) return;

  cartItems.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Coșul tău de cumpărături este gol.</p>";
    cartTotal.textContent = "$0.00";
    return;
  }

  cart.forEach((item, index) => {
    let itemPrice = parseFloat(item.price);
    total += itemPrice;

    cartItems.innerHTML += `
      <div class="d-flex justify-content-between align-items-center border-bottom py-3">
        <div>
          <h6 class="mb-1">${item.name}</h6>
          <small>$${itemPrice.toFixed(2)}</small>
        </div>
        <button class="btn btn-sm btn-outline-danger" onclick="removeItem(${index})">
          Elimină
        </button>
      </div>
    `;
  });

  cartTotal.textContent = `$${parseFloat(total).toFixed(2)}`;
}

// Remove item
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

// Proceed to checkout - clear cart
document.addEventListener("DOMContentLoaded", () => {
  const checkoutBtn = document.getElementById("procced-to-checkout");

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      cart = [];
      localStorage.removeItem("cart");

      updateCartCount();
      renderCart();

      // Show Bootstrap modal
      const checkoutModal = new bootstrap.Modal(
        document.getElementById("checkoutModal"),
      );
      checkoutModal.show();
    });
  }
});
