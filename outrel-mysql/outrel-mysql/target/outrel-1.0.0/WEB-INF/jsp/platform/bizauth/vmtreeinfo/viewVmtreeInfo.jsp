<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>修改虚拟树表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.bizauth.vmtreeinfo.controller.VmtreeInfoController">
<input type="hidden" class="text" id="dtoid" name="orgId" notNull="false" maxLength="11" value="${dto.orgId}" />
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 虚拟树节点编码 ：</th>
  <td >${dto.orgId}</td>
  </tr>
<tr>
  <th> 虚拟树节点名称 ：</th>
  <td >${dto.orgName}</td>
  </tr>
<tr>
  <th> 虚拟树代码 ：</th>
  <td >${dto.orgType}</td>
  </tr>
<tr>
  <th> 父节点 ：</th>
  <td >${dto.baseExt7}(${dto.parentId})</td>
</tr>
<tr>
  <th> 数据来源：</th>
  <td >${dto.sourceType=='HR'?'HR':'自定义'}</td>
  </tr>
<tr>
  <th> 是否叶子节点：</th>
  <td >${dto.endFlag=='1'?'是':'否'}</td>
  </tr>
<tr>
  <th> 创建时间 ：</th>
  <td >${dto.createTime}</td>
</tr>
<tr>
  <th> 创建人 ：</th>
  <td >${dto.createBy}</td>
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
