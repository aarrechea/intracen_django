/**
 *  When document is ready
 */
$(document).ready(function() {
   /* --- Variables */
   let id_industry = $("#select_industry").val()
   let vector = $("#input_vector").val()   
   let vector_str

   
   // ----- Code
   if(vector[0] == 0) {
      load_supersector(id_industry)
      load_sector($("#select_supersector").val())
      load_subsector($("#select_sector").val())

   } else {
      // --- Load the initial inormation through a vector if edit   
      vector_str = vector.split(",")   
      put_initial_information(vector_str)
   }   
})




/**
 * Load and remove options of selects related with industries 
 */
function load_supersector(id) {
   $("#select_supersector_hidden option").each(function() {
      if($(this).attr('id') == id) {
         create_option($(this).val(), $(this).text(), $("#select_supersector"), $(this).attr('id'))
      }
   })
}

function load_sector(id) {
   $("#select_sector_hidden option").each(function() {
      if($(this).attr('id') == id) {
         create_option($(this).val(), $(this).text(), $("#select_sector"), $(this).attr('id'))
      }
   })
}

function load_subsector(id) {   
   $("#select_subsector_hidden option").each(function() {
      if($(this).attr('id') == id) {

         create_option($(this).val(), $(this).text(), $("#select_subsector"), $(this).attr('id'))
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
   $("#select_subsector option").remove()
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
   $("#select_subsector option").remove()
   
   load_sector($("#select_supersector").val())
   load_subsector($("#select_sector").val())
})

$("#select_sector").on('change', function() {  
   $("#select_subsector option").remove()
      
   load_subsector($("#select_sector").val())
})




/**
 * Create comopany when click in the create button
 */
$("#create_company").click(function() {
   // Variables
   let name = $("#txt_company_name").val()
   let country = $("#select_country").val()
   let city = $("#txt_city").val()
   let address = $("#txt_address").val()
   let postal_code = $("#input_postal_code").val()   
   let subsector = $("#select_subsector").val()
   let year_establishment = $("#input_year_establishment").val()
   let year_first_expo = $("#input_year_first_expo").val()
   let bussines_description = $("#txt_bussines_description").val()
   let comments = $("#txt_comments").val()
   let vector = []


   // --- Validations
   if (name.length <= 3) {
      h1_alert_messages("Company name must have more than three characters")
      return
   }

   if (city.length == 0 || city == '') {city = 'None'}

   if (address.length == 0 || address == '') {address = 'None'}

   if (postal_code.length == 0 || postal_code == '') {postal_code = 'None'}

   if (comments.length == 0 || comments == '') {comments = 'None'}
   
   if (bussines_description.length == 0 || comments == '') { bussines_description = 'None'}

   if (year_establishment.length == 0 || year_establishment == '') {year_establishment = '1950'}

   if (year_first_expo.length == 0 || year_first_expo == '') {year_first_expo = '1950'}


   // --- Fill vector
   vector.push(name)
   vector.push(country)
   vector.push(city)
   vector.push(address)
   vector.push(postal_code)   
   vector.push(subsector)
   vector.push(year_establishment)
   vector.push(year_first_expo)
   vector.push(bussines_description)
   vector.push(comments)

   vector = vector.join(",")
   $("#input_create_company").val(vector)

   $("#form_create_company").submit()
})


// ------ Function to change the h1 title to show alert messages
function h1_alert_messages(message) {
   let element = $("#div_title h1")

   element.text(message)
   element.css({
      'color':'red',
      'font-size':'1.6rem',
   })

   setTimeout(function() {
      let element = $("#div_title h1")
      
      element.text("Add company")
      element.css({
         'color':'black',
         'font-size':'2rem',
      })

   }, 3500)
}




/**
 * Ajax to get all the company information to fill the fields
 */
function put_initial_information(vector) {
   let subsector_sector, sector_supersector, supersector_industry   

   $("#txt_company_name").val(vector[1])
   $("#select_country").val(vector[2])
   $("#txt_city").val(vector[3])
   $("#txt_address").val(vector[4])
   $("#input_postal_code").val(vector[5])   
   $("#input_year_establishment").val(vector[7])
   $("#input_year_first_expo").val(vector[8])
   $("#txt_bussines_description").val(vector[9])
   $("#txt_comments").val(vector[10])   

   subsector_sector = load_subsector_id_data(vector[6])
   load_subsector(subsector_sector)
   $("#select_subsector").val(vector[6]).change()

   sector_supersector = load_sector_id_data(subsector_sector)
   load_sector(sector_supersector)   
   $("#select_sector").val(subsector_sector).change()

   supersector_industry = load_supersector_id_data(sector_supersector)
   load_supersector(supersector_industry)   
   $("#select_supersector").val(sector_supersector).change()   

   $("#select_industry").val(supersector_industry).change()
}

// --- Load industry related select for edit purposes
function load_subsector_id_data(id_subsector) {
   let id_data

   $("#select_subsector_hidden option").each(function() {
      if($(this).val() == id_subsector) {
         id_data = $(this).attr('id')
      }
   })

   return id_data
}

function load_sector_id_data(subsector_id_data) {
   let id_data

   $("#select_sector_hidden option").each(function() {
      if($(this).val() == subsector_id_data) {
         id_data = $(this).attr('id')
      }
   })

   return id_data
}

function load_supersector_id_data(sector_id_data) {
   let id_data

   $("#select_supersector_hidden option").each(function() {
      if($(this).val() == sector_id_data) {
         id_data = $(this).attr('id')
      }
   })

   return id_data
}





















