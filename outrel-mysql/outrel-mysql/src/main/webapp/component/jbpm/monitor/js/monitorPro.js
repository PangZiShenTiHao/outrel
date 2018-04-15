//UTF-8
/**
 * 预览流程 图
 */
function showCurrentPhoto(obj){
	var mainId = obj["MAIN_ID"];
	var processInstanceId = obj["CUR_EXE_ID"];
	if(""==mainId || mainId == undefined){
		mainId = processInstanceId;
	}
	$.dialog({
	id:	'viewWrokflowId',
    lock: true,
    width:850,
    height:800,
    max:true,
    title:'流程图',
    content: 'url:'+contextRootPath+'/component/jbpm/viewWorkflow.jsp?processInstantceId='+mainId+'&subProceInsId='+processInstanceId
	}).max(); 
}
/**
 * 查看流程 处理轨迹
 * @param obj
 */
function viewHisData(obj){
	var mainId = obj["MAIN_ID"];
	var processInstanceId = obj["CUR_EXE_ID"];
	var v_bizTabId = obj["BIZ_TAB_ID"];
	var v_bizTabName = obj["BIZ_TAB_NAME"];
	var v_bizInfId = obj["BIZ_INF_ID"];
	if(""==mainId || mainId == undefined){
		mainId = processInstanceId;
	}
	$.dialog({
		id:	'viewWrokflowHisLog',
	    lock: true,
	    width:850,
	    height:800,
	    title:'查看流程轨迹',
	    content: 'url:'+contextRootPath+'/component/jbpm/persontask/viewWorkflowHisLog.jsp?processInstantceId='+encodeURI(mainId)+'&bizTabName='+encodeURI(v_bizTabName)+'&bizInfId='+encodeURI(v_bizInfId)
	});
}
/**
 * 批量换人
 */
function batchUpdateAssignee(){
	var selectedId = getSelectedId();
	if(selectedId==""){
		jyDialog({"type":"warn"}).alert("请选择要转移的待办任务");
		return;
	} 
	//选中的待办任务ID s
	var v_tasks = selectedId;
	$.dialog({
		id:	'batchUpdateAssigneeDialogId',
	    lock: true,
	    width:850,
	    height:860,
	    title:'转移任务',
	    content: 'url:'+contextRootPath+'/component/jbpm/updateAssignee.jsp?tasks='+v_tasks
		});
}
/**
 * 批量挂起 2014-11-3 11:29:52 chj 获取相关参数，更新字段的状态
 */
function batchHandUp(){
	var selectIds = getSelectedId();
	if(selectIds == ""){
		jyDialog({"type":"warn"}).alert("请选择要执行批量挂起的数据");
		return;
	}
	var objs = iframe.iframeObj["table"].getSelectedObjs();
	
	var v_processInsId='';
	for(var i=0;i<objs.length;i++){
		var v_obj = objs[i];
		var v_process = "'"+v_obj.CUR_EXE_ID+"'";
		if(v_processInsId !='') v_processInsId+=",";
		v_processInsId += v_process;
	}
	
	jyDialog().confirm("您确定要批量挂起选择的数据吗？", function(){
		$.ajax({
			type:"POST",
			dataType:"JSON",
			url:contextRootPath+"/workFlowTask/batchUpdateDataState?ids="+encodeURI(v_processInsId)+"&state=0",		
			success:function(msg){
				$.dialog.alert(msg.msg);
	            var v_status = msg.status;
				//操作成功后
				if(v_status.indexOf('ok')>-1){
					//刷新页面
					queryData();
				}
			}
		});
	});	
}
/**
 * 批量恢复
 */
