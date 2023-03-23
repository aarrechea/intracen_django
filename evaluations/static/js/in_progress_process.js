/**
 * After the page is ready
 */
$(document).ready(function() {
   // --- Loading the new table
   new_table_initial()
   add_competences_count()
   add_capabilities_count()
   add_processes_count()
   put_order_evaluation()
   put_percentages()
   put_definitions()   
   put_count_labels($("#input_form_number").val())
   put_elements_names($("#input_form_number").val())   
   let score = load_scores()
   change_maturity_guide(score)
   load_initial_symptoms_questions()


   // --- Scores
   put_initial_score()

})




/**
 * Group of functions to load the new table in order to work
 * whit the evaluation 
 */
// --- Total elements in the relation
function total_elements() {
   let total = parseInt($("#input_total_competences").val()) + 
            parseInt($("#input_total_capabilities").val()) + parseInt($("#input_total_processes").val())

   return total
}


// --- Vector with the id elements ordered by order field
function id_elements_ordered() {
   let comp_row = 0, cap_row = 0, pro_row = 0
   let total_rows = total_elements()
   let id_vectors = []   

   for(x = 1; x <= total_rows; x++) {      
      if($("#body_hidden_competences").find('tr').eq(comp_row).find('td').eq(3).html() == x) {
         id_vectors.push($("#body_hidden_competences").find('tr').eq(comp_row).find('td').eq(2).html())
         comp_row += 1

      } else if ($("#body_hidden_capabilities").find('tr').eq(cap_row).find('td').eq(3).html() == x) {
         id_vectors.push($("#body_hidden_capabilities").find('tr').eq(cap_row).find('td').eq(2).html())
         cap_row += 1

      } else {
         id_vectors.push($("#body_hidden_processes").find('tr').eq(pro_row).find('td').eq(2).html())
         pro_row += 1
      }
   }

   return id_vectors
}


// --- Initial preparation of the nuew table
function new_table_initial() {   
   let comp_row = 0, cap_row = 0, pro_row = 0
   let tr_comp = $("#body_hidden_competences tr")
   let tr_cap = $("#body_hidden_capabilities tr")
   let tr_pro = $("#body_hidden_processes tr")
   let vector_ids = id_elements_ordered()

   for(x = 0; x < vector_ids.length; x++) {
      let row = "<tr>"

      if(tr_comp.eq(comp_row).find('td').eq(2).html() == vector_ids[x]) {
         row += "<td>" + tr_comp.eq(comp_row).find('td').eq(0).html() + "</td>" // 0 - letter or number
         row += "<td>" + tr_comp.eq(comp_row).find('td').eq(1).html() + "</td>" // 1 - name element
         row += "<td>" + tr_comp.eq(comp_row).find('td').eq(2).html() + "</td>" // 2 - id element
         row += "<td>" + tr_comp.eq(comp_row).find('td').eq(3).html() + "</td>" // 3 - order
         row += "<td>" + tr_comp.eq(comp_row).find('td').eq(4).html() + "</td>" // 4 - type

         comp_row += 1

      }  else if(tr_cap.eq(cap_row).find('td').eq(2).html() == vector_ids[x]) {
         row += "<td>" + tr_cap.eq(cap_row).find('td').eq(0).html() + "</td>"
         row += "<td>" + tr_cap.eq(cap_row).find('td').eq(1).html() + "</td>"
         row += "<td>" + tr_cap.eq(cap_row).find('td').eq(2).html() + "</td>"
         row += "<td>" + tr_cap.eq(cap_row).find('td').eq(3).html() + "</td>"
         row += "<td>" + tr_cap.eq(cap_row).find('td').eq(4).html() + "</td>"
         
         cap_row += 1

      } else {
         row += "<td>" + tr_pro.eq(pro_row).find('td').eq(0).html() + "</td>"
         row += "<td>" + tr_pro.eq(pro_row).find('td').eq(1).html() + "</td>"
         row += "<td>" + tr_pro.eq(pro_row).find('td').eq(2).html() + "</td>"
         row += "<td>" + tr_pro.eq(pro_row).find('td').eq(3).html() + "</td>"
         row += "<td>" + tr_pro.eq(pro_row).find('td').eq(4).html() + "</td>"
         
         pro_row += 1
      }

      row += "<td></td>" // 5 - Competence of competences
      row += "<td></td>" // 6 - Competences
      row += "<td></td>" // 7 - Capability inside competence
      row += "<td></td>" // 8 - Capabiities inside a competence
      row += "<td></td>" // 9 -
      row += "<td></td>" // 10 - 
      row += "<td></td>" // 11 - Percentage
      row += "<td></td>" // 12 -Definitions
      row += "</tr>"

      $("#body_new_table").append(row)
   }
}


