/**
 *  When document is ready
 */
$(document).ready(function() {
   /* --- Variables */
   let id_industry = $("#select_industry").val()
   
   
   // --- If add or edit   
   if($("#div_add_title h1").text() === 'Add Company') {
      load_supersector(id_industry)
      load_sector($("#select_supersector").val())
      load_subsector($("#select_sector").val())
   } else {
      let subsector = $("#input_subsector_hidden").val()
      let sector = $("#input_sector_hidden").val()
      let supersector = $("#input_supersector_hidden").val()
      let industry = $("#input_industry_hidden").val()
      put_update_information(subsector, sector, supersector, industry)
   }   
})




/**
 * Load and remove options of selects related with industries 
 */
function load_supersector(id) {
   let value, text

   $("#body_supersector_hidden tr").each(function() {
      if($(this).find('td').eq(1).html() == id) {
         value = $(this).find('td').eq(0).html()
         industry_id = $(this).find('td').eq(1).html()
         text = $(this).find('td').eq(2).html()

         create_option(value, text, $("#select_supersector"), industry_id)
      }
   })
}

function load_sector(id) {   
   $("#body_sector_hidden tr").each(function() {
      if($(this).find('td').eq(1).html() == id) {
         value = $(this).find('td').eq(0).html()
         supersector_id = $(this).find('td').eq(1).html()
         text = $(this).find('td').eq(2).html()

         create_option(value, text, $("#select_sector"), supersector_id)
      }
   })
}

function load_subsector(id) {   
   $("#id_subsector option").remove()

   $("#body_subsector_hidden tr").each(function() {
      if($(this).find('td').eq(1).html() == id) {
         value = $(this).find('td').eq(0).html()
         sector_id = $(this).find('td').eq(1).html()
         text = $(this).find('td').eq(2).html()

         create_option(value, text, $("#id_subsector"), sector_id)
      }
   })
}

function create_option(value, text, select_name, id_attr) {   
   let option = "<option value=" + value + " id=" + id_attr + ">" + text + "</option>"

   select_name.append(option);      
}

function remove_selects_industries() {
   $("#select_supersector option").remove()
   $("#select_sector option").remove()
   $("#id_subsector option").remove()
}




/**
 * When selects related with industries change
 */
$("#select_industry").on('change', function() {
   remove_selects_industries()   
   load_supersector($(this).val())
   load_sector($("#select_supersector").val())
   load_subsector($("#select_sector").val())
})

$("#select_supersector").on('change', function() {
   $("#select_sector option").remove()
   $("#id_subsector option").remove()
   
   load_sector($("#select_supersector").val())
   load_subsector($("#select_sector").val())
})

$("#select_sector").on('change', function() {  
   $("#id_subsector option").remove()
      
   load_subsector($("#select_sector").val())
})




/**
 * Put update industry information when page is already loaded 
 */
function put_update_information(subsector, sector, supersector, industry) {      
   load_subsector(sector)
   $("#id_subsector").val(subsector).change()
   
   load_sector(supersector)   
   $("#select_sector").val(sector).change()
   
   load_supersector(industry)
   $("#select_supersector").val(supersector).change()   

   $("#select_industry").val(industry).change()
}






























