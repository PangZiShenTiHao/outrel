<%@ page language="java" import="java.util.*,com.fintech.modules.common.util.ObtainPropertiesInfo" pageEncoding="UTF-8"%>
<%@ page language="java" import="com.fintech.platform.api.sysconfig.SysConfigAPI,org.springframework.web.context.support.WebApplicationContextUtils,org.springframework.web.context.WebApplicationContext,org.springframework.web.context.ContextLoader,org.springframework.context.ApplicationContext" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<%@ taglib uri="/app" prefix="app"%>
<%
	String path = request.getContextPath();
	String basePath = path + "/";
	if(request.getServerPort() == 80){
		basePath = path+"/";
	}
	String acceptMsg ="NO";
	ApplicationContext context = null;
	try{
		WebApplicationContext webApplicationContext = ContextLoader.getCurrentWebApplicationContext();    
		ServletContext servletContext = webApplicationContext.getServletContext();
		context = WebApplicationContextUtils.getWebApplicationContext(servletContext);
	}catch(Exception e){
		context = SysConfigAPI.getApplicationContext();
	}
	
	
	SysConfigAPI sysConfig = (SysConfigAPI) context.getBean("sysConfigAPI");
	acceptMsg = sysConfig.getValue("accept_msg");//获取配置是否开启接受消息总开关
	String MSG_PUSH_WEBROOT = sysConfig.getValue("MSG_PUSH_WEBROOT");//消息推送服务的根路径
	String PUSH_IS_LOCAL = sysConfig.getValue("PUSH_IS_LOCAL");//是否使用本地服务调用站内消息推送服务
%>
<!DOCTYPE>
<link rel="icon" href="<%=basePath%>fa.ico"/> 

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title><%=ObtainPropertiesInfo.getValByKey("app.name") %></title>
<jsp:include page="/common/StaticJavascript.jsp" />
<script type="text/javascript">
	var MSG_PUSH_WEBROOT = "<%=MSG_PUSH_WEBROOT%>";//home.jsp中的全局变量MSG_PUSH_WEBROOT
	var PUSH_IS_LOCAL = "<%=PUSH_IS_LOCAL%>";//是否使用本地服务调用站内消息推送服务
</script>
<script src="<%=basePath %>/js/platform/pushlet/ajax-pushlet-client.js"></script>
<link rel="stylesheet" href="<%=basePath%>css/home/home.css">
<script type="text/javascript">
	function openUrl(url){
		var f=document.getElementById("mainFrame");
		f.src=url;
	}
</script>
</head>

