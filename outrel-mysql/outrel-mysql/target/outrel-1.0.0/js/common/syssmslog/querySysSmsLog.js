//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdateObj;
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/sysSmsLog/prepareExecute/toAdd',
		'width':800,
		'height':500,
		'title':'新增',
		'isIframe':'false',
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
	var addNewsFormDataObj=$("#addNewsFormData");
	//序列化 新增页面的form表单数据
	if(!checkIsNull(addNewsFormDataObj)) return;
	var params=addNewsFormDataObj.serialize();
	var url=contextRootPath+'/sysSmsLog/insertSysSmsLog';
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
//修改 事件
function toUpdateData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待修改的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"info"}).alert("请选择一条数据！");
		return;
	}
	var dialogStruct={
			'display':contextRootPath+'/sysSmsLog/prepareExecute/toUpdate?id='+v_ids,
			'width':800,
			'height':500,
			'isIframe':'false',
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
	//序列化 新增页面的form表单数据
	var updateNewFormDataObj=$("#updateNewsFormData");
	if(!checkIsNull(updateNewFormDataObj)) return;
	var params=updateNewFormDataObj.serialize();
	var url=contextRootPath+'/sysSmsLog/updateSysSmsLog';
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
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待删除的数据！");
		return;
	}
	jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
		var url=contextRootPath+"/sysSmsLog/deleteSysSmsLog";
		var params={"ids":v_ids};
		jyAjax(
			url,
			params,
			function(msg){
				$("").newMsg({}).show(msg.msg);
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		iframe.iframeObj["table"].removeSelectedRow();
            	}
			}
		);
	},"确认提示");
}
//查看明细
function viewData(vId){
	var dialogStruct={
		'display':contextRootPath+'/sysSmsLog/prepareExecute/toView?id='+vId,
		'width':800,
		'height':500,
		'title':'查看明细',
		'isIframe':'false',
		'buttons':[
		 {'text':'关闭','isClose':true}
		]
	};
	var dialogView = jyDialog(dialogStruct).open();
}

