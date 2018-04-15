<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>修改业务系统节点FTP配置表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="com.fintech.modules.boot.logmonitor.sysappftpinfo.controller.SysAppFtpInfoController">
<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 节点IP ：</th>
  <td >${dto.ip}</td>
  <th> 节点FTP端口 ：</th>
  <td >${dto.port}</td>
  
</tr>
<tr>
<th> FTP用户名 ：</th>
  <td >${dto.username}</td>
  <th> FTP密码 ：</th>
  <td >${dto.password}</td>
</tr>
<tr>
  <th> 业务系统标识 ：</th>
  <td ><syscode:dictionary id="dtoroleType" name="appFlag" codeType="SYSTEMFLAG" type="text" defaultValue="${dto.appFlag}"/></td>
  <th> 业务系统日志目 ：</th>
  <td colspan="">${dto.remoteDic}</td>
</tr>
  </table>

<!-- 关闭 按钮 在 查询页面进行控制 -->  
</form>

</div>

</body>

<script type="text/javascript">
   $(document).ready(function(){
   		
	});
</script>
  
</html>
