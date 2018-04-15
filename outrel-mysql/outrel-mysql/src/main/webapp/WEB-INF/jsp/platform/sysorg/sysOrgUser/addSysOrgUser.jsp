<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>新增SYS_ORG_USER</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="addNewsFormData" name="addNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.sysorg.sysorguser.controller.SysOrgUserController">
 <table id="addNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 用户ID ：</th>
  <td > 
  <input type="text" class="text" id="dtouserId" name="userId" notNull="false" maxLength="11" value="" />
  </td>
  <th> 岗位ID ：</th>
  <td > 
  <input type="text" class="text" id="dtopositionId" name="positionId" notNull="false" maxLength="11" value="" />
  </td>
  <th> 是否主部门，1 ：</th>
  <td > 
  <input type="text" class="text" id="dtoisMainOrg" name="isMainOrg" notNull="false" maxLength="0" value="" />
  </td>
</tr>
<tr>
  <th> 乐观锁 ：</th>
  <td colspan="5"> 
  <input type="text" class="text" id="dtoversion" name="version" notNull="false" maxLength="11" value="" />
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
