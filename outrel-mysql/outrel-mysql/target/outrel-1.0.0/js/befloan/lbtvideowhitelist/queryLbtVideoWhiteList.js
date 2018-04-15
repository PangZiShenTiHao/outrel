//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdateObj;
var addDlg1;//添加第一个界面：查询贷前
var addDlg2;//添加第二个界面：添加详情
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/lbtVideoWhiteList/prepareExecute/toQueryIntoPage',
		'width':1000,
		'height':550,
		'title':'查询贷款信息',
		'buttons':[
         //{'text':'保存','action':doAddFrom,'isClose':true},
         {'name':'nextBtn','text':'下一步','action':openNextPage},
		 {'text':'关闭','isClose':true}
		]
	};
	
	/*dialogAddObj=jyDialog(dialogStruct);
	dialogAddObj.open();*/
	
	addDlg1=jyDialog(dialogStruct);
	addDlg1.open();
}

//下一步
function openNextPage(){
	var selectIds = addDlg1.getIframe().getSelectedIds().join(",");
	//如果没有选中 数据则
	if(selectIds == ""){
		jyDialog({"type":"warn"}).alert("请先选择一条数据！");
		return;
	}
	//如果选择多个 择提示
	if(selectIds.indexOf(",") > -1){
		jyDialog({"type":"warn"}).alert("只能选择一条数据！");
		return;
	}
	//关闭查询界面
	addDlg1.close();
	//打开新增界面
	var url=contextRootPath+'/lbtVideoWhiteList/prepareExecute/toAdd?intoId='+selectIds;
	var dialogStruct={
			'display':url,
			'width':650,
			'height':280,
			'title':'异常客户白名单',
			'buttons':[
             //{'text':'上一步','action':openPrevPage},
	         {'text':'保存','action':doAddFrom},
			 {'text':'关闭','isClose':true}
			]
		};
		
	 addDlg2 =jyDialog(dialogStruct);
	 addDlg2.open();
}
//新增页面的保存操作
function doAddFrom(){
	debugger;
	var form=addDlg2.iframe.contentDocument.getElementById("addNewsFormData");
	var remark = addDlg2.iframe.contentDocument.getElementById("dtoremark").value;
	
	if(remark == null || remark == ''){
		$("").newMsg({}).show("请填写备注！");
		return false;
	}
	var params=$(form).serialize();
	var url=contextRootPath+'/lbtVideoWhiteList/insertLbtVideoWhiteList';
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
        		addDlg2.close();
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
			'display':contextRootPath+'/lbtVideoWhiteList/prepareExecute/toUpdate?id='+v_ids,
			'width':650,
			'height':350,
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
	debugger;
	var obj = dialogUpdateObj.getIframe();
	var remark = obj.$("#dtoremark").val(); 
	if(remark == null || remark == ''){
		$("").newMsg({}).show("请填写备注！");
		return false;
	}
	//序列化 新增页面的form表单数据
	var params=obj.$("#updateNewsFormData").serialize();
	var url=contextRootPath+'/lbtVideoWhiteList/updateLbtVideoWhiteList';
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
	debugger;
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
            url:contextRootPath+"/lbtVideoWhiteList/deleteLbtVideoWhiteList?ids="+v_ids,
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
function viewIntoInfoData(vId,intoAppId){
	//var title="查看进件信息("+vId+")";
	var title="查看进件信息("+intoAppId+")";
	var url=contextRootPath+'/lbTIntoInfo/prepareExecute/viewLbTIntoInfo?id='+vId+'&operateBtn=view&tabTitle='+title;
	openTab(title,url);
}

//以tab形式打开连接
function openTab(title,url) {
	var obj = {
		"title" : title,
		"url" : url
	};
	window.top.tabs.add(obj);
}
//查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/lbtVideoWhiteList/prepareExecute/toView?id='+vId,
			'width':800,
			'height':500,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}