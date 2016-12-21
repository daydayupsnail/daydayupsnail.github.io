$(function(){   
  $(".title").on("click",function(){
    var p=$(this).parent(),
        brother=p.find(".foldcont"),
        foldbox = p.find(".fold");
    if(p.hasClass("on")){
      foldbox.removeClass("on");
      brother.slideUp(function(){
        p.removeClass("on");
      });
    }else{
      foldbox.addClass("on");
      brother.slideDown(function(){
        p.addClass("on");
      });
    }
  });
});