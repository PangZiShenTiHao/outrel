<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
   <%@ include file="/common/StaticJavascript.jsp" %>
   <title>安全策略配置</title>
   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   <script src="${basePath}js/threeJs/validate/jquery.validate.min.js"></script>
   <script src="${basePath}js/threeJs/validate/messages_zh.min.js"></script>
   <script src="${basePath}js/threeJs/validate/jquery.validate.extend.handler.js"></script>
   <link rel="stylesheet" href="${basePath}js/threeJs/validate/validate.css">
</head>
  
<body style="background-color:#FFFFFF">
<div id="formPageSwap">
  <br/>
<form id="addNewsFormData" name="addNewsFormData" isCheck="true" enctype="multipart/form-data" action="<%=basePath%>/sysStragy/unlock">
 <table id="addNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 用户登录名 ：</th>
  <td > 
  <input type="text" class="text" id="dtologinName" name="loginName" notNull="true" maxLength="25" value="" />
  仅解锁用户输入次数达到限制,系统自动锁定的账户
  </td>
</tr>


  </table>
<div align="center" class="expandToolbar">
	<button onclick="saveConfig();return false;" class="ui-button ui-widget ui-state-default ui-corner-all " role="button"><span class="ui-button-text" style="padding:5px 10px 5px 10px;">确认</span></button>
</div>
</form>
</div>
</body>

<script type="text/javascript">
  
 //页面的保存操作
   function saveConfig(){
   	if(!checkform("#addNewsFormData").form()) return; 
   	//序列化 新增页面的form表单数据
   	var params=$("#addNewsFormData").serialize();
   	var url=contextRootPath+'/sysStragy/unlock';
   	//通过ajax保存
   	jyAjax(
   		url,
   		params,
   		function(msg){
   			//新增成功后，
   			$("").newMsg({}).show(msg.msg);;
   			$("#dtologinName").val("");
   			
     	});
   }
   function checkform(formid){
		return $(formid).validate({rules:newFormrules,messages:newFormMessages,success:jySuccess,errorPlacement:jyErrorPlacement,highlight:jyHighlight});
	}
   
 //表单规则,通常添加与修改表单页面的规则一致,仅当不一致时,再重新定义
   var newFormrules={
	loginName: {
   		required: true,
   		minlength: 3,
   		maxlength: 50
   	}
   }
   //表单提示信息,通常添加与修改表单页面的规则一致,仅当不一致时,再重新定义
   var newFormMessages = {
	loginName: {
   		required: "登录用户名必须填写",
   		minlength: "登录用户名至少输入{0}个字符",
   		maxlength: "登录用户名最多输入{0}个字符"
   	}
   }
</script>
  
</html>
