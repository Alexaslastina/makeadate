$.fn.burgerNav = function(_navTag) {
  $(this).on("click",() => {
    //alert("dddd")
    $(_navTag).fadeToggle(800);
  })
}