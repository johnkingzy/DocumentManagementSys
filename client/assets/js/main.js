$(function() {

$(".avatar").click(function() {

    $(".avatar").not(this).removeClass("hover");

    $(this).toggleClass("hover");

  });
});