<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/component/jbpm/jbpmCommon.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>新增工作流角色映射表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
     <script type="text/javascript" src="${basePath1}component/jbpm/dialog/lhgdialog.min.js?skin=iblue"></script>
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="addNewsFormData" name="addNewsFormData" isCheck="true" action="com.jy.modules.jbpm4.controller.Jbpm4RoleMappingController">
 <table id="addNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 角色 ：</th>
  <td > 
    <input type="hidden"  id="dtoroleCode" name="roleCode" notNull="false" maxLength="25" value="" />
    <input type="text" class="text" id="dtoroleCodeName" name="roleCodeName" notNull="false" maxLength="25" value="" onclick="selectRole('setCallFunRole','N')"/>
  </td>
  <th> 映射角色 ：</th>
  <td colspan="3"> 
  <input type="hidden" id="dtomappingRoleCode" name="mappingRoleCode" notNull="false" maxLength="25" value="" />
  <input type="text" class="text" id="dtomappingRoleCodeName" name="mappingRoleCodeName" notNull="false" maxLength="25" value="" onclick="selectRole('setCallFunMappingRole','Y')"/>
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
   
   function selectRole(_callFun,checkFlag){
		var _titleObj = window.parent.parent.tabs.getActiveObj();
		var _title = _titleObj.title;
		var v_url = contextRootPath+'/component/dialoguser/selectRoles.jsp?a=a';
		v_url = v_url+'&callFun='+_callFun+'&tabTitle='+_title;
		if('Y' == checkFlag){
			v_url = v_url+'&check=true';
		}
		$.dialog({
			id:	'selectUserDialogId',
		    lock: true,
		    width:480,
		    height:680,
		    title:'选择关联信息',
		    content: 'url:'+ v_url
			}); 
	}
   

   function setCallFunRole(v_ids,v_names){
   	debugger;
   	$("#dtoroleCodeName").val(v_names);
   	$("#dtoroleCode").val(v_ids);
   }

   function setCallFunMappingRole(v_ids,v_names){
   	$("#dtomappingRoleCodeName").val(v_names);
   	$("#dtomappingRoleCode").val(v_ids);
   }
</script>
  
</html>
