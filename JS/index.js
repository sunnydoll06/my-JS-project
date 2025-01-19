let newArrival = document.getElementById("newArrival");
let shoppingCart = document.getElementById("shoppingCart");
let about = document.getElementById("about");

newArrival.addEventListener("mouseover", function changeText1() {newArrival.innerHTML = "New Arrival";});
newArrival.addEventListener("mouseout", function resetText1() {newArrival.innerHTML = "最新商品";});
shoppingCart.addEventListener("mouseover", function changeText2() {shoppingCart.innerHTML = "Cart";});
shoppingCart.addEventListener("mouseout", function resetText2() {shoppingCart.innerHTML = "購物車";});
about.addEventListener("mouseover", function changeText3() {about.innerHTML = "About";});
about.addEventListener("mouseout", function resetText3() {about.innerHTML = "關於";});

import {items} from './newItem.js';
console.log(items);

let html = "";
for(let i=0; i<items.length; i++){
    html += `
        <div class="product-block" id="${items[i].id}">
            <a href="product.html?id=${items[i].id}">
                <div class="product-image-row">
                    <img class="product-image" src="${items[i].img}">
                    <p class="product-discount">${items[i].discount}</p>
                </div>
                <div class="product-information">
                    <a class="product-name">${items[i].name}</a>
                    <div class="add-success">
                        <img class="check-icon" src="images/Icon/check.png">
                        <p class="add-success-p">加入購物車</p>
                    </div>
                    <div class="product-price-row">
                        <div class="product-price">
                            <a class="origin-price">NT.${items[i].originPrice}</a>
                            <a class="discount-price">NT.${items[i].discountPrice}</a>
                        </div>
                        <button class="add-to-cart">
                            <img src="images/Icon/cart.png" alt="add-to-cart">
                        </button>
                    </div>
                </div>
            </a>
        </div>
    `;
}

document.querySelector(".product-grid").innerHTML = html;


let addToCartButtons = document.querySelectorAll(".add-to-cart");

addToCartButtons.forEach(button => {
    button.addEventListener("click", function() {
        let successMessage = document.querySelector(".add-success");
        successMessage.style.display = "block";
        setTimeout(function(){
            successMessage.style.display = "none";
        }, 1500);
    });
})

for(let i=0; i<addToCartButtons.length; i++){
    let addToCartButton = addToCartButtons[i];
    addToCartButton.addEventListener("click", addToCartClicked);
}

function addToCartClicked(event){
    let button = event.target;
    let product = button.closest(".product-block");
    let productId = product.id;
    let productName = product.querySelector(".product-name").innerText;
    let price = product.querySelector(".discount-price").innerText;
    price = parseFloat(price.replace('NT.', ''));
    let imageSrc = product.querySelector(".product-image").src;
    let cartInputValue = 1;
    addToCart(productId, productName, price, imageSrc, cartInputValue);
}

function addToCart(productId, productName, price, imageSrc, cartInputValue){
    const item = {productId, productName, price, imageSrc, cartInputValue};
    console.log(item);
    let cart = localStorage.getItem("cart");
    if(!cart){
        cart = [];
    } else {
        cart = JSON.parse(cart);
    };
    console.log(cart);
    for(let i=0; i<cart.length; i++){
        if(cart[i].productId === item.productId){
            alert('此項目已加入購物車')
            return;
        }
    };
    cart.push(item);
    localStorage.setItem("cart", JSON.stringify(cart));
};


let searchInput = document.querySelector("#search-input");
let productBlocks = document.querySelectorAll(".product-block");
let searchButton = document.querySelector("#search-input-btn");
searchButton.addEventListener("click", function(){
    let searchInputValue = searchInput.value;
    productBlocks.forEach(block => {
        let productName = block.querySelector(".product-name").innerText;
        if(productName.includes(searchInputValue)){
            block.classList.remove("hidden");
        } else {
            block.classList.add("hidden");
        };
    });
    searchInput.value = "";
});