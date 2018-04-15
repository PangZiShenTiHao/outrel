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
<form id="addNewsFormData" name="addNewsFormData" isCheck="true" enctype="multipart/form-data" action="<%=basePath%>/sysStragy/updateSysStragy">
 <input type="hidden" class="text" id="dtounits" name="units"  />
 <table id="addNewsTableId" class="formTableSwap" border="0" align="center" cellpadding="0" cellspacing="1" >
<tr>
  <th> 登录错误次数 ：</th>
  <td > 
  <input type="text" class="text" id="dtopwdMaxFailure" name="pwdMaxFailure" notNull="true" maxLength="25" value="${dto.pwdMaxFailure}" />
  (达到错误次数上限,账号锁定)
  </td>
  <th> 密码有效期：</th>
  <td > 
  <input type="text" class="text" id="dtopwdMaxAgeInput" name="pwdMaxAgeInput" notNull="true" maxLength="50" value="${dto.pwdMaxAgeShow}" />
  <input type="hidden" class="text" id="dtopwdMaxAge" name="pwdMaxAge" notNull="true" maxLength="50" value="" />
  <select id="dtopwdMaxAgeSelect" name="pwdMaxAgeSelect" style="width:20px">
	  <option value="S" <c:if test="${dto.pwdMaxAgeUnit == 'S'}">selected</c:if> >秒</option>
	  <option value="M" <c:if test="${dto.pwdMaxAgeUnit == 'M'}">selected</c:if> >分</option>
	  <option value="H" <c:if test="${dto.pwdMaxAgeUnit == 'H'}">selected</c:if> >小时</option>
	  <option value="D" <c:if test="${dto.pwdMaxAgeUnit == 'D'}">selected</c:if> >天</option>
  </select>
  </td>

<tr>
   <th>密码复杂度 ：</th>
  <td colspan="3"> 
  <input type="text" class="text" style="width:350px" id="dtopwdQuality" name="pwdQuality" notNull="true"  value="${dto.pwdQuality}" />
  (正则表达式)
  </td>
</tr>
<tr>
  <th> 登录失败记录复位 ：</th>
  <td > 
  <input type="text" class="text" id="dtopwdFailureCountIntervalInput" name="pwdFailureCountIntervalInput" notNull="true" maxLength="50" value="${dto.pwdFailureCountIntervalShow}" />
  <input type="hidden" class="text" id="dtopwdFailureCountInterval" name="pwdFailureCountInterval" notNull="true" maxLength="50"  />
  <select id="dtopwdFailureCountIntervalSelect" name="pwdFailureCountIntervalSelect" style="width:20px">
	  <option value="S" <c:if test="${dto.pwdFailureCountIntervalUnit == 'S'}">selected</c:if> >秒</option>
	  <option value="M" <c:if test="${dto.pwdFailureCountIntervalUnit == 'M'}">selected</c:if> >分</option>
	  <option value="H" <c:if test="${dto.pwdFailureCountIntervalUnit == 'H'}">selected</c:if> >小时</option>
	  <option value="D" <c:if test="${dto.pwdFailureCountIntervalUnit == 'D'}">selected</c:if> >天</option>
  </select>
  </td>
   <th> 初始密码必须修改 ：</th>
  <td > 
  <input type="checkbox" id="pwdMustChangeCheck" name="pwdMustChangeCheck" value="TRUE" <c:if test="${dto.pwdMustChange == 'TRUE'}">checked</c:if> >
  <input type="hidden" id="pwdMustChange" name="pwdMustChange" value="">
  </td>
