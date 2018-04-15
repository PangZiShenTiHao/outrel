<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="/component/jbpm/jbpmCommon.jsp" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>跨流程处理任务</title>
<link href="${basePath }css/style.css" rel="stylesheet" type="text/css">
   <%-- 引入dwr js --%>
   
   <script type='text/javascript' src='jbpmjs.js'></script>
   <script type='text/javascript' src='${basePath }dwr/engine.js'></script>
   <script type='text/javascript' src='${basePath }dwr/util.js'></script>
   <script type='text/javascript' src='${basePath }dwr/interface/JbpmServiceImpl.js'></script>
   
  </head>
  
  <body style="background-color:#FFFFFF">
  <br/>
    <fieldset class="search_fieldset2 mag_top">
<legend>跨流程处理任务</legend>
<br/>
<form action="${basePath }toOtherProTask.do" name="newsForm" id="newsForm" method="post" >

<table width="96%" border="0" align="center" >
<!-- 展示显示的字段信息 -->
<tr>
<td align="right" nowrap class="tubiao2"> 指定参与者 ：</td>
  <td align="left" > 
  <input type="text" class="validate[required] input_hui" title="点击查询图片选择参与者" readonly="readonly"  maxlength="10" id="nameInfo" name="nameInfo" value="" />
  <input type="hidden"  maxlength="50" id="dtoparamUserId" name="paramUserId" value=""  onclick="selectPartner()" />
  </td>
  
  <td align="right" nowrap class="tubiao2"> 任务ID ：</td>
  <td align="left" > 
  <input type="text" class="validate[required] input_hui" readonly="readonly"   id="dtotaskId" name="taskId" value="<%=StringUtilTools.filterSpecial(request,"taskId")%>" />
  <input type="hidden"   id="dtomainProInsId" name="mainProInsId" value="<c:out value="${param.mainProId}" />" />
  
  
  </td>
  <td align="right" nowrap ></td>
  <td align="left" ></td>
</tr>

<tr>
  <td align="right" nowrap class="tubiao2"> 当前子流程名称 ：</td>
  <td align="left" > 
	<select id="dtocurSubProName" name="curSubProKey"  style="width:150px;" >
    </select>  
  </td>
  <td align="right" nowrap > 当前子流程节点 ：</td>
  <td align="left" > 
  	<select id="dtocurTurnDirection" name="curTurnDirection"  style="width:150px;">
			<option value="">--默认--</option>
    </select>
  </td>
   <td align="right" nowrap ></td>
  <td align="left" ></td>
  
</tr>

<tr>
  <td align="right" nowrap class="tubiao2"> 目标子流程名称 ：</td>
  <td align="left" > 
	<select id="dtosubProName" name="subProKey"  style="width:150px;" onchange="changeSubPro()">
    </select>
     <input type="hidden"   id="dtodestSubProName" name="destSubProName" value="" />
      
  </td>
  <td align="right" nowrap > 目标节点 ：</td>
  <td align="left" > 
  	<select id="dtoturnDirection" name="turnDirection"  style="width:150px;">
			<option value="">--默认--</option>
    </select>
  </td>
   <td align="right" nowrap ></td>
  <td align="left" ></td>
  
</tr>



<tr>
<td align="right" nowrap > 其他参数信息 ：</td>
  <td align="left" colspan="5">
<textarea class="validate[maxSize[500]]" id="dtootherParamJavaCode" name="otherParamJavaCode" rows="2" cols="50" title='' >java.util.Map map = new java.util.HashMap(); map.put("owner","-1");map.put("manager","2");map.put("boss","1");;map.put("day","4");map.put("result", "to");System.out.println(map);return map;</textarea>
   
   <input type="hidden"  id="processInsId" name="processInsId" value="<%=StringUtilTools.filterSpecial(request,"processInsId")%>" />
   <input type="hidden"  id="acitityName" name="acitityName" value="<%=StringUtilTools.filterSpecial(request,"acitityName")%>" />
   </td>
  
</tr>



<tr><td align="center" colspan="6" > &nbsp;</td></tr>
<tr>
  <td align="center" colspan="6" class="my_buttons">
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
	$("#dtodestSubProName").attr("value",$("#dtosubProName").find("option:selected").text());
	//判断是否全部校验通过了
	if(v_boolean){
		$("#saveBtn").attr("disabled",true);
		document.newsForm.submit();
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
	//先获取主流程名下所有子流程信息
	getSubProListInfo();
	
	dwr.engine.setAsync(true);
	
	changeSubPro();
	
	changeCurSubPro();

}


//查询出 主流程名下的所有子流程信息
function getSubProListInfo(){
	var mainProId ='<c:out value="${param.mainProId}" />';
	var curSubPro = '<c:out value="${param.processInsId}" />';

//通过流程实例id获取当前主流程实例 名下所有子流程信息
	JbpmServiceImpl.getSubProListInfo(mainProId,false,function(data){
		var curObj = $("#dtocurSubProName");
		curObj.empty();
		
		var $obj = $("#dtosubProName");
		var option = '';
		$obj.empty();
		var actJSON = eval('(' + data + ')');
		for(var i = 0 ; i< actJSON.length ; i++){
			//跨流程处理 暂时不能展示当前子流程信息
			if(curSubPro.substring(0,curSubPro.indexOf("."))==actJSON[i].subProKey){
				var curOption = '<option value="'+actJSON[i].subProKey+'" title="'+actJSON[i].aName+'" id="'+actJSON[i].aName+'">'+actJSON[i].aName+'</option>';
			 	curObj.append(curOption);
			}else{
				option = '<option value="'+actJSON[i].subProKey+'" title="'+actJSON[i].aName+'" id="'+actJSON[i].aName+'">'+actJSON[i].aName+'</option>';
				$obj.append(option);
			}
			
		}
	
	});

}


//change 子流程时 变动 目标节点
function changeSubPro(){
	var destActNames = "";
	
	var v_subProKey = $("#dtosubProName").attr("value");
	JbpmServiceImpl.getNodesOfProDefi(v_subProKey,function(data){
		destActNames = eval('(' + data + ')');
		
		$obj = $("#dtoturnDirection");
		var option = '';
		$obj.empty();
		
		for(var i = 0 ; i< destActNames.length ; i++){
			option = '<option value="'+destActNames[i].destName+'" title="'+destActNames[i].destName+'" id="'+destActNames[i].destName+'">'+destActNames[i].destName+'</option>';
			$obj.append(option);
		}
	});
	
	
}


function changeCurSubPro(){
	var destActNames = "";
	var v_subProKey = $("#dtocurSubProName").attr("value");
	JbpmServiceImpl.getNodesOfProDefi(v_subProKey,function(data){
		destActNames = eval('(' + data + ')');
		
		$obj = $("#dtocurTurnDirection");
		var option = '';
		$obj.empty();
		
		for(var i = 0 ; i< destActNames.length ; i++){
			option = '<option value="'+destActNames[i].destName+'" title="'+destActNames[i].destName+'" id="'+destActNames[i].destName+'">'+destActNames[i].destName+'</option>';
			$obj.append(option);
		}
	});
	
}
</script>



  </body>
</html>
