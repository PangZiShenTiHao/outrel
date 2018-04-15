//utf-8
//点击新增按钮 事件跳转至 新增页面
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/laTOutsourcrec/prepareExecute/toAdd',
		'width':800,
		'height':500,
		'title':'新增',
		'buttons':[
         {'text':'保存','action':doAddFrom,'isClose':true},
		 {'text':'关闭','isClose':true}
		]
	};
	
	var dialogAdd =jyDialog(dialogStruct).open();
}
//新增页面的保存操作
function doAddFrom(){
	//序列化 新增页面的form表单数据
	var params=$("#addNewsFormData").serialize();
	var url=contextRootPath+'/laTOutsourcrec/insertLaTOutsourcrec';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			//jyDialog({"type":"success"}).alert(msg.msg);
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		$("").newMsg({}).show(msg.msg);
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
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
			'display':contextRootPath+'/laTOutsourcrec/prepareExecute/toUpdate?id='+v_ids,
			'width':800,
			'height':500,
			'title':'修改',
			'buttons':[
             {'text':'保存','action':doUpdateFrom,'isClose':true},
			 {'text':'关闭','isClose':true}
			]
		};
		
	var dialogUpdate = jyDialog(dialogStruct).open();
}
//修改页面 的 保存操作
function doUpdateFrom(){
	//序列化 新增页面的form表单数据
	var params=$("#updateNewsFormData").serialize();
	var url=contextRootPath+'/laTOutsourcrec/updateLaTOutsourcrec';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//保存成功后，执行查询页面查询方法
			//jyDialog({"type":"success"}).alert(msg.msg);
        	var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		$("").newMsg({}).show(msg.msg);
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
	if(confirm("您确认要删除选择的数据吗？")){
        $.ajax({
            type:"POST",
            url:contextRootPath+"/laTOutsourcrec/deleteLaTOutsourcrec?ids="+v_ids,
            success:function(msg){
            	//jyDialog({"type":"success"}).alert(msg.msg);
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		$("").newMsg({}).show(msg.msg);
            		iframe.iframeObj["table"].removeSelectedRow();
            	}
            	
            	
            }
        });
    }
}
//查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/laTOutsourcrec/prepareExecute/toView?id='+vId,
			'width':800,
			'height':500,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}

//分派到委外组  方法
function toOutsource(){
	
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待分派的案件！");
		return;
	}
	
	var iscomm=iframe.iframeObj["table"].getSelectedObjs();
	for(var i=0;i<iscomm.length;i++){
		   if(iscomm[i].IS_COMMSN=='Y'){
			   jyDialog({"type":"info"}).alert("合同号"+iscomm[i].CONTRACT_ID+'已经委外分派，请重新选择');  
		          return;
			}
		}
	
	var url=contextRootPath+"/laTOutsourcrec/assignOutsource?ids="+v_ids;
	var params;
	
		if(jyDialog({"type":"question"}).confirm("您确认要分派到委外催收组吗？",function(){
		jyAjax(
				url,
				params,
				function(msg){
					//保存成功后，执行查询页面查询方法
					//jyDialog({"type":"success"}).alert(msg.msg);
		        	var v_status = msg.status;
		        	if(v_status.indexOf('ok') >-1){
		        		$("").newMsg({}).show(msg.msg);
		        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
		        		queryData();
		        	}
		  	});
		 },"确认提示"));
}

//分派到本司组  方法
function recyOutsource(){
	
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待分派的案件！");
		return;
	}
	
	var iscomm=iframe.iframeObj["table"].getSelectedObjs();
	for(var i=0;i<iscomm.length;i++){
		   if(iscomm[i].IS_COMMSN=='N'){
			   jyDialog({"type":"info"}).alert("合同号"+iscomm[i].CONTRACT_ID+'没有做委外分派，不能分派到本司组，请重新选择');  
		          return;
			}
		}
	
	var url=contextRootPath+"/laTOutsourcrec/recyOutsource?ids="+v_ids;
	var params;
	
	
		if(jyDialog({"type":"question"}).confirm("您确认要分派到本司催收组吗？",function(){
		jyAjax(
				url,
				params,
				function(msg){
					//保存成功后，执行查询页面查询方法
					//jyDialog({"type":"success"}).alert(msg.msg);
		        	var v_status = msg.status;
		        	if(v_status.indexOf('ok') >-1){
		        		$("").newMsg({}).show(msg.msg);
		        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
		        		queryData();
		        	}
		  	});
		 },"确认提示"));
}