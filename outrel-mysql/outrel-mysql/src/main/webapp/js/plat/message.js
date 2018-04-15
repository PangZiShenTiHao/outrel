// new表格
function Msg(msgStructure,msgName,container) {
	this.msgStructure=msgStructure;
	this.msgName=msgName;
	this.msgContent=msgName+"_content";
	this.closeName=msgName+"_close";
	this.container=container||$(window.top.document.body);
	this.msgBit=false;
	this.mouseOver=false;
	this.msgTopObj;
	this.msgMap={};
	this.init();
}

Msg.prototype = {
	init:function(){
		var that=this;
		that.title=that.msgStructure.title||"系统消息";
		that.msgs=that.msgStructure.msgs||[];
		that.msgFun=that.msgStructure.msgFun;
		that.msgType=that.msgStructure.type||"basic";
		that.params=that.msgStructure.params;
		that.waitTime=that.msgStructure.waitTime||6000;
		that.backWaitTime=that.msgStructure.backWaitTime||that.waitTime;
		that.timeout=that.backWaitTime;
		that.bigLinkTimeout=that.msgStructure.bigLinkTimeout||that.timeout*100;
		that.requestType=that.msgStructure.requestType||"basic";
		if(that.msgType!="basic"){
			that.url=that.msgStructure.url;
		}
		that.msgTopObj=that.findTopObj(that.msgName);
		if(!that.msgTopObj.length){
			var msgStr=['<div  id="'+that.msgName+'"  class="ui-widget-content sysMessage">'];
			msgStr.push('<h3 class="ui-widget-header">'+that.title+'</h3>');
			msgStr.push('<div class="sysMessageContent" id="'+that.msgContent+'"></div>');
			msgStr.push('<div style="text-align:right;"><a id="'+this.closeName+'" href="javascript:void(0)">关闭</a></div>');
			msgStr.push('</div>');
			that.msgTopObj=$(msgStr.join(""));
			that.msgTopObj.appendTo(that.container);
			this.create();
		}
	},
	create:function(){
		var that=this;
		if(that.msgs){
			that.add(that.msgs);
		}
		that.findTopObj(that.msgName).bind("click",function(ev){
			var obj=ev.srcElement||ev.target;
			if(obj.tagName=="A"&&obj.id){
				if(obj.id==that.closeName){
					that.close();
				}else{
					if(that.msgFun){
						that.msgFun(that.msgMap[obj.id]);
					}
				}
			};
		}).bind("mouseover",function(ev){
			that.mouseOver=true;
		}).bind("mouseout",function(ev){
			var obj=ev.srcElement||ev.target;
			if(obj.id==that.msgName){
				that.mouseOver=false;
			}
		});
		if(that.url){
			(function(){
				var own=arguments.callee;
				var params="";
				var startTime=(new Date()).getTime();
				var callOwn=function(successBit){
					if(successBit){
						that.timeout=that.backWaitTime;//如果连接成功，初始化连接时间
					}else{
						that.timeout=that.timeout*2;
						if(that.timeout>=that.bigLinkTimeout){
							that.timeout=that.bigLinkTimeout;
						}
					}
					var endTime=(new Date()).getTime();
					var differTime=that.timeout-(endTime-startTime);
					if(differTime>0){
						setTimeout(function(){own();},differTime);
					}else{
						own();
					}
				};
				var errorFun=function(XmlHttpRequest, textStatus, errorThrown){
					//if (textStatus== "timeout") {
						callOwn(false);
					//}
				};
				if(that.requestType=="jsonp"){
					 $.ajax({  
					        type : "get",   
					        url : that.url,  
					        dataType : "jsonp",//数据类型为jsonp  
					        jsonp: "callback",//服务端用于接收callback调用的function名的参数  
					        success : function(result){  
					        	if (result) {
									that.add(result);
									that.show(result);
									//if(that.msgBit){
										callOwn(true);
									//}
								}
					        },error:errorFun
					    });   
				}else{
					jyAjax(that.url,that.params,function(result){
						if (result && result.data) {
							if(result.data.length){
								that.add(result.data);
								that.show(result.data);
							}
							if(that.msgBit){
								callOwn(true);
							}
						}
					},errorFun,'','','',true,{"timeout":that.timeout});
				}
			})();
		}
	},
	findTopObj:function(name){
		return $(this.container).find("[id='"+name+"']");
	},
	show:function(msg){
		var that=this;
		that.msgBit=true;
		var obj=that.msgTopObj;
		that.findTopObj(that.msgContent).html("");
		if(!(msg instanceof Array)){
			msg=[{"title":msg}];
		}
		var msgHtml=[];
		for(var i=0;i<msg.length;i++){
			msgHtml.push('<p>'+(msg[i].title||msg[i])+'</p>');
		}
		that.groupMsgContent(msgHtml);
		obj.show('bounce',null,500);
		if(that.msgType=="basic"){
			that.hide();
			//that.hide(that.msgName,that.waitTime)
		}
	},
	hide:function(){
		var that=this;
		(function(obj){
			var own=arguments.callee;
			setTimeout(function(){
				if(!that.mouseOver){
					obj.hide('blind',null,500);
				}else{
					own(obj);
				}
			},that.waitTime);
		})(that.msgTopObj);
	},
	close:function(){
		var that=this;
		that.msgBit=false;
		that.findTopObj(this.msgName).hide();
	},
	groupMsgContent:function(msgHtmls){
		var that=this;
		var ps=that.findTopObj(that.msgContent).find("p");
		if(ps.length>0){
			$(ps[0]).before(msgHtmls.join(""));	
		}else{
			that.findTopObj(that.msgContent).html(msgHtmls.join(""));	
		}
	},
	add:function(msgs){
		var that=this;
		if(msgs&&msgs.length){
			var ms=[];
			for(var i=0;i<msgs.length;i++){
				var msg=msgs[i];
				that.msgMap[msg.id]=msg;
				ms.push('<p ><a id="'+msg.id+'" href="javascript:void(0)">'+msg.title+'</a></p>');
			}
			that.groupMsgContent(ms);
		}
	},
	clear:function(){
		var that=this;
		that.findTopObj(that.msgContent).html("");	
	}
};
(function( $ ){  
  $.fn.newMsg = function(msgStructure,isNewForm) {
	  var tname="jyMessage0210230455";
	  if(isNewForm){
		  tname="tname"+(new Date()).getTime()+Math.round((Math.random()*100));
	  }
   	 return new Msg(msgStructure,tname,$(this)[0]);
  };  
})( jQuery );  

