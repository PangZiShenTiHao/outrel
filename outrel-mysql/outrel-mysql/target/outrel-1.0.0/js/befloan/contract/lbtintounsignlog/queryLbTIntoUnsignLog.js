//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdateObj;
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/lbTIntoUnsignLog/prepareExecute/toAdd',
		'width':800,
		'height':500,
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
	if(!checkIsNull(obj.$("#addNewsFormData"))) return;
	var params=obj.$("#addNewsFormData").serialize();
	var url=contextRootPath+'/lbTIntoUnsignLog/insertLbTIntoUnsignLog';
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
			'display':contextRootPath+'/lbTIntoUnsignLog/prepareExecute/toUpdate?id='+v_ids,
			'width':800,
			'height':500,
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
	if(!checkIsNull(obj.$("#updateNewsFormData"))) return;
	var params=obj.$("#updateNewsFormData").serialize();
	var url=contextRootPath+'/lbTIntoUnsignLog/updateLbTIntoUnsignLog';
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
		jyDialog({"type":"info"}).alert("请选择待删除的数据！");
		return;
	}
	jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
		$.ajax({
            type:"POST",
            dataType:"json",
            url:contextRootPath+"/lbTIntoUnsignLog/deleteLbTIntoUnsignLog?ids="+v_ids,
            success:function(msg){
            	$("").newMsg({}).show(msg.msg);
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		iframe.iframeObj["table"].removeSelectedRow();
            	}
            	
            	
            }
        });
	   },"确认提示");
}
//查看明细
function viewData(intoAppId){
	
	var dialogStruct={
			'display':contextRootPath+'/lbTIntoUnsignLog/prepareExecute/viewListUnsignInfo?intoId='+intoAppId,
			'width':800,
			'height':500,
			'title':'未及时签约原因详情页面',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}


//查看录入未签约原因
function viewUnsignInfos(v_ids){
	
	var dialogStruct={
			'display':contextRootPath+'/lbTIntoUnsignLog/prepareExecute/viewUnsignInfo?intoId='+v_ids,
			'width':800,
			'height':550,
			'title':'未及时签约原因录入页面',
			'buttons':[
			 {'text':'提交','action':saveUnsignInfo},
			 {'text':'关闭','isClose':true}
			]
		};
		
		dialogAdd =jyDialog(dialogStruct);
		dialogAdd.open();
}

function saveUnsignInfo(){
	debugger;
	
	var obj = dialogAdd.getIframe();
	var v_dtofkIntoAppId = obj.$("#dtofkIntoAppId").val();
	var v_unsignReason = obj.$("#dtounsignReason").val();
	var v_remark = $.trim(obj.$("#dtoremark").val());
	
	if(v_unsignReason == "" || v_unsignReason ==null){
		$("").newMsg({}).show("请选择未及时签约原因");
		return false;
	}
	if(v_remark == "" || v_remark ==null){
		$("").newMsg({}).show("请填写备注！");
		obj.$("#dtoremark").val('');
		return false;
	}
	var params = "fkIntoAppId="+v_dtofkIntoAppId+"&unsignReason="+v_unsignReason+"&remark="+encodeURIComponent(v_remark);
	var url=contextRootPath+'/lbTIntoUnsignLog/insertLbTIntoUnsignLog';
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
      		dialogAdd.close();
      		queryData();
      		
      	}
	});
	
}