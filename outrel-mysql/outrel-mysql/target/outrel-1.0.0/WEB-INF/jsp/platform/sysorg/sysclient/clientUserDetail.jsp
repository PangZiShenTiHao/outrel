<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
   <%@ include file="/common/StaticJspTaglib.jsp" %>
   
<form:form modelAttribute="sysUserDto" id="updateNewsFormData" name="updateNewsFormData" isCheck="true" >
<div class="expandSwap">
	<div class="expandTitle"><span class="text">用户信息更新</span><span class="expandBtn expandOver"></span></div>
	<div class="expandContent">
		<table align="center"class="formTableSwap" width="90%"  border="0" align="center" cellpadding="0" cellspacing="1"> 
<tr>
  <th> 姓名<em class="emcls">*</em> ：</th>
  <td > 
  <input type="text" class="text" id="dtouserName" name="userName" notNull="false" maxLength="25" value="${sysUserDto.userName}" />
  </td>
  <th> 编码<em class="emcls">*</em> ：</th>
  <td > 
  <input type="text" class="text" id="dtouserNo" name="userNo" notNull="false" maxLength="25" value="${sysUserDto.userNo}" />
  </td>
  </tr>
<tr>
  <th> 登录名<em class="emcls">*</em> ：</th>
  <td > 
  <input type="text" class="text" id="dtologinName" name="loginName" notNull="false" maxLength="25" value="${sysUserDto.loginName}" />
  </td>
  <th> 登录密码<em class="emcls">*</em> ：</th>
  <td > 
  <input type="text" class="text" id="dtopassword" name="password" notNull="false" maxLength="25" value="${sysUserDto.password}" />
  </td>
</tr>

<tr style="display: none;" id="partTimeOrgTemplate">
  <th> 兼职机构 ：</th>
  <td > 
  <input type="hidden" class="text" id="partTimeOrgId" name="partTimeOrgId"/>
  <input type="text" class="text" id="partTimeOrgName" name="partTimeOrgName" maxLength="25" readonly="readonly" value="- - -点击选择- - -" onclick="selectOrg(this);"/>
  </td>
  <th> 兼职岗位 ：</th>
  <td > 
  <input type="hidden" class="text" id="partTimePositionId" name="partTimePositionId"/>
  <input type="text" class="text" id="partTimePositionName" name="partTimePositionName" maxLength="25" readonly="readonly" value="- - -点击选择- - -" onclick="selectPosition(this);" />
  &nbsp;<button type="button" onclick="delPartTimeOrg(this);">删除兼职机构</button>
  </td>
</tr>

<tr style="display: none;" id="partTimeOrgTemplate">
  <th> 兼职机构 ：</th>
  <td > 
  <input type="hidden" class="text" id="partTimeOrgId" name="partTimeOrgId"/>
  <input type="text" class="text" id="partTimeOrgName" name="partTimeOrgName" maxLength="25" readonly="readonly" value="- - -点击选择- - -" onclick="selectOrg(this);"/>
  </td>
  <th> 兼职岗位 ：</th>
  <td > 
  <input type="hidden" class="text" id="partTimePositionId" name="partTimePositionId"/>
  <input type="text" class="text" id="partTimePositionName" name="partTimePositionName" maxLength="25" readonly="readonly" value="- - -点击选择- - -" onclick="selectPosition(this);" />
  &nbsp;<button type="button" onclick="delPartTimeOrg(this);">删除兼职机构</button>
  </td>
</tr>

<c:forEach var="sysOrgUserDto" items="${sysUserDto.sysOrgUserDTOs }" varStatus="idx">
	<c:choose>
		<c:when test="${sysOrgUsersysUserDto.isMainOrg eq '1' }">
			<tr name="orgAndPosition" id="mainOrgAndPosition">
			  <th> 主机构 <em class="emcls">*</em>：</th>
			  <td>
			  <input type="hidden" class="text" id="sysOrgUserId" name="sysOrgUserId" value="${sysOrgUsersysUserDto.id}"/>
			  <input type="hidden" class="text" id="mainOrgId" name="mainOrgId" value="${sysOrgUsersysUserDto.orgId}"/>
			  <input type="text" class="text" id="mainOrgName" name="mainOrgName" notNull="true" maxLength="25" value="${sysOrgUsersysUserDto.orgName }" onclick="selectOrg(this);"/>
			  </td>
			  <th> 任职岗位<em class="emcls">*</em> ：</th>
			  <td > 
			  <input type="hidden" class="text" id="positionId" name="positionId" value="${sysOrgUsersysUserDto.positionId}"/>
			  <input type="text" class="text" id="positionName" name="positionName" notNull="true" maxLength="25" value="${sysOrgUsersysUserDto.positionName}" onclick="selectPosition(this);"/>
			  &nbsp;<button type="button" onclick="addPartTimeOrg();">添加兼职机构</button>
			  </td>
			</tr>
		</c:when>
		<c:otherwise>
			<tr name="orgAndPosition">
			  <th> 兼职机构 ：</th>
			  <td > 
			  <input type="hidden" class="text" id="sysOrgUserId${idx.index}" name="sysOrgUserId${idx.index}" value="${sysOrgUsersysUserDto.id}"/>
			  <input type="hidden" class="text" id="partTimeOrgId${idx.index}" name="partTimeOrgId${idx.index}" value="${sysOrgUsersysUserDto.orgId}"/>
			  <input type="text" class="text" id="partTimeOrgName${idx.index}" name="partTimeOrgName${idx.index}" maxLength="25" readonly="readonly" value="${sysOrgUsersysUserDto.orgName }" onclick="selectOrg(this);"/>
			  </td>
			  <th> 兼职岗位 ：</th>
			  <td > 
			  <input type="hidden" class="text" id="partTimePositionId${idx.index}" name="partTimePositionId${idx.index}" value="${sysOrgUsersysUserDto.positionId}"/>
			  <input type="text" class="text" id="partTimePositionName${idx.index}" name="partTimePositionName${idx.index}" maxLength="25" readonly="readonly" value="${sysOrgUsersysUserDto.positionName}" onclick="selectPosition(this);" />
			  &nbsp;<button type="button" onclick="delPartTimeOrg(this);">删除兼职机构</button>
			  </td>
			</tr>
		</c:otherwise>
	</c:choose>
