<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
 <%@ taglib uri="/sysarea" prefix="sysarea"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJspTaglib.jsp" %>
   <title>更新明细</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   <style>
   	td{height:12px;}
   </style>
</head>
  
<body style="background-color:#FFFFFF">

<c:if test="${sysUserChangeDTOs!=null }">
	<c:forEach var="sysUserChangeDTO" items="${sysUserChangeDTOs }">
	<div class="expandSwap">
		<div class="expandTitle"><span class="text">用户信息${sysUserChangeDTO.changeTypeCN}<c:if test="${sysUserChangeDTO.validateState.propertesyn eq '0'}"><font color="red">【删除】</font></c:if></span><span class="expandBtn expandOver"></span></div>
		<div class="expandContent">
		<table align="center"class="formTableSwap" width="90%"  border="0" align="center" cellpadding="0" cellspacing="1"> 
			<tr>
			  <th> 姓名 ：</th>
			  <td >${sysUserChangeDTO.userName.showProperteDesc}</td>
			  <th> 编码<em class="emcls">*</em> ：</th>
			  <td >${sysUserChangeDTO.userNo.showProperteDesc}</td>
			  </tr>
			<tr>
			  <th> 登录名 ：</th>
			  <td >${sysUserChangeDTO.loginName.showProperteDesc}</td>
			  <th> 登录密码<em class="emcls">*</em> ：</th>
			  <td >${sysUserChangeDTO.password.showProperteDesc}</td>
			</tr>
			<c:if test="${sysOrgUserChangeDTOs!=null }">
				<c:forEach var="sysOrgUserChangeDTO" items="${ sysOrgUserChangeDTOs }">
					<tr>
						<c:choose>
							<c:when test="${sysOrgUserChangeDTO.changeType eq 'nochange' }">
								<th>机构以及任职岗位：</th>
								<td colspan="3">
								${ sysOrgUserChangeDTO.sysOrgUserDTO.isMainOrg eq '1' ? '[主任职机构]':'[兼职机构]'}
								${sysOrgUserChangeDTO.sysOrgUserDTO.orgName}&nbsp;&nbsp;${sysOrgUsersysUserDto.sysOrgUserDTO.positionName}</td>
							</c:when>
							<c:when test="${sysOrgUserChangeDTO.changeType eq 'sub' }">
								<th>机构以及任职岗位：</th>
								<td colspan="3">
								${ sysOrgUserChangeDTO.sysOrgUserDTO.isMainOrg eq '1' ? '[主任职机构]':'[兼职机构]'}
								${sysOrgUserChangeDTO.sysOrgUserDTO.orgName}&nbsp;&nbsp;${sysOrgUsersysUserDto.sysOrgUserDTO.positionName}<font color="red">【已取消】</font></td>
							</c:when>
							<c:when test="${sysOrgUserChangeDTO.changeType eq 'add' }">
								<th>机构以及任职岗位：</th>
								<td colspan="3">
								${ sysOrgUserChangeDTO.sysOrgUserSynDTO.isMainOrg eq '1' ? '[主任职机构]':'[兼职机构]'}
								${sysOrgUserChangeDTO.sysOrgUserSynDTO.orgName}&nbsp;&nbsp;${sysOrgUsersysUserDto.sysOrgUserSynDTO.positionName}<font color="red">【新增加】</font></td>
							</c:when>
						</c:choose>
					</tr>
				</c:forEach>
			</c:if>
			<tr>
			  <th> 手机 ：</th>
			  <td >${sysUserChangeDTO.mobile.showProperteDesc}</td>
			  <th> 邮件 ：</th>
			  <td >${sysUserChangeDTO.email.showProperteDesc}</td>
			</tr>
			<tr>
			  <th> 性别 ：</th>
			  <td >
				<c:choose>
				 	<c:when test="${sysUserChangeDTO.sex.ischange}">
				  	<syscode:dictionary codeType="sex" type="text" defaultValue="${sysUserChangeDTO.sex.properte}"/><font color='red'>&nbsp;更新为&nbsp;</font>
				  	<syscode:dictionary codeType="sex" type="text" defaultValue="${sysUserChangeDTO.sex.propertesyn}"/>
				 	</c:when>
				 	<c:otherwise><syscode:dictionary codeType="sex" type="text" defaultValue="${sysUserChangeDTO.sex.showProperte}"/></c:otherwise>
				</c:choose>
			  </td>
			  <th> 出生日期 ：</th>
			  <td >${sysUserChangeDTO.birthday.showProperteDesc}</td>
			</tr>
			<tr>
			  <th> 民族 ：</th>
			  <td ><c:choose>
				 	<c:when test="${sysUserChangeDTO.nationality.ischange}">
				  	<syscode:dictionary codeType="sysuser_nation" type="text" defaultValue="${sysUserChangeDTO.nationality.properte}"/><font color='red'>&nbsp;更新为&nbsp;</font>
				  	<syscode:dictionary codeType="sysuser_nation" type="text" defaultValue="${sysUserChangeDTO.nationality.propertesyn}"/>
				 	</c:when>
				 	<c:otherwise><syscode:dictionary codeType="sysuser_nation" type="text" defaultValue="${sysUserChangeDTO.nationality.showProperte}"/></c:otherwise>
				</c:choose>
			  </td>
			  <th> 学历 ：</th>
			  <td ><c:choose>
				 	<c:when test="${sysUserChangeDTO.education.ischange}">
				  	<syscode:dictionary codeType="sysuser_education" type="text" defaultValue="${sysUserChangeDTO.education.properte}"/><font color='red'>&nbsp;更新为&nbsp;</font>
				  	<syscode:dictionary codeType="sysuser_education" type="text" defaultValue="${sysUserChangeDTO.education.propertesyn}"/>
				 	</c:when>
				 	<c:otherwise><syscode:dictionary codeType="sysuser_education" type="text" defaultValue="${sysUserChangeDTO.education.showProperte}"/></c:otherwise>
				</c:choose>
			  </td>
			</tr>
			<tr>
			  <th> 职务 ：</th>
			  <td ><c:choose>
				 	<c:when test="${sysUserChangeDTO.job.ischange}">
				  	<syscode:dictionary codeType="sysuser_job" type="text" defaultValue="${sysUserChangeDTO.job.properte}"/><font color='red'>&nbsp;更新为&nbsp;</font>
				  	<syscode:dictionary codeType="sysuser_job" type="text" defaultValue="${sysUserChangeDTO.job.propertesyn}"/>
				 	</c:when>
				 	<c:otherwise><syscode:dictionary codeType="sysuser_job" type="text" defaultValue="${sysUserChangeDTO.job.showProperte}"/></c:otherwise>
				</c:choose>
			  </td>
			  <th> 家庭住址 ：</th>
			  <td >${sysUserChangeDTO.homeAddress.showProperteDesc}</td>
			  </tr>
			<tr>
			  <th> 家庭邮编 ：</th>
			  <td > ${sysUserChangeDTO.homeZipcode.showProperteDesc}</td>
			  <th> 家庭电话 ：</th>
			  <td >${sysUserChangeDTO.homeTel.showProperteDesc}</td>
			</tr>
			<tr>
			  <th> 办公电话 ：</th>
			  <td >${sysUserChangeDTO.officeTel.showProperteDesc}</td>
			  <th> 办公地址 ：</th>
			  <td >${sysUserChangeDTO.officeAddress.showProperteDesc}</td>
			</tr>
			<tr>
			  <th> 是否锁定 ：</th>
			  <td colspan="3"><c:choose>
				 	<c:when test="${sysUserChangeDTO.isLocked.ischange}">
				  	<syscode:dictionary codeType="sys_locked" type="text" defaultValue="${sysUserChangeDTO.isLocked.properte}"/><font color='red'>&nbsp;更新为&nbsp;</font>
				  	<syscode:dictionary codeType="sys_locked" type="text" defaultValue="${sysUserChangeDTO.isLocked.propertesyn}"/>
				 	</c:when>
				 	<c:otherwise><syscode:dictionary codeType="sys_locked" type="text" defaultValue="${sysUserChangeDTO.isLocked.showProperte}"/></c:otherwise>
				</c:choose>
			  </td>
			</tr>
			<tr>
			  <th> 是否有效 ：</th>
			  <td colspan="3"><c:choose>
				 	<c:when test="${sysUserChangeDTO.validateState.ischange}">
				  	<syscode:dictionary codeType="YES_NO" type="text" defaultValue="${sysUserChangeDTO.validateState.properte}"/><font color='red'>&nbsp;更新为&nbsp;</font>
				  	<syscode:dictionary codeType="YES_NO" type="text" defaultValue="${sysUserChangeDTO.validateState.propertesyn}"/>
				 	</c:when>
				 	<c:otherwise><syscode:dictionary codeType="YES_NO" type="text" defaultValue="${sysUserChangeDTO.validateState.showProperte}"/></c:otherwise>
				</c:choose>
			  </td>
			</tr>
	       </table>
		</div>
	</div>
	
	</c:forEach>
