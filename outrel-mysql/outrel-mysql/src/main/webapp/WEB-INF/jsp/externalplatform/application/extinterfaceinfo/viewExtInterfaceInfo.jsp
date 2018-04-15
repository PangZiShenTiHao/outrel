<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>修改接口配置表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="com.jy.modules.externalplatform.application.extinterfaceinfo.controller.ExtInterfaceInfoController">
<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 接口名称 ：</th>
  <td >${dto.interfaceName}</td>
  <th> 接口编码 ：</th>
  <td >${dto.interfaceNo}</td>
</tr>
<tr>
  <th> 接口URL ：</th>
  <td >${dto.interfaceUrl}</td>
  <th> 接口描述 ：</th>
  <td >${dto.interfaceDes}</td>
</tr>
<tr>
  <th> 交易编码 ：</th>
  <td >${dto.interfaceCode}</td>
  <th> 业务编码 ：</th>
  <td >${dto.businessCode}</td>
</tr>
<tr>
  <th> 接口调用方式  ：</th>
  <td >${dto.interfaceSendType}</td>
  <th> 接口参数类型  ：</th>
  <td >${dto.interfaceParamsType}</td>
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
