<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript2.jsp" %>
   <title>修改角色表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.sysauth.sysrole.controller.SysRoleController">
<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 角色名称 ：</th>
  <td > 
  <input type="text" class="text" id="dtoroleName" name="roleName" notNull="false" maxLength="25" value="${dto.roleName}" />
  </td>
 </tr>
 <tr> 
  <th> 角色编码 ：</th>
  <td > 
  <input type="text" class="text" id="dtoroleCode" name="roleCode" notNull="false" maxLength="25" value="${dto.roleCode}" />
  </td>
 </tr>
 <tr> 
  <th> 角色类型：</th>
  <td > 
  <syscode:dictionary id="dtoroleType" name="roleType" codeType="PT_ROLETYPE" type="select" defaultValue="${dto.roleType}"/>
<%--   <input type="text" class="text" id="dtoroleType" name="roleType" notNull="false" maxLength="10" value="${dto.roleType}" /> --%>
  </td>
</tr>

 <tr> 
  <th> 角色组 : </th>
  <td >
  <select id="groupId" name = "groupId">
  </select>
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
   	
  //初始化角色组select
	   jyAjax(
				contextRootPath +'/sysRoleGroup/searchSysRoleGroup',
				'roleId=${dto.id}',
				function(msg){
					//新增成功后，
					var v_status = msg.status;
		        	if(v_status.indexOf('ok') >-1 && msg.data!=null ){
	        			$("#groupId").append('<option value="">请选择</option>');
		        		$.each(msg.data['list'], function(indx, obj){
		        			var selected = '';
		        			if( msg.data['group']!= null &&  obj.id == msg.data['group'].roleGroupId ){
		        				selected = 'selected = "selected"';
		        			}
		        			$("#groupId").append('<option value="'+obj.id+'"  '+selected+'>'+obj.roleGroupName+'</option>');
		        		});
		        	}
		  	});
	});
</script>
  
</html>
