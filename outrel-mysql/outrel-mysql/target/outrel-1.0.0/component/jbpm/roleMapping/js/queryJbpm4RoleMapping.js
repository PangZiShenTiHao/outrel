//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdateObj;
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/jbpm4RoleMapping/prepareExecute/toAdd',
		'width':800,
		'height':400,
		'title':'新增',
		'buttons':[
         {'text':'保存','action':doAddFrom,'isClose':false},
		 {'text':'关闭','isClose':true}
		]
	};
	
	dialogAddObj=jyDialog(dialogStruct);
	dialogAddObj.open();
}
//新增页面的保存操作
function doAddFrom(){
	debugger;
	var obj = dialogAddObj.getIframe();
	var flag = checkIsNull(obj.$("#addNewsFormData")[0]);
	if(flag){
		//序列化 新增页面的form表单数据
		var params=obj.$("#addNewsFormData").serialize();
		var url=contextRootPath+'/jbpm4RoleMapping/insertJbpm4RoleMapping';
		//通过ajax保存
		jyAjax(
			url,
			params,
			function(msg){
				//新增成功后，
				//jyDialog({"type":"warn"}).alert(msg.msg);
				$("").newMsg({}).show(msg.msg);
				var v_status = msg.status;
	        	if(v_status.indexOf('ok') >-1){
	        		dialogAddObj.close();
	        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
	        		queryData();
	        	}
	  	});
	}
}
//修改 事件
function toUpdateData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"warn"}).alert("请选择待修改的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"warn"}).alert("请选择一条数据！");
		return;
	}

	var dialogStruct={
			'display':contextRootPath+'/jbpm4RoleMapping/prepareExecute/toUpdate?id='+v_ids,
			'width':500,
			'height':600,
			'title':'修改',
			'buttons':[
             {'text':'保存','action':doUpdateFrom,'isClose':true},
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogUpdateObj = jyDialog(dialogStruct);
	dialogUpdateObj.open();
}
//修改页面 的 保存操作
function doUpdateFrom(){
	var obj = dialogUpdateObj.getIframe();
	//序列化 新增页面的form表单数据
	var params=obj.$("#updateNewsFormData").serialize();
	var url=contextRootPath+'/jbpm4RoleMapping/updateJbpm4RoleMapping';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//保存成功后，执行查询页面查询方法
			//jyDialog({"type":"warn"}).alert(msg.msg);
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
		jyDialog({"type":"warn"}).alert("请选择待删除的数据！");
		return;
	}
	jyDialog().confirm("您确认要删除选择的数据吗？", function(){
		$.ajax({
            type:"POST",
            dataType:"JSON",
            url:contextRootPath+"/jbpm4RoleMapping/deleteJbpm4RoleMapping?ids="+v_ids,
            success:function(msg){
            	//jyDialog({"type":"warn"}).alert(msg.msg);
            	$("").newMsg({}).show(msg.msg);
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		iframe.iframeObj["table"].removeSelectedRow();
            	}
            }
        });
	});
}
//查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/jbpm4RoleMapping/prepareExecute/toView?id='+vId,
			'width':500,
			'height':600,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}