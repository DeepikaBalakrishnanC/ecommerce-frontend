const productDetail = document.getElementById("productDetail");

// Get product ID from URL
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// Fetch single product
async function fetchProduct() {
    try {
        const res = await fetch(`https://fakestoreapi.com/products/${productId}`);
        const product = await res.json();

        displayProduct(product);
    } catch (err) {
        productDetail.innerHTML = "<p>Error loading product</p>";
    }
}

function displayProduct(product) {
    productDetail.innerHTML = `
        <div class="detail-container">
            <img src="${product.image}" alt="${product.title}">
            
            <div class="detail-info">
                <h2>${product.title}</h2>
                <p class="price">$${product.price}</p>
                <p>${product.description}</p>

                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `;
}

// Basic cart (localStorage)
function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(id);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to cart!");
}

fetchProduct();