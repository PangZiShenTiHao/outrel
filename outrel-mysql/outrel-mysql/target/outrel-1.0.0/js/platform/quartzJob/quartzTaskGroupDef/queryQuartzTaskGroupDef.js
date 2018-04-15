//utf-8
//点击新增按钮 事件跳转至 新增页面

var dialogAdd,dialogUpdate;
function toAddData() {
	var dialogStruct = {
		'display' : contextRootPath
				+ '/quartzTaskGroupDef/prepareExecute/toAdd',
		'width' : 1200,
		'height' : 500,
		'title' : '新增',
		'isIframe' : 'true',
		'buttons' : [ {
			'text' : '保存',
			'action' : doAddFrom,
			'isClose' : true
		}, {
			'text' : '关闭',
			'isClose' : true
		} ]
	};

	dialogAdd = jyDialog(dialogStruct);
	dialogAdd.open();
}
// 新增页面的保存操作
function doAddFrom() {
	// 序列化 新增页面的form表单数据
//	var params = $("#addNewsFormData").serialize();
	var params = $(dialogAdd.iframe.contentDocument.getElementById("addNewsFormData")).serialize();
	var url = contextRootPath + '/quartzTaskGroupDef/insertQuartzTaskGroupDef';
	// 通过ajax保存
	jyAjax(url, params, function(msg) {
		// 新增成功后，
		$("").newMsg({}).show(msg.msg);;
		var v_status = msg.status;
		if (v_status.indexOf('ok') > -1) {
			// 新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的 数据
			queryData();
		}
	});
}
// 修改 事件
function toUpdateData() {
	var v_ids = iframe.iframeObj["table"].getSelectedObjs("groupId");
	var states = iframe.iframeObj["table"].getSelectedObjs("groupState").join(
	",");
	// 如果没有选中 数据则
	if (v_ids == "") {
		jyDialog({"type":"info"}).alert("请选择待修改的数据！");
		return;
	}
	// 如果选择多个 择提示
	if (v_ids.indexOf(",") > -1) {
		jyDialog({"type":"info"}).alert("请选择一条数据！");
		return;
	}
	if (states.indexOf('1') >= 0) {
		jyDialog({"type":"info"}).alert("已发布的任务不能修改！");
		//alert("已发布的任务不能修改！");
		return;
	}
	var dialogStruct = {
		'display' : contextRootPath
				+ '/quartzTaskGroupDef/prepareExecute/toUpdate?id='
				+ v_ids,
		'width' : 1200,
		'height' : 500,
		'isIframe' : 'true',
		'title' : '修改',
		'buttons' : [ {
			'text' : '保存',
			'action' : doUpdateFrom,
			'isClose' : true
		}, {
			'text' : '关闭',
			'isClose' : true
		} ]
	};

	dialogUpdate = jyDialog(dialogStruct);
	dialogUpdate.open();
}
// 修改页面 的 保存操作
function doUpdateFrom() {
	// 序列化 新增页面的form表单数据
//	var params = $("#updateNewsFormData").serialize();
	var params = $(dialogUpdate.iframe.contentDocument.getElementById("updateNewsFormData")).serialize();
	var url = contextRootPath + '/quartzTaskGroupDef/updateQuartzTaskGroupDef';
	// 通过ajax保存
	jyAjax(url, params, function(msg) {
		// 保存成功后，执行查询页面查询方法
		$("").newMsg({}).show(msg.msg);;
		var v_status = msg.status;
		if (v_status.indexOf('ok') > -1) {
			// 新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的 数据
			queryData();
		}
	});
}
// 删除 事件
function deleteData() {
	var v_ids = iframe.iframeObj["table"].getSelectedObjs("groupId").join(",");
	var states = iframe.iframeObj["table"].getSelectedObjs("groupState").join(
			",");
	// 如果没有选中 数据则
	if (v_ids == "") {
		jyDialog({"type":"info"}).alert("请选择待删除的数据！");
		return;
	}
	if (states.indexOf('1') >= 0) {
		jyDialog({"type":"info"}).alert("已发布的任务不能删除！");
		//alert("已发布的任务不能删除！");
		return;
	}
	jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
		$.ajax({
			type : "POST",
			dataType:"json",
			url : contextRootPath
					+ "/quartzTaskGroupDef/deleteQuartzTaskGroupDef?ids="
					+ v_ids,
			success : function(msg) {
				$("").newMsg({}).show(msg.msg);;
				var v_status = msg.status;
				// 删除成功后
				if (v_status.indexOf('ok') > -1) {
					iframe.iframeObj["table"].removeSelectedRow();
				}
			}
		});
	   },"确认提示");
	
	
	/*if (confirm("您确认要删除选择的数据吗？")) {
		$.ajax({
			type : "POST",
			dataType:"json",
			url : contextRootPath
					+ "/quartzTaskGroupDef/deleteQuartzTaskGroupDef?ids="
					+ v_ids,
			success : function(msg) {
				$("").newMsg({}).show(msg.msg);;
				var v_status = msg.status;
				// 删除成功后
				if (v_status.indexOf('ok') > -1) {
					iframe.iframeObj["table"].removeSelectedRow();
				}
			}
		});
	}*/
}
// 查看明细
function viewData(vId) {
	var dialogStruct = {
		'display' : contextRootPath
				+ '/quartzTaskGroupDef/prepareExecute/toView?id=' + vId,
		'width' : 1000,
		'height' : 500,
		'title' : '查看明细',
		'isIframe' : 'true',
		'buttons' : [ {
			'text' : '关闭',
			'isClose' : true
		} ]
	};

	var dialogView = jyDialog(dialogStruct).open();
}

