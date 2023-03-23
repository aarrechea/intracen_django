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







