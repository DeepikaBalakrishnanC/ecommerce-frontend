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

            <!-- Image -->
            <div class="image-container">
                <img id="mainImage" src="${product.image}" alt="${product.title}">
            </div>

            <!-- Info -->
            <div class="detail-info">
                <h2>${product.title}</h2>

                <p class="price">
                    $<span id="unitPrice">${product.price}</span>
                </p>

                <p id="totalPrice">Total: $${product.price}</p>

                <p>${product.description}</p>

                <!-- Variations -->
                <div class="variations">
                    <label>Size:</label>
                    <select id="size">
                        <option>S</option>
                        <option>M</option>
                        <option>L</option>
                    </select>

                    <label>Color:</label>
                    <select id="color">
                        <option>Black</option>
                        <option>White</option>
                        <option>Blue</option>
                    </select>
                </div>

                <!-- Quantity -->
                <div class="quantity">
                    <button id="decrease">-</button>
                    <span id="qty">1</span>
                    <button id="increase">+</button>
                </div>

                <button id="addCartBtn">Add to Cart</button>
            </div>
        </div>
    `;

    setupInteractions(product);
}

function setupInteractions(product) {
    let quantity = 1;

    const qtyEl = document.getElementById("qty");
    const totalPriceEl = document.getElementById("totalPrice");
    const unitPrice = product.price;

    // Update price
    function updatePrice() {
        totalPriceEl.textContent = `Total: $${(unitPrice * quantity).toFixed(2)}`;
    }

    // Increase
    document.getElementById("increase").addEventListener("click", () => {
        quantity++;
        qtyEl.textContent = quantity;
        updatePrice();
    });

    // Decrease
    document.getElementById("decrease").addEventListener("click", () => {
        if (quantity > 1) {
            quantity--;
            qtyEl.textContent = quantity;
            updatePrice();
        }
    });

    // Add to cart
    document.getElementById("addCartBtn").addEventListener("click", () => {
        const size = document.getElementById("size").value;
        const color = document.getElementById("color").value;

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        cart.push({
            id: product.id,
            title: product.title,
            price: product.price,
            quantity,
            size,
            color,
            image: product.image
        });

        localStorage.setItem("cart", JSON.stringify(cart));

        alert("Added to cart successfully!");
    });

    setupZoom();
}

function setupZoom() {
    const img = document.getElementById("mainImage");

    img.addEventListener("mousemove", (e) => {
        const rect = img.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        img.style.transformOrigin = `${x}% ${y}%`;
        img.style.transform = "scale(2)";
    });

    img.addEventListener("mouseleave", () => {
        img.style.transform = "scale(1)";
    });
}

// Basic cart (localStorage)
function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(id);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Added to cart!");
}

fetchProduct();