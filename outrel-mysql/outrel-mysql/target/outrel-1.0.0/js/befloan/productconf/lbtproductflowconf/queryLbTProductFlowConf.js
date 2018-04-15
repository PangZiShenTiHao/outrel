//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdateObj;
function toAddData(prodId){
	var dialogStruct={
		'display':contextRootPath+'/lbTProductFlowConf/prepareExecute/toAdd?prodId=' + prodId,
		'width':800,
		'height':400,
		'title':'新增',
		'buttons':[
         {'text':'保存','action':doAddFrom},
		 {'text':'关闭','isClose':true}
		]
	};
	
	dialogAddObj=jyDialog(dialogStruct);
	dialogAddObj.open();
}
//新增页面的保存操作
function doAddFrom(){
	var obj = dialogAddObj.getIframe();
	var formObj=obj.$("#addNewsFormData")[0];
	if(!checkIsNull(formObj)) {
		return;
	}
	//序列化 新增页面的form表单数据
	var params=obj.$("#addNewsFormData").serialize();
	var url=contextRootPath+'/lbTProductFlowConf/insertLbTProductFlowConf';
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
        		dialogAddObj.close();
        		queryData();
        	}
  	});
}
//修改 事件
function toUpdateData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		$("").newMsg({}).show("请选择待修改的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		$("").newMsg({}).show("请选择一条数据！");
		return;
	}

	var dialogStruct={
			'display':contextRootPath+'/lbTProductFlowConf/prepareExecute/toUpdate?id='+v_ids,
			'width':800,
			'height':400,
			'title':'修改',
			'buttons':[
             {'text':'保存','action':doUpdateFrom},
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogUpdateObj = jyDialog(dialogStruct);
	dialogUpdateObj.open();
}
//修改页面 的 保存操作
function doUpdateFrom(){
	var obj = dialogUpdateObj.getIframe();
	var formObj=obj.$("#updateNewsFormData")[0];
	if(!checkIsNull(formObj)) {
		return;
	}
	//序列化 新增页面的form表单数据
	var params=obj.$("#updateNewsFormData").serialize();
	var url=contextRootPath+'/lbTProductFlowConf/updateLbTProductFlowConf';
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
        		dialogUpdateObj.close();
        		queryData();
        	}
  	});
}
//删除 事件
function deleteData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		$("").newMsg({}).show("请选择待删除的数据！");
		return;
	}
	
	jyDialog().confirm("您确认要删除选择的数据吗？", function(){
        var params="ids="+v_ids;
    	var url=contextRootPath+"/lbTProductFlowConf/deleteLbTProductFlowConf";
    	//通过ajax保存
    	jyAjax(
    			url,
    			params,
    			function(msg){
    				var v_status = msg.status;
    				if(v_status.indexOf('ok') >-1){
    					queryData();
    					$("").newMsg({}).show("操作成功!");
    				}
    			}
    	);
    });
}
//查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/lbTProductFlowConf/prepareExecute/toView?id='+vId,
			'width':800,
			'height':300,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}