// --- Add the parcial and total number of competences in each row
function add_competences_count() {   
   let count_comp = 1

   $("#body_new_table tr").each(function(index) {
      if(index == 0) {
         $(this).find('td').eq(5).html(1)

      } else if($(this).find('td').eq(4).html() == 'competence') {
         count_comp += 1
         $(this).find('td').eq(5).html(count_comp)

      } else {
         $(this).find('td').eq(5).html(count_comp)
      }
   })

   $("#body_new_table tr").each(function() {
      $(this).find('td').eq(6).html(count_comp)
   })
}


// --- Add the parcial and total number of capabilities in each row
function add_capabilities_count() {
   let vector = [] // First postion is no valid
   let count = 0
   let vector_count = 1 // Starts in one because variable vector first position is invalid

   $("#body_new_table tr").each(function() {
      if($(this).find('td').eq(4).html()  == 'competence') {
         vector.push(count)
         count = 0

      } else if($(this).find('td').eq(4).html()  == 'capability') {
         count += 1
         $(this).find('td').eq(7).html(count)
      }
   })

   vector.push(count)

   // --- Adding a column with the total number of capabilities per competence
   $("#body_new_table tr").each(function(index) {
      if(index == 0) {
         $(this).find('td').eq(8).html(vector[vector_count])

      }  else if($(this).find('td').eq(4).html() == 'competence') {
         vector_count += 1
         $(this).find('td').eq(8).html(vector[vector_count])

      } else {
         $(this).find('td').eq(8).html(vector[vector_count])
      }
   })   
}


// --- Add the parcial and total number of processes in each row
function add_processes_count() {
   let count = 1, x = 0, vector_count = 0
   let vector = []

   // --- Counting how many processe in each capability
   for(x = 0; x < $("#body_new_table tr").length; x++) {      
      while($("#body_new_table").find('tr').eq(x).find('td').eq(4).html() != 'process') {         
         x += 1
      }

      while($("#body_new_table").find('tr').eq(x).find('td').eq(4).html() == 'process') {
         x += 1
         vector_count += 1
      }

      vector.push(vector_count)
      vector_count = 0
   }   
   
   // --- Adding the total processes per capability
   for(x = 0; x < $("#body_new_table tr").length; x++) {
      while($("#body_new_table").find('tr').eq(x).find('td').eq(4).html() != 'process') {
         x += 1
      }

      while($("#body_new_table").find('tr').eq(x).find('td').eq(4).html() == 'process') {         
         $("#body_new_table").find('tr').eq(x).find('td').eq(9).html(vector[vector_count])
         x += 1
      }

      vector_count += 1
   }
}


// --- Puting the evaluation form order
function put_order_evaluation() {
   let order = 1

   $("#body_new_table tr").each(function() {
      if($(this).find('td').eq(4).html() != 'process') {
         $(this).find('td').eq(10).html(order)

      } else {
         $(this).find('td').eq(10).html(order)
         order += 1
      }
   })
}

function put_percentages() {
   let id_element, type, row = 0, percentage

   $("#body_new_table tr").each(function() {
      id_element = parseInt($(this).find('td').eq(2).html())
      type = $(this).find('td').eq(4).html()

      if(type == 'competence') {
         $("#body_relation_comp tr").each(function() {
            if(id_element == $(this).find('td').eq(1).html()) {
               percentage = $(this).find('td').eq(0).html()

               $("#body_new_table").find('tr').eq(row).find('td').eq(11).html(percentage)
            }
         })

      } else if(type == 'capability') {
         $("#body_relation_cap tr").each(function() {
            if(id_element == $(this).find('td').eq(1).html()) {
               percentage = $(this).find('td').eq(0).html()

               $("#body_new_table").find('tr').eq(row).find('td').eq(11).html(percentage)
            }
         })

      } else {
         $("#body_relation_pro tr").each(function() {
            if(id_element == $(this).find('td').eq(1).html()) {
               percentage = $(this).find('td').eq(0).html()

               $("#body_new_table").find('tr').eq(row).find('td').eq(11).html(percentage)
            }
         })
      }

      row += 1
   })
}

