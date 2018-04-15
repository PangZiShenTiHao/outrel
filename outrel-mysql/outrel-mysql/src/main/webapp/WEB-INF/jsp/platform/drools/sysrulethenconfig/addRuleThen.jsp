<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<br />
<form id="addThenData" name="addThenData" isCheck="true" >
	<input type='hidden' name='ruleCode' value='${param.code }'/>
	<input type='hidden' name='id' value='${thenDto.id }'/>
	<table id="addNewsTableId" class="formTableSwap" border="0"
		align="center" cellpadding="0" cellspacing="1">
		<tr>
			<td align='left'>执行代码 ：</td>
		</tr>
		<tr>
			<td><textarea rows="" cols="" style="width:100%;height:150px;"
					id="excutionCode" name="excutionCode" >${thenDto.excutionCode }</textarea></td>
		</tr>
		<tr>
			<td align='left'>备注 ：</td>
		</tr>
		<tr>
			<td><textarea rows="" cols="" style="width:100%;height:50px;"
					id="remark" name="remark" >${thenDto.remark }</textarea></td>
		</tr>
	</table>
	<center>
		<input type="button" id="butSave" onclick="saveThenConfig();" value="保存" />
	</center>
	<!-- 保存 关闭 按钮 在 查询页面进行控制 -->
</form>
