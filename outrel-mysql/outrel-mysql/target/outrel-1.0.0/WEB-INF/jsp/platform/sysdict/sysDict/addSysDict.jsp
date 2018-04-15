<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<%@ include file="/common/StaticJspTaglib.jsp"%>
<title>新增数据字典</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

</head>

<body style="background-color:#FFFFFF">
	<div id="formPageSwap">
		<br />
		<form id="addNewsFormData" name="addNewsFormData" isCheck="true"
			action="com.fintech.modules.boot.platform.sysdict.sysdict.controller.SysDictController">
			<table id="addNewsTableId" class="formTableSwap" border="0"
				align="center" cellpadding="0" cellspacing="1">
				<tr>
					<th>数据字典名称 ：</th>
					<td><input type="text" class="text" id="dtodictName"
						name="dictName" notNull="true" maxLength="50" value="" />
						</td>
				</tr>
				<tr>
					<th>数据字典编码 ：</th>
					<td><input type="text" class="text" id="dtodictCode"
						name="dictCode" notNull="true" maxLength="50" value="" onblur="queryDictCodeIsOk(this.value)"/></td>
				</tr>
				<tr>
					<th>数据字典类型 ：</th>
					<td><select id="dictType" name="dictType">
							<option value=1>项目级</option>
							<option value=0>系统级</option>
					</select></td>
				</tr>
				<!--  <th> 乐观锁 ：</th>
  <td colspan="5"> 
  <input type="text" class="text" id="dtoversion" name="version" notNull="false" maxLength="11" value="" />
  </td> -->
			</table>

			<!-- 保存 关闭 按钮 在 查询页面进行控制 -->
		</form>

	</div>

</body>

<script type="text/javascript">
	$(document).ready(function() {
		checkedInit();
	});
</script>

</html>
