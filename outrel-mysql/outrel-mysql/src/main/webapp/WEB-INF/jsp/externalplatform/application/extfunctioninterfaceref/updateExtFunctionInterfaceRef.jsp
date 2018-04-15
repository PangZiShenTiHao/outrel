<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>修改功能接口映射表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="com.jy.modules.externalplatform.application.extfunctioninterfaceref.controller.ExtFunctionInterfaceRefController">
<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 功能编码 ：</th>
  <td > 
  <input type="text" class="text" id="dtofuncTypeCode" name="funcTypeCode" notNull="false" maxLength="11" value="${dto.funcTypeCode}" />
  </td>
  <th> 接口编码 ：</th>
  <td > 
  <input type="text" class="text" id="dtointerfaceNo" name="interfaceNo" notNull="false" maxLength="10" value="${dto.interfaceNo}" />
  </td>
  <th>CREATE_TIME：</th>
  <td > 
  <input type="text" class="text" id="dtocreateTime" name="createTime" notNull="false" maxLength="6" value="${dto.createTime}" />
  </td>
</tr>
<tr>
  <th>CREATE_BY：</th>
  <td > 
  <input type="text" class="text" id="dtocreateBy" name="createBy" notNull="false" maxLength="10" value="${dto.createBy}" />
  </td>
  <th>PRIORITY：</th>
  <td colspan="3"> 
  <input type="text" class="text" id="dtopriority" name="priority" notNull="false" maxLength="10" value="${dto.priority}" />
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
