<%@ page language="java" import="java.util.*,org.springframework.context.ApplicationContext,
org.springframework.web.context.ContextLoader,org.springframework.web.context.WebApplicationContext
,org.springframework.web.context.support.WebApplicationContextUtils
,com.jy.platform.api.sysconfig.SysConfigAPI" pageEncoding="UTF-8"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
  <head>
   <%@ include file="/component/jbpm/jbpmCommon.jsp" %>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>部署流程</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
   <!-- 使用 /demo-web/threeJs/jquery/jquery.js 
 <script type="text/javascript" src="${basePath}component/jbpm/scripts/jquery-1.7.2.min.js"></script>
  -->
 <script type="text/javascript" src="${basePath}component/jbpm/dialog/lhgdialog.min.js?skin=iblue"></script>
   
  </head>
  <body style="background-color:#FFFFFF">

<!-- 相关js方法 -->
<script type="text/javascript">

//取消发布流程 
function cancelPublishProcess(obj){
	var selectedId = getSelectedId();
	if(selectedId==""){
		$.dialog.alert("请选择要取消发布的流程！");
		return;
	} 
	if(selectedId.indexOf(',')>-1){
		alert("请选择一条要取消发布的流程！");
		return;
	}
	var objs = iframe.iframeObj["table"].getSelectedObjs();
	var v_id = objs[0].deploymentId;
	//var v_id = obj['deploymentId'];
	
	if(confirm('你确定要取消发布该流程定义吗？')){
		//调用ajax开始生成代码
		var timestamp = (new Date()).valueOf();
		$.ajax({
		type:"POST",
		async:false, 
		url:"${basePath1}cancelDeployProcess.do?timestamp="+timestamp,
		data:{deploymentId:v_id},
		//data:$("#query").serialize(),//提交的表单信息
		success: function(data){
			alert(data);
			//$.dialog.alert(data,queryData());
			queryData();
			}
		});	
		
	}else{
		 $.dialog.tips('执行取消操作');
	}
}


//发起流程。。。
function startProcess(obj){
	var selectedId = getSelectedId();
	if(selectedId==""){
		$.dialog.alert("请选择要发起的流程！");
		return;
	} 
	if(selectedId.indexOf(',')>-1){
		alert("请选择一条要发起的流程！");
		return;
	}
	var objs = iframe.iframeObj["table"].getSelectedObjs();
	var v_key = objs[0].key;
	//var v_key = obj['key'];
	$.dialog({
	id:	'startNewProIns',
    lock: true,
    width:850,
    height:300,
    title:'发起流程',
    content: 'url:${basePath1}component/jbpm/startProcess.jsp?dto.processKey='+v_key
	});
}



//预览流程 图
function showProPhoto(obj){
var name = obj['name'];
var version = obj['version'];

var deploymentId = "";
var v_url = '${basePath1}component/jbpm/viewWorkflow.jsp?processName='+encodeURI(name)+"&processVersion="+version;
	
	
	$.dialog({
	id:	'viewWrokflowId',
    lock: true,
    width:850,
    height:800,
    max:true,
    title:'流程图',
    content: 'url:'+v_url
	}).max();
}

//表单 选人规则的配置
function deployFormOfPro(obj){
	var v_deploymentId = obj["deploymentId"];
	var	v_id = obj["id"];
	var v_key = obj["key"]
	var v_name = obj["name"];
	var v_version = obj["version"];
	var deploymentId = "";
	var v_url = '${basePath1}component/jbpm/makeupFormPartnerInfo.jsp?processName='+encodeURI(v_name)+"&processVersion="+v_version+"&processDefinitionId="+encodeURI(v_id)+"&proKey="+encodeURI(v_key);

	$.dialog({
	id:	'makeupFormPartnerInfoId',
    lock: true,
    width:850,
    height:800,
    max:true,
    title:'配置表单/选人规则',
    content: 'url:'+v_url
	}).max();
}

/**
 * 获取选中的 行信息
 */
