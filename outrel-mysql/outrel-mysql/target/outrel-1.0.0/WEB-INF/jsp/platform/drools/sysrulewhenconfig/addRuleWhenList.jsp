<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<br />
<form id="addData" name="addData" isCheck="true">
	<input type='hidden' name='ruleCode' value='${param.code }'/>
	<input type='hidden' name='ruleType' value='${param.ruleType }'>
	<input type='hidden' name='thenConfig.ruleCode' value='${param.code }'/>
	<table id="tab" class="formTableSwap" border="0" align="center"
		cellpadding="0" cellspacing="0">
		<tr align='center'>
			<td width=5%>序号</td>
			<td width=5%>输入</td>
			<td width=15%>条件属性</td>
			<td width=10%>运算符</td>
			<td width=15%>比较值</td>
			<td width=5%>输入</td>
			<td width=5%>逻辑操作</td>
			<td width=5%>操作</td>
			<!--   <td>手输规则</td> -->
		</tr>
		<c:forEach items="${whenDtos}" var="attr" varStatus="status">
			<tr id="${status.index+1}">
				<td><input name="whenConfigs[${status.index}].sequence"
					value="${attr.sequence }"  style='width:20%;'/> <input type="hidden"
					name="whenConfigs[${status.index}].id" value="${attr.id }">
				</td>
				<td><input name="whenConfigs[${status.index}].preBrackets"
					value='${attr.preBrackets }' /></td>
				<td><input readOnly="true" id="whenConfigs[${status.index}].conditionAttrCh"
					name="whenConfigs[${status.index}].conditionAttrCh"
					value="${attr.conditionAttrCh}" ondblclick="selectModelList(this);"/> 
					<input type="hidden"
					id="whenConfigs[${status.index}].conditionAttrEn"
					name="whenConfigs[${status.index}].conditionAttrEn"
					value="${attr.conditionAttrEn }" />
					</td>
				<td><select name="whenConfigs[${status.index}].operator">
						<option value="" >请选择</option>
						<option value="=="
							<c:if test="${attr.operator=='=='}">selected</c:if>>等于</option>
						<option value="!="
							<c:if test="${attr.operator=='!='}">selected</c:if>>不等于</option>
						<option value=">"
							<c:if test="${attr.operator=='>'}">selected</c:if>>大于</option>
						<option value=">="
							<c:if test="${attr.operator=='>='}">selected</c:if>>大于等于</option>
						<option value="<"
							<c:if test="${attr.operator=='<'}">selected</c:if>>小于</option>
						<option value="<="
							<c:if test="${attr.operator=='<='}">selected</c:if>>小于等于</option>
						<option value="contains"
							<c:if test="${attr.operator=='contains'}">selected</c:if>>包含</option>
						<option value="not contains"
							<c:if test="${attr.operator=='not contains'}">selected</c:if>>不包含</option>
						<option value="matches"
							<c:if test="${attr.operator=='matches'}">selected</c:if>>正则匹配</option>
						<option value="not matches"
							<c:if test="${attr.operator=='not matches'}">selected</c:if>>正则不匹配</option>
				</select></td>
				<td><input readOnly="true" name="whenConfigs[${status.index}].compareValueCh" id="whenConfigs[${status.index}].compareValueCh"
					value="${attr.compareValueCh}"  ondblclick="selctAffterList(this);"> <input type="hidden"
					name="whenConfigs[${status.index}].compareValueEn" id="whenConfigs[${status.index}].compareValueEn"
					value="${attr.compareValueEn}"></td>
				<td><input name="whenConfigs[${status.index}].afterBrackets"
					value='${attr.afterBrackets }' /></td>
				<td><select name="whenConfigs[${status.index}].logicalOperator">
						<option value="" >请选择</option>
						<option value="&&"
							<c:if test="${attr.logicalOperator=='&&'}">selected</c:if>>并且</option>
						<option value="||"
							<c:if test="${attr.logicalOperator=='||'}">selected</c:if>>或者</option>
				</select>
				</td>
				<td><a href="#" onclick="deltr(${status.index+1})">删除</a></td>
			</tr>
		</c:forEach>
	</table>
	<table class="formTableSwap" border="0" align="center" cellpadding="0"
		cellspacing="1">
		<tr>
			<td style="text-align:right;width: 800px;"><input type="button"
				id="but" onclick="addRow()" value="增加一条" /></td>
		</tr>
	</table>
		<c:if test="${param.ruleType==4 }">
	
	<input type='hidden' name='thenConfig.id' value='${thenDto.id }'/>
	<table id="addNewsTableId" class="formTableSwap" border="0"
		align="center" cellpadding="0" cellspacing="1">
		<tr>
			<td align='left'>执行代码 ：</td>
		</tr>
		<tr>
			<td><textarea rows="" cols="" style="width:100%;height:150px;"
					id="thenConfig.excutionCode" name="thenConfig.excutionCode" >${thenDto.excutionCode }</textarea></td>
		</tr>
		<tr>
			<td align='left'>备注 ：</td>
		</tr>
		<tr>
			<td><textarea rows="" cols="" style="width:100%;height:50px;"
					id="thenConfig.remark" name="thenConfig.remark" >${thenDto.remark }</textarea></td>
		</tr>
	</table>
	</c:if>
	<center>
		<input type="button" id="butSave" onclick="saveConfig();" value="保存" />
	</center>
</form>
