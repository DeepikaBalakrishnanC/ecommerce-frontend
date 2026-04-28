// const hamburger = document.querySelector(".hamburger");
// const navLinks = document.querySelector(".nav-links");

// hamburger.addEventListener("click", () => {
//     navLinks.classList.toggle("active");
// });

const productGrid = document.getElementById("productGrid");

// Fetch products from API
fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(data => {
        displayProducts(data);
    })
    .catch(err => console.log(err));

function displayProducts(products) {
    productGrid.innerHTML = "";

    products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("product-card");

        card.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title.substring(0, 40)}...</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart()">Add to Cart</button>
        `;

        productGrid.appendChild(card);
    });
}

// Basic cart function
function addToCart() {
    alert("Product added to cart!");
}