<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>修改外联平台系统管理表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="com.jy.modules.externalplatform.application.extsysmanagement.controller.ExtSysManagementController">
<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 系统编号 ：</th>
  <td >${dto.sysCode}</td>
  <th> 系统名称 ：</th>
  <td colspan="3">${dto.sysName}</td>
</tr>
<tr>
  <th> 创建人 ：</th>
  <td >${dto.createBy}</td>
  <th> 创建时间 ：</th>
  <td colspan="3"><fmt:formatDate value="${dto.createTime}" pattern="yyyy-MM-dd HH:mm:ss"/></td>
</tr>
<tr>
  <th> 修改人 ：</th>
  <td >${dto.modifyBy}</td>
  <th> 修改时间 ：</th>
  <td colspan="3"><fmt:formatDate value="${dto.modifyTime}" pattern="yyyy-MM-dd HH:mm:ss"/></td>
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
