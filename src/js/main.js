// $('#myCarousel1, #myCarousel2').carousel()
$(document).ready(function(){
  $("header .burger-menu").click(function() {
    $(".menu-container").slideToggle(300);
  });

  var clickDelay = 500;
     var clickTimer = null;
     $(".burger-menu").on('click', function() {
       if (clickTimer == null) {
        var burgerClick = $(this)
        burgerClick.toggleClass('active')
        if (!burgerClick.hasClass('active')) {
         burgerClick.addClass('close');
        }
        clickTimer = setTimeout(function () {
        burgerClick.removeClass('close');
        clearTimeout(clickTimer);
        clickTimer = null;
        }, clickDelay);
      }
    })

  $('#carouselFirst, #carouselSecond').carousel({
    interval: false
  });
});