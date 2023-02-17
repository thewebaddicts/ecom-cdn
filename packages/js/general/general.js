$( document ).ready(function() {
    $('form.disable-on-submit').on('submit',function(){
        $(this).find('input[type=submit],button.submit').prop('disabled',true);
        return true;
    })
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
