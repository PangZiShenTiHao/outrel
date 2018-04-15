<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html >
<head>
<%@ include file="/common/StaticJavascript2.jsp"%>
<title>修改员工请假表</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

</head>

	<div id="formPageSwap">
		<br />
		<form id="addNewsFormData" name="addNewsFormData"  >
			<table id="addNewsFormDataTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1">
			    <tr>
					<th>申请人 ：</th>
					<td >${userName}</td>
					<!-- 预约请假 -->
					<input type="hidden" class="text" id="leave_type" name="leave_type" value ="${leaveType }" />
					<input type="hidden" class="text" id="vId" name="vId" value ="${ids }" />
				</tr>
				<tr>
					<th>时间 ：</th>
					<td><input type="text" class="text" id="startTime" name="startTime"  onfocus="WdatePicker({skin:'whyGreen',minDate:'%y-%M-%d'})"/> - <input type="text" class="text" id="endTime" name="endTime"  onfocus="WdatePicker({skin:'whyGreen',minDate:'%y-%M-%d'})"/> </td>
				</tr>
			</table>
		</form>
	</div>
</html>
