import {items} from "./detail.js";

document.addEventListener('DOMContentLoaded', function(){
    let params = new URLSearchParams(window.location.search);
    let productId = parseInt(params.get("id"));

    let product = items.find(item => item.id === productId);

    let productContainer = document.querySelector("#product-container");
    if(product){
        productContainer.innerHTML = `
            <div class="detail">
                <div class="picture">
                    <img src="${product.img}" alt="圖片">
                </div>
                <div class="description">
                    <h2 id="name">${product.name}</h2>
                    <p id="description">${product.description}</p>
                    <div class="price">
                        <a id="originPrice">NT. ${product.originPrice}</a>
                        <a id="discountPrice">NT. ${product.discountPrice}</a>
                    </div>
                    <button class="add-to-cart" onclick="">
                        <img src="images/Icon/cart.png" alt="add-to-cart">
                        AddToCart
                    </button>
                </div>
            </div>
        `;
    } else{
        productContainer.innerHTML = '<p>Product NOT found</p>';
    }
});

// alert("hi, it's me!")"

// button.addEventListener("click", alert("hi, it's me!"));

// function addToCart(){
//     alert("hi, it's me!");
// };
