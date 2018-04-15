//新增页面的保存操作
function doAddFrom(v_Id){
	//序列化 新增页面的form表单数据
	var params=$("#addNewsFormData").serialize();
	var url=contextRootPath+'/lbTLeaveInfo/insertLbTLeaveInfo';
	//通过ajax保存
	jyAjax(
			url,
			params,
			function(msg){
				//新增成功后，
				var v_status = msg.status;
				if(v_status.indexOf('ok') >-1){
					//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
					queryData();
				}
			});
}

function viewDataInfo(v_Id,type){
	var dialogStruct={
			'display':contextRootPath+'/lbTLeaveInfo/prepareExecute/toView?ids='+v_Id+"&leaveType="+type,
			'width':800,
			'height':500,
			'title':'预约请假',
			'isIframe':'false',
			'buttons':[
			           {'text':'保存','action':doAddFrom,'isClose':true},
			           {'text':'关闭','isClose':true}
			           ]
	};

	var dialogView = jyDialog(dialogStruct).open();
}




function cancle_leave(v_Id){
	$.ajax({
		type:"POST",
		url:contextRootPath+"/lbTLeaveInfo/deleteLbTLeaveInfo?ids="+v_Id,
		success:function(msg){
			queryData();
		}
	});
}


function leaveDateInfo(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		alert("请选择待请假的数据！");
		return;
	}
	var dialogStruct={
			'display':contextRootPath+'/lbTLeaveInfo/prepareExecute/toView?ids='+v_ids+"&leaveType=1",
			'width':800,
			'height':500,
			'title':'预约请假',
			'isIframe':'false',
			'buttons':[
			           {'text':'保存','action':insertInfo,'isClose':true},
			           {'text':'关闭','isClose':true}
			           ]
	};

	var dialogView = jyDialog(dialogStruct).open();
}


function insertInfo(){
	//序列化 新增页面的form表单数据
	var params=$("#addNewsFormData").serialize();
	var url=contextRootPath+'/lbTLeaveInfo/batchInsertLbTLeaveInfo';
	//通过ajax保存
	jyAjax(
			url,
			params,
			function(msg){
				//新增成功后，
				var v_status = msg.status;
				if(v_status.indexOf('ok') >-1){
					//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
					queryData();
				}
			});
}