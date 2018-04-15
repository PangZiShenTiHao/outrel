<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>新增业务模型属性</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="addNewsFormData" name="addNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.drools.sysrulemodelattr.controller.SysRuleModelAttrController">
 <table id="addNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 实体类英文名 ：</th>
  <td > 
  <input type="text" class="text" id="dtomodelEnName" name="modelEnName" notNull="false" maxLength="25" value="" />
  </td>
  <th> 中文名 ：</th>
  <td > 
  <input type="text" class="text" id="dtochName" name="chName" notNull="false" maxLength="25" value="" />
  </td>
  <th> 英文名 ：</th>
  <td > 
  <input type="text" class="text" id="dtoenName" name="enName" notNull="false" maxLength="25" value="" />
  </td>
</tr>
<tr>
  <th> 数据类型 ：</th>
  <td > 
  <input type="text" class="text" id="dtodataType" name="dataType" notNull="false" maxLength="10" value="" />
  </td>
  <th> 长度 ：</th>
  <td > 
  <input type="text" class="text" id="dtodataLong" name="dataLong" notNull="false" maxLength="10" value="" />
  </td>
  <th> 引用字典编码 ：</th>
  <td > 
  <input type="text" class="text" id="dtodictCode" name="dictCode" notNull="false" maxLength="10" value="" />
  </td>
</tr>
<tr>
  <th> 备注 ：</th>
  <td colspan="5"> 
  <input type="text" class="text" id="dtoremark" name="remark" notNull="false" maxLength="100" value="" />
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
