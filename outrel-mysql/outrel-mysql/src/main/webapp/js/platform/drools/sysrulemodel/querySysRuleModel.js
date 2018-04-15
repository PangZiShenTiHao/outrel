//utf-8

function configAttr(modelId){
	/*var dialogConfigAttrStruct={
			'display':contextRootPath+'/sysRuleModel/prepareExecute/treeConfigAttr?id='+modelId,
			'width':1200,
			'height':700,
			'title':'属性配置',
			'buttons':[
	         {'text':'保存','action':doConfigAttr,'isClose':true},
			 {'text':'关闭','isClose':true}
			]
		};
	var	dialogConfigAttr =jyDialog(dialogConfigAttrStruct);
		dialogConfigAttr.open();*/
		
	var newPOJO={"title":"属性配置","url":contextRootPath+'/sysRuleModel/prepareExecute/treeConfigAttr?id='+modelId};
	window.parent.tabs.add(newPOJO);
}
function doConfigAttr(){
	
}


function queryTable(){
	var dialogStruct={
			'display':contextRootPath+'/sysRuleModel/prepareExecute/toQueryTableInfo',
			'width':800,
			'height':500,
			'title':'新增',
			'buttons':[
	         {'text':'保存','action':doAddFrom,'isClose':true},
			 {'text':'关闭','isClose':true}
			]
		};
		 dialogAdd =jyDialog(dialogStruct);
		 dialogAdd.open();
	
}


//点击新增按钮 事件跳转至 新增页面
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/sysRuleModel/prepareExecute/toAdd',
		'width':1200,
		'height':700,
		'title':'新增',
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
	//序列化 新增页面的form表单数据
	//dialogAdd.iframe.contentDocument.getElementById("addNewsFormData")
	//是否全部通过 校验
	var flag = checkIsNull(dialogAdd.iframe.contentDocument.getElementById("addNewsFormData"));
	if(!flag) return;
	
	var params=$(dialogAdd.iframe.contentDocument.getElementById("addNewsFormData")).serialize();
	var url=contextRootPath+'/sysRuleModel/insertSysRuleModel';
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
        		queryData();
        		dialogAdd.close();
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
			'display':contextRootPath+'/sysRuleModel/prepareExecute/toUpdate?id='+v_ids,
			'width':1200,
			'height':700,
			'title':'修改',
			'buttons':[
             {'text':'保存','action':doUpdateFrom,'isClose':true},
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogUpdate = jyDialog(dialogStruct);
	dialogUpdate.open();
}
//修改页面 的 保存操作
function doUpdateFrom(){
	//序列化 新增页面的form表单数据
	//var params=$("#updateNewsFormData").serialize();
	
	var params=$(dialogUpdate.iframe.contentDocument.getElementById("updateNewsFormData")).serialize();
	var url=contextRootPath+'/sysRuleModel/updateSysRuleModel';
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
        		queryData();
        	}
  	});
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
	            url:contextRootPath+"/sysRuleModel/isDeleteSysRuleModel?ids="+v_ids,
	            success:function(data){
	            	var msg = eval('('+data+')');
	            	if(msg.msg==0)
	            	{
	            		  $.ajax({
	            	            type:"POST",
	            	            url:contextRootPath+"/sysRuleModel/deleteSysRuleModel?ids="+v_ids,
	            	            success:function(data){
	            	            	var msg = eval('('+data+')');
	            	            	$("").newMsg({}).show(msg.msg);;
	            	            	var v_status = msg.status;
	            	            	//删除成功后
	            	            	if(v_status.indexOf('ok') >-1){
	            	            		iframe.iframeObj["table"].removeSelectedRow();
	            	            	}
	            	            }
	            	        });
	            		
	            		
	            	}else
	            	{
	            		jyDialog({"type":"warn"}).alert("业务模型有关联关系，不能删除！");
	            		//alert("业务模型有关联关系，不能删除");
	            	}
	            	
	            }
	        });  
	   },"确认提示");
	
	/*if(confirm("您确认要删除选择的数据吗？")){
		
		 $.ajax({
	            type:"POST",
	            url:contextRootPath+"/sysRuleModel/isDeleteSysRuleModel?ids="+v_ids,
	            success:function(data){
	            	var msg = eval('('+data+')');
	            	if(msg.msg==0)
	            	{
	            		  $.ajax({
	            	            type:"POST",
	            	            url:contextRootPath+"/sysRuleModel/deleteSysRuleModel?ids="+v_ids,
	            	            success:function(data){
	            	            	var msg = eval('('+data+')');
	            	            	$("").newMsg({}).show(msg.msg);;
	            	            	var v_status = msg.status;
	            	            	//删除成功后
	            	            	if(v_status.indexOf('ok') >-1){
	            	            		iframe.iframeObj["table"].removeSelectedRow();
	            	            	}
	            	            }
	            	        });
	            		
	            		
	            	}else
	            	{
	            		jyDialog({"type":"warn"}).alert("业务模型有关联关系，不能删除！");
	            		//alert("业务模型有关联关系，不能删除");
	            	}
	            	
	            }
	        });  
    }*/
}
//查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/sysRuleModel/prepareExecute/toView?id='+vId,
			'width':1200,
			'height':700,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}