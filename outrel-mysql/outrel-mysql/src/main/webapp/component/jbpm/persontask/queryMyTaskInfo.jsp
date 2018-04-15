<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/component/jbpm/jbpmCommon.jsp" %>
   <%@ include file="/common/StaticJavascript.jsp" %>
  <title>我的任务管理</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <script type="text/javascript" src="${basePath1}component/jbpm/dialog/lhgdialog.js?skin=iblue"></script>
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
$(document).ready(function(){
	
	var prodTabs=[];
		prodTabs.push({"title":"我的待办","url":"${basePath}component/jbpm/persontask/queryMyTodoTask.jsp"});
		prodTabs.push({"title":"我的已办","url":"${basePath}component/jbpm/persontask/queryMyDoneTask.jsp"});
		prodTabs.push({"title":"我的已结","url":"${basePath}component/jbpm/persontask/queryMyEndTask.jsp"});
	<shiro:hasPermission name="jbpm/mytask/0004:operate">
		prodTabs.push({"title":"我的已结历史任务","url":"${basePath}component/jbpm/persontask/queryMyHistEndTask.jsp"});
	</shiro:hasPermission>
	


    var tabs={
	   		"isClose":false,
	   		"tabList":prodTabs
	   		 //,"switchFun":changeTab
    		};
    //初始化 tab 标签页
    tab=$("#tab").newTabs(tabs);
});
//选择tab页后刷新任务
function changeTab(curTab){
	var title = curTab["title"];
	var frm=document.getElementById(this.titleMap[title]);
	if("我的待办"==title){
		frm.contentWindow.location = "${basePath}component/jbpm/persontask/queryMyTodoTask.jsp";
	}else if("我的已办"==title){
		frm.contentWindow.location = "${basePath}component/jbpm/persontask/queryMyDoneTask.jsp";
	}else if("我的已结"==title){
		frm.contentWindow.location = "${basePath}component/jbpm/persontask/queryMyEndTask.jsp";
	}else if("我的已结历史任务"==title){
		frm.contentWindow.location = "${basePath}component/jbpm/persontask/queryMyHistEndTask.jsp";
	}
}
</script>
</head>
<body style="background-color:#FFFFFF">
<div style="width:100%; " id="tab"></div>


</html>
