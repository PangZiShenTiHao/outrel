//utf-8
var dialogAdd ;
var dialogUpdate;
//点击新增按钮 事件跳转至 新增页面
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/lbTCard/prepareExecute/toAdd',
		'width':400,
		'height':200,
		'isIframe':'false',
		'title':'新增评分卡',
		'buttons':[
         {'text':'保存','action':doAddFrom,'isClose':false},
		 {'text':'关闭','isClose':true}
		]
	};
	
	dialogAdd =jyDialog(dialogStruct);
	dialogAdd.open();
}
//新增页面的保存操作
function doAddFrom(){
	var formObj=document.getElementById('addNewsFormData');
	if(!(checkIsNull(formObj)&&checkFormFormat($(formObj)))){
		return ;
	}
	//序列化 新增页面的form表单数据
	var params=$("#addNewsFormData").serialize();
	var url=contextRootPath+'/lbTCard/insertLbTCard';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		$("").newMsg({}).show(msg.msg);
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		queryData();
        		dialogAdd.close();
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
			'display':contextRootPath+'/lbTCard/prepareExecute/toUpdate?id='+v_ids,
			'width':420,
			'height':220,
			'title':'修改',
			'isIframe':'false',
			'buttons':[
             {'text':'保存','action':doUpdateFrom,'isClose':false},
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogUpdate = jyDialog(dialogStruct);
	dialogUpdate.open();
}
//修改页面 的 保存操作
function doUpdateFrom(){
	var formObj=document.getElementById('updateNewsFormData');
	if(!(checkIsNull(formObj)&&checkFormFormat($(formObj)))){
		return ;
	}
	//序列化 新增页面的form表单数据
	var params=$("#updateNewsFormData").serialize();
	var url=contextRootPath+'/lbTCard/updateLbTCard';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//保存成功后，执行查询页面查询方法
        	var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		$("").newMsg({}).show(msg.msg);
        		queryData();
        		dialogUpdate.close();
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
	if(confirm("您确认要删除选择的数据吗？")){
		//序列化 新增页面的form表单数据
		var params;
		var url=contextRootPath+"/lbTCard/deleteLbTCard?ids="+v_ids;
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
}
//查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/lbTCard/prepareExecute/toView?id='+vId,
			'width':800,
			'height':500,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}