//查看明细
function toQueryCoreData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"warn"}).alert("请选择查看的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"warn"}).alert("一次只能选择一条数据！");
		return;
	}
	var contractId = iframe.iframeObj["table"].getSelectedObjs()[0].contractCode;
	var provideAmount = iframe.iframeObj["table"].getSelectedObjs()[0].provideAmount;
	var contractAmount = iframe.iframeObj["table"].getSelectedObjs()[0].contractAmount;
	var prodName = iframe.iframeObj["table"].getSelectedObjs()[0].prodName;
	var planLoanDate = iframe.iframeObj["table"].getSelectedObjs()[0].planLoanDate;
	var status = iframe.iframeObj["table"].getSelectedObjs()[0].status;
	var monthRepamentDate = iframe.iframeObj["table"].getSelectedObjs()[0].monthRepamentDate;
	var custCode = iframe.iframeObj["table"].getSelectedObjs()[0].custId;
	var intoAppId = iframe.iframeObj["table"].getSelectedObjs()[0].intoCode;
	var newLoanType = iframe.iframeObj["table"].getSelectedObjs()[0].newLoanType;
	if (planLoanDate==null) planLoanDate='';
	var dialogStruct={
			'display':contextRootPath+'/laTLedgerQuery/prepareExecute/toCoreForLoanInfo?contractId='+contractId+'&provideAmount='+provideAmount+'&contractAmount='+contractAmount+'&prodName='+prodName+'&planLoanDate='+planLoanDate+'&status='+status+'&monthRepamentDate='+monthRepamentDate+'&custCode='+custCode+'&intoAppId='+intoAppId+'&newLoanType='+newLoanType,
			'width':1100,
			'height':600,
			'title':'查看贷款详细信息',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}
/**
 * 查看帐卡详细信息
 * 
 */
function toQueryAccountCardInfoData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"warn"}).alert("请选择查看的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"warn"}).alert("一次只能选择一条数据！");
		return;
	}
	var contractId = iframe.iframeObj["table"].getSelectedObjs()[0].contractCode;
	//var contractId="2013111921081004";
	var dialogStruct={
			'display':contextRootPath+'/laTLedgerQuery/prepareExecute/toQueryAccountCardInfo?contractId='+contractId,
			'width':1100,
			'height':600,
			'title':'查看帐卡详细信息',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}


/**
 * 查看存管帐卡信息
 * 
 */
function toQueryAccountInfoData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"warn"}).alert("请选择查看的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"warn"}).alert("一次只能选择一条数据！");
		return;
	}
	var contractId = iframe.iframeObj["table"].getSelectedObjs()[0].contractCode;
	var acctId = iframe.iframeObj["table"].getSelectedObjs()[0].acctId;
	
	var dialogStruct={
			'display':contextRootPath+'/laTLedgerQuery/prepareExecute/toQueryAccountInfo?contractId='+contractId+"&acctId="+acctId,
			'width':1100,
			'height':600,
			'title':'查看存管帐卡信息',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}


//查看明细
function toQueryPayTransInfoData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"warn"}).alert("请选择查看的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"warn"}).alert("一次只能选择一条数据！");
		return;
	}
	
	var contractId = iframe.iframeObj["table"].getSelectedObjs()[0].contractCode;
	if(contractId =="" || contractId =="undefined" || contractId ==undefined){
		contractId = iframe.iframeObj["table"].getSelectedObjs()[0].CONTRACT_ID;
	}
	var dialogStruct={
			'display':contextRootPath+'/laTLedgerQuery/prepareExecute/toQueryPayTransInfo?contractId='+contractId,
			'width':1100,
			'height':620,
			'title':'查看还款流水明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}



//查看计划
function toQueryRepaymentPlanInfoData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"warn"}).alert("请选择查看的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"warn"}).alert("一次只能选择一条数据！");
		return;
	}
	
	var contractId = iframe.iframeObj["table"].getSelectedObjs()[0].contractCode;
	if(contractId =="" || contractId =="undefined" || contractId ==undefined){
		contractId = iframe.iframeObj["table"].getSelectedObjs()[0].CONTRACT_ID;
	}
	var dialogStruct={
			'display':contextRootPath+'/laTLedgerQuery/prepareExecute/toQueryRepaymentPlanInfo?contractId='+contractId,
			'width':900,
			'height':600,
			'title':'查看还款计划明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}

//查看附件
function viewAttach() {
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"warn"}).alert("请选择查看的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"warn"}).alert("一次只能选择一条数据！");
		return;
	}
	var selectObj = iframe.iframeObj["table"].getSelectedObjs();
	
	var params="custId="+selectObj[0].custId+"&intoId="+selectObj[0].intoId+"&contractId="+selectObj[0].contractCode;
	var url = contextRootPath+'/lbTContractInfo/viewAttachInfo?'+params;
	window.open(url,'newwindowAttach'+selectObj[0].intoCode);
}