<body style="overflow: hidden;">
	<div class="top"> 
		<div class="logo"></div>
		<div class="sysName">
			<%=ObtainPropertiesInfo.getValByKey("app.name") %>
		</div>
   		<div class="loginInfo">
   	<ul>

   <%--  <li><a href="<%=ObtainPropertiesInfo.getValByKey("cas.logout.url") %>?service=<%=basePath%>user/logout">退出</a></li> --%>	
    <li><a href="<%=ObtainPropertiesInfo.getValByKey("cas.logout.url") %>" >退出</a></li><li class="liSplit"></li>
    <li><a href="<%=ObtainPropertiesInfo.getValByKey("cas.modifypwd.url") %>?username=<shiro:principal property="loginName"/>" target="_blank" >修改密码</a></li>
    <li class="liSplit"></li>	<li><a href="#" onclick="triggerMenu('/sysMessagecenter/prepareExecute/toQueryPage')">消息(<span id="user_message_count"></span>)</a></li>
   				<li class="liSplit"></li>

   				<%-- <li><a href="https://cas.jypt.com:8443/cas/logout?service=<%=basePath%>">退出</a></li> --%>

    <li><shiro:principal property="name" /></li>
   			</ul>
   		
   		</div>
   	</div>
	<div class="content">
		<div class="leftMenu" id="leftMenu">
			
		</div>
		<div class="moveLeft" id="moveLeft">
			<div class="shrinkIcon" id="shrinkIcon">
			</div>
		</div>
		<div class="mainDiv" id="mainDiv" name="mainDiv">
			<!-- <iframe width="100%" height="100%" style="border:0px; margin:0px;padding:0px;" id="mainFrame"></iframe> -->
		</div> 
	</div>

    <div id="mask" class="maskDiv"></div>
	
	<script>
	window.onload=function(){
		//var menus=[]; 
		 
		jyAjax("<app:contextPath/>/sysMenu/querySysMenuForHome","&sortName=id&sortType=asc",function(result){
			var maps={};
			var datas=[];
			if(result&&result.data&&result.data.length){
				for(var i=0;i<result.data.length;i++){
					var data=result.data[i];
					data["text"]=data["menuName"];
					if(data["menuUrl"] != null && data["menuUrl"] != ""  && data["menuUrl"] != "null"){
						if(data["menuUrl"].indexOf("http")!= -1){
							data["url"]=data["menuUrl"];
						}else{
							data["url"]="<%=basePath%>"+data["menuUrl"];
						}
					}
					
					if(i==0){
						datas.push(data);
					}else{
						if(maps[data.parentId]){
							var d=maps[data.parentId];
							if(!d["subNodes"]){
								d["subNodes"]=[];
							}
							d["subNodes"].push(data);
						}else{
							datas.push(data);
						}
					}
					maps[data.id]=data;
				}
			}
			var menuStructure={"type":"datas","datas":datas,"fun":showObj};
    		var menu=$("#leftMenu").newMenu(menuStructure);
			menu.show();
		});
	};
	var tabs;
	function showObj(node){
		var obj={"title":node.text,"url":node.url};
		if(!tabs){
			tabs=$("#mainDiv").newTabs({"isClose":true,"tabList":[obj]});
		}else{
			tabs.add(obj);
		}
	}
	
	var TopDialog;
	function windowTopDialog(url,title,fun,parent){
		var dialogStruct={
				'display':url,
				'title':title,
				'buttons':[
				           {'text':'提交','action':function(){fun(TopDialog,parent);}},
				           {'text':'关闭','isClose':true,'action':function(){if(parent){parent.flushTable();}}}
				           ]
		};
		TopDialog =jyDialog(dialogStruct);
		TopDialog.open();
	}
	function windowTopConfirm(title,content,fun){
		jyDialog().confirm(content,fun,(title||"确认"));
	}
	(function(){
		var moveBit=false;
		var isShrink=true;
		var srcx=0;
		//var srcy=0;
		var srcw=0;
		var srcl=0;
		//var srcl2=0;
		var leftObj=$("#leftMenu");
		var mainObj=$("#mainDiv");
		var moveLeft=$("#moveLeft");
		var leftDivW=leftObj.width()+10;
		var menuL=leftObj.offset().left;
		var moveW=moveLeft.width();
		moveLeft.bind("mouseover",function(ev, obj){
			//if(isShrink==true){
				$(this).addClass("mouseLeftOver");
			//}
		}).bind("mouseout",function(ev, obj){
			$(this).removeClass("mouseLeftOver");
		}).bind("mousedown",function(ev,obj){
			var obj = ev.srcElement || ev.target;
			if(obj.id=="moveLeft"){
				moveBit=true;
				$("#mask").show();
				//var obj = ev.srcElement || ev.target;
				srcx= moveLeft.offset().left;
		        srcw = leftObj.width();
		        srcl=mainObj.offset().left;
		        srcl2=moveLeft.offset().left;
			}
		}).bind("click",function(ev,obj){
			var obj = ev.srcElement || ev.target;
			var endObj=$(obj);
			if(obj.id=="shrinkIcon"){
				if(endObj.hasClass("shrinkIconLeft")){
					isShrink=true;
					endObj.removeClass("shrinkIconLeft");
					leftObj.css("width",(leftDivW-10)+"px");
		       	    moveLeft.css("left",leftDivW+menuL+"px");
		       	 	mainObj.css("left",(leftDivW+menuL+moveW)+"px");
				}else{
					isShrink=false;
					endObj.addClass("shrinkIconLeft");
					leftObj.css("width","0px");
		       	 	mainObj.css("left",(menuL+moveW)+10+"px");
		       	 	moveLeft.css("left",(menuL)+10+"px");
				}			
			}
		});
		$("#mask").bind("mouseup",function(ev, obj){
			moveBit=false;
			moveLeft.removeClass("mouseLeftOver");
			$("#mask").hide();
		}).bind("mousemove",function(ev,obj){
			if(moveBit&&isShrink){
				var obj = ev.srcElement || ev.target;
				var endx= jyTools.getOffsetLeft(ev,obj);
	       	 	var position= endx-srcx;
	       	 	leftDivW=(srcw+position);
	       	 	leftObj.css("width",leftDivW+"px");
	       	    moveLeft.css("left",(leftDivW+menuL+10)+"px");
	       	 	mainObj.css("left",(srcl+position)+"px");
			}
		});
	})();
	(function(){
		var mainTabs=[{"title":"工作台","url":"<%=basePath%>home/prepareExecute/welcome","isLock":true}];
		tabs=$("#mainDiv").newTabs({"isClose":true,"tabList":mainTabs});  		 
	})();
	
	function showMessage(message,time){
		$("").newMsg({"waitTime":time}).show(message);
	}
	(function(){
		var sys = 'S001';
		//通过开关控制是否打开心消息提醒
		if("YES" =="<%=acceptMsg%>"){
			/* var url='<app:contextPath/>/sysMessage/queryMyMessage';
			var updateStatusUrl='<app:contextPath/>/sysMessage/updateMessageHasRead';
			var msgStructure={"waitTime":"60000","title":"系统新消息","type":"message","url":url,"params":{systemFlag:sys},"msgFun":function(){
			   jyAjax(updateStatusUrl,{msgId:obj.id},function(result){
				   if(result && result.status == 'ok'){
					   jyDialog().alert(obj.conent);
				   }
			   });
			}};
		 	$("").newMsg(msgStructure); */
		 	
		 	//加入pushlet会话并监听
			//为当前用户发布一条欢迎消息
			enterChat();
	 	}
	})();
	
	//进入聊天室
	function enterChat(){
		//执行加入会话、监听会话和订阅消息通道
		p_join_listen('/<%=ObtainPropertiesInfo.getValByKey("app.code") %>_<shiro:principal property="id"/>');
		//发布一条消息
    	p_publish('/<%=ObtainPropertiesInfo.getValByKey("app.code") %>_<shiro:principal property="id"/>', 'msg', 'welcome');
	}
	//p_publish消息后，用以显示服务器返回的消息
	function onData(event) {
		if("undefined"==event.get('msg_id') || null == event.get('msg_id')){
			$("").newMsg({}).show(event.get('msg'));
			//loadUnReadMsg();//重新推送未读消息
		}else{
			$("").newMsg({}).show("<a href='#' onclick='viewMyData("+event.get('msg_id')+")'>"+event.get('msg')+"</a>");
		}
	}
	
	//推送未读消息给用户
	function loadUnReadMsg(){
		var sys = '<%=ObtainPropertiesInfo.getValByKey("app.code") %>';
	 	var params = {systemFlag:sys};
		var url="<app:contextPath/>/sysMessage/loadUnReadMsg";
		$.ajax({
			type:"POST",
			dataType:"JSON",
			url:url,
			data:{systemFlag:sys},
			success:function(msg){
				var v_status = result.status;
	        	if(v_status.indexOf('ok') >-1){
	        		
	        	}else{
	        		$("").newMsg({}).show("加载未读消息异常");
	        	}
			}
		});
	}
	
	//查看我的消息明细
	function viewMyData(vId){
		var dialogStruct={
				'display':contextRootPath+'/sysMessagecenter/prepareExecute/toView?id='+vId,
				'width':800,
				'height':500,
				'title':'查看明细',
				'buttons':[
				 {'text':'关闭','isClose':true}
				]
		};
			
		var dialogView = jyDialog(dialogStruct);
		dialogView.open();
	}
    </script>
</body>
</html>
