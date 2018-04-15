<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJspTaglib.jsp" %>
   <title>新增角色表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <script src="${basePath}js/threeJs/validate/jquery.validate.min.js"></script>
   <script src="${basePath}js/threeJs/validate/messages_zh.min.js"></script>
   <script src="${basePath}js/threeJs/validate/jquery.validate.extend.handler.js"></script>
   <link rel="stylesheet" href="${basePath}js/threeJs/validate/validate.css">
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="addNewsFormData" name="addNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.sysauth.sysrole.controller.SysRoleController">
 <table id="addNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 角色名称<em>*</em> :</th>
  <td > 
  <input type="text" class="text" id="dtoroleName" name="roleName" notNull="false" maxLength="25" value="" />
  </td>
</tr>
<tr>
  <th> 角色编码<em>*</em> :</th>
  <td > 
  <input type="text" class="text" id="dtoroleCode" name="roleCode" notNull="false" maxLength="25" value="" />
  </td>
 </tr>
 <tr> 
  <th> 角色类型<em>*</em> : </th>
  <td > <!-- 
  <input type="text" class="text" id="dtoroleType" name="roleType" notNull="false" maxLength="10" value="" /> -->
  <syscode:dictionary id="dtoroleType" name="roleType" codeType="PT_ROLETYPE" type="select"/>
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
	   checkform("#addNewsFormData");//校验
		//初始化角色组select
	   jyAjax(
				contextRootPath +'/sysRoleGroup/searchSysRoleGroup',
				'',
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
