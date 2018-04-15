<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
 
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
  <head>
  <%@ include file="jbpmCommon.jsp" %>
   <title>流程管理</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
   <jsp:include page="/common/StaticJavascript.jsp" />
	<script type="text/javascript" src="${basePath}component/jbpm/dialog/lhgdialog.min.js?skin=iblue"></script>

 <script type="text/javascript">
//预览流程 图
function showCurrentPhoto(obj){
	var mainId = obj["MAIN_ID"];
	var processInstanceId = obj["EXECUTION_ID_"];
	if(""==mainId || mainId == undefined){
		mainId = processInstanceId;
	}
	$.dialog({
	id:	'viewWrokflowId',
    lock: true,
    width:850,
    height:800,
    title:'流程图',
    content: 'url:${basePath}component/jbpm/viewWorkflow.jsp?processInstantceId='+mainId+'&subProceInsId='+processInstanceId
	}); 
}

//批量换人
function batchUpdateAssige(){
	
}

//批量挂起
function batchHandUp(){
	
}

//批量恢复
function batchRecovery(){
	
}

//执行待办任务
function executeTask(){
	var selectedId = getSelectedId();
	
	//var selectedIds = table.getSelectedIds();
	//var selectedId = getSelectedId('selectedRadio');
	//alert(selectedId);
	if(selectedId==""){
		$.dialog.alert("请选择要执行的待办任务");
		return;
	} 
	if(selectedId.indexOf(",") > 0){
		alert("请选择一项任务");
		return ;
	}
	var v_processInsId = $("#EXECUTION_ID__"+selectedId).find(".tdInner").html();
	var v_acitityName = $("#ACTIVITY_NAME__"+selectedId).find(".tdInner").html();
	
	$.dialog({
	id:	'executeTaskId',
    lock: true,
    width:850,
    height:300,
    title:'执行任务',
    content: 'url:component/jbpm/executeTask.jsp?taskId='+selectedId+"&processInsId="+v_processInsId+"&acitityName="+encodeURI(v_acitityName)
	});
}

//回退功能
function backTask(){
	var selectedId = getSelectedId('selectedRadio');
	//alert(selectedId);
	if(selectedId==""){
		$.dialog.alert("请选择要执行的待办任务");
		return;
	} 
	var v_processInsId = $("#tb_id_e"+selectedId).html();
	var v_acitityName = $("#tb_id_a"+selectedId).html();
	$.dialog({
	id:	'executeTaskId',
    lock: true,
    width:850,
    height:200,
    title:'执行任务',
    content: 'url:component/jbpm/backTask.jsp?taskId='+selectedId+"&processInsId="+v_processInsId+"&acitityName="+encodeURI(v_acitityName)
	}).max();

}
//快速处理功能
function fastDoTask(){
	var selectedId = getSelectedId('selectedRadio');
	//alert(selectedId);
	if(selectedId==""){
		$.dialog.alert("请选择要快速处理的待办任务");
		return;
	} 
	var v_processInsId = $("#tb_id_e"+selectedId).html();
	var v_acitityName = $("#tb_id_a"+selectedId).html();
	$.dialog({
	id:	'executeTaskId',
    lock: true,
    width:850,
    height:200,
    title:'执行任务',
    content: 'url:component/jbpm/fastDoTask.jsp?taskId='+selectedId+"&processInsId="+v_processInsId+"&acitityName="+encodeURI(v_acitityName)
	}).max();

}

//跨流程处理 
function toOtherProcessTask(){
	var selectedId = getSelectedId('selectedRadio');
	if(selectedId==""){
		$.dialog.alert("请选择待办任务");
		return;
	} 
	var v_processInsId = $("#tb_id_e"+selectedId).html();
	var v_acitityName = $("#tb_id_a"+selectedId).html();
	var v_mainid = $("#mainId_"+selectedId).attr("value");
	
	/*if(!v_mainid){
		v_mainid ='test-key.200001';
	}
	*/
	$.dialog({
	id:	'executeTaskId',
    lock: true,
    width:850,
    height:200,
    title:'跨流程执行任务',
    content: 'url:component/jbpm/toOtherProcessTask.jsp?taskId='+selectedId+"&processInsId="+v_processInsId+"&acitityName="+encodeURI(v_acitityName)+"&mainProId="+v_mainid
	}).max();
}

