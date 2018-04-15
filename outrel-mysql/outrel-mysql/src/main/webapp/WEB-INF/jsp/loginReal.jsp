<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page language="java" import="java.util.*,com.fintech.modules.common.util.ObtainPropertiesInfo" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = path+"/";
%>
 
<link rel="icon" href="<%=basePath%>images/fa.ico"/> 

<html style="overflow:hidden;">
<head lang="en" style="overflow:hidden;">
    <meta charset="UTF-8">
    <title><%=ObtainPropertiesInfo.getValByKey("app.name") %>用户登录</title>
    <link rel="stylesheet" href="<%=basePath%>css/login/login.css">
	<style>.error{color:red;}</style>
	<script src="<%=basePath %>js/threeJs/jquery/jquery.js"></script>
	<script type="text/javascript" src="<%=basePath %>js/threeJs/cryptojs/rc4.js"></script>
    <script type="text/javascript" src="<%=basePath %>js/threeJs/cryptojs/mode-ecb.js"></script>
    <script type="text/javascript" src="<%=basePath %>js/threeJs/cryptojs/messagehash.js"></script>
    
</head>
 

<body>
	<div class="bg_banner">
		<div class="login_logo"><%=ObtainPropertiesInfo.getValByKey("app.name") %></div>
	</div>
	<div class="container">
		<div style="top: 50%; margin-top: -160px; position: absolute; width: 100%;">
			<form action="<%=basePath %>/user/login" method="post" id="loginForm">
				<div class="cardNumber user">
					<input input type="text" id="username" name="username" class="txt" placeholder="请输入用户名"  >
					<label></label>
				</div>
				<div class="cardNumber pwd">
					<input input type="password" id="pwd" name="password" class="txt" placeholder="请输入登录密码">
					<label></label>
					
					<input input type="hidden" id="ismulpwd" name="ismulpwd" value="chenGnag1" >
				</div>
				<label style="color:red;" id="msgbox">${errorInfo }</label>
				<a href="javascript:void(0)" class="btn_login"  onclick="checkAndSub()">登录</a>
				
			</form>
		</div>
	</div>
	<footer>
		<ul>
			<li>
				<span>系统信息</span>
				<p>当前浏览器：建议IE9+、Chrome、Firefox</p>
				<p>当前分辨率：建议1920</p>
				<p>版本信息更新记录</p>
			</li>
			<li>
				<span>工作时间</span>
				<p>工作日(9:00-18:00)</p>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
			</li>
			<li>
				<span>捷越联合信息咨询有限公司 </span>
				<p>电话：010-52327119</p>
				<p>邮箱：itsport@jieyuechina.com</p>
				<p>网址： www.jieyuechina.com</p>
			</li>
		</ul>
	</footer>
</body>

<script >
    var user=document.getElementById("username");
    user.onfocus=function(){if(this.value==this.defaultValue)this.value=''};
    user.onblur=function (){if(/^\s*$/.test(this.value)){this.value=this.defaultValue;this.style.color='#b3b3b3'}}
    user.onkeydown=function(){this.style.color='#000'}
    var pwd=document.getElementById("pwd");
    pwd.onfocus=function(){if(this.value==this.defaultValue)this.value=''};
    pwd.onblur=function (){if(/^\s*$/.test(this.value)){this.value=this.defaultValue;this.style.color='#b3b3b3'}}
    pwd.onkeydown=function(){this.style.color='#000'}
    
function get_os() {  
      var sUserAgent =navigator.userAgent;  
      var isWin = (navigator.platform =="Win32") || (navigator.platform == "Windows");  
      var isMac = (navigator.platform =="Mac68K") || (navigator.platform == "MacPPC") ||(navigator.platform == "Macintosh") || (navigator.platform =="MacIntel");
      if (isMac) return "Mac";  
      var isUnix = (navigator.platform =="X11") && !isWin && !isMac;  
      if (isUnix) return "Unix";  
      var isLinux =(String(navigator.platform).indexOf("Linux") > -1);  
      if (isLinux) return"Linux";  
      if (isWin) {  
             var isWin2K =sUserAgent.indexOf("Windows NT 5.0") > -1 ||sUserAgent.indexOf("Windows 2000") > -1;  
             if (isWin2K) return"Win2000";  
             var isWinXP =sUserAgent.indexOf("Windows NT 5.1") > -1 ||sUserAgent.indexOf("Windows XP") > -1;  
             if (isWinXP) return"WinXP";  
             var isWin2003 =sUserAgent.indexOf("Windows NT 5.2") > -1 ||sUserAgent.indexOf("Windows 2003") > -1;  
             if (isWin2003) return"Win2003";
             var isWinVista=sUserAgent.indexOf("Windows NT 6.0") > -1 ||sUserAgent.indexOf("Windows Vista") > -1;  
             if (isWinVista) return"WinVista";
             var isWin7 =sUserAgent.indexOf("Windows NT 6.1") > -1 || sUserAgent.indexOf("Windows7") > -1;  
             if (isWin7) return"Win7";
      }  
      return "other";  
}  
  