function put_definitions() {
   let row = 0
   let id_element, type
   let new_table = $("#body_new_table")

   $("#body_new_table tr").each(function(index) {
      type = $(this).find('td').eq(4).html()
      id_element = $(this).find('td').eq(2).html()

      if(type == 'process') {
         $("#body_relation_pro tr").each(function() {
            if(id_element == $(this).find('td').eq(1).html()) {
               new_table.find('tr').eq(row).find('td').eq(12).html($(this).find('td').eq(3).html())
            }
         })         
      }

      row += 1
   })
}

function load_initial_symptoms_questions() {
   let actual_process = $("#input_id_actual_process").val()
   let row = 0
   let rows = $("#body_relation_pro tr").length
   
   while(row < rows) {
      if($("#body_relation_pro").find('tr').eq(row).find('td').eq(1).html() == actual_process) {
         $("#txt_symptoms").text($("#body_relation_pro").find('tr').eq(row).find('td').eq(9).html())

         row = rows
      }

      row += 1
   }
}


// --- Put numbers in labels in the menu fixed bar
function put_count_labels(form) {   
   let comp_partial, comp_total, cap_partial, cap_total, pro_partial, pro_total
   let table = $("#body_new_table")
   let table_row = 0, total_rows = $("#body_new_table tr").length

   while(parseInt(table.find('tr').eq(table_row).find('td').eq(10).html()) <= parseInt(form) & table_row < total_rows) {
      if(table.find('tr').eq(table_row).find('td').eq(4).html() == 'competence') {
         comp_partial = table.find('tr').eq(table_row).find('td').eq(5).html()
         comp_total = table.find('tr').eq(table_row).find('td').eq(6).html()
         $("#label_count_competences").text("Competence " + comp_partial + " of " + comp_total)
      }
            
      if(table.find('tr').eq(table_row).find('td').eq(4).html() == 'capability') {
         cap_partial = table.find('tr').eq(table_row).find('td').eq(7).html()
         cap_total = table.find('tr').eq(table_row).find('td').eq(8).html()
         $("#label_count_capabilities").text("Capability " + cap_partial + " of " + cap_total)
      }

      if(table.find('tr').eq(table_row).find('td').eq(4).html() == 'process') {
         pro_partial = table.find('tr').eq(table_row).find('td').eq(0).html()
         pro_total = table.find('tr').eq(table_row).find('td').eq(9).html()
         $("#label_count_processes").text("Process " + pro_partial + " of " + pro_total)
      }

      table_row += 1
   }
}


// --- Put elements names
function put_elements_names(form) {   
   let comp_letter, comp_name, cap_number, cap_name, pro_number, pro_name, percentage, definitions
   let table = $("#body_new_table")
   let table_row = 0, total_rows = $("#body_new_table tr").length

   while(parseInt(table.find('tr').eq(table_row).find('td').eq(10).html()) <= parseInt(form) & table_row < total_rows) {
      percentage = table.find('tr').eq(table_row).find('td').eq(11).html()

      if(table.find('tr').eq(table_row).find('td').eq(4).html() == 'competence') {
         comp_letter = table.find('tr').eq(table_row).find('td').eq(0).html()
         comp_name = table.find('tr').eq(table_row).find('td').eq(1).html()      
         $("#input_id_actual_competence").val(table.find('tr').eq(table_row).find('td').eq(2).html())
         $("#label_name_competence").text(comp_letter + " - " + comp_name + " " + percentage + " %")
      }

      if(table.find('tr').eq(table_row).find('td').eq(4).html() == 'capability') {
         cap_number = table.find('tr').eq(table_row).find('td').eq(0).html()
         cap_name = table.find('tr').eq(table_row).find('td').eq(1).html()         
         $("#input_id_actual_capability").val(table.find('tr').eq(table_row).find('td').eq(2).html())
         $("#label_name_capability").text(cap_number + " - " + cap_name + " " + percentage + " %")
      }

      if(table.find('tr').eq(table_row).find('td').eq(4).html() == 'process') {
         pro_number = table.find('tr').eq(table_row).find('td').eq(0).html()
         pro_name = table.find('tr').eq(table_row).find('td').eq(1).html()         
         definitions = table.find('tr').eq(table_row).find('td').eq(12).html()
         $("#input_id_actual_process").val(table.find('tr').eq(table_row).find('td').eq(2).html())
         $("#label_name_process").text(pro_number + " - " + pro_name + " " + percentage + " %")
         $("#txt_definitions").text(definitions)
      }      
      
      table_row += 1
   }                 
}




