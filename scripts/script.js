"use strict";



$(document).ready(() => {

    let inCart =[]; // variable for our customers cart

    const productList = [{
        name: "N-95 MASKS",
        category: "MEDICAL PRODUCTS",
        description: "AVALABLE (10% OFF)",
        price: 1000,
        src: "images/vigor-00.jpg"
    },
    {
        name: "MEDICINAL PILLS",
        category: "MEDICAL PRODUCTS",
        description: "AVALABLE (10% OFF)",
        price: 200,
        src: "images/vigor-01.svg"
    },
    {
        name: "FIRST-AID KIT",
        category: "MEDICAL PRODUCTS",
        description: "AVALABLE (10% OFF)",
        price: 250,
        src: "images/vigor-02.svg"
    },
    {
        name: "HAND SANITIZER",
        category: "MEDICAL PRODUCTS",
        description: "AVALABLE (10% OFF)",
        price: 150,
        src: "images/vigor-03.svg"
    },
    {
        name: "SURGICAL GLOVES",
        category: "MEDICAL PRODUCTS",
        description: "AVALABLE (10% OFF)",
        price: 200,
        src: "images/vigor-04.svg"
    },
    {
        name: "NOTEBOOKS",
        category: "STATIONARY PRODUCTS",
        description: "AVALABLE (10% OFF)",
        price: 30,
        src: "images/vigor-05.svg"
    },
    {
        name: "PENS",
        category: "STATIONARY PRODUCTS",
        description: "AVALABLE (10% OFF)",
        price: 5,
        src: "images/vigor-06.svg"
    },
    {
        name: "STATIONARY GIFTS",
        category: "STATIONARY PRODUCTS",
        description: "AVALABLE (10% OFF)",
        price: "VARIES",
        src: "images/vigor-07.svg"
    },
    {
        name: "WRITING PAD",
        category: "STATIONARY PRODUCTS",
        description: "AVALABLE (10% OFF)",
        price: 50,
        src: "images/vigor-08.svg"
    }
    ];

// this displays vigors/potion items to html
const pageSetup = () => {
    for (let i=0; i <= 8; i++) {
        $(".flex-container").append(`
        <div class="vigor">
       
        <img class="add-to-cart" id="${i}" src="images/outline-exposure_plus_1-24px.svg">
      
        <img class="product-img" src="images/vigor-0${i}.jpg">
        <div class="product-info-box">
            <p class="product-text">${productList[i].name}</p>
            <p class="product-text">${productList[i].category}</p>
            <p class="product-text">${productList[i].description}</p>
            <p class="product-text">${productList[i].price}</p>
        </div>
    </div>
    `)
    }
}

function myFunction() {
    alert("I am an alert box!");
  }

// fills cart from our customers product array
const populateCart = () => {

    const emptyCart= $(".cart-items");
    let subtotal = 0;
    let total;


    emptyCart.html(""); // clears container

    emptyCart.html(""); // clears container each time and item is added

    $(".totals").html("") //clears previous subtotal

    //populates all cart-type of windows
    for (let j=0; j < inCart.length; j++) {
        
        //prepends all cart-items in array
        $(".cart-items").prepend(`
        <section class="item-slot">
            <img class="cart-product-img" src="${inCart[j].src}">
            <p class="checkout-item">${inCart[j].name} Price: $${inCart[j].price}</p>
            <img class="delete-item" id="${j}" src="images/delete.png">
        </section>
        `);

        //calculate subtotal
        subtotal += inCart[j].price;

        //calculate final total
        total = (subtotal  * .06 + subtotal).toFixed(2)

        //add an element after items containing all totals and calculations

        $(".totals").html("") //clears previous subtotal
        $(".cart-items").after(`
        <div class="totals">
        <p class="subtotal">Subtotal: $${subtotal}</p>
        <p class="tax">Tax: $${(subtotal * .06).toFixed(2)}</p>
        <p class="total" >Total: $${total}</p>
        `);

        //adds item total next to cart
        $(".cartNum").remove() //clears previous subtotal
        $("header").append(`
        <div class="cartNum">${j+1}</div>
        `);

    }

    // adds final total to payment page
    $(".payment-pg-total").html("")
    $(".payment-pg-total").append(`
    <p class="your-total">Your total: $${total}</p>
    `);

    // calculates cash

    $(".cash-submitted").on("keyup", function() {
        let cash = $(this).val();
        let userChange = (cash-total).toFixed(2);
    
        $(".your-change").html("");
        $(".payment-form-2").append(`
            <p class="your-change">Your change: $${userChange}</p>
            `);
    });


}


    //event listener to push item to customer product array
    $(document).on("click", ".add-to-cart", (event) => {
        let cartItem = $(event.target).attr("id");
        inCart.push(productList[cartItem]);

        populateCart();
    });

    //event listener to delete item from shopping cart arry
    $(document).on("click", ".delete-item", (event) => {
        let deleteAtIndex = $(event.target).attr("id");
        inCart.splice(deleteAtIndex, 1);
        
        populateCart();
    });



    // click events for show/hiding pop ups

    //click events to hide for close "X" buttons on all containers
    $(document).on("click", ".cart-x, .checkout-x, .payment-x, .reciept-x", (event) => {

        if ($(event.target).hasClass("cart-x")) {
                $(".cart-container").hide();
            } else if ($(event.target).hasClass("checkout-x")) {
                $(".checkout-container").hide();
                $(".overlay").hide();
            } else if ($(event.target).hasClass("payment-x")) {
                $(".payment-container").hide();
                $(".overlay").hide();
            } else if ($(event.target).hasClass("reciept-x")) {
                $(".receipt-container ").hide();
                $(".overlay").hide();
            }       
    });

    //mouseover event to change cursor to a pointer when you're on a clickable element
    $(document).on("mouseover", ".material-icons, .cart, button, .add-to-cart, .delete-item", (event) => {
        $(event.target).css("cursor", "pointer");
    });

    //click event for the shopping cart icon in the menu to show 
    $(document).on("click", ".cart", (event) => {
        $(".cart-container").fadeIn("fast");
    });

    $(document).on("mouseover", ".material-icons, .cart, button, .add-to-cart, .delete-item", (event) => {
        $(event.target).fadeTo(100, 0.5);
    });
    $(document).on("mouseout", ".material-icons, .cart, button, .add-to-cart, .delete-item", (event) => {
        $(event.target).fadeTo(100, 1);
    });

    //click events for checkout system workflow
    $(document).on("click", ".checkout-btn, .payment-btn, .submit-btn, .receipt-x", (event) => {
        
        if ($(event.target).hasClass("checkout-btn")) {
            $(".overlay").show();
            $(".checkout-container").fadeIn("fast");
            $(".cart-container").fadeOut("fast");
        } else if ($(event.target).hasClass("payment-btn")) {
            $(".overlay").show();
            $(".payment-container").fadeIn("fast");
            $(".checkout-container").fadeOut("fast");
        } else if ($(event.target).hasClass("submit-btn")) {
            $(".overlay").show();
            $(".receipt-container").fadeIn("fast");
            $(".payment-container").fadeOut("fast");
            $(".delete-item").hide();
        } else if ($(event.target).hasClass("receipt-x")) {
            $(".overlay").hide();
            $(".receipt-container").fadeOut("fast");
            $(".item-slot").remove();
            $(".totals").remove();
            $(".total").remove();
            $(".cart-items").html(`<p>Your cart is empty.</p>`);
            $(".cartNum").remove();
        }
   
    });


    pageSetup();
});