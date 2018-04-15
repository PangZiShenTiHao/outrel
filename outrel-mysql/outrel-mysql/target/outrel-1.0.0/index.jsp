<%@ page language="java" import="java.util.*,com.fintech.modules.common.util.ObtainPropertiesInfo" pageEncoding="UTF-8"%>
<%@ page language="java" import="java.text.*"%>
<%
//重定向
String path = request.getContextPath();
String basePath = path+"/";
if(request.getServerPort() == 80){
	basePath = request.getScheme()+"://"+request.getServerName()+path+"/";
}

//response.sendRedirect(basePath+"user/home");
String redirect = ObtainPropertiesInfo.getValByKey("cas.login.url");
response.sendRedirect(redirect);
%>
