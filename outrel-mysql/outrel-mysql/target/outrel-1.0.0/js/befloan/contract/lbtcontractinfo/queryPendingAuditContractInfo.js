var dialogAdd;
function toAuditContractInfo(id, fkIntoAppId, type,auditType){
	jyAjax(
			contextRootPath+"/lbTVisitTaskInfo/isInVisitTaskAudit?intoId="+fkIntoAppId,
			'',
			function(msg){
				if(msg.data == "yes"){
					$("").newMsg({}).show("该合同正处于回访复核中，无法进行操作！");
					return false;
				}else{
					//先去校验反欺诈接口
					var v_Typeurl = contextRootPath+"/lbTContractInfo/doCheckFqz?intoId="+fkIntoAppId;
					jyAjax(
							v_Typeurl,
							'',
							function(msg){
								if(msg.data == "freeze"){
									$("").newMsg({}).show("该进件目前处于反欺诈冻结中，无法进行操作！");
									return false;
								}else{
									var dialogStruct={
											'display':contextRootPath+'/lbTContractInfo/prepareExecute/toAuditContractInfo?auditType='+auditType+"&type="+type,
											'width':700,
											'height':440,
											'title':'审核',
											'isIframe':"false",
											'buttons':[
									         {'text':'提交','action':auditConfirm(type, id, fkIntoAppId,auditType)},
											 {'text':'关闭','isClose':true}
											]
										};
										
										 dialogAdd = jyDialog(dialogStruct);
										 dialogAdd.open();
									
								}
							}
					);
			}
		}		
	);
	
}
//审核确认
function auditConfirm(state, id, fkIntoAppId,auditType){
	return function(){
		var content = $("#operateContent").val();
		var certificateState = "";
		var message = "确认审核通过吗？";
		if(state == "1") {
			if(content == "") {
				content = "结论：审核通过";
			}
			if("house" == auditType){
				certificateState = $("#certificateState").val();
				if(!certificateState){
					jyDialog().alert("请选择他项权证是否已收回！");
					return;
				}
			}
		}
		if(state == "4") {
			if("loan"==auditType){//信贷合同回退时
				var cellsNum = addNewsTableId.rows.length;
				var dtoOneBackReason="",dtoTwoBackReason="",dtoOneBackReasonText="",dtoTwoBackReasonText="";
				for(var i=0;i<cellsNum;i++){
					if(i!=1 && i!=2){
						var parOne=$("#dtoOneBackReason"+i).val();
						var parTwo=$("#dtoTwoBackReason"+i).val();
						if(!parOne){
							jyDialog().alert("请选择一级原因!");
							return;
						}
						if(!parTwo){
							jyDialog().alert("请选择二级原因!");
							return;
						}
						dtoOneBackReason =dtoOneBackReason+parOne+",";
						dtoTwoBackReason =dtoTwoBackReason+parTwo+",";
						dtoOneBackReasonText=dtoOneBackReasonText+$("#dtoOneBackReason"+i+" option:selected").text()+"，";
						dtoTwoBackReasonText=dtoTwoBackReasonText+$("#dtoTwoBackReason"+i+" option:selected").text()+"，";
					}
				}
				var parContent="一级原因："+dtoOneBackReasonText.substring(0, dtoOneBackReasonText.length-1)+";  二级原因："+dtoTwoBackReasonText.substring(0, dtoTwoBackReasonText.length-1);
				if(content!=""){
					parContent=parContent+";  审核意见："+content;
				}
				content=parContent;
			}else{
				if(content == "") {
					jyDialog().alert("请输入审核意见！");
					return;
				}
				if("house" == auditType){
					certificateState = $("#certificateState").val();
				}
			}
			message = "确认退回吗？";
		}
		jyDialog().confirm(message, function(){
			var url=contextRootPath+'/lbTContractInfo/updateLbTContractState';
			var params = "state="+state+"&id="+id+"&intoAppId="+fkIntoAppId+"&content="+content+"&auditType="+auditType+"&certificateState="+certificateState+"&dtoOneBackReason="+dtoOneBackReason+"&dtoTwoBackReason="+dtoTwoBackReason;
			jyAjax(
				url,
				params,
				function(msg){
					var v_status = msg.status;
		        	if(v_status.indexOf('ok') >-1){
		        		jyDialog().alert(msg.msg);
		        		dialogAdd.close();
//		        		queryData();
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
function toOperateLog(contractInfoId, fkIntoAppId){
	var url = contextRootPath+'/lbTContractInfo/viewLog?contractInfoId='+contractInfoId+'&intoId='+fkIntoAppId;
	window.open(url,'newwindowLog'+contractInfoId);
}

//查看附件
function viewAttach(fkIntoAppId, productId, custId, contractId) {
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
	/*
	var dialogStruct={
			'display':contextRootPath+'/lbTIntoInfo/prepareExecute/updateLbTIntoInfo?id='+vId+'&operateBtn=view',
			//'width':800,
			//'height':500,
			'title':'查看明细',
			'isIframe':'false',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
	*/
	var title="查看进件信息("+vNo+")";
	var url=contextRootPath+'/lbTIntoInfo/prepareExecute/viewLbTIntoInfo?id='+vId+'&operateBtn=view&tabTitle='+title;
	openTab(title,url);
}

//查看借款信息
function viewLoanIntoData(intoId, vId){
	var dialogStruct={
			'display':contextRootPath+'/lbTContractInfo/queryContractAllInfoById?id='+vId+'&intoId='+intoId,
			'width':1000,
			'height':530,
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
	window.location.href = contextRootPath + "/lbTContractInfo/expContracts?" + params;
}