//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAdd;
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/sysPrvRole/prepareExecute/toAdd',
		'width':400,
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
	var form = document.getElementById("addNewsFormData");
	if (checkIsNull(form)) {
		//序列化 新增页面的form表单数据
		var params=$("#addNewsFormData").serialize();
		var url=contextRootPath+'/sysPrvRole/insertSysPrvRole';
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
	}else{
		jyDialog({"type":"warn"}).alert("请完整的填写数据！");
		//alert("请完整的填写数据");
	}
}
var dialogUpdate;
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
			'display':contextRootPath+'/sysPrvRole/prepareExecute/toUpdate?id='+v_ids,
			'width':400,
			'height':500,
			'title':'修改',
			'isIframe':'false',
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
	var form = document.getElementById("updateNewsFormData");
	if (checkIsNull(form)) {
		var params=$("#updateNewsFormData").serialize();
		var url=contextRootPath+'/sysPrvRole/updateSysPrvRole';
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
	}else{
		jyDialog({"type":"warn"}).alert("请完整的填写数据！");
		//alert("请完整的填写数据");
	}
}
//删除 事件
function deleteData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待删除的数据！");
		//alert("请选择待删除的数据！");
		return;
	}
	
	jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
		$.ajax({
            type:"POST",
            url:contextRootPath+"/sysPrvRole/deleteSysPrvRole?ids="+v_ids,
            success:function(msg){
            	msg = eval('('+msg+')');
            	$("").newMsg({}).show(msg.msg);;
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		//iframe.iframeObj["table"].removeSelectedRow();
            		queryData();
            	}
            }
        });
	   },"确认提示");
	
	
	/*if(confirm("您确认要删除选择的数据吗？")){
        $.ajax({
            type:"POST",
            url:contextRootPath+"/sysPrvRole/deleteSysPrvRole?ids="+v_ids,
            success:function(msg){
            	msg = eval('('+msg+')');
            	$("").newMsg({}).show(msg.msg);;
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		//iframe.iframeObj["table"].removeSelectedRow();
            		queryData();
            	}
            }
        });
    }*/
}

function viewUserData(obj){
	var roleId = obj.id;
	$(parent.document).find("#info").attr("src",contextRootPath+"/sysPrvRoleAuth/prepareExecute/toQueryPage?roleId="+roleId+"&roleName="+obj.roleName);
}

function viewResourceData(obj){
	var roleId = obj.id;
	$(parent.document).find("#info").attr("src",contextRootPath+"/sysPrvRoleResource/prepareExecute/toQueryPage?roleId="+roleId+"&roleName="+obj.roleName);
}

//唯一性验证
function queryRoleByCode(code){
	if(code){
	$.ajax({
        type:"POST",
        url:contextRootPath+"/sysPrvRole/queryRoleByCode?code="+code,
        success:function(msg){
        	if(msg.data>0){
        		 $("").newMsg({}).show("该编码已经存在！");
        		//alert("该编码已经存在！");
        	}
        }
    });
	}
}

//权限更新
//function updateData(){
  //  $.ajax({
    //    type:"POST",
      //  url:contextRootPath+"/sysPrvAuthResult/insertSysAuthResult",
    //    success:function(msg){
        	//queryData();
        //	msg = eval('('+msg+')');
        //	$("").newMsg({}).show(msg.msg);;
       // }
   // });
//}

function updateData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待刷新权限角色！");
		//alert("请选择待刷新权限角色！");
		return;
	}
	
	jyDialog({"type":"question"}).confirm("您确认要刷新所选数据角色权限吗？",function(){
		$.ajax({
            type:"POST",
            url:contextRootPath+"/sysPrvAuthPool/insertSysAuthPool?ids="+v_ids,
            success:function(msg){
             	//queryData();
             	msg = eval('('+msg+')');
             	$("").newMsg({}).show(msg.msg);;
             	var v_status = msg.status;
            	if(v_status.indexOf('ok') >-1){
            		queryData();
            	}
            }
        });
	   },"确认提示");
	
	
	/*if(confirm("您确认要刷新所选数据角色权限吗？")){
        $.ajax({
            type:"POST",
            url:contextRootPath+"/sysPrvAuthPool/insertSysAuthPool?ids="+v_ids,
            success:function(msg){
             	//queryData();
             	msg = eval('('+msg+')');
             	$("").newMsg({}).show(msg.msg);;
             	var v_status = msg.status;
            	if(v_status.indexOf('ok') >-1){
            		queryData();
            	}
            }
        });
    }	*/
}






