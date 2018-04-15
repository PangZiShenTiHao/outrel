<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/component/jbpm/jbpmCommon.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=EmulateIE7" />
    <title>配置流程图表单选人规则</title>
<script type="text/javascript" src="${basePath1}component/jbpm/scripts/jquery-1.7.2.min.js"></script>
<!-- 网页中绘制矢量图形的 Javascript 库 -->
<script type="text/javascript" src="scripts/gef/scripts/raphael-min.js"></script>
    
      <link rel="stylesheet" type="text/css" href="scripts/ext-2.0.2/resources/css/ext-all.css" />
    <link rel="stylesheet" type="text/css" href="scripts/ux/ext-patch.css" />
     <link rel="stylesheet" type="text/css" href="styles/jbpm4.css" />
    <link rel="stylesheet" type="text/css" href="styles/org.css" />
	 
<link rel="stylesheet" type="text/css" href="scripts/loading/loading.css" />		
  </head>
  <body>
    
    <div id="myId_car">
  <img id="imortPhotoID" src="${basePath1}workFlowProvider/viewPhone.do?processName=<%=StringUtilTools.filterSpecial(request,"processName")%>&processVersion=<%=StringUtilTools.filterSpecial(request,"processVersion")%>&processInstantceId=<%=StringUtilTools.filterSpecial(request,"processInstantceId")%>"  />
  
    <div id="loading">
        <div class="loading-indicator"><img src="scripts/loading/extanim32.gif" align="absmiddle"/>loading...</div> 
    </div>
	
	
  </body>
</html>
	<script>
$("document").ready(function(){
//alert("您的浏览器类型为:"+getOs()); 
	setTimeout(function() {
           var id = "";
			//去掉加载中...
			setTimeout(function() {
	           $('#loading').remove();
	            //设置当前活跃的活动
	            setColor('<c:out value="${param.processDefinitionId}" />');
	            
        	}, 100);
        
        }, 1000);
        
	
	
});

//设置已经完成的活动 为红色 流程实例id
function setColor(proDefinitionId){
// 在坐标（10,50）创建宽320，高200的画布
var pW = $("#imortPhotoID").width();
var pH = $("#imortPhotoID").height();
var paper = Raphael(0, 0, pW, pH);
var actJSON ="";
	$.ajax({
	url: '${basePath1}workFlowProvider/getProcNodeName.do',
	type: 'POST',
	data:{processDefinitionId:proDefinitionId},
	error: function(){alert('error');},
	success: function(data){
			actJSON = eval('(' + data + ')');
			
			for(var i = 0 ; i< actJSON.length ; i++){
				
				var x = 0,y = 0,w = 0, h = 0,r = 0;
				x = actJSON[i].aX*1 + 8;
				y = actJSON[i].aY*1 + 8;
				w = actJSON[i].aWidth*1 -15;
				h = actJSON[i].aHeight*1 -15;
				r = 12.5;
				var v_name = actJSON[i].aName+'';
				var v_proVer = '<%=StringUtilTools.filterSpecial(request,"processVersion")%>';
				var v_proDef = '<c:out value="${param.processDefinitionId}" />';
				
				//alert("---v_name:"+v_name+'--');
				/*绘制带有圆角的矩形  
				x,y：矩形左上角相对于原点(0,0)的坐标；
				width,height：矩形的宽度和高度；
				r：矩形圆角的半径； */
				
				// 设置画笔（stroke）的颜色为红色 及边框粗细程度 #03689A 蓝色 #f00 红色
				var v_rect = paper.rect(x, y, w, h,r);
				v_rect.data('v_name', v_name);
				v_rect.attr({'stroke':'#f00',
					         'stroke-width': 3.5,
					         'fill':'white',
					         'fill-opacity':0
						   }).click(function (){
				   				this.attr({'stroke':'#03689A'});
								showFormInfo(v_proVer,v_proDef,this.data("v_name"));
								//return ;
						   });
				//动画
				v_rect.hover(function(){
					this.animate({"fill-opacity":0.5}, 100);
				},function(){
					this.animate({"fill-opacity":0}, 100);
				});
				
			}
		}
	});
	
}

//
function showFormInfo(proVersion,proDefId,aName){
//dwr查询 
	var isAdd = true;
	var formInfoId = "";
	//encodeURI(aName)
	$.ajax({
	url: '${basePath1}workFlowProvider/queryJbpm4FormInfoId.do',
	type: 'POST',
	async: false, 
	data:{proKey:'<c:out value="${param.proKey}" />',proVersion:proVersion,aName:aName},
	error: function(){alert('error');},
	success: function(data){
				if(data == null || data == ""){
					isAdd = true;
				}else{
					isAdd = false;
					formInfoId = data;
				}
		}
	});
	
	
	var v_url = '${basePath1}component/jbpm/jbpm4FormInfo/addJbpm4FormInfo.jsp?proKey='+encodeURI("<c:out value="${param.proKey}" />")+'&proDefId='+encodeURI(proDefId)+'&proVersion='+proVersion+'&aName='+encodeURI(aName);
	
	//如果存在则修改
	if(!isAdd)
	v_url = v_url.replace("component/jbpm/jbpm4FormInfo/addJbpm4FormInfo.jsp", "workFlowProvider/prepareModifyFormInfo.do")+"&dto.id="+formInfoId;
	
	var api = frameElement.api, W = api.opener, cDG;
	
	W.$.dialog({
	id:	'makeupFormInfoId',
    lock: true,
    width:960,
    height:850,
    max:true,
    title:'设置表单/选人规则',
    content: 'url:'+v_url,
    parent:api,
	    close:function() { 
		//弹出两层时 iframe 丢失焦点处理	
        api.opener.$.dialog({ id:'makeupFormPartnerInfoId' });
        return true; 
    	}
	}); 
}

function myOnclick(){

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