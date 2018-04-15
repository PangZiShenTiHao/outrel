<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>用户角色信息</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   <style>
   	td{height:12px;}
   </style>
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.sysorg.sysuser.controller.SysUserController">
<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
 <td colspan="4" align="center" class="thTitle">用户信息</td>
</tr>
<tr>
  <th style="width:15%;"> 姓名 ：</th>
  <td style="width:35%;">${dto.userName}</td>
  <th style="width:15%;"> 编码 ：</th>
  <td style="width:35%;">${dto.userNo}</td>
  </tr>
<tr>
 <td colspan="4" align="center" class="thTitle">用户角色</td>
</tr>
<c:forEach var="roles" items="${roles}" varStatus="idx">
	<tr>
		<th style="width:15%;">角色名称</th>
		<td>${roles.roleName }</td>
		<th style="width:15%;">角色编码</th>
		<td>${roles.roleCode }</td>
	</tr>
</c:forEach>
  </table>

<!-- 关闭 按钮 在 查询页面进行控制 -->  
</form>

</div>

</body>

<script type="text/javascript">
   $(document).ready(function(){
   		
	});
</script>
  
</html>
