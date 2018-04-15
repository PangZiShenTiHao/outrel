// new表格
function SearchIframe(formStructure, formName,container) {
	this.formStructure=formStructure;
	this.formName=formName;
	this.container=container;
	this.init();
	this.iframeObj={};
}
SearchIframe.prototype = {
	init:function(){
			this.toolbar=this.formStructure.toolbar;
			this.form=this.formStructure.form;
			this.table=this.formStructure.table;
			this.toolbarName="toolbar"+this.formName;
			this.formName="form"+this.formName;
			this.tableName="table"+this.formName;
			this.iframeName="iframe"+this.formName;
			this.isNotQuery=this.formStructure.isNotQuery;
	},
	show : function(isShow) {
		var that=this;
		$(this.container).html(that.create());
		that.groupBlank();
	},
	create:function(){
		var that=this;
		var iframeStr=[' <div id="'+that.iframeName+'" class="resizable ui-widget-content ui-corner-all">'];
		if(that.toolbar){
			iframeStr.push(	'<div id="'+that.toolbarName+'"></div>');
		}
		if(that.form){
			iframeStr.push(	' <div class="ui-wid  get-content ui-corner-all" style="padding:10px;" id="'+that.formName+'"></div>');
		}
		if(that.table){
			iframeStr.push(	' <div id="'+that.tableName+'" class="tableSpan"></div>');	
		}
 		iframeStr.push('</div>');
		return iframeStr.join("");
	},
	groupBlank:function(){
		var that=this;
		if(that.toolbar){
			that.iframeObj["toolbar"]=$("#"+that.toolbarName).newToolbar(that.toolbar);
		}
		if(that.form){
			that.iframeObj["form"]=$("#"+that.formName).newSearchForm(that.form);
		}
		if(that.table){
			if(that.form){
				that.table["form"]=that.iframeObj["form"];
			}
			that.iframeObj["table"]=$("#"+that.tableName).newTable(that.table);
		}
		for(var key in that.iframeObj){
			if(key=="table"){
				if(that.isNotQuery){
					that.iframeObj[key].show();	
				}else{
					that.iframeObj[key].show(true);	
				}
			}else{
				that.iframeObj[key].show(true);	
			}
		}
		$(function() {
			$( "#"+that.iframeName ).resizable();
		});
	},
	getForm:function(){
		var that=this;
		return that.iframeObj["form"];
	},
	getTable:function(){
		return that.iframeObj["table"];
	}
};
(function( $ ){  
  $.fn.newSearchIframe = function(IframeStructure) {
	var fname="iFname"+(new Date()).getTime();
   	return new SearchIframe(IframeStructure,fname,$(this)[0]);
  };  
})(jQuery);  

