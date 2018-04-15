<%@ page contentType="text/html;charset=UTF-8" language="java"%>
<%@taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<%
	String path = request.getContextPath();
	String basePath = path + "/";
	if (request.getServerPort() == 80) {
		basePath = request.getScheme() + "://"
				+ request.getServerName() + path + "/";
	}
	//清除session
	session.invalidate();
%>
<html>
<head>
<title>登录失败</title>
<link rel="stylesheet" href="<%=basePath%>css/result.css">
<style>
.error, .warn {
	color: red;
	font-size: 12px;
	margin-top: 13px
}
</style>
</head>

<body>
	<div class="wap">
		<div class="title">
			<span class="font-bold">登录失败</span>
		</div>
		<div class="content">
			<div class="msg error">
				<span class="font-bold"><shiro:principal />认证失败 <a href="<%=basePath%>index.jsp">重新登录</a>
			</div>
		</div>
	</div>
</body>
</html>