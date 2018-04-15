<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJspTaglib.jsp" %>
   <title>修改任务分组定义表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   <script type="text/javascript">
   		function resetStatus(id,trName){
   			
   			$.ajax({
   				type : "POST",
   				dataType:'json',
   				url : contextRootPath + '/quartzTaskGroupInstance/resetTaskState?id='
   						+ id,
   				success : function(msg) {
   					if(msg&&msg.status=="ok"){
   						$('#'+trName).children()[3].innerHTML='';
   						$("").newMsg({}).show("任务重置成功");
   						//alert("任务重置成功");
   					}else{
   						$("").newMsg({}).show("任务重置失败");
   						//alert("任务重置失败");
   					}
   				}
   			}); 
   		};
   </script>
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="com.fintech.modules.boot.quartzJob.quartzTaskGroupDef.controller.QuartzTaskGroupDefController">
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 分组编号 ：</th>
  <td >${dtoList[0].groupId}</td>
  <th> 分组名称 ：</th>
  <td >${dtoList[0].groupName}</td>
  <th> 分组任务编号 ：</th>
  <td >${dtoList[0].batchNo}</td>
</tr>
<tr>
  <th> 是否自动执行：</th>
  <td ><c:if test='${dtoList[0].autoExec==0}'>否</c:if>
	   <c:if test='${dtoList[0].autoExec==1}'>是</c:if></td>
  <th> 执行时机：</th>
  <td ><c:if test='${dtoList[0].dealChance=="day"}'>日任务</c:if>
	   <c:if test='${dtoList[0].dealChance!="day"}'>年任务</c:if></td>
  <th> 备注 ：</th>
  <td colspan="5">${dto.remark}</td>
</tr>
</table>
<br/>
<table id="tab" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
		<tr align='center'>
			<td width=5%>执行顺序</td>
			<td width=10%>任务名称</td>
			<td width=10%>任务类名</td>
			<td width=5%>任务状态</td>
			<td width=10%>依赖任务</td>
			<td width=5%>依赖状态</td>
			<td width=5%>是否执行</td>
			<td width="10%">任务开始时间</td>
			<td width="10%">任务结束时间</td>
			<td width="10%">失败重置执行</td>
		</tr>
		<c:forEach items="${dtoList}" var="attr" varStatus="status">
			<tr id="${status.index+1}">
				<td>${attr.dealStep}</td>
				<td>${attr.taskName}</td>
				<td>${attr.beanId}</td>
				<td><c:if test='${attr.taskInsState==0}'>失败</c:if>
					<c:if test='${attr.taskInsState==1}'>成功</c:if>
				</td>
				<td>${attr.preStep}</td>
				<td><c:if test='${attr.preStepState==0}'>失败</c:if>
					<c:if test='${attr.preStepState==1}'>成功</c:if>
				</td>
				<td><c:if test='${attr.isEnd==1}'>否</c:if>
					<c:if test='${attr.isEnd==0}'>是</c:if></td>
				<td>${attr.taskStartTime}</td>
				<td>${attr.taskEndTime}</td>
				<td><c:if test='${attr.taskInsState==0}'><a href='javascript:void(0)' onclick=resetStatus('${attr.id}','${status.index+1}')>重置</a></c:if></td>
			</tr>
		</c:forEach>
	</table>

<!-- 关闭 按钮 在 查询页面进行控制 -->  
</form>
</div>
</body>
</html>
