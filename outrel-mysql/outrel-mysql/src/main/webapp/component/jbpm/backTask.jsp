<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
  <head>
  <%@ include file="/component/jbpm/jbpmCommon.jsp" %>
  <%@ include file="/common/StaticJavascript.jsp" %>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>回退待办任务</title>
  <script type="text/javascript" src="${basePath}component/jbpm/scripts/jquery-1.7.2.min.js"></script>
<link type="text/css" rel="stylesheet" href="${basePath}component/jbpm/css/validationEngine.jquery.css"   />
<script type="text/javascript" src="${basePath}component/jbpm/scripts/jquery.validationEngine.min.js"></script>
  </head>
  
  <body style="background-color:#FFFFFF">
  <br/>
    <fieldset class="search_fieldset">
<legend>回退信息</legend>
<br/>
<form action="" name="newsForm" id="newsForm" method="post" >

<table width="96%" border="0" align="center" >
<!-- 展示显示的字段信息 -->
<tr>
  <td align="right" nowrap class="needRequired"> 任务ID ：</td>
  <td align="left" > 
  <input type="text" class="validate[required] input_hui" readonly="readonly"   id="dtotaskId" name="taskId" value="<%=StringUtilTools.filterSpecial(request,"taskId")%>" />
  <input type="hidden" id="processInstanceId" name="processInsId" value="${param.processInsId}" />
  <input type="hidden" id="oldUserId" name="oldUserId" value="" />
  </td>
  <td align="right" nowrap title="仅显示历史执行过，且可以回退到的任务节点名称" class="needRequired"> 回退的目标任务节点 ：</td>
  <td align="left" > 
  	<select id="dtoturnDirection" name="turnDirection"  style="width:150px;" class="validate[required]" >
			<option value="">--默认--</option>
    </select>
  </td>
</tr>

<tr><td align="center" colspan="4" > &nbsp;</td></tr>
<tr>
  <td align="center" colspan="4" class="my_buttons">
        <input id="saveBtn" type="button" value="提交" onclick="subTask()" />
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
	
	toDoTurnDirection();
});


//提交 执行 待办任务
function subTask(){
	var v_boolean = $("#newsForm").validationEngine("validate");
	//判断是否全部校验通过了
	if(v_boolean){
		if(confirm("您确定要回退该任务吗？")){
			$("#saveBtn").attr("disabled",true);
			$.ajax({
				type:"POST",
				dataType:"JSON",
				url:contextRootPath+"/workFlowTask/backTaskToDesc.do",
				data:$("#newsForm").serialize(),
				success:function(msg){
					alert(msg.msg);
		            var v_status = msg.status;
					//操作成功后
					if(v_status.indexOf('ok')>-1){
						//关闭页面 并刷新
						closeWindow();
					}
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
//流转方向下拉框 通过dwr 查询出来进行显示
	var destActNames = "";
	//流转方向下拉框 通过ajax 查询出来进行显示
	$.ajax({
		url: contextRootPath+'/workFlowProvider/getIncomingTransitions.do',
		type: 'POST',
		async:false,
		data:{proInstanceId:'<c:out value="${param.processInsId}" />',activeName:'<c:out value="${param.acitityName}" />'},
		//dataType: 'json',
		error: function(){alert('error');},
		success: function(data){
			destActNames = eval('(' + data + ')');
			}
		});
	
	$obj = $("#dtoturnDirection");
	var option = '';//'<option value="" selected="selected" >---默认---</option>';
	$obj.empty();
	var hasValue = '0';
	for(var i = 0 ; i< destActNames.length ; i++){
		var v_his = destActNames[i].isHis;//是否 执行过历史任务 Y：是，N:否
		var v_hisOwner = destActNames[i].hisOwner;//执行历史任务的参与者ID ，-1 标志待分配、
		if("N" == v_his) continue;
		
		if(destActNames[i].destName == ""){
			option = '<option value="'+destActNames[i].destName+'" title="默认">默认</option>';
		}else{
			option = '<option value="'+destActNames[i].destName+'" title="'+destActNames[i].destName+'" id="'+destActNames[i].destName+'">'+destActNames[i].destName+'</option>';
			hasValue = '1';
		}
		$obj.append(option);
		//if("-1" != v_hisOwner) 
		//如果有值 说明可以回退
		$("#oldUserId").val(v_hisOwner);
		//break; //暂时只取 一个
	}
	if(hasValue == '0'){
		$("#dtoturnDirection").attr("disabled","disabled");  
		$("#dtoturnDirection").addClass("input_hui");
	}

}
</script>



  </body>
</html>
