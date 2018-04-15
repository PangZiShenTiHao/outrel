<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ page language="java" import="java.util.*,com.fintech.modules.common.util.ObtainPropertiesInfo" pageEncoding="UTF-8"%>
<%@ include file="/common/StaticJavascript.jsp"%>
<html>
<head lang="en">
   <title>平台认证中心-用户密码修改</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<style>.error,.warn{color:red;font-size:12px;margin-top:13px}
.wap {
    width: 1000px;
    height: 428px;

    margin: 85px auto;

}

.content {
    border-bottom: 1px solid #ccc;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    border-radius: 0 0 6px 6px;
    height: 390px;

}

.msg {
    position: absolute;
    top: 240px;
    left: 44%;
    margin-left: -115px;
    width: 300px;
    height: 40px;

    text-indent: 50px;
    line-height: 40px;

}

.msg.error {
    background: url("<%=basePath %>/images/error.png") top left no-repeat;
}

.msg.success {
    background: url("<%=basePath %>/images/success.png") top left no-repeat;
}

.msg a {
    color: #0c820f;
}

.title {
    background: url("<%=basePath %>/images/title-bg_03.png");
    border: 1px solid #aed0ea;
    border-radius: 6px 6px 0 0;
    height: 35px;
    line-height: 35px;

    padding-left: 15px;
}

.font-bold {
    font-weight: bold;
    font-size: 14px;
}

.des {
    float: right;
    margin-top: 130px;
    margin-right: 135px;
}

.des ol li {
    font-size: 12px;
    color: #999;
}

.info {
    float: left;
    margin-top: 60px;
    margin-left: 120px;
}

.info table td:first-child {
    text-align: right;
    padding-right: 10px;
    font-size: 12px;
    color: #666;
}

.info table td {
    height: 46px;
}

.info table td .in-border {
    border: 1px solid #f77c31;
    box-shadow: 0 0 3px #f77c31;
    border-radius: 5px;
    height: 32px;
    width: 250px;

    padding-left: 5px;

}

.info table td .in-border:hover {
    border: 1px solid #94cde2;
    box-shadow: 0px 0px 3px #94cde2;

}

.info table td .in-border-com {

    border: 1px solid #c2c2c2;
    box-shadow: none;
}

.in-border input {
    height: 28px;

    width: 240px;
    border: 0;

}

.in-border input:focus {
    outline: none;
}

.btn {
    width: 120px;
    height: 35px;
    color: #fff;
    font-size: 14px;
    margin-top: 30px;
    margin-right: 8px;
}

.btn-cz {
    border: 1px solid #4c80a7;
    background: #4c80a7;
    border-radius: 8px;
}

.btn-qr {
    border: 1px solid #60ac62;
    background: #60ac62;
    border-radius: 8px;
}
	</style>
<script type="text/javascript">
$(document).ready(function(){
	
	//设置超时时间为5秒钟
	var timeout = 5;
	function showClose() {
	    var showbox = $(".showbox");
	    showbox.html(timeout);
	    timeout--;
	    if (timeout == 0) {
	    	windowclose();
	    }
	    else {
	        setTimeout(showClose, 1000);
	    }
	}
	//showClose();
	
	//FF中需要修改配置window.close方法才能有作用，
	//用一个空白页面显示并且让后退按钮失效

	function windowclose(){
		var userAgent = navigator.userAgent;
		if (userAgent.indexOf("Firefox") != -1 || userAgent.indexOf("Presto") != -1) {
		    window.location.replace("about:blank");
		} else {
		    window.opener = null;
		    //window.open("", "_self");
		    open(location, '_self').close();
		   // window.close();
		}
	}
	
	
});

</script>	
</head>
<body >
<div class="wap">
    <div class="title">
        <span class="font-bold">修改密码</span>
    </div>
    <div class="content">
       	 <div class="msg error">
			<span class="font-bold">修改失败,请稍后重试</span><a href="<%=ObtainPropertiesInfo.getValByKey("cas.modifypwd.url") %>?username=<shiro:principal/>">重新修改</a>			
        </div>
       	 	
		<!-- 
		<div class="msg" style="top:280px"><span class="showbox"></span>秒后关闭</div>
		 -->
    </div>
</div>
</body>
</html>