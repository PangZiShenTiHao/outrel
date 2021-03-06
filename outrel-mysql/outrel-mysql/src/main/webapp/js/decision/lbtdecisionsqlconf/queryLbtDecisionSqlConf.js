//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdateObj;
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/lbtDecisionSqlConf/prepareExecute/toAdd',
		'width':800,
		'height':500,
		'title':'新增',
		'isIframe':'false',
		'buttons':[
		           {'text':'保存','action':doAddFrom},{'text':'关闭','isClose':true}
		  		]
	};
	
	dialogAddObj=jyDialog(dialogStruct);
	dialogAddObj.open();
}
function doAddFrom(){
	//序列化 新增页面的form表单数据
	var moduleName = $("#dtomoduleName").val($("#dtomoduleType").find("option:selected").text());
	var childModuleName = $("#dtochildModuleName").val($("#dtochildModuleType").find("option:selected").text());
	var params=$("#addNewsFormData").serialize();
	var formName="addNewsFormData";
	if(!checkIsNull(formName)) {
		return;
	}
	var url=contextRootPath+'/lbtDecisionSqlConf/insertLbtDecisionSqlConf';
	//通过ajax保存
	jyAjax(url,params,function(msg){
			$("").newMsg({}).show(msg.msg);
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		dialogAddObj.close();
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
			'display':contextRootPath+'/lbtDecisionSqlConf/prepareExecute/toUpdate?id='+v_ids,
			'width':800,
			'height':500,
			'title':'修改',
			'isIframe':'false',
			'buttons':[
             {'text':'保存','action':doUpdateFrom},
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogUpdateObj = jyDialog(dialogStruct);
	dialogUpdateObj.open();
}
//修改页面 的 保存操作
function doUpdateFrom(){
	debugger;
	//序列化 修改页面的form表单数据
	var moduleName = $("#dtomoduleName").val($("#dtomoduleType").find("option:selected").text());
	var childModuleName = $("#dtochildModuleName").val($("#dtochildModuleType").find("option:selected").text());
	var params=$("#updateNewsFormData").serialize();
	var formName="updateNewsFormData";
	if(!checkIsNull(formName)) {
		return;
	}
	var url=contextRootPath+'/lbtDecisionSqlConf/updateLbtDecisionSqlConf';
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
        		dialogUpdateObj.close();
        		queryData();
        	}
  	});
}
//删除 事件
function deleteData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待删除的数据！");
		return;
	}
	jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
		$.ajax({
            type:"POST",
            dataType:"json",
            url:contextRootPath+"/lbtDecisionSqlConf/deleteLbtDecisionSqlConf?id="+v_ids,
            success:function(msg){
            	$("").newMsg({}).show(msg.msg);
            	var v_status = msg.status;
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
			'display':contextRootPath+'/lbtDecisionSqlConf/prepareExecute/toView?id='+vId,
			'width':800,
			'height':500,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}


//同步基础数据
function synBaseData(){

	jyDialog({"type":"question"}).confirm("您确认要同步基础数据吗？",function(){
		var params ="";
		var url = contextRootPath+"/lbtDecisionSqlConf/synBaseData";
		jyAjax(
				url,
				params,
				function(msg){
					$("").newMsg({}).show(msg.msg);
		  	});
	   },"确认提示");
}