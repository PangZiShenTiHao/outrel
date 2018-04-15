<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page language="java" import="java.text.*"%>
<%
	String path = request.getContextPath();
	String basePath = path + "/";
%>
<!DOCTYPE HTML>
<html>
<head>
<base href="<%=basePath%>">

<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta http-equiv="pragma" content="no-cache">
<meta http-equiv="cache-control" content="no-cache">
<meta http-equiv="expires" content="0">
<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
<meta http-equiv="description" content="This is my page">

<!-- 添加依赖的js和css -->
<script src="<%=basePath%>js/jquery.js" type="text/javascript"></script>

<link rel="stylesheet" type="text/css" href="<%=basePath%>css/login.css">

<title>Demo-web</title>

</head>

<body>
<!-- 
<table>
	<tr>
	<td><img src="images/top_login.jpg" width="596" height="331" /></td>
	</tr>
</table>
 -->
<!-- 
<div id="halloween" >
<div id="login">

</div>
</div>
 -->
<!-- 
<section class="main" id="mainBg" style="">
<div id="mainCnt" class="main-inner" style="background-image: url(http://mimg.127.net/index/163/themes/121025_halloween_cnt1_1.jpg); background-repeat: no-repeat; background-position: center top;">
<div id="loginBlock" class="login tab-2">
<div class="loginFunc">
<div id="lbNormal" class="loginFuncNormal"> 邮箱帐号登录 </div>
<div id="lbMob" class="loginFuncMobile"> 手机号登录 </div>
</div>
</div>
</div>
</section>
 -->
 <script type="text/javascript">
 
  function onsub(){
	  
	  var j_username = $("#username").val();
	  var system_id = $("#system_id").val();
	  
	  $("#j_username").val(j_username+"_"+system_id);
	  
	  return true;
  }
   
 </script>
  
	<div class="loginDiv">
	
		<form id="login" name="login" action="j_spring_security_check" method="post" >
		
			<input class="text" type="hidden" id="j_username" name="j_username" value=""/>
			<table id="table3">
				<tr>
					<td>用户名:</td>
				</tr>
				<tr>	
					<td class="textback"><input class="text" id="username" name="username" type="text" value="admin"/></td>
				</tr>
				<tr>
					<td>密&nbsp&nbsp码:</td>
				</tr>
				<tr>
					<td class="textback"><input class="text" id="j_password" name="j_password" type="password" value="000000"/></td>
				</tr>
				<tr>
					<td class="textback"><select id="system_id" name="system_id">
						<option value="51">UC</option>
					
					</select></td>
				</tr>
				<tr>
					<td width="80">
						<div style="display: block;float: right;margin-right: 40px;">
							<input class="buttonNew" value="登&nbsp&nbsp录" type="submit"  onclick="onsub()"/>		
							<input class="buttonNew" value="注&nbsp&nbsp册"  type="button"/>
						</div>
					</td>
					
				</tr>
			</table>
		</form>
	</div>
	<!-- 
	
	 <script type="text/javascript">
var firstname;
firstname="George";
document.write(firstname);
document.write("<br />");
firstname="John";
document.write(firstname);
</script>
 -->
</body>
</html>
