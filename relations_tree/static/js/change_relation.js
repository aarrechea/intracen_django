/**
 *    When page is ready
 */
$(document).ready(function() {
   $("#label_selector_one").css('color','rgba(56, 142, 60, 1')
   
   load_select_letters ('competences', $("#select_letters option"), 
                        $("#select_letters"), $("#hidden_body tr"))
   
   $("#body_new_relation tr").remove()

   if ($("#h1_title").text() == 'Edit relation') {
      let id_relation = $("#h1_title").attr('data-id')
      
      table_comp_additional_info(id_relation)
      table_additional_info(id_relation, $("#body_cap tr"), 'capabilities', 'edit')
      table_additional_info(id_relation, $("#body_pro tr"), 'processes', 'edit')

      order_table($("#body_new_relation tr"), $("#body_new_relation"), 'edit')
      put_table_style()
      change_name_margin()
      change_percentage_margin()
      put_name_and_comments(id_relation)
   }
   
   load_table('competences', 0)      
})


// ----- Load table to select the elements that are going to be in the nuew relation
function load_table (element, letter_id) {   
   $("#body tr").remove()

   let vector_id_elements = load_id_elements($("#body_new_relation tr"))
   let exists = 0

   $("#hidden_body tr").each(function() {      
      exists = check_exists(vector_id_elements, $(this).find('td').eq(0).html())

      if (exists == 0) {
         if (letter_id == 0) {
            if ($(this).find("td").eq(1).html() == element) {         
               let id = $(this).find("td").eq(0).html() // id element
               let type = $(this).find("td").eq(1).html()
               let letter = $(this).find("td").eq(2).html()
               let name = $(this).find("td").eq(3).html()    
               let letter_id = $(this).find("td").eq(4).html()    
                        
               let row = "<tr>";
               row += "<td hidden>" + id + "</td>"; // 0 - id element
               row += "<td hidden>" + type + "</td>";
               row += "<td style='width:5%; text-align:center'>" + letter + "</td>";
               row += "<td style='width:95%; text-align:left'>" + name + "</td>"; // 3
               row += "<td hidden>" + letter_id + "</td>";
               row += "</tr>";
   
               $("#body").append(row);                       
            }      
   
         } else {
            if ($(this).find("td").eq(1).html() == element && 
                  letter_id == $(this).find("td").eq(4).html()) {         
               let id = $(this).find("td").eq(0).html()
               let type = $(this).find("td").eq(1).html()
               let letter = $(this).find("td").eq(2).html()
               let name = $(this).find("td").eq(3).html()         
                        
               let row = "<tr>";
               row += "<td hidden>" + id + "</td>";
               row += "<td hidden>" + type + "</td>";
               row += "<td style='width:5%; text-align:center'>" + letter + "</td>";
               row += "<td style='width:95%; text-align:left'>" + name + "</td>";
               row += "</tr>";
   
               $("#body").append(row);                       
            }      
         }
      }               
   })   
}


// load_table function related
// Load id elements that are in the new relation table
function load_id_elements(table) {
   let vector = []

   table.each(function() {
      vector.push($(this).find('td').eq(0).html())
   })

   return vector
}


// Check if exist the id element in the new relation table to avoid
// show the element in the list to select the element again
function check_exists(vector, id_element) {   
   let exist = 0

   for (x in vector) {
      if (vector[x] == id_element) {
         exist = 1         
      }
   }

   return exist
}


// --- Table comp additional info
function table_comp_additional_info(id) {   
   $("#body_comp tr").each(function() {      
      if(id == $(this).find('td').eq(4).html()) {         
         let order = $(this).find('td').eq(3).html()
         let letter = $(this).find('td').eq(1).html()
         let name = $(this).find('td').eq(6).html()
         let cap_number = "--"
         let pro_number = "--"
         let percentage = $(this).find('td').eq(2).html()
         let letter_id = $(this).find('td').eq(8).html()
         let relation_letter_id = $(this).find('td').eq(7).html()
         let id_element = $(this).find("td").eq(5).html();

         let row = "<tr class='new_tr'>";
            row += "<td hidden>" + id_element + "</td>"; // 0
            row += "<td hidden>competences</td>";
            row += "<td style='text-align:center'>" + order + "</td>";
            row += "<td style='text-align:center'>" + letter + "</td>"; // 3
            row += "<td style='text-align:center'>" + cap_number + "</td>";
            row += "<td style='text-align:center'>" + pro_number + "</td>";
            row += "<td style='text-align:left'>" + name + "</td>"; // 6   
            row += "<td style='text-align:left'>" + percentage + "</td>";
            row += "<td class='remove_button' style='text-align:center'>Remove</td>";
            row += "<td hidden>" + letter_id + "</td>"; // 9
            row += "<td hidden>" + relation_letter_id + "</td>"; // 10
            row += "</tr>";
                     
         $("#body_new_relation").append(row)         
      }
   })
}


