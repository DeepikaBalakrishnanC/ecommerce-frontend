const cartContainer = document.getElementById("cartItems");
const totalPriceEl = document.getElementById("totalPrice");
const checkoutBtn = document.getElementById("checkoutBtn");

function loadCart() {
const cart = getCart();

cartContainer.innerHTML = "";

if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty</p>";
    totalPriceEl.textContent = "Total: $0";
    checkoutBtn.disabled = true;
    return;
}

checkoutBtn.disabled = false;

let total = 0;

cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
        <img src="${item.image}">
        <div>
            <h3>${item.title}</h3>
            <p>$${item.price}</p>
            <p>Size: ${item.size} | Color: ${item.color}</p>

            <div class="qty">
                <button onclick="decreaseQty(${index})">-</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQty(${index})">+</button>
            </div>

            <button onclick="removeItem(${index})">Remove</button>
        </div>
    `;

    cartContainer.appendChild(div);
});

totalPriceEl.textContent = `Total: $${total.toFixed(2)}`;

}

function increaseQty(index) {
let cart = getCart();
cart[index].quantity++;
saveCart(cart);
loadCart();
}

function decreaseQty(index) {
let cart = getCart();

if (cart[index].quantity > 1) {
    cart[index].quantity--;
}

saveCart(cart);
loadCart();

}

function removeItem(index) {
let cart = getCart();
cart.splice(index, 1);
saveCart(cart);
loadCart();
}

loadCart();