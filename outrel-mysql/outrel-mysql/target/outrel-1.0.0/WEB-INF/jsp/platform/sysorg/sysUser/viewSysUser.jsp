<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>修改系统用户表</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   <style>
   	td{height:12px;}
   </style>
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.sysorg.sysuser.controller.SysUserController">
<input type="hidden" class="text" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 姓名 ：</th>
  <td >${dto.userName}</td>
  <th> 编码 ：</th>
  <td >${dto.userNo}</td>
  </tr>
<tr>
  <th> 登录名 ：</th>
  <td >${dto.loginName}</td>
  <th> 登录密码 ：</th>
  <td >888888</td>
</tr>

<c:forEach var="sysOrgUserDto" items="${dto.sysOrgUserDTOs }" varStatus="idx">
	<c:choose>
		<c:when test="${sysOrgUserDto.isMainOrg eq '1' }">
			<tr name="orgAndPosition" id="mainOrgAndPosition">
			  <th> 主机构 ：</th>
			  <td>${sysOrgUserDto.orgName}</td>
			  <th> 任职岗位 ：</th>
			  <td>${sysOrgUserDto.positionName}</td>
			</tr>
		</c:when>
		<c:otherwise>
			<tr name="orgAndPosition">
			  <th> 兼职机构 ：</th>
			  <td >${sysOrgUserDto.orgName }</td>
			  <th> 兼职岗位 ：</th>
			  <td >${sysOrgUserDto.positionName}</td>
			</tr>
		</c:otherwise>
	</c:choose>
</c:forEach>

<tr>
  <th> 盐值 ：</th>
  <td >${dto.salt}</td>
  <th> 手机 ：</th>
  <td >${dto.mobile}</td>
</tr>
<tr>
  <th> 邮件 ：</th>
  <td >${dto.email}</td>
  <th> 用户头像 ：</th>
  <td >${dto.userImage}</td>
  </tr>
<tr>
  <th> 性别 ：</th>
  <td >${dto.sexCN}</td>
  <th> 出生日期 ：</th>
  <td >${dto.birthday}</td>
</tr>
<tr>
  <th> 民族 ：</th>
  <td ><syscode:dictionary  codeType="NATION" type="text" defaultValue="${dto.nationality}" /></td>
  <th> 学历 ：</th>
  <td ><syscode:dictionary  codeType="EDUCATION" type="text" defaultValue="${dto.education}" /></td>
</tr>
<tr>
  <th> 职务 ：</th>
  <td ><syscode:dictionary  codeType="PT_USERJOB" type="text" defaultValue="${dto.job}" /></td>
  <th> 家庭住址 ：</th>
  <td >${dto.homeAddress}</td>
  </tr>
<tr>
  <th> 家庭邮编 ：</th>
  <td >${dto.homeZipcode}</td>
  <th> 家庭电话 ：</th>
  <td >${dto.homeTel}</td>
</tr>
<tr>
  <th> 办公电话 ：</th>
  <td >${dto.officeTel}</td>
  <th> 办公地址 ：</th>
  <td >${dto.officeAddress}</td>
</tr>
<tr>
  <th> 排序 ：</th>
  <td >${dto.orderBy}</td>
  <th> 是否锁定：</th>
  <td >${dto.isLockedCN}</td>
</tr>
<tr>
  <th> 是否有效：</th>
  <td colspan="3">${dto.validateStateCN}</td>
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
