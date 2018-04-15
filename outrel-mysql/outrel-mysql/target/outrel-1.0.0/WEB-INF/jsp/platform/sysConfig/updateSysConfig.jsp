<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>修改系统配置表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.sysconfig.controller.SysConfigController">
<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 配置名称 ：</th>
  <td > 
  <input type="text" class="text" id="dtoconfigName" name="configName" notNull="false" maxLength="50" value="${dto.configName}" readonly/>
  </td>
  <th> 配置编码 ：</th>
  <td > 
  <input type="text" class="text" id="dtoconfigCode" name="configCode" notNull="false" maxLength="50" value="${dto.configCode}" readonly/>
  </td>
</tr>
<tr>
  <th> 配置值 ：</th>
  <td > 
  <input type="text" class="text" id="dtoconfigValue" name="configValue" notNull="false" maxLength="500" value="${dto.configValue}" />
  </td>
  <th> 类型：</th>
  <td >
  <input type='hidden'  id="dtoconfigType" name="configType" value='${dto.configType}' />
  		<c:if test="${dto.configType==0}">
  			<input class="text"  value='系统级' readonly/>
   		</c:if>
   		<c:if test="${dto.configType==1}">
  			<input class="text"  value='项目级' readonly/>
   		</c:if>
  <%-- <input type="text" class="text" notNull="false" maxLength="50" value="${dto.configType}" /> --%>
  </td>
  <%-- <th> 乐观锁 ：</th>
  <td colspan="3"> 
  <input type="text" class="text" id="dtoversion" name="version" notNull="false" maxLength="11" value="${dto.version}" />
  </td> --%>
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
