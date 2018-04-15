<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJspTaglib.jsp" %>
   <title>修改任务分组定义表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  </head>
  
  <body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="">
<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 用户名：</th>
  <td >${dto.userId}</td>
  <th> 模块名称 ：</th>
  <td >${dto.moduleName}</td>
</tr>
<tr>
  <th> 执行类名：</th>
  <td colspan="3">${dto.className}</td>
</tr>
<tr>
	<th> 执行方法名称：</th>
	<td colspan="3">${dto.methodName}</td>
</tr>
<tr>
	<th> 请求URI：</th>
	<td colspan="3">${dto.uri}</td>
</tr>
<tr height="100">
	<th> 参数信息：</th>
	<td colspan="3">${dto.paramInfo}</td>
</tr>
</table>
<br/>

<!-- 关闭 按钮 在 查询页面进行控制 -->  
</form>

</div>

</body>
</html>
