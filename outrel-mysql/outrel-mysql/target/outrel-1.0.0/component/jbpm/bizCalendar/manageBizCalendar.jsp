<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/component/jbpm/jbpmCommon.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>日历设置</title>
<%@ include file="/common/StaticJavascript.jsp" %>
<script src="${basePath}/component/jbpm/bizCalendar/js/WdatePicker.js"></script>
<link rel="stylesheet" href="${basePath}/component/jbpm/bizCalendar/css/date.css">
<script type="text/javascript">
var sd;
function readFun(date,fun){
	//alert(date);
	//fun(["2014-10-01","2014-10-20","2014-09-20"]);
	$.ajax({
		url: "${basePath}bizCalendar/getBizHolidayListByYearMonth",
		type: "POST",
		data: "yearmonth=" + date,
		dataType: "json",
		success: function(data) {
			fun(data);
		}
	});
}
window.onload=function(){
	sd=$().newDate("-",readFun);
	sd.show();
}
function getValue(){
	alert(sd.getSelectedDate());	
}

function changeBizHolidaysByYearMonth() {
	var holidays = sd.getSelectedDate();
	
	if(holidays.length==0) {
		return false;
	}
	
	$.ajax({
		url: "${basePath}bizCalendar/changeBizHolidaysByYearMonth",
		type: "POST",
		data: "holidays=" + holidays,
		error:function(){alert("ajax error");},
		success:function(msg){alert("保存成功")}
	});
}

function refreshData(){
	parent.tabs.refreshByTitle("节假日管理")
}

function closeFun(){
	parent.tabs.close();
}
</script>
<style type="text/css">

</style>
</head>
<body>

<br>
<div id="main" >
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	<input type="button" name="" id="" value="保存" onClick="changeBizHolidaysByYearMonth()" />
	<input type="button" name="" id="" value="刷新" onClick="refreshData()" />
	<input type="button" name="" id="" value="关闭" onClick="closeFun()" />
	
</div>
</body>
</html>
