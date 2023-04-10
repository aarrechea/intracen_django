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



// --- Cookie to make ajax works
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
          const cookies = document.cookie.split(';');
          for (let i = 0; i < cookies.length; i++) {
             const cookie = cookies[i].trim();
             // Does this cookie string begin with the name we want?
             if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
             }
          }
    }
    return cookieValue;
 }

// --- More information for the processess
$(".more_info").click(function(){        
    let id = $(this).data("id")
    
    $.ajax({
        type: 'GET',
        headers: {'X-CSRFToken': getCookie("csrftoken")},    
        url: "/elements/detail/" + id,        
  
        success: function (response) {
            fill_modal(JSON.parse(response))
        },
        error: function (response) {
            console.log("Fail")
        }
    })
})

function fill_modal(response) {
    $("#myModal").css('display','block')

    $("#txt_process_title").text(response.name)
    $("#txt_definitions").text(response.definitions)
    $("#txt_symptoms").text(response.symptoms)
    $("#txt_questions").text(response.questions)
    $("#txt_assess_one").text(response.assess_one)
    $("#txt_assess_two").text(response.assess_two)
    $("#txt_assess_three").text(response.assess_three)
    $("#txt_assess_four").text(response.assess_four)
    $("#txt_assess_five").text(response.assess_five)    
}







