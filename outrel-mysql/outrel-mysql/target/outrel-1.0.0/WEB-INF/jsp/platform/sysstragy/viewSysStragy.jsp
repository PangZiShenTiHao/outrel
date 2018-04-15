<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>安全策略配置</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="addNewsFormData" name="addNewsFormData" isCheck="true" enctype="multipart/form-data" action="com.fintech.modules.boot.platform.systemplate.controller.SysTemplateController">
 <table id="addNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 登录错误次数 ：</th>
  <td > 
  ${dto.pwdMaxFailure}
  (达到错误次数上限,账号锁定)
  </td>
  <th> 密码有效期：</th>
  <td > 
  ${dto.pwdpwdMaxAge}
  (秒)
  </td>

<tr>
  <th> 密码自动解锁 ：</th>
  <td > 
  ${dto.pwdLockoutDuration}
  (秒)
  </td>
   <th>密码复杂度 ：</th>
  <td > 
  ${dto.pwdQuality}
  (正则表达式)
  </td>
</tr>
<tr>
  <th> 登录错误记录 ：</th>
  <td > 
  ${dto.pwdFailureCountInterval}
      秒后清除
  </td>
   <th> 初始密码必须修改 ：</th>
  <td > 
  <c:if test="${dto.pwdMustChange == 'TRUE'}">是</c:if>
  <c:if test="${dto.pwdMustChange == null || dto.pwdMustChange == ''}">否</c:if>
  </td>
</tr>
  </table>
<div align="center" class="expandToolbar">
	<button onclick="saveConfig()" class="ui-button ui-widget ui-state-default ui-corner-all " role="button"><span class="ui-button-text" style="padding:5px 10px 5px 10px;">关闭</span></button>
</div>
</form>
</div>
</body>

<script type="text/javascript">
   function saveConfig(){
	   $("#addNewsFormData").submit();
	   
   }
   
</script>
  
</html>
