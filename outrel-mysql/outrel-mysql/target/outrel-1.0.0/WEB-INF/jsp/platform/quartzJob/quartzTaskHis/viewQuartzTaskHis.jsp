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
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="com.fintech.modules.boot.quartzJob.quartzTaskHis.controller.QuartzTaskHisController">
<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 批次号码 ：</th>
  <td >${dto.batchNo}</td>
  <th> 分组编码 ：</th>
  <td >${dto.groupId}</td>
  <th> 执行任务的主线 ：</th>
  <td >${dto.threadId}</td>
</tr>
<tr>
  <th> 任务编号 ：</th>
  <td >${dto.taskId}</td>
  <th> 任务类名（实体 ：</th>
  <td >${dto.beanId}</td>
  <th> 任务执行返回结 ：</th>
  <td >${dto.taskState}</td>
</tr>
<tr>
  <th> 任务执行开始时 ：</th>
  <td >${dto.taskStartTime}</td>
  <th> 任务执行结束时 ：</th>
  <td >${dto.taskEndTime}</td>
  <th> 任务执行中信息 ：</th>
  <td >${dto.taskInfo}</td>
</tr>
<tr>
  <th> 任务执行失败， ：</th>
  <td colspan="5">${dto.errorInfo}</td>
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
