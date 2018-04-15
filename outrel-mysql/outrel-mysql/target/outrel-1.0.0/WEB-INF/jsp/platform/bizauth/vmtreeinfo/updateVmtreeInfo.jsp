<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript2.jsp" %>
   <title>修改虚拟树表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.bizauth.vmtreeinfo.controller.VmtreeInfoController">
<input type="hidden" class="text" id="dtoorgId" name="orgId" notNull="false" maxLength="11" value="${dto.orgId}" />
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 虚拟树名称 ：</th>
  <td > 
  <input type="text" class="text" id="dtoorgName" name="orgName" notNull="false" maxLength="100" onblur="$('#dtoorgName').val($('#dtoorgName').val().trim());" value="${dto.orgName}" />
  </td>
  </tr>
<tr>
  <th> 虚拟树代码 ：</th>
  <td > 
  <input type="hidden" class="text" id="dtoorgType" name="orgType"  maxLength="25" value="${dto.orgType}" />${dto.orgType}
  </td>
  </tr>
<tr>
  <th> 父节点：</th>
  <td > 
  <input type="hidden" class="text" id="dtoparentId" name="parentId" maxLength="11" value="${dto.parentId}" />
  <input type="text" class="text" id="dtoparentName" name="parentName"  value="${dto.baseExt7}" onclick="selectOrg(this);"/>
  </td>
</tr>
<tr>
  <th> 数据来源：</th>
  <td > 
  <input type="hidden" class="text" id="dtosourceType" name="sourceType" maxLength="5" value="${dto.sourceType}" />${dto.sourceType=='HR'?'HR':'自定义'}
  </td>
  </tr>
<tr>
  <input type="hidden" class="text" id="dtoendFlag" name="endFlag"  value="${dto.endFlag}" />
  <th> 创建时间 ：</th>
  <td > 
  <input type="hidden" class="text" id="dtocreateTime" name="createTime"  value="${dto.createTime}" />${dto.createTime}
  </td>
</tr>
<tr>
  <th> 创建人 ：</th>
  <td > 
  <input type="hidden" class="text" id="dtocreateBy" name="createBy"  value="${dto.createBy}" />${dto.createBy}
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
   function selectOrg(obj){
		//取到元素id
	   if($("#dtoparentId").val()=="0"){
		   jyDialog({"type":"info"}).alert("虚拟树根节点不允许修改!");
			return;	
		} 
		var fillElementId = $(obj).attr("id");
		var dialogStruct={
				'display':contextRootPath+'/vmtreeInfo/prepareExecute/toSelectTree?fillElementId='+fillElementId+'&url=/vmtreeInfo/queryTreeVMOrgByOrgType?orgType='+$("#dtoorgType").val(),
				'width':500,
				'height':450,
				'title':'选择机构',
				'isIframe':'false',
				'buttons':[]
			};
			dialogOrgSelect =jyDialog(dialogStruct);
			dialogOrgSelect.open();
		}
</script>
  
</html>