</c:if>

<c:if test="${sysOrgChangeDTO !=null }">
	<div class="expandSwap">
		<div class="expandTitle"><span class="text">机构信息${sysOrgChangeDTO.changeTypeCN}<c:if test="${sysOrgChangeDTO.validateState.propertesyn eq '0'}"><font color="red">【删除】</font></c:if></span>
		<span class="expandBtn expandOver">
		</span></div>
		<div class="expandContent">
			<table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
				<tr>
				  <th> 机构编码 ：</th>
				  <td >${sysOrgChangeDTO.orgCode.showProperteDesc}</td>
				  <th> 机构名称 ：</th>
				  <td >${sysOrgChangeDTO.orgName.showProperteDesc}</td>
				</tr>
				<tr>
				  <th> 机构类型：</th>
				  <td colspan="3">
				  	<c:choose>
					  	<c:when test="${sysOrgChangeDTO.orgType.ischange}">
						  	<syscode:dictionary codeType="PT_ORGTYPE" type="text" defaultValue="${sysOrgChangeDTO.orgType.properte}"/><font color='red'>&nbsp;更新为&nbsp;</font>
						  	<syscode:dictionary codeType="PT_ORGTYPE" type="text" defaultValue="${sysOrgChangeDTO.orgType.propertesyn}"/>
					  	</c:when>
					  		<c:otherwise><syscode:dictionary codeType="PT_ORGTYPE" type="text" defaultValue="${sysOrgChangeDTO.orgType.showProperte}"/></c:otherwise>
					  </c:choose>
				  </td>
				</tr>
				
				<tr>
				<th>机构所属行政区划：</th>
					<td colspan="3">
					<c:choose>
					  	<c:when test="${sysOrgChangeDTO.areaCodes.ischange}">
						  	<sysarea:search level='3' pid="pcurrentAreacode" pname="pcurrentAreacode" className="notnull" cid="ccurrentAreacode" cname="ccurrentAreacode" tname='areaCodes' tid="areaCodes" defaultValue="${sysOrgChangeDTO.areaCodes.properte}" type="text" />
						  	<font color='red'>&nbsp;更新为&nbsp;</font>
						  	<sysarea:search level='3' pid="pcurrentAreacode" pname="pcurrentAreacode" className="notnull" cid="ccurrentAreacode" cname="ccurrentAreacode" tname='areaCodes' tid="areaCodes" defaultValue="${sysOrgChangeDTO.areaCodes.propertesyn}" type="text" />
					  	</c:when>
					  	<c:otherwise><sysarea:search level='3' pid="pcurrentAreacode" pname="pcurrentAreacode" className="notnull" cid="ccurrentAreacode" cname="ccurrentAreacode" tname='areaCodes' tid="areaCodes" defaultValue="${sysOrgChangeDTO.areaCodes.showProperte}" type="text" /></c:otherwise>
					</c:choose>
					&nbsp;&nbsp;
					${sysOrgChangeDTO.areaAdress.showProperteDesc}
				</td>
				</tr>
				
				<tr>
				  <th> 是否有效 ：</th>
				  <td><c:choose>
					  	<c:when test="${sysOrgChangeDTO.validateState.ischange}">
						  	<syscode:dictionary codeType="YES_NO" type="text" defaultValue="${sysOrgChangeDTO.validateState.properte}"/><font color='red'>&nbsp;更新为&nbsp;</font>
						  	<syscode:dictionary codeType="YES_NO" type="text" defaultValue="${sysOrgChangeDTO.validateState.propertesyn}"/>
					  	</c:when>
					  	<c:otherwise><syscode:dictionary codeType="YES_NO" type="text" defaultValue="${sysOrgChangeDTO.validateState.showProperte}"/></c:otherwise>
					  </c:choose>
				  </td>
				  <th> 是否是虚拟组织 ：</th>
				  <td><c:choose>
					  	<c:when test="${sysOrgChangeDTO.isVirtual.ischange}">
						  	<syscode:dictionary codeType="YES_NO" type="text" defaultValue="${sysOrgChangeDTO.isVirtual.properte}"/><font color='red'>&nbsp;更新为&nbsp;</font>
						  	<syscode:dictionary codeType="YES_NO" type="text" defaultValue="${sysOrgChangeDTO.isVirtual.propertesyn}"/>
					  	</c:when>
					  	<c:otherwise><syscode:dictionary codeType="YES_NO" type="text" defaultValue="${sysOrgChangeDTO.isVirtual.showProperte}"/></c:otherwise>
					  </c:choose>
				  </td>
				</tr>
			</table>
		</div>
	</div>
