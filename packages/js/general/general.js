function TWAGENERAL_card_valueChange(elem) {
    $('input[name="'+$(elem).prop('name')+'"]').parents('.twa-card').removeClass('selected');
    $('input[name="'+$(elem).prop('name')+'"]:checked').parents('.twa-card').addClass('selected');
}

