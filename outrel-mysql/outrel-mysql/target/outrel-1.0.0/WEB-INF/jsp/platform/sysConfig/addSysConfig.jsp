<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJspTaglib.jsp" %>
   <title>新增系统配置表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   <script src="${basePath}js/threeJs/validate/jquery.validate.min.js"></script>
   <script src="${basePath}js/threeJs/validate/messages_zh.min.js"></script>
   <script src="${basePath}js/threeJs/validate/jquery.validate.extend.handler.js"></script>
   <link rel="stylesheet" href="${basePath}js/threeJs/validate/validate.css">
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="addNewsFormData" name="addNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.sysconfig.controller.SysConfigController">
 <table id="addNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 配置名称 ：</th>
  <td > 
  <input type="text" class="text" id="dtoconfigName" name="configName" notNull="true" maxLength="50" value="" />
  </td>
  <th> 配置编码 ：</th>
  <td > 
  <input type="text" class="text" id="dtoconfigCode" name="configCode" notNull="true" maxLength="50" value="" onblur="queryConfigCodeIsOk(this.value)"/>
  </td>
  </tr>
<tr>
  <th> 配置值 ：</th>
  <td > 
  <input type="text" class="text" id="dtoconfigValue" name="configValue" notNull="true" maxLength="500" value="" />
  </td>

  <th> 类型 ：</th>
  <td>
   <select id="dtoconfigType" name="configType">
   		<option value=1>项目级</option>
   		<option value=0>系统级</option>
   </select>
  </td>
  <!-- <th> 乐观锁 ：</th>
  <td colspan="3"> 
  	<input type="text" class="text" id="dtoversion" name="version" notNull="false" maxLength="11" value="" />
  </td>
   -->
</tr>
  </table>

<!-- 保存 关闭 按钮 在 查询页面进行控制 -->  
</form>

</div>

</body>

<script type="text/javascript">
   $(document).ready(function(){
		checkform("#addNewsFormData");//校验
	});
</script>
  
</html>
