<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJspTaglib.jsp" %>
   <title>修改模板</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   <style type="text/css">
   	td{height:26px;}
   </style>
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.systemplate.controller.SysTemplateController">
<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 系统ID ：</th>
  <td >${dto.appId}</td>
  <th> 模板编码 ：</th>
  <td >${dto.templateNo}</td>
</tr>
<tr>
  <th> 模板名称 ：</th>
  <td >${dto.templateName}</td>
  <th> 模板类型 ：</th>
  <c:if test="${dto.templateType ==1}">
     <td>短信</td>
  </c:if>
  <c:if test="${dto.templateType ==2}">
     <td>邮件</td>
  </c:if>
  <c:if test="${dto.templateType ==9}">
     <td>其他</td>
  </c:if>
</tr>
<tr>
  <th> 模板内容 ：</th>
  <td colspan="3">${templateContent}</td>
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
