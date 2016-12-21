/*
  浮动框 基础类
  给 进出 添加 标示
*/
define('web/widget/hoverbox', ['require', 'exports', 'module'], function(require, exports, module) {
function HoverBox(o){
  o = o||{};
  return this;
}
HoverBox.prototype={
  init:function(){
    this.bindUI();
  },
  bindUI:function(){  //method 参数绑定

  },
  UIIn:function(){  //method 进动画
    var a;
    return a;
  },
  UIOut:function(){ //method 出动画 
    var a;
    return a;
  },
  effectIn:function(e){
    var nowstate=e.attr("data-changeState"),
        state=1,
        that=this,
        triggerevt="effectOut";

    if(nowstate==state){
      return;
    }

    e.attr("data-changeState",state);

    this.UIIn(e).promise().then(function(){
      nowstate=e.attr("data-changeState")
      if(nowstate!=state){
        e.trigger(triggerevt);
      }
    });

  },
  effectOut:function(e){
    var nowstate=e.attr("data-changeState"),
        state=0,
        that=this,
        triggerevt="effectIn";

    if(nowstate==state){
      return;
    }

    e.attr("data-changeState",state);

    this.UIOut(e).promise().then(function(){
      nowstate=e.attr("data-changeState")
      if(nowstate!=state){
        e.trigger(triggerevt);
      }
    });
  }
};
module.exports = HoverBox;
});