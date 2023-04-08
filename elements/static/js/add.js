// --- Focus on textareas
$("#div_additional_information").on('focus', '.textarea', function(){
    if($(this).attr('data-add') == 'other') {
        $(this).attr('rows', '12')
    } else {
        $(this).attr('rows', '4')
    }    
})

$(".textarea").focusout(function() {
    $(this).attr('rows', '2')
})