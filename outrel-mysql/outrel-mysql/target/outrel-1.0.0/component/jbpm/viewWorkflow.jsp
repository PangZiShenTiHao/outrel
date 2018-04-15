<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
  <head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
    <%@ include file="/component/jbpm/jbpmCommon.jsp" %>
    <title>预览流程图</title>
	<script type="text/javascript" src="${basePath1}component/jbpm/scripts/jquery-1.7.2.min.js"></script>
	<!-- 网页中绘制矢量图形的 Javascript 库 -->
    <script type="text/javascript" src="scripts/gef/scripts/raphael-min.js"></script>

      <link rel="stylesheet" type="text/css" href="scripts/ext-2.0.2/resources/css/ext-all.css" />
    <link rel="stylesheet" type="text/css" href="scripts/ux/ext-patch.css" />
     <link rel="stylesheet" type="text/css" href="styles/jbpm4.css" />
    <link rel="stylesheet" type="text/css" href="styles/org.css" />
	 <!-- 引入第三方 tips -->
    <link rel="stylesheet" type="text/css" href="${basePath1}js/threeJs/tips/css/simpletooltip.css" />
    <script type="text/javascript" src="${basePath1}js/threeJs/tips/js/simpletooltip.js"></script>

		
  </head>
<link rel="stylesheet" type="text/css" href="scripts/loading/loading.css" />	
  <body>
  <div id="myId_car">
  <img id="imortPhotoID" src="${basePath1}workFlowProvider/viewPhone.do?type=${param.type}&processName=${param.processName }&processVersion=<%=StringUtilTools.filterSpecial(request,"processVersion")%>&processInstantceId=<%=StringUtilTools.filterSpecial(request,"processInstantceId")%>&processDefKey=<%=StringUtilTools.filterSpecial(request,"processDefKey")%>"  />
  
    <div id="loading">
        <div class="loading-indicator"><img src="scripts/loading/extanim32.gif" align="absmiddle"/>loading...</div> 
    </div>
	
</div>

<div style="display:none ">
鼠标X轴: 
<input id="xxxId" value="" type=text> 
鼠标Y轴: 
<input id="yyyId" value="" type=text> 
</div>	
  </body>
</html>
<script> 
function mouseMove(ev) { 
	Ev= ev || window.event; 
	var mousePos = mouseCoords(ev); 
	document.getElementById("xxxId").value = mousePos.x; 
	document.getElementById("yyyId").value = mousePos.y; 
} 
function mouseCoords(ev) { 
	if(ev.pageX || ev.pageY){ 
		return {x:ev.pageX, y:ev.pageY}; 
	} 
	return{x:ev.clientX + document.body.scrollLeft - document.body.clientLeft, 
			y:ev.clientY + document.body.scrollTop - document.body.clientTop}; 
} 

  document.onmousemove = mouseMove; 
</script> 
	<script>
$(document).ready(function(){
//alert("您的浏览器类型为:"+getOs()); 
	setTimeout(function() {
            
           var id = "";
			//去掉加载中...
			setTimeout(function() {
	            $("#loading").remove();
	             //$("#myId_car").append("<img id='imortPhotoID' src='${basePath1}component/jbpm/test.png'  />");
	            //设置当前活跃的活动
	            setColor('<%=StringUtilTools.filterSpecial(request,"processInstantceId")%>');
        	}, 100);
        
        }, 1000);
});
//在坐标（10,50）创建宽320，高200的画布
var pW = "";
var pH = "";
var paper ="";

//设置已经完成的活动 为红色 流程实例id
function setColor(processInstanceId){
// 在坐标（10,50）创建宽320，高200的画布
pW = $("#imortPhotoID").width();
pH = $("#imortPhotoID").height();
//alert("pW:"+pW+",pH:"+pH);
paper = Raphael(0, 0, pW, pH);

$.ajax({
	url: '${basePath1}workFlowProvider/getAllActiveProcNodeName.do',
	type: 'POST',
	data:{mainProcessInstanceId:processInstanceId,subProcessInstanceId:'',type:'${param.type}'},
	//dataType: 'json',
	error: function(){alert('error');},
	success: function(data){
			//定义活动的子流程 节点名称
			var v_sub_active_name = "";
			var actJSON = eval('(' + data + ')');
			var v_div = "";
			var v_x ="";
			var v_y ="";
			var $obj = $("#myId_car");
			if('MSIE' == getOs()){
				v_div ='<div isSub="isSub" id="divID_aID" onclick="myOnclick()" style="position:absolute; border; 100px solid red;filter: alpha(opacity=30); left:aX; top:aY;width:aWidth;height:aHeight; z-index:100000" title="titleRep" data-simpletooltip="init" data-simpletooltip-position="top" data-simpletooltip-theme="blue"></div>';
			}else{
				v_div ='<div isSub="isSub" id="divID_aID" onclick="myOnclick()" style="position:absolute; border; 100px solid red;opacity:0.5; left:aX; top:aY;width:aWidth;height:aHeight; z-index:100000" title="titleRep" data-simpletooltip="init" data-simpletooltip-position="top" data-simpletooltip-theme="blue"></div>';
			}
			
			for(var i = 0 ; i< actJSON.length ; i++){
				v_sub_active_name = actJSON[i].aName;
				
				var v_y = actJSON[i].aY*1 ;//-30;
				v_div = v_div.replace("aX",actJSON[i].aX+"px");
				v_div = v_div.replace("aY",v_y+"px");
				v_div = v_div.replace("aWidth",actJSON[i].aWidth+"px");
				v_div = v_div.replace("aHeight",actJSON[i].aHeight+"px");
				var v_player = actJSON[i].player;
				if(v_player && "null" != v_player){//参与者 如果不为null 则显示
					v_div = v_div.replace("titleRep","当前参与者为:"+v_player);
				}else{
					v_div = v_div.replace("titleRep","");
				}
				
				//如果是子流程
				if(actJSON[i].aSub){
					v_div = v_div.replace("isSub",actJSON[i].aSub);
					v_div = v_div.replace("myOnclick()","showCurrentPhoto('<c:out value="${param.subProceInsId}" />',false)");
				}
				
				
				var x = 0,y = 0,w = 0, h = 0,r = 0;
				x = actJSON[i].aX*1 + 8;
				y = actJSON[i].aY*1 + 8;
				w = actJSON[i].aWidth*1 -15;
				h = actJSON[i].aHeight*1 -15;
				r = 12.5;
				/*绘制带有圆角的矩形  
				x,y：矩形左上角相对于原点(0,0)的坐标；
				width,height：矩形的宽度和高度；
				r：矩形圆角的半径； */
				var v_rect = paper.rect(x, y, w, h,r);
				// 设置画笔（stroke）的颜色为红色 及边框粗细程度
				v_rect.attr({'stroke':'#f00',
					         'stroke-width': 3.5,
					         'fill':'white',
					         'fill-opacity':0
						   });
			
			}
			$obj.append(v_div);
			//注册 tips 事件
			$('[data-simpletooltip="init"]').simpletooltip({
		           themes: {
		               pink: {
		                   color: 'red',
		                   border_color: 'red',
		                   background_color: 'pink',
		                   border_width: 4
		               }
		           }
		       });
			//获取主流下 所有子流程信息
			getSubProListInfo(v_sub_active_name);
		}
	});
}



