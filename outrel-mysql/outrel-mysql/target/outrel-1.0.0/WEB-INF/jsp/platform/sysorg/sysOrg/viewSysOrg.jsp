<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
 <%@ taglib uri="/sysarea" prefix="sysarea"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJspTaglib.jsp" %>
   <title>修改机构部门表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   <style>
   	td{height:12px;}
   </style>
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.sysorg.sysorg.controller.SysOrgController">
<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 机构编码 ：</th>
  <td >${dto.orgCode}</td>
  <th> 机构名称 ：</th>
  <td >${dto.orgName}</td>
  </tr>
<tr>
  <th> 机构类型：</th>
  <td >${dto.orgTypeCN}</td>
  <th> 排序 ：</th>
  <td >${dto.orderBy}</td>
</tr>
<tr>
<th>机构所属行政区划：</th>
	<td colspan="3">
	<sysarea:search level='3' pid="pcurrentAreacode" pname="pcurrentAreacode" className="notnull" cid="ccurrentAreacode" cname="ccurrentAreacode" tname='areaCodes' tid="areaCodes" defaultValue="${dto.areaCodes}" type="text" />
	&nbsp;&nbsp;${dto.areaAdress}
</td>
</tr>

<tr>
  <th> 是否有效 ：</th>
  <td>${dto.validateStateCN}</td>
  <th> 是否是虚拟组织 ：</th>
  <td>${dto.isVirtualCN}</td>
</tr>
<c:if test="${'1' eq dto.isVirtual}">
<tr>
  <th> 系统标识 ：</th>
  <td colspan="3">${dto.appFlagCN}</td>
</tr>
</c:if>

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
