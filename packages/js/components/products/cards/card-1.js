var TWAProductCards_Card1_updateQuantity_timeout = false;
function TWAProductCards_Card1_updateQuantity(elem, productID, direction) {
    var store_id = $("meta[name=store-id]").attr("content");
    var token = $("meta[name=token]").attr("content");
    var lang = $("meta[name=lang]").attr("content");
    var input = elem.parent().find('.qty'),
        btnUp = elem.find('.plus'),
        btnDown = elem.find('.minus'),
        min = input.attr('min'),
        max = input.attr('max');
    var oldValue = parseFloat(input.val());
    var newVal = null;

    if (direction == "+") {
        if (oldValue >= max) {
            newVal = oldValue;
        } else {
            newVal = oldValue + 1;
        }
        input.val(parseInt(newVal));
        input.trigger("change");
        $(".cart-count ").text(parseInt($('.cart-count').html())+1);
    } else {
        if (oldValue <= min) {

            newVal = oldValue;

        } else {
            newVal = oldValue - 1;
        }
        input.val(parseInt(newVal));
        input.trigger("change");
        $(".cart-count ").text(parseInt($('.cart-count').html())-1);

    }

    clearTimeout(TWAProductCards_Card1_updateQuantity_timeout);
    TWAProductCards_Card1_updateQuantity_timeout = setTimeout(function(){
        TWAProductCards_Card1_updateQuantityAjax(elem, productID,input.val());
    },1000);
}


function TWAProductCards_Card1_updateQuantityAjax(elem, productID, quantity){

    var store_id = $("meta[name=store-id]").attr("content");
    var token = $("meta[name=token]").attr("content");
    var lang = $("meta[name=lang]").attr("content");

    $.ajax({
        type: "POST",
        url: "/api/v1/cart/update/byProductID",
        headers: {
            store: store_id,
            lang: lang,
            token: token
        },
        data: {
            productID: productID,
            quantity: quantity,
        },
        success: function (data) {
            console.log(data);

        },
    });

}