function batchRecovery(){
	var selectIds = getSelectedId();
	if(selectIds == ""){
		jyDialog({"type":"warn"}).alert("请选择要执行批量恢复的数据");
		return;
	}
	var v_processInsId='';
	
	var objs = iframe.iframeObj["table"].getSelectedObjs();
	for(var i=0;i<objs.length;i++){
		var v_obj = objs[i];
		var v_process = "'"+v_obj.CUR_EXE_ID+"'";
		if(v_processInsId !='') v_processInsId+=",";
		v_processInsId += v_process;
	}
	jyDialog().confirm("您确定要批量挂起选择的数据吗？", function(){
		$.ajax({
			type:"POST",
			dataType:"JSON",
			url:contextRootPath+"/workFlowTask/batchUpdateDataState?ids="+encodeURI(v_processInsId)+"&state=1",
			success:function(msg){
				$.dialog.alert(msg.msg);
	            var v_status = msg.status;
				//操作成功后
				if(v_status.indexOf('ok')>-1){
					//刷新页面
					queryData();
				}
			}
		});
	});
}
/**
 * 执行待办任务
 */
function executeTask(){
	jyDialog({"type":"warn"}).alert("流程监控页面暂时不能执行待办任务！");
	return;
	var selectedId = getSelectedId();
	if(selectedId==""){
		jyDialog({"type":"warn"}).alert("请选择要执行的待办任务");
		return;
	} 
	if(selectedId.indexOf(",") > 0){
		jyDialog({"type":"warn"}).alert("请选择一项任务");
		return ;
	}
	
	var objs = iframe.iframeObj["table"].getSelectedObjs();
	var v_processInsId = objs[0].CUR_EXE_ID;
	var v_acitityName = objs[0].CUR_ACT_NAME;
	
	$.dialog({
	id:	'executeTaskId',
    lock: true,
    width:850,
    height:300,
    title:'执行任务',
    content: 'url:'+contextRootPath+'/component/jbpm/executeTask.jsp?taskId='+selectedId+"&processInsId="+v_processInsId+"&acitityName="+encodeURI(v_acitityName)
	});
}
/**
 * 回退功能
 */
function backTask(){
	var selectedId = getSelectedId('selectedRadio');
	//alert(selectedId);
	if(selectedId==""){
		jyDialog({"type":"warn"}).alert("请选择一条待回退的待办任务！");
		return;
	} 
	if(selectedId.indexOf(',')>-1){
		jyDialog({"type":"warn"}).alert("请选择一条待回退的待办任务！");
		return;
	}
	var objs = iframe.iframeObj["table"].getSelectedObjs();
	var v_processInsId = objs[0].CUR_EXE_ID;
	var v_acitityName = objs[0].CUR_ACT_NAME;
	//todo 验证 待流程实例是否是挂起 状态
	var v_bizTabId = objs[0].BIZ_TAB_ID;
	var v_lock = JBPM.common.getProInsState(v_bizTabId);
	if(!v_lock){
		jyDialog({"type":"warn"}).alert("该待办任务的流程实例已经挂起，暂时不能处理该任务！");
		return ;
	}
	
	$.dialog({
	id:	'executeBackTaskId',
    lock: true,
    width:850,
    height:200,
    title:'回退任务',
    content: 'url:'+contextRootPath+'/component/jbpm/backTask.jsp?taskId='+selectedId+"&processInsId="+encodeURI(v_processInsId)+"&acitityName="+encodeURI(v_acitityName)
	});
}
/**
 * 异常终止流程
 */
function execptionStop(){
	var selectedId = getSelectedId('selectedRadio');
	//alert(selectedId);
	if(selectedId=="" || selectedId.indexOf(',')>-1){
		jyDialog({"type":"warn"}).alert("请选择一条数据！");
		return;
	} 
	
	var objs = iframe.iframeObj["table"].getSelectedObjs();
	var v_processInsId = objs[0].CUR_EXE_ID;
	var v_taskName = objs[0].BIZ_INF_NAME;
	$.dialog({
	id:	'exceptionStopId',
    lock: true,
    width:850,
    height:200,
    title:'异常终止流程实例',
    content: 'url:'+contextRootPath+'/component/jbpm/monitor/exceptionStopProIns.jsp?proInsId='+encodeURI(v_processInsId)+'&bizInfName='+encodeURI(v_taskName)
	});
}
/**
 * 快速处理功能
 */
