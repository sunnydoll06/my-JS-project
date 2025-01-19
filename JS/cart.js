if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready() {
    displayCart();
    updateCartTotal();

    let removeItems = document.querySelectorAll(".remove-item");
    console.log(removeItems);
    for(let i = 0; i < removeItems.length; i++) {
    let button = removeItems[i];
    button.addEventListener("click", removeCartItem);
    }

    let quantityInputs = document.querySelectorAll(".cart-quantity-input");
    console.log(quantityInputs);
    for(let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    console.log("over");
}

function removeCartItem(event) {
    let buttonClicked = event.target;
    let targetRow = buttonClicked.closest(".cart-row");
    targetRow.remove();
    let targetId = targetRow.id;
    console.log(targetId);
    let cart = JSON.parse(localStorage.getItem('cart'));
    for(i=0; i<cart.length; i++){
        if(cart[i].productId === targetId){
            cart.splice(i, 1);
        };
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(cart);
    updateCartTotal();
}

function quantityChanged(event){
    let input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
    };
    let targetId = input.closest(".cart-row").id;
    console.log(targetId);
    let inputValue = input.value;
    console.log(inputValue);
    let cart = JSON.parse(localStorage.getItem('cart'));
    for(i=0; i<cart.length; i++){
        if(cart[i].productId === targetId){
            cart[i].cartInputValue = inputValue;
        };
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(cart);
    updateCartTotal();
}

function updateCartTotal(){
    let cartRows = document.querySelectorAll(".cart-row");
    let total = 0;
    for(let i=0; i<cartRows.length; i++){
        let cartRow = cartRows[i];
        let priceElement = cartRow.querySelector(".cart-single-price").innerText;
        let quantityElement = cartRow.querySelector(".cart-quantity-input");
        let price = parseFloat(priceElement.replace('單價 NT.', ''));
        let quantity = quantityElement.value;
        total = total +(price * quantity);
    }
    document.querySelector(".cart-total-price").innerText = `總金額 NT. `+ total;
}

function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    let cartElement = document.querySelector(".cart-grid");
    cartElement.innerHTML = "";
    for(i=0; i<cart.length; i++){
        cartElement.innerHTML += `
        <div class="cart-row" id="${cart[i].productId}">
            <div class="cart-item cart-column">
                <img class="cart-item-image" src="${cart[i].imageSrc}" width="100px">
                <div class="cart-item-information">
                    <span class="cart-item-name cart-column">${cart[i].productName}</span>
                    <div class="cart-quantity">
                        <label class="input-label" for="${cart[i].productId}.input">數量：</label>
                        <input class="cart-quantity-input" id="${cart[i].productId}.input" type="number" value="${cart[i].cartInputValue}" min="1">
                    </div>
                    <span class="cart-single-price cart-column">單價 NT.${cart[i].price}</span>
                </div>
            </div>
            <div class="cart-column">
                <button class="remove-item">刪除 X</button>
            </div>
        </div>
        `;
    }
    console.log(cart);
}

