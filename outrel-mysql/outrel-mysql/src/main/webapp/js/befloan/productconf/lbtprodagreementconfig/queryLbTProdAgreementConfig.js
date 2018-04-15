//utf-8
//点击新增按钮 事件跳转至 新增页面
function toAddData(prodId){
	var dialogStruct={
		'display':contextRootPath+'/lbTProdAgreementConfig/prepareExecute/toAdd?prodId='+prodId,
		'width':800,
		'height':300,
		'isIframe':'false',
		'title':'新增',
		'buttons':[
         {'text':'保存','action':doAddFrom,'isClose':true},
		 {'text':'关闭','isClose':true}
		]
	};
	
	var dialogAdd =jyDialog(dialogStruct).open();
}
//新增页面的保存操作
function doAddFrom(){
	//序列化 新增页面的form表单数据
	//if(checkIsNull($("#addNewsFormData")[0])){
		
		var params=$("#addNewsFormData").serialize();
		var url=contextRootPath+'/lbTProdAgreementConfig/insertLbTProdAgreementConfig';
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
	//}else{
		//alert("----------");
		//$("#errorTip").html("请11111输入或者选择信息!");
	//}
	
}
//修改 事件
function toUpdateData(prodId){
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
			'display':contextRootPath+'/lbTProdAgreementConfig/prepareExecute/toUpdate?id='+v_ids+'&prodId='+prodId,
			'width':800,
			'height':300,
			'isIframe':'false',
			'title':'修改',
			'buttons':[
             {'text':'保存','action':doUpdateFrom,'isClose':true},
			 {'text':'关闭','isClose':true}
			]
		};
		
	var dialogUpdate = jyDialog(dialogStruct).open();
}
//修改页面 的 保存操作
function doUpdateFrom(){
	//序列化 新增页面的form表单数据
	var params=$("#updateNewsFormData").serialize();
	var url=contextRootPath+'/lbTProdAgreementConfig/updateLbTProdAgreementConfig';
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
		$("").newMsg({}).show("请选择待删除的数据！");
		return;
	}
	if(confirm("您确认要删除选择的数据吗？")){
        $.ajax({
            type:"POST",
            dataType:"JSON",
            url:contextRootPath+"/lbTProdAgreementConfig/deleteLbTProdAgreementConfig?ids="+v_ids,
            success:function(msg){
            	$("").newMsg({}).show(msg.msg);
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		iframe.iframeObj["table"].removeSelectedRow();
            	}
            	
            	
            }
        });
    }
}
//查看明细
function viewData(vId){
	var dialogStruct={
			//'display':contextRootPath+'/lbTProdAgreementConfig/prepareExecute/toView?id='+vId,
			'display':contextRootPath+'/lbTContrTempletColumn/prepareExecute/toQueryPage',
			'width':800,
			'height':300,
			'title':'修改返回参数',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}
// 调转至 字段查询页面
function viewColumn(vId){
	var dialogStruct={
			'display':contextRootPath+'/lbTContrTempletColumn/prepareExecute/toQueryPage?id='+vId,
			'width':800,
			'height':550,
			'title':'参数明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}