/*
  滑动框 
  向左滑动 超出父亲
*/
define('web/widget/slidebox-left-out', ['require', 'exports', 'module', "web/widget/slideBox"], function(require, exports, module) {
var SlideBox = require("web/widget/slideBox");
function SlideBox_LeftOut(o){
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
SlideBox_LeftOut.prototype = $.extend({},new SlideBox(),{
  bindData:function(){ //method 动画参数
    var that = this;
    this.ewidth=this.elem.width();
    this.fwidth = this.f.width();
    if(this.ewidth==0){
      this.elem.load(function(){
        that.ewidth=that.elem.width();  
      });  
    }
    return this;
  },
  UIIn:function(e){  //method 进动画
     var a = e.stop().animate({
      "right":this.fwidth+"px", 
      "opacity":1
    },this.timeIn,"easeInOutSine");
    return a;
  },
  UIOut:function(e){ //method 出动画 
    var a = e.stop().animate({
      "right":"-"+(this.ewidth+10)+"px",   /*ie7 兼容性 问题*/
      "opacity":"0.6"
    },this.timeOut,"easeInOutSine"); 
    return a;
  }
});    
module.exports=SlideBox_LeftOut;
}); 