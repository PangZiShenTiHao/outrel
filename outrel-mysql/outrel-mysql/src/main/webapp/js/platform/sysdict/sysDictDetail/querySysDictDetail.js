//utf-8
//点击新增按钮 事件跳转至 新增页面
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/sysDictDetail/prepareExecute/toAdd?dictId='+dictId,
		'width':400,
		'height':300,
		'title':'新增',
		'isIframe':'false',
		'buttons':[
         {'text':'保存','action':doAddFrom,'isClose':true},
		 {'text':'关闭','isClose':true}
		]
	};
	var dialogAdd =jyDialog(dialogStruct).open();
}
//新增页面的保存操作
function doAddFrom(){
	//校验必填项
	if ( $("#addNewsFormData").find(".checkError").length>0 || !checkFormFormat("addNewsFormData") || !checkIsNull($("#addNewsFormData")[0])) {
		jyDialog({"type":"info"}).alert("请正确填写！");
		//alert("请正确填写！");
		return false;
	}
	//序列化 新增页面的form表单数据
	var params=$("#addNewsFormData").serialize();
	var url=contextRootPath+'/sysDictDetail/insertSysDictDetail';
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
	var v_ids = table.getSelectedIds().join(",");
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
	if(type==0){
		jyDialog({"type":"info"}).alert("系统级字典不能修改！");
		//alert("系统级字典不能修改！");
		return;
	}
	var dialogStruct={
			'display':contextRootPath+'/sysDictDetail/prepareExecute/toUpdate?id='+v_ids,
			'width':800,
			'height':500,
			'title':'修改',
			'isIframe':'false',
			'buttons':[
             {'text':'保存','action':doUpdateFrom,'isClose':true},
			 {'text':'关闭','isClose':true}
			]
		};
		
	var dialogUpdate = jyDialog(dialogStruct).open();
}

//唯一性验证
function queryDetailCodeIsOk(code){
	$.ajax({
        type:"POST",
        url:contextRootPath+"/sysDictDetail/queryDetailCodeIsOk?code="+code+"&dictId="+dictId,
        success:function(msg){
        	if(msg.data>0){
        		  $("").newMsg({}).show("该名称已经存在！");
        		//alert("该名称已经存在！");
        	}
        }
    });
	
}
//修改页面 的 保存操作
function doUpdateFrom(){
	//序列化 新增页面的form表单数据
	var params=$("#updateNewsFormData").serialize();
	var url=contextRootPath+'/sysDictDetail/updateSysDictDetail';
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
	if(type==0){
		jyDialog({"type":"info"}).alert("系统级字典不能删除！");
		//alert("系统级字典不能删除！");
		return;
	}
	var v_ids = table.getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待删除的数据！");
		return;
	}
	jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
		$.ajax({
            type:"POST",
            dataType: "json",
            url:contextRootPath+"/sysDictDetail/deleteSysDictDetail?ids="+v_ids,
            success:function(msg){
            	$("").newMsg({}).show(msg.msg);;
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		table.removeSelectedRow();
            	}
            	
            	
            }
        });
	   },"确认提示");
	
	
	
	/*if(confirm("您确认要删除选择的数据吗？")){
        $.ajax({
            type:"POST",
            dataType: "json",
            url:contextRootPath+"/sysDictDetail/deleteSysDictDetail?ids="+v_ids,
            success:function(msg){
            	$("").newMsg({}).show(msg.msg);;
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		table.removeSelectedRow();
            	}
            	
            	
            }
        });
    }*/
}
