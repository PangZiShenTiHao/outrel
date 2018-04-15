<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript2.jsp" %>
   <title>新增外联平台系统管理表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="addNewsFormData" name="addNewsFormData" isCheck="true" action="com.jy.modules.externalplatform.application.extsysmanagement.controller.ExtSysManagementController">
 <table id="addNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 系统编号 ：</th>
  <td > 
  <input type="text" class="text" id="dtosysCode" name="sysCode" notNull="false" maxLength="60" value="" onblur="checkUnique(this,'&sysCode='+$(this).val());"/>
  </td>
  <th> 系统名称 ：</th>
  <td colspan="3"> 
  <input type="text" class="text" id="dtosysName" name="sysName" notNull="false" maxLength="60" value="" />
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
