<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>新增资源管理表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="addNewsFormData" name="addNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.sysauth.sysResource.controller.SysResourceController">
 <table id="addNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 名称 ：</th>
  <td > 
  <input type="text" class="text" id="dtoresoureName" name="resoureName" notNull="false" maxLength="100" value="" />
  </td>
 </tr>
 <tr> 
  <th> 类型：</th>
  <td > <!-- 需根据选择父节点的类型，判断显示不同的option ,如父节点为module，则只能在选button和URL -->
  <select class="text" id="dtoresoureType" name="resoureType" notNull="true">
    <c:if test="${param.type=='root'}">
 		 <option value="module">module</option>
 		 <option value="url">url</option>
  	</c:if>
    <c:if test="${param.type=='module'}">
   		<option value="module">module</option>
   		<option value="url">url</option>
	  	<option value="button">button</option>
  	</c:if>
  	 <c:if test="${param.type=='url'}">
	  	<option value="button">button</option>
  	</c:if>
  </select>
  </td>
</tr>
<tr>
  <th> 权限标识 ：</th>
  <td> 
  <input type="text" class="text" id="dtopermission" name="permission"  maxLength="200" value="" />
  </td>
 </tr>
 <tr> 
  <th> URL地址 ：</th>
  <td> 
  <input type="text" class="text" id="dtoresoureUrl" name="resoureUrl"  size="50" maxLength="400" value="" />
  </td>
  <!-- <th> 父ID ：</th>
  <td > 
  <input type="text" class="text" id="dtoparentId" name="parentId" notNull="false" maxLength="25" value="" />
  </td>
  <th> 父ID串，以/ ：</th>
  <td > 
  <input type="text" class="text" id="dtoparentIds" name="parentIds" notNull="false" maxLength="250" value="" />
  </td> -->
</tr>
<!-- <tr>
  <th> 应用ID，备用 ：</th>
  <td > 
  <input type="text" class="text" id="dtoappId" name="appId" notNull="false" maxLength="11" value="" />
  </td>
  <th> 乐观锁 ：</th>
  <td colspan="3"> 
  <input type="text" class="text" id="dtoversion" name="version" notNull="false" maxLength="11" value="" />
  </td>
</tr> -->
  </table>

<!-- hidden -->
<input type="hidden" class="text" id="dtoparentId" name="parentId"   value="${param.pid}" />
<input type="hidden" class="text" id="dtoparentIds" name="parentIds"  value="${param.pids}" />

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
