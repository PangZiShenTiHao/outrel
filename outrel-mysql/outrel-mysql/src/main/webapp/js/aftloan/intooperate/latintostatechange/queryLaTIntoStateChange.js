//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdateObj;
var addDlg1;//添加第一个界面：查询贷前
var addDlg2;//添加第二个界面：添加详情
function toAddData(){
	var dialogStruct={
			'display':contextRootPath+'/lbTIntoInfo/toChangeState',
			'width':1100,
			'height':750,
			'title':'查询进件信息',
			'buttons':[
			  {'name':'nextBtn','text':'下一步','action':openNextPage},
			  {'text':'关闭','isClose':true}
			]
		};
	addDlg1=jyDialog(dialogStruct);
	addDlg1.open();
}
//下一步
function openNextPage(){
	var ss = addDlg1.getIframe();
	
	var selectObj = addDlg1.getIframe().getSelectedObjs2();
	//如果没有选中 数据则
	if(!selectObj){
		jyDialog({"type":"info"}).alert("请选择待修改的数据！");
		return;
	}
	
	if('1400' != selectObj.auditeState && '5500' != selectObj.auditeState ){
		jyDialog({"type":"info"}).alert("所选进件状态无法进行状态修改操作！");
		return;
	}
	
	
	//关闭查询界面
	addDlg1.close();
	//打开新增界面
	var url=contextRootPath+'/laTIntoStateChange/prepareExecute/toAdd?intoId='+selectObj.id ;
	var dialogStruct={
			'display':url,
			'width':1100,
			'height':750,
			'title':'新增',
			'buttons':[
             {'text':'上一步','action':openPrevPage},
	         {'text':'保存','action':doAddFrom},
			 {'text':'关闭','isClose':true}
			]
		};
		
	 addDlg2 =jyDialog(dialogStruct);
	 addDlg2.open();
}
//上一步
function openPrevPage() {
	addDlg2.close();
	toAddData();
}

//新增页面的保存操作
function doAddFrom(){
	var obj = addDlg2.getIframe();
	//序列化 新增页面的form表单数据
	if(!checkIsNull(obj.$("#addNewsFormData"))) return;
	var params=obj.$("#addNewsFormData").serialize();
	var url=contextRootPath+'/laTIntoStateChange/insertLaTIntoStateChange';
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

//查看明细
function viewDataByIntoAppId(vId,intoAppId){
	var title="查看进件信息("+intoAppId+")";
	var url=contextRootPath+'/lbTIntoInfo/prepareExecute/viewLbTIntoInfo?id='+vId+'&operateBtn=view&tabTitle='+title;
	
	var obj = {
			"title" : title,
			"url" : url
	};
	window.top.tabs.add(obj);
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
	
	var selectObj =iframe.iframeObj["table"].getSelectedObjs()[0] ;
	if('01' != selectObj.listStat ){
		jyDialog({"type":"info"}).alert("请选择初始录入状态的数据！");
		return;
	}
	
	
	var dialogStruct={
			'display':contextRootPath+'/laTIntoStateChange/prepareExecute/toUpdate?id='+v_ids,
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
	var url=contextRootPath+'/laTIntoStateChange/updateLaTIntoStateChange';
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
            url:contextRootPath+"/laTIntoStateChange/deleteLaTIntoStateChange?ids="+v_ids,
            success:function(msg){
            	$("").newMsg({}).show(msg.msg);
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		queryData();
            	}
            	
            	
            }
        });
	   },"确认提示");
}

//取消事件
function cancelData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待取消的数据！");
		return;
	}
	var selectObj =iframe.iframeObj["table"].getSelectedObjs()[0] ;
	if('01' != selectObj.listStat ){
		jyDialog({"type":"info"}).alert("请选择初始录入状态的数据！");
		return;
	}
	
	jyDialog({"type":"question"}).confirm("您确认要取消选择的数据吗？",function(){
		$.ajax({
            type:"POST",
            dataType:"json",
            url:contextRootPath+"/laTIntoStateChange/cancelLaTIntoStateChange?ids="+v_ids,
            success:function(msg){
            	$("").newMsg({}).show(msg.msg);
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		queryData();
            	}
            	
            	
            }
        });
	   },"确认提示");
}

//上传文件
function toUploadFile(){
	//getValueForIndex("listStat",);
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"warn"}).alert("请先选择一条数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"warn"}).alert("只能选择一条数据！");
		return;
	}
	
	var selectObj = iframe.iframeObj["table"].getSelectedObjs()[0];
	var url = contextRootPath+'/laTImageBizAss/prepareExecute/toViewUpload?id='+v_ids+"&type=31" ;
	
	var dialogStruct={
			'display':url,
			'width':1100,
			'height':800,
			'title':'上传',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogUpdate =jyDialog(dialogStruct);
	dialogUpdate.open();
}


//查看明细
function viewData(id){
	var dialogStruct={
			'display':contextRootPath+'/laTIntoStateChange/prepareExecute/toView?id='+id,
			'width':800,
			'height':500,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}

//提交审批  事件  
function submitAppData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//?????????
	var url =contextRootPath+"/intoStateChangeJbpm/intoStateChangeJbpmController/startIntoStateChangeWorkflow?nextPartnerId="+$("#dtoparamUserId").val()+"&ids="+v_ids+"&loginUserId="+$("#loginUserId").val();
	jyDialog({"type":"question"}).confirm("您确认要提交选择的数据吗？",function(){
		var params = null;
		jyAjax(
				url,
				params,
				function(msg){
					//保存成功后，执行查询页面查询方法
					$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
		        	var v_status = msg.status;
		        	if(v_status.indexOf('ok') >-1){
		        		//显示剩下数据
			        	queryData();
		        	}
		  	});
	 },"确认提示");
}