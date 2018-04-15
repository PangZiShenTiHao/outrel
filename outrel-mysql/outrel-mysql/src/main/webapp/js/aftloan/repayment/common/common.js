//utf-8
var queryCoreForLoanInfo,queryCoreForClaim,queryByClaimSuccess,queryBefloanForLoanInfo;

//点击新增页面贷款账号右侧按钮，查询核心数据，并弹出展示数据页面
function toQueryCoreForLoanInfo(){
	var contractId =  $("#dtocontractId").val();
	if(contractId=="" || contractId==null){
		alert("请先获取贷款基本信息！")
		return;
	}
	var dialogStruct={
			'display':contextRootPath+'/aftloanqueryDate/prepareExecute/toQueryCoreForLoanInfo?contractId='+contractId,
			'width':900,
			'height':600,
			'title':'获取贷款信息',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
		};
	queryCoreForLoanInfo=jyDialog(dialogStruct);
	queryCoreForLoanInfo.open();
}

//点击新增页面右侧按钮，查询核心数据，并弹出展示打款信息列表数据页面（门店打款流水查询）
function toQueryCoreForClaim(){
	var dialogStruct={
			'display':contextRootPath+'/aftloanqueryDate/prepareExecute/toQueryCoreForClaim',
			'width':900,
			'height':600,
			'title':'获取打款信息',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
		};
	queryCoreForClaim=jyDialog(dialogStruct);
	queryCoreForClaim.open();
}

//查询认款成功的数据，并弹出展示数据页面（暂时不用）
function toQueryByClaimSuccess(){
	var dialogStruct={
			'display':contextRootPath+'/aftloanqueryDate/prepareExecute/toQueryByClaimSuccess',
			'width':900,
			'height':600,
			'title':'获取成功认款列表',
			'buttons':[
			 {'text':'关闭','isClose':false}
			]
		};
	queryByClaimSuccess=jyDialog(dialogStruct);
	queryByClaimSuccess.open();
}

//打开查询贷前系统贷款信息列表页面
function toQueryBefloanForLoanInfo(){
	var dialogStruct={
			'display':contextRootPath+'/aftloanqueryDate/prepareExecute/toQueryBefloanForLoanInfo',
			'width':900,
			'height':600,
			'title':'查询贷款信息',
			'buttons':[
			 /*{'text':'关闭','isClose':false}*/
			]
		};
	queryBefloanForLoanInfo=jyDialog(dialogStruct);
	queryBefloanForLoanInfo.open();
}


function setBefloan1(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	var obj = iframe.iframeObj["table"].getSelectedObjs();
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"warn"}).alert('请选择待数据！');
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"warn"}).alert('只能选择一条数据！');
		return;
	}
	setBefloan(obj[0]);
}

