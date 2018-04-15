<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>修改系统配置表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.sysconfig.controller.SysConfigController">
<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 配置名称 ：</th>
  <td >${dto.configName}</td>
  <th> 配置编码 ：</th>
  <td >${dto.configCode}</td>
</tr>
<tr>
  <th> 配置值 ：</th>
  <td >${dto.configValue}</td>
  <th> 类型 ：</th>
  <td ><c:if test="${dto.configType==0}">系统级</c:if><c:if test="${dto.configType==1}">项目级</c:if></td>
  <%-- <th> 乐观锁 ：</th>
  <td colspan="3">${dto.version}</td> --%>
</tr>
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
