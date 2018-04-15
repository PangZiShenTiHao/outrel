
//utf-8
//点击新增按钮 事件跳转至 新增页面
function toAddSysRoleUserData() {
	//获取用户选择的守权限角色信息
//	var roleId = SysRoleIframe.iframeObj["table"].getSelectedIds().join(",");
	var roleId=$("#roleId").val();
	if(roleId==""){
		jyDialog({"type":"info"}).alert("请选择角色！");
		//alert("请选择角色");
		return  false;
	}
	var dialogStruct = {
		'display' : contextRootPath+'/sysRoleUser/prepareExecute/selectUser?roleId='+roleId,
		'width' : 400,
		'height' : 500,
		'title' : '新增',
		'isIframe':'false',
		'buttons' : [ {
			'text' : '保存',
			'action' : doAddSysRoleUserFrom,
			'isClose' : false
		}, {
			'text' : '关闭',
			'isClose' : true
		} ]
	};
	dialogAdd = jyDialog(dialogStruct);
	dialogAdd.open();
}	

// 新增页面的保存操作
function doAddSysRoleUserFrom() {
	// 序列化 新增页面的form表单数据
//	var roleId = SysRoleIframe.iframeObj["table"].getSelectedIds().join(",");
	var roleId=$("#roleId").val();
	var userIds = selectUserIframe.iframeObj["table"].getSelectedIds().join(",");
	var url = contextRootPath + '/sysRoleUser/insertSysRoleUser';
	var params={
			userIds:userIds,
			roleId:roleId,
			targetType:"user"
	}; 
	// 通过ajax保存
	jyAjax(url, params, function(msg) {
		// 新增成功后，
		$("").newMsg({}).show(msg.msg);;
		var v_status = msg.status;
		if (v_status.indexOf('ok') > -1) {
			// 新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的 数据
			dialogAdd.close();
			querySysRoleUserData();
		}
	});
}
// 添加机构
var dialogOrgSelect = {};//此变量必须：弹出框的对象，关闭弹出框时需要调用
var receiveData = function(datas){//此方法为 弹出框树形控件选择后的数据接收方法，固定必须
	//datas 当弹出的页面中发生确定数据选择时，返回此数据,此处可自定义数据的处理
	//datas 数据的格式为json对象数组 [{ID:’’,NAME:’’},{ID:’’,NAME:’’},......]
	var userIds ="";
	for(var i = 0; i < datas.length;i++){
		if(i==datas.length-1){
			userIds+=datas[i].ID;
		}
		else{			
		userIds+=datas[i].ID+",";
		}
	}
//	var roleId = SysRoleIframe.iframeObj["table"].getSelectedIds().join(",");
	var roleId=$("#roleId").val();
	if(roleId==""){
		jyDialog({"type":"info"}).alert("请选择角色！");
		//alert("请选择角色");
		return false;
	}
	var url = contextRootPath + '/sysRoleUser/insertSysRoleUser';
	var params={
			userIds:userIds,
			roleId:roleId,
			targetType:"org"
	};
	// 通过ajax保存
	jyAjax(url, params, function(msg) {
		// 新增成功后，
		$("").newMsg({}).show(msg.msg);;
		var v_status = msg.status;
		if (v_status.indexOf('ok') > -1) {
			// 新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的 数据
			querySysRoleUserData();
		}
	});	
};

function toAddSysOrgData() {
//	var roleId = SysRoleIframe.iframeObj["table"].getSelectedIds().join(",");
	var roleId=$("#roleId").val();
	if(roleId==""){
		jyDialog({"type":"info"}).alert("请选择角色！");
		//alert("请选择角色");
		return false;
	}
	var dialogStruct={
				'display':contextRootPath+'/component/system/treeSysCurrentUserOrgSelect.jsp?check=true',
				'width':800,
				'height':500,
				'isIframe':'false',
				'title':'选择机构',
				'buttons':[]
			};
		
			dialogOrgSelect =jyDialog(dialogStruct);
			dialogOrgSelect.open();
		
//	var v_ids = SysRoleUserIframe.iframeObj["table"].getSelectedIds().join(",");
//	// 如果没有选中 数据则
//	if (v_ids == "") {
//		alert("请选择待修改的数据！");
//		return;
//	}
//	// 如果选择多个 择提示
//	if (v_ids.indexOf(",") > -1) {
//		alert("请选择一条数据！");
//		return;
//	}
//	var dialogStruct={
//			'display':contextRootPath+'/sysRoleUser/prepareExecute/toUpdate?id='+v_ids,
//			'width':800,
//			'height':500,
//			'title':'修改',
//			'buttons':[
//             {'text':'保存','action':doUpdateFrom,'isClose':true},
//			 {'text':'关闭','isClose':true}
//			]
//		};
//		
//	var dialogUpdate = jyDialog(dialogStruct).open();
}

// 删除 事件
function deleteData() {
	var v_ids = SysRoleUserIframe.iframeObj["table"].getSelectedIds().join(",");
	// 如果没有选中 数据则
	if (v_ids == "") {
		jyDialog({"type":"info"}).alert("请选择待删除的数据！");
		return;
	}
	jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
		$.ajax({
			type : "POST",
			dataType:"json",
			url : contextRootPath + "/sysRoleUser/deleteSysRoleUser?ids="+ v_ids,
			success : function(msg) {
//				msg = eval('('+msg+')');
				$("").newMsg({}).show(msg.msg);;
				var v_status = msg.status;
				// 删除成功后
				if (v_status.indexOf('ok') > -1) {
					SysRoleUserIframe.iframeObj["table"].removeSelectedRow();
					querySysRoleUserData();
				}

			}
		});
	   },"确认提示");
	
	/*if (confirm("您确认要删除选择的数据吗？")) {
		$.ajax({
			type : "POST",
			dataType:"json",
			url : contextRootPath + "/sysRoleUser/deleteSysRoleUser?ids="+ v_ids,
			success : function(msg) {
//				msg = eval('('+msg+')');
				$("").newMsg({}).show(msg.msg);;
				var v_status = msg.status;
				// 删除成功后
				if (v_status.indexOf('ok') > -1) {
					SysRoleUserIframe.iframeObj["table"].removeSelectedRow();
					querySysRoleUserData();
				}

			}
		});
	}*/
}

//查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/sysRoleUser/prepareExecute/toView?id='+vId,
			'width':800,
			'height':500,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};

	var dialogView = jyDialog(dialogStruct).open();
 }