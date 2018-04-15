<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="/WEB-INF/tlds/sysuser.tld" prefix="user"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJspTaglib.jsp" %>
   <title>修改规则集</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="updateNewsFormData" name="updateNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.drools.sysrulelist.controller.SysRuleListController">
<input type="hidden" id="dtoid" name="id" notNull="false" maxLength="11" value="${dto.id}" />
 <table id="updateNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
 <input type="hidden" id="dtoruleCode" name="ruleCode" value="${dto.ruleCode}" />
 <input type='hidden' name='ruleType' id='dtoruleType' value='${dto.ruleType}' />
<tr>
  <th> 中文名 ：</th>
  <td > 
  <input id="dtochName" name="chName" notNull="false" maxLength="25" value="${dto.chName}" />
  </td>
  <th> 英文名：</th>
  <td > 
  <input id="dtoenName" name="enName" notNull="false" maxLength="25" value="${dto.enName}" />
  </td>
  </tr>
  <c:choose>
   <c:when test="${dto.ruleType==2}">
   <tr>
      <th> 生效时间：</th>
 		<td > 
			<input id="dtoeftectTime" name="eftectTime" notNull="false" maxLength="4" 
			value="<fmt:formatDate value='${dto.eftectTime}'  pattern='yyyy-MM-dd'/>" onClick="WdatePicker()"/>
	 </td>
      <th>失效时间：</th>
 		<td> 
			<input id="dtoexpiresTime" name="expiresTime" notNull="false" maxLength="4" 
			value="<fmt:formatDate value='${dto.expiresTime}'  pattern='yyyy-MM-dd'/>" onClick="WdatePicker()"/>
	 	</td>
      </tr>
      </c:when>
  </c:choose>
<tr>
  <th> 备注 ：</th>
  <td colspan=3>
   <textarea id="dtoremark" name="remark"  style="width:80%;height:50px;">${dto.remark}
  </textarea>
  </td>
</tr>
<tr>
	<td colspan=4 align="center">
   <input type='button' value='保存' onclick='updateSysRuleList();'/>
 <!--  <input type='button' value='取消' onclick="loadNull();"/>  -->
  </td>
 </tr>
  </table>
<!-- 保存 关闭 按钮 在 查询页面进行控制 -->  
</form>
</div>
</body>
  
</html>
