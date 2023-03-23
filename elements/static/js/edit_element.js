/**
 * Show the corresponding textarea with the additional info to fill
 */
$('.label_element').hover(function() {   
   element = $(this).attr('data-element')   

   $(".label_element").each(function() {
      if ($(this).attr("data-element") == element) {
         $(this).css('font-weight', 'bold')
      } else {
         $(this).css('font-weight', 'normal')
      }
   })

   $(".add_info").each(function() {            
      if((this).name == element) {
         $(this).css('display','block')
         $(this).focus()
      }
   })

   $(".add_info").each(function() {
      if((this).name != element) {
         $(this).css('display','none')                             
      }      
   })
})




/**
 * Group of functions to count characters and line breaks of the element name
 */
$("#element_name").on("focus", function() {   
   $("#name_span_counter").css("visibility", "visible");
   contarCaracteres($(this), $("#name_span_counter"));
});

$("#element_name").on("input", function() {    
   limitaSaltosLinea($(this), 2);
   contarCaracteres($(this), $("#name_span_counter"));
});

$("#element_name").on("focusout", function() {
   $("#name_span_counter").text("");
   $("#name_span_counter").css("visibility", "hidden");    
});




/**
 * Group of functions to count characters and line breaks of the element comments
 */
$("#element_comments").on("focus", function() {
   $("#comments_span_counter").css("visibility", "visible");
   contarCaracteres($(this), $("#comments_span_counter"));
});

$("#element_comments").on("input", function() {    
   limitaSaltosLinea($(this), 2);
   contarCaracteres($(this), $("#comments_span_counter"));
});

$("#element_comments").on("focusout", function()
{
   $("#comments_span_counter").text("");
   $("#comments_span_counter").css("visibility", "hidden");    
});




/**
 * Group of functions to count characters and line breaks of the element extras
 */
$(".add_info").on("focus", function() {   
   $("#extras_label_counter").css("visibility", "visible");
   contarCaracteres($(this), $("#extras_label_counter"));
});

$(".add_info").on("input", function() {    
   limitaSaltosLinea($(this), 8);
   contarCaracteres($(this), $("#extras_label_counter"));
});

$(".add_info").on("focusout", function()
{
   $("#extras_label_counter").text("");
   $("#extras_label_counter").css("visibility", "hidden");    
});


























