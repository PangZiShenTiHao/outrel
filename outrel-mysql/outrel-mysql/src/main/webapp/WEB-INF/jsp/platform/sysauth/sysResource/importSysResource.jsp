<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>导入资源</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="addNewsFormData" name="addNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.sysauth.sysResource.controller.SysResourceController">
 <table id="addNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
   <th> 名称：</th>
  <td > 
  <input type="text" size="40" class="text" id="resoureName" name="resoureName" notNull="false" maxLength="200" value="" />
  </td>	
</tr>
<tr>
  <th> URL地址：</th>
  <td > 
  <input type="text" size="60" class="text" id="resoureUrl" name="resoureUrl" notNull="false" maxLength="200" value="" />
  <br/>
  <p style="color:red;">注：输入项目名称后的相对地址即可</p>
  </td>
</tr>
  </table>
<!-- hidden -->
<input type="hidden" class="text" id="dtoparentId" name="parentId" notNull="false"  value="${param.pid}" />
<input type="hidden" class="text" id="dtoparentIds" name="parentIds" notNull="false"  value="${param.pids}" />
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
