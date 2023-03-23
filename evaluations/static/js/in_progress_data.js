/**
 * Exports and investment
 */
// Hover over arrows
$(".exporting").on('mouseenter', function() {
   $(this).css({
      'cursor':'pointer',
      'font-weight':'bold',
      'font-size':'2.1rem',
   })
})

$(".exporting").on('mouseleave', function() {
   $(this).css({
      'cursor':'normal',
      'font-weight':'normal',
      'font-size':'2rem',
   })
})


// Click in arrow to change the value in label years
$("#down_exporting_long").click(function() {
   let years = parseInt($("#years_exporting").text())

   if(years > 4) {
      years -= 5
      $("#years_exporting").text(years)
   }
})

$("#down_exporting").click(function() {
   let years = parseInt($("#years_exporting").text())

   if(years > 0) {
      years -= 1
      $("#years_exporting").text(years)
   }
})

$("#up_exporting").click(function() {
   let years = parseInt($("#years_exporting").text())

   if(years < 1000) {
      years += 1
      $("#years_exporting").text(years)
   }
})

$("#up_exporting_long").click(function() {
   let years = parseInt($("#years_exporting").text())

   if(years < 995) {
      years += 5
      $("#years_exporting").text(years)
   }
})


// Zero label
$("#zero_exporting").click(function() {
   $("#years_exporting").text(0)
})

$("#zero_exporting").on('mouseenter', function() {
   $(this).css({
      'cursor':'pointer',
      'font-weight':'bold',
      'font-size':'1.6rem',
   })
})

$("#zero_exporting").on('mouseleave', function() {
   $(this).css({
      'cursor':'normal',
      'font-weight':'normal',
      'font-size':'1.5rem',
   })
})


// Export variation
$(".variation").on('mouseenter', function() {
   $(this).css({
      'cursor':'pointer',
      'font-weight':'bold',
      'font-size':'2.1rem',
   })
})

$(".variation").on('mouseleave', function() {
   $(this).css({
      'cursor':'normal',
      'font-weight':'normal',
      'font-size':'2rem',
   })
})


// Click in arrow to change the value in label variation
$("#down_variation_long").click(function() { 
   let years = parseInt($("#variation").text())

   if(years > 4) {
      years -= 5
      $("#variation").text(years)
   }
})

$("#down_variation").click(function() {
   let years = parseInt($("#variation").text())

   if(years > 0) {
      years -= 1
      $("#variation").text(years)
   }
})

$("#up_variation").click(function() {
   let years = parseInt($("#variation").text())

   if(years < 1000) {
      years += 1
      $("#variation").text(years)
   }
})

$("#up_variation_long").click(function() {
   let years = parseInt($("#variation").text())

   if(years < 995) {
      years += 5
      $("#variation").text(years)
   }
})


// Zero label
$("#zero_variation").click(function() {
   $("#variation").text(0)
})

$("#zero_variation").on('mouseenter', function() {
   $(this).css({
      'cursor':'pointer',
      'font-weight':'bold',
      'font-size':'1.6rem',
   })
})

$("#zero_variation").on('mouseleave', function() {
   $(this).css({
      'cursor':'normal',
      'font-weight':'normal',
      'font-size':'1.5rem',
   })
})




/**
 * Main products
 */
// --- Up, down, and zero percentage
$("#down_percentage").click(function() {
   let percentage = parseInt($("#input_percentage").val())

   if(percentage > 4) {
      percentage -= 5
      $("#input_percentage").val(percentage)
   }
})

$("#up_percentage").click(function() {
   let percentage = parseInt($("#input_percentage").val())

   if(percentage < 96) {
      percentage += 5
      $("#input_percentage").val(percentage)
   }
})

$("#zero_percentage").click(function() {      
   $("#input_percentage").val(0)   
})

// --- Add product to the table
$("#add_product").click(function() {
   let rows = $("#tbody_products tr").length

   if(rows < 3 && $("#input_product").val().length > 2) {
      let product = $("#input_product").val()
      let percentage = $("#input_percentage").val()

      let row = "<tr>"
      row += "<td>" + product + "</td>";
      row += "<td style='text-align:center'>" + percentage + "</td>";
      row += "<td style='text-align:center' class='remove_row'>Remove</td>";
      row += "</tr>";

      $("#tbody_products").append(row)

      $("#input_product").val('')
      $("#input_percentage").val('0')
      $("#input_product").focus()
   }
})

// --- Remove product from table
$("#div_main_products").on('click', '.remove_row', function() {
   $(this).closest("tr").remove();      
})

// --- Hover over remove row label
$("#div_main_products").on('mouseenter', '.remove_row', function() {
   $(this).css({
      'font-weight':'bold',
      'cursor':'pointer',
   })
})

$("#div_main_products").on('mouseleave', '.remove_row', function() {
   $(this).css({
      'font-weight':'normal',
      'cursor':'normal',
   })
})




/**
 * Employees
 */
// Zero label
$("#zero_average").click(function() {
   $("#average").text(0)
})


// Click in arrow to change the value in label averabe
$("#down_average_long").click(function() { 
   let years = parseInt($("#average").text())

   if(years > 4) {
      years -= 5
      $("#average").text(years)
   }
})

$("#down_average").click(function() {
   let years = parseInt($("#average").text())

   if(years > 0) {
      years -= 1
      $("#average").text(years)
   }
})

$("#up_average").click(function() {
   let years = parseInt($("#average").text())

   if(years < 1000) {
      years += 1
      $("#average").text(years)
   }
})

$("#up_average_long").click(function() {
   let years = parseInt($("#average").text())

   if(years < 995) {
      years += 5
      $("#average").text(years)
   }
})





/** -----------------------------------
 * Generic functions
 */
// --- Zero label
$(".zero").click(function() {
   let label_name = "#" + $(this).attr('data-id')
   $(label_name).text(0)   
})

// --- Arrows
$(".down_long").click(function() {   
   let label_name = "#" + $(this).attr('data-id')
   let label = $(label_name)
   let value = parseInt(label.text())

   if(value > 4) {
      value -= 5
      label.text(value)
   }
})

$(".down").click(function() {
   let label_name = "#" + $(this).attr('data-id')
   let label = $(label_name)
   let value = parseInt(label.text())

   if(value > 0) {
      value -= 1
      label.text(value)
   }
})

$(".up").click(function() {
   let label_name = "#" + $(this).attr('data-id')
   let label = $(label_name)
   let value = parseInt(label.text())

   if(value < 999) {
      value += 1
      label.text(value)
   }
})

$(".up_long").click(function() {
   let label_name = "#" + $(this).attr('data-id')
   let label = $(label_name)
   let value = parseInt(label.text())

   if(value < 995) {
      value += 5
      label.text(value)
   }
})






















