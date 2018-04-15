<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<%@ include file="/common/StaticJavascript.jsp"%>
<title>查询系统用户表</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<style type="text/css">
.leftPanel {
	position: absolute;
	left: 2px;
	top: 10px;
	bottom: 2px;
	width: 610px;
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
	left: 620px;
	top: 10px;
	bottom: 2px;
	right: 2px;
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
</style>

<!-- 相关js方法 -->
<script type="text/javascript">
	function initPanel() {
		$("#orgList").load("${basePath}sysPrvOrgAuth/prepareExecute/toQueryPage",
				function() {
					
				});
	}
	jQuery(document).ready(function($) {
		initPanel();
	});
</script>

</head>
<body style="background-color:#FFFFFF">

	<div class="leftPanel">
		<div class="titleSwap">
			<label class="innerTitle">角色管理</label>
		</div>
		<div class="contentSwap">
				<div id="orgList">
				</div>
		</div>
	</div>
	<div class="contentPanel">
		<div class="titleSwap">
			<label class="innerTitle">内容</label>
		</div>
		<div class="contentSwap" id="contentSwap">
		</div>
	</div>
</body>
</html>