// --- Table cap and pro additional info
function table_additional_info(id, table_row, element, action) {   
   table_row.each(function() {                
      if(id == $(this).find('td').eq(3).html()) {         
         let order = $(this).find('td').eq(2).html()
         let letter = $(this).find('td').eq(7).html() // relation letter
         let name = $(this).find('td').eq(5).html()
         let number = $(this).find('td').eq(0).html()         
         let percentage = $(this).find('td').eq(1).html()
         let element_letter_id = $(this).find('td').eq(6).html()         
         let id_element = $(this).find("td").eq(4).html();         
         let relation_letter_id = $(this).find("td").eq(8).html();
         let parent_id = $(this).find("td").eq(9).html();

         let row = "<tr class='new_tr'>";
            row += "<td hidden>" + id_element + "</td>"; // 0
            row += "<td hidden>" + element + "</td>";
            row += "<td style='text-align:center'>" + order + "</td>";
            row += "<td style='text-align:center'>" + letter + "</td>"; // 3

            if (element == 'capabilities') {
               row += "<td style='text-align:center'>" + number + "</td>";
               row += "<td style='text-align:center'>--</td>";

            } else {
               row += "<td style='text-align:center'>--</td>";
               row += "<td style='text-align:center'>" + number + "</td>";               
            }
            
            row += "<td style='text-align:left'>" + name + "</td>"; // 6   
            row += "<td style='text-align:left'>" + percentage + "</td>";
            row += "<td class='remove_button' style='text-align:center'>Remove</td>";
            row += "<td hidden>" + element_letter_id + "</td>"; // 9
            row += "<td hidden>" + relation_letter_id + "</td>"; // 10
            row += "<td hidden>" + parent_id + "</td>"; // 11
            row += "</tr>";
         
         $("#body_new_relation").append(row)         
      }
   })
}


