//utf-8
//点击新增按钮 事件跳转至 新增页面
//var dialogAdd;
var dialogAddObj;
function updateAllData(prodId){
	
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	if(v_ids == ""){
		alert("请选择待批量操作的数据！");
		return;
	}
	
	var dialogStruct={
			'display':contextRootPath+'/lbTAuditMaxAmountConf/prepareExecute/toAdd?ids='+v_ids+'&prodId='+prodId,
			'width':800,
			'height':400,
			'title':'批量修改信审员额度信息',
			'isIframe':"false",
			'buttons':[
	         {'text':'保存','action':doAddFrom},
			 {'text':'关闭','isClose':true}
			]
		};
	
	 //dialogAdd=jyDialog(dialogStruct);
	 //dialogAdd.open();
}

function toAddData(prodId){
	 //var prodId = "PTL150500024";
	 var dialogStruct={
				'display':contextRootPath+'/lbTAuditMaxAmountConf/prepareExecute/toAdd?prodId='+prodId,
				'width':800,
				'height':400,
				'title':'新增信审员额度信息',
				//'isIframe':'false',
				'buttons':[
	             {'text':'保存','action':doAddFrom,'isClose':false},
				 {'text':'关闭','isClose':true}
				]
			};

	 dialogAddObj =jyDialog(dialogStruct);
	 dialogAddObj.open();
}

//新增页面的保存操作
function doAddFrom(){
	var obj = dialogAddObj.getIframe();
	var params=obj.$("#addNewsFormData").serialize();
	
	if(validateData()){
		//var url=contextRootPath+'/lbTAuditMaxAmountConf/insertAllLbTAuditMaxAmountConf?ids='+v_ids;
		var url=contextRootPath+'/lbTAuditMaxAmountConf/insertLbTAuditMaxAmountConf';
		//通过ajax保存
		jyAjax(
			url,
			params,
			function(msg){
				//新增成功后，
				$("").newMsg({}).show(msg.msg);
				var v_status = msg.status;
	        	if(v_status.indexOf('ok') >-1){
	        		//关闭窗口 调用弹出页面的 closeWindow方法
	        		//dialogAdd.close();
	        		dialogAddObj.close();
	        		queryData();
	        	}
	  	});
	}
	
}
//修改 事件
function toUpdateData(id,userName,userNo,prodId){
	
	 var dialogStruct={
				'display':contextRootPath+'/lbTAuditMaxAmountConf/prepareExecute/toUpdate?id='+id+'&userName='+userName+'&userNo='+userNo+'&prodId='+prodId,
				'width':800,
				'height':400,
				'title':'修改信审员额度信息',
				//'isIframe':'false',
				'buttons':[
	             {'text':'保存','action':doUpdateFrom,'isClose':false},
				 {'text':'关闭','isClose':true}
				]
			};

	 dialogAddObj =jyDialog(dialogStruct);
	 dialogAddObj.open();
	
}
//页面校验
function validateData(){
	var obj = dialogAddObj.getIframe();
	var v_dtofkUserId = obj.$("#dtofkUserId").val();
	var v_dtofkProConfId = obj.$("#dtofkProConfId").val();
	var v_dtouserName = obj.$("#dtouserName").val();
	
	var v_dtomaxCreditAuditAmount = obj.$("#dtomaxCreditAuditAmount").val();
	var v_dtomaxAuditAmount = obj.$("#dtomaxAuditAmount").val();
	var v_dtomaxDunAmount = obj.$("#dtomaxDunAmount").val();
	var v_dtomaxIntoCountAmount = obj.$("#dtomaxIntoCountAmount").val();
	
	/*if(v_dtofkUserId != '' && v_dtofkUserId != null) {
		if(isNaN(v_dtofkUserId)){
			alert('系统用户不是数字');
			return false;
		}	
		
	}*/
	if(v_dtouserName == null || v_dtouserName == ''){
		$("").newMsg({}).show("姓名不能为空！");
		return false;
	}
	if(v_dtofkProConfId != '' && v_dtofkProConfId != null) {
		/*if(isNaN(v_dtofkProConfId)){
			alert(' 产品基础信息不是数字');
			return false;
		}*/	
		
	}
	if(v_dtomaxCreditAuditAmount != '' && v_dtomaxCreditAuditAmount != null) {
		if(isNaN(v_dtomaxCreditAuditAmount)){
			$("").newMsg({}).show("信审授权额度不是数字");
			return false;
		}	
		
	}else{
		$("").newMsg({}).show("请输入信审授权额度！");
		return false;
	}
	if(v_dtomaxAuditAmount != '' && v_dtomaxAuditAmount != null) {
		if(isNaN(v_dtomaxAuditAmount)){
			$("").newMsg({}).show("稽核授权额度不是数字");
			return false;
		}	
		
	}else{
		$("").newMsg({}).show("请输入稽核授权额度！");
		return false;
	}
	if(v_dtomaxIntoCountAmount != '' && v_dtomaxIntoCountAmount != null) {
		if(isNaN(v_dtomaxIntoCountAmount)){
			$("").newMsg({}).show("最大进件数量不是数字!");
			return false;
		}	
		
	}else{
		$("").newMsg({}).show("请输入最大进件数量！");
		return false;
	}
	return true;
}
//修改页面 的 保存操作
function doUpdateFrom(){
	var obj = dialogAddObj.getIframe();
	var params=obj.$("#updateNewsFormData").serialize();
	//var url=contextRootPath+'/lbTAuditMaxAmountConf/insertLbTAuditMaxAmountConf';
	if(validateData()){
		var url=contextRootPath+'/lbTAuditMaxAmountConf/updateLbTAuditMaxAmountConf';
		
		//通过ajax更新数据
		jyAjax(
			url,
			params,
			function(msg){
				//更新成功后，
				$("").newMsg({}).show(msg.msg);
				var v_status = msg.status;
	        	if(v_status.indexOf('ok') >-1){
	        		dialogAddObj.close();
	        		queryData();
	        	}
	  	});
	}
	
}
//删除 事件
function deleteData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		$("").newMsg({}).show("请选择待操作的数据！");
		return;
	}
	
	jyDialog().confirm("您确认要删除选择的数据吗？", function(){
		var url = contextRootPath+'/lbTAuditMaxAmountConf/deleteLbTAuditMaxAmountConf?ids='+v_ids;
		jyAjax(url,'',function(msg){
			//新增成功后，
			$("").newMsg({}).show(msg.msg);
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//dialogAdd.close();
        		queryData();
        	}
		},"","",false);
	})
	
}
//查看明细
function viewData(vId){
	
	var dialogStruct={
			'display':contextRootPath+'/lbTAuditMaxAmountConf/prepareExecute/toView?id='+vId,
			'width':800,
			'height':500,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}

