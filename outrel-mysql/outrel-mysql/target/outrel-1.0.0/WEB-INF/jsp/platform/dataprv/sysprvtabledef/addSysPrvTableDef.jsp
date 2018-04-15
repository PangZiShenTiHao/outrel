<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJspTaglib.jsp" %>
   <title>新增数据权限表定义</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="addNewsFormData" name="addNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.dataprv.sysprvtabledef.controller.SysPrvTableDefController">
 <table id="addNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 表名称 ：</th>
  <td > <!-- 
  <input type="text" class="text" id="dtotableName" name="tableName" notNull="false" maxLength="25" value="" /> -->
 	<select id="dtotableName" name="tableName" >
		<c:forEach var='item' items='${tables}' varStatus='status'>
			<option>${item}</option>
		</c:forEach>
 	</select>
  </td>
</tr>
<tr>
  <th> 描述 ：</th>
  <td colspan="3"> 
  <input type="text" class="text" id="dtotableDesc" name="tableDesc" notNull="false" maxLength="250" value="" />
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
