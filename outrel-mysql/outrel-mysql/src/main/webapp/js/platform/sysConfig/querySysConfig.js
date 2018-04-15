//utf-8
//表单规则,通常添加与修改表单页面的规则一致,仅当不一致时,再重新定义
var newFormrules_add={
	configName: {
		required: true,
		maxlength: 50
	},
	configCode: {
		required: true,
		maxlength: 50
	},
	configValue: {
		required: true,
		maxlength: 500
	},
	configType: {
		required: true,
		maxlength: 50
	}
}
//表单提示信息,通常添加与修改表单页面的规则一致,仅当不一致时,再重新定义
var newFormMessages_add = {
	configName: {
		required: "请填写配置项名称",
		maxlength: "配置项名称最多输入{0}个字符",
	},
	configCode: {
		required: "请填写配置项编码",
		maxlength: "配置项编码最多输入{0}个字符",
	},
	configValue: {
		required: "请填写配置项值",
		maxlength: "配置项值最多输入{0}个字符",
	},
	configType: {
		required: "请选择配置类型"
	}
}
//校验 在页面加载完时,A需要初始化加载一次checkform("#formid");B按钮操作往后台提交数据时,先校验if(!checkform("#formid").form()) return; 
function checkform(formid){
	var t = $(formid).validate({rules:newFormrules_add,messages:newFormMessages_add,success:jySuccess,errorPlacement:jyErrorPlacement,highlight:jyHighlight});
	return t;
}

var dialogAdd = null;

//点击新增按钮 事件跳转至 新增页面
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/sysConfig/prepareExecute/toAdd',
		'width':800,
		'height':500,
		'title':'新增',
		'isIframe':'false',
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
	if(!checkform("#addNewsFormData").form()) return; 
	//序列化 新增页面的form表单数据
	var params=$("#addNewsFormData").serialize();
	var url=contextRootPath+'/sysConfig/insertSysConfig';
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
        		dialogAdd.close();
        		queryData();
        	}
  	});
}

//唯一性验证
function queryConfigCodeIsOk(code){
	$.ajax({
        type:"POST",
        dataType:"json",
        url:contextRootPath+"/sysConfig/queryConfigCodeIsOk?code="+code,
        success:function(msg){
        	if(msg.data>0){
        		 $("").newMsg({}).show("该编码已经存在");
        		//alert("该编码已经存在！");
        		$('#dtoconfigCode').val('');
        	}
        }
    });
}
//修改 事件
var dialogUpdate = null;
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
			'display':contextRootPath+'/sysConfig/prepareExecute/toUpdate?id='+v_ids,
			'width':800,
			'height':500,
			'title':'修改',
			'isIframe':'true',
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
	//序列化 新增页面的form表单数据
	var obj = dialogUpdate.getIframe();
	var params=obj.$("#updateNewsFormData").serialize();
	var url=contextRootPath+'/sysConfig/updateSysConfig';
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
        		dialogUpdate.close();
        		queryData();
        	}
  	});
}

//到“删除Redis锁”页面
var dialogDeleteRedisLock = null;
function toDeleteRedisLock(){
	
	var dialogStruct={
			'display':contextRootPath+'/sysConfig/prepareExecute/toDeleteRedisLock',
			'width':800,
			'height':200,
			'title':'删除Redis锁',
			'isIframe':'true',
			'buttons':[
             {'text':'确定删除','action':doDeleteLock,'isClose':false},
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogDeleteRedisLock = jyDialog(dialogStruct);
	dialogDeleteRedisLock.open();
}

//删除Redis锁
function doDeleteLock(){
	//序列化 新增页面的form表单数据
	var obj = dialogDeleteRedisLock.getIframe();
	var params = obj.$("#deleteLockFormData").serialize();
	var url = contextRootPath+'/sysConfig/deleteRedisLock';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			$("").newMsg({}).show(msg.msg);;
        	var v_status = msg.status;
        	if(v_status.indexOf('ok') > -1){
        		dialogDeleteRedisLock.close();
        	}
  	});
}

