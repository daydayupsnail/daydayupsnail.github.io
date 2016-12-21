/*
  整体轮播效果
  效果 
    从右往左滑动效果，继承覆盖这部分。
  支持 按照顺序 前后滑动
*/
define('web/widget/carousel-whole', ['require', 'exports', 'module'], function(require, exports, module) {
  function Carousel(o){
    o=o||{};
    
    this.f= o.fselector; //装轮播的容器 !!
    this.selector =   o.selector ; //需要切换的内容 !! 
    this.lastbutton = $(o.lastbutton)||null; //上一个 按钮
    this.nextbutton = $(o.nextbutton)||null; //上一个 按钮
    this.index = o.index||1; //外面显示的 是 从1 开始    暂不能用
    this.time = o.time || 3000; //轮播间隔时间
    this.animationtime = o.animationtime || 2000; // 动画时间
    this.autofalse = o.autofalse || false; //自动是播放的
    this.itemdis = o.itemdis || 0; //上下item 切换距离间距
    
    this.felem = $(this.f)||document;
    this.elems = this.felem.find(this.selector)||document; //切换元素集合
//    this.isHover = o.isHover||true; //鼠标放在上面的时候悬停
    this.totalpage = this.elems.length;
    this.index = this.index-1;
    this.lastindex = this.index -1;
    this.dis = this.felem.width()+this.itemdis;
    this.pauseclass = Math.random().toString().replace(/\./,"_")+"pause";
    this.timeouthandle=null; //防止多个计时
    this.hasclick = false; //防止点击过快，导致效果错乱
    
    this.init();
  }
  Carousel.prototype ={
    init:function(){
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
      if(this.autofalse){
        this.runstatic(arguments);
      }else{
        this.runauto(arguments);
      }
    },
    runstatic:function(argus){
      var that=this;
      
      if(this.index<0){
        this.index=0;
        this.hasclick = false;
        return;
      }else if(this.index==this.totalpage){
        this.index = this.totalpage-1;
        this.hasclick = false;
        return; 
      }
      
      this.lastindex = this.felem.find(this.selector+".on").index();
      
      var p;
      if(this.index>this.lastindex){
        p=this.gonext();
      }else if(this.index<this.lastindex){
        p=this.golast();
      }else{
        p=this.gonext(); // 
      }
      p.then(function(){
        that.hasclick = false;
      });
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
        that.timeouthandle =setTimeout(function(){
          that.index++;
          that.switchitem();
        },that.time);
      });
    },
    golast:function(){
      var e,_r=this.felem.find(this.selector+".on");
      
      if(this.index<0){
        this.index=this.totalpage-1;
      }
      e=this.elems.eq(this.index);

      return this.golastUI(e,_r);
    },
    gonext:function(){
      var e,_l=this.felem.find(this.selector+".on");
      
      if(this.index==this.totalpage){
        this.index= 0;
      }
      e=this.elems.eq(this.index);
      
      return this.gonextUI(e,_l);
    },
    bindUI:function(){
      this.felem.css("overflow","hidden");
      this.resetUI();
    },
    resetUI:function(){ // method 
      this.elems.css("left",this.dis+"px");
      this.felem.find(".on").css("left",0);
    },
    golastUI:function(e,_r){ // method 上一个展示
      
      e.css("left","-"+this.dis+"px");
          
      _r.animate({
        "left":this.dis+"px"
//        "opacity":0.3
      },this.animationtime,"easeInOutSine",function(){
        _r.removeClass("on");
      });
      
      var p=e.animate({
        "left":"0px"
//        "opacity":1
      },this.animationtime,"easeInOutSine",function(){
        e.addClass("on");
      }).promise();
      
      return p;
    },
    gonextUI:function(e,_l){ // method 下一个展示
      
      e.css("left",this.dis+"px");

      _l.animate({
        "left":"-"+this.dis+"px"
//         "opacity":0.3
      },this.animationtime,"easeInOutSine",function(){
        _l.removeClass("on");
      });
      var p=e.animate({
        "left":"0px"
//        "opacity":1
      },this.animationtime,"easeInOutSine",function(){
        e.addClass("on");
      }).promise();
      
      return p;
    }
  };
  module.exports = Carousel;
});