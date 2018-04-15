<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="/WEB-INF/tlds/sysuser.tld" prefix="user"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
<%@ include file="/common/StaticJspTaglib.jsp" %>
<script type="text/javascript" src="${basePath}js/platform/drools/common/resetTrNum.js"></script>
<script type="text/javascript" src="${basePath}js/platform/drools/sysrulewhenconfig/querySysRuleWhenConfig.js"></script>
   <title>修改规则集</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   <script type="text/javascript">
   $(document).ready(function(){
	   if(${dto.ruleType==3||dto.ruleType==4})
	   		$("#configDiv").load(contextRootPath+'/sysRuleWhenConfig/queryWhenListByCode?code=${dto.ruleCode}&ruleType=${dto.ruleType}');
   });
   function compileRules(){
   		var url = contextRootPath+"/sysRuleList/compileRules?ruleListId=${dto.id}";
   		jyAjax(
		url,
		null,
		function(msg){
		 	$("").newMsg({}).show(msg.msg);
			//alert(msg.msg);
  	});
   }
   </script>
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<input type="hidden" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr style='height:30px;'>
  <th> 中文名 ：</th>
  <td >${dto.chName}</td>
  <th> 英文名：</th>
  <td >${dto.enName}</td>
 </tr>
  <c:choose>
   <c:when test="${dto.ruleType==2}">
   <tr>
      <th> 版本号 ：</th>
 		<td > 
			${dto.versionNum}
	 	</td>
      <th> 生效时间 ：</th>
 		<td > 
			<fmt:formatDate value="${dto.eftectTime}"  pattern="yyyy-MM-dd"/>
	 	</td>	
	</tr>
      </c:when>
  </c:choose>
</tr>
<c:choose>
   <c:when test="${dto.ruleType==2}">
<tr>
 <th> 失效时间 ：</th>
 		<td colspan=3> 
			<fmt:formatDate value="${dto.expiresTime}"  pattern="yyyy-MM-dd"/>
	 	</td>
</tr>	
</c:when>
</c:choose> 		
<tr style='height:30px;'>
  <th> 备注 ：</th>
  <td colspan=3>${dto.remark}</td>
</tr>
<c:if test="${dto.ruleType=='2' }">
<tr>
  <td colspan=4><input type="button" onclick="compileRules()" value="编译规则" ></td>
</tr>
</c:if>
  </table>
</div>
<div id='configDiv'></div>
</body>
</html>
