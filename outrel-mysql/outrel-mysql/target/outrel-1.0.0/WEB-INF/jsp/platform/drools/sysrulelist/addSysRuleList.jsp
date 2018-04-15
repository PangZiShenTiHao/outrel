<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJspTaglib.jsp" %>
   <title>新增规则集</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="addNewsFormData" name="addNewsFormData" isCheck="true" action="com.fintech.modules.boot.platform.drools.sysrulelist.controller.SysRuleListController">
 <table id="addNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 类型：</th>
  <td >
	  <input type="hidden" id="dtoruleCode" name="ruleCode" value="${code }" />
  	<c:if test="${codeType==3 }">规则库<input type='hidden' name='ruleType' id='dtoruleType' value='1' /></c:if>
  	<c:if test="${codeType==6 }">规则集<input type='hidden' name='ruleType' id='dtoruleType' value='2' /></c:if>
  	<c:if test="${codeType>6 }">
  	<select id="dtoruleType" name="ruleType" onchange="changeHidden(this.value);">
  		<option value='4'>规则</option>
  		<option value='3'>规则包</option>
  	</select>
  	</c:if>
  </td>
  <th> 中文名 ：</th>
  <td > 
  <input class="text" id="dtochName" name="chName" notNull="false" maxLength="25" value="" />
  </td>
  </tr>
  <tr id='hiddenTr'>
  <th> 英文名：</th>
  <td > 
  <input class="text" id="dtoenName" name="enName" notNull="false" maxLength="25" value="" />
  </td>

 <c:choose>
   <c:when test="${codeType==6}">
  <th> 生效时间 ：</th>
  <td> 
  <input class="text" id="dtoeftectTime" name="eftectTime" notNull="false" value="" onClick="WdatePicker()"/>
  </td>
  </c:when>
  <c:otherwise>
  <td></td><td></td>
  </c:otherwise>
  </c:choose>
  
   <c:choose>
    <c:when test="${codeType==6}">
    <tr>
	  <th>失效时间 ：</th>
	  <td colspan=5> 
	  <input class="text" id="dtoexpiresTime" name="expiresTime" notNull="false" value="" onClick="WdatePicker()"/>
	  </td>
	 </tr> 
  	</c:when>
  	<c:otherwise></c:otherwise>
  </c:choose>
<tr>
	<th> 备注 ：</th>
  <td colspan=5>
  <textarea id="dtoremark" name="remark"  style="width:80%;height:50px;">
  </textarea>
  </td>
 </tr>
  </table>
  <br/>
  <center>
  	 <input type='button' value='保存' onclick='saveSysRuleList();'/>
  </center>
<!-- 保存 关闭 按钮 在 查询页面进行控制 -->  
</form>
</div>
</body>
</html>
