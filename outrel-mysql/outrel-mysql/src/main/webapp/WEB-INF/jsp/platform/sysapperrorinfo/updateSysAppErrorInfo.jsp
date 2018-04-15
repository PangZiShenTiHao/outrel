<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>修改业务系统节点错误日志</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.sysapperrorinfo.controller.SysAppErrorInfoController">
<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 节点名称（IP ：</th>
  <td > 
  <input type="text" class="text" id="dtonodeName" name="nodeName" notNull="false" maxLength="64" value="${dto.nodeName}" />
  </td>
  <th> 业务系统标识 ：</th>
  <td > 
  <input type="text" class="text" id="dtoappFlag" name="appFlag" notNull="false" maxLength="5" value="${dto.appFlag}" />
  </td>
  <th> 日志生成时间 ：</th>
  <td > 
  <input type="text" class="text" id="dtocreateTime" name="createTime" notNull="false" maxLength="12" value="${dto.createTime}" />
  </td>
</tr>
<tr>
  <th> 内容 ：</th>
  <td colspan="5"> 
  <input type="text" class="text" id="dtoconcent" name="concent" notNull="false" maxLength="2000" value="${dto.concent}" />
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
