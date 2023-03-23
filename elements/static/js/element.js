/** 
 * After the page is ready
 */ 
$(document).ready(function() {   
   /* ----- Changing the title menu ----- */   
   $("#title").text($("#element-title").text())


   /* ----- Show success message in the title menu ----- */   
   if($("#flag").val()) {
      $(".element-title h1").css("background-color", "rgb(0, 183, 74)");        
      $(".element-title h1").css("font-size", "2rem");        
      $(".element-title h1").css("padding-top", "0");        
      $(".element-title h1").text($("#flag").val());
      
      setTimeout(function() {                     
         $(".element-title h1").html($("#input_element").val());
         $('.element-title h1').css('textTransform', 'capitalize');
         $(".element-title h1").css("background-color", "white");
         $(".element-title h1").css("font-size", "2rem");    
         $(".element-title h1").css("padding-top", "0");              
         $(".flag").val('');
      }, 3000);
   }    
});




/**
 *    Group of function to open and close the modal to show comments, 
 *    definitions, questions and symptoms
 *  
/* ----- Get csrg_token cookie ----- */
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

/* ----- Get the information throug ajax ----- */
$(document).on('click', '.buttom-comments', function(event) {
   let id = $(this).attr("data-id")
   let element = $("#element-title").text().toLowerCase()
   
   $.ajax({
      type: 'POST',      
      headers: {'X-CSRFToken': getCookie("csrftoken")},    
      url: "/elements/" + element + "/",        
      data: {"id":id, "element":element},

      success: function (response) {                                      
         fill_modal(response)
         
      },
      error: function (response) {
          console.log("Fail")
      }
  })
    
   $("#myModal").css("display", "block");
})

/** ----- Close the modal page with the button or the X ----- */
$("#btnClose").click(function() {
   $("#myModal").css("display", "none");
})

$("#close").click(function() {
   $("#myModal").css("display", "none");
})


/* ----- Function to fill the modal with the information ----- */
function fill_modal(response) {
   if (response.type === 'processes') {
      $("#btnDefinitions").attr('data-info', response.definitions)
      $("#btnSymptoms").attr('data-info', response.symptoms)
      $("#btnQuestions").attr('data-info', response.questions)
   } else {
      $("#btnDefinitions").prop('disabled', true)
      $("#btnSymptoms").attr('disabled', true)
      $("#btnQuestions").attr('disabled', true)
   }

   $("#labelHeader").text(response.letter + " - " + response.name)
   $("#btnComments").attr('data-info', response.comments)
   $("#textarea-add-info").val(response.comments)
   
   no_border_bottom()
   $("#btnComments").css('border-bottom', '2px solid rgba(56, 142, 60, 1)')   
}

/* ----- Put the border-bottom only to the button that was clicked and fill
   the textares with the corresponding information */
$(".btn-add-info").click(function() {
   no_border_bottom()

  $(this).css('border-bottom', '2px solid rgba(56, 142, 60, 1)')
  $("#textarea-add-info").val($(this).attr('data-info'))
});

function no_border_bottom() {
   $('.btn-add-info').each(function(index, item) {
      $(item).css('border-bottom', 'none')
   });
}




/**
 * Filter list by letter
 */
$("#selectElement").change(function() {   
   
   let id_selected = $(this).val()   
   let contador = 0
   
   $('ul').empty()
      
   if(id_selected == 0) {
      $("#body_list tr").each(function() {         
         let id = $(this).find('td').eq(0).text()
         let letter = $(this).find('td').eq(2).text()
         let name = $(this).find('td').eq(3).text()
         let eva_progress = $(this).find('td').eq(4).text()
         let eva_made = $(this).find('td').eq(5).text()
         let type = $(this).find('td').eq(6).text()
         contador++

         $("#ul-list").append(
            '<li class="element-card"> \
               <div> \
                  ' + letter  + ' - ' + name + '\
               </div> \
               \
               <div> \
                  Eip &nbsp; &nbsp; ' + eva_progress + ' &nbsp; - &nbsp; EM &nbsp; &nbsp; ' + eva_made + ' \
               </div> \
                \
               <div> \
                  <span data-id="' + id + '" class="buttom buttom-comments">Additional info</span> \
                  <span class="separator">-</span> \
                  <a href="/elements/edit/' + type + '/' + id + '" class="buttom buttom-edit">Edit </a> \
                  <span class="separator">-</span> \
                  <span class="buttom buttom-delete">Delete</span> \
                  <span data-id="' + id + '" class="buttom buttom-delete" id="btn_delete">Delete</span> \
               </div> \
            </li>'
         )
      })
   } else {
      $("#body_list tr").each(function() {            
         if(id_selected === $(this).find('td').eq(1).text()) {
            let id = $(this).find('td').eq(0).text()
            let letter = $(this).find('td').eq(2).text()
            let name = $(this).find('td').eq(3).text()
            let eva_progress = $(this).find('td').eq(4).text()
            let eva_made = $(this).find('td').eq(5).text()
            let type = $(this).find('td').eq(6).text()
            contador++
            
            $("#ul-list").append(
               '<li class="element-card"> \
                  <div> \
                     ' + letter  + ' - ' + name + '\
                  </div> \
                  \
                  <div> \
                     Eip &nbsp; &nbsp; ' + eva_progress + ' &nbsp; - &nbsp; EM &nbsp; &nbsp; ' + eva_made + ' \
                  </div> \
                  \
                  <div> \
                     <span data-id="' + id + '" class="buttom buttom-comments">Additional info</span> \
                     <span class="separator">-</span> \
                     <a href="/elements/edit/' + type + '/' + id + '" class="buttom buttom-edit">Edit </a> \
                     <span class="separator">-</span> \
                     <span data-id="' + id + '" class="buttom buttom-delete" id="btn_delete">Delete</span> \
                  </div> \
               </li>'
            )
         }
      })
   }
   
   $("#total_elements").text("Total elements listed " + contador)
});




/*
 * Función para limitar la cantidad de veces que se presiona la tecla enter
 * dentro de un textarea 
 */
function limitaSaltosLinea(txtArea, filas) {                    
   let texto = txtArea.val().split(/\n/);    
   
   if(texto.length > filas) {        
       txtArea.val(txtArea.val().substring(0, txtArea.val().length - 1));     
   }                    
}




/*
 * Conjunto de funciones para contar caracteres  
 */
function contarCaracteres(input, label)
{    
    let maxlength = input.attr("maxlength");
    let currentLength = input.val().length;    
    let total = maxlength - currentLength
    label.text(total);
}




















