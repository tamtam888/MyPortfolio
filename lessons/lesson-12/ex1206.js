function onButtonClick() {
    
    let title = document.getElementById("pageTitle").textContent;
    let creditCard = document.getElementById("credit_card").value;
    let shippingAddress = document.getElementById("shipping_address").value;

    console.log("Title:", title);
    console.log("Credit Card Number:", creditCard);
    console.log("Shipping Address:", shippingAddress);
}
