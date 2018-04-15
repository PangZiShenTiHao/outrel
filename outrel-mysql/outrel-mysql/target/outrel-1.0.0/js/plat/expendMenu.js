// new表格
function ExpendMenu(expendMenuStrut,expendObj) {
	this.expendMenuStrut=expendMenuStrut;
	this.expendObj=expendObj;
	this.expendId=expendObj.id+"_expend";
	this.init();
}
ExpendMenu.prototype = {
	init:function(){
			var that=this;
			this.width=this.expendMenuStrut.width||500;
			this.height=this.expendMenuStrut.height||500;
			this.url=this.expendMenuStrut.url;
			this.isIframe=this.expendMenuStrut.isIframe;
			this.iframeName=this.expendId+"_iframe";
			this.showBtn=(undefined==this.expendMenuStrut.showBtn?true:this.expendMenuStrut.showBtn);
			this.okFun=this.expendMenuStrut.okFun;
			$(that.expendObj).unbind().bind('click',function(ev){
				that.show();
			});
	},
	show:function(){
		var that=this;
		var expendDiv=$("#"+that.expendId);
		 if(!(expendDiv&&expendDiv.length)){
			 var tO=$(that.expendObj);
			 var left=tO.offset().left;
			 var top=tO.offset().top+tO.height();
			 var createPanel=function(){
				 var h=that.height;
				 var btnDiv="";
				 if(that.showBtn){
					 btnDiv='<div style="text-align:right;height:15px;padding:5px;"><a href="javascript:void(0)" id="'+that.treeOK+'">确认</a>&nbsp;<a href="javascript:void(0)" id="'+that.treeCLOSE+'">关闭</a></div>';
					 h=that.height-25;
				 }
				 var cDiv='<div style="overflow:auto;width:100%;height:'+h+'px;" id="'+that.expendId+'_"></div>';
				 $("body").append('<div class="ui-widget-content" style=" position: absolute; left:'+left+'px; top:'+(top+6)+'px;width:'+that.width+'px;height:'+that.height+'px;" id="'+that.expendId+'">'+cDiv+btnDiv+'</div>');
			 };
			 createPanel();
			if(that.url){
				if(that.isIframe){
					$("#"+that.expendId).html('<iframe id="'+that.iframeName+'" src="'+that.url+'" frameborder="0"  width="100%" height="100%" ></iframe>');
				}else{
					$("#"+that.expendId).load(that.url);
				}
			}
			if(that.showBtn){
				$("#"+that.treeOK).unbind().bind("click",function(ev){ 
					if(that.okFun){
						that.okFun(that,document.getElementById(that.iframeName));
					}
				});
				$("#"+that.treeCLOSE).unbind().bind("click",function(ev){
					$("#"+that.expendId).hide();
				});
			}
			$("#"+that.expendId).resizable();
		 }
		 $("#"+that.expendId).show();
	},
	close:function(){
		 $("#"+that.expendId).remove();
	},
	hide:function(){
		$("#"+that.expendId).hide();
	}
};
(function( $ ){  
  $.fn.newExpendMenu = function(expendTreeStructure){
	 alert(1);
   	 return new ExpendMenu(expendTreeStructure,$(this)[0]);
  };
})( jQuery );  

