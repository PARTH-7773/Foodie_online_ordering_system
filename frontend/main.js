

document.addEventListener('DOMContentLoaded', () => {

    // --- SELECT ELEMENTS ---
    const hamburger = document.querySelector(".hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");
    const cartIcon = document.querySelector(".cart-icon");
    const cartTab = document.querySelector(".cart-tab");
    const closeBtn = document.querySelector(".close-btn");
    const cardList = document.querySelector(".card-list");
    const cartList = document.querySelector(".cart-list");
    const cartTotal = document.querySelector(".cart-total");
    const cartValue = document.querySelector(".cart-value");

    // --- STATE MANAGEMENT ---
    let cart = [];
    let productList = []

    // --- SWIPER INITIALIZATION ---
    // new Swiper(".mySwiper", {
    //     loop: true,
    //     navigation: {
    //         nextEl: "#next",
    //         prevEl: "#prev",
    //     },
    // });

    // --- EVENT LISTENERS ---

    if (hamburger) {
        hamburger.addEventListener("click", () => {
            mobileMenu.classList.toggle("mobile-menu-active");
        });
    }

    if (cartIcon) {
        cartIcon.addEventListener("click", () => {
            cartTab.classList.add("cart-tab-active");
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            cartTab.classList.remove("cart-tab-active");
        });
    }

    const initApp = () => {
        fetch("http://localhost:3000/api/product/get-all-products")
            .then((response) => response.json())
            .then((data) => {
                // console.log(data)
                productList = data.data;
                displayProducts(productList);

                if (localStorage.getItem("foodieCart")) {
                    cart = JSON.parse(localStorage.getItem("foodieCart"));
                    updateCart();
                }
            })
            .catch((error) => console.error("Error fetching products:", error));
    };

    const displayProducts = (items) => {
        cardList.innerHTML = "";
        if (items.length === 0) {
            cardList.innerHTML = "<h3>No items found</h3>";
            return;
        }
        // console.log(productList)
        items.forEach((product) => {
            const orderCard = document.createElement("div");
            orderCard.classList.add("order-card");
            orderCard.dataset.id = product._id;
            orderCard.innerHTML = `
            <div class="card-image">
                <img src="${product.image} " alt="${product.name}">
                <div class="wishlist-btn" data-id="${product._id}">
                    <i class="fa-solid fa-heart"></i>
                </div>
            </div>
            <h4>${product.name}</h4>
            <h4 class="price">$${product.price.toFixed(2)}</h4>
            <div class="button-group">
                <button class="btn card-btn" onclick="addToCart('${product._id}')">Add to Cart</button>
                <a href="checkout.html" class="btn buy-btn">Buy Now</a>
            </div>
        `;
            cardList.appendChild(orderCard);

            orderCard.querySelector(".buy-btn").addEventListener('click', (e) => {
                buyProduct(product._id)
            })
        });
    }
    function buyProduct(id) {
        addToCart(id)
    }


    // console.log(cart)
    window.addToCart = (productId) => {
        // console.log(productId)
        const product = productList.find((p) => p._id == productId);
        // console.log("cart item is:", cart)
        const existingItem = cart.find((item) => item._id == productId);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCart();
    };

    const updateCart = () => {
        localStorage.setItem("foodieCart", JSON.stringify(cart));
        renderCartItems();
        renderCartTotal();
    };

    const renderCartItems = () => {
        cartList.innerHTML = "";
        cart.forEach((item) => {
            // console.log('Cart is ', item)

            const div = document.createElement("div");
            div.classList.add("item");
            div.innerHTML = `
                <div class="item-image"><img src="${item.image}"></div>
                <div class="detail">
                  <h4>${item.name}</h4>
                  <h4 class="item-total">₹${(item.price * item.quantity).toFixed(2)}</h4>
                </div>
                <div class="flex">
                    <div class="quantity-btn" onclick="changeQuantity('${item._id}', -1)">-</div>
                    <h4 class="quantity-value">${item.quantity}</h4>
                    <div class="quantity-btn" onclick="changeQuantity('${item._id}', 1)">+</div>
                </div>
      `;
            cartList.appendChild(div);
        });
    };

    window.changeQuantity = (productId, change) => {
        // console.log(productId)
        const itemIndex = cart.findIndex((item) => item._id == productId);
        console.log(itemIndex)
        if (cart[itemIndex].quantity === 1 && change === -1) {
            cart.splice(itemIndex, 1);
        } else {
            cart[itemIndex].quantity += change;
        }
        updateCart();
    };

    const renderCartTotal = () => {
        const total = cart.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
        console.log("total", total)
        cartTotal.innerText = "₹" + total.toFixed(2);
        cartValue.innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
    };

    initApp()
});