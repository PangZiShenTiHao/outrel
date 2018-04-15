<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/component/jbpm/jbpmCommon.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>发起流程</title>
<script type="text/javascript" src="${basePath1}component/jbpm/scripts/jquery-1.7.2.min.js"></script>
 <link href="${basePath1}component/jbpm/css/validationEngine.jquery.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="${basePath1}component/jbpm/scripts/jquery.validationEngine.min.js"></script>
<script type='text/javascript' src='jbpmjs.js'></script>
  </head>
  
  <body style="background-color:#FFFFFF">
  <br/>
    <fieldset >
<legend>发起流程</legend>
<br/>
<form action="" name="newsForm" id="newsForm" method="post">

<table width="96%" border="0" align="center" >
<!-- 展示显示的字段信息 -->
<tr>
<td align="right" nowrap class="tubiao2"> 发起人 ：</td>
  <td align="left" > 
 <input type="text" class="validate[required]" maxlength="10" id="nameInfo" name="nameInfo" value="" onclick="_selectPartner()" />
  <input type="hidden"  maxlength="50" id="dtoparamUserId" name="paramUserId" value="" />
  </td>
  
  <td align="right" nowrap class="tubiao2"> 流程编码 ：</td>
  <td align="left" > 
  <input type="text" class="validate[required]" readonly="readonly"  id="dtoprocessKey" name="dto.processKey" value="<%=StringUtilTools.filterSpecial(request,"dto.processKey")%>" />
  </td>
  <td align="right" nowrap > 流程流转方向 ：</td>
  <td align="left" > 
  	<select id="dotturnDirection" name="dto.turnDirection"  style="width:150px;">
			<option value="">--默认--</option>
    </select>
  </td>
  
</tr>
<tr>
<td align="right" nowrap > 其他参数信息 ：</td>
  <td align="left" colspan="5"> 
  <textarea class="validate[maxSize[500]]" id="dtootherParamJavaCode" name="otherParamJavaCode" rows="2" cols="80" title='if(5==5){java.util.Map map = new java.util.HashMap(); map.put(\"A\",\"good\");System.out.println(map);return map;};' >java.util.Map map = new java.util.HashMap(); map.put("owner","-1");map.put("manager","2");map.put("boss","1");map.put("day","4");map.put("result", "to");System.out.println(map);return map;</textarea>
   </td>
  
</tr>



<tr><td align="center" colspan="6" > &nbsp;</td></tr>
<tr>
  <td align="center" colspan="6" class="my_buttons">
        <input id="saveBtn" type="button" value="发起流程" onclick="startNewProcess()" />
        <input id="saveBtn" type="button" value="模拟业务发起流程" onclick="startNewBizProcess()" />
        
        <input id="restBtn" type="button" value="关闭" onclick="closeWindow()" />
  </td>
</tr>
</table>

</form>

</fieldset>

<br/>
<script type="text/javascript">
$(document).ready(function(){
//注册校验事件
	$("#newsForm").validationEngine({scroll:false,focusFirstField:false,promptPosition:'topLeft'});
});


//发起新的流程
//通过ajax发起流程 
function startNewProcess(){
	var v_boolean = $("#newsForm").validationEngine("validate");
	//判断是否全部校验通过了
	if(v_boolean){
		 //调用ajax开始调用 后台请求
		var timestamp = (new Date()).valueOf();
		$.ajax({
		type:"POST",
		async:false, 
		url:"${basePath1}startProcess.do?timestamp="+timestamp,
		//data:{operateOfAction:$("#dtotableName").val()},
		data:$("#newsForm").serialize(),//提交的表单信息
		success: function(data){
			alert(data);
			closeWindow();
			}
		});	

	}
}
//模拟业务发起流程
function startNewBizProcess(){
	var v_boolean = $("#newsForm").validationEngine("validate");
	//判断是否全部校验通过了
	if(v_boolean){
		 //调用ajax开始调用 后台请求
		var timestamp = (new Date()).valueOf();
		$.ajax({
		type:"POST",
		async:false, 
		url:"${basePath1}startNewBizProcess.do?timestamp="+timestamp,
		data:$("#newsForm").serialize(),//提交的表单信息
		success: function(data){
			alert(data);
			closeWindow();
			}
		});	

	}
}
function closeWindow(){
var api = frameElement.api, W = api.opener;
	 //获取父页面的值
	 api.close();
	 //调用父页面查询 关闭时刷新父页面
	 W.queryData();
}

</script>
  </body>
</html>
