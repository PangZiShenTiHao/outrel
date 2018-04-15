<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib  uri ="http://java.sun.com/jsp/jstl/functions" prefix="fn"%> 
<%@ include file="/common/StaticJavascript2.jsp"%>
<body>
<br/>
	<table cellpadding="10" width="100%" border="0">
		<tbody>
			<tr>
				<td style="text-align: center">
					<h1><syscode:dictionary  name="ruleConfType" codeType="EXT_RULE_CONF_TYPE" type="radio" defaultValue="${ruleConfType}"></syscode:dictionary></h1>
				</td>
			</tr>
		</tbody>
	</table> 
	<div id="filedCompareDiv" class="expandContent" style="${ruleConfType eq '1' ? '' : 'display: none;'};margin-top: 0px;border-top-width: 0px;padding-top: 0px; padding-bottom: 0px;">
	   <form id="addFiledCompareData" name="addFiledCompareData" isCheck="true">
	    <input type='hidden' name='ruleCode' value='${param.code}'/>
	    <input type='hidden' name='ruleType' value='${param.ruleType}'>
	    <input type='hidden' name='thenConfig.ruleCode' value='${param.code}'/>
	    <table id="tab1" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="0">
			<!-- 定义 规则配置表头信息  -->
			<tr align='center'>
				<td width=5%>序号</td>
				<td width=15%>输入</td>
				<td width=15%>字段1</td>
				<td width=5%>关系运算符</td>
				<td width=15%>字段2</td>
				<td width=15%>输入</td>
				<td width=5%>逻辑操作</td>
				<td width=5%>操作</td>
			</tr>
			<c:forEach items="${whenDtos}" var="attr" varStatus="status1">
				<tr id="${status1.index+1}">
					<td>
					    <input name="whenConfigs[${status1.index}].sequence" value="${attr.sequence }"  style='width:20%;'/> 
					    <input type="hidden" name="whenConfigs[${status1.index}].id" value="${attr.id }">
					</td>
					<td><input name="whenConfigs[${status1.index}].preBrackets" value='${attr.preBrackets }' /></td>
					<td>
					    <input id="whenConfigs[${status1.index}].conditionAttrCh" name="whenConfigs[${status1.index}].conditionAttrCh"  readOnly="true" value="${attr.conditionAttrCh}" onclick="selectModelList(this);" style="width:80%"/> 
						<input type="hidden" id="whenConfigs[${status1.index}].conditionAttrEn" name="whenConfigs[${status1.index}].conditionAttrEn" value="${fn:escapeXml(attr.conditionAttrEn)}" />
					</td>
					<td> 
					    <syscode:dictionary  codeType="EXT_OPERATOR_STYPE" name="whenConfigs[${status1.index}].operator"   type="select" defaultValue="${attr.operator}"></syscode:dictionary>
					 </td>
					 <td>
					     <input id="whenConfigs[${status1.index}].compareValueCh" name="whenConfigs[${status1.index}].compareValueCh"  readOnly="true" value="${attr.compareValueCh}"  onclick="selectModelList(this);" style="width:80%"/> 
					     <input type="hidden" id="whenConfigs[${status1.index}].compareValueEn" name="whenConfigs[${status1.index}].compareValueEn" value="${fn:escapeXml(attr.compareValueEn)}">
					 </td>
					<td><input name="whenConfigs[${status1.index}].afterBrackets"
						value='${attr.afterBrackets }' /></td>
					<td>
					    <syscode:dictionary  codeType="EXT_LOGICAL_OPERATOR" name="whenConfigs[${status1.index}].logicalOperator"   type="select" defaultValue="${attr.logicalOperator}"></syscode:dictionary>
					</td>
					<td><a href="#" onclick="deltr(${status1.index+1})">删除</a></td>
				</tr>
			</c:forEach>
	     </table>
	     <table class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1">
			<tr>
				<td style="text-align:right;width: 800px;"><input type="button" id="but2" onclick="addTab1Row()" value="增加一条" /></td>
			</tr>
         </table>
         <center>
		     <input type="button" id="butSave" onclick="saveConfig('addFiledCompareData');" value="保存" />
	      </center>
        </form>
	 </div> 
	 <div id="filedOperatorDiv" class="expandContent" style="${ruleConfType eq '2' ? '' : 'display: none;'};margin-top: 0px;border-top-width: 0px;padding-top: 0px; padding-bottom: 0px;">
		<form id="addFiledOperatorData" name="addFiledOperatorData" isCheck="true">
		 <input type='hidden' name='ruleCode' value='${param.code}'/>
	     <input type='hidden' name='ruleType' value='${param.ruleType}'>
	     <input type='hidden' name='thenConfig.ruleCode' value='${param.code}'/>
		 <table id="tab2" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="0">
				<!-- 定义 规则配置表头信息  -->
				<tr align='center'>
					<td width=5%>序号</td>
					<td width=15%>字段1</td>
					<td width=5%>算术运算符</td>
					<td width=15%>字段2</td>
					<td width=15%>输入</td>
					<td width=5%>关系运算符</td>
					<td width=15%>值</td>
					<td width=5%>逻辑操作</td>
					<td width=5%>操作</td>
				</tr>
				<c:forEach items="${whenDtos}" var="attr" varStatus="status2">
					<tr id="${status2.index+1}">
						<td>
						    <input id="whenConfigs_02[${status2.index}].sequence" name="whenConfigs[${status2.index}].sequence" value="${attr.sequence }"  style='width:20%;'/> 
						    <input type="hidden" id="whenConfigs_02[${status2.index}].id" name="whenConfigs[${status2.index}].id" value="${attr.id }">
						</td>
						<td>
						    <input id="whenConfigs_02[${status2.index}].conditionAttrCh" name="whenConfigs[${status2.index}].conditionAttrCh"  readOnly="true" value="${attr.conditionAttrCh}" onclick="selectModelList(this);" style="width:80%"/> 
							<input type="hidden" id="whenConfigs_02[${status2.index}].conditionAttrEn" name="whenConfigs[${status2.index}].conditionAttrEn" value="${fn:escapeXml(attr.conditionAttrEn)}" />
						</td>
						<td><syscode:dictionary  codeType="EXT_ARITHMETIC_OPERATOR" name="whenConfigs[${status2.index}].arithmeticOperator"   type="select" defaultValue="${attr.arithmeticOperator}"></syscode:dictionary></td>
						<td>
						     <input id="whenConfigs_02[${status2.index}].compareValueCh" name="whenConfigs[${status2.index}].compareValueCh"  readOnly="true" value="${attr.compareValueCh}"  onclick="selectModelList(this);" style="width:80%"/> 
						     <input type="hidden" id="whenConfigs_02[${status2.index}].compareValueEn" name="whenConfigs[${status2.index}].compareValueEn" value="${fn:escapeXml(attr.compareValueEn)}">
						</td>
						<td><input id="whenConfigs_02[${status2.index}].preBrackets" name="whenConfigs[${status2.index}].preBrackets" value='${attr.preBrackets }' /></td>
						<td><syscode:dictionary  codeType="EXT_OPERATOR_STYPE" name="whenConfigs[${status2.index}].operator"   type="select" defaultValue="${attr.operator}"></syscode:dictionary></td>
						<td><input id="whenConfigs_02[${status2.index}].afterBrackets" name="whenConfigs[${status2.index}].afterBrackets" value='${attr.afterBrackets }' /></td>
						<td>
						    <syscode:dictionary  codeType="EXT_LOGICAL_OPERATOR" name="whenConfigs[${status2.index}].logicalOperator"   type="select" defaultValue="${attr.logicalOperator}"></syscode:dictionary>
						</td>
						<td><a href="#" onclick="deltr(${status2.index+1})">删除</a></td>
					</tr>
				</c:forEach>
			</table>
			<table class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1">
		      <tr>
			    <td style="text-align:right;width: 800px;"><input type="button" id="but2" onclick="addTab2Row()" value="增加一条" /></td>
		      </tr>
            </table>
            <center>
		     <input type="button" id="butSave" onclick="saveConfig('addFiledOperatorData');" value="保存" />
	        </center>
	     </form>
	 </div> 
</form>
<script type="text/javascript">
$(document).ready(function(){
	$("input[name='ruleConfType']").each(function(){
		$(this).bind("click", function(){
			if($(this).val() == "1") {
				$("#filedCompareDiv").show();
				$("#filedOperatorDiv").hide();
			}else if($(this).val() == "2"){
				$("#filedOperatorDiv").show();
				$("#filedCompareDiv").hide();
			}
		});
	});   
});
</script>
</body>