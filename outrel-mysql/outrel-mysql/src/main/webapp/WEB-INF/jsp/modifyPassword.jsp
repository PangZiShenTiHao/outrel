<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
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
//提交表单
function submitForm(){
	//验证原始密码
	
	var loginName=$("#loginName").val();
	var oldPassWord=$("#oldPwdInput").val();
	var newPwdInput=$("#newPwdInput").val();
	var newPwdConfirm=$("#newPwdConfirm").val();
	var loginName=$("#loginName").val();
	if(loginName==null || loginName=="")
	{
		$("#message").show();
		$("#messageStr").text("登录用户名");
		return false;
	}
	if(oldPassWord==null || oldPassWord=="")
	{
		$("#message").show();
		$("#messageStr").text("请输入原始密码");
		return false;
	}
	if(newPwdInput==null || newPwdInput=="")
	{
		
		$("#message").show();
		$("#messageStr").text("请输入新密码");
		return false;
	}
	//开启修改密码复杂度校验
	var _msg = checkPass(newPwdConfirm);
	if(_msg != ""){
		$("#message").show();
		$("#messageStr").text(_msg);
		return false;
	}
	if(newPwdConfirm==null || newPwdConfirm=="")
	{
		$("#message").show();
		$("#messageStr").text("请输入确认新密码");
		return false;
	}
	
	if(oldPassWord==newPwdInput)
	{
		$("#message").show();
		$("#messageStr").text("新密码不能与旧密码一致");
		return false;
	}	
	if(newPwdInput!=newPwdConfirm)
	{
		$("#message").show();
		$("#messageStr").text("输入新密码不一致请重新输入");
		$("#newPwdInput").val("");
		$("#newPwdConfirm").val("");
		return false;
		
	}
	 $.ajax({
					type : "POST",
					dataType : "json",
					data:{oldPassWord:oldPassWord,loginName:loginName},
					url : contextRootPath
							+ "/sysUserPassWord/checkOldPassWord",			
					success : function(msg) {
						var v_status = msg.status;
						if (v_status.indexOf('ok') > -1) {
							if(newPwdInput!=null && newPwdConfirm!=null)
							{
								if(newPwdInput==newPwdConfirm)
								{
									$("#message").hide(); ;
									$("#messageStr").text("");
									$("#addNewsFormData").submit();
								}
							}
						}else{
							$("#message").show();
							$("#messageStr").text(msg.msg);
							$("#oldPwdInput").val("");
							return false;
						}
					}
		});


	
}
//重置
function resetForm(){
	//$("#loginName").val("");
	$("#oldPwdInput").val("");
	$("#newPwdInput").val("");
	$("#oldPwd").val("");
	$("#newPwd").val("");
	$("#newPwdConfirm").val("");
}
</script>	
</head>
<body>
<form id="addNewsFormData" name="addNewsFormData"  action="<%=basePath%>sysUserPassWord/modifyPassWord" method="post">
<div class="wap">
    <div class="title">
        <span class="font-bold">修改密码</span>
    </div>
    <div class="content">
        <div class="info">
            <table>
                <tr>
                    <td>登录用户名</td>
                    <td>
                        <div class="in-border"><input  type="text" id="loginName"  name="loginName" maxLength="50" value="${userName}" onblur="inComplete(this)"></div>
                    </td>
                </tr>
                <tr>
                    <td>请输入原始密码</td>
                    <td>
                        <div class="in-border"><input  type="password" id="oldPwdInput" name="oldPwdInput"  maxLength="50" onblur="inComplete(this)">
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>输入新密码</td>
                    <td>
                        <div class="in-border"><input   type="password" id="newPwdInput" name="newPwdInput"  maxLength="20" onblur="inComplete(this)"></div>
                    </td>
                </tr>
                <tr>
                    <td>确认新密码</td>
                    <td>
                        <div class="in-border"><input  type="password" id="newPwdConfirm" name="newPwdConfirm" maxLength="20"  onblur="inComplete(this)"></div>
                    </td>
                </tr>
                <tr id="message" style="display:none">
                	<td>
                	 验证提示:
                	</td>
                	<td>
                		<span id="messageStr" style="color:red" ></span>
                	</td>
                </tr>
                <tr>
                    <td></td>
                    <td >
                        <button class="btn btn-cz"  onclick="resetForm();return false">重置</button>
                        <button  class="btn btn-qr"  onclick="submitForm();return false">确认</button>
                    </td>
                </tr>
            </table>

        </div>
        <div class="des">
            <ol>
                <li>新密码必须为字母、数字、符号、大小写的组合</li>
                <li>新密码不少于8位，不大于20位</li>
                <li>新密码不可与原密码相同</li>
            </ol>

        </div>

    </div>
</div>
</form>
<script type="text/javascript">
function inComplete(obj) {
    if (obj.value.length > 0) {
        if (obj.parentNode.className == "in-border") {
            obj.parentNode.className = "in-border in-border-com";
        }
    }
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
</script>
</body>
</html>