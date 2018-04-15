//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
function toAddData(){
	var orgtype=$("#orgtype").val();
	var dialogStruct={
		'display':contextRootPath+'/vmruleMapping/prepareExecute/toAdd?orgtype='+orgtype,
		'width':800,
		'height':500,
		'title':'新增',
		'buttons':[
         {'text':'保存','action':doAddFrom,'isClose':false},
		 {'text':'关闭','isClose':true}
		]
	};
	
	dialogAddObj =jyDialog(dialogStruct);
	dialogAddObj.open();
}
//新增页面的保存操作
function doAddFrom(){
	//序列化 新增页面的form表单数据
	//校验必填项
	var obj =dialogAddObj.getIframe();
	//是否全部通过 校验
	var dtomapKey = obj.$("#dtomapKey").val();
	var dtomapValue = obj.$("#dtomapValue").val();
	
	if(dtomapKey=='')
	{
		jyDialog({"type":"info"}).alert("关联key值不能为空!");
		//alert("关联key值不能为空!!!")
		return;
	}
	
	if(dtomapValue=='')
	{
		jyDialog({"type":"info"}).alert("关联value值不能为空!");
		//alert("关联value值不能为空!!!")
		return;
	}
	
	var params=obj.$("#addNewsFormData").serialize();
	var url=contextRootPath+'/vmruleMapping/insertVmruleMapping';
	//通过ajax保存
	//校验必填项
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			 $("").newMsg({}).show(msg.msg);
			//$("").newMsg({}).show(msg.msg);;
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
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
		jyDialog({"type":"info"}).alert("请选择待修改的数据!");
		//alert("请选择待修改的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"info"}).alert("请选择一条数据!");
		//alert("请选择一条数据！");
		return;
	}

	var dialogStruct={
			'display':contextRootPath+'/vmruleMapping/prepareExecute/toUpdate?id='+v_ids,
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
	var url=contextRootPath+'/vmruleMapping/updateVmruleMapping';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//保存成功后，执行查询页面查询方法
			 $("").newMsg({}).show(msg.msg);
			//$("").newMsg({}).show(msg.msg);;
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
	var orgtype=$("#orgtype").val();
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待删除的数据！");
		//alert("请选择待删除的数据！");
		return;
	}
	 jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
		 $.ajax({
	            type:"POST",
	            url:contextRootPath+"/vmruleMapping/deleteVmruleMapping?ids="+v_ids+"&orgtype="+orgtype,
	            success:function(msg){
	            	msg = eval('('+msg+')');
	            	 $("").newMsg({}).show(msg.msg);
	            	//$("").newMsg({}).show(msg.msg);;
	            	var v_status = msg.status;
	            	//删除成功后
	            	if(v_status.indexOf('ok') >-1){
	            		queryData();
	            	}
	            }
	        });
	   },"确认提示");
	
	/*if(confirm("您确认要删除选择的数据吗？")){
        $.ajax({
            type:"POST",
            url:contextRootPath+"/vmruleMapping/deleteVmruleMapping?ids="+v_ids+"&orgtype="+orgtype,
            success:function(msg){
            	msg = eval('('+msg+')');
            	$("").newMsg({}).show(msg.msg);;
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		queryData();
            	}
            }
        });
    }*/
}

//数据权限刷新 事件

function fulshAuth()
{
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	var orgtype=$("#orgtype").val();
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待刷新的数据权限！");
		//alert("请选择待刷新的数据权限！");
		return;
	}
	
	  jyDialog({"type":"question"}).confirm("您确认要刷新所选择数据权限吗？",function(){
		  $.ajax({
	            type:"POST",
	            url:contextRootPath+"/vmruleMapping/fulshVmruleMapping?ids="+v_ids+"&orgtype="+orgtype,
	            success:function(msg){
	            	msg = eval('('+msg+')');
	            	$("").newMsg({}).show(msg.msg);;
	            	var v_status = msg.status;
	            	//删除成功后
	            	if(v_status.indexOf('ok') >-1){
	            		queryData();
	            	}
	            }
	        });
		   },"确认提示");
	
	
	/*if(confirm("您确认要刷新所选择数据权限吗？")){
        $.ajax({
            type:"POST",
            url:contextRootPath+"/vmruleMapping/fulshVmruleMapping?ids="+v_ids+"&orgtype="+orgtype,
            success:function(msg){
            	msg = eval('('+msg+')');
            	$("").newMsg({}).show(msg.msg);;
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		queryData();
            	}
            }
        });
    }*/
}

//查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/vmruleMapping/prepareExecute/toView?id='+vId,
			'width':800,
			'height':500,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}


function cleanAuth(){
	var orgtype=$("#orgtype").val();
	  jyDialog({"type":"question"}).confirm("您确认要清理离职人员数据权限吗？",function(){
		  $.ajax({
	            type:"POST",
	            url:contextRootPath+"/vmruleMapping/cleanVmruleMapping?orgtype="+orgtype,
	            success:function(msg){
	            	msg = eval('('+msg+')');
	            	$("").newMsg({}).show(msg.msg);;
	            	var v_status = msg.status;
	            	//删除成功后
	            	if(v_status.indexOf('ok') >-1){
	            		queryData();
	            	}
	            }
	        });
		   },"确认提示");
}