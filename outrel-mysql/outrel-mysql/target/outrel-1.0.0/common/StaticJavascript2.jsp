<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib  prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="app" uri="/app" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<%@ taglib prefix="syscode" uri="/syscode" %>
<%@ taglib prefix="sysuser" uri="/sysuser" %>
<%@taglib prefix="ruleMapping" uri="/ruleMapping" %>
<%@taglib prefix="sysarea" uri="/sysarea" %>
<%@taglib uri="/product" prefix="product"%>

<%
	String path = request.getContextPath();
	String basePath = path+"/";
%>
<% String myDate="20160921"; %>
<c:set var="basePath" value="<%=basePath %>"></c:set>
<script type="text/javascript">
	//Global use for Javascript code scope. 
	var contextRootPath = "<%=path%>";
</script>

