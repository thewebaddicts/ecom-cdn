function TWAPROFILE_initPhoneNumber(){
    var Phone = new Array();
    var PhoneInputs = new Array();

    $(".phone-field").each(function (PhoneIndex, elem) {
        Phone[PhoneIndex] = $(elem);

        var phone_options = TWAPROFILE_getPhoneOptions(Phone[PhoneIndex] , [
            "utilsScript", "allowDropdown" , "autoHideDialCode" , "autoPlaceholder" , "customContainer" , "customPlaceholder", "dropdownContainer",
            "excludeCountries", "formatOnDisplay", "geoIpLookup", "hiddenInput", "initialCountry", "localizedCountries", "nationalMode", "onlyCountries",
            "placeholderNumberType", "preferredCountries", "separateDialCode" ]);

        try{
            PhoneInputs[PhoneIndex] = window.intlTelInput(Phone[PhoneIndex][0], phone_options);
        }catch (e) {

        }

        $(elem).on('customBillingAddress',function (event,val){
            try{
                PhoneInputs[PhoneIndex].setCountry(val);
                $(elem).val("");
            }catch (e){}
        });

        if(Phone[PhoneIndex].val() != ""){
            PhoneInputs[PhoneIndex].setNumber(Phone[PhoneIndex].val());
        }

        Phone[PhoneIndex].on("input", function(){

            elem = $(this);
            const phoneNumber = PhoneInputs[PhoneIndex].getNumber();
            var countryData = PhoneInputs[PhoneIndex].getSelectedCountryData();
            const phone_country_code = countryData.iso2;
            elem.parent().find('input[name=full_number]').val(phoneNumber);
            var prefix = elem.attr('data-prefix');
            if(prefix){
                name = prefix + name;
            }
            elem.parent().parents('.twa-ecom-field-control').find('.phone_country_code').val(phone_country_code);
            // elem.parent().parent('.phone-input').find('input[name=phone_country_code]').val(phone_country_code);

            if(!PhoneInputs[PhoneIndex].isValidNumber()){

                elem.addClass('text-field-error');
                elem.parent().removeClass('phone-valid').addClass('phone-invalid');
            }else{
                elem.removeClass('text-field-error');
                elem.parent().removeClass('phone-invalid').addClass('phone-valid');
            }
        });
    });
}





function TWAPROFILE_getPhoneOptions(element , options){

    let obj = { "utilsScript" : "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js"};
    options.forEach(function(option , index){
        switch (option) {

            // Boolean
            case 'allowDropdown'        : obj = { ...obj , "allowDropdown" : TWAGENERAL_getAttribute(element, "data-allow-dropdown", 1)}; break;
            case 'autoHideDialCode'     : obj = { ...obj , "autoHideDialCode" : TWAGENERAL_getBooleanAttribute(element, "data-autohide-dialcode")}; break;
            case 'formatOnDisplay'      : obj = { ...obj , "formatOnDisplay" : TWAGENERAL_getBooleanAttribute(element, "data-format")}; break;
            case 'nationalMode'         : obj = { ...obj , "nationalMode" : TWAGENERAL_getBooleanAttribute(element, "data-national-mode")}; break;
            case 'separateDialCode'     : obj = { ...obj , "separateDialCode" : TWAGENERAL_getBooleanAttribute(element, "data-separate-dialcode")}; break;

            // String
            case 'autoPlaceholder'      : obj = { ...obj , "autoPlaceholder" : TWAGENERAL_getAttribute(element, "data-auto-placeholder" , 'polite')}; break;
            case 'hiddenInput'          : obj = { ...obj , "hiddenInput" : TWAGENERAL_getAttribute(element, "data-hidden-input" , "full_number")}; break;
            case 'placeholderNumberType': obj = { ...obj , "placeholderNumberType" : TWAGENERAL_getAttribute(element, "data-placeholder-type", "MOBILE")};
            case 'customContainer'      : obj = { ...obj , "customContainer" : TWAGENERAL_getAttribute(element, "data-custom-container", "")}; break;
            case 'initialCountry'       : obj = { ...obj , "initialCountry" : TWAGENERAL_getAttribute(element, "data-initial-country", "")}; break;

            // Array
            case 'excludeCountries'     : obj = { ...obj , "excludeCountries" : TWAGENERAL_getArrayAttribute(element, "data-exclude-countries", [])}; break;
            case 'preferredCountries'   : obj = { ...obj , "preferredCountries" : TWAGENERAL_getArrayAttribute(element, "data-preferred-countries", [])}; break;
            case 'onlyCountries'        : obj = { ...obj , "onlyCountries" : TWAGENERAL_getArrayAttribute(element, "data-only-countries", [])}; break;

            // Others
            case 'customPlaceholder'    : obj = { ...obj , "customPlaceholder" :TWAGENERAL_getAttribute(element, "data-custom-placeholder" , 'testj g')}; break;
            case 'dropdownContainer'    : obj = { ...obj , "dropdownContainer" : null}; break;
            case 'localizedCountries'   : obj = { ...obj , "localizedCountries" : null}; break;
            case 'geoIpLookup'          : obj = { ...obj , "geoIpLookup" : null}; break;
        };

    });

    return obj;
}



