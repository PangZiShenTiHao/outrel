var dialogAdd;
function toAuditContractInfo(id, rollAppId, type){
	var dialogStruct={
		'display':contextRootPath+'/lbTContractInfo/prepareExecute/toAuditContractInfo',
		'width':530,
		'height':280,
		'title':'审核',
		'isIframe':"false",
		'buttons':[
         {'text':'提交','action':auditConfirm(type, id, rollAppId)},
		 {'text':'关闭','isClose':true}
		]
	};
	
	 dialogAdd = jyDialog(dialogStruct);
	 dialogAdd.open();
}

//查看明细
function viewRollAppData(vId){
	var dialogStruct={
			'display':contextRootPath+'/latHouseRollAppInfo/prepareExecute/toView?id='+vId,
			'width':1200,
			'height':700,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
	var dialogView = jyDialog(dialogStruct).open();
}
//审核确认
function auditConfirm(state, id, rollAppId){
	return function(){
		var content = $("#operateContent").val();
		var message = "确认审核通过吗？";
		if(state == "1") {
			if(content == "") {
				content = "结论：审核通过";
			}
		}
		if(state == "4") {
			if(content == "") {
				jyDialog().alert("请输入退回原因！");
				return;
			}
			message = "确认退回吗？";
		}
		jyDialog().confirm(message, function(){
			var url=contextRootPath+'/lbTContractInfo/updateLbTContractStateForRollLoan';
			var params = "state="+state+"&id="+id+"&rollAppId="+rollAppId+"&content="+content;
			jyAjax(
				url,
				params,
				function(msg){
					var v_status = msg.status;
		        	if(v_status.indexOf('ok') >-1){
		        		jyDialog().alert(msg.msg);
		        		dialogAdd.close();
		        		iframe.iframeObj["table"].modifyPojo(msg.data);
		        		iframe.iframeObj["table"].showAndQuery();
		        	} else {
		        		jyDialog().alert(msg.msg);
		        	}
				});
		});
	};
}

//查看日志
function toOperateLog(contractInfoId, rollAppId){
	var url = contextRootPath+'/lbTContractInfo/viewLog?contractInfoId='+contractInfoId+'&rollAppId='+rollAppId;
	window.open(url,'newwindowLog'+contractInfoId);
}

//查看附件
function viewAttach(fkIntoAppId, productId, custId,contractId) {
	var params="custId="+custId+"&intoId="+fkIntoAppId+"&prodId="+productId+"&contractId="+contractId;
	var url = contextRootPath+'/lbTContractInfo/viewAttachInfo?'+params;
	window.open(url,'newwindowAttach'+fkIntoAppId);
}

//以tab形式打开连接
function openTab(title,url) {
	var obj = {
		"title" : title,
		"url" : url
	};
	window.top.tabs.add(obj);
}

//查看进件信息
function viewIntoData(vId,vNo){
	var title="查看进件信息("+vNo+")";
	var url=contextRootPath+'/lbTIntoInfo/prepareExecute/viewLbTIntoInfo?id='+vId+'&operateBtn=view&tabTitle='+title;
	openTab(title,url);
}

//查看借款信息
function viewLoanIntoData(intoId, vId){
	var dialogStruct={
			'display':contextRootPath+'/lbTContractInfo/queryContractAllInfoById?id='+vId+'&intoId='+intoId,
			'width':1000,
			'height':330,
			'title':'借款信息',
			'isIframe':'false',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
	var dialogView = jyDialog(dialogStruct).open();
}

//导出excel
function expExcel() {
	var params = $("form").eq(0).serialize();
	window.location.href = contextRootPath + "/lbTContractInfo/expContractsForRollLoan?" + params+"&isPage=NO";
}