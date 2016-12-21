/*
  页码类
  支持
    已经知道页码
    没有省略页码显示
*/
define('web/widget/pagination', ['require', 'exports', 'module'], function(require, exports, module) {
function Pagination(o){
  o = o||{};
  
  this.selector = $(o.selector)||document; //页码添加 的位置
  this.index = o.index||1;//当前页码
  this.totalpage = o.totalpage||1;
  this.islast = o.islast||true; //打开上一页按钮
  this.isnext = o.isnext||true; //打开上一页按钮
  this.isnum = o.isnum||true; //是否显示数字
  this.isonehidden = o.isonehidden||true; //页码为1 是否显示
  this.triggerevt = o.triggerevt||null; //改变绑定的事件
  this.istotop = o.istotop||true; //点击翻页，即回到页面顶部，这里可以优化 
  
  this.init();
}
Pagination.prototype ={
  init:function(){
    this.bindUI();
    this.bind();
  },
  bindUI:function(){
    var str='';
    if(this.totalpage==1&&this.isonehidden){
      return;
    }
    
    if(this.islast){
      str+= ' <a href="javascript:void(0)" class="last" data-pagenum="l">&lt;</a>'; 
    }
    if(this.isnum){
      var n = 1 ;
      while(n<=this.totalpage){
        str+= ' <a href="javascript:void(0)" class="num" data-pagenum="'+n+'">'+n+'</a>'; 
        n++;
      }
    }
    if(this.isnext){
      str+= ' <a href="javascript:void(0)" class="next" data-pagenum="n">&gt;</a>'; 
    }
    this.selector.append(str);
  },
  bind:function(){
    var that = this;
    this.selector.find("a").on("click",function(){
      var n = $(this).attr("data-pagenum");
      that.changeindex(n);
    });
    
    this.changeindex(this.index,true);
  },
  changeindex:function(n,ifrestart){  //method 
    if(n=="l"){
      n = this.index-1;
    }else if(n=="n"){
      n = this.index+1;
    }
    if(n<1){
      n=1;
    }else if(n>this.totalpage){
      n=this.totalpage;
    }
    
    if(this.index==n&&!ifrestart){
      return;
    }
    this.index = n;
    this.changepage();
  },
  changeUI:function(){
    if(!this.isnum) return;
    
    this.selector.find(".on").removeClass("on");
    this.selector.find(".num").eq(this.index-1).addClass("on");
  },
  afterchange:function(){
    $("html,body").animate({scrollTop:0},200);
  },
  changepage:function(){
    this.changeUI();
    
    this.triggerevt && this.triggerevt(this.index);
    
    this.istotop && this.afterchange();
  }
}
module.exports=Pagination;
});