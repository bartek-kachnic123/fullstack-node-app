$(document).ready(function(){
    // $('.carousel').carousel();
    $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: false
    });
});


function nextItem() {
    $('.carousel.carousel-slider').carousel('next');
}
function prevItem() {
    $('.carousel.carousel-slider').carousel('prev');
}