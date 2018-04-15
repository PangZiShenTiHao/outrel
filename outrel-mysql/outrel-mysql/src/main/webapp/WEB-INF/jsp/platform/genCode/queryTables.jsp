<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/app" prefix="app"%>
<%
	String path = request.getContextPath();
	String basePath = path + "/";
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head> 
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
 <jsp:include page="/common/StaticJavascript.jsp" />
  <%-- 只引入一个通用表单样式 --%>
    <title>查询数据库中的表</title>
<script type="text/javascript">
window.onload=function(){
	function query(){
		iframe.iframeObj["table"].query();
	}
	function reset(){
		iframe.iframeObj["form"].reset();
	}
	
	var formStructure={
		columns : [
			{display : '表名称', code : 'tableName', width : 200,  type:'text'},
		],
		buttons:[
		 		{"text":"查询","fun":query,icon:"ui-icon-search"},
				{"text":"重置","fun":reset,icon:"ui-icon-extlink"}
		]
	}
	var toolbar={
		title:"查询列表"
	}
	var tableStructure = {
			columns : [
				{display : '表名称', code : 'TABLE_NAME', width : 200, align : 'left', type:'text', isOrder : true},
				{display : '表备注', code : 'COLUMN_NAME', width : 200, align : 'left', type:'text', isOrder : true},
				{display : '归属user', code : 'USER_NAME', width : 200, align : 'left', isOrder:false},
		   ],
			url : contextRootPath+"/generate/queryTablesOfDatabase",
			pageSize : 10,
			selectType : 'radio',
			checkbox : false,
			rownumbers : true,
			pages : [ 10, 20, 30 ],
			primaryKey:"ID",
			trHeight : 30,
			form:"form"
		};
		
	var searchIframe={"toolbar":toolbar,"form":formStructure,"table":tableStructure};	
	iframe=$("#content").newSearchIframe(searchIframe);
	iframe.show();	
}
</script>
    
    
  </head>
  <body style="background-color:#FFFFFF">
  
  <!-- 查询条件start -->
<!-- <form name="query" id="query" method="post" action="">
<fieldset class="search_fieldset">
<legend>查询条件</legend>

  <input type="hidden" maxlength="100" id="operateOfProvider" name="operateOfProvider" value="queryTablesOfDatabase"  />
<table width="96%" border="0" align="center" cellpadding="1" cellspacing="1" >
<tr>
  <td align="right"><font color="red">*</font>表名称：</td>
  <td align="left"><input type="text" maxlength="100" id="dtotableName" name="tableName" value=""   />
  
  </td>
</tr>
  
<tr>
  <td align="center" colspan="2" class="my_buttons">
        <input id="queryBtn" type="button" onclick="querySubmit()" value="&nbsp;查&nbsp;询&nbsp;" />
         &nbsp;&nbsp;&nbsp;
        <input type="button" value="&nbsp;重&nbsp;置&nbsp;" onclick="restFun()"/>
  </td>
</tr>
</table>
</fieldset>
</form>   -->
  <!-- 查询条件end --> 

		<!-- 列表详情 start -->
		<%-- <table id="listContent" width="99.9%" border="1" align="center" style="margin-top: 8px;" class="tab_1">
			<tr height="25" >
				<th  align="center" >编号</th>
				<th  align="center" >表名称</th>
				<th  align="center" >表备注</th>
				<th  align="center" >归属user</th>
			</tr>
			
			<c:forEach var="temp" items="${list}" varStatus="status">
				<tr >
				<td align="center"><input type="radio" name="tableNameRadio" value="${temp.TABLE_NAME}" onclick="selectTable('${temp.TABLE_NAME}')" /></td>
				<td align="center"><c:out value="${temp.TABLE_NAME}"/></td>
				<td align="center"><c:out value="${temp.COLUMN_NAME}"/></td>
				<td align="center"><c:out value="${temp.USER_NAME}"/></td>
				</tr>
			</c:forEach>
		</table> --%>
   		<!-- 列表详情 end -->
<div id="content"></div>
   
  </body>
</html>