function getServerIp(){
	<%
	String ip = request.getHeader("x-forwarded-for"); 
	if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
	ip = request.getHeader("Proxy-Client-IP"); 
	} 
	if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
	ip = request.getHeader("WL-Proxy-Client-IP"); 
	} 
	if(ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) { 
	ip = request.getRemoteAddr(); 
	} 
	 
	%>
	return "<%=ip%>";
}
 
function getBrowser()  
{  
     var Sys = {};
     var ua = navigator.userAgent.toLowerCase();
     var s;
     (s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
     (s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
     (s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
     (s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
     (s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;
     if (Sys.ie) {
        return "ie-"+Sys.ie;
     }
     else if (Sys.firefox) {
        return "firefox-"+Sys.firefox;
     }
     else if (Sys.chrome) {
        return "chrome-"+Sys.chrome;
     }
     else if (Sys.opera) {
        return "opera-"+Sys.opera;
     }
     else if (Sys.safari) {
        return "safari-"+Sys.safari;
     }
     else {
        return "无法检测浏览器信息"
     }
}  
(function(){
	var screenXY= window.screen.height+ "&nbsp;*&nbsp;"+window.screen.width ; 
	var os=get_os();
	var browser=getBrowser();
	var serverIp=getServerIp();
	//alert(screenXY+"---"+os+"----"+browser+"----"+serverIp);
})();
	//禁用浏览器回退按钮
    window.history.forward(1);
</script>
<script type="text/javascript">
var ACCESS_MODIFY_PWD = '<a id="modifyPWDA" href="<%=basePath %>sysUserPassWord/toModifyPassWord" target="_blank" >修改密码</a>';

function checkAndSub(){
	//对用户名空格进行处理
    var username = $.trim($("#username").val());
    $("#username").val(username);
    var pwd = $.trim($("#pwd").val());
    $("#pwd").val(pwd);
	if($("#username").val() == '' || $("#username").val() == '用户名'){
		$("#msgbox").text("用户名必须填写");
		return;
	}
	
	if($("#pwd").val() == '' || $("#pwd").val() == '密码'){
		
		$("#msgbox").text("密码必须填写");
		return;
	}
	
	//校验密码复杂度
	var msg = checkPass($("#pwd").val());
	if(msg !=""){
		$("#msgbox").html(msg + ACCESS_MODIFY_PWD);
		var _vHREF= $("#modifyPWDA").attr("href");
		 _vHREF=_vHREF+'?username='+$("#username").val();
		 $("#modifyPWDA").attr("href",_vHREF);
		return;
	}
	var key="qhcjr01234567890";
   	//对密码进行加密处理
   	var encryptPwd = encryptAes(pwd,key);
   	//console.log("key:"+key);
   	//console.log("encryptPwd:"+encryptPwd);
   	//alert(encryptPwd);
   	$("#pwd").val(encryptPwd);
    	
	//提交form表单
	document.getElementById('loginForm').submit();
}
//校验密码复杂度
function checkPass(s){ 																																																																																																												
   var _warnMsg = "密码不少于8位且应包含字母数字大小写";
   var cun = 0;
   if(s.length >= 8) cun++;
   
   if(s.match(/([a-z])+/)) cun++;
   if(s.match(/([0-9])+/)) cun++;
   if(s.match(/([A-Z])+/)) cun++;
   
   //特殊字符控制
   //if(s.match(/[^a-zA-Z0-9]+/)) cun++;
   if(cun != 4){
 	  return _warnMsg;
   }else{
 	  return "";
   }
}

//禁用 backspace回退键
window.onload=function(){
	
	//禁止后退键 作用于Firefox、Opera
	document.onkeypress=banBackSpace;
	//禁止后退键  作用于IE、Chrome
	document.onkeydown=banBackSpaceAndSubmit;
}
function banBackSpaceAndSubmit(event){
	var e = event ? event :(window.event ? window.event : null);
	if(e.keyCode==13){
		//回车键的键值为13    
		checkAndSub();
    }
	return banBackSpace(e);
}
function banBackSpace(event){
	
		var ev = event ? event :(window.event ? window.event : null);
		//获取事件对象
		var elem =  ev.target || ev.srcElement;//获取事件源
		
		if(ev.keyCode==8){//判断按键为backSpace键
		
				//获取按键按下时光标做指向的element
				//var elem = ev.srcElement || ev.currentTarget; 
				
				//判断是否需要阻止按下键盘的事件默认传递
				var name = elem.nodeName;
				
				if(name!='INPUT' && name!='TEXTAREA'){
					return _stopIt(ev);
				}
				var type_e = elem.type.toUpperCase();
				if(name=='INPUT' && (type_e!='TEXT' && type_e!='TEXTAREA' && type_e!='PASSWORD' && type_e!='FILE')){
						return _stopIt(ev);
				}
				if(name=='INPUT' && (elem.readOnly==true || elem.disabled ==true)){
						return _stopIt(ev);
				}
			}
		}

function _stopIt(e){
		if(e.returnValue){
			e.returnValue = false ;
		}
		if(e.preventDefault ){
			e.preventDefault();
		}				

		return false;
}

</script>
</html>