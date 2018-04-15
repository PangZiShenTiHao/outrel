//utf-8
/**用户表单验证规则**/
var newFormrules={
	userName: {required: true,minlength: 2,maxlength: 50},
	userNo: {required: true,minlength: 2,maxlength: 50},
	loginName: {required: true,minlength: 6,maxlength: 50},
	password: {required: true,minlength: 6,maxlength: 50},
	mainOrgName: {isNotClickSelect: true},
	positionName: {isNotClickSelect: true},
	mobile:{isMobile: true},
	email:{email: true},
	education: {maxlength: 50},
	job: {maxlength: 50},
	homeAddress:{maxlength: 100},
	homeZipcode:{isZipCode:true},
	homeTel:{isPhone: true},
	officeTel:{isPhone: true},
	officeAddress: {maxlength: 100}
}
//表单提示信息,通常添加与修改表单页面的规则一致,仅当不一致时,再重新定义
var newFormMessages = {
	userName: {required: "请填写姓名",minlength: "姓名至少输入{0}个字符",maxlength: "姓名最多输入{0}个字符"},
	userNo: {required: "请填写编码",minlength: "编码至少输入{0}个字符",maxlength: "编码最多输入{0}个字符"},
	loginName: {required: "请填写登录名",minlength: "登录名至少输入{0}个字符",maxlength: "登录名最多输入{0}个字符"},
	password: {required: "请填写登录密码",minlength: "登录密码至少输入{0}个字符",maxlength: "登录密码最多输入{0}个字符"},
	mainOrgName: {isNotClickSelect: "请选择主机构"},
	positionName: {isNotClickSelect: "请选择任职岗位"},
	education: {maxlength: "教育机构最多输入{0}个字符"},
	job: {maxlength: "职务最多输入{0}个字符"},
	homeAddress:{maxlength: "家庭住址最多输入{0}个字符"},
	officeAddress:{maxlength: "办公住址最多输入{0}个字符"}
	
}
//校验 在页面加载完时,A需要初始化加载一次checkform("#formid");B按钮操作往后台提交数据时,先校验if(!checkform("#formid").form()) return; 
function checkform(formid){
	return $(formid).validate({rules:newFormrules,messages:newFormMessages,success:jySuccess,errorPlacement:jyErrorPlacement,highlight:jyHighlight});
}


//点击新增按钮 事件跳转至 新增页面
function toAddData(){
	$("#userTableDiv").load(contextRootPath+'/sysUser/prepareExecute/toAdd');
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
	
	$("#userTableDiv").load(contextRootPath+'/sysUser/prepareExecute/toUpdate?id='+v_ids);

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
    		dataType: 'json',
            url:contextRootPath+"/sysUser/deleteSysUser?ids="+v_ids,
            success:function(msg){
            	$("").newMsg({}).show(msg.msg);;
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		iframe.iframeObj["table"].removeSelectedRow();
            	}
            	
            	
            }
        });
	   },"确认提示");
	
	
	
	/*if(confirm("您确认要删除选择的数据吗？")){
        $.ajax({
            type:"POST",
    		dataType: 'json',
            url:contextRootPath+"/sysUser/deleteSysUser?ids="+v_ids,
            success:function(msg){
            	$("").newMsg({}).show(msg.msg);;
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		iframe.iframeObj["table"].removeSelectedRow();
            	}
            	
            	
            }
        });
    }*/
}
//查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/sysUser/prepareExecute/toView?id='+vId,
			'width':800,
			'height':500,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}
//设置无效 事件
function setDisabledData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"warn"}).alert("请选择待设置无效的数据！");
		return;
	}
	jyDialog({"type":"question"}).confirm("您确认要选择的设置无效数据吗？",function(){
		 $.ajax({
	            type:"POST",
	    		dataType: 'json',
	            url:contextRootPath+"/sysUser/deleteSysUser?ids="+v_ids,
	            success:function(msg){
	            	$("").newMsg({}).show(msg.msg);
	            	var v_status = msg.status;
	            	//删除成功后
	            	if(v_status.indexOf('ok') >-1){
	            		iframe.iframeObj["table"].query();
	            	}
	            }
	        });
	 },"确认提示");
}
//查看明细
function viewRoles(obj){
	var dialogStruct={
			'display':contextRootPath+'/sysRole/prepareExecute/toViewRoles?id='+obj['id'],
				'width':800,
				'height':500,
				'title':'查看用户角色',
				'buttons':[
				 {'text':'关闭','isClose':true}
				]
		};
		var dialogViewRole = jyDialog(dialogStruct).open();
}

//同步密码
function synLdapData(){
	$("#userTableDiv").load(contextRootPath+'/sysUser/prepareExecute/toSynLdapData');	
}

/**
 * 变更用户权限
 */
function changeBaseResource(){
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
			'display':contextRootPath+'/sysUser/prepareExecute/toChangeBaseResource?id='+v_ids,
			'width':800,
			'height':500,
			'title':'变更资源',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}