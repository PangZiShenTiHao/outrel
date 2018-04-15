<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJspTaglib.jsp" %>
   <script src="${basePath}js/threeJs/validate/jquery.validate.min.js"></script>
   <script src="${basePath}js/threeJs/validate/messages_zh.min.js"></script>
   <script src="${basePath}js/threeJs/validate/jquery.validate.extend.handler.js"></script>
   <link rel="stylesheet" href="${basePath}js/threeJs/validate/validate.css">
   <title>同步用户密码</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   <style type="text/css">
   	.emcls{color:red}
   </style>
   <script type="text/javascript">
   		//新增页面的保存操作
	function doSynFrom(){
		//序列化 新增页面的form表单数据
		var params=$("#addNewsFormData").serialize();
		var userIds = $("#userIds").val();
		if(userIds==''){
			jyDialog({"type":"warn"}).alert("请按照操作提示输入用户ID!");
			return;
		}
		var pwd = $("#pwd").val();
		if(pwd==''){
			jyDialog({"type":"warn"}).alert("请输入初始化密码!");
			return;
		}
		var url=contextRootPath+'/sysUserPassWord/updateUserPWDInit';
		//通过ajax保存
		jyAjax(
			url,
			params,
			function(msg){
				//修改成功后，
				//$("").newMsg({}).show(msg.msg);
				var v_status = msg.status;
	        	if(v_status.indexOf('ok') >-1){
	        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
	        		//queryData();
	        		//loadUserList($('#orgId').val());
	        		if(msg.msg==""){
	        			$("").newMsg({}).show("初始化密码完成");
	        		}else{
	        			$("#datas").html(msg.msg);
	        		}
	        	}
	  	});
	}
	</script>
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="addNewsFormData" name="addNewsFormData" isCheck="true" action="com.fintech.modules.platform.sysorg.controller.SysLdapSynController">
 <table id="addNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
 <tr>
 	<th colspan="4" class="text" style="text-align:center;">初始化密码</th>
 </tr>
<tr>
  <tr>
  <th>员工ID:</th>
  <td colspan="3"> 
  	 <textarea class="text" id="userIds" name="userIds" wrap="PHYSICAL" Null="true" rows="3" cols="75"></textarea>
  </td>
</tr>
<tr>
  <tr>
  <th>初始化密码:</th>
  <td colspan="3"> 
  	<input type="text" class="text" id="pwd" name="pwd" notNull="true" maxLength="25" value="" />
  </td>
</tr>
<tr>
  <th>操作提示:</th>
  <td colspan="3"> 
  	<font color="red">员工ID之间请用","连接;例如:1000001000001,1000001000002,1000001000003</font>
  </td>
</tr>
<tr>
  <tr>
  <th></th>
  <td colspan="3" > 
  	<div id="datas" style="text-align:left"></div>
  </td>
</tr>
</table>

<!-- 保存 关闭 按钮 在 查询页面进行控制 -->  
</form>

</div>

<div class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix">
	<div class="ui-dialog-buttonset" style="text-align:center">
		<button class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" style="margin:20px auto" type="button" onclick="doSynFrom();">
			<span class="ui-button-text">保存</span>
		</button>
		<button class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" style="margin:20px auto" type="button" onclick="loadUserList($('#orgId').val());">
			<span class="ui-button-text">返回</span>
		</button>
	</div>
</div>


</body>

<script type="text/javascript">
   $(document).ready(function(){
	   checkform("#addNewsFormData");//校验
	});
</script>
  
</html>
