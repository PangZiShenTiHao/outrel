<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page language="java" import="com.jy.platform.api.org.UserInfo,com.jy.platform.api.org.SessionAPI,org.springframework.web.context.support.WebApplicationContextUtils,org.springframework.web.context.WebApplicationContext,org.springframework.web.context.ContextLoader,org.springframework.context.ApplicationContext" %>
<%@taglib prefix="sysrole" uri="/sysrole" %>
<%@ taglib uri="/sysuser" prefix="sysuser"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
  <title>查看流程轨迹</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
</head>
<body >
	<sysuser:search var="curUser" />
	<c:set var="curUserId" value='${curUser.userId}' scope="session"></c:set>
<!-- 获取当前登录人的角色列表信息 -->
<sysrole:role var="roles" userId="${curUserId }"/>
<div id="${curUserId }"></div>
<div id="${roles }" style="display: none"></div>

	<!-- 页面初始化 需要的 div -->
	<div id="content"></div>
	
<script type="text/javascript">
//初始化 查询页面元素
function initFn(){
	//定义工具条	
	var toolbar={
		title:"流程轨迹列表"
	}
	//定义 table 列表信息	
	var tableStructure = {
		//定义table 列表的表头信息
		columns : [
		 {display : '环节名称', code : 'ACT_NAME', width : 100, align : 'left', type:'text'}
		 <%-- 如果含有门店角色 则显示 此两列信息--%>
		 <c:if test="${!fn:contains(roles, 'md_')}">
			,{display : '执行者', code : 'EXE_USER_NAME', width : 80, align : 'left', type:'text'	}
			,{display : '过程描述', code : 'LOG_DESC', width : 160, align : 'left', type:'text'}
	     </c:if>
		/* ,{display : '流程实例ID', code : 'PRO_INS_ID', width : 160, align : 'left', type:'text'} */
		,{display : '开始时间', code : 'START_TIME', width : 120, align : 'left', type:'text'}
		,{display : '完成时间', code : 'END_TIME', width : 120, align : 'left', type:'text'}
		,{display : '执行备注', code : 'OUTCOME', width : 100, align : 'left', type:'text'}
	   ],
		url : "${basePath}workFlowProvider/viewWorkflowHisLog.do?type=${param.type}&processInstantceId=${param.processInstantceId}&bizTabName=${param.bizTabName}&bizInfId=${param.bizInfId}",
		pageSize : 10,
		rownumbers : true,
		pages : [ 10, 20, 30 ],
		trHeight : 30,
		primaryKey:"id"
	};
	//组装 searchIframe 的相关参数		
	var searchIframe={"toolbar":toolbar,"table":tableStructure};	
	//初始化 form 表单 table 列表 及工具条 
	var iframe=$("#content").newSearchIframe(searchIframe);
	iframe.show();
}
//初始化 js fun
$(document).ready(function(){
	initFn();
});
</script>
</body>
</html>
