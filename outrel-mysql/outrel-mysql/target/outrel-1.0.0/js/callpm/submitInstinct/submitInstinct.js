
//执行提报反欺诈操作
function doInstincInto(intoId){
	//判断业务是否已被反欺诈拒绝
	debugger;
	var v_boolean = true;
	v_boolean = validateInfoIsDone(intoId);
	if(!v_boolean) {
		return false;
	}
	//判断是否为抵押贷产品，不是抵押贷产品可提报反欺诈
	if("Y" != isCarLoan(intoId)) {
		submitInstinct(intoId);
	}else {
		$("").newMsg({}).show("抵押贷产品无需提报!");
		return;
	}
	
}

//提报反欺诈
function submitInstinct(intoId){
	var dialogStruct={
			'display':contextRootPath+'/lbtAntiToHuman/prepareExecute/submitInstinct?intoId='+intoId,
			'width':1260,
			'height':500,
			'title':'提报处理',
			'buttons':[
			  {'name':'saveBtn','text':'保存','action':toInstinct},
			  {'text':'关闭','isClose':true}
			]
		};
	dialogAddObj=jyDialog(dialogStruct);
	dialogAddObj.open();
}

//新增页面的保存操作
function toInstinct(){
	var obj = dialogAddObj.getIframe();
	//序列化 新增页面的form表单数据
	if(!checkIsNull(obj.$("#addNewsFormData"))) return;
	var params=obj.$("#addNewsFormData").serialize();
	var intoId = $(dialogAddObj.iframe.contentDocument.getElementById("dtointoAppId")).val();
	var reason = $(dialogAddObj.iframe.contentDocument.getElementById("dtoreason")).val();
	var remark = $(dialogAddObj.iframe.contentDocument.getElementById("dtoremark")).val();

	var url=contextRootPath+'/lbtAntiToHuman/toHumanInstinctInvoke?intoId='+intoId+"&reason="+reason+"&remark="+remark;
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			$("").newMsg({}).show(msg.msg);
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		dialogAddObj.close();
				return true;
        	}
  	});
}


//判断提报反欺诈是否已处理
function judgeAntiToHumanDeal(intoAppId){
	var params = "";
	var url=contextRootPath+'/lbtAntiToHuman/judgeAntiToHumanDeal?intoAppId='+intoAppId;
	var falg = false;
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		falg =  true;
        	}else{
        		$("").newMsg({}).show(msg.msg);
        		falg =  false;
        	}
     	},"","",false);
	
	return falg;
}

//验证业务是否已被处理
function validateInfoIsDone(intoId){
	var v_boolean =false;
	debugger;
	var url= contextRootPath+'/lbTIntoAuditResult/validateInfoDone';
	var param = "intoId="+ intoId;
	jyAjax(url,param,function(msg){
		var msg = msg.msg;
		if(msg.indexOf('yes') >-1){
			v_boolean = true;
		}else{
			$("").newMsg({}).show(msg);
			v_boolean = false;
		}
	},"","",false);
	return v_boolean;
}