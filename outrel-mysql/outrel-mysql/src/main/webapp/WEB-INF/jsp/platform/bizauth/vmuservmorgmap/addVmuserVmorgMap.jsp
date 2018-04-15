<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>新增员工虚拟组织关系表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="addNewsFormData" name="addNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.bizauth.vmuservmorgmap.controller.VmuserVmorgMapController">
 <table id="addNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  
  <th> 组织机构 ：</th>
  <td colspan="2"> 
  <input type="text" class="text" id="dtoorgId" name="orgId" notNull="false" maxLength="25" value="" />
  <input type="hidden" id="orgtype"  name="orgType" value="${orgtype}"/>
  </td>

  <th> 用户名 ：</th>
  <td > 
  <input type="text" class="text" id="dtouserId" name="userId" notNull="false" maxLength="11" value="" />
  </td>
  <th> 虚拟树类型 ：</th>
  <td colspan="2"> 
  <input type="text" class="text" id="dtoorgType" name="orgType" notNull="false" maxLength="25" value="" />
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
