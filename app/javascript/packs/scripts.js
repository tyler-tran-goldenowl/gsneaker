$(function() {
    // add product to cart
    $(document).on("click", '.product-add-btn', function () {
    // $(".product-add-btn").on("click", function() {

        // change product-add-btn to checked symmbol
        if ($(this).hasClass("checked") == 0) {
            let checkPNG = $(this).children("img").css("display", "block");
            $(this).html(checkPNG);
            $(this).addClass("checked");
        }

        // remove empty message if there is one
        if ($(".cart-empty").length) {
            $(".cart-empty").remove();
        }

        // add product to cart 
        let itemID = $(this).parents(".product").attr("id");
        let itemBg = $(this).parent().siblings(".product-image").css("background-color");
        let itemImg = $(this).parent().siblings(".product-image").children("img").attr("src");
        let itemName = $(this).parent().siblings(".product-name").text();
        let itemPrice = $(this).siblings(".product-price").text();
        let minusPng = $("#minus-png").attr("src");
        let plusPng = $("#plus-png").attr("src");
        let trashPng = $("#trash-png").attr("src");

        let newItem = '\
        <div class="cart-item d-flex justify-content-between" id="item-'+ itemID +'">\
            <div class="item-img">\
                <img src="'+ itemImg +'">\
            </div>\
            <div class="item-status">\
                <div class="item-name">'+ itemName +'</div>\
                <div class="item-price">'+ itemPrice +'</div>\
                <div class="item-bot d-flex justify-content-between">\
                    <div class="item-qtt d-flex">\
                        <div class="item-qtt-dec">\
                            <img src="'+ minusPng +'">\
                        </div>\
                        <div class="item-qtt-num align-self-center">1</div>\
                        <div class="item-qtt-inc">\
                            <img src="'+ plusPng +'">\
                        </div>\
                    </div>\
                    <div class="item-remove-btn text-center">\
                        <img src="'+ trashPng +'">\
                    </div>\
                </div>\
            </div>\
        </div>';
        $(".cart-items").append(newItem);
        $("#item-"+itemID).find(".item-img").css("background-color", itemBg);

        // update cart total price 
        let cartPrice = parseFloat($(".cart-price").text().substring(1));
        let itemPriceSub = parseFloat(itemPrice.substring(1));
        $(".cart-price").text('$' + (cartPrice + itemPriceSub).toFixed(2));
    });

    // decrease item quantity
    $(document).on("click", '.item-qtt-dec', function () {
        let itemCount = $(this).siblings(".item-qtt-num").text();
        if (itemCount == 1) {
            // remove item if item quantity = 1
            removeItemFromCart(this);
        }
        else {
            // decrease item quantity number 
            $(this).siblings(".item-qtt-num").text(parseInt(itemCount)-1);
            // decrease total price
            let cartPrice = parseFloat($(".cart-price").text().substring(1));
            let itemPrice = parseFloat($(this).parents(".item-bot").siblings(".item-price").text().substring(1));
            $(".cart-price").text('$' + (cartPrice - itemPrice).toFixed(2));
        }
    })

    // increase item quantity
    $(document).on("click", '.item-qtt-inc', function () {
        let itemCount = parseInt($(this).siblings(".item-qtt-num").text());
        // increase item quantity number 
        $(this).siblings(".item-qtt-num").text(itemCount+1);
        // increase total price
        let cartPrice = parseFloat($(".cart-price").text().substring(1));
        let itemPrice = parseFloat($(this).parents(".item-bot").siblings(".item-price").text().substring(1));
        $(".cart-price").text('$' + (cartPrice + itemPrice).toFixed(2));
        
    })

    // remove item from cart when click on remove button
    $(document).on("click", '.item-remove-btn', function() {
        removeItemFromCart(this);
    })


    function removeItemFromCart(element) {
        if ($(element).parents(".cart-item").length) {
            // change checked symbol to product-add-btn
            let checkPng = $("#check-png").attr("src");
            let productID = $(element).parents(".cart-item").attr("id").substring(5);
            let productAddBtn = $(".product[id='"+productID+"']").find(".product-add-btn");
            productAddBtn.html("ADD TO CART" + "<img src="+ checkPng +">");
            productAddBtn.removeClass("checked");

            // update cart total price 
            let cartCurrentPrice = parseFloat($(".cart-price").text().substring(1));
            let itemPrice = parseFloat($(element).parents(".item-bot").siblings(".item-price").text().substring(1));
            let itemCount = parseFloat($(element).parents(".item-bot").find(".item-qtt-num").text());

            let cartNewPrice = (cartCurrentPrice - itemPrice*itemCount).toFixed(2);
            $(".cart-price").text('$' + cartNewPrice);

            // remove item
            $(element).parents(".cart-item").remove();

            // add empty message if there is no item in cart 
                if ($(".cart-items").children().length - 1 == 0) {
                    let emptyMsg = '<div class="cart-empty">Your cart is empty.</div>';
                    $(".cart-items").append(emptyMsg);
                }
        }
    }
})
    