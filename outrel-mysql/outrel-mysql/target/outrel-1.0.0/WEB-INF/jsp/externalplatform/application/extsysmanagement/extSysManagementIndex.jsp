<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
  <title>查询外联平台系统信息</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<style type="text/css">
		.leftPanel {
			position: absolute;
			left: 2px;
			top: 10px;
			bottom: 2px;
			width: 200px;
			border: 1px solid #CCC9C9;
			border-radius: 5px;
			-moz-border-radius: 5px;
			-webkit-border-radius: 5px;
			background: #FAFAFA;
		}
		
		.leftPanel .innerPanel {
			position: absolute;
			left: 0px;
			top: 10px;
			bottom: 0px;
			right: 0px;
			overflow: auto;
		}
		
		.contentPanel {
			position: absolute;
			top: 10px;
			bottom: 2px;
			right: 2px;
			left:210px;
			border: 1px solid #CCC9C9;
			border-radius: 5px;
			-moz-border-radius: 5px;
			-webkit-border-radius: 5px;
			background: #FAFAFA;
		}
		
		.leftPanel .titleSwap,.contentPanel .titleSwap {
			display: block;
			margin: -10px 0px 0px 20px;
			text-align: left;
		}
		
		.leftPanel .innerTitle,.contentPanel .innerTitle {
			background: #FAFAFA;
			padding: 0px 5px;
		}
		
		.leftPanel .contentSwap,.contentPanel .contentSwap {
			margin: 5px;
		}
		
		.ztree li span.button.add {
			margin-left: 2px;
			margin-right: -1px;
			background-position: -144px 0;
			vertical-align: top;
		}
		
		.ztree li span.button.all {
			margin-left: 2px;
			margin-right: -1px;
			background-position: -1026px 0;
			vertical-align: top;
		}
		
		.ztree li span.button.all a {
			margin-top: 6px;
			color: #FF0000;
		}
		.tabs{
			top:10px;
		}
	</style>
</head>

<body style="background-color:#FFFFFF">
	<div class="leftPanel">
		<div class="titleSwap">
			<label class="innerTitle">系统信息</label>
		</div>
		<div class="contentSwap">
			<div class="innerPanel" id="innerPanel">
				<div class="ztree" id="RoleList" style="height: 663px;">
					 
				</div>
			</div>
		</div>
	</div>
	<div class="contentPanel">
		<div class="titleSwap" style="height:30px;">
			<label class="innerTitle">挡板配置信息</label>
		</div>
		<div class="contentSwap" id="contentSwap">
		</div>
	</div>
</body>
	<script type="text/javascript">
		var tree;
		var tabs;
		var prodTabs=[];
			prodTabs.push({"title":"调用挡板配置","url":"${basePath}/extInvokeFilterRule/prepareExecute/toQueryPage"});
			if(prodTabs.length ==0){
				prodTabs.push({"title":"无权限访问","url":""});
			}
		function configProd(nodeId,obj){
			var sysCode=obj.ID;
			$("#contentSwap").html("");
			tabs=$("#contentSwap").newTabs({"isClose":false,"tabList":prodTabs,"reBuildUrl":function(url){
				return url+"?sysCode="+sysCode;
			}});
		}
		$(document).ready(function($) {
			tree=$("#RoleList").jyTree({"disabledLink":false,"isEdit":false,"expandAll":true,"check":false,"checkChildNodes":false,"url":contextRootPath+'/extSysManagement/queryTreeExtSysManagement?validateState=1',"viewFun":configProd});
			tree.show();
		});
		/* function configProd(nodeId,obj){
			var sysCode=obj.ID;
			$("#contentSwap").html("");
			$("#contentSwap").load("${basePath}/extInvokeFilterRule/prepareExecute/toQueryPage?sysCode="+sysCode);
		} */
	</script>
</html>
