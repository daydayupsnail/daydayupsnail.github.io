/*导航条*/
$(function(){
  $(".nav ul li").hover(function(){
    $(this).addClass("on");
  },function(){
    $(this).removeClass("on");
  });
  
  $('.topnav ul li').hover(
    function(){
        if($(this).find('.child').width()&&$(this).children('a').width()){
            if($(this).children('a').width()>$(this).find('.child').width()){
                $(this).find('.child').css('width',($(this).children('a').width()+20));
            }else{

            }
        }
        $(this).find('.child').stop(true,true).slideDown();
        //
   },
   function(){
        $(this).find('.child').stop(true,true).slideUp();

   });

});