/**
 * Change elements in the menu bar and elements name when the user navigate through
 *    the processes
 */
$("#div_buttons_menu_in_progress").on('click', "#next_process", function() {
   let total_forms = parseInt($("#body_new_table tr:last").find('td').eq(10).html())

   $("#input_form_number").val(parseInt($("#input_form_number").val()) + 1)
   
   if($("#input_form_number").val() <= total_forms) {
      structure_all_buttons_available()
      put_count_labels(parseInt($("#input_form_number").val()))
      put_elements_names(parseInt($("#input_form_number").val()))
            
   } else {
      end_of_the_road('No more processes')
   }

   //put_assess_one()
   load_symptoms_questions('symptoms')
   let score = load_scores()
   change_maturity_guide(score)
})

// --- Previous process
$("#div_buttons_menu_in_progress").on('click', "#previous_process", function() {   
   $("#input_form_number").val(parseInt($("#input_form_number").val()) - 1)
      
   if($("#input_form_number").val() > 1) {
      structure_all_buttons_available()
      put_count_labels($("#input_form_number").val())
      put_elements_names($("#input_form_number").val())

   } else {
      structure_previous_button_non_available()
      put_count_labels($("#input_form_number").val())
      put_elements_names($("#input_form_number").val())
   }

   //put_assess_one()
   load_symptoms_questions('symptoms')
   let score = load_scores()   
   change_maturity_guide(score)
})




/**
 * Load scores
 */
function load_scores() {
   let id_process = parseInt($("#input_id_actual_process").val())
   let score = 0

   $("#body_scores tr").each(function() {      
      if($(this).find('td').eq(2).html() == id_process) {         
         score = $(this).find('td').eq(0).html()         

         $(".score").each(function() {
            if($(this).val() == score) {
               $(this).prop('checked', true)
            }
         })         
      }
   })

   return score
}




/**
 * Advancing and rolling back capbilities
 */
$("#div_buttons_menu_in_progress").on('click', "#next_capability", function() {
   next_capability()
   //put_assess_one()
   load_symptoms_questions('symptoms')
   let score = load_scores()   
   change_maturity_guide(score)
})

$("#div_buttons_menu_in_progress").on('click', "#previous_capability", function() {
   previous_capability()
   //put_assess_one()
   load_symptoms_questions('symptoms')
   let score = load_scores()   
   change_maturity_guide(score)
})


// --- Next capability
function next_capability() {
   let actual_form = parseInt($("#input_form_number").val())
   let x = 0
   let table = $("#body_new_table")
   let rows = $("#body_new_table tr").length


   // The counter is advanced until the row is found
   while(parseInt(table.find('tr').eq(x).find('td').eq(10).html()) <= actual_form) {
      x += 1
   }

   // --- Searching capability
   while(table.find('tr').eq(x).find('td').eq(4).html() != 'capability' & x < rows) {
      x +=1
   }

   if(x == rows) {
      end_of_the_road("No more capabilities")
      return false
   }

   structure_all_buttons_available()
   
   put_element_numbers(table, 'capability', x,  7, 8, $("#label_count_capabilities"), 'Capability')
   put_element_letters(table, 'capability', x,  0, 1, $("#label_name_capability"))

   // --- Searching process   
   while(table.find('tr').eq(x).find('td').eq(4).html() != 'process') {
      x +=1
   }
   
   put_element_numbers(table, 'process', x,  0, 9, $("#label_count_processes"), 'Process')
   put_element_letters(table, 'process', x,  0, 1, $("#label_name_process"))   

   // Puting new form number
   $("#input_form_number").val(table.find('tr').eq(x).find('td').eq(10).html())

   // --- Searching competence   
   while(table.find('tr').eq(x).find('td').eq(4).html() != 'competence') {
      x -=1
   }
   
   put_element_numbers(table, 'competence', x,  5, 6, $("#label_count_competences"), 'Competence')
   put_element_letters(table, 'competence', x,  0, 1, $("#label_name_competence"))      
}


