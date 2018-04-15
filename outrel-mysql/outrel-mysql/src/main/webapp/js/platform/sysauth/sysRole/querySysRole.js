//utf-8
/**用户表单验证规则**/
var newFormrules={
		roleName: {required: true,maxlength: 50,},
		roleCode: {required: true,maxlength: 50,},
		roleType: {required: true,}
}
//表单提示信息,通常添加与修改表单页面的规则一致,仅当不一致时,再重新定义
var newFormMessages = {
		roleName: {required: "请填写角色名称",maxlength: "角色名称最多输入{0}个字符",},
		roleCode: {required: "请填写角色编码",maxlength: "角色编码最多输入{0}个字符",},
		roleType: {required: "请选择角色类型",}
}
function checkform(formid){
	return $(formid).validate({rules:newFormrules,messages:newFormMessages,success:jySuccess,errorPlacement:jyErrorPlacement,highlight:jyHighlight});
}


var sysroleDialog = null;//弹出窗口
//点击新增按钮 事件跳转至 新增页面
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/sysRole/prepareExecute/toAdd',
		'width':400,
		'height':300,
		'title':'新增',
		'isIframe':'false',
		'buttons':[
         {'text':'保存','action':doAddFrom,'isClose':false},
		 {'text':'关闭','isClose':true}
		]
	};
	sysroleDialog =jyDialog(dialogStruct);
	sysroleDialog.open();
}

//新增页面的保存操作
function doAddFrom(){
	//序列化 新增页面的form表单数据
	if(!checkform("#addNewsFormData").form()) return; 
	var params=$("#addNewsFormData").serialize();
	var url=contextRootPath+'/sysRole/insertSysRole';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			$("").newMsg({}).show(msg.msg);;
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		sysroleDialog.close();
        		queryData();
        		
        	}
  	});
}

//修改 事件
function toUpdateSysRoleData(){
	var v_ids = SysRoleIframe.iframeObj["table"].getSelectedIds().join(",");
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
			'display':contextRootPath+'/sysRole/prepareExecute/toUpdate?id='+v_ids,
			'width':400,
			'height':300,
			'isIframe':'false',
			'title':'修改',
			'buttons':[
             {'text':'保存','action':doUpdateFrom,'isClose':true},
			 {'text':'关闭','isClose':true}
			]
		};
		
	var sysroleUpdateDialog = jyDialog(dialogStruct);
	sysroleUpdateDialog.open();
}
//修改页面 的 保存操作
function doUpdateFrom(){
	//序列化 新增页面的form表单数据
	/*if(!checkform("#updateNewsFormData").form()) return; */
	var params= $("#updateNewsFormData").serialize();
	var url=contextRootPath+'/sysRole/updateSysRole';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//保存成功后，执行查询页面查询方法
			$("").newMsg({}).show(msg.msg);;
        	var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		//sysroleDialog.close();
        		queryData();
        	}
  	});
}
//删除 事件
function deleteSysRoleData(){
	  var roleName = $("input:radio:checked").parent().parent().parent().find("td:last").children("div").html();
	  if(roleName=="系统角色"){
		  jyDialog({"type":"info"}).alert("系统角色,禁止删除！");
		  //alert("系统角色,禁止删除");
		  return false;
	  }
	var v_ids = SysRoleIframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待删除的数据！");
		return;
	}
	jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
		$.ajax({
            type:"POST",
            url:contextRootPath+"/sysRole/deleteSysRole?ids="+v_ids,
            success:function(msg){
            	msg = eval('('+msg+')');
            	$("").newMsg({}).show(msg.msg);;
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		SysRoleIframe.iframeObj["table"].removeSelectedRow();
            		querySysRoleUserData();
            	}
            }
        });
	   },"确认提示");
	
	
	/*if(confirm("您确认要删除选择的数据吗？")){
        $.ajax({
            type:"POST",
            url:contextRootPath+"/sysRole/deleteSysRole?ids="+v_ids,
            success:function(msg){
            	msg = eval('('+msg+')');
            	$("").newMsg({}).show(msg.msg);;
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		SysRoleIframe.iframeObj["table"].removeSelectedRow();
            		querySysRoleUserData();
            	}
            }
        });
    }*/
}
//查看明细
function sysRoleviewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/sysRole/prepareExecute/toView?id='+vId,
			'width':600,
			'height':500,
			'isIframe' :false,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}

function queryDataByRoleId(obj){
//	var roleId= SysRoleIframe.iframeObj["table"].getSelectedIds().join(",");
//	$("input[name='roleId']").val(roleId);
//	$("input[id='tempSaveRoleId']").val(roleId);
//	querySysRoleUserData();
	
//	var vId = iframe.iframeObj["table"].getSelectedIds().join(",");
	var roleId = SysRoleIframe.iframeObj["table"].getSelectedObjs("id");
	debugger;
	$(parent.document).find("#right").attr("src",contextRootPath+"/sysRoleUser/prepareExecute/toQueryPage?id="+roleId);
}


function cleanSysRoleUserData(){
	jyDialog({"type":"question"}).confirm("您确认要清理离职人员的操作权限数据吗？",function(){
		$.ajax({
            type:"POST",
            url:contextRootPath+"/sysRoleUser/cleanSysRoleUser",
            success:function(msg){
            	msg = eval('('+msg+')');
            	$("").newMsg({}).show(msg.msg);;
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		SysRoleIframe.iframeObj["table"].removeSelectedRow();
            		//querySysRoleUserData();
            	}
            }
        });
	   },"确认提示");
}
