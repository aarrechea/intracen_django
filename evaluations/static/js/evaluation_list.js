/**
 * When the page is ready
 */
$(document).ready(function() {
   // --- Messages
   if ($("#ul_messages li").length > 0) {
      if($("#ul_messages").find('li').eq(0).html() == 'delete') {
         $("#div_title h1").text($("#ul_messages").find('li').eq(1).html())
         $("#div_title h1").css({
            'color':'red',
            'font-size':'1.4rem',
         })

         setTimeout(function() {
            $("#div_title h1").text('Evaluations list')
            $("#div_title h1").css({
               'color':'black',
               'font-size':'2rem',
            }) 
         }, 3500);
      }
   } 


   // --- Initial radio input check
   $("input:radio[name=radio_company]:first").prop('checked', true);
   $("input:radio[name=radio_relation]:first").prop('checked', true);
})




/**
 * Click on the tr company or th_relation to select the 
 * correspondant input radio
 */
$(".tr_company").click(function() {   
   $(this).find('input[type=radio]').prop('checked', true)   
})

$(".tr_relation").click(function() {   
   $(this).find('input[type=radio]').prop('checked', true)   
})




/**
 * Create evaluation on label create click
 */
$("#label_create").click(function() {   
   let id_company = get_id_company()
   let id_relation = get_id_relation()

   $("#create_id_company").val(id_company)
   $("#create_id_relation").val(id_relation)

   $("#form_create").submit()
})

// Function get_id_company
function get_id_company() {
   let id_company

   $(".tr_company").each(function() {
      if($(this).find('input[type=radio]').prop('checked') == true) {
         id_company = $(this).find('td').eq(2).html()
      }
   })

   return id_company
}

// Function get_id_relation
function get_id_relation() {
   let id_relation

   $(".tr_relation").each(function() {
      if($(this).find('input[type=radio]').prop('checked') == true) {
         id_relation = $(this).find('td').eq(2).html()
      }
   })

   return id_relation
}




/**
 * Delete evaluation
 */
$(".delete_eva").click(function() {
   let id_eva = $(this).attr('data-id')
   let company = "Company: " + $(this).closest('tr').find('td').eq(0).html()
   let relation = "Relation: " + $(this).closest('tr').find('td').eq(1).html()
   
   $("#delete_id_eva").val(id_eva) // Form input   
   
   $("#div_modal_content div:nth-child(1) label:nth-child(1)").text(company)
   $("#div_modal_content div:nth-child(1) label:nth-child(2)").text(relation)

   $("#div_modal_delete").css('display','block')
})

// Close the modal
$("#label_close_delete").click(function() {
   $("#div_modal_delete").css('display','none')
})

// Send form to delete the evaluation
$("#label_delete_delete").click(function() {   
   $("#form_delete").submit()
})




/**
 * Finalize
 */
$(".finalize").click(function() {   
   $("#input_company_name").val($(this).closest('tr').find('td').eq(0).html())
   $("#input_relation_name").val($(this).closest('tr').find('td').eq(1).html())
   $("#hidden_input_id_eva").val($(this).closest('tr').find('td').eq(11).html())

   $("#div_modal_finalize").css('display','block')
})




/**
 * View the evaluation rating and process scores using AJAX
 */
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

$("#body_evaluations_table").on('click', ".view", function() {
   $("#div_view_modal").css('display','block')
   id_eva = $(this).closest('tr').find('td').eq(11).html()

   $.ajax({
      type: 'POST',      
      headers: {'X-CSRFToken': getCookie("csrftoken")},    
      url: "/evaluations/view/" + id_eva,
      //data: {"id":id, "element":element},

      success: function (response) {
         get_vector(JSON.parse(response))
         
      },
      error: function (response) {
          console.log("Fail")
      }
  })
})

function get_vector(vector) {   
   let t_body = $("#body_rating_view")

   $("#body_rating_view tr").remove()


   for(i = 0; i < vector.length; i++) {
      let row = "<tr>"
      if(vector[i]['element'] == 'competences') {
         row += "<td style='text-align:center'>" + vector[i]['relation_letter'] + "</td>"
         row += "<td></td>"
         row += "<td></td>"
      } else if(vector[i]['element'] == 'capabilities') {
         row += "<td></td>"
         row += "<td style='text-align:center'>" + vector[i]['relation_letter'] + "</td>"
         row += "<td></td>"
      } else {
         row += "<td></td>"
         row += "<td></td>"
         row += "<td style='text-align:center'>" + vector[i]['relation_letter'] + "</td>"
      }

      if(vector[i]['element'] == 'competences'){
         row += "<td style='text-align:left'>" + vector[i]['name'] + "</td>"

      } else if(vector[i]['element'] == 'capabilities') {
         row += "<td style='text-align:left; padding-left:1rem'>" + vector[i]['name'] + "</td>"

      } else {
         row += "<td style='text-align:left; padding-left: 2rem'>" + vector[i]['name'] + "</td>"
      }


      
      
      if(vector[i]['element'] == 'processes') {
         row += "<td style='text-align:left; padding-left:3rem'>" + vector[i]['score_transform'] * 100 + " %</td>"
      } else if (vector[i]['element'] == 'capabilities') {
         row += "<td style='text-align:left; padding-left: 2rem'>" + vector[i]['score_percentage'] * 100 + " %</td>"
      } else {
         row += "<td style='text-align:left;padding-left:1rem'>" + vector[i]['score_percentage'] * 100 + " %</td>"
      }
      
      row += "</tr>"

      t_body.append(row)
   }   
}