function openGroup(obj) {
	if(obj.groupState==1){
		jyDialog({"type":"info"}).alert("该任务分组已经发布！");
		//alert("该任务分组已经发布");
		return;
	}
	$.ajax({
		type : "POST",
		dataType:"json",
		url : contextRootPath
				+ '/quartzTaskGroupDef/updateGroupStateByGroupId?groupId='
				+ obj.groupId+'&groupState=1',
		success : function(msg) {
			var v_status = msg.status;
			// 发布任务成功
			if (v_status.indexOf('ok') > -1) {
				$("").newMsg({}).show("任务分组发布成功");
				//alert("任务分组发布成功");
				queryData();
			}else{
				$("").newMsg({}).show("任务分组发布失败");
				//alert("任务分组发布失败");
			}
		}
	});

}
function closeGroup(obj) {
	if(obj.groupState==0){
		jyDialog({"type":"info"}).alert("该任务分组已经取消发布！");
		//alert("该任务分组已经取消发布");
		return;
	}
	$.ajax({
		type : "POST",
		dataType:"json",
		url : contextRootPath
				+ '/quartzTaskGroupDef/updateGroupStateByGroupId?groupId='
				+ obj.groupId+'&groupState=0',
		success : function(msg) {
			var v_status = msg.status;
			// 取消任务成功
			if (v_status.indexOf('ok') > -1) {
				$("").newMsg({}).show("任务分组取消发布成功");
				//alert("任务分组取消发布成功");
				queryData();
			}else{
				$("").newMsg({}).show("任务分组取消发布失败");
				//alert("任务分组取消发布失败");
			}
		}
	});

}
function startGroup(obj) {
	if (obj.groupState == 0) {
		jyDialog({"type":"info"}).alert("请先发布任务分组！");
		//alert("请先发布任务分组！");
		return;
	}
	$.ajax({
		type : "POST",
		dataType:"json",
		url : contextRootPath
				+ '/quartzTaskGroupDef/insertToInstanceByGroupId?groupId='
				+ obj.groupId,
		success : function(msg) {
			var v_status = msg.status;
			// 立即执行操作成功
			if (v_status.indexOf('ok') > -1) {
				$("").newMsg({}).show("任务分组立即执行成功，请查看任务实例");
				//alert("任务分组立即执行成功，请查看任务实例");
				queryData();
			}
		}
	});
}