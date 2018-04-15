<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJspTaglib.jsp" %>
   <title>新增分组任务实例表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="addNewsFormData" name="addNewsFormData" isCheck="true" action="com.fintech.modules.boot.quartzJob.quartzTaskGroupInstance.controller.QuartzTaskGroupInstanceController">
 <table id="addNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 分组处理编号 ：</th>
  <td > 
  <input type="text" class="text" id="dtogroupId" name="groupId" notNull="false" maxLength="25" value="" />
  </td>
  <th> 分组处理名称 ：</th>
  <td > 
  <input type="text" class="text" id="dtogroupName" name="groupName" notNull="false" maxLength="20" value="" />
  </td>
  <th> 批次号码 ：</th>
  <td > 
  <input type="text" class="text" id="dtobatchNo" name="batchNo" notNull="false" maxLength="20" value="" />
  </td>
</tr>
<tr>
  <th> 任务编号 ：</th>
  <td > 
  <input type="text" class="text" id="dtotaskId" name="taskId" notNull="false" maxLength="10" value="" />
  </td>
  <th> 任务描述 ：</th>
  <td > 
  <input type="text" class="text" id="dtotaskName" name="taskName" notNull="false" maxLength="50" value="" />
  </td>
  <th> 任务类名（实体 ：</th>
  <td > 
  <input type="text" class="text" id="dtobeanId" name="beanId" notNull="false" maxLength="50" value="" />
  </td>
</tr>
<tr>
  <th> 执行步骤(顺序 ：</th>
  <td > 
  <input type="text" class="text" id="dtodealStep" name="dealStep" notNull="false" maxLength="11" value="" />
  </td>
  <th> 前提步骤（任务 ：</th>
  <td > 
  <input type="text" class="text" id="dtopreStep" name="preStep" notNull="false" maxLength="10" value="" />
  </td>
  <th> 前置步骤返回状 ：</th>
  <td > 
  <input type="text" class="text" id="dtopreStepState" name="preStepState" notNull="false" maxLength="1" value="" />
  </td>
</tr>
<tr>
  <th> 是否自动执行（ ：</th>
  <td > 
  <input type="text" class="text" id="dtoautoExec" name="autoExec" notNull="false" maxLength="1" value="" />
  </td>
  <th> 执行时机（da ：</th>
  <td > 
  <input type="text" class="text" id="dtodealChance" name="dealChance" notNull="false" maxLength="5" value="" />
  </td>
  <th> 任务实例执行状 ：</th>
  <td > 
  <input type="text" class="text" id="dtotaskInsState" name="taskInsState" notNull="false" maxLength="1" value="" />
  </td>
</tr>
<tr>
  <th> 失败后，断点执 ：</th>
  <td > 
  <input type="text" class="text" id="dtobugContinue" name="bugContinue" notNull="false" maxLength="1" value="" />
  </td>
  <th> 任务是否执行完 ：</th>
  <td > 
  <input type="text" class="text" id="dtoisEnd" name="isEnd" notNull="false" maxLength="1" value="" />
  </td>
  <th> 新增时间 ：</th>
  <td > 
  <input type="text" class="text" id="dtocreated" name="created" notNull="false" maxLength="4" value="" />
  </td>
</tr>
<tr>
  <th> 备注 ：</th>
  <td colspan="5"> 
  <input type="text" class="text" id="dtoremark" name="remark" notNull="false" maxLength="250" value="" />
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
