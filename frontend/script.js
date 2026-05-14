const stateBtn = document.querySelector("#stateBtn");
console.log(stateBtn)

const userdata = JSON.parse(localStorage.getItem("foodieUser"));
console.log(userdata);

if (userdata?.name) {
    stateBtn.textContent = null
    stateBtn.textContent = userdata.name
}

var swiper = new Swiper(".mySwiper", {
  loop: true,
  navigation: {
    nextEl: "#next",
    prevEl: "#prev",
  },
});

const cartIcon = document.querySelector(".cart-icon");
const cartTab = document.querySelector(".cart-tab");
const closeBtn = document.querySelector(".close-btn");
const cardList = document.querySelector(".card-list");
const cartList = document.querySelector(".cart-list");

cartIcon.addEventListener("click", () =>
  cartTab.classList.add("cart-tab-active"),
);
closeBtn.addEventListener("click", () =>
  cartTab.classList.remove("cart-tab-active"),
);

let productList = [];
let cartProduct = [];

const showCart = () => {
  productList.forEach((product) => {
    const orderCart = document.createElement("div");
    orderCart.classList.add("order-card");

    // console.log(product[image]);

    orderCart.innerHTML = `
    <div class="cart-image">
        <img src="${product.image}">
    </div>
    <h4>${product.name}</h4>
    <h4 class="price">${product.price}</h4>
    <a href="#" class="btn card-btn">Add to Cart</a>`;

    cardList.appendChild(orderCart);

    const cartBtn = orderCart.querySelector(".card-btn");
    cartBtn.addEventListener("click", (e) => {
      e.preventDefault();
      addToCart(product);
    });
  });
};

const addToCart = (product) => {
  const existingProduct = cartProduct.find((item) => item.id === product.id);
  if (existingProduct) {
    alert("Item already in your card");
    return;
  }

  cartProduct.push(product);

  let quantity = 1;
  let price = parseFloat(product.price.replace("$", ""));

  const cartItem = document.createElement("div");
  cartItem.classList.add("item");

  cartItem.innerHTML = `
      <div class="item-image">
          <img src="${product.image}">
      </div>
      <div class="detail">
          <h4>${product.name}</h4>
          <h4 class="item-total">${product.price}</h4>
      </div>
      <div class="flex">
          <a href="#" class="quantity-btn minus">
              <i class="fa-solid fa-minus"></i>
          </a>
          <h4 class="quantity-value">${quantity}</h4>
          <a href="#" class="quantity-btn plus">
              <i class="fa-solid fa-plus"></i>
          </a>
      </div>`;

  cartList.appendChild(cartItem);

  const pluseBtn = cartItem.querySelector(".plus");
  const quantityValue = cartItem.querySelector(".quantity-value");
  const itemTotal = cartItem.querySelector(".item-total");
  const minusBtn = cartItem.querySelector(".minus");

  pluseBtn.addEventListener("click", (e) => {
    e.preventDefault();
    quantity++;
    quantityValue.textContent = quantity;
    itemTotal.textContent = `$${(price * quantity).toFixed(2)}`;
  });

  minusBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (quantity > 1) {
      quantity--;
      quantityValue.textContent = quantity;
    } else {
      cartItem.remove();
      cartProduct = cartProduct.filter((item) => item.id !== product.id);
    }

    itemTotal.textContent = `$${(price * quantity).toFixed(2)}`;
  });
};

const initApp = () => {
  fetch("products.json")
    .then((response) => response.json())
    .then((data) => {
      productList = data;
      // console.log(productList);
      showCart();
    });
};

initApp();
