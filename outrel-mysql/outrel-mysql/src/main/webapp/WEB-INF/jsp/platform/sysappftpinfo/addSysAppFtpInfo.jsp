<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript2.jsp" %>
   <title>新增业务系统节点FTP配置表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="addNewsFormData" name="addNewsFormData" isCheck="true" action="com.fintech.modules.boot.logmonitor.sysappftpinfo.controller.SysAppFtpInfoController">
 <table id="addNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 节点IP ：</th>
  <td > 
  <input type="text" class="text" id="dtoip" name="ip" notNull="false" maxLength="128" value="" />
  </td>
  <th> 节点FTP端口 ：</th>
  <td > 
  <input type="text" class="text" id="dtoport" name="port" notNull="false" maxLength="6" value="" />
  </td>
</tr>
<tr>
	<th> FTP用户名 ：</th>
	<td><input type="text" class="text" id="dtousername" name="username" notNull="false" maxLength="10" value="" /></td>
	<th> FTP密码 ：</th>
	<td><input type="text" class="text" id="dtopassword" name="password" notNull="false" maxLength="25" value="" /></td>
</tr>
<tr>
  <th> 错误日志目录 ：</th>
  <td > 
  <input type="text" class="text" id="dtoremoteDic" name="remoteDic" notNull="false" maxLength="150" value="" />
  </td>
  <th> 应用日志目录 ：</th>
  <td colspan="7"> 
  <input type="text" class="text" id="dtoapplogDic" name="applogDic" notNull="false" maxLength="150" value="" />
  </td>
</tr>
<tr>
  <th> 业务系统标识 ：</th>
  <td > 
  <syscode:dictionary id="dtoroleType" name="appFlag" codeType="SYSTEMFLAG" type="select"/>
  </td>
  <th></th>
  <td></td>
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
