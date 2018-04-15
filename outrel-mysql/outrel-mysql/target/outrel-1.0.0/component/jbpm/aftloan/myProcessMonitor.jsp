<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/component/jbpm/jbpmCommon.jsp" %>
   <%@ include file="/common/StaticJavascript.jsp" %>
  <title>我的任务管理</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <!-- 自定义样式 -->
<style type="text/css">
.search_fieldset{
	border:1px #ff9900 solid;
	margin:10px;
}
.resizable{
	position: inherit;
}
</style>
<script type="text/javascript">
var moniTab;
$("document").ready(function(){
    var tabs={
	   		"isClose":false,
	   		"tabList":[{"title":"待办监控","url":"${basePath}component/jbpm/aftloan/monitorTodo.jsp"}
	   		           ,{"title":"已办监控","url":"${basePath}component/jbpm/aftloan/monitorTone.jsp"}
	   		           ,{"title":"已结监控","url":"${basePath}component/jbpm/aftloan/monitorEnd.jsp"}
	   		           /* ,{"title":"活动的流程实例监控","url":"${basePath}component/jbpm/monitor/monitorActivePro.jsp"}
	   		     	   ,{"title":"已结流程实例监控","url":"${basePath}component/jbpm/monitor/monitorEndPro.jsp"} */
	   		           ]
    		};
    //初始化 tab 标签页
    moniTab=$("#tab").newTabs(tabs);
});

/*
 * 设置 回调 姓名
 */
function callFunMoniSetUser(objs){
	moniTab.getActiveIframe().callFunSetUser(objs);
}
</script>
</head>
<body style="background-color:#FFFFFF">
<div style="width:100%; " id="tab"></div>


</html>
