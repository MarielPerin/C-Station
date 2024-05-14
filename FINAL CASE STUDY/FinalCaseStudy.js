let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#closeCart");

function openCart() {
    var cart = document.getElementById("carton");
    cart.style.right = "0";
};

function closeCart(){
    var cart = document.getElementById("carton");
    cart.style.right = "-100%";
};

if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready);
}else{
    ready();
}

function ready(){
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    console.log(removeCartButtons);
    for (var i =0;i<removeCartButtons.length;i++){
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }
}

function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
}