function getSelectedId(){
	var v_ids = "";
	$(".trSelected").each(function(i){
			if(v_ids != "") v_ids = v_ids + ",";
			
			v_ids = v_ids +$(this).attr("kvalue");
	});
	return v_ids;
}
//初始化 工具条 及按钮
var toolbarObj = "";
function initToolbar(){
	 var toolbar={
				title:"任务/流程列表",
				buttons:[
					{"text":"批量换人","fun":function(){batchUpdateAssige();}},
					{"text":"批量挂起","fun":function(){batchHandUp();}},
					{"text":"批量恢复","fun":function(){batchRecovery();}},
					{"text":"回退任务","fun":function(){backTask();}},
					{"text":"执行任务","fun":function(){executeTask();}}
								
				]	
			};
		toolbarObj=$("#toolbar").newToolbar(toolbar);
		toolbarObj.show();
	
}
//初始化 table 列表 
var table = "";
function initTableList(){
	var tableStructure = {
			columns : [
				{display : '姓名', code : 'REALNAMEOFTASK', width : 100, align : 'left', type:'text', isOrder : true},
				{display : '编号', code : 'BUSI_INFO_ID', width : 100, align : 'left', type:'text', isOrder : true},
				{display : '名称', code : 'BUSI_INFO_NAME', width : 200, align : 'left', type:'text', isOrder:false},
				{display : '当前节点', code : 'ACTIVITY_NAME_', width : 100, align : 'left', type:'text',isOrder : true},
				{display : '任务类型', code : 'ROLECODE', width : 100, align : 'left', type:'text', isOrder : true},
				{display : '版本号', code : 'DBVERSION_', width : 50, align : 'left', type:'text', isOrder : true},
				{display : '流程实例', code : 'EXECUTION_ID_', width : 200, align : 'left', type:'text', isOrder : true},
				{display : '状态', code : 'STATE_', width : 50, align : 'left', type:'text', isOrder : true},
				{display : '时间', code : 'START_TIME', width : 100, align : 'left', type:'text', isOrder : true},
				{display : '流程图', code : 'viewPhone', width : 100, align : 'center', type:'link', value:[
				                                                                                 {"text":"查看","action":showCurrentPhoto}
				                                                                                 ]}
		   ],
			url : "${basePath1}workFlowProvider/findTaskInfo.do",
			pageSize : 10,
			selectType : 'checkbox',
			isCheck : true,
			rownumbers : true,
			pages : [ 10, 20, 30 ],
			trHeight : 30,
			primaryKey:"TASKID",
			form:"queryForm"
		};
	
	 table=$("#content").newTable(tableStructure);
	  table.show(true);
}
//弹出层 关闭时会调用该方法进行 查询
function queryData(){
	table.query();
}
function reset(){
	table.reset();
}

$("document").ready(function(){
	 //下拉框样式
	  $( "#processState" ).selectmenu();
	  $("#queryBtn").button();
	  $("#restBtn").button();
	 
	  initToolbar();
	  initTableList();
});
</script>


<style type="text/css">
.contentPanel{
		position: absolute;left:0px; top:215px;bottom:2px;right:2px;border:1px solid #CCC9C9;
		border-radius: 5px;  
		-moz-border-radius: 5px;  
		-webkit-border-radius: 5px;  
		background: #FAFAFA;
	}
.search_fieldset{
border:1px #ff9900 solid;
margin:10px;
}	
</style>
</head>

<body style="background-color:#FFFFFF">

<!-- query form 表单start -->
<div id="resizable" class="resizable ui-widget-content ui-corner-all">
<br>
<fieldset  class="search_fieldset"><legend>查询条件</legend>
<div  id="formDiv">
    <form id="queryForm" name="queryForm"> 
<div class="field"><label class="fieldName" for="speed">任务状态:</label>
<select name="processState"  id="processState"  >
<option value="PROCESS_TASK">待办任务</option>
<option value="COMPLETED_TASK">已办任务</option>
<option value="COMPLETED_TASK">历史任务</option>
<option value="ACTIVE_PROCESS_INFO">活动的流程实例</option>
<option value="END_TASK">结束的流程实例信息</option>
</select>
</div>

 
<div class="field"><label class="fieldName" for="speed">姓名:</label> 
<input name="processParticipationName" id="processParticipationName" type="text" value="">
</div> 
<div class="field"><label class="fieldName" for="speed">节点名称:</label> 
<input name="acitityName" id="acitityName" type="text" value="">
</div> 
<div class="field"><label class="fieldName" for="speed">业务类型:</label> 
<input name="proBizType" id="proBizType" type="text" value="" />
</div> 
<div class="field"><label class="fieldName" for="speed">流程实例:</label> 
<input name="processInsId" id="processInsId" type="text" value=""  />
</div> 
<div class="field"><label class="fieldName" for="speed">开始时间:</label> 
<input name="startTime" id="startTime" type="text" value="" />
</div> 
<div class="field"><label class="fieldName" for="speed">结束时间:</label> 
<input name="endTime" id="endTime" type="text" value="" />
</div>

<div class="searchBtn">
<input id="queryBtn"  type="button"  value="查询" onclick="queryData();" /><input id="restBtn"  type="button"  value="重置" onclick="reset();" />
</div>

<br>
</form>

  </div>

</fieldset>
<!-- query form 表单end -->


<br>
<!-- 列表操作按钮信息 -->
  <div id="toolbar"> </div>
  
</div>
<!-- 列表信息 start -->
<div id="content" class="contentPanel"></div>
	<!-- 列表信息 end -->
	
</body>
</html>
