<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript2.jsp" %>
   <title>新增指标模型</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="addNewsFormData" name="addNewsFormData" isCheck="true" action="com.jy.modules.externalplatform.application.extindexmoduletype.controller.ExtIndexModuleTypeController">
  <input type="hidden" class="text" id="parentId" name="parentId" notNull="false" readonly="readonly" maxLength="50" value="${param.pid}"/>
  <input type="hidden" class="text" id="typeLevel" name="typeLevel" notNull="false" value="${dto.typeLevel + 1}"/>
 <table id="addNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >

<tr>
  <th> 模块类型唯一编码 ：</th>
  <td > 
  <input type="text" class="text" id="moduleTypeCode" name="moduleTypeCode" notNull="false" maxLength="50" value="" />
  </td>
  <th> 模块类型中文描述 ：</th>
  <td >
  <input type="text" class="text" id="moduleTypeName" name="moduleTypeName" notNull="false" maxLength="50" value="" />
  </td>
  </tr>
<tr>
<tr>
	<th> 模块类型：</th>
 	<td>
 	  <input type="text" id="moduleType" name="moduleType" value="${dto.moduleTypeCode}" />
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
