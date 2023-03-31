/**
 * Cancel or finalize buttons
 */
$(".btn_finalize").click(function() {
   if($(this).attr('data-id') == 'cancel') {
      $("#div_modal_finalize").css('display','none')

   } else {
      let id_evaluation = $("#hidden_input_id_eva").val()

      $.ajax({
         type: 'POST',      
         headers: {'X-CSRFToken': getCookie("csrftoken")},          
         url: "/evaluations/finalize",
         data: {"id_eva":id_evaluation},
   
         success: function (response) {
            finalize_evaluation(response.rating, id_evaluation)

         },
         error: function (response) {
             console.log("Fail: " + response)
         }
     })
   }   
})


// --- Finalize evaluation
function finalize_evaluation(rating, evaluation_id) {
   $("#div_modal_finalize").css('display','none')
   change_evaluation_title()
   put_score_in_table(rating, evaluation_id)
   disable_finalized_button(evaluation_id)
}


function change_evaluation_title() {
   $("#div_title h1").text("The evaluation have been finalized")
   $("#div_title h1").css({
      'font-size':'1.4rem',
      'color':'green',
      'font-weight':'bold'
   })

   setTimeout(function() {
      $("#div_title h1").text("Evaluations list")
      $("#div_title h1").css({
         'font-size':'2rem',
         'color':'black',
         'font-weight':'normal'
      })
   }, 3500)
   


}


function put_score_in_table(rating, evaluation_id) {
   $("#body_evaluations_table tr").each(function() {      
      if($(this).find('td').eq(11).html() == evaluation_id) {
         $(this).find('td').eq(5).html((rating * 100).toFixed(2) + "%")         
         return false
      }
   })
}


function disable_finalized_button(evaluation_id) {   
   $("#body_evaluations_table tr").each(function() {      
      if($(this).find('td').eq(11).html() == evaluation_id) {
         $(this).find('td').eq(4).text("Yes")

         $(this).find('td').eq(6).text("View")
         $(this).find('td').eq(6).find('a').remove()
         $(this).find('td').eq(6).removeClass()
         $(this).find('td').eq(6).addClass("view")
         
         $(this).find('td').eq(7).text("Report")         
         $(this).find('td').eq(7).removeClass()
         $(this).find('td').eq(7).addClass("report")

         // Delete
         $(this).find('td').eq(8).removeClass()
         $(this).find('td').eq(8).css({
            'text-align':'center',
            'width':'7%',
            'font-style':'italic',
         })         
         
         //return false
      }
   })
}


// --- Get cookie function for ajax to work
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









