function AUTHENTICATION_InitCodeGroup(group) {

    $("." + group)
        .find("input")
        .each(function (index, elem) {
            $(elem).on("keyup", function (event) {
                var key = event.which || event.keyCode || event.charCode;
                if (key == 8 && $(this).val() == "") {
                    $(this).prev("input").focus();
                } else
                if ($(this).val() != "") {
                    if ($(this).next("input").length > 0 && $(this).next("input").length<2) {
                        $(this).next("input").focus();
                    } else {
                        $('#otp-form').submit();
                        // if (
                        //     $("#code-input-group").data().hasOwnProperty("fnc")
                        // ) {
                        //     var myfunction =
                        //         $("#code-input-group").attr("data-fnc");
                        //
                        //     if( $("#code-input-group").data().hasOwnProperty("url")) {
                        //         var url = $("#code-input-group").attr("data-url");
                        //         myfunction = myfunction + "('"+url+"')";
                        //     }else{
                        //         myfunction = myfunction + "()";
                        //     }
                        //
                        //     eval(alert('hey'));
                        // }
                    }
                }
            });
        });
}

function AUTHENTICATION_showTimer() {
    if (time < 0) {
        clearInterval(timer);
        $('#send-login-otp-btn').prop('disabled' ,false);
        $('#send-login-otp-btn').removeClass('disabled');
        $('#send-login-otp-btn .send' ).removeClass('d-none');
        $('#send-login-otp-btn .sending' ).addClass('d-none');
        $('#send-login-otp-btn .sent' ).addClass('d-none');
        $('#timerDiv').html('');
        $('.resend-pin').removeClass('d-none');
        $('#AUTHENTICATION_otp-send-fail').removeClass('d-none');
        return;
    }
    function pad(value) {
        return (value < 10 ? '0' : '') + value;
    }

    $('#timerDiv').text(Math.floor(time / 60) + ':' + pad(time % 60));
    time--;
}
function AUTHENTICATION_start_timer(expires_after){
    time = expires_after;
    AUTHENTICATION_showTimer();
    timer = setInterval(AUTHENTICATION_showTimer, 1000);

}

function TWA_AUTH_GetHeight(offset){
    var Height = document.body.offsetHeight;
    var scrollHeight = document.body.scrollHeight
    if(Height < scrollHeight){ Height = scrollHeight; }

    Height += offset;

    return Height;
}

function TWA_AUTH_postMessage(obj){
    try{
        MessageInvoker.postMessage(JSON.stringify(obj));
    }catch (e) {
        window.parent.postMessage(JSON.stringify(obj), '*');
    }
}
function togglePassword(elem){
    let input = elem.parent().find('input');
    let type = input.attr('type');
    input.attr('type' , input.attr('type') == "password" ? 'text' : 'password');

    elem.find('i').toggleClass('fa-eye-slash');

}