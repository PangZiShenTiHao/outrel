<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>${dto.resoureName}详细信息</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<style type="text/css">
	td{height:26px;}
</style>
</head>
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 名称：</th>
  <td >${dto.resoureName}</td>
  <th> 类型：</th>
  <td >${dto.resoureType}</td>
</tr>
<tr>
  <th> 权限标识：</th>
  <td >${dto.permission}</td>
  <th> URL地址：</th>
  <td >${dto.resoureUrl}</td>
</tr>
  </table>
<!-- 关闭 按钮 在 查询页面进行控制 -->  
</div>
</body>
</html>
