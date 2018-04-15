<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <script type="text/javascript" src="${basePath}js/platform/quartzJob/quartzTaskGroupDef/updateTaskDef.js"></script>
   <title>修改任务分组定义表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="com.fintech.modules.boot.quartzJob.quartzTaskGroupDef.controller.QuartzTaskGroupDefController">
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 分组编号 ：</th>
  <td > 
  <input class="text" name="groupId" notNull="false" maxLength="25" value="${dtoList[0].groupId}" readonly="readonly" />
  </td>
  <th> 分组名称 ：</th>
  <td > 
  <input class="text" name="groupName" notNull="false" maxLength="20" value="${dtoList[0].groupName}" readonly="readonly"/>
  </td>
  <th> 是否发布 ：</th>
  <td >
   <input type='radio' name="groupState" value="1" />是
  <input type='radio' name="groupState" value="0" checked/>否
  </td>
</tr>
<tr>
  <th> 是否自动执行 ：</th>
  <td > 
  <c:if test='${dtoList[0].autoExec==0}'><input type='radio' name="autoExec" value="1" />是
  <input type='radio' name="autoExec" value="0" checked />否</c:if>
  <c:if test='${dtoList[0].autoExec==1}'><input type='radio' name="autoExec" value="1" checked/>是
  <input type='radio' name="autoExec" value="0" />否</c:if>
  
  </td>
  <th> 执行时机：</th>
  <td >
  	<c:if test='${dtoList[0].dealChance=="day"}'>
  		<select name='dealChance' >
	  		<option value='day' selected="selected">日任务</option>
	  		<option value='year'>年任务</option>
  		</select>
  	</c:if>
  	<c:if test='${dtoList[0].dealChance!="day"}'>
  		<select name='dealChance' >
	  		<option value='day' >日任务</option>
	  		<option value='year' selected="selected">年任务</option>
  		</select>
  	</c:if>
  </td>
  <th> 执行时间：</th>
  <td > 
  <%-- <input class="text" name="runTime" notNull="false" maxLength="250" value="${dtoList[0].runTime}" /> --%>
  <input type="text" id="runTime" name="runTime" onfocus="WdatePicker({skin:'whyGreen',dateFmt:'HH:mm:ss'})" class="Wdate" value="${dtoList[0].runTime}" />
  </td>
</tr>
</table>
<table id="tab" class="formTableSwap"  border="0" align="center" cellpadding="0" cellspacing="1" >
		<tr align='center'>
			<td width=5%>执行顺序</td>
			<td width=15%>任务名称</td>
			<td width=15%>任务类名</td>
			<td width=10%>依赖任务</td>
			<td width=10%>依赖状态</td>
			<td width=5%>操作</td>
		</tr>
		<c:forEach items="${dtoList}" var="attr" varStatus="status">
			<tr id="${status.index+1}" align='center'>
				<td><input name="taskList[${status.index}].dealStep" value="${attr.dealStep}"  style="width:20%;"/></td>
				<td><input name="taskList[${status.index}].taskName" value="${attr.taskName}"/></td>
				<td><input id="taskList[${status.index}].beanId" name="taskList[${status.index}].beanId" value="${attr.beanId}"/></td>
				<td><input name="taskList[${status.index}].preStep" id="taskList[${status.index}].preStep" value="${attr.preStep}"/></td>
				<td>
					<c:if test='${attr.preStepState==0}'>
						<select name="taskList[${status.index}].preStepState">
							<option value="">无</option>
							<option value=1>成功</option>
							<option value=0 selected="selected">失败</option>
						</select>
					</c:if>
					<c:if test='${attr.preStepState==1}'>
						<select name="taskList[${status.index}].preStepState">
							<option value="">无</option>
							<option value=1 selected="selected">成功</option>
							<option value=0>失败</option>
						</select>
					</c:if>
					<c:if test='${attr.preStepState!=1 && attr.preStepState!=0}'>
						<select name="taskList[${status.index}].preStepState">
							<option value="">无</option>
							<option value=1 >成功</option>
							<option value=0>失败</option>
						</select>
					</c:if>
					<input name="taskList[${status.index}].taskId" value="${attr.taskId}" hidden='true'/>
					<input name="taskList[${status.index}].id" value="${attr.id}" hidden='true'/>
				</td>
				<td width=5%><a href='#' onclick='deltr(this)'>删除</a></td>
			</tr>
		</c:forEach>
	</table>
	<table class="formTableSwap" border="0" align="center" cellpadding="0"
		cellspacing="1">
		<tr>
			<td style="text-align:right;width: 800px;">
			<input type="button" id="but" onclick="addRow()" value="增加一条" />
				</td>
		</tr>
	</table>
</form>

</div>


</body>

<script type="text/javascript">
   $(document).ready(function(){
   	checkedInit();
	});
</script>
  
</html>
