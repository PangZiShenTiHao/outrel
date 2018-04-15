//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAdd;
function toAddData(prodId){
	var dialogStruct={
		'display':contextRootPath+'/lbTNeedRequiredInfo/prepareExecute/toAdd?prodId='+prodId,
		'width':1100,
		'height':520,
		'title':'新增',
		'isIframe':"false",
		'buttons':[
         {'text':'保存','action':doAddFrom},
		 {'text':'关闭','isClose':true}
		]
	};
	
	 dialogAdd = jyDialog(dialogStruct);
	 dialogAdd.open();
}
function validate() {
	if($("#fkProConfId").val() == '') {
		$("").newMsg({}).show('请输入产品编号！');
		return false;
	}
	if($("#bizNo").val() == '') {
		$("").newMsg({}).show('请输入业务交易号！');
		return false;
	}
	if($("#checkName").val() == '') {
		$("").newMsg({}).show('请输入校验字段！');
		return false;
	}
	if($("#checkType").val() == '') {
		$("").newMsg({}).show('请选择校验类型！');
		return false;
	}
	if($("#maxLength").val() == '') {
		$("").newMsg({}).show('请输入最大值！');
		return false;
	}
	return true;
}
//新增页面的保存操作
function doAddFrom(){
	//序列化 新增页面的form表单数据
	if(!validate()) 
		return;
	var params=$("#addNewsFormData").serialize();
	var url=contextRootPath+'/lbTNeedRequiredInfo/insertNeedRequiredInfo';
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
			'display':contextRootPath+'/lbTNeedRequiredInfo/prepareExecute/toUpdate?id='+v_ids,
			'width':1100,
			'height':525,
			'title':'修改',
			'isIframe':"false",
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
	var url=contextRootPath+'/lbTNeedRequiredInfo/updateLbTNeedRequiredInfo';
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

	jyDialog().confirm("您确认要删除选择的数据吗？", function(){
        var params="ids="+v_ids;
    	var url=contextRootPath+"/lbTNeedRequiredInfo/deleteLbTNeedRequiredInfo";
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
			'display':contextRootPath+'/lbTNeedRequiredInfo/prepareExecute/toView?id='+vId,
			'width':1100,
			'height':520,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}

//修改 事件
function toCopyData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		$("").newMsg({}).show("请选择待复制的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		$("").newMsg({}).show("请选择一条数据！");
		return;
	}

	var dialogStruct={
			'display':contextRootPath+'/lbTNeedRequiredInfo/prepareExecute/toCopy?id='+v_ids,
			'width':1100,
			'height':520,
			'title':'新增',
			'isIframe':"false",
			'buttons':[
	         {'text':'保存','action':doAddFrom},
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogAdd = jyDialog(dialogStruct);
	dialogAdd.open();
}