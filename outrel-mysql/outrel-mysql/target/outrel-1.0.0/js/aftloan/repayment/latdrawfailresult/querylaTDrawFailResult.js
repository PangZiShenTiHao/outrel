var dialogAdd; 
 
function operatorUpdateState(contractNo){
	
	var dialogStruct={
		'display':contextRootPath+'/laTDrawFailResult/prepareExecute/toAdd?contractNo='+contractNo,
		'width':600,
		'height':400, 
		'title':'处理',
		'buttons':[
         {'text':'保存','action':addFrom,'isClose':false},
		 {'text':'关闭','isClose':true}
		]
	};
	
	dialogAdd =jyDialog(dialogStruct);
	dialogAdd.open();
}

function addFrom(){
	//序列化 新增页面的form表单数据
	var obj = dialogAdd.getIframe();
	
	var params= obj.$("#addNewsFormData").serialize();
	
 	var processStatus = obj.$("#processStatusId").val();
	
 	if(processStatus == "" || processStatus ==""){
		$("").newMsg({}).show("请选择后续处理 ");
		return false;
	}
 	
	jyDialog().confirm('您确定要执行吗？', function(){
		var url = contextRootPath+'/laTDrawFailResult/updatelaTDrawFailResult';
		jyAjax(url,params,function(msg){
			//新增成功后，
			$("").newMsg({}).show(msg.msg);
			
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		dialogAdd.close();
        		queryData();
        	}
		},"","",false);
	})
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
 
