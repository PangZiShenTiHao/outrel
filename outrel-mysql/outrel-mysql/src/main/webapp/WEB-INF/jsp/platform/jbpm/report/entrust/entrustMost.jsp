<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/StaticJavascript.jsp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<script src="<%=basePath%>/js/platform/jbpm/report/common.js"></script>
<script type="text/javascript">
	$(function() {
		$("#tabs").tabs();
	});
</script>
</head>
<body>
	<div id="tabs">
		<ul>
			<li><a href="#user">用户TOP10</a></li>
			<li><a href="#dept">部门TOP10</a></li>
			<li><a href="#role">角色TOP10</a></li>
		</ul>
		<div id="user">
			<iframe scrolling="yes" frameborder="0"
				src="<%=basePath%>/dojbpm/userBPMReport/showPage/toEntrustMost"
				style="width:100%;height:100%;"></iframe>
		</div>
		<div id="dept">
			<iframe scrolling="yes" frameborder="0"
				src="<%=basePath%>/dojbpm/deptBPMReport/showPage/toEntrustMost"
				style="width:100%;height:100%;"></iframe>
		</div>
		<div id="role">
			<iframe scrolling="yes" frameborder="0"
				src="<%=basePath%>/dojbpm/roleBPMReport/showPage/toEntrustMost"
				style="width:100%;height:100%;"></iframe>
		</div>
	</div>
</body>
</html>

