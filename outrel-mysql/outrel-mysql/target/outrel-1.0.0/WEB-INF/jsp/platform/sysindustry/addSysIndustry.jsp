<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>新增sys_industry</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="addNewsFormData" name="addNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.sysindustry.controller.SysIndustryController">
 <table id="addNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 行业名称/职位 ：</th>
  <td > 
  <input type="text" class="text" id="dtoindustryName" name="industryName" notNull="false" maxLength="25" value="" />
  </td>
  <th> industr ：</th>
  <td > 
  <input type="text" class="text" id="dtoindustryType" name="industryType" notNull="false" maxLength="5" value="" />
  </td>
  <th> 职位所属的行业 ：</th>
  <td colspan="7"> 
  <input type="text" class="text" id="dtoparentId" name="parentId" notNull="false" maxLength="11" value="" />
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
