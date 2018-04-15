//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdateObj;
var dialogUpdateStatObj;
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/laTCollNotice/prepareExecute/toAdd',
		'width':1100,
		'height':750,
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
	var url=contextRootPath+'/laTCollNotice/insertLaTCollNotice';
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
			'display':contextRootPath+'/laTCollNotice/prepareExecute/toUpdate?id='+v_ids,
			'width':1100,
			'height':750,
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
	var url=contextRootPath+'/laTCollNotice/updateLaTCollNotice';
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


//修改状态 事件
function toUpdateDataStat(){
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
			'display':contextRootPath+'/laTCollNotice/prepareExecute/toUpdateStat?id='+v_ids,
			'width':600,
			'height':200,
			'title':'修改单据状态',
			'buttons':[
             {'text':'保存','action':doUpdateStatFrom,'isClose':true},
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogUpdateStatObj = jyDialog(dialogStruct);
	dialogUpdateStatObj.open();
}
//修改页面 的 保存操作
function doUpdateStatFrom(){
	var obj = dialogUpdateStatObj.getIframe();
	//申请日期
	var dtolistStat=$(dialogUpdateStatObj.iframe.contentDocument.getElementById("dtolistStat")).val();
	var oldListStat=$(dialogUpdateStatObj.iframe.contentDocument.getElementById("oldListStat")).val();
	if(dtolistStat == oldListStat){
		jyDialog({"type":"info"}).alert("您选择的单据状态与之前的状态相同，请选择其它状态！");
		return;
	}
	//序列化 新增页面的form表单数据
	var params=$(dialogUpdateStatObj.iframe.contentDocument.getElementById("updateStatNewsFormData")).serialize();
	var url=contextRootPath+'/laTCollNotice/updateLaTCollNoticeStat';
	jyDialog({"type":"question"}).confirm("您确认要修改选择的数据吗？",function(){
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
	},"确认提示");
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
            url:contextRootPath+"/laTCollNotice/deleteLaTCollNotice?ids="+v_ids,
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
//查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/laTCollNotice/prepareExecute/toView?id='+vId,
			'width':1100,
			'height':600,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}