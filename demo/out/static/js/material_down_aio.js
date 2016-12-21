
$(function(){
  
    require(['web/widget/zoombox'],function(ZoomBox){
      new ZoomBox({
        "element":$(".sourse .imgbg"),
        "edgehided":true,
        "triggeredselector":".imgbg",
        "timeIn":500,
        "timeOut":200,
        "width":220,
        "height":143,
        "size":1.2
      });
    
    });
});
