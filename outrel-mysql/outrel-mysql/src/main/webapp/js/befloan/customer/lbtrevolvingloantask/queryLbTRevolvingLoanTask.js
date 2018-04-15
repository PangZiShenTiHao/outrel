//utf-8
/**
 * 领取任务
 */
function receiveLoanTask() {
	var v_objs=iframe.iframeObj["table"].getSelectedObjs();
	//如果没有选中 数据则
	if(v_objs.length == 0){
		$("").newMsg({}).show("请选择待领取的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_objs.length > 1){
		$("").newMsg({}).show("请选择一条数据！");
		return;
	}
	
	var v_obj = v_objs[0];
	
	if(v_obj.taskStatus == "2") {
		$("").newMsg({}).show("该任务已经被领取, 不能重复领取！");
		return;
	}
	
	var params="id=" + v_obj.id;
	var url=contextRootPath+'/lbTRevolvingLoanTask/receiveLoanTask';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//保存成功后，执行查询页面查询方法
			$("").newMsg({}).show(msg.msg);
        	var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		queryData();
        	}
  	});
}

/**
 * 分配任务
 */
function distributeLoanTask() {
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		$("").newMsg({}).show("请选择待分配的数据！");
		return;
	}
	var dialogStruct={
			'display':contextRootPath+'/lbTRevolvingLoanTask/prepareExecute/choiceAcc?ids='+v_ids,
			'title':'分配任务',
			"isIframe":'false',
			'width':400,
			'height':300,
			'buttons':[]
		};
			
	distributeLoanDialog = jyDialog(dialogStruct);
	distributeLoanDialog.open();
}


/**
 * 营销处理
 */
function doDistributeLoanTask() {
	var v_objs=getObjs("请选择待处理的数据！");
	if(!v_objs){
		return;
	}
	
	if(v_objs.taskStatus == "0") {
		$("").newMsg({}).show("该任务已失效！");
		return;
	}
	
	var v_ids = v_objs.id;//待处理业务主键
	var custName = v_objs.custName;//客户姓名
	
	var parentTitle=getActiveTabTitle();
	var title="营销处理("+custName+")";
	var url=contextRootPath+'/lbTRevolvingLoanTask/prepareExecute/doChoiceAcc?ids='+v_ids+'&tabTitle='+title+'&parentTitle='+parentTitle;
	
	var obj = {
			"title" : title,
			"url" : url,
			"cascade": true,
			"closeFun":function(iframe,closeFun){
				flushTab(parentTitle);
				closeFun();
			}
	};
	window.top.tabs.add(obj);
}


/**
 * 查看营销处理详情
 */
function queryDistributeLoanTask() {
	var v_objs=getObjs("请选择数据！");
	if(!v_objs){
		return;
	}
	var v_ids = v_objs.id;//待处理业务主键
	var custName = v_objs.custName;//客户姓名
	
	var parentTitle=getActiveTabTitle();
	var title="营销处理详情("+custName+")";
	var url=contextRootPath+'/lbTRevolvingLoanTask/prepareExecute/doChoiceAccInfo?ids='+v_ids+'&tabTitle='+title+'&parentTitle='+parentTitle;
	
	var obj = {
			"title" : title,
			"url" : url,
			"cascade": true,
			"closeFun":function(iframe,closeFun){
				flushTab(parentTitle);
				closeFun();
			}
	};
	window.top.tabs.add(obj);
}

//刷新指定的tab(按照tab标题)
function flushTab(tabTitle) {
	try{
		var winObj=window.top.tabs.getTabWinByTitle(tabTitle);
		winObj.queryData();
	} catch(e) {
		
	}
}

//新增循环贷任务
function toAddLoanTask(){
	var v_objs=iframe.iframeObj["table"].getSelectedObjs();
	//如果没有选中 数据则
	if(v_objs.length == 0){
		$("").newMsg({}).show("请选择待进件的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_objs.length > 1){
		$("").newMsg({}).show("请选择一条数据！");
		return;
	}
	
	if(v_objs.taskStatus=="1") {
		$("").newMsg({}).show("该任务尚未领取, 请先领取任务, 再新增循环贷任务！");
	}
	
	if(v_objs.taskStatus=="3") {
		$("").newMsg({}).show("该任务已经新增循环贷任务, 请勿重复操作！");
	}
	
	var v_obj = v_objs[0];
	var params = "&cardType="+v_obj.cardType;
	params += "&cardId="+v_obj.cardId;
	params += "&custName="+v_obj.custName;
	params += "&customerManager="+v_obj.custManager;
	
	jyAjax(
		contextRootPath+'/lbTRevolvingLoanTask/toAddLoanTask?id='+v_obj.id,
		params,
		function(msg){
        	var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		var title="循环贷任务-新增进件信息";
        		var url=contextRootPath+'/lbTIntoInfo/prepareExecute/addLbTIntoInfo?operateBtn=add&loanType=2&isLoanTask=isLoanTask&tabTitle='+title;
        		openTab(title,url+params);
        	}else{
        		$("").newMsg({}).show(msg.msg);
        	}
  	});
}

function doAddLoanTaskForm(){
	return function(){
		if(checkInto()) {
			//通过校验
			var params=getCustomerForm()+"&"+getIntoInfoForm()
			//校验黑名单
			checkBlackBeforeSaveInto(params, function() {
				params+="&"+getIntoProductFormData()+"&"+getSerialLiabilityForm();
				//校验通过, 保存进件信息
				var url=contextRootPath+'/lbTIntoInfo/insertLbTIntoInfo';
				//通过ajax保存
				jyAjax(
					url,
					params,
					function(msg){
						var v_status = msg.status;
						if(v_status.indexOf('ok') >-1){
							//新增成功后，
							$("").newMsg({}).show("保存成功!");
							dialogAdd.close();
							//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
							queryData();
						}
				});
			});
		}
	}
}

//查看客户明细
function viewCustomerData(vId){
	var dialogStruct={
			'display':contextRootPath+'/lbTCustomterInfo/prepareExecute/toView?id='+vId,
			'width':1400,
			'height':700,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}



//获取选中行的对象
function getObjs(alertMsg){
	var v_objs=iframe.iframeObj["table"].getSelectedObjs();
	//如果没有选中 数据则
	if(v_objs.length == 0){
		$("").newMsg({}).show(alertMsg);
		return;
	}
	return v_objs[0];
}

//获取当前活动tab的标题
function getActiveTabTitle() {
	return window.top.tabs.getActiveObj().title;
}


//保存营销记录
function saveRevolvingForm(id){
	var revolvingResult = $("#dtorevolvingResult").val();
	if(revolvingResult == null || revolvingResult ==""){
		$("").newMsg({}).show("请选择营销结果！");
		return;
	}
	var params= $("#addNewsFormData").serialize();
	params+="&fkRevolvingTaskId="+id;
	var url=contextRootPath+'/lbTRevolvingInfo/insertLbTRevolvingInfo';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			$("").newMsg({}).show(msg.msg);
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		window.top.showMessage("保存成功!",1500);
        	}
  	});
}