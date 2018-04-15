//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdateObj;
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/lbTCustComplaint/prepareExecute/toAdd',
		'width':800,
		'height':500,
		'title':'新增',
		'isIframe':'false',
		'buttons':[
         {'text':'暂存','action':doAddFrom('00')},
         {'text':'提交','action':doAddFrom('01')},
		 {'text':'关闭','isClose':true}
		]
	};
	
	dialogAddObj=jyDialog(dialogStruct);
	dialogAddObj.open();
}
//新增页面的保存操作
function doAddFrom(complaintStatus){
	return function(){
		/*if(complaintStatus=='01'){*/
		var formObj=document.getElementById('addNewsFormData');
		if(!(checkIsNull(formObj)&&checkFormFormat($(formObj)))){
		/*	dialogAddObj.close();*/
			return ;
		}
		/*}*/
		
		//序列化 新增页面的form表单数据
		var params=$("#addNewsFormData").serialize();
		params+="&complaintStatus="+complaintStatus;
		var url=contextRootPath+'/lbTCustComplaint/insertLbTCustComplaint';
		
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
						dialogAddObj.close();
						if(treeMenuObj){
							treeMenuObj.recovery();
						}
					}
				});
	}
}
//修改 事件
function toUpdateData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");

	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"warn"}).alert("请选择待修改的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"warn"}).alert("请选择一条数据！");
		return;
	}
	
	var objs=iframe.iframeObj["table"].getSelectedObjs();
	if(!(objs[0].complaintStatus=='00'||objs[0].complaintStatus=='12')){//当客户状态为 00暂存、或者12审核退回时可以进行修改
		jyDialog({"type":"warn"}).alert("该条数据不能进行修改！")
		return;
	}
	
	var dialogStruct={
		'display':contextRootPath+'/lbTCustComplaint/prepareExecute/toUpdate?id='+v_ids,
		'width':800,
		'height':500,
		'title':'修改',
		'isIframe':'false',
		'buttons':[
		 {'text':'暂存','action':doUpdateFrom('00')},
         {'text':'提交','action':doUpdateFrom('01')},
		 {'text':'关闭','isClose':true}
		]
	};
		
	dialogUpdateObj = jyDialog(dialogStruct);
	dialogUpdateObj.open();
	
}

//修改页面 的 保存操作
function doUpdateFrom(complaintStatus){
	return function(){
		var formObj=document.getElementById('updateNewsFormData');
		if(!(checkIsNull(formObj)&&checkFormFormat($(formObj)))){
			return ;
		}
		
		//序列化 新增页面的form表单数据
		var params=$("#updateNewsFormData").serialize();
		params+="&complaintStatus="+complaintStatus;
		var url=contextRootPath+'/lbTCustComplaint/updateLbTCustComplaint';
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
	        		dialogUpdateObj.close();
	        		if(treeMenuObj){
	        			treeMenuObj.recovery();
	        		}
	        	}
	  	});
	}
}
//删除 事件
function deleteData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"warn"}).alert("请选择待删除的数据！");
		return;
	}
	jyDialog().confirm("您确认要删除选择的数据吗？",function(){
        $.ajax({
            type:"POST",
            dataType:"JSON",
            url:contextRootPath+"/lbTCustComplaint/deleteLbTCustComplaint?ids="+v_ids,
            success:function(msg){
            	$("").newMsg({}).show(msg.msg);
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		iframe.iframeObj["table"].removeSelectedRow();
            	}
            	
            	
            }
        });
    })
}
//查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/lbTCustComplaint/prepareExecute/toViewPro?id='+vId,
			'width':850,
			'height':500,
			'title':'查看明细',
			'isIframe':'false',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}

//选择完 客户 之后，向上个页面传值，并关掉当前页面
function confirmCust(){
	var sObj = iframe.iframeObj["table"].getSelectedObjs();
    window.opener.document.forms[0].fkCustId.value=sObj[0].id;   
	window.opener.document.forms[0].custName.value=sObj[0].custName;    
	window.opener.document.forms[0].custCardType.value=sObj[0].cardType;    
	window.opener.document.forms[0].custCardNum.value=sObj[0].cardId;
    window.close();
}

//查看客户信息详情
function viewCustData(vId){
	var dialogStruct={
			'display':contextRootPath+'/lbTCustomterInfo/prepareExecute/toView?id='+vId,
			'width':1000,
			'height':580,
			'title':'查看明细',
			'isIframe':'false',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}


//投诉处理
function deal(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"warn"}).alert("请选择待修改的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"warn"}).alert("请选择一条数据！");
		return;
	}
	
	var objs=iframe.iframeObj["table"].getSelectedObjs();
	if(objs[0].complaintStatus=='20'){//‘20’待处理状态     ‘11’审核通过状态 直接进行处理
		jyDialog({"type":"warn"}).alert("该条数据处于待处理状态，只可进行修改！")
		return;
	}
	if(objs[0].complaintStatus!='11'){
		jyDialog({"type":"warn"}).alert("该条数据不可进行处理！")
		return;
	}
	
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	var dialogStruct={
			'display':contextRootPath+'/lbTCustComplaint/prepareExecute/toDeal?id='+v_ids,
			'width':800,
			'height':600,
			'title':'处理',
			/*'isIframe':'false',*/
			'buttons':[
             {'text':'提交','action':doAddDealFrom,'isClose':true},
			 {'text':'关闭','isClose':true}
			]
	};
		
	dialogAuditObj = jyDialog(dialogStruct);
	dialogAuditObj.open();
}

//投诉处理后的保存操作
function doAddDealFrom(){
	var obj = dialogAuditObj.getIframe();
	//序列化 新增页面的form表单数据
	var params=obj.$("#addNewsFormData").serialize();
	var url=contextRootPath+'/lbTCustComplaint/saveLbTCustComplaintDeal';
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

//客户投诉处理 修改 事件
function toUpdateDealData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");

	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"warn"}).alert("请选择待修改的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"warn"}).alert("请选择一条数据！");
		return;
	}
	
	var objs=iframe.iframeObj["table"].getSelectedObjs();
	if(!(objs[0].complaintStatus=='20')){//‘20’待处理状态     ‘11’审核通过状态 直接进行处理
		jyDialog({"type":"warn"}).alert("该条数据不能进行修改！")
		return;
	}
	
	var dialogStruct={
		'display':contextRootPath+'/lbTCustComplaint/prepareExecute/toUpdateDealData?id='+v_ids,
		'width':800,
		'height':500,
		'title':'修改',
		'isIframe':'true',
		'buttons':[
         {'text':'保存','action':doUpdateDealFrom,'isClose':true},
		 {'text':'关闭','isClose':true}
		]
	};
		
	dialogUpdateObj = jyDialog(dialogStruct);
	dialogUpdateObj.open();
}

//投诉处理 修改后的保存操作
function doUpdateDealFrom(){
	debugger;
	var obj = dialogUpdateObj.getIframe();
	//序列化 修改页面的form表单数据
	var params=obj.$("#updateDealFormData").serialize();
	var url=contextRootPath+'/lbTCustComplaint/saveLbTCustComplaintDeal';
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


