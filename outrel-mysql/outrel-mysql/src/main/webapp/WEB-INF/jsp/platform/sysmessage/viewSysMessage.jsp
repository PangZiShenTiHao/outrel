<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>查看消息</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   <style>
   	th{
   		height:26px;
   	}
   </style>
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.sysmessage.controller.SysMessageController">
<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.msgId}" />
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  
  <th> 标题 ：</th>
  <td colspan="3">${dto.title}</td>
 </tr>
 <tr>
  <th> 内容 ：</th>
  <td colspan="3">${dto.body}</td>
</tr>
<tr>
  <th> 链接 ：</th>
  <td >${dto.url}</td>
  <th> 创建日期 ：</th>
  <td ><fmt:formatDate value="${dto.createDate}"/></td>
 </tr>
 <tr>
  <th> 生效日期 ：</th>
  <td ><fmt:formatDate value="${dto.startDate}"/></td>
  <th> 失效日期 ：</th>
  <td ><fmt:formatDate value="${dto.endDate}"/></td>
</tr>
<tr>
  <th> 收件人 ：</th>
  <td colspan="3">${dto.receiverNames}</td>
 
</tr>
<tr>
  <th> 状态 ：</th>
  <td ><syscode:dictionary name="status" defaultValue="${dto.status}" codeType="PT_MSGSTATUS"  type="text"></syscode:dictionary></td>
  <th> 发布者 ：</th>
  <td >${dto.publisherNameShow}</td>
</tr>
<tr>
  <th> 类型  ：</th>
  <td ><syscode:dictionary name="type" defaultValue="${dto.type}" codeType="PT_MSGTYPE" type="text"></syscode:dictionary></td>
  <th> 紧急 ：</th>
  <td ><syscode:dictionary name="urgentFlag" defaultValue="${dto.urgentFlag}" codeType="PT_MSGFLAG" type="text"></syscode:dictionary></td>
</tr>
<tr>
  <th> 归属 ：</th>
  <td colspan="3"><syscode:dictionary name="sysFlag" defaultValue="${dto.sysFlag}" codeType="SYSTEMFLAG" type="text"></syscode:dictionary></td>
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
