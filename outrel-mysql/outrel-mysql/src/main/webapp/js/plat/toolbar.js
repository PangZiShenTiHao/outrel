// new表格
function Toolbar(toolBarStructure, toolbarName,container) {
	this.toolBarStructure=toolBarStructure;
	this.toolbarName=toolbarName;
	this.container=container;
	this.init();
}
Toolbar.prototype = {
	init:function(){
		this.title=this.toolBarStructure.title||"无标题";
		this.btns=this.toolBarStructure.buttons||[];
	},
	show : function(isShow) {
		var that=this;
		that.create();
		$(function() {
			$("#"+that.toolbarName).buttonset();
		});
	},
	create:function(){
		var that=this;
		var toolbarStr=[];
		toolbarStr.push('<h3 class="ui-widget-header ui-corner-all"> <div class="titleSpan">'+that.title+'</div>');
		var name=that.toolbarName;
		var btns=[' <div class="buttonSpan"><div id="'+name+'">'];
		for(var i=0;i<that.btns.length;i++){
			var btn=that.btns[i]
			var id=name+i;
			btn.id=id;
			btns.push('<input type="radio" id="'+id+'" name="'+name+'"><label for="'+id+'">'+btn["text"]+'</label>');
		}
		btns.push("</div></div>");
		toolbarStr.push(btns.join(""));
		toolbarStr.push('</h3>');
		$(this.container).html(toolbarStr.join(""));
		for(var i=0;i<that.btns.length;i++){
			var btn=that.btns[i];
			$("#"+btn["id"]).bind("click",btn.fun);
		}
	}
};
(function( $ ){  
  $.fn.newToolbar = function(toolBarStructure) {
	var tname="tname"+(new Date()).getTime();
   	return new Toolbar(toolBarStructure,tname,$(this)[0]);
  };  
})(jQuery);  

