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



 
 
 