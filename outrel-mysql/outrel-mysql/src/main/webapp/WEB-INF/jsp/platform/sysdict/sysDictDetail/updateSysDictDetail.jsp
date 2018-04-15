<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript2.jsp" %>
   <title>修改数据字典明细表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.sysdict.sysdictdetail.controller.SysDictDetailController">
<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
  <input type="hidden"id="dtodictId" name="dictId" value="${dto.dictId}" />
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 数据名称 ：</th>
  <td > 
  <input type="text" class="text" id="dtodictDetailName" name="dictDetailName" notNull="false" maxLength="100" value="${dto.dictDetailName}"/>
  </td>
  </tr>
<tr>
  <th> 数据值 ：</th>
  <td > 
  <input type="text" class="text" id="dtodictDetailValue" name="dictDetailValue" notNull="false" maxLength="50" value="${dto.dictDetailValue}" />
  </td>
</tr>
<tr>
  <th> 排序 ：</th>
  <td > 
  <input type="text" class="text" id="dtoorderBy" name="orderBy" notNull="false" maxLength="25" value="${dto.orderBy}" readonly/>
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
