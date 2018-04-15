<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript2.jsp" %>
   <title>新增提供商配置表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="addNewsFormData" name="addNewsFormData" isCheck="true" action="com.jy.modules.externalplatform.application.extproviderinfo.controller.ExtProviderInfoController">
 <table id="addNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 提供商名称 ：</th>
  <td > 
  <input type="text" class="text" id="dtoproviderName" name="providerName" notNull="false" maxLength="50" value="" />
  </td>
<tr>
</tr>
  <th> 提供商编码 ：</th>
  <td > 
  <input type="text" class="text" id="dtoproviderCode" name="providerCode" notNull="false" maxLength="50" value="" onblur="checkUnique(this,'&providerCode='+$(this).val());"/>
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