//把贷前的信息返回页面
function setBefloan(obj){
	       $(window.parent.document.getElementById("dtopaperKindSelect")).val(obj["cardType"]);
	       $(window.parent.document.getElementById("dtopaperKind")).val(obj["cardType"]);
	       $(window.parent.document.getElementById("dtopaperId")).val(obj["cardId"]);
	       $(window.parent.document.getElementById("dtopaperIdText")).val(obj["cardId"]);
	       $(window.parent.document.getElementById("dtocustName")).val(obj["custName"]);
	       $(window.parent.document.getElementById("dtocustNameText")).val(obj["custName"]);
	       $(window.parent.document.getElementById("dtocustId")).val(obj["custId"]);
	       $(window.parent.document.getElementById("dtocustIdText")).val(obj["custId"]);
	       $(window.parent.document.getElementById("dtoretuKind")).val(obj["repayType"]);
	       $(window.parent.document.getElementById("dtoretuKindSelect")).val(obj["repayType"]);
	       $(window.parent.document.getElementById("dtointoAppId")).val(obj["intoCode"]);
	       $(window.parent.document.getElementById("dtointoAppIdText")).val(obj["intoCode"]);
	       $(window.parent.document.getElementById("dtocontractId")).val(obj["contractCode"]);
	       $(window.parent.document.getElementById("dtocontractIdText")).val(obj["contractCode"]);
	       $(window.parent.document.getElementById("dtocontractAmount")).val(jyTools.formatMoney(obj["contractAmount"]));
	       $(window.parent.document.getElementById("dtocontractAmountText")).val(jyTools.formatMoney(obj["contractAmount"]));
	       $(window.parent.document.getElementById("dtocontractSource")).val(obj["contractSrc"]);
	       $(window.parent.document.getElementById("dtocontractSourceSelect")).val(obj["contractSrc"]);
	       $(window.parent.document.getElementById("dtoprovideAmount")).val(jyTools.formatMoney(obj["provideAmount"]));
	       $(window.parent.document.getElementById("dtoprovideAmountText")).val(jyTools.formatMoney(obj["provideAmount"]));
	       $(window.parent.document.getElementById("dtoproductCode")).val(obj["prodCode"]);
	       $(window.parent.document.getElementById("dtoproductCodeText")).val(obj["prodCode"]);
	       $(window.parent.document.getElementById("dtoproductName")).val(obj["prodName"]);
	       $(window.parent.document.getElementById("dtoproductNameText")).val(obj["prodName"]);
	       $(window.parent.document.getElementById("dtoassuBail")).val(obj["assuBail"]);
	       $(window.parent.document.getElementById("dtoassuBailText")).val(obj["assuBail"]);
	       $(window.parent.document.getElementById("dtoloanOperId")).val(obj["clientManag"]);
	       $(window.parent.document.getElementById("dtoloanServiceId")).val(obj["opUserCode"]);
	       $(window.parent.document.getElementById("dtoloanBankId")).val(obj["storeCode"]);
	       $(window.parent.document.getElementById("dtoloanBankName")).val(obj["orgName"]);
	       $(window.parent.document.getElementById("dtoloanAreaId")).val(obj["orgCode"]);
	       $(window.parent.document.getElementById("dtoloanOperIdText")).val(obj["clientManag"]);
	       $(window.parent.document.getElementById("dtoloanServiceIdText")).val(obj["opUserCode"]);
	       $(window.parent.document.getElementById("dtoloanBankIdText")).val(obj["storeCode"]);
	       $(window.parent.document.getElementById("dtoloanBankNameText")).val(obj["orgName"]);
	       $(window.parent.document.getElementById("dtoloanAreaIdText")).val(obj["orgCode"]);
	       window.parent.queryBefloanForLoanInfo.close();    
}

function setCore1(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	var obj = iframe.iframeObj["table"].getSelectedObjs();
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"warn"}).alert('请选择待数据！');
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"warn"}).alert('只能选择一条数据！');
		return;
	}
	setCore(obj[0]);
}

