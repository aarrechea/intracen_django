// --- Close the modal
$(".close").click(function() {
    $("#myModal").css('display','none')
})



// --- Click to change elements textareas information
$(".btn-add-info").click(function() {    
    let element

    $(".btn-add-info").each(function() {
        $(this).css({
            'font-weight':'normal',
            'font-size':'1.2rem'
        })
    })

    $(this).css({
        'font-weight':'bold',
        'font-size':'1.3rem'
    })

    $(".txts").each(function() {
        $(this).css('display','none')
    })

    if($(this).data('name') == 'assess') {
        $(".assess").each(function() {
            $(this).css('display','block')
        })

    } else {
        element = $(this).data('name')
        $("#"+element+"").css('display','block')
    }
})