/*
  居中放大缩小
  triggerselectors 和this.elem 平级，也触发  this.elem 的缩放
*/
define('web/widget/zoombox', ['require', 'exports', 'module', "web/widget/hoverbox"], function(require, exports, module) {
var HoverBox = require("web/widget/hoverbox");
function ZoomBox(o){
  o = o||{};

  this.elem = o.element||$("document");
  this.timeIn = o.timeIn||200;
  this.timeOut = o.timeOut||200;
  this.edgehided = o.edgehided||false;
  this.width = o.width;
  this.height = o.height;
  var size = o.size||1;
  this.nwidth = this.width*size;
  this.nheight = this.height*size;
  this.left = (this.nwidth - this.width) /2;
  this.top = (this.nheight - this.height) /2;
  this.triggeredselector = o.triggeredselector;
  this.triggerselectors = o.triggerselectors||[];

  this.init();
  return this;
}
ZoomBox.prototype = $.extend({},new HoverBox(),{
  bindUI:function(){
    var that = this;

    if(this.edgehided){
      this.edgehidden();
    }

    this.elem.find(".bottom").hover(function(){
      that.effectIn($(this));
    },function(){
      that.effectOut($(this));
    });


    $.each(this.triggerselectors,function(index,val){
      var child=that.elem.parent().find(val);
      if(!child.length) return true;
      
      child.hover(function(){
        $(this).parent().find(that.triggeredselector).trigger("effectIn");
      });
    });

    this.elem.on("mouseenter",function(){
      $(this).trigger("effectIn");
    });
    this.elem.parent().on("mouseleave",function(event){

      var triggerelem= $(this).find(that.triggeredselector);
      if(!triggerelem.length) return;

      triggerelem.trigger("effectOut");
    });

    this.elem.on("effectIn",function(){
      that.effectIn($(this));
    });
    this.elem.on("effectOut",function(){
      that.effectOut($(this));
    });
  },
  UIIn:function(e){  //method 进动画
     var a=e.stop().animate({
      "width":this.nwidth+"px",
      "height":this.nheight+"px",
      "top":"-"+this.top+"px",
      "left":"-"+this.left+"px"
    },this.timeIn,"easeInOutSine");
    return a;
  }, 
  UIOut:function(e){ //method 出动画 
    var a= e.stop().animate({
      "width":this.width+"px",
      "height":this.height+"px",
      "top":0,
      "left":0
    },this.timeOut,"easeInOutSine");
    return a;
  },
  edgehidden:function(){
    this.elem.each(function(){  
      $(this).parent().css("overflow","hidden");
    })
  }
});
module.exports=ZoomBox;
}); 