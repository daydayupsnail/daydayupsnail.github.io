/*
  滑动框
  定义了父类 和 响应的子类
  效果没有定义
*/
define('web/widget/slideBox', ['require', 'exports', 'module', "web/widget/hoverbox"], function(require, exports, module) {
var HoverBox = require("web/widget/hoverbox");
function SlideBox(o){
  o = o||{};

  this.fselector = o.fselector;
  this.eselector = o.eselector;
  this.f = $(this.fselector);
  this.elem = this.f.find(this.eselector);
  this.timeIn = o.timeIn||500;
  this.timeOut = o.timeOut||500;


  this.init();
  return this;
}
SlideBox.prototype = $.extend({},new HoverBox(),{
  init:function(){
    this.bindData();
    this.bindUI();
    return this;
  },
  bindData:function(){ //method 动画参数
    return this;
  },
  UIIn:function(e){  //method 进动画
     var a;
    return a;
  },
  UIOut:function(e){ //method 出动画 
    var a; 
    return a;
  },
  bindUI:function(){
    var that = this;

    this.f.on("mouseenter",function(){
      that.elem.trigger("effectIn");
    });
    this.f.on("mouseleave",function(event){
      that.elem.trigger("effectOut");
    });

    this.elem.on("effectIn",function(){
      that.effectIn($(this));
    });
    this.elem.on("effectOut",function(){
      that.effectOut($(this));
    });
    return this;
  }
});    
module.exports = SlideBox;
});