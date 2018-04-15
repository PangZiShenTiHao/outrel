<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = path + "/";
%>

<!DOCTYPE html>
<html>
<head>
<title>多文件上传</title>
<script type="text/javascript">
		function dosubmit(){
			//alert("11111");
			//document.form1.submit();
		}
	</script>
</head>
<body>
<div id="content">
	<form id="form2" action="<%=path%>/upload/execute" method="post" enctype="multipart/form-data">
 <input type="file" name="myfiles" id="myfiles">
 <input type="file" name="myfiles" id="myfiles">
 <input type="file" name="myfiles" id="myfiles">
 <input type="submit" name="submit" value="提交一个文件" onclick="dosubmit()">
	</form>
</div>
</body>
</html>