import { items } from "./detail.js";

document.addEventListener("DOMContentLoaded", function () {
  let params = new URLSearchParams(window.location.search);
  let productId = parseInt(params.get("id"));

  let product = items.find((item) => item.id === productId);

  let productContainer = document.querySelector("#product-container");
  if (product) {
    productContainer.innerHTML = `
        <div class="detail" id="${product.id}">
            <div class="picture">
                <img class="product-image" src="${product.img}" alt="圖片">
            </div>
            <div class="description">
                <h2 id="name">${product.name}</h2>
                <p id="description">${product.description}</p>
                <div class="price">
                    <a id="originPrice">NT. ${product.originPrice}</a>
                    <a id="discountPrice">NT. ${product.discountPrice}</a>
                </div>
                <button class="detail-add-to-cart">
                    <img src="images/Icon/cart.png" alt="add-to-cart">
                </button> 
                <button class="back">
                    <a href="/">
                        <img src="images/Icon/home.png" alt="back-to-homepage">
                        Back
                    </a>
                </button>
            </div>
            <div class="add-success">
                <img class="check-icon" src="images/Icon/check.png">
                <p class="add-success-p">加入購物車</p>
            </div>
        </div>
    `;
  } else {
    productContainer.innerHTML = "<p>Product NOT found</p>";
  }

  let addToCartButton = document.querySelector(".detail-add-to-cart");

  addToCartButton.addEventListener("click", addToCartClicked);

  function addToCartClicked(event) {
    let successMessage = document.querySelector(".add-success");
    successMessage.style.display = "block";
    setTimeout(function () {
      successMessage.style.display = "none";
    }, 1500);
    let button = event.target;
    let product = button.closest(".detail");
    let productId = product.id;
    let productName = product.querySelector("#name").innerText;
    let price = product.querySelector("#discountPrice").innerText;
    price = parseFloat(price.replace("NT.", ""));
    let imageSrc = product.querySelector(".product-image").src;
    let cartInputValue = 1;
    addToCart(productId, productName, price, imageSrc, cartInputValue);
  }

  function addToCart(productId, productName, price, imageSrc, cartInputValue) {
    const item = { productId, productName, price, imageSrc, cartInputValue };
    console.log(item);
    let cart = localStorage.getItem("cart");
    if (!cart) {
      cart = [];
    } else {
      cart = JSON.parse(cart);
    }
    console.log(cart);
    for (let i = 0; i < cart.length; i++) {
      if (cart[i].productId === item.productId) {
        alert("此項目已加入購物車");
        return;
      }
    }
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
});
