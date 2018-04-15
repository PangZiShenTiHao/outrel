/**
 * 通过iframe引入cognos报表页面
 * 调用方法：
		var v_reprotURL='http://172.18.100.143:8080/loan/lbTLeaveInfo/prepareExecute/toQueryPage?isAdmin=1';
		var searchIframe={"toolbar":toolbar
						,"form":formStructure
						,"table":tableStructure
						,"isNotQuery":true
						,"reportURL":v_reprotURL};
		
		//初始化 form 表单 table 列表 及工具条 
		iframe=$("#content").newCognosReport(searchIframe);
		iframe.show();
		var reportObj = iframe.getReportInfo();//JS跨域自定义设置
		reportObj.height("620px");//JS跨域自定义设置
 */
function CognosReport(formStructure, formName,container) {
	this.formStructure=formStructure;
	this.formName=formName;
	this.container=container;
	this.init();
	this.iframeObj={};
}
CognosReport.prototype = {
	init:function(){
			this.toolbar=this.formStructure.toolbar;
			this.form=this.formStructure.form;
			this.table=this.formStructure.table;
			this.reportURL=this.formStructure.reportURL;
			this.toolbarName="toolbar"+this.formName;
			this.formName="form"+this.formName;
			this.tableName="table"+this.formName;
			this.reportURLName="reportURL"+this.formName;
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
		if(that.reportURL){
			iframeStr.push(	' <div id="'+that.reportURLName+'" class="tableSpan"><iframe load="" id="iframesrc_'+that.reportURLName+'" src="'+that.reportURL+'" frameborder="no" border="0" marginwidth="0" marginheight="0"  style="width:100%;height:100%;border:0px; margin:0px;padding:0px;" ></iframe></div> ');	
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
			try{
				$("#iframesrc_"+that.reportURLName).load(function(){
					var mainheight = $(this).contents().find("body").height()+30;
					$(this).height(mainheight);
				});
			}catch(e){
				//js跨域
				//$("#iframesrc_"+that.reportURLName).height("800px");
				/*$("#iframesrc_"+that.reportURLName).load(function(){
					$(this).height("800px");
				});*/
			}
			try{
				$( "#"+that.iframeName ).resizable();
			}catch(e){
			}
		});
	},
	getForm:function(){
		var that=this;
		return that.iframeObj["form"];
	},
	getTable:function(){
		var that=this;
		return that.iframeObj["table"];
	},
	getReportInfo:function(){
		var that=this;
		return $("#iframesrc_"+that.reportURLName);
	},
	queryReportInfo:function(){
		var that = this;
        if (that.reportURL) {
        	if(!that.iframeObj["form"].checkFormFormat()){
                 return;
        	}
            var v_URL = that.reportURL + "&" + that.iframeObj["form"].serialize();
            debugger;
            $("#iframesrc_"+that.reportURLName).attr("src",v_URL);
        }
		
	}
};
(function( $ ){  
  $.fn.newCognosReport = function(IframeStructure) {
	var fname="iFname"+(new Date()).getTime();
   	return new CognosReport(IframeStructure,fname,$(this)[0]);
  };  
})(jQuery);  

