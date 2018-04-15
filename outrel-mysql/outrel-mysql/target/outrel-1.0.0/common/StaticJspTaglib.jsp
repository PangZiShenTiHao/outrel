<%@ page contentType="text/html; charset=UTF-8" %>
<%@ taglib  prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%@ taglib prefix="app" uri="/app" %>
<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags" %>
<%@ taglib prefix="syscode" uri="/syscode" %>
<%
	String path = request.getContextPath();
	String basePath = path+"/";
%>
<c:set var="basePath" value="<%=basePath %>"></c:set>
<script type="text/javascript">
	//Global use for Javascript code scope. 
	var contextRootPath = "<%=path%>";
	var staticIP = "http://192.168.50.11:8003";
</script>

