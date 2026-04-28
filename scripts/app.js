// const hamburger = document.querySelector(".hamburger");
// const navLinks = document.querySelector(".nav-links");

// hamburger.addEventListener("click", () => {
//     navLinks.classList.toggle("active");
// });

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

function displayProducts(products) {
    productGrid.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" loading="lazy">
            <h3>${product.title.substring(0, 40)}...</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart()">Add to Cart</button>
        `;

        productGrid.appendChild(card);
    });
}

// Call function
fetchProducts();

// Cart function
function addToCart() {
    alert("Product added to cart!");
}