<%@ page language="java" import="java.util.*,org.springframework.context.ApplicationContext,
org.springframework.web.context.ContextLoader,org.springframework.web.context.WebApplicationContext
,org.springframework.web.context.support.WebApplicationContextUtils
,com.jy.platform.api.sysconfig.SysConfigAPI" pageEncoding="UTF-8"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
  <head>
   <%@ include file="/component/jbpm/jbpmCommon.jsp" %>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>查询工作流暂存表</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <script type="text/javascript" src="${basePath}component/jbpm/dialog/lhgdialog.js?skin=iblue"></script>
  <script>
  var AJAX_DEPLOY_URL = '<%=basePath %>deployProcess.do';
  var AJAX_DELETE_TEMP_JBPM4 = '<%=basePath %>deleteTempJbpm4Info.do';
  </script>
  <script type='text/javascript' src='js/queryTemporaryJbpm4Info.js'></script>
   
  </head>
  <body style="background-color:#FFFFFF">
  <div id="userTableToolbar" class="tableToolbar" style="display:none;">
  <a href="javascript:void(0)" onclick="addData()" index="0">新建流程</a>
  <a href="javascript:void(0)" onclick="updateData()" index="0">修改流程</a>
  <a href="javascript:void(0)" onclick="publishProc()" index="1">发布流程</a>
   <%
    WebApplicationContext webApplicationContext = ContextLoader.getCurrentWebApplicationContext();    
	ServletContext servletContext = webApplicationContext.getServletContext();
	ApplicationContext context = WebApplicationContextUtils.getWebApplicationContext(servletContext);
	SysConfigAPI sysConfigAPI = (SysConfigAPI) context.getBean("sysConfigAPI");
	String deleteProcess = sysConfigAPI.getValue("flow_deleteProcess");
	if("yes".equalsIgnoreCase(deleteProcess)){
 %>
   <a href="javascript:void(0)" onclick="deleteData()" index="2">删除</a>	
 <%		
	}
 %>
  
			
		  		
  </div> 	
<div id="content"></div>
<!-- 相关js方法 -->
<script type="text/javascript">
var dialog;
var iframe;

function queryData(){
	iframe.iframeObj["table"].query();
}
function reset(){
	iframe.iframeObj["form"].reset();
}

window.onload=function(){


var formStructure={
	columns:[
		{display:'流程名称', code:'procName', width:200,  type:'text'},
		{display:'流程编码', code:'procCode', width:200,  type:'text'},
		{display:'版本号', code:'procVersion', width:200,  type:'text'},
		{display:'业务目录', code:'bizFile', width:200,  type:'text'}
	],
	buttons:[
	{"text":"查询","fun":queryData,icon:"ui-icon-search"},
	{"text":"重置","fun":reset,icon:"ui-icon-extlink"}
	]
}

var tableStructure = {
	columns:[
		{display:'流程名称', code:'procName', width:200, align:'left', type:'text', isOrder:false},
		{display:'流程编码', code:'procCode', width:200, align:'left', type:'text', isOrder:false},
		{display:'版本号', code:'procVersion', width:50, align:'center', type:'text', isOrder:false},
		{display:'业务目录', code:'bizFile', width:90, align:'left', type:'text',isOrder: false},
		{display:'发布状态', code:'publishState', width:60, align:'center', type:'text', isOrder:false},
		{display:'新增时间', code:'created', width:120, align:'left', type:'text', isOrder:false}
		//{display:'操作', code:'opInfo', width:200, align:'center', type:'link'
		//	value:[ {"text":"修改流程","action":updateData}
        //           ,{"text":"发布流程","action":publishProc}
        //           ,{"text":"删除","action":deleteData}
        //         ]}
	   ],
		url:"<%=basePath%>workFlowProvider/findTemporaryJbpm4InfoByPage.do",
		pageSize:10,
		toolbar:"userTableToolbar",
		selectType:'checkbox',
		isCheck:true,
		rownumbers:true,
		pages:[ 10, 20, 30 ],
		trHeight:30,
		primaryKey:"id"
	};
	
var searchIframe={"toolbar":"","form":formStructure,"table":tableStructure};	
iframe=$("#content").newSearchIframe(searchIframe);
iframe.show();	

}
</script>   
  </body>
</html>
