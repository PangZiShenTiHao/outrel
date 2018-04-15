<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>业务虚拟树快速调岗</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" >
<input type="hidden" class="text" id="dtocurOrgId" name="curOrgId" maxLength="11" value="" />
<input type="hidden" class="text" id="dtoorgId" name="orgId" maxLength="11" value="${dto.orgId}" />
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 虚拟树名称 ：</th>
  <td >${dto.orgName}</td>
  <th> 虚拟树代码 ：</th>
  <td > 
  <input type="hidden" class="text" id="dtoorgType" name="orgType"  maxLength="25" value="${dto.orgType}" />${dto.orgType}
  </td>
</tr>
<tr>
  <th> 员工编号：</th>
  <td colspan="3"> 
  <input type="text" class="text" id="dtousername" name="username" maxLength="11" value="" notNull="false" />
  </td>
  <!-- <th> 现归属岗位：</th>
  <td >
  <input type="hidden" class="text" id="dtooldorgId" name="oldorgId" maxLength="50" value="" />
  <input type="text" class="text" id="dtooldorgName" name="oldorgName" maxLength="50" value="" />
  </td> -->
  </tr>
<tr>
  <th> 新岗位：</th>
  <td colspan="3"> 
  <input type="text" class="text" id="dtoneworgName" name="neworgName" maxLength="50" value="" notNull="false"/>
  <input type="hidden" class="text" id="dtoneworgId" name="neworgId" maxLength="15" value="" />
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
  	
  	var orgtype = $("#dtoorgType").val();
  	var curOrgId = $("#dtocurOrgId").val();
  	var orgurl=contextRootPath+'/vmtreeInfo/queryTreeVMOrgByOrgType?orgType='+orgtype+'&orgId='+curOrgId;
  	$("#dtoneworgName").treeMenu(
  		{"treeUrl":orgurl
  		,"treeType":"radio","disabledLink": "true"
  		,"treeIdObj":$("#dtoneworgId")
  		,"width":"200"
  		,"height":"300"});
});

</script>
  
</html>
