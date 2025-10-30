// -----------------------------
// Shopping Cart Script
// -----------------------------

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM references
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const clearCartBtn = document.getElementById('clear-cart');
const addButtons = document.querySelectorAll('.add-to-cart');

// Add items to cart
addButtons.forEach(button => {
  button.addEventListener('click', () => {
    const item = button.closest('.menu-item');
    const name = item.dataset.name;
    const price = parseFloat(item.dataset.price);

    const existingItem = cart.find(i => i.name === name);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    updateCart();
  });
});

// Update cart display
function updateCart() {
  cartItems.innerHTML = '';

  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.classList.add('flex', 'justify-between', 'items-center', 'py-2');
    li.innerHTML = `
      <span>${item.name} × ${item.quantity}</span>
      <span class="flex items-center gap-2">
        <span>$${(item.price * item.quantity).toFixed(2)}</span>
        <button 
          class="remove bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
          data-index="${index}">
          X
        </button>
      </span>
    `;
    cartItems.appendChild(li);
  });

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartTotal.textContent = `Total: $${total.toFixed(2)}`;

  localStorage.setItem('cart', JSON.stringify(cart));

  document.querySelectorAll('.remove').forEach(btn => {
    btn.addEventListener('click', e => {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      updateCart();
    });
  });
}

// Clear cart
clearCartBtn.addEventListener('click', () => {
  cart = [];
  localStorage.removeItem('cart');
  updateCart();
});

// Initialize
document.addEventListener('DOMContentLoaded', updateCart);
