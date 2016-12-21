
$(function(){
 //轮播效果
  require(["web/widget/carousel"],function(Carousel){
    new Carousel({
      "fselector":".gallery .galleryinner",
      "selector":".imgbox2",
      "lastbutton":".gallery .last",
      "nextbutton":".gallery .next",
      "itemdis":26
    });
  })
})
