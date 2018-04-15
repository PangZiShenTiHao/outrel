<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/WEB-INF/tlds/app.tld" prefix="app"%>
<%@ taglib uri="/WEB-INF/tlds/ababoon.tld" prefix="ababoon"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
  <head>
  <%@ include file="/component/jbpm/jbpmCommon.jsp" %>
   <%@ include file="/common/StaticJavascript.jsp" %>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>控制台执行待办任务</title>
<script type="text/javascript" src="${basePath1}component/jbpm/scripts/jquery-1.7.2.min.js"></script>
<link type="text/css" rel="stylesheet" href="${basePath1}component/jbpm/css/validationEngine.jquery.css"   />
<script type="text/javascript" src="${basePath1}component/jbpm/scripts/jquery.validationEngine.min.js"></script>

<script type="text/javascript" src="${basePath1}component/jbpm/dialog/lhgdialog.min.js?skin=iblue"></script>
<script type='text/javascript' src='jbpmjs.js'></script>
  </head>
  
  <body style="background-color:#FFFFFF">
  <br/>
    <fieldset class="search_fieldset">
<legend>执行待办任务</legend>
<br/>
<form action="${basePath1}executeTask2.do" name="newsForm" id="newsForm" method="post" >
<ababoon:viewRecall />
<table width="96%" border="0" align="center" >
<!-- 展示显示的字段信息 -->
<tr>
<td align="right" nowrap class="needRequired" > 指定参与者 ：</td>
  <td align="left" > 
  <input type="text" class="validate[required] input_hui" title="点击查询图片选择参与者"  maxlength="10" id="nameInfo" name="nameInfo" value=""  />
  <input type="hidden"  maxlength="50" id="dtoparamUserId" name="paramUserId" value="" />
   <input type="hidden"  maxlength="50" id="foreachJoinId" name="foreachJoin" value="N" />
   
  </td>
  
  <td align="right" nowrap class="needRequired"> 任务ID ：</td>
  <td align="left" > 
  <input type="text" class="validate[required] input_hui" readonly="readonly"  id="dtotaskId" name="taskId" value="<%=StringUtilTools.filterSpecial(request,"taskId")%>" />
  </td>
  <td align="right" nowrap > 流程流转方向 ：</td>
  <td align="left" > 
  	<select id="dtoturnDirection" name="turnDirection"  style="width:150px;">
			<option value="">--默认--</option>
    </select>
  </td>
  
</tr>


<tr>
<td align="right" nowrap > 其他参数信息 ：</td>
  <td align="left" colspan="5">
	<textarea class="validate[maxSize[500]] input_hui"  id="dtootherParamJavaCode" name="otherParamJavaCode" rows="5" cols="80" title='' >java.util.Map map = new java.util.HashMap(); map.put("owner","-1");map.put("isManager","Y");map.put("manager","2");map.put("boss","1");map.put("day","4");map.put("result", "to");System.out.println(map);return map;</textarea>
   
   <input type="hidden"  id="processInsId" name="processInsId" value="<c:out value="${param.processInsId}" />" />
   <input type="hidden"  id="acitityName" name="acitityName" value="<c:out value="${param.acitityName}" />" />
   </td>
  
</tr>



<tr><td align="center" colspan="6" > &nbsp;</td></tr>
<tr>
  <td align="center" colspan="6" class="my_buttons">
        <div id="divSubBtnId"></div>
  </td>
</tr>
</table>
</form>

</fieldset>


<ababoon:validationMessage />

<br/>
<script type="text/javascript">
$(document).ready(function(){
//注册校验事件
	$("#newsForm").validationEngine({scroll:false,focusFirstField:false,promptPosition:'topLeft'});
	
	toDoTurnDirection();
	
	
	$("[name^='myProButn']").each(function(i){
		if($(this).val().indexOf("会签") != -1){
			//如果有会签按钮 则控制出现 指定会签参与者选人的功能
			$("#foreachJoinId").val("Y");
		}
	});
});


//提交 执行 待办任务
function subTask(v_myTurn){
	var v_boolean = $("#newsForm").validationEngine("validate");
	//判断是否全部校验通过了
	if(v_boolean){
		//如果是点击非 会签操作的话，验证参与者是否是多个，此时参与者只能是一个人
		if(v_myTurn!= "" && v_myTurn.indexOf("会签") == -1 ){
			if($("#dtoparamUserId").val().indexOf(",") != -1){
				alert("非会签操作，只能选择一个参与者！");
				return;
			}
		}
		$("#dtoturnDirection").attr("value",v_myTurn);
		if(confirm("您确定要执行待办任务吗？")){
			$("[name^='myProButn']").attr("disabled",true);
			
			//document.newsForm.submit();
			$.ajax({
				type:"POST",
				async:false, 
				url:'${basePath1}executeTask.do',
				//dataType:'JSON',
				data:$("#newsForm").serialize(),
				error: function(){alert('ajax error');},
				success: function(data){
						alert(data);
						closeWindow();
					}
			});
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
	var turnDirections = "";
	//流转方向下拉框 通过ajax 查询出来进行显示
	$.ajax({
		url: '${basePath1}workFlowProvider/getAllTurenDirectory.do',
		type: 'POST',
		async:false,
		data:{processInsId:'<c:out value="${param.processInsId}" />',acitityName:'<c:out value="${param.acitityName}" />'},
		//dataType: 'json',
		error: function(){alert('error');},
		success: function(data){
				turnDirections = eval('(' + data + ')');
			}
		});
	
	
	$obj = $("#dtoturnDirection");
	var option = '';
	$obj.empty();
	for(var i = 0 ; i< turnDirections.length ; i++){
		if(turnDirections[i].turnDir == ""){
			option = '<option value="'+turnDirections[i].turnDir+'" title="默认">默认</option>';
		}else{
			option = '<option value="'+turnDirections[i].turnDir+'" title="'+turnDirections[i].turnDir+'" id="'+turnDirections[i].turnDir+'">'+turnDirections[i].turnDir+'</option>';
		}
		$obj.append(option);
		
		var myBtnName = turnDirections[i].turnDir;
		if(myBtnName == "") myBtnName ='提交';
		
		var myBtn = '<input id="saveBtn" name="myProButn" type="button" value="'+myBtnName+'" onclick="subTask(\''+myBtnName+'\')" />';
		$("#divSubBtnId").append(myBtn);
	}

 
 		$("#divSubBtnId").append('<input id="restBtn"  name="myProButn" type="button" value="关闭" onclick="closeWindow()" />');

}
</script>


  </body>
</html>
