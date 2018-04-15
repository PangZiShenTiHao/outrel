<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/common/StaticJavascript.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>报表图</title>
<script src="<%=basePath%>/js/platform/jbpm/report/common.js"></script>
<script type="text/javascript">
var path="<%=basePath%>";
$(function() {
		var custum=new bpmReport('container', '平均人工活动速率最高TOP10', '平均耗时(分)', '平均耗时');
		custum.setUrl(path + "dojbpm/processReport/getAvgHumanEfficientHighestData");
		custum.setType("avgColumn");
		custum.showImage();
	});
</script>
</head>
<body>
	<div id="topDiv" style="min-width: 300px; min-height: 100px; "></div>
	<div id="containerpgbar" style="position: relative;display:block;position: absolute;top:50%;left:30%;right:20%;margin-left:-300px; margin-top:-150px;">
		<div id="containerpglabel" style="position: absolute;left: 50%;top: 8px;font-weight: bold;text-shadow: 1px 1px 0 #fff;">加载中...
		</div>
	</div>
	<div id="container"		style="min-width: 300px; height: 550px; margin: 0 auto;text-align:center; vertical-align:middle;"></div>
</body>
</html>

