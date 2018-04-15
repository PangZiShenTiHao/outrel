<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>新增角色用户表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
   <script type="text/javascript">
   
   
    var dialogOrgSelect = {}//此变量必须：弹出框的对象，关闭弹出框时需要调用
    
    var receiveData = function(datas){//此方法为 弹出框树形控件选择后的数据接收方法，固定必须
    
    jyDialog({"type":"info"}).alert(datas);
    	//datas 当弹出的页面中发生确定数据选择时，返回此数据,此处可自定义数据的处理
    	//datas 数据的格式为json对象数组 [{ID:’’,NAME:’’},{ID:’’,NAME:’’},......]
    }
   
   	function selectUser(){//弹出树形选择界面的方法 不做限制，只要能弹出选择框就行
		var dialogStruct={
				/* 'display':contextRootPath+'/component/system/treeSysOrgSelect.jsp?check=true', *///可选参数check=true则支持复选   可选参数orgId 支持只显示orgId 的节点以及他的子节点
				'display':contextRootPath+'/sysRoleUser/prepareExecute?operateData=selectUser',
				'width':500,
				'height':500,
				'title':'选择机构'
			};
			dialogOrgSelect =jyDialog(dialogStruct);
			dialogOrgSelect.open();
	}
   
   </script>
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="addNewsFormData" name="addNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.sysauth.sysroleuser.controller.SysRoleUserController">
 <table id="addNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <!-- <th> 角色ID ：</th> -->
  <td > 
  <input type="hidden" class="text" id="dtoroleId" name="roleId" notNull="false" value="<%=request.getParameter("roleId") %>" />
  </td>
  <th> 用户ID或者机：</th>
  <td > 
  <input type="text" class="text" id="dtotargetId" name="targetId" notNull="false" maxLength="11" value=""  onclick="selectUser(this);"/>
  </td>
  <th> 系统ID，备用 ：</th>
  <td > 
  <input type="text" class="text" id="dtoappId" name="appId" notNull="false" maxLength="11" value="" />
  </td>
</tr>
<tr>
  <th> user用户类 ：</th>
  <td > 
  	<select class="text" id="dtotargetType" name="targetType" notNull="false" maxLength="25" value="">
	<option value="user" selected="selected">user</option>
	<option value="org">org</option>
  	</select>
  </td>
  <th> 乐观锁 ：</th>
  <td colspan="3"> 
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
