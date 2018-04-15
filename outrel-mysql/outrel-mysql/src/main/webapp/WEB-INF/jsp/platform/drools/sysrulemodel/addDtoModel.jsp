<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<%@ include file="/common/StaticJavascript.jsp"%>
<title>查询业务模型</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body style="background-color:#FFFFFF">
	<div id="formPageSwap">
		<form id="addNewsFormData" name="addNewsFormData" isCheck="true"
			action="com.fintech.modules.boot.platform.drools.sysrulemodel.controller.SysRuleModelController">
			<input type="hidden" id="dtomodelType" name="modelType" value="2" />
			<table id="addNewsTableId" class="formTableSwap" border="0"
				align="center" cellpadding="0" cellspacing="1">
				<tr>
					<th>类名 ：</th>
					<td><input id="dtoenName" style='width:250px;' name="enName" value="" />(含包名)</td>
					<th>表名 ：</th>
					<td><input name="tableName" style='width:200px;' value="" /></td>
				</tr>
			</table>
		</form>
	</div>
</body>
</html>
