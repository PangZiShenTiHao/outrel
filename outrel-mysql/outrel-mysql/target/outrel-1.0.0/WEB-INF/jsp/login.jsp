<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head lang="en">
<%
	String path = request.getContextPath();
	String basePath = path+"/";
%>
<script type="text/javascript">
	window.top.location = "<%=basePath%>user/toLoginReal?errorInfo=${errorInfo}";
</script>

</head>
<body>

</body>

</html>