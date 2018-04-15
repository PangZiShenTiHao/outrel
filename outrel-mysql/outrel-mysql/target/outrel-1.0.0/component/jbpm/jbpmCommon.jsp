<%@ page language="java" import="java.util.*,com.jy.platform.jbpm4.tool.StringUtilTools" pageEncoding="UTF-8"%>

<%
String path1 = request.getContextPath();
String basePath1 = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path1+"/";
%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<c:set var="basePath1" value="${pageContext.request.scheme}${'://'}${pageContext.request.serverName}${':'}${pageContext.request.serverPort}${pageContext.request.contextPath}/"></c:set>
<script>
var JBPM4_PATH = '${basePath1}';
</script>
