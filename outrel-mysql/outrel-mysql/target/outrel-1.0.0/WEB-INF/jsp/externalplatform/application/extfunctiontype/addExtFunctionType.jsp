<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript2.jsp" %>
   <title>新增外联平台功能类型表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="addNewsFormData" name="addNewsFormData" isCheck="true" action="com.jy.modules.externalplatform.application.extfunctiontype.controller.ExtFunctionTypeController">
   <input type="hidden" class="text" id="parentId" name="parentId" notNull="false" readonly="readonly" maxLength="50" value="${param.pid}"/>
   <input type="hidden" class="text" id="sysCode" name="sysCode"  value="${sysCode}"/>
   <input type="hidden" class="text" id="typeLevel" name="typeLevel" notNull="false" value="${dto.typeLevel + 1}"/>
 <table id="addNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 功能类型唯一编码：</th>
  <td > 
  <input type="text" class="text" id="dtofuncTypeCode" name="funcTypeCode" notNull="false" maxLength="25" value="" onblur="checkUnique(this,'&funcTypeCode='+$(this).val());"/>
  </td>
  <th> 功能类型中文描述 ：</th>
  <td > 
  <input type="text" class="text" id="dtofuncTypeName" name="funcTypeName" notNull="false" maxLength="50" value="" />
  </td>
</tr>
<tr>
	<th> 功能类型：</th>
 	<td>
 	<input type="text" id="funcType" name="funcType" value="${dto.funcTypeCode}" readonly="readonly"/>
	
  	</td>
 	<th> 排序 ：</th>
  	<td> 
  	<input type="text" class="text" id="showOrder" name="showOrder" notNull="false" checktype= "number" maxLength="25" value="" />
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
