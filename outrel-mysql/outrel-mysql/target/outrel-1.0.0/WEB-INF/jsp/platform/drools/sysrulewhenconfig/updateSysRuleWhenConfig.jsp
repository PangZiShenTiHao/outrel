<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>修改规则条件设置</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.drools.sysrulewhenconfig.controller.SysRuleWhenConfigController">
<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 编码 ：</th>
  <td > 
  <input type="text" class="text" id="dtoruleCode" name="ruleCode" notNull="false" maxLength="25" value="${dto.ruleCode}" />
  </td>
  <th> 中文规则名 ：</th>
  <td > 
  <input type="text" class="text" id="dtoruleNameCh" name="ruleNameCh" notNull="false" maxLength="25" value="${dto.ruleNameCh}" />
  </td>
  <th> 英文规则名 ：</th>
  <td > 
  <input type="text" class="text" id="dtoruleNameEn" name="ruleNameEn" notNull="false" maxLength="25" value="${dto.ruleNameEn}" />
  </td>
</tr>
<tr>
  <th> 序号 ：</th>
  <td > 
  <input type="text" class="text" id="dtosequence" name="sequence" notNull="false" maxLength="11" value="${dto.sequence}" />
  </td>
  <th> 前括号 ：</th>
  <td > 
  <input type="text" class="text" id="dtopreBrackets" name="preBrackets" notNull="false" maxLength="10" value="${dto.preBrackets}" />
  </td>
  <th> 条件属性 ：</th>
  <td > 
  <input type="text" class="text" id="dtoconditionAttrEn" name="conditionAttrEn" notNull="false" maxLength="25" value="${dto.conditionAttrEn}" />
  </td>
</tr>
<tr>
  <th> 条件属性中文 ：</th>
  <td > 
  <input type="text" class="text" id="dtoconditionAttrCh" name="conditionAttrCh" notNull="false" maxLength="25" value="${dto.conditionAttrCh}" />
  </td>
  <th> 运算符：加 减 ：</th>
  <td > 
  <input type="text" class="text" id="dtooperator" name="operator" notNull="false" maxLength="10" value="${dto.operator}" />
  </td>
  <th> 比较值 ：</th>
  <td > 
  <input type="text" class="text" id="dtocompareValueEn" name="compareValueEn" notNull="false" maxLength="25" value="${dto.compareValueEn}" />
  </td>
</tr>
<tr>
  <th> 比较值中文 ：</th>
  <td > 
  <input type="text" class="text" id="dtocompareValueCh" name="compareValueCh" notNull="false" maxLength="25" value="${dto.compareValueCh}" />
  </td>
  <th> 后括号 ：</th>
  <td > 
  <input type="text" class="text" id="dtoafterBrackets" name="afterBrackets" notNull="false" maxLength="10" value="${dto.afterBrackets}" />
  </td>
  <th> 逻辑操作符 ：</th>
  <td > 
  <input type="text" class="text" id="dtologicalOperator" name="logicalOperator" notNull="false" maxLength="10" value="${dto.logicalOperator}" />
  </td>
</tr>
<tr>
  <th> 手输规则 ：</th>
  <td > 
  <input type="text" class="text" id="dtomanualRule" name="manualRule" notNull="false" maxLength="100" value="${dto.manualRule}" />
  </td>
  <th> 编译结果 ：</th>
  <td > 
  <input type="text" class="text" id="dtocompilationResult" name="compilationResult" notNull="false" maxLength="100" value="${dto.compilationResult}" />
  </td>
  <th> 创建人 ：</th>
  <td > 
  <input type="text" class="text" id="dtocreateUser" name="createUser" notNull="false" maxLength="25" value="${dto.createUser}" />
  </td>
</tr>
<tr>
  <th> 创建时间 ：</th>
  <td > 
  <input type="text" class="text" id="dtocreateDate" name="createDate" notNull="false" maxLength="4" value="${dto.createDate}" />
  </td>
  <th> 修改人 ：</th>
  <td > 
  <input type="text" class="text" id="dtoupdateUser" name="updateUser" notNull="false" maxLength="25" value="${dto.updateUser}" />
  </td>
  <th> 修改时间 ：</th>
  <td > 
  <input type="text" class="text" id="dtoupdateDate" name="updateDate" notNull="false" maxLength="4" value="${dto.updateDate}" />
  </td>
</tr>
<tr>
  <th> 版本号 ：</th>
  <td > 
  <input type="text" class="text" id="dtoversionNum" name="versionNum" notNull="false" maxLength="10" value="${dto.versionNum}" />
  </td>
  <th> 此版本是否修改 ：</th>
  <td > 
  <input type="text" class="text" id="dtonewVersionIsUpdate" name="newVersionIsUpdate" notNull="false" maxLength="11" value="${dto.newVersionIsUpdate}" />
  </td>
  <th> 规则表的规则编 ：</th>
  <td colspan=""> 
  <input type="text" class="text" id="dtoparentCode" name="parentCode" notNull="false" maxLength="25" value="${dto.parentCode}" />
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
