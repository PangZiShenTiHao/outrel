<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>修改权限注册表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.bizauth.vmauthregisterinfo.controller.VmauthRegisterInfoController">
<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 虚拟树代码 ：</th>
  <td >${dto.vmtreeCode}</td>
  <th> 虚拟树名称 ：</th>
  <td >${dto.vmtreeName}</td>
</tr>
<tr>
  <th> 映射表名 ：</th>
  <td >${dto.mapTabName}</td>
  <th> 数据权限表名 ：</th>
  <td >${dto.dataTabName}</td>
</tr>
<tr>
  <th> 创建映射表SQL ：</th>
  <td colspan="3"><textarea rows="10" cols="70" readonly="readonly">${dto.mapInitSql}</textarea></td>
</tr>
<tr>
  <th> 创建数据权限表SQL ：</th>
  <td colspan="3"><textarea rows="10" cols="70" readonly="readonly">${dto.dataInitSql}</textarea></td>
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
