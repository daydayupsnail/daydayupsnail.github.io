/*
  单个轮播效果 
  例如 一个屏幕展示3个，一次只影藏一个
  效果 
    从右往左滑动效果，继承覆盖这部分。
  支持 按照顺序 前后滑动
  

*/
define('web/widget/carousel', ['require', 'exports', 'module'], function(require, exports, module) {
  function Carousel(o){
    o=o||{};
    
    this.f= o.fselector; //装轮播的容器 !!
    this.selector =   o.selector ; //需要切换的内容 !! 
    this.lastbutton = $(o.lastbutton)||null; //上一个 按钮
    this.nextbutton = $(o.nextbutton)||null; //上一个 按钮
    this.index = 1; //外面显示的 是 从1 开始    暂不能赋值
    this.time = o.time || 2000; //轮播间隔时间
    this.animationtime = o.animationtime || 1500; // 动画时间
    this.autofalse = o.autofalse || false; //自动是播放的
    this.itemdis = o.itemdis || 0; //上下item 切换距离间距
    
    this.felem = $(this.f)||document;
    this.elems = this.felem.find(this.selector)||document; //切换元素集合
//    this.isHover = o.isHover||true; //鼠标放在上面的时候悬停
    this.totalpage = this.elems.length;
    this.index = this.index-1;
    this.lastindex = this.index -1;
    this.dis = this.elems.width()+this.itemdis;
    this.pauseclass = Math.random().toString().replace(/\./,"_")+"pause";
    this.timeouthandle=null; //防止多个计时
    this.hasclick = false; //防止点击过快，导致效果错乱
    
    this.init();
  }
  Carousel.prototype ={
    init:function(){
      if(this.autofalse){
        console.error("暂时不支持autofalse为true");
        return;
      }
      if(this.length<2){
        return;
      }
      this.bind();
      this.bindUI();
      
      this.first();
    },
    bind:function(){
      var that = this;

      this.lastbutton.on("click",function(){  
        if(that.hasclick){
          return;
        }
        --that.index;
        that.hasclick=true;
        that.felem.trigger("switchitem");
      });
      this.nextbutton.on("click",function(){
        if(that.hasclick){
          return;
        }
        ++that.index;
        that.hasclick=true;
        that.felem.trigger("switchitem");
      });
      
      $(document).on("mouseenter",this.f,function(){
        that.felem.addClass(that.pauseclass);
      }).on("mouseleave",this.f,function(){
        that.felem.removeClass(that.pauseclass);
      });
      
      this.felem.on("switchitem",function(){
        that.switchitem();
      });
    },
    first:function(){   // 初时 自动运行
      var that = this;
      if(this.autofalse){
        return;
      }
      this.timeouthandle=setTimeout(function(){
        that.switchitem(true);
      },this.time);
    },
    switchitem:function(){
        this.runauto(arguments);
    },
    runauto:function(argus){  // interface： 切换div 
      clearTimeout(this.timeouthandle);
      var that=this,
          ifinit = argus && argus[0],
          ifpause = this.felem.hasClass(this.pauseclass); 
      if(ifpause){
        this.timeouthandle = setTimeout(function(){
          that.hasclick = false;
          that.switchitem();
        },this.time);
        return;
      }
      this.hasclick = true; // 动画过程不能 触发
      
      if(ifinit){
        this.lastindex=0;
        this.index=1;
      }else{
        this.lastindex = this.felem.find(this.selector+".on").index();
      }
      
      var p;
      if(this.index>this.lastindex){
        p=this.gonext();
      }else if(this.index<this.lastindex){
        p=this.golast();
      }else{  //
        this.index = this.lastindex +1;
        p=this.gonext();  
      }
      p.then(function(){
        that.hasclick = false;
        that.elems.eq(that.lastindex).removeClass("on");
        that.elems.eq(that.index).addClass("on");
        
        that.timeouthandle =setTimeout(function(){
          that.index++;
          that.switchitem();
        },that.time);
      });
      
    },
    golast:function(){
      if(this.index<0){
          this.index =this.totalpage-1;
      }

      var that = this,p;
      for(var i=0;i<this.totalpage;i++){
        var index = this.index- i;
        if(index<0){
          index += this.totalpage;
        }
        var left = this.elems.eq(index).css("left").replace("px","");
        if(left >= (that.totalpage-1)*that.dis){  //把最后一个叫上 最前面
            left = "-"+that.dis;
            this.elems.eq(index).css("left",left+"px");
          }
        left = left*1+ this.dis;
//        this.elems.eq(index).attr("data-left",left);
        left =left +"px";
        
        
        p = this.elems.eq(index).animate({
          "left":left,
        },this.animationtime,"easeInOutSine",function(){
//          var _left = $(this).attr("data-left");
//          if(_left == (that.totalpage-1)*that.dis){
//            $(this).css("left","-"+that.dis+"px");
//          }
        }).promise();
      }
      return p;
    },
    gonext:function(){
      if(this.index==this.totalpage){
          this.index =0;
      }
      
      var that = this,p;
      for(var i=0;i<this.totalpage;i++){
        var index = this.index+ i;
        if(index>=this.totalpage){
          index -= this.totalpage;
        }
        var left = this.elems.eq(index).css("left").replace("px","")- this.dis;
        this.elems.eq(index).attr("data-left",left);
        left = left +"px";
        
        p = this.elems.eq(index).animate({
          "left":left,
        },this.animationtime,"easeInOutSine",function(){
          var _left = $(this).attr("data-left"); //left 作用域是最后的left
          if(_left<0){   // 到最后排队
            $(this).css("left",(that.totalpage-1)*that.dis+"px");
          }
        }).promise();
      }
      return p;
    },
    bindUI:function(){
      this.felem.css("overflow","hidden");
      this.resetUI();
    },
    resetUI:function(){ // method 
      var that = this;
      this.elems.each(function(index,elem){
        $(this).css("left",that.dis*index+"px");
      });
      this.elems.eq(0).addClass("on");
    }
   
  };
  module.exports = Carousel;
});