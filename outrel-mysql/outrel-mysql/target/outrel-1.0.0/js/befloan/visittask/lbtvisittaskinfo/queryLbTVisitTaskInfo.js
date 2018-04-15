//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdateObj;
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/lbTVisitTaskInfo/prepareExecute/toAdd',
		'width':800,
		'height':500,
		'title':'新增',
		'buttons':[
         {'text':'保存','action':doAddFrom,'isClose':true},
		 {'text':'关闭','isClose':true}
		]
	};
	
	dialogAddObj=jyDialog(dialogStruct);
	dialogAddObj.open();
}
//新增页面的保存操作
function doAddFrom(){
	var obj = dialogAddObj.getIframe();
	//序列化 新增页面的form表单数据
	if(!checkIsNull(obj.$("#addNewsFormData"))) return;
	var params=obj.$("#addNewsFormData").serialize();
	var url=contextRootPath+'/lbTVisitTaskInfo/insertLbTVisitTaskInfo';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			$("").newMsg({}).show(msg.msg);
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		queryData();
        	}
  	});
}

//删除 事件
function deleteData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待删除的数据！");
		return;
	}
	jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
		$.ajax({
            type:"POST",
            dataType:"json",
            url:contextRootPath+"/lbTVisitTaskInfo/deleteLbTVisitTaskInfo?ids="+v_ids,
            success:function(msg){
            	$("").newMsg({}).show(msg.msg);
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		iframe.iframeObj["table"].removeSelectedRow();
            	}
            	
            	
            }
        });
	   },"确认提示");
}

//获取选中行的ID
function getIds(alertMsg){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		$("").newMsg({}).show(alertMsg);
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		$("").newMsg({}).show("请选择一条数据！");
		return;
	}
	return v_ids;
}

//以tab形式打开连接
function openTab(title,url) {
	var obj = {
		"title" : title,
		"url" : url
	};
	window.top.tabs.add(obj);
}

//任务处理
function toTaskDeal(auditType, userId){
	if(getIds("请选择待处理的数据！")) {
		var objs=iframe.iframeObj["table"].getSelectedObjs();
		var visitTaskId = objs[0].id;
		var v_taskId = objs[0].TASKID;
		var cur_owner = objs[0].CUR_OWNER;
		var form_id = objs[0].FORM_ID;
		//todo 验证待办任务是否可以执行
		var v_msg = JBPM.common.getOperateTaskStateInfo(v_taskId,cur_owner);
		if(v_msg != null && "" != v_msg){
			jyDialog({"type":"warn"}).alert(v_msg);
			return;
		}
		//任务锁定
		dataLockImp(v_taskId,"1","N");
		JBPM.common.acceptTask(v_taskId,form_id,'1',userId,cur_owner);
//		JBPM.common.changeAssignee(v_taskId,userId,0);

		var title="任务处理";
		var params = "&taskId="+v_taskId+"&processInsId="+objs[0].PRO_INSTANCE_ID+"&bizTabName="+objs[0].BIZ_TAB_NAME+"&acitityName="+objs[0].CUR_ACT_NAME+"&bizType="+objs[0].BIZ_TYPE+"&bizTabId="+objs[0].BIZ_TAB_ID;
		var url=contextRootPath+'/lbTVisitTaskInfo/prepareExecute/toDealTask?bizInfId='+visitTaskId+'&auditType='+auditType+params;
		window.open(url,'newwindow'+visitTaskId);
	}
}

//关闭tab(按照tab标题),并且刷新父tab
function closeTaskDealTab(tabTitle) {
	window.top.tabs.close(tabTitle);
}

//回访意见 事件
function toVisitOpinion(auditType){
	if(getIds("请选择待处理的数据！")) {
		var objs=iframe.iframeObj["table"].getSelectedObjs();
		var auditStatus = objs[0].auditStatus;
		if(auditType == 'kf') {
			if(auditStatus == '110' || auditStatus == '180') {
				$("").newMsg({}).show("请完成问卷后再提交回访结论!");
				return;
			} 
		}
		var visitTaskId =  objs[0].id;
		var dialogStruct={
				'display':contextRootPath+'/lbTVisitTaskInfo/prepareExecute/toVisitOpinion?auditType='+auditType+'&visitTaskId='+visitTaskId,
				'width':800,
				'height':500,
				'title':'回访意见页面',
				'isIframe':'true',
				'buttons':[
	             {'text':'提交','action':auditFrom,'isClose':false},
				 {'text':'关闭','isClose':true}
				]
			};
			
		dialogUpdateObj = jyDialog(dialogStruct);
		dialogUpdateObj.open();
	}
}

