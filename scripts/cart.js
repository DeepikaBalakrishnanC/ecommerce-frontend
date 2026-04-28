// Get cart
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Save cart
function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

// Add to cart (MERGE duplicates)
function addItemToCart(product) {
    let cart = getCart();

    const existing = cart.find(item =>
        item.id === product.id &&
        item.size === product.size &&
        item.color === product.color
    );

    if (existing) {
        existing.quantity += Number(product.quantity);
    } else {
        cart.push({
            ...product,
            quantity: Number(product.quantity) || 1
        });
    }

    saveCart(cart);
}

// Count total items
function updateCartCount() {
    const cart = getCart();

    const total = cart.reduce((sum, item) => {
        return sum + (Number(item.quantity) || 0);
    }, 0);

    const cartCountEl = document.querySelector(".cart-count");

    if (cartCountEl) {
        cartCountEl.textContent = total;
    }
}

// Run on page load
updateCartCount();