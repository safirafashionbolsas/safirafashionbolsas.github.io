var width_ = screen.availWidth;
var height_ = screen.availHeight;



$('#menu-toggle').change(function() {
  $('#topMenu').removeClass('showMenu');
  $('#topMenu').addClass('hideMenu');
  $(".IconImg-Mob").css("display","none")
});

$('#menu-toggle1').change(function() {
  $('#topMenu').removeClass('hideMenu');
  $('#topMenu').addClass('showMenu');
  setTimeout(()=>$(".IconImg-Mob").css("display","flex"),400)
        
});

$("#homePage").click((e)=>{
  window.location.href = "./index.html";
})

$("#shopPage").click((e)=>{
  window.location.href = "./shop.html";
})





