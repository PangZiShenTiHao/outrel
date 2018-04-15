<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>修改SYS_USER_MSG_RELATION</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.sysusermsgrelation.controller.SysUserMsgRelationController">
<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 主键 ：</th>
  <td > 
  <input type="text" class="text" id="dtorelId" name="relId" notNull="false" maxLength="11" value="${dto.relId}" />
  </td>
  <th> 信息状态：0： ：</th>
  <td > 
  <input type="text" class="text" id="dtorelStatus" name="relStatus" notNull="false" maxLength="0" value="${dto.relStatus}" />
  </td>
  <th> 归属者ID ：</th>
  <td > 
  <input type="text" class="text" id="dtouserId" name="userId" notNull="false" maxLength="5" value="${dto.userId}" />
  </td>
</tr>
<tr>
  <th> 用户读取状态： ：</th>
  <td > 
  <input type="text" class="text" id="dtoreadFlag" name="readFlag" notNull="false" maxLength="0" value="${dto.readFlag}" />
  </td>
  <th> 消息ID ：</th>
  <td colspan="3"> 
  <input type="text" class="text" id="dtomsgId" name="msgId" notNull="false" maxLength="11" value="${dto.msgId}" />
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
