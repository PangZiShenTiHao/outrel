<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>新增业务模型属性配置</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="addNewsFormData" name="addNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.drools.sysrulemodelattrconfig.controller.SysRuleModelAttrConfigController">
 <table id="addNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 实体类属性_主 ：</th>
  <td > 
  <input type="text" class="text" id="dtosysId" name="sysId" notNull="false" maxLength="25" value="" />
  </td>
  <th> 序号 ：</th>
  <td > 
  <input type="text" class="text" id="dtosequence" name="sequence" notNull="false" maxLength="11" value="" />
  </td>
  <th> 前括号 ：</th>
  <td > 
  <input type="text" class="text" id="dtopreBrackets" name="preBrackets" notNull="false" maxLength="10" value="" />
  </td>
</tr>
<tr>
  <th> 条件属性 ：</th>
  <td > 
  <input type="text" class="text" id="dtoconditionAttrEn" name="conditionAttrEn" notNull="false" maxLength="25" value="" />
  </td>
  <th> 条件属性中文 ：</th>
  <td > 
  <input type="text" class="text" id="dtoconditionAttrCh" name="conditionAttrCh" notNull="false" maxLength="25" value="" />
  </td>
  <th> 运算符：加 减 ：</th>
  <td > 
  <input type="text" class="text" id="dtooperator" name="operator" notNull="false" maxLength="10" value="" />
  </td>
</tr>
<tr>
  <th> 后括号 ：</th>
  <td > 
  <input type="text" class="text" id="dtoafterBrackets" name="afterBrackets" notNull="false" maxLength="10" value="" />
  </td>
  <th> 手工设置 ：</th>
  <td > 
  <input type="text" class="text" id="dtomanualConfig" name="manualConfig" notNull="false" maxLength="100" value="" />
  </td>
  <th> 编译结果 ：</th>
  <td colspan="7"> 
  <input type="text" class="text" id="dtocompilationResult" name="compilationResult" notNull="false" maxLength="100" value="" />
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