//把核心数据反显到新增页面
function setCore(obj){
	$(window.parent.document.getElementById("dtoloanStatus")).val(obj["loanStatus"]);
    $(window.parent.document.getElementById("dtoloanStatusSelect")).val(obj["loanStatus"]);
    $(window.parent.document.getElementById("dtopayoffFlag")).val(obj["payoffStatus"]);
    $(window.parent.document.getElementById("dtopayoffFlagSelect")).val(obj["payoffStatus"]);
    $(window.parent.document.getElementById("dtoendDate")).val(new Date(obj["endDate"]).format("yyyy-MM-dd"));
    $(window.parent.document.getElementById("dtobeginDate")).val(new Date(obj["fundDate"]).format("yyyy-MM-dd"));
    $(window.parent.document.getElementById("dtopayoffDate")).val(obj["payoffDate"]);
    $(window.parent.document.getElementById("dtorepayDay")).val(obj["repayDay"]);
    $(window.parent.document.getElementById("dtoaccountNo")).val(obj["loanAcctNo"]);
    $(window.parent.document.getElementById("dtooldBankCardNo")).val(obj["loanAcctNo"]);
    $(window.parent.document.getElementById("dtobankCode")).val(obj["loanBankCode"]);
    $(window.parent.document.getElementById("dtooldOpenBankCode")).val(obj["loanBankCode"]);
    $(window.parent.document.getElementById("dtobal")).val(jyTools.formatMoney(obj["loanBalance"]));
    $(window.parent.document.getElementById("dtocompinteFlag")).val(obj["isStopInst"]);
    $(window.parent.document.getElementById("dtocompinteFlagSelect")).val(obj["isStopInst"]);
    $(window.parent.document.getElementById("dtopunInterest")).val(jyTools.formatMoney(obj["penaltyInst"]));
    $(window.parent.document.getElementById("dtopenalty")).val(jyTools.formatMoney(obj["defaultInst"]));
    $(window.parent.document.getElementById("dtoinfoCost")).val(jyTools.formatMoney(obj["manageAmount"]));
    $(window.parent.document.getElementById("dtoconsCost")).val(jyTools.formatMoney(obj["quiryAmount"]));
    
    $(window.parent.document.getElementById("dtocreditCost")).val(jyTools.formatMoney(obj["auditAmount"]));
    $(window.parent.document.getElementById("dtodeductNorBase")).val(jyTools.formatMoney(obj["remainNorBase"]));
    $(window.parent.document.getElementById("dtodeductNorNowBase")).val(jyTools.formatMoney(obj["curNorBase"]));
    $(window.parent.document.getElementById("dtodeductOverBase")).val(jyTools.formatMoney(obj["overdueBase"]));
    $(window.parent.document.getElementById("dtodeductNorInst")).val(jyTools.formatMoney(obj["remainNorInst"]));
    $(window.parent.document.getElementById("dtodeductNorNowInst")).val(jyTools.formatMoney(obj["curNorInst"]));
    $(window.parent.document.getElementById("dtodeductOverInst")).val(jyTools.formatMoney(obj["overdueInst"]));
    $(window.parent.document.getElementById("dtolosAmount")).val(jyTools.formatMoney(obj["suspendAmount"]));
    $(window.parent.document.getElementById("dtocurRepayMoney")).val(jyTools.formatMoney(obj["curRepayMoney"]));
    $(window.parent.document.getElementById("dtototalDebtAmount")).val(jyTools.formatMoney(obj["totalDebtAmount"]));
    $(window.parent.document.getElementById("dtonorDebtAmount")).val(jyTools.formatMoney(obj["norDebtAmount"]));
    $(window.parent.document.getElementById("dtooverdueDebtAmount")).val(jyTools.formatMoney(obj["overdueDebtAmount"]));
    $(window.parent.document.getElementById("dtomonthRate")).val(obj["monthRate"]);
    $(window.parent.document.getElementById("dtolistRepayid")).val(obj["remitListId"]);
    $(window.parent.document.getElementById("dtorklistStat")).val(obj["remitListStat"]);
    
    $(window.parent.document.getElementById("dtoloanQuiryAmount")).val(obj["loanQuiryAmount"]);
    $(window.parent.document.getElementById("dtoloanManageAmount")).val(obj["loanManageAmount"]);
    $(window.parent.document.getElementById("dtoloanAuditAmount")).val(obj["loanAuditAmount"]);
    
    $(window.parent.document.getElementById("dtoendDateText")).val(new Date(obj["endDate"]).format("yyyy-MM-dd"));
    $(window.parent.document.getElementById("dtobeginDateText")).val(new Date(obj["fundDate"]).format("yyyy-MM-dd"));
    $(window.parent.document.getElementById("dtopayoffDateText")).val(obj["payoffDate"]);
    $(window.parent.document.getElementById("dtorepayDayText")).val(obj["repayDay"]);
    $(window.parent.document.getElementById("dtoaccountNoText")).val(obj["loanAcctNo"]);
    $(window.parent.document.getElementById("dtooldBankCardNoText")).val(obj["loanAcctNo"]);
    $(window.parent.document.getElementById("dtobankCodeText")).val(obj["loanBankCode"]);
    $(window.parent.document.getElementById("dtooldOpenBankCodeText")).val(obj["loanBankCode"]);
    
    $(window.parent.document.getElementById("dtobalText")).val(jyTools.formatMoney(obj["loanBalance"]));
    $(window.parent.document.getElementById("dtopunInterestText")).val(jyTools.formatMoney(obj["penaltyInst"]));
    $(window.parent.document.getElementById("dtopenaltyText")).val(jyTools.formatMoney(obj["defaultInst"]));
    $(window.parent.document.getElementById("dtoinfoCostText")).val(jyTools.formatMoney(obj["manageAmount"]));
    $(window.parent.document.getElementById("dtoconsCostText")).val(jyTools.formatMoney(obj["quiryAmount"]));
    
    $(window.parent.document.getElementById("dtocreditCostText")).val(jyTools.formatMoney(obj["auditAmount"]));
    $(window.parent.document.getElementById("dtodeductNorBaseText")).val(jyTools.formatMoney(obj["remainNorBase"]));
    $(window.parent.document.getElementById("dtodeductNorNowBaseText")).val(jyTools.formatMoney(obj["curNorBase"]));
    $(window.parent.document.getElementById("dtodeductOverBaseText")).val(jyTools.formatMoney(obj["overdueBase"]));
    $(window.parent.document.getElementById("dtodeductNorInstText")).val(jyTools.formatMoney(obj["remainNorInst"]));
    $(window.parent.document.getElementById("dtodeductNorNowInstText")).val(jyTools.formatMoney(obj["curNorInst"]));
    $(window.parent.document.getElementById("dtodeductOverInstText")).val(jyTools.formatMoney(obj["overdueInst"]));
    $(window.parent.document.getElementById("dtolosAmountText")).val(jyTools.formatMoney(obj["suspendAmount"]));
    $(window.parent.document.getElementById("dtocurRepayMoneyText")).val(jyTools.formatMoney(obj["curRepayMoney"]));
    $(window.parent.document.getElementById("dtototalDebtAmountText")).val(jyTools.formatMoney(obj["totalDebtAmount"]));
    $(window.parent.document.getElementById("dtonorDebtAmountText")).val(jyTools.formatMoney(obj["norDebtAmount"]));
    $(window.parent.document.getElementById("dtooverdueDebtAmountText")).val(jyTools.formatMoney(obj["overdueDebtAmount"]));
    $(window.parent.document.getElementById("dtomonthRate")).val(obj["monthRate"]);
    $(window.parent.document.getElementById("dtolistRepayidText")).val(obj["remitListId"]);
    $(window.parent.document.getElementById("dtorklistStatText")).val(obj["remitListStat"]);
    
    $(window.parent.document.getElementById("dtoloanQuiryAmountText")).val(obj["loanQuiryAmount"]); 
    $(window.parent.document.getElementById("dtoloanManageAmountText")).val(obj["loanManageAmount"]); 
    $(window.parent.document.getElementById("dtoloanAuditAmountText")).val(obj["loanAuditAmount"]); 
    
    $(window.parent.document.getElementById("dtorepayAcctType")).val(obj["repayAcctType"]); 
    $(window.parent.document.getElementById("dtorepayAcctProv")).val(obj["repayAcctProv"]); 
    $(window.parent.document.getElementById("dtorepayAcctCity")).val(obj["repayAcctCity"]);
    $(window.parent.document.getElementById("dtorepayAcctbrchName")).val(obj["repayAcctBrchName"]); 
    $(window.parent.document.getElementById("dtorepayAcctcardType")).val(obj["repayAcctCardType"]); 
    $(window.parent.document.getElementById("dtorepayAcctcardId")).val(obj["repayAcctCardId"]);
    $(window.parent.document.getElementById("dtorepayAcctPhone")).val(obj["repayAcctPhone"]); 
    
    $(window.parent.document.getElementById("dtorepayAcctTypeText")).val(obj["repayAcctType"]); 
    $(window.parent.document.getElementById("dtorepayAcctProvText")).val(obj["repayAcctProvExt"]); 
    $(window.parent.document.getElementById("dtorepayAcctCityText")).val(obj["repayAcctCityExt"]);
    $(window.parent.document.getElementById("dtorepayAcctbrchNameText")).val(obj["repayAcctBrchName"]); 
    $(window.parent.document.getElementById("dtorepayAcctcardTypeText")).val(obj["repayAcctCardType"]); 
    $(window.parent.document.getElementById("dtorepayAcctcardIdText")).val(obj["repayAcctCardId"]);
    $(window.parent.document.getElementById("dtorepayAcctPhoneText")).val(obj["repayAcctPhone"]); 
    
    $(window.parent.document.getElementById("dtooverduePark")).val(obj["overduePark"]);
    $(window.parent.document.getElementById("dtooverdueParkText")).val(obj["overduePark"]);
    
    $(window.parent.document.getElementById("dtoremainNorPark")).val(obj["overduePark"]);
    $(window.parent.document.getElementById("dtoremainNorParkText")).val(obj["overduePark"]);
    
    
    $(window.parent.document.getElementById("dtocreditBalance")).val(obj["creditBalance"]);
    $(window.parent.document.getElementById("dtocreditBalanceText")).val(obj["creditBalance"]);
    
    //判断金额是否为空
    if((obj["penaltyInst"]+"").length>1){
         $(window.parent.document.getElementById("dtoredpunInterest")).removeAttr("disabled");
    }
    if((obj["defaultInst"]+"").length>1){
         $(window.parent.document.getElementById("dtoredPenalty")).removeAttr("disabled");
    }
    if((obj["manageAmount"]+"").length>1){
         $(window.parent.document.getElementById("dtoredinfoCost")).removeAttr("disabled");
    }
    if((obj["auditAmount"]+"").length>1){
         $(window.parent.document.getElementById("dtoredcreditCost")).removeAttr("disabled");
    }
    if((obj["quiryAmount"]+"").length>1){
         $(window.parent.document.getElementById("dtoredconsCost")).removeAttr("disabled");
    }
    if((obj["remainNorBase"]+"").length>1){
         $(window.parent.document.getElementById("dtoredNorBase")).removeAttr("disabled");
    }
    if((obj["curNorBase"]+"").length>1){
         $(window.parent.document.getElementById("dtoredNorNowBase")).removeAttr("disabled");
    }
    if((obj["overdueBase"]+"").length>1){
         $(window.parent.document.getElementById("dtoredOverBase")).removeAttr("disabled");
    }
    if((obj["remainNorInst"]+"").length>1){
         $(window.parent.document.getElementById("dtoredNorInst")).removeAttr("disabled");
    }
    if((obj["curNorInst"]+"").length>1){
         $(window.parent.document.getElementById("dtoredNorNowInst")).removeAttr("disabled");
    }
    if((obj["overdueInst"]+"").length>1){
         $(window.parent.document.getElementById("dtoredOverInst")).removeAttr("disabled");
    }
    window.parent.queryCoreForLoanInfo.close();   
}


