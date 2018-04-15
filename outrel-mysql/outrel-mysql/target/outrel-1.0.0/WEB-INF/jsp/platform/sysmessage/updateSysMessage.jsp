<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJspTaglib.jsp" %>
   <title>重发消息</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   <script src="${basePath}js/threeJs/validate/jquery.validate.min.js"></script>
   <script src="${basePath}js/threeJs/validate/messages_zh.min.js"></script>
   <script src="${basePath}js/threeJs/validate/jquery.validate.extend.handler.js"></script>
   <link rel="stylesheet" href="${basePath}js/threeJs/validate/validate.css">
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.sysmessage.controller.SysMessageController">
<input type="hidden" class="text" id="dtoid" name="msgId"  maxLength="11" value="${dto.msgId}" />
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
 
  <th>标题：</th>
  <td colspan="3"> 
  <input type="text" class="text" id="dtotitle" name="title"   value="${dto.title}" />
  </td>
 </tr>

<tr>
<th>内容：</th>
  <td colspan="3">
  <textarea id="dtobody" name="body" cols="50" rows="5" >${dto.body}</textarea>
  </td>
</tr>
<tr>
  <th>链接：</th>
  <td colspan="3"> 
  <input type="text" class="text" id="dtourl" name="url"  size="50" value="${dto.url}" />
  </td>
  
</tr>

<tr>
  <th>生效日期：</th>
  <td > 
  <input type="text" class="text" id="dtostartDate" name="startDate"   value='<fmt:formatDate value="${dto.startDate}" pattern="yyyy-MM-dd"/>' onClick="WdatePicker({maxDate:'#F{$dp.$D(\'dtoendDate\')}'})"/>
  </td>
  <th>失效日期：</th>
  <td > 
  <input type="text" class="text" id="dtoendDate" name="endDate"  value='<fmt:formatDate value="${dto.endDate}"  pattern="yyyy-MM-dd"/>' onClick="WdatePicker({minDate:'#F{$dp.$D(\'dtostartDate\')}'})" />
  </td>
</tr>
<tr>
  <th>收件人：</th>
  <td colspan="3">
  <textarea id="dtouserName" name="userName" cols="50" rows="5"  >${dto.receiverNames}</textarea>
  <input type="hidden" id="dtouserid" name="userId" value="${dto.receiverIds}" />
  </td>
</tr>
<tr>
  <th>类型：</th>
  <td > 
  <syscode:dictionary name="type" defaultValue="${dto.type}" codeType="PT_MSGTYPE" ></syscode:dictionary>
  </td>
  <th>紧急：</th>
  <td > 
  <syscode:dictionary name="urgentFlag" defaultValue="${dto.urgentFlag}" codeType="PT_MSGFLAG" ></syscode:dictionary>
  </td>
</tr>
<tr>
  <th>归属：</th>
  <td colspan="3"> 
  <syscode:dictionary name="sysFlag" defaultValue="${dto.sysFlag}" codeType="SYSTEMFLAG" type="text" ></syscode:dictionary>
  </td>
</tr>
  </table>

<!-- 保存 关闭 按钮 在 查询页面进行控制 -->  
</form>

</div>

</body>

<script type="text/javascript">
   $(document).ready(function(){
	checkform("#updateNewsFormData");//校验
	$("#dtouserName").bind("click",selectUser);
	});
</script>
  
</html>
