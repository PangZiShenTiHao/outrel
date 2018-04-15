<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <script type="text/javascript" src="${basePath}js/platform/quartzJob/quartzTaskGroupDef/addTaskDef.js"></script>
   <title>新增任务分组定义表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="addNewsFormData" name="addNewsFormData" isCheck="true" action="com.fintech.modules.boot.quartzJob.quartzTaskGroupDef.controller.QuartzTaskGroupDefController">
 <table id="addNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 分组编号 ：</th>
  <td > 
  <input class="text" name="groupId" notNull="false" maxLength="25" value="" />
  </td>
  <th> 分组名称 ：</th>
  <td > 
  <input class="text" name="groupName" notNull="false" maxLength="20" value="" />
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
  <input type='radio' name="autoExec" value="1" checked/>是
  <input type='radio' name="autoExec" value="0" />否
  </td>
  <th> 执行时机：</th>
  <td >
  	<select name='dealChance' >
  		<option value='day'>日任务</option>
  		<option value='year'>年任务</option>
  	</select>
  </td>
  <th> 执行时间：</th>
  <td > 
  <input type="text" id="runTime" name="runTime" onfocus="WdatePicker({skin:'whyGreen',dateFmt:'HH:mm:ss'})" class="Wdate"/><!-- <input class="text" name="remark" notNull="false" maxLength="250" value="" /> -->
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