function fastDoTask(){
	jyDialog({"type":"warn"}).alert("此功能正在调试中！");
	return;
	var selectedId = getSelectedId('selectedRadio');
	//alert(selectedId);
	if(selectedId==""){
		jyDialog({"type":"warn"}).alert("请选择要快速处理的待办任务");
		return;
	} 
	if(selectedId.indexOf(',')>-1){
		jyDialog({"type":"warn"}).alert("请选择一条待回退的待办任务！");
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
    content: 'url:'+contextRootPath+'/component/jbpm/fastDoTask.jsp?taskId='+selectedId+"&processInsId="+v_processInsId+"&acitityName="+encodeURI(v_acitityName)
	}).max();

}
/**
 * 跨流程处理 
 */
function toOtherProcessTask(){
	var selectedId = getSelectedId('selectedRadio');
	if(selectedId==""){
		jyDialog({"type":"warn"}).alert("请选择待办任务");
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
    content: 'url:'+contextRootPath+'/component/jbpm/toOtherProcessTask.jsp?taskId='+selectedId+"&processInsId="+v_processInsId+"&acitityName="+encodeURI(v_acitityName)+"&mainProId="+v_mainid
	}).max();
}
/**
 * 获取选中的 行信息
 */
function getSelectedId(){
	var v_ids = "";
	$(".trSelected").each(function(i){
			if(v_ids != "") v_ids = v_ids + ",";
			
			v_ids = v_ids +$(this).attr("kvalue");
	});
	return v_ids;
}

/**
 * v_taskId 任务ID
 * v_proInsId 流程实例ID
 * v_actNa 当前节点名称
 * v_infId 业务表主键ID
 * v_tabName 业务表名
 */
function viewHistBizInfo(v_taskId,v_bizType,v_proInsId,v_actNa,v_infId,v_tabName,v_bizTabId,_bizType){
	//获取 业务类型对应的历史 预览 url
	var v_url = JBPM.biz.getViewBizUrl(v_bizType);
	v_url = v_url +"?taskId="+encodeURI(v_taskId)+"&processInsId="+encodeURI(v_proInsId)+"&acitityName="+encodeURI(v_actNa);
	v_url = v_url +"&bizInfId="+encodeURI(v_infId)+"&bizTabName="+encodeURI(v_tabName)+"&bizTabId="+encodeURI(v_bizTabId);
	v_url = v_url +"&bizType="+encodeURI(_bizType);
	/*$.dialog({
	id:	'viewHisBizInfo',
    //lock: true,
    width:850,
    height:300,
    title:'查看任务',
    content: 'url:'+v_url
	}).max();
	*/
	window.open(v_url,'viewHistInfoWindow');
}
/*
 * 选择人员
 */
function selectUser(orgId){
	if(orgId == undefined){
		orgId ='';
	}
	var title = window.top.tabs.getActiveObj().title;
	var v_url = contextRootPath+'/component/dialogsys/sysUserSelect.jsp?check=true&dispalyNameId=&hiddenInputId=';
	v_url = v_url+'&callFun=callFunMoniSetUser&tabTitle='+title+'&orgId='+orgId;
	$.dialog({
		id:	'selectUserDialogId',
	    lock: true,
	    width:700,
	    height:680,
	    title:'选择用户',
	    content: 'url:'+ v_url
		}); 
}
/*
 * 设置 回调 姓名
 */
function callFunSetUser(objs){
	var v_names = "";
	var v_ids = "";
	for(var i = 0;i < objs.length; i++){
		if(v_ids!=""){
			v_ids +=",";
			v_names+=",";
		}
		v_names +=objs[i].userName;
		v_ids +=objs[i].id;
	}
	$("[name='processParticipationNameDis']").val(v_names);
	$("[name='processParticipationName']").val(v_ids);
}
/*
 * 设置 查询条件的 开始时间 结束时间
 */