</c:if>

<c:if test="${sysPositionChangeDTO !=null }">
	<div class="expandSwap">
		<div class="expandTitle"><span class="text">岗位信息${sysPositionChangeDTO.changeTypeCN}</span><span class="expandBtn expandOver"></span></div>
		<div class="expandContent">
			<table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
				<tr>
				  <th> 岗位名称 ：</th>
				  <td >${sysPositionChangeDTO.positionName.showProperteDesc}</td>
				</tr>
				<tr>
				  <th> 岗位编码 ：</th>
				  <td >${sysPositionChangeDTO.positionCode.showProperteDesc}</td>
				</tr>
				<tr>
				  <th> 是否有效 ：</th>
				  <td><c:choose>
					  	<c:when test="${sysPositionChangeDTO.validateState.ischange}">
						  	<syscode:dictionary codeType="YES_NO" type="text" defaultValue="${sysPositionChangeDTO.validateState.properte}"/><font color='red'>&nbsp;更新为&nbsp;</font>
						  	<syscode:dictionary codeType="YES_NO" type="text" defaultValue="${sysPositionChangeDTO.validateState.propertesyn}"/>
					  	</c:when>
					  	<c:otherwise><syscode:dictionary codeType="YES_NO" type="text" defaultValue="${sysPositionChangeDTO.validateState.showProperte}"/></c:otherwise>
					  </c:choose>
				  </td>
				</tr>
			</table>
		</div>
	</div>
</c:if>

</body>

<script type="text/javascript">

   $(document).ready(function(){
	   
	   $(".formSwap").find().click(function(){
		   
		   
		   
	   })
	   
	   $(".formSwap").bind("click",function(ev){
			var obj=ev.srcElement || ev.target;
			var endObj=$(obj);
			var nextObj=endObj.parent().next();
			if(obj.tagName=="SPAN"&&endObj.hasClass("expandBtn")){
				if(endObj.hasClass("expandOver")){
					endObj.removeClass("expandOver");
					nextObj.show("blind");
				}else{
					endObj.addClass("expandOver");
					nextObj.hide("blind");
				}
			}
		});
	});
</script>
  
</html>
