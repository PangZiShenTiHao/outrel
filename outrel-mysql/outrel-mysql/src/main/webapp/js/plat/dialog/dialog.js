// new表格
function Dialog(dialogStructure, dialogName,container) {
	 this.dialogStructure=dialogStructure;
	 this.dialogName=dialogName;
	 this.minBtnName=this.dialogName+"minBtn";
	 this.container=container;
	 this.dialog=null;
     this.iframe=null;
     this.iframeName=dialogName+"_iframe";
	 this.init();
}
Dialog.prototype = {
	init:function(){
		if(this.dialogStructure){
			this.display=this.dialogStructure.display;
			this.buttons=this.dialogStructure.buttons;
			this.width=this.dialogStructure.width||document.body.scrollWidth-50;
			this.height=this.dialogStructure.height||document.body.scrollHeight;
			this.isClose=this.dialogStructure.isClose;
			this.action =this.dialogStructure.action;
			this.closeFun=this.dialogStructure.closeFun;
			this.title=this.dialogStructure.title;
            this.isIframe=this.dialogStructure.isIframe||"true";
            this.type=this.dialogStructure.type;
            this.icon=this.dialogStructure.icon;
            this.modal=(this.dialogStructure.modal===undefined)?true:this.dialogStructure.modal;
            this.position=this.dialogStructure.position;
		}else{
			this.modal=true;
		}
		if(!this.container){
			if(!document.getElementById(this.dialogName+"_")){
				$('<div id="'+this.dialogName+'_" title="'+this.title+'" style="overflow: auto"></div>' ).appendTo($("body"));
			}
			this.container=$("#"+this.dialogName+"_");
		}
	},
	open : function(HW) {
		var that=this;
		if(!HW){
			if(!(that.width&&that.height)){
				HW="normal";
			}
		}
		if(HW=="min"){
			that.width=600;
			that.height=400;
		}else if(HW=="max"){
			that.width=1000;
			that.height=700;
		}else if(HW=="normal"){
			that.width=800;
			that.height=600;
		}else if(HW=="supper"){
			that.width=1300;
			that.height=800;
		}
        var createDialog=function(){
            var btObj={};
            var action=function(b){
                return function(){
                    if(b.action){
                        b.action(that);
                    }
                    if(b.isClose){
                        that.close(that);
                    }
                };
            };
            for(var i=0;i<that.buttons.length;i++){
                var btn=that.buttons[i];
                btObj[btn.text]=action(btn);
            }
            var minW=60;
            var moveMinDialog=function(){
            	var index=0;
            	var jx=100;
            	var h=$(window).height()-50;
            	$(".ui-icon-minspread").each(function(){
            		var parent=jyTools.getParentNodeByAttr(this,"aria-describedby",this.dialogName+"_");
            		$(parent).animate({top:h+'px',left:((minW+jx)*index++)+'px'});
            	})
            }
            var dialogJson={
                    autoOpen: true,
                    height: that.height,
                    width: that.width,
                    modal: that.modal,
                    buttons: btObj,
                    close: function() {
                    	var cf=function(){
                    		setTimeout(function(){
                    			var p=$("#"+that.dialogName+"_");
                    			p.html("");
                    			p.remove();
                    			moveMinDialog();
                    		},50);
                    	}
                    	if(that.closeFun){
                    		that.closeFun();
                    		cf();
                    	}else{
                    		cf();
                    	}
                    },
                    open: function (event, ui) {
                    	var minBtn='<button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-icon-only ui-dialog-titlebar-min" role="button" title="Close"><span class="ui-button-icon-primary ui-icon ui-icon-minthick">min</span><span class="ui-button-text">最小化</span></button>';
                        var $dialog = $(this);
                        var prevNode=that.container.prev();
                        var atext =prevNode.find(".ui-dialog-titlebar-close").before(minBtn);
                        prevNode.find('.ui-icon').click(function () {
                    		var btnObj=$(this);
                    		var spantext = btnObj.text();
                    		//alert("ok:ui-span" + spantext);
                    		var parent=jyTools.getParentNodeByAttr(this,"aria-describedby",this.dialogName+"_");
                    		if (spantext == "restore") {
                    			var srcL=btnObj.attr("srcL");
                    			var srcT=btnObj.attr("srcT");
                        		$(parent).animate({top:(srcT),left:(srcL)});
                    			btnObj.text("min")
                    			btnObj.removeClass("ui-icon-minspread");
                    			btnObj.addClass("ui-icon-minthick")
                    			that.container.next().show();
                    			$dialog.dialog({
                    				position: ['center'],
                    				width: that.width,
                    				height: that.height
                    			});
                    			moveMinDialog()
                    		} else if (spantext == "min") {
                    			var jqParent=$(parent);
                    			btnObj.attr("srcL",jqParent.css("left"));
                    			btnObj.attr("srcT",jqParent.css("top"));
                    			btnObj.text("restore");
                    			btnObj.addClass("ui-icon-minspread");
                    			btnObj.removeClass("ui-icon-minthick");
                    			$dialog.dialog({
                    				position: ['10','20'],
                    				width: minW,
                    				height: 0
                    			});
                    			that.container.next().hide();
                    			moveMinDialog();
                    		}else if(spantext == "close"){
                    			moveMinDialog();
                    		}
                    	});
                    }
                
                };
            if(that.position){
            	dialogJson["position"]=that.position;
            }
            that.dialog=that.container.dialog(dialogJson);
        };
		if(this.display){
			if(typeof(that.display)=="string"){
                if(that.isIframe=="true")
                {
                	var frm= $('<iframe id="'+that.iframeName+'" src="" frameborder="0"  width="100%" height="100%" ></iframe>');
                    frm.appendTo(that.container);
                    that.iframe=frm[0];
                    createDialog();
                    //弹出页面后再加载iframe src 解决 iframe弹出框 加载两次url的问题 moidy by chengang 2016-05-05
                    frm.attr("src",that.display);
                    that.iframe=frm[0];
                }
                else
                {
                	var mask=$("").newMask();
                	mask.show("正在载入对话框");
                    that.container.load(that.display,function(responseTxt,statusTxt,xhr){
                        if(statusTxt=="success"){
                            createDialog();
                            mask.close();
                        }
                    });
                }
			}
		}else{
			 //that.container
			 createDialog();
		};
		
		return that.dialog;
	},
	getIframe:function(){
		return document.getElementById(this.iframeName).contentWindow;
	},
    showIcon:function(){
        if(this.type||this.icon)
        {
            var icon={
                "success":"message-success",
                "warn":"message-warn",
                "error":"message-error",
                "info":"message-info",
                "question":"message-question"
            };
             if(this.icon)
            {
                return '<div class="message-icon" style="background:url('+this.icon+') no-repeat"></div>'
            }
            else
            {
                return '<div class="message-icon '+icon[this.type]+'" ></div>'
            }
        }
        else
        {
            return "";
        }
    },
	confirm:function(content,fun,title,closeFun){
		var that=this;
		that.container.html(that.showIcon() +content);
		var t=title||"确认";
		that.container.attr("title",t);
		this.dialog=that.container.dialog({
			  resizable: false,
			  height: 160,
		      width: 350,
			  modal: that.modal,
			  buttons: {"确认":function(){
				  if(fun){
					  fun();
				  }
				  that.close();
			  },"关闭":function(){
				  if(closeFun){
					  closeFun()
				  }
				  that.close();
			  }}
		});	 	
	},
	confirmSize:function(content,height,width,fun,title,closeFun){
		var that=this;
		that.container.html(that.showIcon() +content);
		var t=title||"确认";
		that.container.attr("title",t);
		this.dialog=that.container.dialog({
			  resizable: false,
			  height: height,
		      width: width,
			  modal: that.modal,
			  buttons: {"确认":function(){
				  if(fun){
					  fun();
				  }
				  that.close();
			  },"关闭":function(){
				  if(closeFun){
					  closeFun()
				  }
				  that.close();
			  }}
		});	 	
	},
	alert:function(content,title,closeFun){
		var that=this;
		that.container.html(that.showIcon() +content);
		var t=title||"提示";
		that.container.attr("title",t);
		this.dialog=that.container.dialog({
			 resizable: false,
			  height: 160,
		      width: 350,
			  modal: that.modal,
			  buttons: {"关闭":function(){
				  if(closeFun){
					 closeFun();
				 }
				 that.close();
			  }}
		});	 	
	},
	close:function(){
		var that=this;
		this.dialog.dialog( "close" );
//		this.dialog.dialog( "destroy" );
//		this.dialog.dialog( "destroy" );
		
		//$("#"+this.dialogName+"_").parent().remove();
		//this.dialog=null;
	},
	getAction:function(){
		return this.action;
	}
}; 
jyDialog = function(dialogStructure) {
	debugger;
	var mName="dialog"+(new Date()).getTime()+Math.round((Math.random()*100));
   	return new Dialog(dialogStructure,mName);
  };    

  (function ($) {
	    $.fn.newDialog = function (structure, name) {
	        var tname = "tname" + (new Date()).getTime()+Math.round((Math.random()*100));
	        if (name) {
	            tname += name;
	        }
	        return new Dialog(structure, tname, $(this));
	    };
	})(jQuery);