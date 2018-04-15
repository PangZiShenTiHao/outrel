//UTF-8



/*
 * 2014-10-31 16:40:07 通过主键来更新相关的字段
 */
function updateDataLockBak(state){
	var v_ids = getSelectedId('selectedRadio');
	if(v_ids==""){
		if(state == '1'){
			jyDialog({"type":"warn"}).alert("请选择待办任务!");
		}else{
			jyDialog({"type":"warn"}).alert("请选择待办任务!");
		}
		return;
	}
	//todo 验证 待流程实例是否是挂起 状态
	var objs = iframe.iframeObj["table"].getSelectedObjs();
	var v_bizTabId = objs[0].BIZ_TAB_ID;
	var v_lock = JBPM.common.getProInsState(v_bizTabId);
	if(!v_lock){
		jyDialog({"type":"warn"}).alert("该待办任务的流程实例已经挂起，暂时不能处理该任务！");
		return ;
	}
	var v_msg = "您确认要锁定待办任务吗？";
	
	if(state == '1'){
		v_msg = "您确认要锁定待办任务吗？";
	}else{
		v_msg = "您确认要解锁待办任务吗？";
	}
	if(confirm(v_msg)){
		dataLockImp(v_ids,state);
	}
}
/*
 * 锁定待办，解锁待办任务 
 * 具体实现方法
 */
function dataLockImp(v_ids,state,v_queryData){
	if("N" == v_queryData){
		//不刷新
		$.ajax({
	        type:"POST",
	        dataType:"JSON",
	        url:contextRootPath+"/workFlowTask/updateDataLock?ids="+v_ids+"&state="+state,
	        success:function(msg){
	        }
	    });
	}else{
		$.ajax({
	        type:"POST",
	        dataType:"JSON",
	        url:contextRootPath+"/workFlowTask/updateDataLock?ids="+v_ids+"&state="+state,
	        success:function(msg){
	        	//jyDialog({"type":"warn"}).alert(msg.msg);
	        	var v_status = msg.status;
	        	if(v_status.indexOf('ok') >-1){//操作成功后
	        		//queryMyTodoData();
	        		queryData();
	        	}
	        }
	    });
	}
	
}


function updateDataLock(state){
	var v_ids = getSelectedId('selectedRadio');
	if(v_ids==""){
		if(state == '1'){
			jyDialog({"type":"warn"}).alert("请选择待办任务!");
		}else{
			jyDialog({"type":"warn"}).alert("请选择待办任务!");
		}
		return;
	}
	//todo 验证 待流程实例是否是挂起 状态
	var objs = iframe.iframeObj["table"].getSelectedObjs();
	var v_bizTabId = objs[0].BIZ_TAB_ID;
	var v_taskId = objs[0].TASKID;
	var v_curOwner = objs[0].CUR_OWNER;
	var processId  = objs[0].CUR_EXE_ID;
	var actName = objs[0].CUR_ACT_NAME
	var formId = objs[0].FORM_ID;
	//var lockState = objs[0].LOCK_STATE;
	var v_lock = JBPM.common.getProInsState(v_bizTabId);
	if(!v_lock){
		jyDialog({"type":"warn"}).alert("该待办任务的流程实例已经挂起，暂时不能处理该任务！");
		return ;
	}
	//todo 验证待办任务是否可以执行
	var v_msg = JBPM.common.getOperateTaskStateInfo(v_taskId,JS_CUR_LOGIN_USER_ID);
	if(v_msg != null && "" != v_msg){
		alert(v_msg);
		return;
	}
	var v_msg = "您确认要锁定待办任务吗？";
	
	if(state == '1'){
		v_msg = "您确认要锁定待办任务吗？";
	}else{
		v_msg = "您确认要解锁待办任务吗？";
	}
	jyDialog().confirm(v_msg, function(){
		dataLockImp(v_ids,state,"N");
		debugger;
		//签收和撤销签收处理
		JBPM.common.acceptTask(v_taskId,formId,state,JS_CUR_LOGIN_USER_ID,v_curOwner);
	});
}


/**
 * v_taskId 任务ID
 * v_proInsId 流程实例ID
 * v_actNa 当前节点名称
 * v_infId 业务表主键ID
 * v_tabName 业务表名
 */
function viewHistBizInfo(v_taskId,v_bizType,v_proInsId,v_actNa,v_infId,v_tabName,v_bizTabId){
	var v_url = JBPM.biz.getViewBizUrl(v_bizType);
	
	v_url = v_url +"?taskId="+encodeURI(v_taskId)+"&processInsId="+encodeURI(v_proInsId)+"&acitityName="+encodeURI(v_actNa);
	v_url = v_url +"&bizInfId="+encodeURI(v_infId)+"&bizTabName="+encodeURI(v_tabName)+"&bizTabId="+encodeURI(v_bizTabId)+"&bizType="+v_bizType;
	window.open(v_url,'viewHistInfoWindow'+v_infId);
}