function getSelectedId(){
	var v_ids = "";
	$(".trSelected").each(function(i){
			if(v_ids != "") v_ids = v_ids + ",";
			
			v_ids = v_ids +$(this).attr("kvalue");
	});
	return v_ids;
}
</script>   

<body>
  
			<!-- <a href="javascript:void(0)" onclick="startProcess()" index="0">发起新流程</a> -->
 <%
    WebApplicationContext webApplicationContext = ContextLoader.getCurrentWebApplicationContext();    
	ServletContext servletContext = webApplicationContext.getServletContext();
	ApplicationContext context = WebApplicationContextUtils.getWebApplicationContext(servletContext);
	SysConfigAPI sysConfigAPI = (SysConfigAPI) context.getBean("sysConfigAPI");
	String cancelPublishProcess = sysConfigAPI.getValue("flow_cancelPublishProcess");
	if("yes".equalsIgnoreCase(cancelPublishProcess)){
 %>
 <div id="userTableToolbar" class="tableToolbar" style="display:none;">
 	<a href="javascript:void(0)" onclick="cancelPublishProcess()" index="1">取消发布流程</a>
 </div>	
 <%		
	}
 %>
  	
  
  <div id="content"></div>
	
<script>
var dialog;
var iframe;
//定义form表单 查询 方法
function queryData(){
	iframe.iframeObj["table"].query();
}
//定义 form表单 重置方法
function resetData(){
	iframe.iframeObj["form"].reset();
}	
//页面初始化信息
$(document).ready(function(){
	//定义 form表单查询 信息
	 var formStructure={
		// 定义form表单 字段信息
		columns:[
		 {display:'流程名称', code:'processDefinitionName', width:200,  type:'text'}
		,{display:'流程编码', code:'processDefinitionKey', width:200,  type:'text'}
		,{display:'流程定义ID', code:'processDefinitionId', width:200,  type:'text'}
		],
		//定义form 表单 按钮信息
		buttons:[
		 {"text":"查询","fun":queryData,icon:"ui-icon-search"}
		,{"text":"重置","fun":resetData,icon:"ui-icon-extlink"}
		]
	}
	//定义工具条	
	var toolbar={
		title:"流程定义列表"
	}
	//定义 table 列表信息	
	var tableStructure = {
		//定义table 列表的表头信息
		columns:[
		 {display:'流程名称', code:'name', width:160, align:'left', type:'text', isOrder:false}
		,{display:'流程编码', code:'key', width:160, align:'left', type:'text', isOrder:false}
		,{display:'流程定义ID', code:'id', width:160, align:'left', type:'text',isOrder:false}
		,{display:'版本号', code:'version', width:50, align:'left', type:'text', isOrder:false}
		,{display:'deploymentId', code:'deploymentId', width:100, align:'left', type:'text', isOrder:false}
		,{display:'描述', code:'description', width:200, align:'left', type:'text', isOrder:false}
		,{display:'表单配置', code:'opFormInfo', width:60, align:'center', type:'link', 
			value:[
			 {"text":"配置详情","action":deployFormOfPro}
			]}
		,{display:'流程图', code:'viewPhoto', width:80, align:'center', type:'link', 
			value:[
             {"text":"查看流程图","action":showProPhoto}
            ]}
		//,{display:'操作', code:'op', width:200, align:'center', type:'link', 
		//	value:[
        //      {"text":"发起新流程","action":startProcess}
        //     ,{"text":"取消发布流程","action":cancelPublishProcess}
        //    ]}
	   ],
		url:"<%=basePath%>workFlowProvider/findTaskInfo.do?processState=PROCESS_DEFINE_INFO",
		toolbar:"userTableToolbar",
		pageSize:10,
		selectType:'radio',
		isCheck:true,
		rownumbers:true,
		pages:[ 10, 20, 30 ],
		trHeight:30,
		primaryKey:"id"
	};
	//组装 searchIframe 的相关参数		
	var searchIframe={"toolbar":toolbar,"form":formStructure,"table":tableStructure};	
	//初始化 form 表单 table 列表 及工具条 
	iframe=$("#content").newSearchIframe(searchIframe);
	iframe.show();
});
</script>	
  </body>
</html>