//到执行shell脚本页面
var dialogExecShell = null;
function toExecShell(){
	var dialogStruct={
			'display':contextRootPath+'/sysShell/prepareExecute/toExecShell',
			'width':800,
			'height':300,
			'title':'执行Shell脚本',
			'isIframe':'true',
			'buttons':[
             {'text':'执行Shell脚本','action':doExecShell,'isClose':false},
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogExecShell = jyDialog(dialogStruct);
	dialogExecShell.open();
}

//执行shell脚本
function doExecShell(){
	//序列化 新增页面的form表单数据
	var obj = dialogExecShell.getIframe();
	var params = obj.$("#execShellFormData").serialize();
	var url = contextRootPath+'/sysShell/execShell';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			$("").newMsg({}).show(msg.msg);;
        	var v_status = msg.status;
        	if(v_status.indexOf('ok') > -1){
        		dialogExecShell.close();
        	}
  	});
}


//删除 事件
function deleteData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	var v = iframe.iframeObj["table"].getSelectedObjs("configType");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待删除的数据！");
		return;
	}
	if(v.indexOf("0")>=0){
		jyDialog({"type":"info"}).alert("系统级变量无法删除！");
		//alert("系统级变量无法删除！");
		return;
	}
	jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
		$.ajax({
            type:"POST",
            url:contextRootPath+"/sysConfig/deleteSysConfig?ids="+v_ids,
            success:function(msg){
            	var msg = eval('('+msg+')');
            	$("").newMsg({}).show(msg.msg);;
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		iframe.iframeObj["table"].removeSelectedRow();
            		iframe.iframeObj["table"].query();
            	}
            	
            	
            }
        });
	   },"确认提示");
	
	/*if(confirm("您确认要删除选择的数据吗？")){
        $.ajax({
            type:"POST",
            url:contextRootPath+"/sysConfig/deleteSysConfig?ids="+v_ids,
            success:function(msg){
            	var msg = eval('('+msg+')');
            	$("").newMsg({}).show(msg.msg);;
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		iframe.iframeObj["table"].removeSelectedRow();
            		iframe.iframeObj["table"].query();
            	}
            	
            	
            }
        });
    }*/
}

//删除缓存
function deleteCache(){
	jyDialog({"type":"question"}).confirm("您确认要删除数据缓存吗？",function(){
		//清空ehcache 缓存
		try{
			$.ajax({
	            type:"POST",
	            url:contextRootPath+"/sysConfig/deleteDataCache",
	            success:function(msg){
	            	var msg = eval('('+msg+')');
	            	$("").newMsg({}).show(msg.msg);;
	            	var v_status = msg.status;
	            	//删除成功后
	            	if(v_status.indexOf('ok') >-1){
	            		iframe.iframeObj["table"].query();
	            	}
	            	
	            	
	            }
	        });
		}catch(e){
					
		}
		//清空redis 缓存
		try{
			$.ajax({
	            type:"POST",
	            dataType:"JSON",
	            url:contextRootPath+"/sysConfig/cleanDataCache",
	            success:function(msg){
	            	//$("").newMsg({}).show(msg.msg);;
	            	$("").newMsg({}).show(msg.msg);
	            	/*var v_status = msg.status;
	            	//删除成功后
	            	if(v_status.indexOf('ok') >-1){
	            		 $("").newMsg({}).show(msg.msg);
	            	}*/
	            }
	        });
		}catch(e){
			
		}
		

	   },"确认提示");
	
	/*if(confirm("您确认要删除数据缓存吗？")){
        $.ajax({
            type:"POST",
            url:contextRootPath+"/sysConfig/deleteDataCache",
            success:function(msg){
            	var msg = eval('('+msg+')');
            	$("").newMsg({}).show(msg.msg);;
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		iframe.iframeObj["table"].query();
            	}
            	
            	
            }
        });
    }*/
}



//查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/sysConfig/prepareExecute/toView?id='+vId,
			'width':800,
			'height':500,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}

//清空redis全部缓存 信息
function cleanAllRedisCache(){
	jyDialog({"type":"question"}).confirm("您确认要清空redis全部数据缓存吗？",function(){
		//清空redis 缓存
		try{
			$.ajax({
	            type:"POST",
	            dataType:"JSON",
	            url:contextRootPath+"/sysConfig/cleanAllDataCache",
	            success:function(msg){
	            	//$("").newMsg({}).show(msg.msg);;
	            	$("").newMsg({}).show(msg.msg);
	            	/*var v_status = msg.status;
	            	//删除成功后
	            	if(v_status.indexOf('ok') >-1){
	            		 $("").newMsg({}).show(msg.msg);
	            	}*/
	            }
	        });
		}catch(e){
			
		}
		

	   },"确认提示");
}
