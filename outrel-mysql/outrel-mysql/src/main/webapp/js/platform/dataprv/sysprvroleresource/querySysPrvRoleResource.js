//utf-8
//点击新增按钮 事件跳转至 新增页面
function toAddData(){
	window.location=contextRootPath+'/sysPrvRoleResource/prepareExecute/toAdd?roleId='+roleId+'&roleName='+roleName;
}
//新增页面的保存操作
function doAddFrom(){
	//序列化 新增页面的form表单数据
	var params=$("#addNewsFormData").serialize();
	var url=contextRootPath+'/sysPrvRoleResource/insertSysPrvRoleResource';
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
			'display':contextRootPath+'/sysPrvRoleResource/prepareExecute/toUpdate?id='+v_ids,
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
	var url=contextRootPath+'/sysPrvRoleResource/updateSysPrvRoleResource';
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
	            url:contextRootPath+"/sysPrvRoleResource/deleteSysPrvRoleResource?ids="+v_ids,
	            success:function(result){
	            	result = eval("("+result+")");
	            	   $("").newMsg({}).show(result.msg);
	            	//alert(result.msg);
	            	var v_status = result.status;
	            	//删除成功后
	            	if(v_status.indexOf('ok') >-1){
	            		iframe.iframeObj["table"].removeSelectedRow();
	            		queryData();
	            	}
	            	
	            	
	            }
	        });
	   },"确认提示");
	
	
	/*if(confirm("您确认要删除选择的数据吗？")){
        $.ajax({
            type:"POST",
            url:contextRootPath+"/sysPrvRoleResource/deleteSysPrvRoleResource?ids="+v_ids,
            success:function(result){
            	result = eval("("+result+")");
            	   $("").newMsg({}).show(result.msg);
            	//alert(result.msg);
            	var v_status = result.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		iframe.iframeObj["table"].removeSelectedRow();
            		queryData();
            	}
            	
            	
            }
        });
    }*/
}
//唯一性验证
function queryRoleResourceByResource(){
var resourceId = $("#dtoresourceId").val();
if(resourceId){
	var type = $("#dtoresourceType").val();
	$.ajax({
        type:"POST",
        url:contextRootPath+"/sysPrvRoleResource/queryRoleResourceByResource?resourceId="+resourceId+"&roleId="+roleId+"&resourceType="+type,
        success:function(msg){
        	if(msg.data>0){
        		   $("").newMsg({}).show("该名称已经存在！");
        		//alert("该名称已经存在！");
        	}
        }
    });
}
}