/*
 * 查看处理轨迹
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
/*
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
    title:'流程图',
    content: 'url:'+contextRootPath+'/component/jbpm/viewWorkflow.jsp?processInstantceId='+encodeURI(mainId)+'&subProceInsId='+encodeURI(processInstanceId)
	}); 
}
/**
 * 回退功能（收回 功能）
 * 只允许相邻的待办任务节点可以 收回
 * 且其流程实例下的待办任务是 解锁状态
 */
function backTask(){
	var selectedId = getSelectedId('selectedRadio');
	//jyDialog({"type":"warn"}).alert(selectedId);
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
	var objs = iframe.iframeObj["table"].getSelectedObjs();
	var v_bizTabId = objs[0].BIZ_TAB_ID;
	var v_lock = JBPM.common.getProInsState(v_bizTabId);
	if(!v_lock){
		jyDialog({"type":"warn"}).alert("该待办任务的流程实例已经挂起，暂时不能处理该任务！");
		return ;
	}
	
	//todo 查询 判断 该已办任务是否允许收回 
	$.ajax({
		type:"POST",
		//dataType:"JSON",
		async:false,//同步请求
		url:contextRootPath+"/workFlowProvider/getTaskInfoByProInsId.do",
		data:{proInsId:v_processInsId},
		success:function(data){
			var msg = eval('(' + data + ')');
			if("1" == msg[0].lockState){
				jyDialog({"type":"warn"}).alert("任务处于锁定状态，不能收回！");
				return ;
			}else{
				//流转方向 通过ajax 查询出来进行显示
				var v_lasTaskId = msg[0].lastTaskId;
				doBackTask(v_processInsId,v_acitityName,v_lasTaskId);
			}
		}
	});
	
	
}
/*
 * 收回待办的实际处理方法
 */
function doBackTask(v_processInsId,v_acitityName,v_lasTaskId){
	
	$.ajax({
		url: contextRootPath+'/workFlowProvider/getIncomingTransitions.do',
		type: 'POST',
		async:false,
		data:{proInstanceId:v_processInsId,activeName:v_acitityName},
		//dataType: 'json',
		error: function(){jyDialog({"type":"warn"}).alert('error');},
		success: function(data){
				var destActNames = eval('(' + data + ')');
				for(var i = 0 ; i< destActNames.length ; i++){
					var v_his = destActNames[i].isHis;//是否 执行过历史任务 Y：是，N:否
					var v_hisOwner = destActNames[i].hisOwner;//执行历史任务的参与者ID ，-1 标志待分配、
					if("N" == v_his) continue;
					$("#turnDirection").val(destActNames[i].destName);
					//if("-1" != v_hisOwner) 
					//如果有值 说明可以回退
					$("#oldUserId").val(v_hisOwner);
					//break; //暂时只取 一个
				}
			}
		});

	var v_curUserId = JS_CUR_LOGIN_USER_ID;
	var v_oldUserId = $("#oldUserId").val();
	if(v_curUserId != v_oldUserId){
		jyDialog({"type":"warn"}).alert("该任务不能收回，只有最后处理人可以收回！");
		return ;
	}
	//parent.tabs.getTabWinByTitle("${param.tabTitle}");
	if(confirm("您确定要回退该任务吗？")){
		var v_turnDic = $("#turnDirection").val();
		$.ajax({
			type:"POST",
			dataType:"JSON",
			async:false,
			url:contextRootPath+"/workFlowTask/backTaskToDesc.do",
			data:{taskId:v_lasTaskId,processInsId:v_processInsId,oldUserId:v_oldUserId,turnDirection:v_turnDic},
			success:function(msg){
				jyDialog({"type":"warn"}).alert(msg.msg);
	            var v_status = msg.status;
				//操作成功后
				if(v_status.indexOf('ok')>-1){
					//刷新
					queryData();
					refreshTodoTask();
				}
			}
		});
	}
}
//收回之后刷新待办任务
function refreshTodoTask(){
	this.parent.tab.getTabWinByTitle("我的待办").queryData();
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
/*
 * 获取选中的行
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
 * 我的任务添加重复件标识
 * 
 * @param intoId
 */

function  repeatView(intoId,msg){
	var id='#'+intoId;
	layer.tips('重复件个数['+msg+']',  id, {
			tips: [1, '#3595CC'],//代表颜色谈出
			time: 2000	      //显示时间1000=1秒
		});
}

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
	debugger;
	var v_url= contextRootPath;
	v_viewURI = '/dojbpm/jbpmcreditaudit/prepareExecute/toViewAppInfo';
	v_url += encodeURI(v_viewURI);
	v_url = v_url +"?bizInfId="+encodeURI(v_infId)+"&operation=repeat";
	
	window.open(v_url,'viewHistInfoWindow'+v_infId);
}