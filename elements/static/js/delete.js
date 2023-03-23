/** ----- Functions to show the modal delete ----- */
$(document).on('click', '.buttom-delete', function(event){    
    
    let id = $(this).attr("data-id")
    let letter, name
    $("#id_element").val(id)

    $("#body_list tr").each(function() {  
        if ($(this).find('td').eq(0).text() == id) {
            letter = $(this).find('td').eq(2).text()
            name = $(this).find('td').eq(3).text()            
        }        
    })
          
    $("#labelHeaderDelete").text(letter + ' - ' + name);        
    $("#mensajeDelete").text("Do you want to delete the selected element?")        
    
    $("#myModalDelete").css("display", "block");
})




/** ----- Close the modal page with the button or the X ----- */
$("#btn-close-delete").click(function() {    
    $("#myModalDelete").css("display", "none");
})

$("#close-delete").click(function() {
    $("#myModalDelete").css("display", "none");
})























