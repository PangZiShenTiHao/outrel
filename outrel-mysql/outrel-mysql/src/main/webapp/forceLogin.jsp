<%@ page language="java" import="java.util.*,com.fintech.modules.common.util.ObtainPropertiesInfo" pageEncoding="UTF-8"%>
<%@ page language="java" import="java.text.*"%>
<%
//重定向
String path = request.getContextPath();
String basePath = path+"/";
if(request.getServerPort() == 80){
	basePath = request.getScheme()+"://"+request.getServerName()+path+"/";
}
String bussinessCode = request.getParameter("bussinessCode") == null ||request.getParameter("bussinessCode").equals("") ? "USC0000":request.getParameter("bussinessCode");
String redirect = ObtainPropertiesInfo.getValByKey("cas.login.url");
if("USC0000".equals(bussinessCode)){//判断是否为安静模式,则不传错误码
	response.sendRedirect(redirect);
}else{
	response.sendRedirect(redirect+"&bussinessCode="+bussinessCode);
}

%>
