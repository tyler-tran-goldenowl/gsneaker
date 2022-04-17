$(function() {
    $(".product-add-btn").on("click", function() {
        if ($(this).hasClass("checked") == 0) {
            $(this).html("<%= image_tag 'check.png' %>");
            $(this).addClass("checked");
        }
    });
})
    