const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

const productGrid = document.getElementById("productGrid");
const loadingText = document.getElementById("loading");
const errorText = document.getElementById("error");

// Fetch products
async function fetchProducts() {
try {
loadingText.style.display = "block";

    const response = await fetch("https://fakestoreapi.com/products");

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    loadingText.style.display = "none";

    displayProducts(data);
} catch (error) {
    loadingText.style.display = "none";
    errorText.textContent = "Error loading products. Please try again.";
    console.error(error);
}

}

// Display products
function displayProducts(products) {
productGrid.innerHTML = "";

products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
        <a href="product.html?id=${product.id}">
            <img src="${product.image}" alt="${product.title}" loading="lazy">
            <h3>${product.title.substring(0, 40)}...</h3>
        </a>
        <p>$${product.price}</p>
        <button class="add-btn">Add to Cart</button>
    `;

    // Attach event listener (BEST PRACTICE)
    const btn = card.querySelector(".add-btn");
    btn.addEventListener("click", () => handleAddToCart(product));

    productGrid.appendChild(card);
});

}

// Add to cart handler
function handleAddToCart(product) {
const productData = {
id: product.id,
title: product.title,
price: product.price,
image: product.image,
quantity: 1,
size: "M",
color: "Default"
};

addItemToCart(productData);

alert("Added to cart!");

}

// Call API
fetchProducts();

const authLinks = document.querySelector(".auth-links");
const user = JSON.parse(localStorage.getItem("user"));

if (authLinks && user) {
    authLinks.innerHTML = `
        <span>Hi, ${user.name}</span>
        <button onclick="logout()">Logout</button>
    `;
}

function logout() {
    localStorage.removeItem("user");
    location.reload();
}