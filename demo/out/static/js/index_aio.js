


//所有浮动效果
$(function(){
  /*依赖*/

  require(['web/widget/zoombox','web/widget/slidebox-left-out',"web/widget/carousel-whole","web/widget/scrolltotop"],function(ZoomBox,SlideBox_LeftOut,Carousel,ScrollToTop){
    
    //sectornav 放大效果
    new ZoomBox({
      "element":$(".sectornav a"), 
      "edgehided":true,
      "triggeredselector":"a",
      "timeIn":400,
      "timeOut":200,
      "width":194,
      "height":76,
      "size":1.2
    });

    new ZoomBox({
      "element":$(".imgitem .imgbg"),
      "edgehided":true,
      "triggerselectors":[".bottom",".calendar"],
      "triggeredselector":".imgbg",
      "timeIn":500,
      "timeOut":200,
      "width":354,
      "height":172,
      "size":1.2
    });

    // 侧边栏效果
    new SlideBox_LeftOut({
      "fselector":".aside .wechat",
      "eselector":"img",
      "timeIn":500,
      "timeOut":500
    });
    
    //活动预告切换
    new Carousel({
      "fselector":".slidepage",
      "selector":".page",
      "lastbutton":".pagenav .last",
      "nextbutton":".pagenav .next",
      "autofalse":true,
      "animationtime":800
    });
    
    new ScrollToTop({
      "selector":"#returntop"
    });
  
  });
  
});







