/**
 *  When the page is ready
 */
$(document).ready(function() {   
   if($("#flag").val() != '' || $("#flag").val().length > 0) {
      $("#div_title h1").text($("#flag").val())
      $("#div_title h1").css('color','red')

      setTimeout(function() {                     
         $("#div_title h1").text('Relations tree');         
         $("#div_title h1").css("background-color", "white");
         $("#div_title h1").css("font-size", "2rem");
         $("#div_title h1").css('color','black')
         $("#flag").val('');
      }, 3000);
   }
})




/**
 * Load the relation tree additional information table
 */
$(".view").click(function() {      
   let id_relation = $(this).closest('tr').find('td').eq(14).html()
   
   $("#h1_relation_name").text($(this).closest('tr').find('td').eq(0).html())
   $("#h3_created").html("Created<br><br>" + $(this).closest('tr').find('td').eq(12).html())
   $("#h3_updated").html("Updated<br><br>" + $(this).closest('tr').find('td').eq(13).html())

   $("#body_additional_info tr").remove()
   table_comp_additional_info(id_relation, 'view')
   table_additional_info(id_relation, $("#body_cap tr"), 'capabilities', 'view')
   table_additional_info(id_relation, $("#body_pro tr"), 'processes', 'view')

   order_table($("#body_additional_info tr"), $("#body_additional_info"), 'view')
   put_styles_table()

   $("#div_modal").css('display', 'block')   
})

// --- Table comp additional info
function table_comp_additional_info(id, action) {   
   $("#body_comp tr").each(function() {      
      if(id == $(this).find('td').eq(4).html()) {         
         let order = $(this).find('td').eq(3).html()
         let letter = $(this).find('td').eq(1).html()
         let name = $(this).find('td').eq(6).html()
         let cap_number = "--"
         let pro_number = "--"
         let percentage = $(this).find('td').eq(2).html()

         let row = "<tr class='new_tr'>";         
         row += "<td hidden>" + order + "</td>"; // 0
         row += "<td>" + letter + "</td>"; // 1
         row += "<td>" + cap_number + "</td>"; // 2
         row += "<td>" + pro_number + "</td>"; // 3         
         row += "<td style='text-align:left'>" + name + "</td>"; // 4            
         row += "<td>" + percentage + "</td>"; // 5
         row += "<td hidden>competences</td>"; // 6
         row += "</tr>";

         if (action == 'view') {
            $("#body_additional_info").append(row)
         } else {
            $("#body_new_relation").append(row)
         }         
      }
   })
}


// --- Table cap and pro additional info
function table_additional_info(id, table_row, element, action) {   
   table_row.each(function() {                
      if(id == $(this).find('td').eq(3).html()) {         
         let order = $(this).find('td').eq(2).html()         
         let name = $(this).find('td').eq(5).html()         
         let percentage = $(this).find('td').eq(1).html()
         let cap_number, pro_number

         if (element == 'capabilities') {
            cap_number = $(this).find('td').eq(0).html()
            pro_number = "--"            

         } else {
            cap_number = "--"
            pro_number = $(this).find('td').eq(0).html()            
         }
         
         let row = "<tr class='new_tr'>";         
         row += "<td hidden>" + order + "</td>"; // 0        
         row += "<td>--</td>"; // 1 
         row += "<td>" + cap_number + "</td>"; // 2
         row += "<td>" + pro_number + "</td>"; // 3         
         row += "<td style='text-align:left'>" + name + "</td>"; // 4
         row += "<td>" + percentage + "</td>"; // 5
         row += "<td hidden>" + element + "</td>"; // 6
         row += "</tr>";

         if (action == 'view') {
            $("#body_additional_info").append(row)

         } else {
            $("#body_new_relation").append(row)
         }                  
      }
   })
}


// --- Order table by order index 
function order_table(table_tr, table, action) {   
   let actual_order, next_order, rows = table_tr.length

   table_tr.each(function() {
      for (let x = 0; x < rows - 1; x++) {
         actual_order = parseInt(table.find('tr').eq(x).find('td').eq(0).html())
         next_order = parseInt(table.find('tr').eq(x+1).find('td').eq(0).html())
         
         if(actual_order > next_order) {
            if (action == 'view') {
               $("#body_additional_info tr").eq(x+1).after($(this))

            } else {
               $("#body_new_relation tr").eq(x+1).after($(this))
            }                        
         }      
      }      
   })
}


// --- Put styles table
function put_styles_table() {
   // --- Table scope
   $("#div_relation table").css({
      'border-spacing':'0 0.5rem',
   })


   // --- Row and cell scope
   $(".new_tr").each(function() {
      // --- Row
      $(this).css({         
         'height':'2rem',
      })

      // --- Cell
      switch ($(this).find('td').eq(6).html()) {
         case 'competences':
            $(this).find('td').css('border-bottom','0.05px solid rgba(56, 142, 60, 1)')
            break;

         case 'capabilities':            
            $(this).find('td:nth-child(n+3)').css('border-bottom','0.05px solid rgba(56, 142, 60, 1)')
            break;

         case 'processes':
            $(this).find('td:nth-child(n+4)').css('border-bottom','0.05px solid rgba(56, 142, 60, 1)')
            break;
      }      
   })
}




/**
 * Click in the delete relation button
 */
$(".delete_relation").click(function() {
   $("#h1_relation_name_delete").text($(this).closest('tr').find('td').eq(0).html())
   $("#id_relation_delete").val($(this).closest('tr').find('td').eq(14).html())

   $("#div_modal_delete").css('display','block')
})





















