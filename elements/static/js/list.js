// --- Select letters on change
$("#select_letters").change(function() {
    let letter = $(this).val()
    let total_cards = $(".div_individual_card").length    

    $(".div_individual_card").each(function() {      
        $(this).css('display', 'grid')
    })

    if (letter != 0) {
        $(".div_individual_card").each(function() {
            if(letter != $(this).find('.input_letter_hidden').val()) {
                $(this).css('display', 'none')
                total_cards--
            }
        })
    }    

    $("#count_elements").text(total_cards)
})



