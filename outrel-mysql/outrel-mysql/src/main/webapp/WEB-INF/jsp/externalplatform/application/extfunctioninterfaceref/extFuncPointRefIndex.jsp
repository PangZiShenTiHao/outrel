<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
  <title>进件跑批查询</title>
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

	var prodTabs=[];
		prodTabs.push({"title":"功能点规则管理","url":"${basePath}extFunctionInterfaceRef/prepareExecute/toQueryFuncRuleGroupRef"});
		prodTabs.push({"title":"功能点接口管理","url":"${basePath}extFunctionInterfaceRef/prepareExecute/toQueryFuncInterfaceRef"});
    var tabs={
	   		"isClose":false,
	   		"tabList":prodTabs
    		};
    //初始化 tab 标签页
    moniTab=$("#tab").newTabs(tabs);
});
</script>
</head>
<body style="background-color:#FFFFFF">
<div style="width:100%; " id="tab"></div>


</html>

