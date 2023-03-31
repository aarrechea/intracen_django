/**
 *  When document is ready
 */
$(document).ready(function() {   
   //--- Messages
   let message

   if($(".messages li").length > 0) {
      $(".messages li").each(function() {          
         message = $(this).text()         
      })
   
      h1_alert_messages(message)
   }   
})


// ------ Function to change the h1 title to show alert messages
function h1_alert_messages(message) {
   let element = $("#div_title h1")

   element.text(message)
   
   element.css({
      'color':'rgba(56, 142, 60, 1',
      'font-size':'1.6rem',
   })
    
   setTimeout(function() {
      let element = $("#div_title h1")
      
      element.text("Companies")
      element.css({
         'color':'black',
         'font-size':'2rem',
      })
   }, 3500)
}


/**
 * Showing the additional info modal
 */
$(".information").click(function() {
   let name = $(this).closest('tr').find('td').eq(0).html()
   let country = $(this).closest('tr').find('td').eq(1).html()
   let eva_made = $(this).closest('tr').find('td').eq(2).html()
   let eva_progress = $(this).closest('tr').find('td').eq(3).html()
   let address = $(this).closest('tr').find('td').eq(7).html()
   let postal_code = $(this).closest('tr').find('td').eq(8).html()
   let city = $(this).closest('tr').find('td').eq(9).html()
   let year_establishment = $(this).closest('tr').find('td').eq(10).html()
   let year_first_expo = $(this).closest('tr').find('td').eq(11).html()
   let bussines_description = $(this).closest('tr').find('td').eq(12).html()
   let subsector_id = $(this).closest('tr').find('td').eq(13).html()
   let subsector = find_subsector(subsector_id)
   let sector = find_sector(subsector[0])   
   let supersector = find_supersector(sector[0])
   let industry = find_industry(supersector[0])
   let comments = $(this).closest('tr').find('td').eq(14).html()
   let created = $(this).closest('tr').find('td').eq(15).html()
   let updated = $(this).closest('tr').find('td').eq(16).html()

   $("#txt_name").val(name)
   $("#txt_country").val(country)
   $("#txt_city").val(city)
   $("#txt_postal_code").val(postal_code)
   $("#txt_address").val(address)
   $("#input_eva_made").val(eva_made)
   $("#input_eva_progress").val(eva_progress)
   $("#input_year_establishment").val(year_establishment)
   $("#input_year_first_expo").val(year_first_expo)   
   $("#input_created").val(created)
   $("#input_updated").val(updated)
   $("#txt_industry").val(industry[0])
   $("#txt_supersector").val(supersector[1])
   $("#txt_sector").val(sector[1])
   $("#txt_subsector").val(subsector[1])
   $("#txt_bussines_description").val(bussines_description)
   $("#txt_comments").val(comments)
   

   $("#div_modal").css('display','block')
})

// ----- Find subsector name
function find_subsector(id) {   
   let vector = []

   $("#body_subsector_hidden tr").each(function() {
      if(id == $(this).find('td').eq(0).html()) {
         vector.push($(this).find('td').eq(2).html())
         vector.push($(this).find('td').eq(1).text())
      }
   })

   return vector
}

// ----- Find sector
function find_sector(id) {
   let vector = []

   $("#body_sector_hidden tr").each(function() {
      if(id == $(this).find('td').eq(0).html()) {
         vector.push($(this).find('td').eq(2).html())
         vector.push($(this).find('td').eq(1).text())
      }
   })

   return vector
}

// ----- Find supersector
function find_supersector(id) {
   let vector = []

   $("#body_supersector_hidden tr").each(function() {
      if(id == $(this).find('td').eq(0).html()) {
         vector.push($(this).find('td').eq(2).html())
         vector.push($(this).find('td').eq(1).text())
      }
   })

   return vector
}

// ----- Find industry
function find_industry(id) {
   let vector = []

   $("#body_industry_hidden tr").each(function() {
      if(id == $(this).find('td').eq(0).html()) {         
         vector.push($(this).find('td').eq(1).text())
      }
   })

   return vector
}



/**
 * Close the additional info modal
 */
$("#label_close").click(function() {
   $("#div_modal").css('display','none')
})














