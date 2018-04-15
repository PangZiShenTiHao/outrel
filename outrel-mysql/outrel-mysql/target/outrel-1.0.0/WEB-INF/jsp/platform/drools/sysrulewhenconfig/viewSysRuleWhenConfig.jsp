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
  <td >${dto.ruleCode}</td>
  <th> 中文规则名 ：</th>
  <td >${dto.ruleNameCh}</td>
  <th> 英文规则名 ：</th>
  <td >${dto.ruleNameEn}</td>
</tr>
<tr>
  <th> 序号 ：</th>
  <td >${dto.sequence}</td>
  <th> 前括号 ：</th>
  <td >${dto.preBrackets}</td>
  <th> 条件属性 ：</th>
  <td >${dto.conditionAttrEn}</td>
</tr>
<tr>
  <th> 条件属性中文 ：</th>
  <td >${dto.conditionAttrCh}</td>
  <th> 运算符：加 减 ：</th>
  <td >${dto.operator}</td>
  <th> 比较值 ：</th>
  <td >${dto.compareValueEn}</td>
</tr>
<tr>
  <th> 比较值中文 ：</th>
  <td >${dto.compareValueCh}</td>
  <th> 后括号 ：</th>
  <td >${dto.afterBrackets}</td>
  <th> 逻辑操作符 ：</th>
  <td >${dto.logicalOperator}</td>
</tr>
<tr>
  <th> 手输规则 ：</th>
  <td >${dto.manualRule}</td>
  <th> 编译结果 ：</th>
  <td >${dto.compilationResult}</td>
  <th> 创建人 ：</th>
  <td >${dto.createUser}</td>
</tr>
<tr>
  <th> 创建时间 ：</th>
  <td >${dto.createDate}</td>
  <th> 修改人 ：</th>
  <td >${dto.updateUser}</td>
  <th> 修改时间 ：</th>
  <td >${dto.updateDate}</td>
</tr>
<tr>
  <th> 版本号 ：</th>
  <td >${dto.versionNum}</td>
  <th> 此版本是否修改 ：</th>
  <td >${dto.newVersionIsUpdate}</td>
  <th> 规则表的规则编 ：</th>
  <td colspan="">${dto.parentCode}</td>
</tr>
  </table>

<!-- 关闭 按钮 在 查询页面进行控制 -->  
</form>

</div>

</body>

<script type="text/javascript">
   $(document).ready(function(){
   		
	});
</script>
  
</html>
