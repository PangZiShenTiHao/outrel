<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>新增定时任务执行轨迹表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="addNewsFormData" name="addNewsFormData" isCheck="true" action="com.fintech.modules.boot.quartzJob.quartzTaskHis.controller.QuartzTaskHisController">
 <table id="addNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 批次号码 ：</th>
  <td > 
  <input type="text" class="text" id="dtobatchNo" name="batchNo" notNull="false" maxLength="25" value="" />
  </td>
  <th> 分组编码 ：</th>
  <td > 
  <input type="text" class="text" id="dtogroupId" name="groupId" notNull="false" maxLength="25" value="" />
  </td>
  <th> 执行任务的主线 ：</th>
  <td > 
  <input type="text" class="text" id="dtothreadId" name="threadId" notNull="false" maxLength="25" value="" />
  </td>
</tr>
<tr>
  <th> 任务编号 ：</th>
  <td > 
  <input type="text" class="text" id="dtotaskId" name="taskId" notNull="false" maxLength="10" value="" />
  </td>
  <th> 任务类名（实体 ：</th>
  <td > 
  <input type="text" class="text" id="dtobeanId" name="beanId" notNull="false" maxLength="50" value="" />
  </td>
  <th> 任务执行返回结 ：</th>
  <td > 
  <input type="text" class="text" id="dtotaskState" name="taskState" notNull="false" maxLength="1" value="" />
  </td>
</tr>
<tr>
  <th> 任务执行开始时 ：</th>
  <td > 
  <input type="text" class="text" id="dtotaskStartTime" name="taskStartTime" notNull="false" maxLength="6" value="" />
  </td>
  <th> 任务执行结束时 ：</th>
  <td > 
  <input type="text" class="text" id="dtotaskEndTime" name="taskEndTime" notNull="false" maxLength="6" value="" />
  </td>
  <th> 任务执行中信息 ：</th>
  <td > 
  <input type="text" class="text" id="dtotaskInfo" name="taskInfo" notNull="false" maxLength="2000" value="" />
  </td>
</tr>
<tr>
  <th> 任务执行失败， ：</th>
  <td colspan="5"> 
  <input type="text" class="text" id="dtoerrorInfo" name="errorInfo" notNull="false" maxLength="250" value="" />
  </td>
</tr>
  </table>

<!-- 保存 关闭 按钮 在 查询页面进行控制 -->  
</form>

</div>

</body>

<script type="text/javascript">
   $(document).ready(function(){
   	checkedInit();
	});
</script>
  
</html>
