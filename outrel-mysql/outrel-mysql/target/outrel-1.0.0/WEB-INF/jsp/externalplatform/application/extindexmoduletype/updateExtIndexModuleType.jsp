<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript2.jsp" %>
   <title>修改指标模型</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="com.jy.modules.externalplatform.application.extindexmoduletype.controller.ExtIndexModuleTypeController">
<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
<input type="hidden" class="text" id="dtoparentId" name="parentId" notNull="false" maxLength="11" value="${dto.parentId}" />
<table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 模块类型唯一编码 ：</th>
  <td > 
  <input type="text" class="text" id="dtomoduleTypeCode" name="moduleTypeCode" notNull="true" maxLength="50" value="${dto.moduleTypeCode}" readonly="readonly" />
  </td>
  <th> 模块类型中文描述 ：</th>
  <td > 
  <input type="text" class="text" id="dtomoduleTypeName" name="moduleTypeName" notNull="true" maxLength="50" value="${dto.moduleTypeName}" />
  </td>
  </tr>
<tr>
  <th> 模块类型：</th>
  <td > 
  <input type="text" class="text" id="dtomoduleType" name="moduleType" notNull="true" maxLength="50" value="${dto.moduleType}" readonly="readonly" />
  </td>
  <th> 类型级别 ：</th>
  <td > 
  <input type="text" class="text" id="dtotypeLevel" name="typeLevel" notNull="false" maxLength="25" value="${dto.typeLevel}" readonly="readonly" />
  </td>
</tr>
<tr>
  <th> 排序 ：</th>
  <td > 
  <input type="text" class="text" id="dtoshowOrder" name="showOrder" notNull="false" maxLength="25" value="${dto.showOrder}" />
  </td>
  <th> 是否有效 ：</th>
  	<td colspan="6"> 
  		<select name="validateState" id="validateState">
	  		<option value="0" <c:if test="${dto.validateState eq '0' }">selected="selected" </c:if> >无效</option>
	  		<option value="1" <c:if test="${dto.validateState eq '1' }">selected="selected" </c:if> >有效</option>
  		<select>
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
