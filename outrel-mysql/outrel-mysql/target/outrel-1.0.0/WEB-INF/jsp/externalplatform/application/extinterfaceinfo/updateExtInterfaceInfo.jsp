<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<%@ include file="/common/StaticJavascript2.jsp"%>
<title>修改接口配置表</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

</head>

<body style="background-color:#FFFFFF">
	<div id="formPageSwap">
		<br />
		<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true"  enctype="multipart/form-data" action="com.jy.modules.externalplatform.application.extinterfaceinfo.controller.ExtInterfaceInfoController">
			<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
			<table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1">
				<tr>
					<th>接口名称 ：</th>
					<td><input type="text" class="text" id="dtointerfaceName" name="interfaceName" notNull="false" maxLength="50" value="${dto.interfaceName}" /></td>
					<th>接口编码 ：</th>
					<td><input type="text" class="text" id="dtointerfaceNo" name="interfaceNo" notNull="false" maxLength="50" value="${dto.interfaceNo}" readonly="readonly" /></td>
				</tr>
				<tr>
					<th>接口URL ：</th>
					<td id="remardTD" colspan="5" style="border-right:0;"><textarea id="dtointerfaceUrl" name="interfaceUrl" notNull="false" style="width:98%;height:50px;" maxlength="150">${dto.interfaceUrl}</textarea>
					</td>
				</tr>
				<tr>
					<th>接口描述 ：<br />(*最多输入50个字)</th>
					<td id="remardTD" colspan="5" style="border-right:0;"><textarea id="dtointerfaceDes" name="interfaceDes" notNull="false" style="width:98%;height:50px;" maxlength="150">${dto.interfaceDes}</textarea></td>
				</tr>
				<tr>
					<th>交易编码 ：</th>
					<td><input type="text" class="text" id="dtointerfaceCode" name="interfaceCode" notNull="false" maxLength="50" value="${dto.interfaceCode}" /></td>
					<th>业务编码 ：</th>
					<td><input type="text" class="text" id="dtobusinessCode" name="businessCode" notNull="false" maxLength="50" value="${dto.businessCode}" /></td>
				</tr>
				<tr>
					<th>接口调用方式 ：</th>
					<td><syscode:dictionary codeType="EXT_INTER_SEND_TYPE" id="dtointerfaceSendType" name="interfaceSendType" type="select" extendProperty=" notNull=true" defaultValue="${dto.interfaceSendType}"></syscode:dictionary></td>
					<th>接口参数类型 ：</th>
					<td><syscode:dictionary codeType="EXT_INTER_PARAMS_TYPE" id="dtointerfaceParamsType" name="interfaceParamsType" type="select" extendProperty=" notNull=true" defaultValue="${dto.interfaceParamsType}"></syscode:dictionary></td>
					</td>
				</tr>
				<tr>
					<th>模板上传 ：</th>
					<td><input type="file" id="dtotemplateContent" name="templateContent"  maxLength="2000"></td>
					<th>是否有效 ：</th>
					<td><syscode:dictionary id="validateState" name="validateState" codeType="YESNO" type="select" defaultValue="${dto.validateState }" /></td>
				</tr>
				<tr>
					<th>接口调用类名全称 ：</th>
					<td id="remardTD" colspan="5" style="border-right:0;"><textarea id="className" name="className" notNull="false" style="width:98%;height:50px;" maxlength="250">${dto.className}</textarea>
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
