<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<%@ include file="/common/StaticJspTaglib.jsp"%>
<%@ taglib  uri ="http://java.sun.com/jsp/jstl/functions" prefix="fn"%> 
<title>查看模板</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

</head>

<body style="background-color:#FFFFFF">
	<div id="formPageSwap">
	     <c:if test="${dto.interfaceParamsType eq 'application/xml'}">
	         ${fn:escapeXml(templateContent)}
	     </c:if>
	     <c:if test="${dto.interfaceParamsType ne 'application/xml'}">
	         ${templateContent}
	     </c:if>
        ${templateContent}
	</div>
</body>

<script type="text/javascript">
   $(document).ready(function(){
	   
   });
</script>

</html>