</tr>
<tr>
<th> 密码自动解锁 ：</th>
  <td > 
  <input type="text" class="text" id="dtopwdLockoutDurationInput" name="pwdLockoutDurationInput" notNull="true" maxLength="50" value="${dto.pwdLockoutDurationShow}" />
  <input type="hidden" class="text" id="dtopwdLockoutDuration" name="pwdLockoutDuration" notNull="true" maxLength="50"  />
  <select id="dtopwdLockoutDurationSelect" name="pwdLockoutDurationSelect" style="width:20px">
	  <option value="S" <c:if test="${dto.pwdLockoutDurationUnit == 'S'}">selected</c:if> >秒</option>
	  <option value="M" <c:if test="${dto.pwdLockoutDurationUnit == 'M'}">selected</c:if> >分</option>
	  <option value="H" <c:if test="${dto.pwdLockoutDurationUnit == 'H'}">selected</c:if> >小时</option>
	  <option value="D" <c:if test="${dto.pwdLockoutDurationUnit == 'D'}">selected</c:if> >天</option>
  </select>
  </td>
  <th> 密码历史记录 ：</th>
  <td > 
  <input type="text" class="text" id="dtopwdInHistory" name="pwdInHistory" notNull="true" maxLength="50" value="${dto.pwdInHistory}" />
      值大于0,则新修改密码不能与历史记录相同
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
   //计算各个输入框最终秒数 
   function calTimeSet(element){
	   var destinationObj = "#"+element;
	   var destinationSelect = "#"+element+"Select";//取得单位
	   var destinationInput = "#"+element+"Input";//取得输入框内容
	   var selectedVal = $(destinationSelect).val();
	   var inputVal = $(destinationInput).val();
	   var result = inputVal;
	   var returnUnit = "S";
	   if(selectedVal == "M"){//分钟
		   result = inputVal*60;
		   returnUnit = "M";
	   }
	   if(selectedVal == "H"){//小时
		   result = inputVal*60*60;
		   returnUnit = "H";
	   }
	   if(selectedVal == "D"){//天
		   result = inputVal*60*60*24;
		   returnUnit = "D";
	   }
	   
	   $(destinationObj).val(result);
	   return returnUnit;
	   
   }
 //页面的保存操作
   function saveConfig(){
   	if(!checkform("#addNewsFormData").form()) return; 
   	//判断密码必须修改是否选中
   	var checkTag = $("input[name='pwdMustChangeCheck']:checked").val();
   	if(checkTag == "TRUE"){
   		$("#pwdMustChange").val("TRUE");
   	}else{
   		$("#pwdMustChange").val("FALSE");
   	}
   	//重新计算各个输入框时间设置
   	var dtopwdMaxAgeUnit = calTimeSet("dtopwdMaxAge");
   	var dtopwdFailureCountIntervalUnit = calTimeSet("dtopwdFailureCountInterval");
   	var dtopwdLockoutDurationUnit = calTimeSet("dtopwdLockoutDuration");
   	//计算单位字段
   	$("#dtounits").val(dtopwdFailureCountIntervalUnit+"|"+dtopwdLockoutDurationUnit+"|"+dtopwdMaxAgeUnit);
   	//序列化 新增页面的form表单数据
   	var params=$("#addNewsFormData").serialize();
   	var url=contextRootPath+'/sysStragy/updateSysStragy';
   	//通过ajax保存
   	jyAjax(
   		url,
   		params,
   		function(msg){
   			//新增成功后，
   			$("").newMsg({}).show(msg.msg);;
   			
   			
     	});
   }
   function checkform(formid){
		return $(formid).validate({rules:newFormrules,messages:newFormMessages,success:jySuccess,errorPlacement:jyErrorPlacement,highlight:jyHighlight});
	}
   
 //表单规则,通常添加与修改表单页面的规则一致,仅当不一致时,再重新定义
   var newFormrules={
	pwdMaxFailure: {
   		
   		digits:true
   	},
   	pwdMaxAge:{
   		digits:true
   	},
   	pwdLockoutDuration:{
   		digits:true
   	},
   	pwdFailureCountInterval:{
   		digits:true
   	}
 
   }
   //表单提示信息,通常添加与修改表单页面的规则一致,仅当不一致时,再重新定义
   var newFormMessages = {
		   pwdMaxFailure: {
		   		
		   		digits:"必须填写数字"
		   	},
		   	pwdMaxAge:{
		   		digits:"必须填写数字"
		   	},
		   	pwdLockoutDuration:{
		   		digits:"必须填写数字"
		   	},
		   	pwdFailureCountInterval:{
		   		digits:"必须填写数字"
		   	}
   }
</script>
  
</html>
