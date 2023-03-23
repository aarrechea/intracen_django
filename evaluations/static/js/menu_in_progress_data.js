/**
 * Save data
 */
$("#save_data").click(function() {
   let change = data_changes()
         
   if(change > 0) {      
      $("#div_modal_changes").css('display','block')      
      let $label = $("<label>").text("Save")
      $label.attr('id','label_save')
      $("#div_changes_buttons").append($label)
   }
})

// --- Get cookie function for ajax to work
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

// --- Execute save - Ajax
$("#div_changes_buttons").on('click', '#label_save', function() {
   let data = load_variables().join(",")
   let products = load_products().join(",")
   let id_eva = $("#input_hidden_id_eva").val()
   
   // --- Ajax
   $.ajax({
      type: 'POST',      
      headers: {'X-CSRFToken': getCookie("csrftoken")},          
      url: "/evaluations/save",
      data: {"id_eva":id_eva, "data":data, "products":products},

      success: function (response) {
         save_button_success_style()
         let data_model = response.data_model
         let products_model = response.main_products

         put_new_values_data(data_model)
         put_new_values_products(products_model)         
      },
      error: function (response) {
          console.log("Fail")
      }
  })

  $("#div_modal_changes").css('display','none')
  $("#label_save").remove()
})


// --- Change save label style to show saving success
function save_button_success_style() {
   $("#save_data").text("Saved")
   $("#save_data").css({
      'font-weight':'bold',
      'color':'green',
      'font-size':'1.5rem',
   })

   setTimeout(function() {
      $("#save_data").text("Save")
      $("#save_data").css({
         'font-weight':'normal',
         'color':'black',
         'font-size':'1.2rem',
      }) 
   }, 3500)
}


// --- Put new values in the table when the data is updated
function put_new_values_data(data_vector) {
   let rows = data_vector.length

   $("#body_hidden_data tr").remove()

   for(x = 0; x < rows; x+=17) {
      let row = "<tr>"
      row += "<td>" + data_vector[x] + "</td>"
      row += "<td>" + data_vector[x+1] + "</td>"
      row += "<td>" + data_vector[x+2] + "</td>"
      row += "<td>" + data_vector[x+3] + "</td>"
      row += "<td>" + data_vector[x+4] + "</td>"
      row += "<td>" + data_vector[x+5] + "</td>"
      row += "<td>" + data_vector[x+6] + "</td>"
      row += "<td>" + data_vector[x+7] + "</td>"
      row += "<td>" + data_vector[x+8] + "</td>"
      row += "<td>" + data_vector[x+9] + "</td>"
      row += "<td>" + data_vector[x+10] + "</td>"
      row += "<td>" + data_vector[x+11] + "</td>"
      row += "<td>" + data_vector[x+12] + "</td>"
      row += "<td>" + data_vector[x+13] + "</td>"
      row += "<td>" + data_vector[x+14] + "</td>"
      row += "<td>" + data_vector[x+15] + "</td>"
      row += "<td>" + data_vector[x+16] + "</td>"
      row += "</tr>"

      $("#body_hidden_data").append(row)
   }
}


// --- Put new values in the table when the data is updated
function put_new_values_products(products_vector) {
   let rows = products_vector.length

   $("#body_hidden_products tr").remove()

   for(x = 0; x < rows; x += 2) {
      let row = "<tr>"
      row += "<td>" + products_vector[x] + "</td>"
      row += "<td>" + products_vector[x+1] + "</td>"
      row += "</tr>"

      $("#body_hidden_products").append(row)
   }
}




/**
 * Check data changes when the user want to browser to another page
 */
function data_changes() {   
   let data = load_variables()
   let products = load_products()   
   let change_data = check_changes_data($("#body_hidden_data tr"), data)
   let change_products = check_changes_products($("#body_hidden_products tr"), products)
   let change = change_data + change_products

   return change
}

// --- Load variables and products from table to a vector
function load_variables() {
   let vector = []

   vector.push($("#years_exporting").text())
   vector.push($("#select_plans").val())
   vector.push($("#variation").text())

   if($("#select_investment").val() == 0) {
      vector.push('False')
   } else {
      vector.push('True')
   }
   
   vector.push($("#average").text())
   vector.push($("#top_middle").text())
   vector.push($("#women").text())
   vector.push($("#women_top").text())
   vector.push($("#select_title").val())
   vector.push($("#input_given_name").val())
   vector.push($("#input_family_name").val())
   vector.push($("#select_gender").val())
   vector.push($("#input_telephone").val())
   vector.push($("#input_email").val())
   vector.push($("#input_bussines_position").val())
   vector.push($("#label_years_post").text())
   vector.push($("#txt_comments").val())
   
   return vector
}

function load_products() {
   let vector = []

   $("#tbody_products tr").each(function() {
      vector.push($(this).find('td').eq(0).html())
      vector.push($(this).find('td').eq(1).html())
   })

   return vector
}

// --- Chack changes in data or products
function check_changes_data(tbody, data) {
   let flag = 0
   
   tbody.find('td').each(function(index) {      
      if($(this).html() != data[index]) {
         flag = 1
      }      
   })        

   return flag
}

function check_changes_products(tbody, data) {
   let flag = 0, x = 0
   let rows = tbody.length
   let data_length = data.length / 2
   
   if(data_length != rows) {
      flag = 1      

   } else if(data_length != 0 & rows != 0) {
      tbody.each(function(index) {
         if($(this).find('td').eq(0).html() != data[x] || $(this).find('td').eq(1).html() != data[x+1]) {
            flag = 1            
         }

         x += 2         
      })
   }

   return flag
}










