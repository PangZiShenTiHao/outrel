<%@ page language="java" import="java.util.*" pageEncoding="UTF-8" isErrorPage="true"%>
<%@ taglib  prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
<%
String path = request.getContextPath();
String basePath = path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>error.jsp</title>
    
	<meta http-equiv="pragma" content="no-cache">
	<meta http-equiv="cache-control" content="no-cache">
	<meta http-equiv="expires" content="0">    
	<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
	<meta http-equiv="description" content="This is my page">
	<style type="text/css">
        .wap{
            width: 600px;
            height: 100%;
            min-height: 100px;
            margin: 200px auto;
            background: url("images/error_06.png") left top no-repeat;
            padding-left: 70px;
            color:#416380;
            font-size: 14px;

        }
        .link{
            float: right;
            color:#416380;
            margin-top:30px;
        }
        .btn-back{
            background: url("images/button_07.png");
            width: 96px;
            height: 30px;
            border: 0;
            color: #416380;
            font-weight: bold;
            font-size: 14px;
        }
        .detail{
            color: #333;
            font-size: 12px;
        }
    </style>
  </head>
  
  <body>
  <c:set var="errorMsg" value="Y"></c:set>
  <c:if test="${fn:startsWith(V_MESSAGE,'系统繁忙' ) || fn:startsWith(SPRING_SECURITY_LAST_EXCEPTION,'系统繁忙' )}">
  	<c:set var="errorMsg" value="N"></c:set>
  	<div class="wap"><br/>${V_MESSAGE }

	</div>
  </c:if>
  
  <c:if test="${'N' ne errorMsg }">
  <div class="wap">系统错误，请联系管理员!<a class="link" onclick="viewDetail(this)" href="javascript:void(0);" >隐藏详细信息</a>
	<!-- <button class="btn-back" onclick="viewDetail(this)"><< 返回</button> -->
	<p>请求异常信息：</p>
	    <div class="detail" id="detail">
	        <p>${SPRING_SECURITY_LAST_EXCEPTION }</p>
	        <p>${V_MESSAGE }</p>
	    </div>
	
	</div>
  </c:if>

<script>
function viewDetail(obj){

    var odiv=document.getElementById("detail");
    if(odiv.style.display=="none"){
        odiv.style.display="block";
        obj.text="隐藏详细信息";
    }else{
        odiv.style.display="none";
        obj.text="打开详细信息";
    }
}
</script>
</body>
</html>