function previous_capability() {   
   let x = 0
   let table = $("#body_new_table")
   let rows = $("#body_new_table tr").length
   let actual_id_capability = parseInt($("#input_id_actual_capability").val())
   let flag = true
   let count_cap = 0

   // The counter is advanced until the actual capability is found
   while(flag & x < rows) {
      x += 1
      
      if(parseInt(table.find('tr').eq(x).find('td').eq(2).html()) == actual_id_capability) {
         flag = false
         x -= 1
      }      
   }

   // --- Searching capability
   while(table.find('tr').eq(x).find('td').eq(4).html() != 'capability' & x >= 0) {
      x -=1      
   }
         
   put_element_numbers(table, 'capability', x,  7, 8, $("#label_count_capabilities"), 'Capability')
   put_element_letters(table, 'capability', x,  0, 1, $("#label_name_capability"))

   // --- Searching process
   while(table.find('tr').eq(x).find('td').eq(4).html() != 'process') {
      x +=1
   }
   
   put_element_numbers(table, 'process', x,  0, 9, $("#label_count_processes"), 'Process')
   put_element_letters(table, 'process', x,  0, 1, $("#label_name_process"))

   // Puting new form number
   $("#input_form_number").val(table.find('tr').eq(x).find('td').eq(10).html())

   // --- Searching competence   
   while(table.find('tr').eq(x).find('td').eq(4).html() != 'competence') {
      x -=1
   }
   
   put_element_numbers(table, 'competence', x,  5, 6, $("#label_count_competences"), 'Competence')
   put_element_letters(table, 'competence', x,  0, 1, $("#label_name_competence"))


   // If the capability is the first capability I change the bar buttons
   actual_id_capability = parseInt($("#input_id_actual_capability").val())
   x = 0

   while(x < rows & $("#body_new_table").find('tr').eq(x).find('td').eq(2).html() != actual_id_capability) {      
      if($("#body_new_table").find('tr').eq(x).find('td').eq(4).html() == 'capability') {
         count_cap += 1
         x = rows
      }

      x += 1
   }

   if(count_cap == 0) {
      end_of_the_road("No more capabilities")
      structure_previous_button_non_available()   
   }
}


// --- Put elements in the menu bar and the title
function put_element_numbers(table, type, row, col_one, col_two, label, element) {
   let column_one, column_two      

   if(table.find('tr').eq(row).find('td').eq(4).html() == type) {
      column_one = table.find('tr').eq(row).find('td').eq(col_one).html()
      column_two = table.find('tr').eq(row).find('td').eq(col_two).html()
      label.text( element + " " + column_one + " of " + column_two)
   }
}

function put_element_letters(table, type, row, col_one, col_two, label) {
   let column_one, column_two, percentage, definitions

   if(table.find('tr').eq(row).find('td').eq(4).html() == type) {
      column_one = table.find('tr').eq(row).find('td').eq(col_one).html()
      column_two = table.find('tr').eq(row).find('td').eq(col_two).html()
      percentage = table.find('tr').eq(row).find('td').eq(11).html()
      definitions = table.find('tr').eq(row).find('td').eq(12).html()

      label.text(column_one + " - " + column_two + " " + percentage + " %")

      if(type == 'capability') {
         $("#input_id_actual_capability").val(table.find('tr').eq(row).find('td').eq(2).html())

      } else if(type == 'competence') {
         $("#input_id_actual_competence").val(table.find('tr').eq(row).find('td').eq(2).html())

      } else {
         $("#txt_definitions").text(definitions)
         $("#input_id_actual_process").val(table.find('tr').eq(row).find('td').eq(2).html())
      }
   }
}

// --- Message to notify that thera are no more capabilities or processes
function end_of_the_road(message) {
   let company = $("#label_company_name").text()
   let relation = $("#label_relation_name").text()   
   
   $("#label_company_name").text(message)
   $("#label_relation_name").text('')

   $("#label_company_name").css({
      'color':'red',
      'font-weight':'bold',
   })
   
   setTimeout(function() {
      $("#label_company_name").text(company)
      $("#label_relation_name").text(relation)

      $("#label_company_name").css({
         'color':'black',
         'font-weight':'normal',
      }) 
   }, 2000)
}




/**
 * Div buttons menu in progres structures
 */
