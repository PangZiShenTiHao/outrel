<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>修改调用接口日志表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
	<div id="formPageSwap">
	  <br/>
		<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="com.jy.modules.externalplatform.record.extinterfacelog.controller.ExtInterfaceLogController">
			 <input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
			 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
				<tr>
				  <th> 机构码 ：</th>
				  <td >${dto.reqOrgCode}</td>
				</tr>
				<tr>
				  <th> 产品码 ：</th>
				  <td >${dto.reqProCode}</td>
				</tr>
				<tr>
				  <th> 功能点 ：</th>
				  <td >${dto.reqFuncCode}</td>
				</tr>
				<tr>
				  <th> 接口编码 ：</th>
				  <td >${dto.interfaceNo}</td>
				</tr>
				<tr>
				  <th> 证件号  ：</th>
				  <td >${dto.reqCardId}</td>
				</tr>
				<tr>
				  <th> 返回信息 ：</th>
				  <td >${dto.retMsg}</td>
				</tr>
				<tr>
				  <th> 返回时间 ：</th>
				  <td ><fmt:formatDate value="${dto.retTime}" pattern="yyyy-MM-dd HH:mm:ss"/></td>
				</tr>
				<tr>
				  <th> 请求报文体 ：</th>
				  <td >${dto.reqBody}</td>
				</tr>
				<tr>
				  <th> 返回报文体 ：</th>
				  <td >${dto.retBody}</td>
				</tr>
				<tr>
				  <th> 创建时间 ：</th>
				  <td><fmt:formatDate value="${dto.createTime}" pattern="yyyy-MM-dd HH:mm:ss"/></td>
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
