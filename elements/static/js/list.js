// --- When page is ready
$(document).ready(() => {
    if($("#message").val() != "") {
        $("#div_elements_title h1").text($("#message").val())
        $("#div_elements_title h1").css({
            'color':'green',
            'font-size':'1.5rem',
        })
    
        setTimeout(() => {
            $("#div_elements_title h1").text($("#input_title_hidden").val())
            $("#div_elements_title h1").css({
                'color':'black',
                'font-size':'2rem',            
            })
        }, 3500);
    }
})



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



