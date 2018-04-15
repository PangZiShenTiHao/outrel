<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>删除Redis锁</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="deleteLockFormData" name="deleteLockFormData" isCheck="true" action="com.fintech.modules.boot.platform.sysconfig.controller.SysConfigController">
<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
 
<table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
    <tr>
	  <th> 模块名称 ：</th>
      <td > 
        <input type="text" class="text" id="module" name="module" notNull="false" maxLength="50" value="" />
      </td>
	  <th> 业务标示 ：</th>
	  <td> 
	    <input type="text" class="text" id="bizKey" name="bizKey" notNull="false" maxLength="50" value="" />
	  </td>
	</tr>
</table>

<!-- 保存 关闭 按钮 在 查询页面进行控制 -->  
</form>

</div>

</body>

  
</html>
