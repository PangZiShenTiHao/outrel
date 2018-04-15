<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>修改系统版本号表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   <script src="${basePath}js/threeJs/validate/jquery.validate.min.js"></script>
   <script src="${basePath}js/threeJs/validate/messages_zh.min.js"></script>
   <script src="${basePath}js/threeJs/validate/jquery.validate.extend.handler.js"></script>
   <link rel="stylesheet" href="${basePath}js/threeJs/validate/validate.css">
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.sysversion.controller.SysVersionController">
<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 版本号 ：</th>
  <td > 
  <input type="text" class="text" id="dtoversionNum" name="versionNum" notNull="false" maxLength="20" value="${dto.versionNum}" />
  </td>
  <th> 版本名称 ：</th>
  <td > 
  <input type="text" class="text" id="dtoversionName" name="versionName" notNull="false" maxLength="40" value="${dto.versionName}" />
  </td>
</tr>

<tr>
<th> 版本内容 ：</th> 
 <td colspan="3"> 
  <textarea rows="5" cols="70"  id="dtoversionContent" name="versionContent"  notNull="false" />${dto.versionContent}</textarea>
  </td>
</tr>

<tr>
  <th> 上线时间 ：</th>
  <td > 
  <input type="text" class="text" id="dtoversionTime" name="versionTime" notNull="false" maxLength="6" value="${dto.versionTime}"  onClick="WdatePicker({maxDate:'#F{$dp.$D(\'dtoversionTime\')}'})" />
  </td>
  <th> 系统标志位 ：</th>
  <td colspan="3"> 
  <input type="text" class="text" id="dtosystemState" name="systemState" notNull="false" maxLength="25" value="${dto.systemState}" />
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
