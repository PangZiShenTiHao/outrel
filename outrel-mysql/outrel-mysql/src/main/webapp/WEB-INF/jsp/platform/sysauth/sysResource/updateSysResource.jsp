<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>修改资源管理表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.sysauth.sysResource.controller.SysResourceController">
<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
<input type="hidden" class="text" id="dtoversion" name="version" notNull="false" maxLength="11" value="${dto.version}" />
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 名称 ：</th>
  <td > 
  <input type="text" class="text" id="dtoresoureName" name="resoureName" notNull="false" maxLength="100" value="${dto.resoureName}" />
  </td>
 </tr>
 <tr> 
  <th> 类型：</th>
  <td > 
  <select class="text" id="dtoresoureType" name="resoureType" notNull="true">
  
 		 <option value="module" <c:if test="${param.type=='module'}">selected</c:if> >module</option>
 		 <option value="url" <c:if test="${param.type=='url'}">selected</c:if>>url</option>
 		 <option value="button" <c:if test="${param.type=='button'}">selected</c:if>>button</option>
  	
  </select>
  </td>
</tr>
<tr>
  <th> 权限标识 ：</th>
  <td> 
  <input type="text" class="text" id="dtopermission" name="permission"  maxLength="100" value="${dto.permission}" />
  </td>
 </tr>
 <tr> 
  <th> URL地址 ：</th>
  <td> 
  <input type="text" class="text" id="dtoresoureUrl" size="50" name="resoureUrl"  maxLength="400" value="${dto.resoureUrl}" />
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
   	//初始化类型列表
   	var resoureType = '${dto.resoureType}';
   	$('#dtoresoureType').val(resoureType);
	});
</script>
  
</html>
