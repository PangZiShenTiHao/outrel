//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdateObj;
function toAddData(limitNo){
	var dialogStruct={
		'display':contextRootPath+'/lbTQuotaPay/prepareExecute/toAdd?id='+limitNo,
		'width':1200,
		'height':600,
		'title':'额度下放款申请详情',
		'buttons':[
         {'text':'保存','action':doAddFrom,'isClose':false},
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
	if(!checkIsNull(obj.$("#addNewsFormData"))){
		$("").newMsg({}).show("请输入放款申请信息");
		return;
	}
	var params=obj.$("#addNewsFormData").serialize();
	var url=contextRootPath+'/lbTQuotaPay/insertLbTQuotaPay';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			$("").newMsg({}).show(msg.msg);
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		dialogAddObj.close();
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		queryData();
        	}
  	});
}


//下一步
function openNextPage(){
	var selectIds = dialogAddObj.getIframe().getSelectedIds().join(",");
	var limitNo = dialogAddObj.getIframe().getSelectedObjss("limitNo");
	var limitState = dialogAddObj.getIframe().getSelectedObjss("limitState");
	//如果没有选中 数据则
	if(selectIds == ""){
		jyDialog({"type":"info"}).alert("请先选择一条数据！");
		return;
	}
	//暂停、作废、过期
	if(limitState=="2"){
		jyDialog({"type":"info"}).alert("该额度已被暂停，无法申请放款！");
		return;
	}
	if(limitState=="3"){
		jyDialog({"type":"info"}).alert("该额度已过期，无法申请放款！");
		return;
	}
	if(limitState=="4"){
		jyDialog({"type":"info"}).alert("该额度已作废，无法申请放款！");
		return;
	}
	
	//关闭查询界面
	dialogAddObj.close();
	toAddData(selectIds);
}
//上一步
function openPrevPage() {
	dialogAddObj.close();
	toAddData();
}
function toQueryQuotaManagement(){
	var dialogStruct={
		'display':contextRootPath+'/lbTQuotaPay/prepareExecute/toQueryQuotaManagement',
		'width':1200,
		'height':700,
		'title':'新增',
		'buttons':[
         {'text':'下一步','action':openNextPage,'isClose':false},
		 {'text':'关闭','isClose':true}
		]
	};
	
	dialogAddObj=jyDialog(dialogStruct);
	dialogAddObj.open();
}


//修改 事件
function toUpdateData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	// 获取所在行的对象
	var objs=iframe.iframeObj["table"].getSelectedObjs();
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待修改的数据！");
		return;
	}
	
    var state = objs[0].state;
    //已保存状态可签约提交
	if(state!="101"){
		jyDialog({"type":"info"}).alert("请选择已保存状态数据进行修改！");
		return;
	}

	var dialogStruct={
			'display':contextRootPath+'/lbTQuotaPay/prepareExecute/toUpdate?id='+v_ids,
			'width':1200,
			'height':600,
			'title':'修改',
			'buttons':[
             {'text':'保存','action':doUpdateFrom,'isClose':true},
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogUpdateObj = jyDialog(dialogStruct);
	dialogUpdateObj.open();
}
//修改页面 的 保存操作
function doUpdateFrom(){
	var obj = dialogUpdateObj.getIframe();
	//序列化 新增页面的form表单数据
	if(!checkIsNull(obj.$("#updateNewsFormData"))) return;
	var params=obj.$("#updateNewsFormData").serialize();
	var url=contextRootPath+'/lbTQuotaPay/updateLbTQuotaPay';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//保存成功后，执行查询页面查询方法
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
	// 获取所在行的对象
	var objs=iframe.iframeObj["table"].getSelectedObjs();
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待删除的数据！");
		return;
	}
	
	var state = objs[0].state;
    //已保存状态可进行删除
	if(state!="101"){
		jyDialog({"type":"info"}).alert("请选择已保存状态数据进行删除！");
		return;
	}
	
	jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
		$.ajax({
            type:"POST",
            dataType:"json",
            url:contextRootPath+"/lbTQuotaPay/deleteLbTQuotaPay?id="+v_ids,
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

//提交签约
function toSignDate(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	
	// 获取所在行的对象
	var objs=iframe.iframeObj["table"].getSelectedObjs();
    var state = objs[0].state;
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择提交签约的数据！");
		return;
	}
	
	//已保存状态可签约提交
	if(state!="101"){
		jyDialog({"type":"info"}).alert("请选择已保存状态数据进行签约！");
		return;
	}
	
	jyDialog({"type":"question"}).confirm("您确认提交签约的数据吗？",function(){
		$.ajax({
            type:"POST",
            dataType:"json",
            url:contextRootPath+"/lbTQuotaPay/signLbTQuotaPay?id="+v_ids,
            success:function(msg){
            	$("").newMsg({}).show(msg.msg);
            	var v_status = msg.status;
            	//提交签约成功后
            	if(v_status.indexOf('ok') >-1){
            		queryData();
            	}
            }
        });
	   },"确认提示");
}

//查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/lbTQuotaPay/prepareExecute/toView?id='+vId,
			'width':1200,
			'height':600,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}

//查看明细
function viewDataDetail(vId){
	var dialogStruct={
			'display':contextRootPath+'/lbTQuotaManagement/prepareExecute/toViewDetail?id='+vId,
			'width':1200,
			'height':650,
			'title':'额度详情',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}

