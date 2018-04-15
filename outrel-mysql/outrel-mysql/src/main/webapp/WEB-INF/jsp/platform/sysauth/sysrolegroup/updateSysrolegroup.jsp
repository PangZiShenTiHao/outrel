<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJspTaglib.jsp" %>
   <title>修改角色组</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.sysrolegroup.controller.SysRoleGroupController">
<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
  <input type="hidden" class="text" id="dtoroleGroupType" name="roleGroupType" notNull="false" maxLength="0" value="1" />
    <input type="hidden" class="text" id="dtoappId" name="appId" notNull="false" maxLength="11" value="1" />
  
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 角色组名称 ：</th>
  <td > 
  <input type="text" class="text" id="dtoroleGroupName" name="roleGroupName" notNull="false" maxLength="50" value="${dto.roleGroupName}" />
  </td>
  <th> 角色组编码 ：</th>
  <td > 
  <input type="text" class="text" id="dtoroleGroupCode" name="roleGroupCode" notNull="false" maxLength="25" value="${dto.roleGroupCode}" />
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
