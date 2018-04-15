//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdObj;
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/lbTQuotaProduct/prepareExecute/toAdd',
		'width':800,
		'height':500,
		'title':'新增',
		'buttons':[
         {'text':'保存','action':doAddFrom,'isClose':false},
		 {'text':'关闭','isClose':true}
		]
	};
	dialogAddObj=jyDialog(dialogStruct);
	dialogAddObj.open();
	//var dialogAdd =jyDialog(dialogStruct).open();
}
//新增页面的保存操作
function doAddFrom(){
	//序列化 新增页面的form表单数据
	debugger;
	var obj = dialogAddObj.getIframe();	
	if(!checkIsNull(obj.$("#addNewsFormData"))){
		$("").newMsg({}).show("请正确填写！");
		return ;
	}else{ 
	var params=obj.$("#addNewsFormData").serialize();
	if(!(params.indexOf("assuKind=1")>-1||params.indexOf("assuKind=2")>-1)){
		$("").newMsg({}).show("请录入担保方式！");
		return;
	}
	if(!(params.indexOf("useKind=1")>-1||params.indexOf("useKind=2")>-1)){
		$("").newMsg({}).show("请录入使用方式！");
		return;
	}
	if(!(params.indexOf("isrecycled=1")>-1||params.indexOf("isrecycled=2")>-1)){
		$("").newMsg({}).show("请录入是否可循环！");
		return;
	}
	if(!(params.indexOf("linkedProductCode=PTL")>-1)){
		$("").newMsg({}).show("请录入额度放款产品！");
		return;
	}	
	var url=contextRootPath+'/lbTQuotaProduct/insertLbTQuotaProduct';
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
        		dialogAddObj.close();	
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
		$("").newMsg({}).show("请选择待修改的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		$("").newMsg({}).show("请选择一条数据！");
		return;
	}

	var dialogStruct={
			'display':contextRootPath+'/lbTQuotaProduct/prepareExecute/toUpdate?id='+v_ids,
			'width':800,
			'height':500,
			'title':'修改',
			'buttons':[
             {'text':'保存','action':doUpdateFrom,'isClose':false},
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogUpdObj=jyDialog(dialogStruct);
	dialogUpdObj.open();
}
//修改页面 的 保存操作
function doUpdateFrom(){
	//序列化 新增页面的form表单数据
	
	var obj = dialogUpdObj.getIframe();
	if(!checkIsNull(obj.$("#updateNewsFormData"))){
		$("").newMsg({}).show("请正确填写！");
		return;
	}
	var params=obj.$("#updateNewsFormData").serialize();
	if(!(params.indexOf("assuKind=1")>-1||params.indexOf("assuKind=2")>-1)){
		$("").newMsg({}).show("请录入担保方式！");
		return;
	}
	if(!(params.indexOf("useKind=1")>-1||params.indexOf("useKind=2")>-1)){
		$("").newMsg({}).show("请录入使用方式！");
		return;
	}
	if(!(params.indexOf("isrecycled=1")>-1||params.indexOf("isrecycled=2")>-1)){
		$("").newMsg({}).show("请录入是否可循环！");
		return;
	}
	if(!(params.indexOf("linkedProductCode=PTL")>-1)){
		$("").newMsg({}).show("请录入额度放款产品！");
		return;
	}	
	debugger;
	var url=contextRootPath+'/lbTQuotaProduct/updateLbTQuotaProduct';
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
        		dialogUpdObj.close();
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
            url:contextRootPath+"/lbTQuotaProduct/deleteLbTQuotaProduct?ids="+v_ids,
            success:function(msg){
            	$("").newMsg({}).show("删除成功");            	            	
            	//删除成功后
            	if(msg.indexOf('ok') >-1){
            		iframe.iframeObj["table"].removeSelectedRow();
            	}
            	
            	
            }
        });
    }
}
//查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/lbTQuotaProduct/prepareExecute/toView?id='+vId,
			'width':800,
			'height':500,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}