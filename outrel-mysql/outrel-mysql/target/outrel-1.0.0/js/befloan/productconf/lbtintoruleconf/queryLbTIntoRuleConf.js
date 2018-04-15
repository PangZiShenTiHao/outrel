//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAdd;
function toAddData(prodId){
	var dialogStruct={
		'display':contextRootPath+'/lbTIntoRuleConf/prepareExecute/toAdd?prodId='+prodId,
		'width':900,
		'height':300,
		'title':'新增',
		'isIframe':"false",
		'buttons':[
         {'text':'保存','action':doAddFrom},
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
		return;
	}
	//序列化 新增页面的form表单数据
	var params=$("#addNewsFormData").serialize();
	var url=contextRootPath+'/lbTIntoRuleConf/insertLbTIntoRuleConf';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			$("").newMsg({}).show(msg.msg);
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		dialogAdd.close();
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		queryData();
        	} else {
        		jyDialog().alert(msg.msg);
        	}
  	});
}
var dialogUpdate;
//修改 事件
function toUpdateData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog().alert("请选择待修改的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog().alert("请选择一条数据！");
		return;
	}

	var dialogStruct={
			'display':contextRootPath+'/lbTIntoRuleConf/prepareExecute/toUpdate?id='+v_ids,
			'width':900,
			'height':300,
			'title':'修改',
			'isIframe':"false",
			'buttons':[
             {'text':'保存','action':doUpdateFrom},
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
		return;
	}
	//序列化 新增页面的form表单数据
	var params=$("#updateNewsFormData").serialize();
	var url=contextRootPath+'/lbTIntoRuleConf/updateLbTIntoRuleConf';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//保存成功后，执行查询页面查询方法
			$("").newMsg({}).show(msg.msg);
        	var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		dialogUpdate.close();
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
		jyDialog().alert("请选择待删除的数据！");
		return;
	}
	
	jyDialog().confirm("您确认要删除选择的数据吗？", function() {
		var url=contextRootPath+'/lbTIntoRuleConf/deleteLbTIntoRuleConf';
		var params="ids="+v_ids;

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
		  	});
    });
}
//查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/lbTProductConf/prepareExecute/toView?id='+vId,
			'width':1000,
			'height':500,
			'title':'查看明细',
			'isIframe':"false",
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}

//查看
function viewRufuseCodeDetail(rejectReasonId){
	var dialogStruct={
			'display':contextRootPath+'/lbTRefuseLoanConf/prepareExecute/toView?id='+rejectReasonId,
			'width':800,
			'height':500,
			'title':'查看拒贷参数明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
	var dialogView = jyDialog(dialogStruct).open();
}