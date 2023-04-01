/** 
 * When the user scrolls down, hide the navbar. When the user scrolls up, show the navbar
 */
var prevScrollpos = window.pageYOffset;

window.onscroll = function() {
   var currentScrollPos = window.pageYOffset;

   if (prevScrollpos > currentScrollPos) {      
      $(".background_menu").css('top', '0')
      $("#div_include_general_menu").css('top', '5rem')
      $("#div_elements_title").css('top', '8.5rem')
   
   } else {      
      $(".background_menu").css('top', '-5rem')
      $("#div_include_general_menu").css('top', '0')
      $("#div_elements_title").css('top', '3.5rem')
   }
   
   prevScrollpos = currentScrollPos;
}