function toQueryCore1(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	var obj = iframe.iframeObj["table"].getSelectedObjs();
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"warn"}).alert('请选择待数据！');
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"warn"}).alert('只能选择一条数据！');
		return;
	}
	callCore(obj[0]);
}


function callCore(contractId, claimKind){
	var url = contextRootPath+'/aftloanqueryDate/queryCoreForLoanInfo?contractId='+contractId+'&claimKind='+claimKind;
	jyAjax(
			url,
			"",
			function(msg){
				//新增成功后，
				var v_status = msg.status;
	        	if(v_status.indexOf('ok') >-1){
	        	   var data = msg.data;
		           if(data.length==0){
		        	   jyDialog({"type":"warn"}).alert('此合同没有贷款信息！');
		        		 return;
		           }
		           //计算提前结清金额
		           var s = Number(data[0].totalDebtAmount)//欠款总额
		           			-Number(data[0].totalBalance)//账户总额(可用余额+冻结金额)
		           			-Number(data[0].remainNorInst)//剩余正常利息
		           			-Number(data[0].returnFee)//退还服务费
		           			-Number(data[0].curNorPark)//当期停车费
		           			-Number(data[0].remainNorPark)//剩余正常停车费
		           			;
		           if (s < 0) {
		        	   s = 0;
		           } else {
		        	   s = s.toFixed(2);
		           }
		           //计算服务费总和
		           var fee = Number(data[0].quiryAmount)// 咨询服务费
		           			+Number(data[0].manageAmount)//信息管理费
		           			+Number(data[0].auditAmount)// 信用审核费
		           			;
		           if (fee < 0) {
		        	   fee = 0;
		           } else {
		        	   fee = fee.toFixed(2);
		           }
			       //计算服务费总和-合同减免金额
		           var diff = fee - Number(data[0].returnFee);
		           if (diff < 0) {
		        	   diff = 0;
		           } else {
		        	   diff = diff.toFixed(2);
		           }
		           
		           //计算冻结金额(账户总额-可用余额)
		           var freezeBal = Number(data[0].totalBalance)//账户总额
		           				  -Number(data[0].suspendAmount);//可用余额
		           if (freezeBal < 0) {
		        	   freezeBal = 0;
		           } else {
		        	   freezeBal = freezeBal.toFixed(2);
		           }
		           
	        	   $(document.getElementById("dtoloanStatus")).val(data[0].loanStatus);
			       $(document.getElementById("dtoloanStatusSelect")).val(data[0].loanStatus);
			       $(document.getElementById("dtopayoffFlag")).val(data[0].payoffStatus);
			       $(document.getElementById("dtopayoffFlagSelect")).val(data[0].payoffStatus);
			       $(document.getElementById("dtoendDate")).val(new Date(data[0].endDate).format("yyyy-MM-dd"));
			       $(document.getElementById("dtobeginDate")).val(new Date(data[0].fundDate).format("yyyy-MM-dd"));
			       $(document.getElementById("dtopayoffDate")).val(new Date(data[0].payoffDate).format("yyyy-MM-dd"));
			       $(document.getElementById("dtorepayDay")).val(data[0].repayDay);
			       $(document.getElementById("dtoaccountNo")).val(data[0].loanAcctNo);
			       $(document.getElementById("dtooldBankCardNo")).val(data[0].loanAcctNo);
			       $(document.getElementById("dtobankCode")).val(data[0].loanBankCode);
			       $(document.getElementById("dtooldOpenBankCode")).val(data[0].loanBankCode);
			       $(document.getElementById("dtobal")).val(data[0].loanBalance);
			       $(document.getElementById("dtocompinteFlag")).val(data[0].isStopInst);
			       $(document.getElementById("dtocompinteFlagSelect")).val(data[0].isStopInst);
			       $(document.getElementById("dtopunInterest")).val(data[0].penaltyInst);
			       $(document.getElementById("dtopenalty")).val(data[0].defaultInst);
			       $(document.getElementById("dtoinfoCost")).val(data[0].quiryAmount);
			       $(document.getElementById("dtoconsCost")).val(data[0].manageAmount);
			       
			       $(document.getElementById("dtocreditCost")).val(data[0].auditAmount);
			       $(document.getElementById("dtodeductNorBase")).val(data[0].remainNorBase);
			       $(document.getElementById("dtodeductNorNowBase")).val(data[0].curNorBase);
			       $(document.getElementById("dtodeductOverBase")).val(data[0].overdueBase);
			       $(document.getElementById("dtodeductNorInst")).val(data[0].remainNorInst);
			       $(document.getElementById("dtodeductNorNowInst")).val(data[0].curNorInst);
			       $(document.getElementById("dtodeductOverInst")).val(data[0].overdueInst);
			       $(document.getElementById("dtolosAmount")).val(data[0].suspendAmount);
			       $(document.getElementById("dtocurRepayMoney")).val(data[0].curRepayMoney);
			       $(document.getElementById("dtototaldebtAmount")).val(data[0].totalDebtAmount);
			       $(document.getElementById("dtonorDebtAmount")).val(data[0].norDebtAmount);
			       $(document.getElementById("dtooverdueDebtAmount")).val(data[0].overdueDebtAmount);
			       $(document.getElementById("dtointeRate")).val(data[0].monthRate);
			       $(document.getElementById("dtolistRepayid")).val(data[0].remitListId);
			       $(document.getElementById("dtorklistStat")).val(data[0].remitListStat);
			       $(document.getElementById("dtoloanCurrentPeriod")).val(data[0].curLoanPeriod);
			       $(document.getElementById("dtototalTerm")).val(data[0].totalTerm);
			       $(document.getElementById("dtoyhje")).val(data[0].totalRepayAmount);
			       $(document.getElementById("dtoaccountName")).val(data[0].loanAcctName);
			       $(document.getElementById("dtooldAccName")).val(data[0].loanAcctName);
			       $(document.getElementById("dtooldAccNameText")).val(data[0].loanAcctName);
			       
			       $(document.getElementById("dtolistAmount")).val(s);
			       $(document.getElementById("dtolistAmountText")).val(s);
			       $(document.getElementById("dtoendDateText")).val(new Date(data[0].endDate).format("yyyy-MM-dd"));
			       $(document.getElementById("dtobeginDateText")).val(new Date(data[0].fundDate).format("yyyy-MM-dd"));
			       $(document.getElementById("dtopayoffDateText")).val(data[0].payoffDate);
			       $(document.getElementById("dtorepayDayText")).val(data[0].repayDay);
			       $(document.getElementById("dtoaccountNoText")).val(data[0].loanAcctNo);
			       $(document.getElementById("dtooldBankCardNoText")).val(data[0].loanAcctNo);
			       $(document.getElementById("dtobankCodeText")).val(data[0].loanBankCode);
			       $(document.getElementById("dtooldOpenBankCodeText")).val(data[0].loanBankCode);
			       $(document.getElementById("dtobalText")).val(jyTools.formatMoney(data[0].loanBalance));
			       $(document.getElementById("dtopunInterestText")).val(jyTools.formatMoney(data[0].penaltyInst));
			       $(document.getElementById("dtopenaltyText")).val(jyTools.formatMoney(data[0].defaultInst));
			       $(document.getElementById("dtoinfoCostText")).val(jyTools.formatMoney(data[0].quiryAmount));
			       $(document.getElementById("dtoconsCostText")).val(jyTools.formatMoney(data[0].manageAmount));
			       $(document.getElementById("dtocreditCostText")).val(jyTools.formatMoney(data[0].auditAmount));
			       $(document.getElementById("dtodeductNorBaseText")).val(jyTools.formatMoney(data[0].remainNorBase));
			       $(document.getElementById("dtodeductNorNowBaseText")).val(jyTools.formatMoney(data[0].curNorBase));
			       $(document.getElementById("dtodeductOverBaseText")).val(jyTools.formatMoney(data[0].overdueBase));
			       $(document.getElementById("dtodeductNorInstText")).val(jyTools.formatMoney(data[0].remainNorInst));
			       $(document.getElementById("dtodeductNorNowInstText")).val(jyTools.formatMoney(data[0].curNorInst));
			       $(document.getElementById("dtodeductOverInstText")).val(jyTools.formatMoney(data[0].overdueInst));
			       $(document.getElementById("dtolosAmountText")).val(jyTools.formatMoney(data[0].suspendAmount));
			       $(document.getElementById("dtocurRepayMoneyText")).val(jyTools.formatMoney(data[0].curRepayMoney));
			       $(document.getElementById("dtototaldebtAmountText")).val(jyTools.formatMoney(data[0].totalDebtAmount));
			       $(document.getElementById("dtonorDebtAmountText")).val(jyTools.formatMoney(data[0].norDebtAmount));
			       $(document.getElementById("dtooverdueDebtAmountText")).val(jyTools.formatMoney(data[0].overdueDebtAmount));
			       $(document.getElementById("dtointeRateText")).val(data[0].monthRate);
			       $(document.getElementById("dtolistRepayidText")).val(data[0].remitListId);
			       $(document.getElementById("dtorklistStatText")).val(data[0].remitListStat); 
			       $(document.getElementById("dtoloanCurrentPeriodText")).val(data[0].curLoanPeriod);
			       $(document.getElementById("dtototalTermText")).val(data[0].totalTerm);
			       $(document.getElementById("dtoyhjeText")).val(jyTools.formatMoney(data[0].totalRepayAmount));
			       $(document.getElementById("dtoaccountNameText")).val(data[0].loanAcctName);
			       $(document.getElementById("dtooldAccNameText")).val(data[0].loanAcctName);
			       
			       $(document.getElementById("dtonewAccName")).val(data[0].loanAcctName);
			       $(document.getElementById("dtonewAccNameText")).val(data[0].loanAcctName);
			       
			       $(document.getElementById("dtooverdueDate")).val(data[0].overdueDate);
			       $(document.getElementById("dtooverdueDateText")).val(data[0].overdueDate);
			       $(document.getElementById("dtooverdueTerm")).val(data[0].overdueTerm);
			       $(document.getElementById("dtooverdueTermText")).val(data[0].overdueTerm);
			       $(document.getElementById("dtooverdueDay")).val(data[0].overdueDay);
			       $(document.getElementById("dtooverdueDayText")).val(data[0].overdueDay);
			       $(document.getElementById("dtoappRedAmount")).val(data[0].returnFee);
			       $(document.getElementById("dtoredinfoCost")).val(data[0].returnFee);
			       $(document.getElementById("dtoredinfoCostText")).val(jyTools.formatMoney(data[0].returnFee));
			       
			       $(document.getElementById("curNorPark")).val(data[0].curNorPark);//当期停车费
			       $(document.getElementById("remainNorPark")).val(data[0].remainNorPark);//剩余正常停车费
			       
			       $(document.getElementById("lawFeeText")).val(jyTools.formatMoney(fee));//服务费总和
			       $(document.getElementById("diffFeeText")).val(jyTools.formatMoney(diff));//差额
			       $(document.getElementById("diffFeeTextValue")).val(diff);//差额
			       //当期还款日
			       $(document.getElementById("dtocurPayDate")).val(data[0].currPayDate);
			       $(document.getElementById("dtocurPayDateText")).val(data[0].currPayDate);
			       $(document.getElementById("dtototalTerm")).val(data[0].totalTerm);
			       $(document.getElementById("dtocurrPayDate")).val(data[0].currPayDate);
			       
			       $(document.getElementById("dtoloanQuiryAmount")).val(data[0].loanQuiryAmount);
			       $(document.getElementById("dtoloanManageAmount")).val(data[0].loanManageAmount);
			       $(document.getElementById("dtoloanAuditAmount")).val(data[0].loanAuditAmount);
			       $(document.getElementById("dtoloanQuiryAmountText")).val(data[0].loanQuiryAmount); 
			       $(document.getElementById("dtoloanManageAmountText")).val(data[0].loanManageAmount); 
			       $(document.getElementById("dtoloanAuditAmountText")).val(data[0].loanAuditAmount); 
			       
			       $(document.getElementById("dtototalRepayAmount")).val(data[0].totalRepayAmount);//已换总金额
			       $(document.getElementById("dtototalRepayAmounttText")).val(data[0].totalRepayAmount);
			       
			       $(document.getElementById("dtorepayAcctType")).val(data[0].repayAcctType);
			       $(document.getElementById("dtorepayAcctProv")).val(data[0].repayAcctProv);
			       $(document.getElementById("dtorepayAcctCity")).val(data[0].repayAcctCity);
			       $(document.getElementById("dtorepayAcctbrchName")).val(data[0].repayAcctBrchName);
			       $(document.getElementById("dtorepayAcctcardType")).val(data[0].repayAcctCardType);
			       $(document.getElementById("dtorepayAcctcardId")).val(data[0].repayAcctCardId);
			       $(document.getElementById("dtorepayAcctPhone")).val(data[0].repayAcctPhone);
			       
			       $(document.getElementById("dtorepayAcctTypeText")).val(data[0].repayAcctType);
			       $(document.getElementById("dtorepayAcctProvText")).val(data[0].repayAcctProvExt);
			       $(document.getElementById("dtorepayAcctCityText")).val(data[0].repayAcctCityExt);
			       $(document.getElementById("dtorepayAcctbrchNameText")).val(data[0].repayAcctBrchName);
			       $(document.getElementById("dtorepayAcctcardTypeText")).val(data[0].repayAcctCardType);
			       $(document.getElementById("dtorepayAcctcardIdText")).val(data[0].repayAcctCardId);
			       $(document.getElementById("dtorepayAcctPhoneText")).val(data[0].repayAcctPhone);
			       
			       $(document.getElementById("dtooverduePark")).val(data[0].overduePark);
			       $(document.getElementById("dtooverdueParkText")).val(data[0].overduePark);
			       
			       $(document.getElementById("dtoremainNorPark")).val(data[0].overduePark);
			       $(document.getElementById("dtoremainNorParkText")).val(data[0].overduePark);
			       
			       $(document.getElementById("dtocreditBalance")).val(data[0].creditBalance);
			       $(document.getElementById("dtocreditBalanceText")).val(data[0].creditBalance);
			       
			       $(document.getElementById("dtofreezeBal")).val(freezeBal);//冻结金额
			       $(document.getElementById("dtofreezeBalText")).val(freezeBal);
			       
			       //设置减免金额是否disabled
			       setItemDisabled(data);
         }
     },null,null,false);
}

