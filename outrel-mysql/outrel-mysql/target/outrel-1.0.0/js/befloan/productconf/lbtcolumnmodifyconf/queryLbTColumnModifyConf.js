//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAdd;
var dialogUpdate;
function toAddData(){
	var prodId=$("#prodId").val();
	var dialogStruct={
		'display':contextRootPath+'/lbTColumnModifyConf/prepareExecute/toAdd?prodId='+prodId,
		'width':800,
		'height':500,
		'title':'新增',
		"isIframe":"false",
		'buttons':[
         {'text':'保存','action':doAddFrom,'isClose':false},
		 {'text':'关闭','isClose':true}
		]
	};
	
	dialogAdd =jyDialog(dialogStruct);
	dialogAdd.open()
}
//新增页面的保存操作
function doAddFrom(){
	var nullEls=[];
	if(!checkIsNull($("#addNewsFormData"),null,nullEls)) {
		return;
	}
	
	//序列化 新增页面的form表单数据
	var params=$("#addNewsFormData").serialize();
	var url=contextRootPath+'/lbTColumnModifyConf/insertLbTColumnModifyConf';
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
        		dialogAdd.close();
        	}
  	});
}
//修改 事件
function toUpdateData(){
	//var prodId=$("#prodId").val();
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
			'display':contextRootPath+'/lbTColumnModifyConf/prepareExecute/toUpdate?id='+v_ids,
			'width':800,
			'height':500,
			'title':'修改',
			"isIframe":"false",
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
	if(!checkIsNull($("#updateNewsFormData"))) {
		return;
	}
	
	//序列化 新增页面的form表单数据
	var params=$("#updateNewsFormData").serialize();
	var url=contextRootPath+'/lbTColumnModifyConf/updateLbTColumnModifyConf';
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
        		dialogUpdate.close();
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
	
	jyDialog().confirm("您确认要删除选择的数据吗？", function(){
        var params="ids="+v_ids;
    	var url=contextRootPath+"/lbTColumnModifyConf/deleteLbTColumnModifyConf";
    	//通过ajax保存
    	jyAjax(
    			url,
    			params,
    			function(msg){
    				var v_status = msg.status;
    				if(v_status.indexOf('ok') >-1){
    					queryData();
    					$("").newMsg({}).show("操作成功!");
    				}
    			}
    	);
    });
}
//查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/lbTColumnModifyConf/prepareExecute/toView?id='+vId,
			'width':800,
			'height':500,
			"isIframe":"false",
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}