// --- Order table by order index 
function order_table(table_tr, table, action) {   
   let actual_order, next_order, rows = table_tr.length

   table_tr.each(function() {
      for (let x = 0; x < rows - 1; x++) {
         actual_order = parseInt(table.find('tr').eq(x).find('td').eq(2).html())
         next_order = parseInt(table.find('tr').eq(x+1).find('td').eq(2).html())
         
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


function put_name_and_comments(id_relation) {
   $("#body_relation tr").each(function() {
      if($(this).find('td').eq(0).html() == id_relation) {
         $("#txt_name").text($(this).find('td').eq(1).html())
         $("#txt_comments").text($(this).find('td').eq(2).html())         
         return false
      }
   })
}




/** 
 * Load letters in the select 
 */
function load_select_letters (element, option_name, select_name, body_tr) {
   
   let option_value

   option_name.remove()
   create_option('0', 'All', select_name)

   $(body_tr).each(function(index) {
      if(index != 0) {
         if($(this).find("td").eq(2).html() != option_value && $(this).find("td").eq(1).html() == element) {
            create_option($(this).find("td").eq(4).html(), $(this).find("td").eq(2).html(), select_name)
            option_value = $(this).find("td").eq(2).html()
         }

      }  else {

         if($(this).find("td").eq(1).html() == element) {
            create_option($(this).find("td").eq(4).html(), $(this).find("td").eq(2).html(), select_name)
            option_value = $(this).find("td").eq(2).html()
         }         
      }      
   })
}

// Create options to show available letters to filter
function create_option(value, text, select_name) {   
   option = document.createElement("option");
   option.value = value;
   option.text = text;
   select_name.append(option);      
}




/**
 *    Click in label selector to change the element showed
 */
$(".label_selector").click(function() {
   
   $("#body tr").remove()
   element = $(this).attr('data-element')      
   load_table(element, 0)

   $(".label_selector").each(function() {
      if ($(this).attr('data-element') == element) {
         $(this).css('color','rgba(56, 142, 60, 1')
         $("#hidden_label_selector").text(element)

      } else {
         $(this).css('color','black')
      }      
   })

   load_select_letters(element, $("#select_letters option"), $("#select_letters"), $("#hidden_body tr"))
})




/**
 *  Load table when the select letters changes
 */
$("#select_letters").click(function() {      
   load_table($("#hidden_label_selector").text(), $(this).val())   
})




/**
 *  Load new relation table with the selected elements when click in the row
 *    of element is made
*/
$("#div_table").on("click", "#body tr", function () {load_new_relation_table($(this))})


// --- Main function to load new relation table
function load_new_relation_table(table) {
   let id = table.find("td").eq(0).html(); // id element
   let type = table.find("td").eq(1).html();
   let letter = table.find("td").eq(2).html();
   let name = table.find("td").eq(3).html();   
   let letter_id = table.find("td").eq(4).html();   
   let rows = $("#body_new_relation tr").length
   let insert_row = $("#select_row").val()

   if (rows == 0 && type != 'competences') {return}

   let row = "<tr class='new_tr'>";
   row += "<td hidden>" + id + "</td>"; // 0 - id element
   row += "<td hidden>" + type + "</td>";
   row += "<td style='text-align:center'>1</td>";
   row += "<td style='text-align:center'>" + letter + "</td>"; // 3
   row += "<td style='text-align:center'>-</td>";
   row += "<td style='text-align:center'>-</td>";
   row += "<td style='text-align:left'>" + name + "</td>"; // 6   
   row += "<td style='text-align:left'>50</td>";
   row += "<td class='remove_button' style='text-align:center'>Remove</td>";
   row += "<td hidden>" + letter_id + "</td>"; // 9
   row += "<td hidden></td>"; // 10 - Place to put the code for the relation letter                        
   row += "<td hidden></td>"; // 11 - Place to parent element                                    
   row += "</tr>";
   
   if (insert_row == rows || rows == 0) {
      $("#body_new_relation").append(row)

   } else {             
      $("#body_new_relation tr").eq(insert_row - 1).after(row)
   }            
   
   put_order_numbers()
   put_processes_numbers()
   put_capability_number()
   put_letters()
   change_name_margin()
   put_percentages_comp()
   put_percentages_cap()
   put_percentages_pro()
   change_percentage_margin()
   put_table_style()
   disable_row(id)
   fill_select_row()
   put_parent_id()
}

// Function to put order numbers
function put_order_numbers() {
   $(".new_tr").each(function(index) {
      $(this).find("td").eq(2).html(index + 1);
   })
}


// Function to put letters
function put_letters() {
   let counter = 0
   let table = $("#body_new_relation")      
   let table_letters = $("#hidden_letters")
   let actual_row_type, previous_row_type, actual_row_id, previous_row_id
            
   $("#body_new_relation tr").each(function(index) {            
      if (index == 0) {         
         $(this).find("td").eq(3).html(table_letters.find('tr').eq(0).find('td').eq(2).html()); // Letter name
         $(this).find("td").eq(10).html(table_letters.find('tr').eq(0).find('td').eq(0).html()); // id letter

      } else {
         actual_row_type = $(this).find('td').eq('1').html()
         previous_row_type = table.find('tr').eq(index - 1).find('td').eq(1).html()
         
         if (actual_row_type == 'competences' && previous_row_type == 'competences') {
            actual_row_id = parseInt($(this).find('td').eq(0).html())
            previous_row_id = parseInt(table.find('tr').eq(index - 1).find('td').eq(0).html())            

            if (actual_row_id == previous_row_id) {               
               $(this).find("td").eq(3).html(table_letters.find('tr').eq(0).find('td').eq(2).html()); // Letter name
               $(this).find("td").eq(10).html(table_letters.find('tr').eq(0).find('td').eq(0).html()); // id
               
            } else {
               counter += 1               
               $(this).find("td").eq(3).html(table_letters.find('tr').eq(counter).find('td').eq(2).html()); // Letter name
               $(this).find("td").eq(10).html(table_letters.find('tr').eq(counter).find('td').eq(0).html()); // id               
            }

         } else if (actual_row_type == 'competences') {
            counter += 1            
            $(this).find("td").eq(3).html(table_letters.find('tr').eq(counter).find('td').eq(2).html()); // Letter name
            $(this).find("td").eq(10).html(table_letters.find('tr').eq(counter).find('td').eq(0).html()); // id
            
         } else {
            $(this).find("td").eq(3).html(table_letters.find('tr').eq(counter).find('td').eq(2).html());
            $(this).find("td").eq(10).html(table_letters.find('tr').eq(counter).find('td').eq(0).html());                  
         }
      }
   })
}


// Function to put capabilities numbers
function put_capability_number() {
   let number = 1
   
   $("#body_new_relation tr").each(function(index) {      
      if (index == 0) {
         $(this).find("td").eq(4).html("--");

      } else if ($(this).find("td").eq(1).html() == 'competences') {         
         $(this).find("td").eq(4).html("--")
         number = 1

      } else if ($(this).find("td").eq(1).html() == 'capabilities') {
         $(this).find("td").eq(4).html(number)
         number += 1
      } 
   })
}


// Function to put processes numbers
function put_processes_numbers() {
   let number = 1

   $("#body_new_relation tr").each(function(index) {      
      if ($(this).find("td").eq(1).html() == 'processes') {
         $(this).find("td").eq(5).html(number)
         number += 1

      } else {
         number = 1
         $(this).find("td").eq(5).html('--')
      }
   })
}


// Function to change the name margin
function change_name_margin() {
   let type

   $("#body_new_relation tr").each(function(index) {
      type = $(this).find('td').eq(1).html()

      switch (type) {
         case 'competences':
            $(this).find('td').eq(6).css('padding-left', '0')
            break;
         case 'capabilities':
            $(this).find('td').eq(6).css('padding-left', '1rem')
            break;
         default:
            $(this).find('td').eq(6).css('padding-left', '2rem')
            break;
      }

      $(this).find('td').eq(6).css('padding-right', '2rem')
   })
}


// Put percentages comp
function put_percentages_comp() {
   let comp_count = 0, percentage = 0

   $("#body_new_relation tr").each(function(index) {
      if ($(this).find('td').eq(1).html() == 'competences') {
         comp_count += 1
      }
   })

   percentage = (100 / comp_count).toFixed(2)

   $("#body_new_relation tr").each(function(index) {
      if ($(this).find('td').eq(1).html() == 'competences') {
         $(this).find('td').eq(7).html(percentage)
      }
   })   
}


// Put percentages cap
function put_percentages_cap () {
   let count = 0, percentage = 0, j = 0, i
   let body = $("#body_new_relation")   
   let rows = $("#body_new_relation tr").length
   
   $("#body_new_relation tr").each(function(index) {      
      if ($(this).find('td').eq(1).html() == 'capabilities') {
         count += 1         

         if(index == rows - 1) {            
            percentage = (100 / count).toFixed(2)            
            j = count 
            i = index // because is the capability row
            count = 0

            while (j > 0) {
               if(body.find('tr').eq(i).find('td').eq(1).html() == 'capabilities') {
                  body.find('tr').eq(i).find('td').eq(7).html(percentage)                  
                  j -= 1
               }

               i -= 1
            }
         }

      } else if($(this).find('td').eq(1).html() == 'competences' || index == rows-1) {         
         percentage = (100 / count).toFixed(2)         
         j = count
         i = index
         count = 0

         while (j > 0) {
            if(body.find('tr').eq(i).find('td').eq(1).html() == 'capabilities') {
               body.find('tr').eq(i).find('td').eq(7).html(percentage)
               j -= 1
            }

            i -= 1
         }
      }
   })
}


// Put percentages pro
function put_percentages_pro () {
   let count = 0, internal_count, percentage = 0, j
   let body = $("#body_new_relation")
   let rows = parseInt($("#body_new_relation tr").length)   
   
   for (let i = 1; i <= rows; i++) {
      if (body.find('tr').eq(i).find('td').eq(1).html() == 'processes' && i < rows) {
         count += 1         

      } else if (count > 0) {         
         percentage = (100 / count).toFixed(2)  
         j = i - 1
                           
         for (internal_count = count; internal_count > 0; internal_count--) {
            body.find('tr').eq(j).find('td').eq(7).html(percentage)
            j -= 1
         }
         count = 0
      }
   }
}


// Change percentage margin
function change_percentage_margin() {
   let type

   $("#body_new_relation tr").each(function(index) {
      type = $(this).find('td').eq(1).html()

      switch (type) {
         case 'competences':
            $(this).find('td').eq(7).css('padding-left', '0')
            break;
         case 'capabilities':
            $(this).find('td').eq(7).css('padding-left', '0.5rem')
            break;
         default:
            $(this).find('td').eq(7).css('padding-left', '1rem')
            break;
      }
   })
}


// Put table style
function put_table_style() {
   $(".new_tr td").each(function() {         
      $(this).css('border-bottom', '1px solid rgba(56, 142, 60, 1)')
      $(this).css('height', '2rem')
   })   
}


// Disabled the row selected
function disable_row(id) {
   $("#body tr").each(function() {      
      if (parseInt($(this).find('td').eq(0).html()) == id) {
         $(this).css('display', 'none')
      }
   })
}


// Fill select row
function fill_select_row() {
   let rows = 1

   $("#select_row option").remove()

   create_option(0, 0, $('#select_row'))
   
   $(".new_tr").each(function() {      
      create_option(rows, rows, $('#select_row'))
      rows += 1
   })   

   $('#select_row').prop('selectedIndex', rows - 1)
}


// Column 11
function put_parent_id() {
   let id_comp, id_cap

   $("#body_new_relation tr").each(function() {      
      if($(this).find('td').eq(1).html() == 'competences') {
         id_comp = $(this).find('td').eq(0).html()

      } else if ($(this).find('td').eq(1).html() == 'capabilities') {
         id_cap = $(this).find('td').eq(0).html()
         $(this).find('td').eq(11).html(id_comp)

      } else {
         $(this).find('td').eq(11).html(id_cap)
      }
   })
}



/**
*  Hover over remove button to put bold letters
*/
$(document).on('mouseenter', '.remove_button', function() {    
   $(this).css('font-weight', 'bold')
   $(this).css('cursor', 'pointer')
})   

$(document).on('mouseleave', '.remove_button', function() {    
   $(this).css('font-weight', 'normal')
})   




/**
 * Remove a row from the relation table
 */
$("#div_new_table").on('click', '.remove_button', function() {   
   let id = $(this).closest('tr').find('td').eq(0).html()   
   let type = $(this).closest('tr').find('td').eq(1).html()   

   $(this).closest("tr").remove();      

   load_table(type, $("#select_letters").val())
   fill_select_row()

   $(".label_selector").each(function() {
      if ($(this).attr('data-element') == type) {
         $(this).css('color','rgba(56, 142, 60, 1')
         $("#hidden_label_selector").text(type)

      } else {
         $(this).css('color','black')
      }      
   })
         
   put_order_numbers()   
   put_processes_numbers()   
   put_capability_number()   
   put_letters()   
   put_percentages_comp()
   put_percentages_cap()
   put_percentages_pro()
})




/**
 * Remove all elements from the new relation table
 */
$("#remove_all_elements").click(function() {      
   if ($(this).text() == 'Click againto delete') {      
      let type = 'competences'

      $("#body_new_relation tr").remove()
      load_table(type, $("#select_letters").val())
      fill_select_row()

      $(".label_selector").each(function() {
         if ($(this).attr('data-element') == type) {
            $(this).css('color','rgba(56, 142, 60, 1')
            $("#hidden_label_selector").text(type)
   
         } else {$(this).css('color','black')}      
      })

   } else {           
      $(this).css("color", "red");
      $(this).css("border-radious", "3%");
      $(this).html("Click again<br>to delete")
            
      setTimeout(function() {                              
         $("#remove_all_elements").css("color", "black");
         $("#remove_all_elements").html("Remove all<br>elements")
      }, 4000); 
   }
})




/**
 * Change color on hover of the button remove all rows
 */
$("#remove_all_elements").mouseenter(function() {
   $(this).css({'color':'red',
               'font-weight':'bold',
               'cursor':'pointer'})
})

$("#remove_all_elements").mouseleave(function() {
   $(this).css({'color':'black',
               'font-weight':'normal'})
})




/*
 * Group of functions to count characters and line breaks of the element extras
 */
function contarCaracteres(input, label)
{    
    let maxlength = input.attr("maxlength");
    let currentLength = input.val().length;    
    let total = maxlength - currentLength
    label.text(total);
}


function limitaSaltosLinea(txtArea, filas) {                    
   let texto = txtArea.val().split(/\n/);    
   
   if(texto.length > filas) {        
       txtArea.val(txtArea.val().substring(0, txtArea.val().length - 1));     
   }                    
}


$(".add_info").on("focus", function() {   
   $("#label_counter").css("visibility", "visible");
   contarCaracteres($(this), $("#label_counter"));
});


$(".add_info").on("input", function() {       
   if ($(this).attr('id') == 'txt_name') {
      limitaSaltosLinea($(this), 1)

   } else {
      limitaSaltosLinea($(this), 3)
   }
   
   contarCaracteres($(this), $("#label_counter"));
});


$(".add_info").on("focusout", function()
{
   $("#label_counter").text("");
   $("#label_counter").css("visibility", "hidden");    
});





/**
 *  Create relation
 */
$("#create_relation").click(function() {   
   // ----- Variables   
   let title = $("#h1_title").text()
   let relation_name = $("#txt_name").val()
   let relation_comments = $("#txt_comments").val()
   let total_elements = $("#body_new_relation tr").length
   let total_competences = count_elements('competences')
   let total_capabilities = count_elements('capabilities')
   let total_processes = count_elements('processes')
   let vector = []
   let vector_comp = create_vector_comp()
   let vector_cap = create_vector_element('capabilities')
   let vector_pro = create_vector_element('processes')
   let status = check_status()   

   // ----- Validations
   if (total_elements == 0) {
      validation_warning("There is no elements in the table", title)
      return
   }

   if (relation_name.length < 4) {
      validation_warning("The name must contain at least three characters", title)
      return
   }

   if (relation_comments == '' || relation_comments.length == 0) {relation_comments = 'None'}   

   

   // ----- Code   
   vector.push(relation_name)
   vector.push(relation_comments)
   vector.push(total_elements)
   vector.push(total_competences)
   vector.push(total_capabilities)
   vector.push(total_processes)
   vector.push(status)

   vector.join(",")
   vector_comp.join(",")
   vector_cap.join(",")
   vector_pro.join(",")

   $("#input_data_form").val(vector)
   $("#vector_comp_form").val(vector_comp)
   $("#vector_cap_form").val(vector_cap)
   $("#vector_pro_form").val(vector_pro)

   $("#create_relation_form").submit()
})


// ----- Validation warning
function validation_warning(message, title) {
   $("#div_title h1").css({
      'color':'red',
      'font-size':'1.3rem',
      'text-align':'center',
   })
   $("#div_title h1").text(message)

   setTimeout(function() {                     
      $(".element-title h1").html($("#input_element").val());
      $("#div_title h1").css({         
         "color":"black",
         "font-size":"2rem"})      
         $("#div_title h1").text(title)
   }, 4000);
}


// Count elements in the new relation table
function count_elements(element) {
   let counter = 0

   $("#body_new_relation tr").each(function() {
      if ($(this).find('td').eq(1).html() == element) {
         counter += 1
      }
   })

   return counter
}


// Create the Vector comp
function create_vector_comp() {
   let type = 'competences'
   let original_letter
   let relation_letter
   let percentage
   let order   
   let id_element
   let vector = []

   $("#body_new_relation tr").each(function() {
      if ($(this).find('td').eq(1).html() == type) {
         original_letter = get_original_letter($(this).find('td').eq(0).html())
         relation_letter = $(this).find('td').eq(10).html()         
         percentage = $(this).find('td').eq(7).html()
         order = $(this).find('td').eq(2).html()         
         id_element = $(this).find('td').eq(0).html()

         vector.push(original_letter, relation_letter, percentage, order, id_element)
      }
   })
   
   return vector
}


// Get the original letter
function get_original_letter(id) {
   let original_letter

   $("#hidden_body tr").each(function() {
      if ($(this).find('td').eq(0).html() == id) {
         original_letter = $(this).find('td').eq(4).html()
      }
   })

   return original_letter
}


// Create vector cap and pro
function create_vector_element(element) {
   let number
   let percentage
   let order
   let id_element
   let parent_id
   let vector = []

   $("#body_new_relation tr").each(function() {
      if ($(this).find('td').eq(1).html() == element) {
         relation_letter = $(this).find('td').eq(10).html()    

         if (element == 'capabilities') {
            number = $(this).find('td').eq(4).html()
         } else {
            number = $(this).find('td').eq(5).html()
         }

         percentage = $(this).find('td').eq(7).html()
         order = $(this).find('td').eq(2).html()         
         id_element = $(this).find('td').eq(0).html()
         parent_id = $(this).find('td').eq(11).html()         
                  
         vector.push(number, percentage, order, id_element, relation_letter, parent_id)
      }
   })

   return vector
}


// Check status
function check_status () {   
   let value = 1

   $("#body_new_relation tr").each(function(index) {      
      if (value == 1 && $(this).find('td').eq(1).html() == 'competences' 
         && $("#body_new_relation").find('tr').eq(index + 1).find('td').eq(1).html() != 'capabilities'
         && $("#body_new_relation").find('tr').eq(index + 2).find('td').eq(1).html() != 'processes') {
                                 
         value = 0
      }
   })

   return value
}
















