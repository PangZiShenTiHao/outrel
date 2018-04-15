<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript2.jsp" %>
   <title>新增错误级别设定表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="addNewsFormData" name="addNewsFormData" isCheck="true" action="com.fintech.modules.boot.logmonitor.sysapplevelsetup.controller.SysAppLevelSetupController">
 <table id="addNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 级别类型 ：</th>
  <td > 
  <syscode:dictionary id="dtologLevel" name="logLevel" codeType="LOG_LEVEL" type="select"/>
  </td>
  <th> 邮件提醒标识 ：</th>
  <td> 
  <syscode:dictionary id="dtoemailFlag" name="emailFlag" codeType="YESNO" type="select"/>
  </td>
</tr>
<tr>
  <th> 展示详细信息标识 ：</th>
  <td> 
  <syscode:dictionary id="dtoshowDetailFlag" name="showDetailFlag" codeType="YESNO" type="select"/>
  </td>
  <th> 短信提醒标识 ：</th>
  <td> 
  <syscode:dictionary id="dtosmsFlag" name="smsFlag" codeType="YESNO" type="select"/>
  </td>
</tr>
<tr>
  <th> 提醒频率：</th>
  <td> 
  <input type="text" class="text" id="dtorate" name="rate" notNull="false" maxLength="50" width="6" value="0" /><syscode:dictionary extendProperty="width='6'" id="dtorateUnit" name="rateUnit" codeType="LOG_RATE_UNIT" type="select" defaultValue="1"/>
  </td>
  <th> 关键字 ：</th>
  <td> 
  <input type="text" class="text" id="dtokeyWord" name="keyWord" notNull="false" maxLength="100" value="" />
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