function structure_all_buttons_available() {
   let comp = $("#label_count_competences").text()
   let cap = $("#label_count_capabilities").text()
   let pro = $("#label_count_processes").text()
   let id_eva = $("#input_id_eva").val()

   $("#div_buttons_menu_in_progress").empty()

   let div = "<label id='previous_process' class='change'>Previous<br>process</label>"
   div += "<label id='previous_capability' class='change'>Previous<br>capability</label>"
   div += "<a class='change' href='/evaluations/'>Back to<br>evaluations</a>"
   div += "<div id='div_labels_count_elements'>"
   div += "<label id='label_count_competences'>" + comp + "</label>"
   div += "<label id='label_count_capabilities'>" + cap + "</label>"
   div += "<label id='label_count_processes'>" + pro + "</label>"   
   div += "</div>"
   div += "<label id='label_save_score' class='change'>Save</label>"
   div += "<label id='next_capability' class='change'>Next<br>capability</label>"
   div += "<label id='next_process' class='change'>Next<br>process</label>"

   $("#div_buttons_menu_in_progress").append(div)
}

function structure_previous_button_non_available() {
   let comp = $("#label_count_competences").text()
   let cap = $("#label_count_capabilities").text()
   let pro = $("#label_count_processes").text()
   let id_eva = $("#input_id_eva").val()   

   $("#div_buttons_menu_in_progress").empty()
                  
   let div = "<a class='change' href='/evaluations/continue/" + id_eva + "'>Back to<br>data</a>"
   div += "<label>- - -</label>"
   div += "<a class='change' href='/evaluations/'>Back to<br>evaluations</a>"
   div += "<div id='div_labels_count_elements'>"
   div += "<label id='label_count_competences'>" + comp + "</label>"
   div += "<label id='label_count_capabilities'>" + cap + "</label>"
   div += "<label id='label_count_processes'>" + pro + "</label>"   
   div += "</div>"
   div += "<label id='label_save_score' class='change'>Save</label>"
   div += "<label id='next_capability' class='change'>Next<br>capability</label>"
   div += "<label id='next_process' class='change'>Next<br>process</label>"

   $("#div_buttons_menu_in_progress").append(div)
}




/**
 * Put initial score
 */
function put_initial_score() {
   let form = parseInt($("#input_form_number").val())   
   let score = 0
   
   $("#body_scores tr").each(function() {
      if(form == $(this).find('td').eq(1).html()) {
         score = $(this).find('td').eq(0).html()
      }
   })
   
   $(".score").each(function() {
      if($(this).val() == score) {
         $(this).prop('checked',true)
      }
   })
}




/**
 * Change maturity scale
 */
$(".button_maturity").click(function() {
   let direction = $(this).attr('data-id')
   let number = parseInt($("#label_maturity").text())

   if(direction == 'down') {
      if(number > 1) {
         number -= 1
      }

   } else {
      if(number < 5) {
         number += 1
      }
   }
   
   change_maturity_guide(number)
})


function change_maturity_guide(row) {
   let actual_process = $("#input_id_actual_process").val()
   let column = parseInt(row) + 3

   if(parseInt(row) == 0) {
      row = 1
   }
   
   $("#body_relation_pro tr").each(function() {
      if($(this).find('td').eq(1).html() == actual_process) {         
         $("#txt_maturity").text($(this).find('td').eq(column).html())
         $("#label_maturity").text(row)
      }
   })
}


$(".label_symptoms_questions").hover(function() {   
   let data_id = $(this).attr('data-id')
   
   load_symptoms_questions(data_id)
})

function load_symptoms_questions(text) {   
   let actual_process = $("#input_id_actual_process").val()
   let row = 0
   let rows = $("#body_relation_pro tr").length   
   
   if(text == 'symptoms') {
      $("#txt_symptoms").css({
         'display':'block',         
      })

      $("#label_symptoms").css({
         'font-weight':'bold',
         'font-size':'1.5rem'
      })

      $("#txt_questions").css('display','none')

      $("#label_questions").css({
         'font-weight':'normal',
         'font-size':'1.3rem'
      })

      column = 9
      textarea = $("#txt_symptoms")

   } else {
      $("#txt_questions").css({
         'display':'block',
         'font-weight':'bold',
         'font-size':'1.5rem'
      })

      $("#label_questions").css({
         'font-weight':'bold',
         'font-size':'1.5rem'
      })

      $("#txt_symptoms").css('display','none')

      $("#label_symptoms").css({
         'font-weight':'normal',
         'font-size':'1.3rem'
      })

      column = 10
      textarea = $("#txt_questions")
   }

   while(row < rows) {
      if($("#body_relation_pro").find('tr').eq(row).find('td').eq(1).html() == actual_process) {
         $("#txt_symptoms").text($("#body_relation_pro").find('tr').eq(row).find('td').eq(9).html())

         row = rows
      }

      row += 1
   }
}



















