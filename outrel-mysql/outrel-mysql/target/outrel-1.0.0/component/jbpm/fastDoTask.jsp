<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/component/jbpm/jbpmCommon.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>快速处理待办任务</title>
<link href="${basePath }css/style.css" rel="stylesheet" type="text/css">
   <%-- 引入dwr js --%>
   <script type='text/javascript' src='${basePath }dwr/engine.js'></script>
   <script type='text/javascript' src='${basePath }dwr/util.js'></script>
   <script type='text/javascript' src='${basePath }dwr/interface/JbpmServiceImpl.js'></script>
   
   
   <script type='text/javascript' src='jbpmjs.js'></script>
  </head>
  
  <body style="background-color:#FFFFFF">
  <br/>
    <fieldset class="search_fieldset2 mag_top">
<legend>快速处理待办任务</legend>
<br/>
<form action="${basePath }fastDoTask.do" name="newsForm" id="newsForm" method="post" >

<table width="96%" border="0" align="center" >
<!-- 展示显示的字段信息 -->
<tr>
<td align="right" nowrap class="tubiao2"> 指定参与者 ：</td>
  <td align="left" > 
  <input type="text" class="validate[required] input_hui" title="点击查询图片选择参与者" readonly="readonly"  maxlength="10" id="nameInfo" name="nameInfo" value="" />
  <input type="hidden"  maxlength="50" id="dtoparamUserId" name="paramUserId" value="" />
  <img src="${basePath1}images/soso_btn.gif" title="点击选择参与者" onclick="selectPartner()"></img>
  </td>
  
  <td align="right" nowrap class="tubiao2"> 任务ID ：</td>
  <td align="left" > 
  <input type="text" class="validate[required] input_hui" readonly="readonly"   id="dtotaskId" name="taskId" value="<%=StringUtilTools.filterSpecial(request,"taskId")%>" />
  </td>
  <td align="right" nowrap > 目标节点 ：</td>
  <td align="left" > 
  	<select id="dtoturnDirection" name="turnDirection"  style="width:150px;">
			<option value="">--默认--</option>
    </select>
  </td>
  
</tr>
<tr>
<td align="right" nowrap > 其他参数信息 ：</td>
  <td align="left" colspan="5">
	     <textarea class="validate[maxSize[500]] input_hui" readonly="readonly"  id="dtootherParamJavaCode" name="otherParamJavaCode" rows="2" cols="50" title='' >java.util.Map map = new java.util.HashMap(); map.put("owner","-1");map.put("manager","2");map.put("boss","1");map.put("day","4");map.put("result", "to");System.out.println(map);return map;</textarea>
   
   <input type="hidden"  id="processInsId" name="processInsId" value="<c:out value="${param.processInsId}" />" />
   <input type="hidden"  id="acitityName" name="acitityName" value="<c:out value="${param.acitityName}" />" />
   </td>
  
</tr>



<tr><td align="center" colspan="6" > &nbsp;</td></tr>
<tr>
  <td align="center" colspan="6" class="my_buttons">
        <input id="saveBtn" name="myProButn" type="button" value="提交" onclick="subTask()" />
        <input id="restBtn" name="myProButn" type="button" value="关闭" onclick="closeWindow()" />
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
	
	toDoTurnDirection();
});


//提交 执行 待办任务
function subTask(){
	var v_boolean = $("#newsForm").validationEngine("validate");
	//判断是否全部校验通过了
	if(v_boolean){
		if(confirm("您确定要执行待办任务吗？")){
			$("[name^='myProButn']").attr("disabled",true);
			document.newsForm.submit();
		}
	}
}

function closeWindow(){
var api = frameElement.api, W = api.opener;
	 //获取父页面的值
	 api.close();
	 //调用父页面查询 关闭时刷新父页面
	 W.queryData();
}


//流转方向下拉框
function toDoTurnDirection(){
//流转方向下拉框 通过dwr 查询出来进行显示
	var destActNames = "";
	//DWR设置同步：
	dwr.engine.setAsync(false);
	JbpmServiceImpl.getAllProcNodeName('<c:out value="${param.processInsId}" />',function(data){
		destActNames = eval('(' + data + ')');
	});
	//DWR设置异步：
	dwr.engine.setAsync(true);
	
	$obj = $("#dtoturnDirection");
	var option = '';//'<option value="" selected="selected" >---默认---</option>';
	$obj.empty();
	//$obj.append(option);
	
	for(var i = 0 ; i< destActNames.length ; i++){
		if(destActNames[i].destName == ""){
			option = '<option value="'+destActNames[i].destName+'" title="默认">默认</option>';
		}else{
			option = '<option value="'+destActNames[i].destName+'" title="'+destActNames[i].destName+'" id="'+destActNames[i].destName+'">'+destActNames[i].destName+'</option>';
		}
		$obj.append(option);
	}

}
</script>



  </body>
</html>
