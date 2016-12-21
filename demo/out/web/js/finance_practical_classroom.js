$(function(){
 //轮播效果
  require(["web/widget/carousel"],function(Carousel){
    new Carousel({
      "fselector":".lessons1 .gallery .galleryinner",
      "selector":".imgbox2",
      "lastbutton":".lessons1 .gallery .last",
      "nextbutton":".lessons1 .gallery .next",
      "itemdis":18
    });
    
     new Carousel({
      "fselector":".lessons2 .gallery .galleryinner",
      "selector":".imgbox2",
      "lastbutton":".lessons2 .gallery .last",
      "nextbutton":".lessons2 .gallery .next",
      "itemdis":18
    });
    
     new Carousel({
      "fselector":".lessons3 .gallery .galleryinner",
      "selector":".imgbox2",
      "lastbutton":".lessons3 .gallery .last",
      "nextbutton":".lessons3 .gallery .next",
      "itemdis":18
    });
    
  })
})