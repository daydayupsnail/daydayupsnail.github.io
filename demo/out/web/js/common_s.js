$(function(){
  // h1 导航切换效果
  $(".maincontent h1 .un").hover(function(){
    var oldon = $(this).parents("h1").eq(0).find("div").not('.un');
    $(this).addClass("act");
    oldon.addClass("dis");
  },function(){
    var oldon = $(this).parents("h1").eq(0).find(".dis");
    $(this).removeClass("act");
    oldon.removeClass("dis");
  });
});