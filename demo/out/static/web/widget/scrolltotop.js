/*
  页面滚动到下面出现回到顶部 按钮
*/
define('web/widget/scrolltotop', ['require', 'exports', 'module'], function(require, exports, module) {
  function ScrollToTop(o){
    o=o||{};
    this.selector = o.selector;
    this.time = o.time||200; // 回到顶部的时间
    
    this.init();
  }
  ScrollToTop.prototype ={
    init:function(){
      this.initUI();
      this.bind();
    },
    bind:function(){
      var that = this, w=$(window);
      
      var windowheight=w.height();  
      //scroll() 方法为滚动事件  
      w.scroll(function(){  
        if (w.scrollTop()>windowheight){  
            $(that.selector).fadeIn(500);  
        }else{  
            $(that.selector).fadeOut(500);  
        }  
      });  
      
      w.resize(function(){
        windowheight = w.height();
      });
      
      $(that.selector).click(function(){  
          $('body,html').animate({scrollTop:0},that.time);  
          return false;  
      });  
    },
    initUI:function(){
      $(this.selector).css("display","none");
    }
  }
  module.exports = ScrollToTop;
});