function TWACART_InitializeMenuScroll() {
    var startchange = $(".menu-marker");
    var offset = startchange.offset();
    var timeout;
    if ($(document).scrollTop() > 1) {
        clearTimeout(timeout);
        timeout = setTimeout(function(){ $(".twa-checkout-header").stop().addClass("compact"); },150);
    } else {
        clearTimeout(timeout);
        timeout = setTimeout(function(){ $(".twa-checkout-header").stop().removeClass("compact"); },150);
    }
}
window.addEventListener("scroll", function() {
    TWACART_InitializeMenuScroll();
});




function TWACART_GetDeliveryOtions(targetContainer, lot_id , addressID, countryID = false,  postalCode = false){
    $(targetContainer).html('loading delivery options, please be patient...');
    $.post($("meta[name='prefix']").attr("content")+'/checkout/delivery/options/get',{ lot_id: lot_id, addressID: addressID, countryID: countryID, postalCode : postalCode },function(data){
        $(targetContainer).html(data);
        $(targetContainer).find('input[type="radio"]').first().click();
        // $('#delivery_options_container').html(data);
        // UpdateCartBreakdown();
        // $('input[name="shipping_method"]:first').prop('checked',true);
        // initCartBreakdown($('input[name="shipping_method"]:first'),$('input[name="shipping_method"]:first').val());
        //
        // addressValue = $("input[name='shipping_address_id']:checked");
        // generateScheduledDelivery(addressValue.attr('data-state'));
    });
}



function TWACART_generateScheduledDelivery(state = false , session = false, id = "delivery_date_picker"){
    $(id).val('');
    if(!state || state === ''){ state = "all"; }
    var date_picker_available = $(id).length;
    if(date_picker_available > 0 ){
        var local = $("meta[name=locale]").attr("content");
        var storeID = $("meta[name=storeID]").attr("content");
        $.get($("meta[name='prefix']").attr("content")+ "/get/scheduled/delivery/"+state,
            {
                storeID: storeID
            },
            function(data){
                var lot_id=id.split('delivery_date_picker')[1];
                var currentDeliveryTypeInput = $("#delivery_schedule_type"+lot_id);
                var currentStateInput = $("#delivery_selected_state"+lot_id);
                if(data.success && data.replace){
                    var availableDates = data.listOfDays;
                    $(id).datepicker('destroy').datepicker({
                        beforeShowDay: function(d){ return TWACART_availableDate(d,availableDates); },
                        dateFormat: "dd-mm-yy"
                    });
                    if(currentStateInput.length == 0){
                        $(id).parent().append('<input type="hidden" id="delivery_selected_state'+lot_id+'" value="'+state+'" >'  +
                            '');
                    }else{
                        currentStateInput.val(state);
                    }
                    if(currentDeliveryTypeInput.length == 0){
                        $(id).parent().append('<input type="hidden" id="delivery_schedule_type'+lot_id+'" value="'+data.byTimeSlot+'" >' +
                            '');
                    }else{
                        currentDeliveryTypeInput.val(data.byTimeSlot);

                    }
                    $('#TWA_delivery_slots'+lot_id).html('');
                }else{
                    $(id).datepicker({ minDate: 0,  dateFormat: "dd-mm-yy" });
                    if(currentStateInput.length == 0){
                        $(id).parent().append('<input type="hidden" id="delivery_selected_state'+lot_id+'" value="'+state+'" >'  +
                            '');
                    }else{
                        currentStateInput.val(state);
                    }
                    if(currentDeliveryTypeInput.length == 0){
                        $(id).parent().append('<input type="hidden" id="delivery_schedule_type'+lot_id+'" value="'+data.byTimeSlot+'" >' +
                            '');
                    }else{
                        currentDeliveryTypeInput.val(data.byTimeSlot);

                    }
                    $('#TWA_delivery_slots'+lot_id).html('');
                }
            });
    }
}

function TWACART_availableDate(d,availableDates) {
    var date_day = d.getDate();
    var date_month = (d.getMonth()+1);
    var day = date_day < 10 ? '0' + date_day : '' + date_day;
    var month = date_month < 10 ? '0' + date_month : '' + date_month;
    var dmy = day + "-" + month + "-" + d.getFullYear();
    if ($.inArray(dmy, availableDates) != -1) {
        return [true, "","Available"];
    } else {
        return [false,"","unAvailable"];
    }
}


function TWACART_loadBreakdown(){
    $('.twa-checkout-right-breakdown-container').addClass('loading');
    $.get($("meta[name='prefix']").attr("content")+'/checkout/summary',{},function(data){
        $('.twa-checkout-right-breakdown-container').html(data).removeClass('loading');
    });
}


function TWACART_updateInformation(lot_id,key,value){
    $.ajax({
        url: '/api/v1/cart/info/single/update',
        type: 'post',
        headers: {
            'token' : $("meta[name=token]").attr("content"),
            'store' : $("meta[name=storeID]").attr("content")
        },
        data: {
            'lot_id' : lot_id,
             [key] : value,
        },
        success: function (data) {
            TWACART_loadBreakdown();
        }
    });

}


function TWACART_countryAndStateChange(elem,lot_id = false){
    if(lot_id === false){
        lot_id = $(elem).parents('.twa-checkout-delivery-lot').find('input[name=\'lot_id[]\']').val();
    }
    TWACART_GetDeliveryOtions('#delivery_options_'+lot_id, lot_id , false, $(this).parents('.twa-checkout-delivery-lot').find('input[name="lot_'+lot_id+'_country"]').val() ,  $(this).parents('.twa-checkout-delivery-lot').find('input[name="lot_'+lot_id+'_posta;_code"]').val());
    TWACART_generateScheduledDelivery($('select[name="lot_'+lot_id+'_state"]').val() , false,'#delivery_date_picker_'+lot_id)
}

function TWACART_billingAddNewAddress(){
    $('#checkout_billing_address').on('change',function(){
        if($(this).val() == "new"){
            $('#checkout_billing_address_form').removeClass('hidden');
            $('#checkout_billing_address_form').find('input').prop("required", true);
            $('#checkout_billing_address_form').find('select').prop("required", true);
        }else{
            $('#checkout_billing_address_form').addClass('hidden');
            $('#checkout_billing_address_form').find('input').prop("required", false);
            $('#checkout_billing_address_form').find('select').prop("required", false);
        }
    });
}




$( document ).ready(function() {
    TWACART_billingAddNewAddress();
});

