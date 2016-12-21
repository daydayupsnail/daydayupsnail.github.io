
$(function(){
  $(".tabnav div").click(function(){
    var laston= $(this).parent().find(".on"),
        lastindex=laston.index();
    laston.removeClass("on");
    $(this).addClass("on");
    //
    var index= $(this).index();
    $(".tab.on").removeClass("on");
    $(".tab").eq(index).addClass("on");
   //
   $(".tabnav div").eq(lastindex).removeClass("hid");
   $(".tabnav div").eq(lastindex-1).removeClass("hid");
    $(this).addClass("hid");
    if( index-1 > -1){
      $(".tabnav div").eq(index-1).addClass("hid");
    }
    
    
  });
  
});
