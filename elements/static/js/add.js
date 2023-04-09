// --- When page is ready
$(document).ready(function() {    
    if($("#message").val() != "") {
        $("#div_add_element_title h1").text($("#message").val())
        $("#div_add_element_title h1").css({
            'color':'green',
            'font-size':'1.5rem',
        })
    
        setTimeout(() => {
            $("#div_add_element_title h1").text($("#input_action_hidden").val() + " " + $("#input_singular_hidden").val())
            $("#div_add_element_title h1").css({
                'color':'black',
                'font-size':'2rem',            
            })
        }, 3500);
    }
})



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