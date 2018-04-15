<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   <style>
   		body{
   			margin:8px;}
        .top {
            height: 43px;
            width: 100%;
            background: #8ecbff url("${basePath}images/sysversion/top_02.png") top right no-repeat;

        }
        .logo {
            background: url("${basePath}images/sysversion/logo_04.png") left top 5px no-repeat;
            padding-left: 115px;
            padding-top: 10px;
            position: absolute;
            left: 50%;
            margin-left: -475px;
            height: 35px;
            width: 970px;
            line-height: 35px;
        }
        .content {
            width: 970px;
            border: 1px solid #c6c6c6;
            border-radius: 6px;
            height: 100%;
            margin: 25px auto;
            padding: 10px;
            color: #333;
        }
        .title {
            background: #f1f1f1;
            height: 35px;
            padding: 1px 10px;
            line-height: 35px;
        }
        .title a{
        color: #333;
        text-decoration:none;
        }
        .font-20-a {
            font: 20px "Arial";

        }
        .font-20 {
            font: 20px "微软雅黑";

        }
        .font-16{
            font: 16px "微软雅黑";color:  #014195;

        }
        .font-14 {
            font: 14px "宋体";
        }

        .content p {
            padding: 10px;
            line-height: 30px;
        }
        .sp-right {
            float: right;
            margin-top: 10px;
        }
    </style>
</head>
  
<body>
	<div class="top">
    <div class="logo font-16">最新消息</div>
</div>


	<c:forEach items="${list}" var="obj">
	<div class="content">
	    <div class="title"><span class="font-20"><a href="<%=basePath %>/grobalMes/queryNewMessageDetail?id=${obj.msgId}" target="_blank">${obj.title}</a></span><span class="font-20-a">${obj.publisherNameShow}</span>
	        <span class="font-14 sp-right">发布时间：<fmt:formatDate value="${obj.createDate}" pattern="yyyy-MM-dd HH:mm:ss"/></span>
	    </div>
	</div>    
	</c:forEach>


</body>  
</html>
