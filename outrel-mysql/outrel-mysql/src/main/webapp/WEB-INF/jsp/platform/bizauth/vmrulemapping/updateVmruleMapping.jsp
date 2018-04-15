<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>修改映射表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.bizauth.vmrulemapping.controller.VmruleMappingController">
<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 类型（1：人对 ：</th>
  <td > 
  <input type="text" class="text" id="dtomapType" name="mapType" notNull="false" maxLength="1" value="${dto.mapType}" />
  </td>
  <th> 关联KEY信息 ：</th>
  <td > 
  <input type="text" class="text" id="dtomapKey" name="mapKey" notNull="false" maxLength="10" value="${dto.mapKey}" />
  </td>
  <th> 关联VALUE ：</th>
  <td > 
  <input type="text" class="text" id="dtomapValue" name="mapValue" notNull="false" maxLength="10" value="${dto.mapValue}" />
  </td>
</tr>
<tr>
  <th> 虚拟树代码 ：</th>
  <td > 
  <input type="text" class="text" id="dtoorgType" name="orgType" notNull="false" maxLength="5" value="${dto.orgType}" />
  </td>
  <th> 创建时间 ：</th>
  <td > 
  <input type="text" class="text" id="dtocreateTime" name="createTime" notNull="false" maxLength="6" value="${dto.createTime}" />
  </td>
  <th> 创建人 ：</th>
  <td colspan=""> 
  <input type="text" class="text" id="dtocreateBy" name="createBy" notNull="false" maxLength="11" value="${dto.createBy}" />
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
