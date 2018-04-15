<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>新增员工虚拟组织关系表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   <script type="text/javascript" src="<%=basePath%>component/jbpm/dialog/lhgdialog.js?skin=iblue"></script> 
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="addNewsFormData" name="addNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.bizauth.vmuservmorgmap.controller.VmuserVmorgMapController">
 <table id="addNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  
  <th> 组织机构ID ：</th>
  <td> 
  <input type="text" class="text" id="dtoorgId" name="orgId" readonly="true" notNull="false" maxLength="25" value="${orgId}" />
  <input type="hidden" id="orgType"  name="orgType" value="${orgType}"/>
  
  </td>
</tr>
<tr>
  
  <th> 组织机构名称 ：</th>
  <td> 
  <input type="text" class="text" id="dtoorgName" readonly="true" name="orgName" notNull="false" maxLength="25" value="${orgName}" />
  
  </td>
</tr>

<tr>
  <th> 选择用户ID：</th>
  <td > 
  <input type="text" class="text" id="dtouserId" readonly="true" name="userIds" notNull="false"  value="" onclick="selectAShowInfo()"/>
  </td>
</tr>

<tr>
  <th> 选择用户：</th>
  <td > 
  <input type="text" class="text" id="dtouserName" name="userName" notNull="false"  value=""/>
   <input type="hidden" id="dtouserId" name="userIds" notNull="true"  value="" />
  </td>
</tr>


<tr>
  <th> 虚拟树类型：</th>
  <td > 
  <input type="text" class="text" readonly="true" id="dtouserName" name="userName" notNull="false"  value="${orgType}"/>
   
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
   
   
   function selectAShowInfo(){
	   selectUser("setBrefCallFun");
	}
   
   
   function selectUser(_callFun){
	    var _titleObj = window.parent.parent.tabs.getActiveObj();
		var _title = _titleObj.title;
		var _orgType = $("#orgType").val();
		var v_url = contextRootPath+'/component/dialoguser/selectVmorgUserTree.jsp?a=a&check=true&showLowerUser=true';
		v_url = v_url+'&callFun='+_callFun+'&tabTitle='+_title+"&orgType="+_orgType+"&orgId="+${userInfo.orgId};
		 
		$.dialog({
			id:	'selectUserDialogId',
		    lock: true,
		    width:420,
		    height:680,
		    title:'选择人员信息',
		    content: 'url:'+ v_url
			}); 
	} 
</script>
  
</html>