function myOnclick(){

}

/**
*
*展示主流程中 子流程信息
*/
function showSubPro(){

}

//查询出 主流程名下的所有子流程信息
function getSubProListInfo(subActiveName){
var mainProId ='<%=StringUtilTools.filterSpecial(request,"processInstantceId")%>';
//通过流程实例id获取当前主流程实例 名下所有子流程信息
$.ajax({
	url: '${basePath1}workFlowProvider/getSubProListInfo.do',
	type: 'POST',
	data:{processInstantceId:mainProId,isInstance:false},
	//dataType: 'json',
	error: function(){alert('error');},
	success: function(data){
			var actJSON = eval('(' + data + ')');
			
			for(var i = 0 ; i< actJSON.length ; i++){
				var v_sub_active_name = actJSON[i].aName;
				var x = 0,y = 0,w = 0, h = 0,r = 0;
				x = actJSON[i].aX*1 + 8;
				y = actJSON[i].aY*1 + 8;
				w = actJSON[i].aWidth*1 -15;
				h = actJSON[i].aHeight*1 -15;
				r = 12.5;
				var v_rect = paper.rect(x, y, w, h,r);
				
				v_rect.data('subProKey', actJSON[i].subProKey);
				// 设置画笔（stroke）的颜色为红色 及边框粗细程度
				var v_cor = "{'stroke':'green','stroke-width': 3.5,'fill':'white','fill-opacity':0}";
				var keyFlag = true;
				var v_proInfo = "";
				if(subActiveName == v_sub_active_name){
					keyFlag = false;
					v_cor = v_cor.replace("green","red");
					v_proInfo = '${param.subProceInsId}';
				}else{
					keyFlag = true;
					v_proInfo = actJSON[i].subProKey;
					//this.data("subProKey")
				}
				//绘制图形 并 设置事件 
				v_rect.attr(eval('(' + v_cor + ')')).click(function (){
					   showCurrentPhoto(v_proInfo,keyFlag);
				});
			}
		}
	});
}


//子流程有活动的实例时 使用该方法 流程信息 ，是否是流程key
function showCurrentPhoto(proInfo,keyFlag){
	var v_url = "${basePath1}component/jbpm/viewWorkflow.jsp";
	//alert("proInfo:"+proInfo+","+keyFlag);
	if(keyFlag){//传递的是 流程定义key
		var subProKey = proInfo;
		v_url = v_url +'?processDefKey='+subProKey;
	}else{//传递的是 流程实例ID
		var proId = proInfo;
		v_url = v_url+'?processInstantceId='+proId;
	}
	var api = frameElement.api, W = api.opener, cDG;
	W.$.dialog({
	id:	'viewWrokflowId2',
    lock: true,
    width:850,
    height:800,
    max:true,
    title:'子流程图',
    content: 'url:'+v_url,
    parent:api,
	    close:function() { 
		//弹出两层时 iframe 丢失焦点处理	
        api.opener.$.dialog({ id:'viewWrokflowId' });
        return true; 
    	}
	}); 
}

 /*
 *判断用户的浏览器 是否是IE chrome 
 * return : MSIE 为IE 
 */
		 
function getOs(){
	var OsObject = "";  
   if(navigator.userAgent.indexOf("MSIE")>0) {  
   	var b_version=navigator.appVersion
	var version=b_version.split(";");
	var trim_Version=version[1].replace(/[ ]/g,"");
   	//alert("trim_Version:"+trim_Version);
	   if(trim_Version == 'MSIE10.0' ){
	   		return "Safari";
	   }
        return "MSIE";  
   }  
   if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){  
        return "Firefox";  
   }  
   if(isSafari=navigator.userAgent.indexOf("Safari")>0) {  
        return "Safari";  
   }   
   if(isCamino=navigator.userAgent.indexOf("Camino")>0){  
        return "Camino";  
   }  
   if(isMozilla=navigator.userAgent.indexOf("Gecko/")>0){  
        return "Gecko";  
   } 
} 
	</script>