function TWAGENERAL_getBooleanAttribute(element , attr_name){
    var attr = element.attr(attr_name);
    if (typeof attr !== typeof undefined && attr !== false) {
        return attr.toLowerCase() === "true";
    }
    return false;
}

function TWAGENERAL_getAttribute(element , attr_name , fallback){
    var attr = element.attr(attr_name);
    if (typeof attr !== typeof undefined && attr !== false) {
        return attr;
    }
    return fallback;
}

function TWAGENERAL_getArrayAttribute(element , attr_name , fallback){
    var attr = element.attr(attr_name);
    if (typeof attr !== typeof undefined && attr !== false) {
        try {
            return JSON.parse(attr);
        } catch (error) {
            return [];
        }
    }
    return fallback;
}

function TWAPROFILE_checkZipCode(prefix){
    var targetContainer = $('input[name='+prefix+'postal_code]').parents('.twa-ecom-field');
    if($("select[name="+prefix+"country] option:selected").attr('data-zipcode')==0){
        targetContainer.addClass('hidden');
        targetContainer.find('input').prop("required", false);
        targetContainer.find('input').addClass('not-required');

    }else if($("select[name="+prefix+"country] option:selected").attr('data-zipcode')==1){
        if(!$('.twa-add-address-'+prefix).length >0 || !$('.twa-add-address-'+prefix).hasClass('hide')){
            targetContainer.removeClass('hidden');
            targetContainer.find('input').prop("required", true);
            targetContainer.find('input').removeClass('not-required');
        }

        if($("select[name="+prefix+"country] option:selected").attr('data-zip-format') != ''){
            targetContainer.find('input').attr("pattern", $("select[name="+prefix+"country] option:selected").attr('data-zip-format'));
        }
    }
}

function TWAPROFILE_changeState(prefix){

    var targetContainer = $("select[name='"+prefix+"state'], input[name='"+prefix+"state']").parents('.twa-ecom-field');
    if($("select[name="+prefix+"country] option:selected").attr('data-state')==0){

        targetContainer.addClass('hidden').find('input,select').prop("required", false);
        targetContainer.addClass('not-required');

    }else if($("select[name="+prefix+"country] option:selected").attr('data-state')==1){


        if($('.twa-add-address-'+prefix).length == 0 || !$('.'+prefix+'address-wrapper').hasClass('hide')){
            targetContainer.removeClass('hidden').find('input,select').prop("required", true)
            targetContainer.removeClass('not-required');
        }
        $.get($("meta[name='prefix']").attr("content")+'/account/addresses/states/list',{ 'country_code':$('select[name='+prefix+'country]').val(), 'prefix' : prefix },function(data){
            targetContainer.find('.twa-ecom-field-control').html(data);

            if($('.twa-add-address-'+prefix).hasClass('hide')){
                targetContainer.find('input').prop("required", false);
                targetContainer.find('select').prop("required", false);
            }else{
                targetContainer.find('input').prop("required", true);
                targetContainer.find('select').prop("required", true);
            }
            TWACART_loadBreakdown();
        });
    }
}



function TWAPROFILE_changeCity(prefix){

    var targetContainer = $("select[name='"+prefix+"city'], input[name='"+prefix+"city']").parents('.twa-ecom-field');
    $.get($("meta[name='prefix']").attr("content")+'/account/addresses/cities/list/',{ 'country_code':$('select[name='+prefix+'country]').val(), 'state': $('select[name='+prefix+'state]').val(), 'prefix': prefix },function(data){
        targetContainer.find('.twa-ecom-field-control').html(data);
        if(targetContainer.parent('.'+prefix+'address-wrapper').hasClass('hide')){
            targetContainer.find('input').prop("required", false);
            targetContainer.find('select').prop("required", false);
        }else{
            targetContainer.find('input').prop("required", true);
            targetContainer.find('select').prop("required", true);
        }
    });
}

function TWAPROFILE_checkCountryIntelTelInput(val){
    try{
        $('.phone-field').trigger('customBillingAddress',[val]);
    }catch (e){}
}


function TWAPROFILE_changeAddressLabel(){
    $('.twa-profile-new-address').each(function(){
        $(this).find('.address_label input').val($(this).find('.address_label_select select').val());
        $(this).find('.address_label_select select').on('change',function(){
            if($(this).val()==""){
                $(this).parents('.twa-profile-new-address').find('.address_label').removeClass('hidden');
            }else{
                $(this).parents('.twa-profile-new-address').find('.address_label').addClass('hidden');
            }
            $(this).parents('.twa-profile-new-address').find('.address_label input').val($(this).val());
        });
        // alert($(this).find('.address_label_select select').val());
    });
}




$( document ).ready(function() {
    TWAPROFILE_changeAddressLabel();
    TWAPROFILE_initPhoneNumber();
});


