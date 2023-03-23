/**
 * Saving scores
 */
$("#div_buttons_menu_in_progress").on('click', '#label_save_score', function() {   
   let vector = check_score_change()

   if(vector[0] == 1) {      
      vector = vector.join(",")
      save_score_ajax(vector)      
   }   
})


function check_score_change() {
   let actual_process = $("#input_id_actual_process").val()
   let rows = $("#body_scores tr").length
   let table = $("#body_scores")
   let row = 0
   let vector = [0, 0, 0, 0]
   let actual_score = get_actual_score()   

   while (row < rows) {
      if(table.find('tr').eq(row).find('td').eq(2).html() == actual_process) {
         if(actual_score != parseInt(table.find('tr').eq(row).find('td').eq(0).html())) {
            vector = []
            vector.push(1) // 1 for score changes
            vector.push(actual_score) // new score
            vector.push(table.find('tr').eq(row).find('td').eq(2).html()) // id element
            vector.push(table.find('tr').eq(row).find('td').eq(4).html()) // id evaluation
         }
         row = rows
      }

      row += 1
   }

   return vector
}


function get_actual_score() {
   let score = 0

   $(".score").each(function() {
      if($(this).prop('checked')) {
         score = $(this).val()
      }
   })

   return score
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


// --- Execute save - Ajax
function save_score_ajax(vector) {
   $.ajax({
      type: 'POST',      
      headers: {'X-CSRFToken': getCookie("csrftoken")},          
      url: "/evaluations/save_score",
      data: {"vector":vector},

      success: function (response) {
         put_new_score(vector.split(","))
         change_style_button_save()
      },
      error: function (response) {
          console.log("Fail: " + response)
      }
  })
}


// Put new score in the score table
function put_new_score(vector) {
   let table = $("#body_scores")
   let rows = $("#body_scores tr").length
   let row = 0

   while(row < rows) {
      if(table.find('tr').eq(row).find('td').eq(2).html() == vector[2]) {
         table.find('tr').eq(row).find('td').eq(0).html(vector[1])
         row = rows
      }

      row += 1
   }   
}


function change_style_button_save() {
   $("#label_save_score").text("Saved")

   $("#label_save_score").css({
      'font-weight':'bold',
      'color':'green',
      'font-size':'1.5rem'
   })

   setTimeout(function() {
      $("#label_save_score").text("Save")

      $("#label_save_score").css({
         'font-weight':'normal',
         'color':'black',
         'font-size':'1.2rem'
      }) 
   }, 2500)
}






