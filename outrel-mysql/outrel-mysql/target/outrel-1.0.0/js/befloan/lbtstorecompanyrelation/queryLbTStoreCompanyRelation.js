//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdateObj;
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/lbTStoreCompanyRelation/prepareExecute/toAdd',
		'width':850,
		'height':300,
		'title':'新增',
		'buttons':[
         {'text':'保存','action':doAddFrom,'isClose':true},
		 {'text':'关闭','isClose':true}
		]
	};
	
	dialogAddObj=jyDialog(dialogStruct);
	dialogAddObj.open();
}
//新增页面的保存操作
function doAddFrom(){
	
	var obj = dialogAddObj.getIframe();
	//序列化 新增页面的form表单数据
	var params=obj.$("#addNewsFormData").serialize();
	//校验门店是否已经存在分公司名称
	
	var v_comName = obj.$("#dtocompanyName").val();
	if(v_comName == null || v_comName ==''){
		$("").newMsg({}).show("请填写公司名称！");
		return false;
	}
	var v_orgId = obj.$("#dtoorgId").val();
	if(v_orgId == null || v_orgId ==''){
		$("").newMsg({}).show("请选择门店！");
		return false;
	}
	
	var v_url = contextRootPath+'/lbTStoreCompanyRelation/queryLbTStoreCompanyRelationInfo?orgId='+v_orgId;
	jyAjax(
		v_url,
		'',
		function(msg){
			if(msg.msg != 'ok'){
				$("").newMsg({}).show(msg.msg);
				return false;
			}else{
				var url=contextRootPath+'/lbTStoreCompanyRelation/insertLbTStoreCompanyRelation';
				//通过ajax保存
				jyAjax(
					url,
					params,
					function(msg){
						//新增成功后，
						$("").newMsg({}).show(msg.msg);
						var v_status = msg.status;
			        	if(v_status.indexOf('ok') >-1){
			        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
			        		queryData();
			        	}
			  	});
			}
		});
	
}
//修改 事件
function toUpdateData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		$("").newMsg({}).show("请选择待修改的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		$("").newMsg({}).show("请选择一条数据！");
		return;
	}

	var dialogStruct={
			'display':contextRootPath+'/lbTStoreCompanyRelation/prepareExecute/toUpdate?id='+v_ids,
			'width':800,
			'height':200,
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
	var v_comName = obj.$("#dtocompanyName").val();
	if(v_comName == null || v_comName ==''){
		$("").newMsg({}).show("请填写公司名称！");
		return false;
	}
	var v_orgId = obj.$("#dtoorgId").val();
	if(v_orgId == null || v_orgId ==''){
		$("").newMsg({}).show("请选择门店！");
		return false;
	}
	var url=contextRootPath+'/lbTStoreCompanyRelation/updateLbTStoreCompanyRelation';
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
        		queryData();
        	}
  	});
	
}
//删除 事件
function deleteData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		$("").newMsg({}).show("请选择待删除的数据！");
		return;
	}
	if(confirm("您确认要删除选择的数据吗？")){
        $.ajax({
            type:"POST",
            dataType:"JSON",
            url:contextRootPath+"/lbTStoreCompanyRelation/deleteLbTStoreCompanyRelation?ids="+v_ids,
            success:function(msg){
            	$("").newMsg({}).show(msg.msg);
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		iframe.iframeObj["table"].removeSelectedRow();
            	}
            	
            	
            }
        });
    }
}
//查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/lbTStoreCompanyRelation/prepareExecute/toView?id='+vId,
			'width':800,
			'height':500,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}