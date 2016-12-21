$(function(){
  require(['web/widget/pagination'],function(Pagination){
    var pagechange ={
      UI:function(n){
        $(".slidepage").find(".on").removeClass("on");
        $(".slidepage .page").eq(n-1).addClass("on");
      },
      run:function(n){
        pagechange.UI(n);
        // 继续 ajax
      }
    }

    //动态记载 内容， 要把这个初始化 仅放在 第一次 ajax 后
    new Pagination({
      selector:".pagenav",
      totalpage: $(".slidepage .page").length,  
      triggerevt: pagechange.run
    });
  });
  
  
});