</c:forEach>

<tr>
  <%-- <th> 盐值 ：</th>
  <td > 
  <input type="text" class="text" id="dtosalt" name="salt" notNull="false" maxLength="25" value="${sysUserDto.salt}" />
  </td> --%>
  <th> 手机 ：</th>
  <td > 
  <input type="text" class="text" id="dtomobile" name="mobile" notNull="false" maxLength="25" value="${sysUserDto.mobile}" />
  </td>
  <th> 邮件 ：</th>
  <td > 
  <input type="text" class="text" id="dtoemail" name="email" notNull="false" maxLength="25" value="${sysUserDto.email}" />
  </td>
</tr>
<%-- <tr>
  
  <th> 用户头像 ：</th>
  <td > 
  <input type="text" class="text" id="dtouserImage" name="userImage" notNull="false" maxLength="50" value="${sysUserDto.userImage}" />
  </td>
  </tr> --%>
<tr>
  <th> 性别 ：</th>
  <td >
  <form:select path="sex" id="dtosex">
	  	<form:option value="0">女</form:option>
	  	<form:option value="1">男</form:option>
  </form:select>
  </td>
  <th> 出生日期 ：</th>
  <td > 
   <input type="text" class="text" value='${sysUserDto.birthday}' onClick="WdatePicker()"  id="dtobirthday" name="birthday" notNull="false" maxLength="25" value="" />
  </td>
</tr>
<tr>
  <th> 民族 ：</th>
  <td > 
 <%--  <input type="text" class="text" id="dtonationality" name="nationality" notNull="false" maxLength="25" value="${sysUserDto.nationality}" /> --%>
 <syscode:dictionary name="nationality"  id="dtonationality" codeType="sysuser_nation" type="select" defaultValue="${sysUserDto.nationality}"></syscode:dictionary>
  </td>
  <th> 学历 ：</th>
  <td > 
  <%-- <input type="text" class="text" id="dtoeducation" name="education" notNull="false" maxLength="25" value="${sysUserDto.education}" /> --%>
  <syscode:dictionary name="education"  id="dtoeducation" codeType="sysuser_education" type="select" defaultValue="${sysUserDto.education}"></syscode:dictionary>
  </td>
</tr>
<tr>
  <th> 职务 ：</th>
  <td > 
 <%--  <input type="text" class="text" id="dtojob" name="job" notNull="false" maxLength="50" value="${sysUserDto.job}" /> --%>
   <syscode:dictionary name="job"  id="dtojob" codeType="sysuser_job" type="select" defaultValue="${sysUserDto.job}" ></syscode:dictionary>
  </td>
  <th> 家庭住址 ：</th>
  <td > 
  <input type="text" class="text" id="dtohomeAddress" name="homeAddress" notNull="false" maxLength="50" value="${sysUserDto.homeAddress}" />
  </td>
  </tr>
<tr>
  <th> 家庭邮编 ：</th>
  <td > 
  <input type="text" class="text" id="dtohomeZipcode" name="homeZipcode" notNull="false" maxLength="25" value="${sysUserDto.homeZipcode}" />
  </td>
  <th> 家庭电话 ：</th>
  <td > 
  <input type="text" class="text" id="dtohomeTel" name="homeTel" notNull="false" maxLength="25" value="${sysUserDto.homeTel}" />
  </td>
</tr>
<tr>
  <th> 办公电话 ：</th>
  <td > 
  <input type="text" class="text" id="dtoofficeTel" name="officeTel" notNull="false" maxLength="25" value="${sysUserDto.officeTel}" />
  </td>
  <th> 办公地址 ：</th>
  <td > 
  <input type="text" class="text" id="dtoofficeAddress" name="officeAddress" notNull="false" maxLength="50" value="${sysUserDto.officeAddress}" />
  </td>
</tr>
<tr>
  <th> 排序 ：</th>
  <td > 
  <input type="text" class="text" id="dtoorderBy" name="orderBy" notNull="false" maxLength="25" value="${sysUserDto.orderBy}" />
  </td>
  <th> 是否锁定 ：</th>
  <td > 
 <%--  <form:select path="isLocked" id="dtoisLocked">
	  	<form:option value="0">未锁定</form:option>
	  	<form:option value="1">锁定</form:option>
  </form:select>
   --%>
   <syscode:dictionary id="dtoisLocked" name="isLocked" codeType="sys_locked" type="select" defaultValue="${sysUserDto.isLocked}"/>
  </td>
</tr>

<tr>
  <th> 是否有效 ：</th>
  <td colspan="3"> 
  <form:select path="validateState" id="dtovalidateState">
	  	<form:option value="0">无效</form:option>
	  	<form:option value="1">有效</form:option>
  </form:select>
  </td>
</tr>
       </table>
	</div>
</div>

</form:form>