//设置减免金额是否disabled
function setItemDisabled(data) {
    //判断金额是否为空，如果不为空则可输入
    if((data[0].penaltyInst+"").length>1){
         $(document.getElementById("dtoredpunInterest")).removeAttr("disabled");
    }
    if((data[0].defaultInst+"").length>1){
         $(document.getElementById("dtoredPenalty")).removeAttr("disabled");
    }
//    if((data[0].quiryAmount+"").length>1){
      //   $(document.getElementById("dtoredinfoCost")).removeAttr("disabled");
//    }
//    if((data[0].auditAmount+"").length>1){
         $(document.getElementById("dtoredcreditCost")).removeAttr("disabled");
//    }
//    if((data[0].manageAmount+"").length>1){
         $(document.getElementById("dtoredconsCost")).removeAttr("disabled");
//    }
    if((data[0].remainNorBase+"").length>1){
         $(document.getElementById("dtoredNorBase")).removeAttr("disabled");
    }
    if((data[0].curNorBase+"").length>1){
         $(document.getElementById("dtoredNorNowBase")).removeAttr("disabled");
    }
    if((data[0].overdueBase+"").length>1){
         $(document.getElementById("dtoredOverBase")).removeAttr("disabled");
    }
    if((data[0].remainNorInst+"").length>1){
         $(document.getElementById("dtoredNorInst")).removeAttr("disabled");
    }
    if((data[0].curNorInst+"").length>1){
         $(document.getElementById("dtoredNorNowInst")).removeAttr("disabled");
    }
    if((data[0].overdueInst+"").length>1){
         $(document.getElementById("dtoredOverInst")).removeAttr("disabled");
    }
    //结清减免、减免功能控制减免项是否可用
    setItemDisabledByFunc();
}

//在功能页面重载该方法，差异化控制减免项是否可用
function setItemDisabledByFunc() {
}