function viewAccountCardData(dealNo){
	var dialogStruct={
			'display':contextRootPath+'/laTLedgerQuery/prepareExecute/toAccountCardAnnal?dealNo='+dealNo,
			'width':800,
			'height':500,
			'title':'查看帐卡交易详细信息',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}

//查询存管账户帐卡详情
function viewAccountData(seqNo){
	var dialogStruct={
			'display':contextRootPath+'/laTLedgerQuery/prepareExecute/toAccountAnnal?seqNo='+seqNo,
			'width':800,
			'height':500,
			'title':'查看帐卡交易详细信息',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}

function exportData(){
	exportExcel();
}

//查看手机联系人的详细通信信息
function viewPhone(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"warn"}).alert("请选择查看的数据！");
		return;
	}
	//如果选择多个 择提示 
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"warn"}).alert("一次只能选择一条数据！");
		return;
	}
	var intoCode = iframe.iframeObj["table"].getSelectedObjs()[0].intoId;
	var dialogStruct={
			'display':contextRootPath+'/extJxlOperate/prepareExecute/toView?intoId='+intoCode,
			'width':1100,
			'height':600,
			'title':'查看客户手机详细信息',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
	var dialogView = jyDialog(dialogStruct).open();
}

//附件信息列表
function attachmentDownload(){
	debugger;
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"warn"}).alert("请选择待下载附件的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"warn"}).alert("一次只能选择一条数据！");
		return;
	}
	var intoId = iframe.iframeObj["table"].getSelectedObjs()[0].intoCode;
	attachmentViel(intoId);
}
//合同附件下载之附件列表展示
function attachmentViel(intoId){
	debugger;
	var dialogStruct={
			'display':contextRootPath +'/lbTContractInfo/prepareExecute/attaDownload?intoAppId='+intoId,
			'width':1000,
			'height':500,
			'title':'附件列表',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}

function downloadAttas(){
	var attaList = [];
	var iframeObj = iframe2.iframeObj["table"].getSelectedObjs();
	if(iframeObj.length!=0){
		$.each(iframeObj,function(n, value){
			attaList.push("'"+value.ATTA_CODE+"'");
		});
		jyDialog({"type":"question"}).confirm("您确认要下载吗？",function(){
			window.location.href=contextRootPath+"/lbTCustAttach/downLoadAttas?intoAppId="+$("#hd_intoID").val()+"&attaList="+attaList;
			
		},"确认提示");
	}else{
		jyDialog({"type":"warn"}).alert("请选择要下载的附件!");
		return;
	}
}

//上传 合同扫描件
function uploadIntoAtta(){
	var v_objs=getIds("请选择待上传附件的数据！");
	//获取所在行的对象
	var objs=iframe.iframeObj["table"].getSelectedObjs();
	var v_fkIntoAppId = objs[0].intoCode;
	var v_custId = objs[0].custId;
	if(!v_objs){
		return;
	}
	var v_ids=v_objs;//v_objs.id;
	var title="上传扫描件";
	var url=contextRootPath+'/lbTContractInfo/prepareExecute/uploadContractFile?id='+v_ids+'&fkIntoAppId='+v_fkIntoAppId+"&custId="+v_custId;
	openTab(title,url);
}
//获取选中行的ID
function getIds(alertMsg){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		$("").newMsg({}).show(alertMsg);
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		$("").newMsg({}).show("请选择一条数据！");
		return;
	}
	return v_ids;
}
//以tab形式打开连接
function openTab(title,url) {
	var obj = {
		"title" : title,
		"url" : url
	};
	window.top.tabs.add(obj);
}