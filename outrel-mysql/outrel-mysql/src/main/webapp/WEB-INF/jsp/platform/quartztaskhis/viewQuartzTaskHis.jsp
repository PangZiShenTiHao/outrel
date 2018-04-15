<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>修改定时任务执行轨迹表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.quartztaskhis.controller.QuartzTaskHisController">
<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 批次号码 ：</th>
  <td >${dto.batchNo}</td>
  <th> 分组编码 ：</th>
  <td >${dto.groupId}</td>
</tr>
<tr>
	<th> 执行任务的主线 ：</th>
  <td >${dto.threadId}</td>
  <th> 任务编号 ：</th>
  <td >${dto.taskId}</td>
</tr>
<tr>
  <th> 任务类名（实体类） ：</th>
  <td >${dto.beanId}</td>
  <th> 任务执行返回结果 ：</th>
  <td ><c:if test='${dto.taskState==1}'>成功</c:if>
  <c:if test='${dto.taskState==0}'>失败</c:if></td>
</tr>
<tr>
	<th> 任务执行开始时间 ：</th>
  <td >${dto.taskStartTime}</td>
  <th> 任务执行结束时间 ：</th>
  <td >${dto.taskEndTime}</td>
</tr>
<tr>
  <th> 任务执行中信息 ：</th>
  <td colspan="3">${dto.taskInfo}</td>
</tr>
<tr>
  <th> 任务执行失败，错误信息 ：</th>
  <td colspan="3">${dto.errorInfo}</td>
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