function setStartEndDate(){
	var _staTime = $("[name='time_start']").val();
	$("[name='startTime']").val(_staTime);
	var _endTime = $("[name='time_end']").val();
	$("[name='endTime']").val(_endTime);
}


/**
 * 查看历史轨迹
 * @param obj
 */
function viewHisDataByHist(obj){
	var mainId = obj["MAIN_ID"];
	var processInstanceId = obj["CUR_EXE_ID"];
	var v_bizTabId = obj["BIZ_TAB_ID"];
	var v_bizTabName = obj["BIZ_TAB_NAME"];
	var v_bizInfId = obj["BIZ_INF_ID"];
	if(""==mainId || mainId == undefined){
		mainId = processInstanceId;
	}
	$.dialog({
		id:	'viewWrokflowHisLog',
	    lock: true,
	    width:850,
	    height:800,
	    title:'查看流程轨迹',
	    content: 'url:'+contextRootPath+'/component/jbpm/persontask/viewWorkflowHisLog.jsp?type=hist&processInstantceId='+encodeURI(mainId)+'&bizTabName='+encodeURI(v_bizTabName)+'&bizInfId='+encodeURI(v_bizInfId)
	});
}
/**
 * 预览流程 图
 */
function showCurrentPhotoByHist(obj){
	var mainId = obj["MAIN_ID"];
	var processInstanceId = obj["CUR_EXE_ID"];
	if(""==mainId || mainId == undefined){
		mainId = processInstanceId;
	}
	$.dialog({
	id:	'viewWrokflowId',
    lock: true,
    width:850,
    height:800,
    max:true,
    title:'流程图',
   content: 'url:'+contextRootPath+'/component/jbpm/viewWorkflow.jsp?type=hist&processInstantceId='+mainId+'&subProceInsId='+processInstanceId
	}).max(); 
}

/**
 * 业务流程监控添加重复件标识
 * @param intoId
 */
function  repeatView(intoId,msg){
	var id='#'+intoId;
	layer.tips('重复件个数['+msg+']', id, {
			tips: [1, '#3595CC'],//代表颜色谈出
			time: 2000	      //显示时间1000=1秒
		});
}
/*业务流程监控添加查看重复件详细页面*/
function doRepeatView(intoId,msg,repeatId){
	if(msg>1){
		var url = contextRootPath+ '/workfile/toRepeatPage?intoId='+intoId;
		var dialogStruct={
			"display":url
			,"width":"850"
			,"height":"500"
			,title:'重复进件列表'
			,"buttons":[{"text":"关闭","isClose":true}]};
		dialogAddObj=jyDialog(dialogStruct);
		dialogAddObj.open();
	}else{
		$.ajax({
			type:"POST",
			url:contextRootPath+'/workfile/getRepeatList?intoId='+repeatId,
			async: false,
			dataType:"json",
			success:function(msg){
				 var v_infId = msg[0]["ID"];
				 var v_bizType='';
				 var v_tabName='';
				 var v_bizTabId='';
				 var v_proInsId='';
				 viewRepeatHistBizInfo(v_bizType,v_infId,v_tabName,v_bizTabId,v_proInsId);
			}
		});
	}
	
}


/**
 * v_taskId 任务ID
 * v_proInsId 流程实例ID
 * v_actNa 当前节点名称
 * v_infId 业务表主键ID
 * v_tabName 业务表名
 */
function viewRepeatHistBizInfo(v_bizType,v_infId,v_tabName,v_bizTabId,v_proInsId){
	var v_url= contextRootPath;
	v_viewURI = '/dojbpm/jbpmcreditaudit/prepareExecute/toViewAppInfo';
	v_url += encodeURI(v_viewURI);
	v_url = v_url +"?bizInfId="+encodeURI(v_infId)+"&operation=repeat";
	
	window.open(v_url,'viewHistInfoWindow'+v_infId);
}
