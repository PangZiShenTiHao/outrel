<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>执行Shell脚本</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="execShellFormData" name="execShellFormData" isCheck="true" action="com.fintech.modules.boot.platform.shell.SysShellController">
 <table id="execShellTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
	<tr>
	  <th> shell脚本命令 ：</th>
	  <td> 
	  	<input type="text" class="text" id="shellCmd" name="shellCmd" notNull="true" style="width:350px" value="" />
	  </td>
	</tr>
	<tr>
		<td></td>
		<td> 
		例如：sh  /home/jyapp/delete_log.sh
		</td>
	</tr>
	<tr>
	  <th> shell脚本参数（没有不填） ：</th>
	  <td > 
	  	<input type="text" class="text" id="shellParam" name="shellParam" notNull="true" style="width:350px" value="" />
	  </td>
	</tr>
  </table>
</form>

</div>

</body>

  
</html>
