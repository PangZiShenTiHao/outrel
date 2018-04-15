<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript2.jsp" %>
   <title>新增虚拟树表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="addNewsFormData" name="addNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.bizauth.vmtreeinfo.controller.VmtreeInfoController">
<input type="hidden" id="dtoorgType" name="orgType"  value="${dto.orgType}" />
<input type="hidden" id="dtoparentId" name="parentId" value="${dto.parentId}" />
 <table id="addNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 数据来源：</th>
  <td > 
   <select class="text" id="dtosourceType" name="sourceType"  onchange="sourceTypeChange();"  >
   <option value="XN">自定义</option>
   <option value="HR">HR</option>
   </select>
  </td>
</tr>
<tr>
  <th> 虚拟树节点名称 ：</th>
  <td >
  <input type="hidden" class="text" id="dtoendFlag" name="endFlag"  maxLength="1" value="" />
  <input type="hidden" id="dtoorgId" name="orgId" value="" /> 
  <input type="text" class="text" id="dtoorgName" notNull="false" name="orgName"  value="" onblur="$('#dtoorgName').val($('#dtoorgName').val().trim());" onclick="selectOrg(this);"/>
  </td>
</tr>
  </table>
</form>
</div>
</body>
<script type="text/javascript">
   $(document).ready(function(){
   	checkedInit();
   	});
   function selectOrg(obj){
		//取到元素id
		$("#dtoorgId").val("");
		$("#dtoorgName").val("");
		$("#dtoendFlag").val("");
		if($("#dtosourceType").val()=="HR"){
		var fillElementId = $(obj).attr("id");
		var dialogStruct={
				'display':contextRootPath+'/vmtreeInfo/prepareExecute/toSelectTree?fillElementId='+fillElementId+'&url=/sysOrg/queryTreeSysOrg',
				'width':500,
				'height':450,
				'title':'选择机构',
				'isIframe':'false',
				'buttons':[]
			};
			dialogOrgSelect =jyDialog(dialogStruct);
			dialogOrgSelect.open();
		}
   }
</script>
  
</html>
