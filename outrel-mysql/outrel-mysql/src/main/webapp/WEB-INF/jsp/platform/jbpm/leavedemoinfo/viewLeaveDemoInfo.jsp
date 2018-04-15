<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>修改申请请假表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.jbpm.leavedemoinfo.controller.LeaveDemoInfoController">
<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 申请人姓名 ：</th>
  <td >${dto.appName}</td>
  <th> 请假原因 ：</th>
  <td >${dto.appReason}</td>
  <th> 申请请假天数 ：</th>
  <td >${dto.appDay}</td>
</tr>
<tr>
  <th> 是否批准 ：</th>
  <td >${dto.appState}</td>
  <th> 创建时间
 ：</th>
  <td >${dto.createTime}</td>
  <th> 创建人
 ：</th>
  <td >${dto.createBy}</td>
</tr>
<tr>
  <th> 备注 ：</th>
  <td colspan="5">${dto.remark}</td>
</tr>
  </table>

<!-- 关闭 按钮 在 查询页面进行控制 -->  
</form>

<%-- <%@include file="/common/impJBPMOption.jsp" %> --%>
</div>

</body>

<script type="text/javascript">
   $(document).ready(function(){
   		
	});
</script>
  
</html>
