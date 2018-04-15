//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdateObj;
var tiplistId;
function toAddData(id){
	tiplistId  = id;
	var dialogStruct={
		'display':contextRootPath+'/laTTipListRemark/prepareExecute/toAdd?id='+id,
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
}
//新增页面的保存操作
function doAddFrom(){
	var obj = dialogAddObj.getIframe();
	//序列化 新增页面的form表单数据
	if(!checkIsNull(obj.$("#addNewsFormData"))) return;
	
	var v_dtofunc = obj.$("#dtofunc").val();
	var v_dtoresult = obj.$("#dtoresult").val();
	//进件校验
	if(v_dtofunc == null || v_dtofunc ==""){
		$("").newMsg({}).show("请选择提醒形式");
		return false;
	}
	if(v_dtoresult == null || v_dtoresult ==""){
		$("").newMsg({}).show("请选择反馈结果");
		return false;
	}
	var params=obj.$("#addNewsFormData").serialize();
	var url=contextRootPath+'/laTTipListRemark/insertLaTTipListRemark?tiplistId='+tiplistId;
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
			'display':contextRootPath+'/laTTipList/prepareExecute/toUpdate?id='+v_ids,
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
	var url=contextRootPath+'/laTTipList/updateLaTTipList';
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
            url:contextRootPath+"/laTTipList/deleteLaTTipList?ids="+v_ids,
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
function viewData(id){
	var dialogStruct={
			'display':contextRootPath+'/laTTipListRemark/prepareExecute/toView?id='+id,
			'width':800,
			'height':500,
			'title':'查看',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}

var addDlg1;
function queryListRemark(contractId,id){
	/*
	var dialogStruct={
			'display':contextRootPath+'/laTTipListRemark/prepareExecute/toQueryPage?contractId='+contractId,
			'width':1100,
			'height':800,
			'title':'查询温提备注',
			'buttons':[
			  {'text':'关闭','isClose':true}
			]
		};
	addDlg1=jyDialog(dialogStruct);
	addDlg1.open();*/
	var title = "添加备注("+contractId+")";
	var url = contextRootPath+'/laTTipListRemark/prepareExecute/toQueryPage?contractId='+contractId+'&id='+id;
	var obj = {
			"title" : title,
			"url" : url,
			"cascade": true,
			"closeFun":function(obj,closeFun){
				closeFun();
			}
	};
	window.top.tabs.add(obj);
}