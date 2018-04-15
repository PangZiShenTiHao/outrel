<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="sql" uri="http://java.sun.com/jsp/jstl/sql" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>用户权限列表</title>
</head>
<body>
	<table>
	<tr>
		<td>表名称</td>
		<td>权限ID</td>
		<td>被授权用户ID</td>
		<td>授权用户ID</td>
	</tr>
	<c:forEach var="temp" items="${dtos}" varStatus="status">
		<tr>
		<td align="center"><c:out value="${temp.tableName}"/></td>
		<td align="center"><c:out value="${temp.bizId}"/></td>
		<td align="center"><c:out value="${temp.createUserId}"/></td>
		<td align="center"><c:out value="${temp.authUserId}"/></td>
		</tr>
	</c:forEach>
	</table>
</body>
</html>