//回访意见操作form
function auditFrom(){
	var obj = dialogUpdateObj.getIframe();
	if(obj.$("#auditCode").val() == '000') {
		$("").newMsg({}).show("请选择回访结论！");
		return;
	}
	if(obj.$("#auditCode").val() == '130' || obj.$("#auditCode").val() == '170') {
		if(obj.$("#refuseCode").val() == '') {
			$("").newMsg({}).show("请选择拒绝原因！");
			return;
		}
		if(obj.$("#visitRemark").val() == '') {
			$("").newMsg({}).show("请填写回访备注！");
			return;
		}
	}
	//序列化 新增页面的form表单数据
	var params=obj.$("#auditNewsFormData").serialize();
	var url=contextRootPath+'/lbTVisitAuditResult/auditReuslt';
	jyDialog().confirm("确认提交吗？", function() {
			//通过ajax保存
			jyAjax(
				url,
				params,
				function(msg){
					//保存成功后，执行查询页面查询方法
					$("").newMsg({}).show(msg.msg);
		        	var v_status = msg.status;
		        	if(v_status.indexOf('ok') >-1){
		        		dialogUpdateObj.close();
		        		queryData();
		        	}
		  	});
		}
	);
}
	
	//重新回访 事件
	function toAgainVisit(){
		if(getIds("请选择待处理的数据！")) {
			var objs=iframe.iframeObj["table"].getSelectedObjs();
			var visitTaskId = objs[0].id;
			var auditStatus = objs[0].auditStatus;
			if(auditStatus != '120') {
				$("").newMsg({}).show("请选择回访通过的数据!");
				return;
			} 
			var dialogStruct={
					'display':contextRootPath+'/lbTVisitTaskInfo/prepareExecute/toAgainVisit?visitTaskId='+visitTaskId,
					'width':600,
					'height':400,
					'title':'重新回访',
					'isIframe':'true',
					'buttons':[
		             {'text':'提交','action':againVisitFrom,'isClose':false},
					 {'text':'关闭','isClose':true}
					]
				};
				
			dialogUpdateObj = jyDialog(dialogStruct);
			dialogUpdateObj.open();
		}
	}
	
	//重新回访意见操作form
	function againVisitFrom(){
		var obj = dialogUpdateObj.getIframe();
		if(obj.$("#operateContent").val() == '') {
			$("").newMsg({}).show("请填写意见！");
			return;
		}
		//序列化 新增页面的form表单数据
		var params=obj.$("#againVisitInfoData").serialize();
		var url=contextRootPath+'/lbTVisitTaskInfo/againVisitTask';
		jyDialog().confirm("确认提交吗？", function() {
				//通过ajax保存
				jyAjax(
					url,
					params,
					function(msg){
						//保存成功后，执行查询页面查询方法
						$("").newMsg({}).show(msg.msg);
			        	var v_status = msg.status;
			        	if(v_status.indexOf('ok') >-1){
			        		dialogUpdateObj.close();
			        		queryData();
			        	}
			  	});
			}
		);
	}
	
	//查看日志信息
	function viewLogData(){
		if(getIds("请选择待处理的数据！")) {
			var objs=iframe.iframeObj["table"].getSelectedObjs();
			var url = contextRootPath+'/lbTVisitTaskInfo/prepareExecute/toViewLog?visitTaskId='+objs[0].id;
			var title = '查看日志信息';
			openTab(title,url);
		}
	}
	
	//查看回访结论信息
	function viewAuditResult(visitTaskId){
		var title = "查看回访结论信息";
		var url = contextRootPath+'/lbTVisitTaskInfo/prepareExecute/toViewAuditResult?visitTaskId='+visitTaskId;
		openTab(title,url);
	}
	
	/**
	 * 查看信审审批
	 * intoId 进件ID
	 * 
	 */
	function viewCreditHistBizInfo(intoId){
		var v_url = contextRootPath+"/dojbpm/jbpmcreditaudit/prepareExecute/toViewAppInfo?bizInfId="+intoId;

		window.open(v_url,'viewHistInfoWindow');
	}
	
	function viewVisitInfo (visitTaskId) {
		var v_url = contextRootPath+"/lbTVisitTaskInfo/prepareExecute/toSubViewVisitTaskCreditInfo?visitTaskId="+visitTaskId;

		window.open(v_url,'viewVisitInfoWindow');
	}