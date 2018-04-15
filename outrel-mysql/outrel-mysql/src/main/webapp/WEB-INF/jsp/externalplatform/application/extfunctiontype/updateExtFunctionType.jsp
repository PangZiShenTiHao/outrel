<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript2.jsp" %>
   <title>修改外联平台功能类型表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="com.jy.modules.externalplatform.application.extfunctiontype.controller.ExtFunctionTypeController">
<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
<input type="hidden" class="text" id="dtosysCode" name="sysCode"  value="${sysCode}"/>
<input type="hidden" class="text" id="dtoparentId" name="parentId" notNull="false" maxLength="11" value="${dto.parentId}" />
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
 <tr>
  <th> 功能类型唯一编码 ：</th>
  <td > 
  <input type="text" class="text" id="dtofuncTypeCode" name="funcTypeCode" notNull="true" maxLength="50" value="${dto.funcTypeCode}" readonly="readonly" />
  </td>
  <th> 附件类型中文描述 ：</th>
  <td > 
  <input type="text" class="text" id="dtofuncTypeName" name="funcTypeName" notNull="true" maxLength="50" value="${dto.funcTypeName}" />
  </td>
  </tr>
<tr>
  <th> 功能类型：</th>
  <td > 
  <input type="text" class="text" id="dtofuncType" name="funcType" notNull="true" maxLength="50" value="${dto.funcType}" readonly="readonly" />
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
  <th></th>
  <td><input type="hidden" name="validateState" id="validateState" value="${dto.validateState}"/></td>
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
