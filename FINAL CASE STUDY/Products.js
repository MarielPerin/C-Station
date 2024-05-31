document.addEventListener('DOMContentLoaded', ready);

function ready() {
    var removeButtons = document.getElementsByClassName('cart-remove');
    for (var i = 0; i < removeButtons.length; i++) {
        var button = removeButtons[i];
        button.addEventListener('click', removeItem);
    }
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }
    var addToCart = document.getElementsByClassName('addCart');
    for (var i = 0; i < addToCart.length; i++) {
        var button = addToCart[i];
        button.addEventListener('click', addToCartClicked);
    }

    document.getElementsByClassName('btnBuy')[0].addEventListener('click', buyButtonClicked);

    // Get the modal
    var modal = document.getElementById("paymentModal");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // when the btnBuy is clicked, it will display the modal
    document.getElementsByClassName('btnBuy')[0].addEventListener('click', function () {
        var cartContent = document.getElementsByClassName('cartContent')[0];
        if (cartContent.children.length === 0) {
            alert('Your cart is empty. Please add items to the cart first.');
            return;
        }
        modal.style.display = "block";
    });

    // When the user clicks on <span> (x), the modal will close
    span.onclick = function () {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, it will also close
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Checkout button
    document.getElementById('checkoutButton').addEventListener('click', function () {
        var deliveryForm = document.getElementById('deliveryForm');
        var paymentForm = document.getElementById('paymentForm');

        var fullName = deliveryForm.fullName.value;
        var address = deliveryForm.address.value;
        var phoneNumber = deliveryForm.phoneNumber.value;

        var selectedPaymentMethod = paymentForm.paymentMethod.value;

        if (!fullName || !address || !phoneNumber || !selectedPaymentMethod) {
            alert('Please fill out all the fields in the delivery and payment forms');
            return;
        }

        var checkoutMessage = "Delivery Information:\n";
        checkoutMessage += "Full Name: " + fullName + "\n";
        checkoutMessage += "Address: " + address + "\n";
        checkoutMessage += "Phone Number: " + phoneNumber + "\n\n";
        checkoutMessage += "Payment Method: " + selectedPaymentMethod+ "\n\n";
        checkoutMessage += "Your order will be received after 3 days.";


        alert(checkoutMessage);

        var modal = document.getElementById("paymentModal");
        modal.style.display = "none";

        var cartContent = document.getElementsByClassName('cartContent')[0];
        while (cartContent.hasChildNodes()) {
            cartContent.removeChild(cartContent.firstChild);
        }
        updateTotal();
    });
}

function buyButtonClicked() {
    // This function is now handled by the modal display logic above
}

function removeItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    updateTotal();
}

function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

function addToCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var pName = shopProducts.getElementsByClassName('pName')[0].innerText;
    var price = shopProducts.getElementsByClassName('price')[0].innerText;
    var productImg = shopProducts.getElementsByClassName('productImg')[0].src;
    addProductToCart(pName, price, productImg);
    updateTotal();
}

function addProductToCart(pName, price, productImg) {
    var cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cartBox');
    var cartItems = document.getElementsByClassName('cartContent')[0];
    var cartItemsNames = cartItems.getElementsByClassName('cart-product-title');

    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == pName) {
            alert('You have already added this item to the cart');
            return;
        }
    }

    var cartBoxContent = `
        <img src="${productImg}" alt="" class="cartImg">
        <div class="detail-box">
            <div class="cart-product-title">${pName}</div>
            <div class="cartPrice">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <button type="button" class="cart-remove">Remove</button>`;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
}


function updateTotal() {
    var cartContent = document.getElementsByClassName('cartContent')[0];
    var cartBoxes = cartContent.getElementsByClassName('cartBox');
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cartPrice')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
        var price = parseFloat(priceElement.innerText.replace("₱", ""));
        var quantity = quantityElement.value;
        total += price * quantity;
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('totalPrice')[0].innerText = '₱' + total.toFixed(2);

    // Reset total to ₱0.00 if the cart is empty
    if (cartBoxes.length === 0) {
        document.getElementsByClassName('totalPrice')[0].innerText = '₱0.00';
    }
}
