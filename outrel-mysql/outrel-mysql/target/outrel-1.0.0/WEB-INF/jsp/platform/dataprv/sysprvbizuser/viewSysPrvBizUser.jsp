<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<%@ include file="/common/StaticJavascript.jsp"%>
<title>修改业务数据用户权限表</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

</head>

<body style="background-color:#FFFFFF">
	<div id="formPageSwap">
		<br />
			<table id="updateNewsTableId" class="formTableSwap" border="0"
				align="center" cellpadding="0" cellspacing="1">
				<tr>
					<th>用户 ：</th>
					<td>${dto.userId}</td>
					<th>组织机构：</th>
					<td>${dto.orgId}</td>
				</tr>
				<tr>
					<th>业务表名 ：</th>
					<td>${dto.tableName}</td>
					<th>业务ID ：</th>
					<td>${dto.bizId}</td>
				</tr>
			</table>
	</div>

</body>

<script type="text/javascript">
	$(document).ready(function() {

	});
</script>

</html>
