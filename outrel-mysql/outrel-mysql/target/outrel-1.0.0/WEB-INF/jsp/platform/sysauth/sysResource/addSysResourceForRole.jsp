<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
  <title>角色授权</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- 相关js方法 -->
<script type="text/javascript">
	//页面加载完后 
	$(document).ready(function(){
		$(".leftBox").load(contextRootPath+'/sysResource/prepareExecute/toRoleList',function(){
			//alert('角色列表加载成功');
		});
		
		$(".rightBox").load(contextRootPath+'/sysResource/prepareExecute/toResourceTree',function(){
			//alert('资源树加载成功');
		});
		
	});

</script>
<style type="text/css">
	.container{
		margin-top:0px;
		width:100%;
	}

	.leftBox{
		left:0px;
		width:50%;
		float:left;
		display:inline;
		position:absolute;
		margin-bottom:2px;
	}
	.rightBox{
	    left:50%;
		width:50%;
		float:left;
		display:inline;
		position:absolute;
		margin-bottom:2px;
	}
</style>
</head>
<body style="background-color:#FFFFFF">
	<div class="container">
		<div class="leftBox">
		</div>
		<div class="rightBox">
		</div>
	</div>
</body>
</html>
