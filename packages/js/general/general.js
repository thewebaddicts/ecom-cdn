$( document ).ready(function() {
    $('form.disable-on-submit').find('textarea,input,select').on('invalid',function(){
        // $('form.disable-on-submit').find('textarea,input,select').removeClass('invalid');
        $(this).addClass('invalid');
    });
    $('form.disable-on-submit').find('textarea,input,select').on('input,change',function(){
        $(this).removeClass('invalid');
    });

    $('form.disable-on-submit').on('submit',function(){
        $(this).find('input[type=submit],button.submit').prop('disabled',true);
        if($(this).attr('data-onsubmit') != '' && $(this).attr('data-onsubmit') && $(this).attr('data-onsubmit') !== undefined){
            eval($(this).attr('data-onsubmit'));
        }
    });
});




function TWAGENERAL_card_valueChange(elem) {
    $('input[name="'+$(elem).prop('name')+'"]').parents('.twa-card').removeClass('selected');
    $('input[name="'+$(elem).prop('name')+'"]:checked').parents('.twa-card').addClass('selected');
}

function TWAGENERAL_showMessage(title,message){
    $.fancybox.open(
        '<div class="message"><h2>' + title + "</h2><p>" + message + "</p></div>"
    );
}
