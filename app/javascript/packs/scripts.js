$(function() {
    $(".product-add-btn").on("click", function() {
        if ($(this).hasClass("checked") == 0) {
            // $(this).text("");
            let checkPNG = $(this).children("img").css("display", "block");
            $(this).html(checkPNG);
            $(this).addClass("checked");
        }
    });

    
})
    