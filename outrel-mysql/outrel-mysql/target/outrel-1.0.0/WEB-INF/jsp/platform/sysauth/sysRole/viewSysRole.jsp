<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>修改角色表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.sysauth.sysrole.controller.SysRoleController">
<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 角色名称：</th>
  <td >${dto.roleName}</td>
  <th> 角色编码：</th>
  <td >${dto.roleCode}</td>
  <th> 角色类型：</th>
  <td ><c:if test="${dto.roleType eq 0}">系统角色</c:if>  
  <c:if test="${dto.roleType eq 1}">普通角色</c:if> 
  <c:if test="${dto.roleType eq 2}">工作流角色</c:if>
  </td> 
</tr>
   
<%--
 <tr>
  <th> 系统ID，备用 ：</th>
  <td >${dto.appId}</td>
  <th> 乐观锁 ：</th>
  <td colspan="3">${dto.version}</td>
</tr> --%>
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
