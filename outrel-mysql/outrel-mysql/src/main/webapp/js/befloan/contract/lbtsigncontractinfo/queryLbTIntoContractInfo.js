var dialogAdd;
var cModify;

var addDlg1;//添加第一个界面：查询贷前
var addDlg2;//添加第二个界面：添加详情
//修改贷款额度、贷款期限
function toUpdateMoney(){
	
	// 后期 把 进件状态 带过来： 在签约中 的就不能修改。chj完善
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	
	//如果没有选中 数据则进行提醒
	if(v_ids == ""){
		$("").newMsg({}).show("请选择待操作的数据！");
		return;
	}
	// 获取所在行的对象
	var objs=iframe.iframeObj["table"].getSelectedObjs();
	//产品类型
    var v_signProductType = objs[0].signProductType;
    var v_signState = objs[0].signState;
    //获取签章字段
    var v_isSignature = objs[0].isSignature;
    
    jyAjax(
    		contextRootPath+"/lbtsigncontract/checkDzhtIsSignature?fkIntoAppId="+v_ids+"&signState="+v_signState,
			'',
			function(msg){
				if(msg.data == '1'){
					$("").newMsg({}).show("当前电子合同已签章，需先作废原合同！");
					return false;
				}else{
					//添加产品校验是否可以生成合同
			    	var v_Typeurl = contextRootPath+"/lbtsigncontract/isEnableGenerContract?signProductType="+v_signProductType+"&intoId="+v_ids;
			    	jyAjax(
			    			v_Typeurl,
			    			'',
			    			function(msg){
			    				if(msg.data == "true"){
			    					$("").newMsg({}).show("该产品无法在线生成合同！");
			    					return false;
			    				}else if(msg.data == "freeze"){
			    					$("").newMsg({}).show("本进件处于反欺诈调查中，请等待反欺诈处理结果！");
			    					return false;
			    				}else if(msg.data == "refuse"){
			    					$("").newMsg({}).show("本进件处于拒绝状态,无法在线生成合同！");
			    					return false;
			    				}else{
			    					continueNextOperation(objs,v_ids,msg.data);
			    				}
			    			}
			    	);
				}
			}
	);
}

function continueNextOperation(objs,v_ids,state){
	 var v_cardId = objs[0].cardId;
	    var v_custName = objs[0].custName;
	    var v_intoState = objs[0].auditeState;
	    
	    var v_signState = objs[0].signState;
	    
		var dialogStruct={
				'display':contextRootPath+'/lbtsigncontract/prepareExecute/toUpdate?id='+v_ids+"&carId="+v_cardId+"&auditeState="+v_intoState+"&signState="+v_signState+"&custName="+encodeURI(v_custName)+"&state="+state,
				'width':800,
				'height':650,
				'title':'合同签约信息确认',
				'isIframe':'false',
				'buttons':[
	             {'text':'保存','action':updateMoney,'isClose':false},
				 {'text':'关闭','isClose':true}
				]
			};

		dialogAdd =jyDialog(dialogStruct);
		dialogAdd.open();
}

//进件捞回

function getBack(){
	/*var objs=iframe.iframeObj["table"].getSelectedObjs();
	var intoAppId = objs[0].intoAppId;
	if(!validateInfoDone(intoAppId)){return}*/ //2017.10.10 注释 和后续业务无关联
	var dialogStruct={
			'display':contextRootPath+'/lbTContractInfo/prepareExecute/getBack',
			'width':1100,
			'height':550,
			'title':'合同捞回',
			'buttons':[
			  {'name':'nextBtn','text':'下一步','action':backOpertor},
			  {'text':'关闭','isClose':true}
			]
		};
	addDlg1=jyDialog(dialogStruct);
	addDlg1.open();
}
function backOpertor(){
	var v_ids = addDlg1.getIframe().getSelectedIds().join(",");
	
	//var selectIds = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		$("").newMsg({}).show("请选择一条数据！");
		return;
	}
	//先校验合同的状态是否为：待审核或放款中，是的话弹出对话框。
	var v_Typeurl = contextRootPath+"/lbTContractInfo/doGetBackContract?contractId="+v_ids+"&remark=";
	jyAjax(
			v_Typeurl,
			'',
			function(msg){
			
				if(msg.data == 'DontConformRulse' ){
					$("").newMsg({}).show(msg.msg);
					return false;
				}else if(msg.data == 'succes'){
					//关闭查询界面
					addDlg1.close();
					addGetBackRemark(v_ids);
					
				}else{
					$("").newMsg({}).show(msg.msg);
					return false;
				}
			}
	);
	
}

function addGetBackRemark(v_ids){
//再次弹出窗口添加捞回原因
	
	var dialogStruct={
			'display':contextRootPath+'/lbTContractInfo/prepareExecute/toAddRemark?contractId='+v_ids,
			'width':600,
			'height':350,
			'title':'捞回原因',
			//'isIframe':'false',
			'buttons':[
             {'text':'捞回','action':executebackOpertor,'isClose':false},
			 {'text':'关闭','isClose':true}
			]
		};

	addDlg2 =jyDialog(dialogStruct);
	addDlg2.open();

}

function executebackOpertor(){
	//查询合同状态 ： 01", "待审核  "04", "放款中"
	//进行业务的操作
	var remark = $(addDlg2.iframe.contentDocument.getElementById("dtooperateContent")).val();
	if(remark == null || remark == ''){
		$("").newMsg({}).show("请输入捞回原因！");
		return false;
	}
	
	var contractId = $(addDlg2.iframe.contentDocument.getElementById("dtocontractId")).val();
	
	var v_Typeurl1 = contextRootPath+"/lbTContractInfo/doGetBackContract?contractId="+contractId+"&remark="+remark;
	jyAjax(
			v_Typeurl1,
			'',
			function(msg){
				if(msg.data == 'fail'){
					$("").newMsg({}).show(msg.msg);
					addDlg2.close();
					return false;
				}else if(msg.data == 'DontConformRulse'){
					$("").newMsg({}).show(msg.msg);
					addDlg2.close();
					return false;
				}else if(msg.data == 'succes'){
					$("").newMsg({}).show(msg.msg);
					addDlg2.close();
					
					return true;
				}else if(msg.data == 'buttonClose'){
					$("").newMsg({}).show(msg.msg);
					addDlg2.close();
					return false;
				}else if(msg.data == 'processing'){
					$("").newMsg({}).show(msg.msg);
					addDlg2.close();
					return false;
				}else{
					$("").newMsg({}).show(msg.msg);
					addDlg2.close();
					return false;
				}
			}
	);
}

//表单验证
function checkInto() {
	var forms=["updateNewsFormData"];
	var checkTrueCount=0;
	for(var i=0;i<forms.length;i++){
		var formObj=document.getElementById(forms[i]);
		if(!(checkIsNull(formObj)&&checkFormFormat($(formObj)))){
			checkTrueCount+=1;
		}
	}
	//校验判断
	if(checkTrueCount>0){
		return false;
	}
	return true;
}

function updateMoney(){
	var v_meg=getEsbContractSignMoney();
	if(v_meg!='1'){
		$("").newMsg({}).show(v_meg);
		return false;
	}
	var v_id = $("#dtoid").val();
	var v_signState = $("#signStateId").val();
	//主银行卡信息
	var v_loanBank = $("#dtoloanBank").val();
	var v_loanSubBranchName = $("#dtoloanSubBranchName").val();
	var v_loanBankAccount = $("#dtoloanBankAccount").val();
	var v_loanName = $("#dtoloanName").val();
	var v_loanCity = $("#dtoloanBankCityAreacode").val();
	var v_loanPhone = $("#dtoloanBankReservedPhone").val();
	//备用银行卡信息
	var v_receiveBank = $("#dtoreceiveBank").val();
    var v_receiveSubBranchName = $("#dtoreceiveSubBranchName").val();
	var v_receiveBankAccount = $("#dtoreceiveBankAccount").val();
	var v_receiveName = $("#dtoreceiveName").val();
	var v_receiveCity = $("#dtoreceiveBankCityAreacode").val();
	var v_receivePhone = $("#dtoreceiveBankReservedPhone").val();
	if(checkInto()) {
		if(v_loanBank == v_receiveBank && v_loanSubBranchName ==v_receiveSubBranchName 
				&&v_loanBankAccount ==v_receiveBankAccount &&v_loanPhone == v_receivePhone
				&& v_loanCity == v_receiveCity ){
			
			$("").newMsg({}).show("主银行卡信息与备用银行卡信息一致,不能做为备用银行卡！");
			return;
		}
		
	}else{
		$("").newMsg({}).show("请选择或输入合法的内容！");
		return;
	}
	//先校验进件状态是否为最新的
	var v_auditeStateId = $("#auditeStateId").val();
	
	var v_Typeurl = contextRootPath+"/lbtsigncontract/doCheckAuditeStateByIntoID?intoId="+v_id+"&auditeState="+v_auditeStateId+"&signState="+v_signState;
	jyAjax(
			v_Typeurl,
			'',
			function(msg){
				if(msg.data == "false"){
					$("").newMsg({}).show("该数据不是最新状态,请手动刷新页面！");
					return false;
				}else{
					checkOther(v_id);
				}
			}
	);
}

function checkOther(v_id){
	//做相关的校验
	var v_oldMoney = $("#oldMoneyId").val().replace(/,/g,"");
	
	var v_newMoney = $("#dtosignAmount").val().replace(/,/g,"");
	
	var v_loanType = $("#dtoloanType").val();
	
	var v_repaymentWay = $("#dtoapprPepaymentWay").val();
	
	if(checkInto()) {
		
		var v_oldPeroid = $("#oldPeroidId").val();
		var v_newPeroid = $("#dtosignPeriod").val();
		var v_cusName = $("#custNameId").val();
		var v_carId = $("#carId").val();
		
		var v_oldProId = $("#oldproductTypeId").val();
		var v_name = $("#oldproductTypeId").attr("name");
		//var v_item = $("select[name=signProductType] option[selected]").text(); 
		var v_item = $("#newProNameId").val();
		var v_newProId = $("#dtosignProductType").val();
		var v_loanDate= $("#dtoplanLoansDate").val();
		var v_corpBrchCode = $("#dtocorpBrchCode").val();

		var v_signState = $("#signStateId").val();
		var v_remaker="" ;
		//预约放款时间校验
		var v_loanDateurl = contextRootPath+"/lbTSignLimit/querySignState?loanDate="+v_loanDate+"&corpBrchCode="+v_corpBrchCode;
		jyAjax(
				v_loanDateurl,
				'',
				function(msg){
					if(msg.data == false){
						$("").newMsg({}).show(msg.msg);
						return;
					}else{
						//贷款金额 或贷款期限 向上调整 弹出 确认框
						if(v_signState == 0){
							/*if((v_oldMoney*1 < v_newMoney*1) ){

								$("").newMsg({}).show("审批金额不能大于"+v_oldMoney+"!");
									return;
							}else if((v_oldPeroid*1 < v_newPeroid*1)){
								
								$("").newMsg({}).show("借款期限不能大于"+v_oldPeroid+"!");
									return;
							}else{*/
								
								if(v_loanType == 2 && (v_oldMoney*1 >= v_newMoney*1)){//循环贷 ，向下修改金额，进行校验
									
									var v_Typeurl = contextRootPath+"/lbtsigncontract/queryCirculateInfo?intoId="+v_id+"&money="+v_newMoney;
									jyAjax(
											v_Typeurl,
											'',
											function(msg){
												if(msg.data == false){
													$("").newMsg({}).show(msg.msg);
													return;
												}else{
													$("#resultId").val('NO');
													saveUpdateData(v_remaker,v_cusName,v_carId,v_newMoney,v_newPeroid,v_id,v_loanDate,v_oldProId,v_repaymentWay,v_signState);
												}
											}
									);
								}else{
									$("#resultId").val('NO');
									saveUpdateData(v_remaker,v_cusName,v_carId,v_newMoney,v_newPeroid,v_id,v_loanDate,v_oldProId,v_repaymentWay,v_signState);
								}
								
							//}
						}else{
							$("#resultId").val('NO');
							saveUpdateData(v_remaker,v_cusName,v_carId,v_newMoney,v_newPeroid,v_id,v_loanDate,v_oldProId,v_repaymentWay,v_signState);
						}
					}
				}
		);				
	}else{
		$("").newMsg({}).show("请选择或输入合法的内容！");
		return;
	}
}

// 保存 相关的update 数据
function saveUpdateData (v_remaker,v_cusName,v_carId,v_newMoney,newPeroid,v_id,loanDate,newProId,v_repaymentWay,v_signState){
	
	//栏位的相关数据
	var v_param = "&reconAppReason="+v_remaker+"&cusName="+v_cusName+"&cardId="+v_carId+"&newMoney="+v_newMoney+
	        "&newPeroid="+newPeroid+"&loanDate="+loanDate+"&newProId="+newProId+"&repaymentWay="+v_repaymentWay+"&signStateId="+v_signState;
	var params = $("#updateNewsFormData").serialize()+ "&columuModifyStr=" + cModify.getModifyJsonStr()+v_param;
	var url=contextRootPath+'/lbtsigncontract/updateMoneyOrPeroid';
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
        		dialogAdd.close();
        		queryData();
        		
        	}
  	});
}


//查询产品的最大审批金额
function getIntoMaxApprAmount(obj){
	var intoId = $("#dtoid").val();//进件编号
	var auditAmount=$("#dtosignAmount").val().trim();
	if(auditAmount!=""&&isNaN(auditAmount)){
		$("#dtosignAmount").val('');
		$("#dtosignAmount").focus();
  return false;
	}else if(auditAmount==""){
		//calculateRate(obj);计算费率总函数
		$("#dtosignAmount").val('');
		$("#dtosignAmount").focus();
		return false;
	}
	
	var url = contextRootPath + '/lbTIntoAuditResult/getIntoMaxApprAmountByIntoId'; 
	var params="intoId="+intoId+"&auditAmount="+$("#dtosignAmount").val();
	jyAjax(url, params, function(msg) {
		
		var result = msg.msg;
		if(result == 'no'){
			$("").newMsg({}).show("审批额度应在"+msg.data.intoProductInfo.loanLimitProp.minValue+"和"+msg.data.intoProductInfo.loanLimitProp.maxValue+"范围内！");
			$("#dtosignAmount").val("");
			result = false;
		}else{
			//calculateRate(obj);
		}
	},"","",false);  
}


//进件状态的修改
function operatorUpdateState(id,state,stateName,isGener,auditeState,signState){
	
	var dialogStruct={
		'display':contextRootPath+'/lbtsigncontract/prepareExecute/toAdd?id='+id+"&statusName="+stateName+"&operateStatus="+state+"&isGener="+isGener+"&auditeState="+auditeState+"&signState="+signState,
		'width':600,
		'height':400,
		/*'isIframe':"false",*/
		'title':stateName,
		'buttons':[
         {'text':'保存','action':addFrom,'isClose':false},
		 {'text':'关闭','isClose':true}
		]
	};
	
	dialogAdd =jyDialog(dialogStruct);
	dialogAdd.open();
}
//新增页面的保存操作
function addFrom(){
	//序列化 新增页面的form表单数据
	var obj = dialogAdd.getIframe();
	var oneRefuseReason = obj.$("#dtooneRefuseReason").val();
	var twoRefuseReason = obj.$("#dtotwoRefuseReason").val();
	var v_content = obj.$("#dtooperateContent").val();
	var v_status = obj.$("#dtooperateStatus").val();
    var custDrop = obj.$("#reasonId").val();
	//进件状态 auditeState
	var v_auditeState = obj.$("#auditeState").val();
	var v_remark ;
	
	var params= obj.$("#addNewsFormData").serialize();
	//进件校验
	if(v_status == '5500'){
		if(oneRefuseReason == "" || twoRefuseReason ==""){
			$("").newMsg({}).show("请选择拒绝原因");
			return false;
		}
	}else if(v_status == '5600'){
		if(custDrop == "" || custDrop ==null){
			$("").newMsg({}).show("请选择放弃原因");
			return false;
		}
	}
	
	if(v_content == null || v_content ==""){
		$("").newMsg({}).show("请填写意见");
		return false;
	}
	
	if(v_status == '5500'){
		v_remark = "该操作会导致该客户90日内无法再次进件，您确定要执行吗？";
	}else{
		v_remark = "您确定要执行吗？";
	}
	jyDialog().confirm(v_remark, function(){
		var url = contextRootPath+'/lbtsigncontract/updateStateByID';
		jyAjax(url,params,function(msg){
			//新增成功后，
			$("").newMsg({}).show(msg.msg);
			
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		dialogAdd.close();
        		queryData();
        	}
		},"","",false);
	})
	
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


//退回操作
function returnOperationJs(returnData,returnState,newData,newState,auditeState){
	
	var v_ids=getIds("请选择待操作的数据！");
	if(!v_ids){
		return;
	}
	var objs=iframe.iframeObj["table"].getSelectedObjs();
	var intoAppId = objs[0].intoAppId;
	if(!judgeAntiToHumanDeal(intoAppId)){return};

	var dialogStruct={
			//'display':contextRootPath+'/lbtsigncontract/prepareExecute/retrunOperation?id='+v_ids+"&backData="+returnData+"&backName="+returnState+"&operateStatus="+newData+"&statusName="+newState,
			'display':contextRootPath+'/lbtsigncontract/prepareExecute/retrunOperation?id='+v_ids+"&backData="+returnData+"&backName="+returnState+"&operateStatus="+returnData+"&statusName="+newState+"&auditeState="+auditeState,
			'width':600,
			'height':300,
			/*'isIframe':"false",*/
			'title':'退回操作',
			'buttons':[
	         {'text':'保存','action':addIntoLogFrom,'isClose':false},
			 {'text':'关闭','isClose':true}
			]
		};
		
		dialogAdd =jyDialog(dialogStruct);
		dialogAdd.open();
	
}
//退回的操作保存相关的数据
function addIntoLogFrom(){
	var obj = dialogAdd.getIframe();
	var params= obj.$("#addNewsFormData").serialize();
	var url = contextRootPath+'/lbtsigncontract/operationReturnStateByID';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			$("").newMsg({}).show(msg.msg);
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		dialogAdd.close();
        		queryData();
        	}
  	});
}

//合同下载
function toDownLoad(){
	var v_ids=getIds("请选择要下载的数据！");
	// 获取所在行的对象
	var objs=iframe.iframeObj["table"].getSelectedObjs();
    var v_signState = objs[0].signState;
	if(!v_ids){
		return;
	}
	 var intoAppId = objs[0].intoAppId;
	if(!validateInfoDone(intoAppId)){return}
	var dialogStruct={
			'display':contextRootPath+'/lbtsigncontract/prepareExecute/downLoad?fkIntoAppId='+v_ids+'&signState='+v_signState,
			'width':800,
			'height':800,
			'title':'合同下载',
			'isIframe':'false',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
		};
	if(objs[0].contractShape == '1' && objs[0].isSignature != '1' && objs[0].isGeneratContract == '1') {
		dialogStruct={
				'display':contextRootPath+'/lbtsigncontract/prepareExecute/downLoad?fkIntoAppId='+v_ids+'&signState='+v_signState,
				'width':800,
				'height':800,
				'title':'合同下载',
				'isIframe':'false',
				'buttons':[
				 //{'text':'PC电子签章','action':signSealFrom('1'),'isClose':false},
				 {'text':'手机电子签章','action':signSealFrom('2'),'isClose':false},          
				 {'text':'关闭','isClose':true}
				]
			};
	}
	dialogAdd =jyDialog(dialogStruct);
	dialogAdd.open();
}

//签章操作
function signSealFrom(pcOrApp){
	return function(){
		var params= $("#addNewsFormData").serialize();
		var contractList = $("#contractList").val();
		//操作电子合同签章按钮时， 判断合同签章协议是否有值
		if(contractList==null||contractList==""||contractList=="[]"){
			$("").newMsg({}).show("合同签章协议不能为空，请核实！"); 
			return false;
		}
		params = params + '&pcOrApp=' + pcOrApp;
		var url = contextRootPath+'/lbtsigncontract/signSeal?type=0';
		if(pcOrApp == '1') {
			jyDialog().confirmSize(msg, 700, 800, function(){
				//通过ajax保存
				jyAjax(
					url,
					params,
					function(msg){
						//新增成功后，
						$("").newMsg({}).show(msg.msg);
						var v_status = msg.status;
			        	if(v_status.indexOf('ok') >-1){
			        		dialogAdd.close();
			        		queryData();
			        	}
					});
			});
		} else {
			jyAjax(
					url,
					params,
					function(msg){
						//新增成功后，
						$("").newMsg({}).show(msg.msg);
						var v_status = msg.status;
			        	if(v_status.indexOf('ok') >-1){
			        		dialogAdd.close();
			        		queryData();
			        	}
					});
		}
	};
}

//电子合同作废页面
function toDzhtCancelView(){
	var v_ids=getIds("请选择要下载的数据！");
	// 获取所在行的对象
	var objs=iframe.iframeObj["table"].getSelectedObjs();
    var v_signState = objs[0].signState;
	
	if(!v_ids){
		return;
	}
	 var intoAppId = objs[0].intoAppId;
	if(!validateInfoDone(intoAppId)){return}
	if(objs[0].contractShape != '1') {
		$("").newMsg({}).show('请选择电子合同！');
		return;
	}
//	if(objs[0].isSignature != '1') {
//		$("").newMsg({}).show('该电子合同还没完成签章，不能作废，可重新生成合同！');
//		return;
//	}
	var dialogStruct;
	
	jyAjax(
    		contextRootPath+"/lbtsigncontract/checkDzhtIsSignature?fkIntoAppId="+v_ids+"&signState="+v_signState,
			'',
			function(msg){
				if(msg.data == '1'){
					dialogStruct={
							'display':contextRootPath+'/lbtsigncontract/prepareExecute/cancel?fkIntoAppId='+v_ids+'&signState='+v_signState,
							'width':800,
							'height':800,
							'title':'电子合同作废',
							'isIframe':'false',
							'buttons':[
							      {'text':'PC作废','action':electronicContractCancel('1'),'isClose':false},
							      {'text':'手机作废','action':electronicContractCancel('2'),'isClose':false},          
							      {'text':'关闭','isClose':true}
							]
					};
					
					dialogAdd =jyDialog(dialogStruct);
					dialogAdd.open();
				}else{
					$("").newMsg({}).show('该电子合同还没完成签章，不能作废，可重新生成合同！');
					return false;
				}
    		}
    	);
}

//电子合同作废
function electronicContractCancel(pcOrApp){
	return function(){
		var params = $("#addNewsFormData").serialize();
		params = params + '&pcOrApp=' + pcOrApp;
		var contractList = $("#contractList").val();
		//操作电子合同作废按钮时， 判断合同作废协议是否有值
		if(contractList==null||contractList==""||contractList=="[]"){
			var errorMsg = $("#errorMsg").val();
			$("").newMsg({}).show(errorMsg); 
			return false;
		}
		var url = contextRootPath+'/lbtsigncontract/electronicContractCancel';
		if(pcOrApp == '1') {
			jyDialog().confirmSize(msg, 800, 800, function(){
				//通过ajax保存
				jyAjax(
					url,
					params,
					function(msg){
						//新增成功后，
						$("").newMsg({}).show(msg.msg);
						var v_status = msg.status;
			        	if(v_status.indexOf('ok') >-1){
			        		dialogAdd.close();
			        		queryData();
			        	}
					});
			});
		} else {
			jyAjax(
					url,
					params,
					function(msg){
						//新增成功后，
						$("").newMsg({}).show(msg.msg);
						var v_status = msg.status;
			        	if(v_status.indexOf('ok') >-1){
			        		dialogAdd.close();
			        		queryData();
			        	}
					});
		}
	}
}

//上传 合同扫描件
function uploadIntoAtta(){
var v_objs=getIds("请选择待上传附件的数据！");
//获取所在行的对象
var objs=iframe.iframeObj["table"].getSelectedObjs();
var v_signState = objs[0].signState;
if(!v_objs){
	return;
}
var intoAppId = objs[0].intoAppId;
if(!validateInfoDone(intoAppId)){return}
var v_ids=v_objs;//v_objs.id;
var url = contextRootPath+'/lbtsigncontract/isGenerateContract';
//通过ajax保存
jyAjax(
	url,
	'fkIntoAppId='+v_ids+'&signState='+v_signState,
	function(msg){
		var v_status = msg.status;
    	if(v_status.indexOf('faild') >-1)
    		$("").newMsg({}).show(msg.msg);
    	else {
    		
    		var title="上传扫描件";
    		var url=contextRootPath+'/lbtsigncontract/prepareExecute/uploadContractFile?fkIntoAppId='+v_ids+'&signState='+v_signState;
    		openTab(title,url);
    	}
	});
}

//查看进件的操作日志
function viewOperateLog(fkIntoAppId){
	var url = contextRootPath+'/lbtsigncontract/viewLog?intoAppId='+fkIntoAppId;
	window.open(url,'newwindow');
}

//查看明细
function viewData(vId,intoAppId){
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



function doSaveFrom(){
	var params1111=$("#addNewsFormData").serialize();
	var params=$(window.parent.document).find("[name='addDialogId']").contents().find("[id='addNewsFormData']").serialize();
	var url=contextRootPath+'/lbTReconsideration/insertLbTReconsideration';
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
        		$(window.parent.document).find("[name='addDialogId']")[0].contentWindow.closeWindow();
        		//queryData();
        	}
  	});
}

//自动发起客户复议时：校验客户复议次数 
function queryReconsiderNum(v_ids,proId){
	
	var url = contextRootPath+"/lbTReconsiderationConf/queryReconsiderNumInfo?intoId="+v_ids+"&proId="+proId;
	jyAjax(
			url,
			'',
			function(msg){
				
				$("#reconsiderNumId").val(msg.data);
	        	
	  	});
}

//页面字段的校验
function validate(){
	
	var v_dtoLoanPurpose = $("#dtoLoanPurpose").val();
	if(v_dtoLoanPurpose == null || v_dtoLoanPurpose ==""){
		//$("").newMsg({}).show("请选择借款用途");
		jyDialog().alert("请选择借款用途");
		return false;
	}
	
	var v_dtomanageStore = $("#dtomanageStore").val();
	
	if(v_dtomanageStore == null || v_dtomanageStore ==""){
		//$("").newMsg({}).show("请选择网点");
		return false;
	}
	
	var v_dtoapprAmount = $("#dtoapprAmount").val();
	if(v_dtoapprAmount == null || v_dtoapprAmount ==""){
		//$("").newMsg({}).show("请填写审批金额");
		return false;
	}
	
	var v_dtoapprPeriod = $("#dtoapprPeriod").val();
	if(v_dtoapprPeriod == null || v_dtoapprPeriod ==""){
		//$("").newMsg({}).show("请选择借款期限");
		return false;
	}
	
	var v_dtoplanLoansDate = $("#dtoplanLoansDate").val();
	if(v_dtoplanLoansDate == null || v_dtoplanLoansDate ==""){
		//$("").newMsg({}).show("请选择预约放款日期");
		return false;
	}
	
	var v_dtoreceiveBank = $("#dtoreceiveBank").val();
	if(v_dtoreceiveBank == null || v_dtoreceiveBank ==""){
		//$("").newMsg({}).show("请选择开户银行");
		return false;
	}
	
	var v_dtoreceiveSubBranchName = $("#dtoreceiveSubBranchName").val();
	if(v_dtoreceiveSubBranchName == null || v_dtoreceiveSubBranchName ==""){
		//$("").newMsg({}).show("请填写开户网点");
		return false;
	}
	
	
	var v_dtoreceiveBankAccount = $("#dtoreceiveBankAccount").val();
	if(v_dtoreceiveBankAccount == null || v_dtoreceiveBankAccount ==""){
		//$("").newMsg({}).show("请填写账号");
		return false;
	}
	var v_dtoloanBank = $("#dtoloanBank").val();
	if(v_dtoloanBank == null || v_dtoloanBank ==""){
		//$("").newMsg({}).show("请选择开户银行");
		return false;
	}
	
	var v_dtoloanSubBranchName = $("#dtoloanSubBranchName").val();
	if(v_dtoloanSubBranchName == null || v_dtoloanSubBranchName ==""){
		//$("").newMsg({}).show("请填写开户网点");
		return false;
	}
	
	var v_dtoloanBankAccount = $("#dtoloanBankAccount").val();
	if(v_dtoloanBankAccount == null || v_dtoloanBankAccount ==""){
		//$("").newMsg({}).show("请填写账号");
		return false;
	}
	return true;
}


//更换产品信息,从核心获取产品明细 (签约环节)
function changeProductInfoSign(type){
	var url = contextRootPath + '/lbTIntoAuditResult/getProductInfoByProductCode'; 
	var params="productCode="+$("#dtosignProductType").val()+"&type="+type+"&intoId="+$("#dtoid").val();
	var v_oldPeroidId = $("#oldPeroidId").val();
	//通过ajax保存
	jyAjax(url, params, function(msg) {
		if(msg.data){
			//总和费率
			//$("#dtocomprehensiveRate").val(msg.data.productInfoDTO.serviceRateProp.defaultValue);
          var proctYear=msg.data.productInfoDTO.loanPeriods;
          var payMethod=msg.data.productInfoDTO.repaymentWayList;
          $("#dtosignAmount").attr('minValue',msg.data.productInfoDTO.loanLimitProp.minValue);
          $("#dtosignAmount").attr('maxValue',msg.data.productInfoDTO.loanLimitProp.maxValue);
          //产品贷款金额范围 
          if(proctYear){//贷款期数
          	proctYear=proctYear.split(",");
          	$("#auditPeriodId").html('');
          	var selStr=['<select id="dtosignPeriod" name="signPeriod"  >'];
          	for(var i=0;i<proctYear.length;i++){
          		
          		selStr.push('<option value="'+proctYear[i]+'">'+proctYear[i]+'</option>')
          		
          	}
          	selStr.push("</select>");
          	$("#auditPeriodId").html(selStr.join());
          }
          if(payMethod){//还款方式
          	$("#apprPepaymentWay").html('');
          	var paystr=['<select id="dtoapprPepaymentWay" name="apprPepaymentWay"  >'];
          	for(var j=0;j<payMethod.length;j++){
          		paystr.push('<option value="'+payMethod[j].DICVALUE+'">'+payMethod[j].DICNAME+'</option>')
          	}
          	paystr.push("</select>");
          	$("#apprPepaymentWay").html(paystr.join());
          }
		}
	},"","",false);  
}

//初始化 贷款期限相关参数(签约环节)
function initialProductInfoSign(type){
	var url = contextRootPath + '/lbTIntoAuditResult/getProductInfoByProductCode'; 
	var params="productCode="+$("#dtosignProductType").val()+"&type="+type+"&intoId="+$("#dtoid").val();
	var v_oldPeroidId = $("#oldPeroidId").val();
	//通过ajax保存
	jyAjax(url, params, function(msg) {
		if(msg.data){
          var proctYear=msg.data.productInfoDTO.loanPeriods;
          var payMethod=msg.data.productInfoDTO.repaymentWayList;
          $("#dtosignAmount").attr('minValue',msg.data.productInfoDTO.loanLimitProp.minValue);
          $("#dtosignAmount").attr('maxValue',msg.data.productInfoDTO.loanLimitProp.maxValue);
          if(proctYear){
          	proctYear=proctYear.split(",");
          	$("#auditPeriodId").html('');
          	var selStr=['<select id="dtosignPeriod" name="signPeriod" >'];
          	for(var i=0;i<proctYear.length;i++){
          		if(proctYear[i] == v_oldPeroidId){
          			selStr.push('<option selected=selected value="'+proctYear[i]+'">'+proctYear[i]+'</option>')
          		}else{
          			selStr.push('<option value="'+proctYear[i]+'">'+proctYear[i]+'</option>')
          		}
          		
          	}
          	selStr.push("</select>");
          	$("#auditPeriodId").html(selStr.join());
          }
          if(payMethod){//还款方式
          	$("#apprPepaymentWay").html('');
          	var paystr=['<select id="dtoapprPepaymentWay" name="apprPepaymentWay"  >'];
          	for(var j=0;j<payMethod.length;j++){
          		paystr.push('<option value="'+payMethod[j].DICVALUE+'">'+payMethod[j].DICNAME+'</option>')
          	}
          	paystr.push("</select>");
          	$("#apprPepaymentWay").html(paystr.join());
          }
		}
	},"","",false);  
}

//判断审批金额是否在该产品的金额范围内
function getMoneyScopeSign(obj){
	
	var v_max = $("#"+obj).attr('maxValue');
	var v_min = $("#"+obj).attr('minValue');
	var v_money = $("#"+obj).val();
	var v_oldMoneyId = $("#oldMoneyId").val();
	var v_productTypeId = $("#oldproductTypeId").val();
	var v_stats = "";
	if(( v_money*1 < v_min*1) || (v_money*1 > v_max*1)){
		$("").newMsg({}).show("审批额度应在"+v_min+"和"+v_max+"范围内！");
		$("#"+obj).val('');
	}else if(v_money*1 > v_oldMoneyId*1){//修改后的审批金额大于原来的审批金额
		//$("").newMsg({}).show("审批额度应小于或等于"+v_oldMoneyId+"！");
		//$("#"+obj).val(v_oldMoneyId);
		v_stats = "1";
	}else if(v_money*1 < v_oldMoneyId*1){
		v_stats = "2";
	}
	
	var url = contextRootPath+'/lbTProductFlowConf/checkMoneyPeriod';
	//通过ajax保存
	jyAjax(
		url,
		'type=1'+'&product='+v_productTypeId+"&status="+v_stats,
		function(msg){
			var v_status = msg.status;
	    	if("no" == msg.data){
	    		$("#"+obj).val(v_oldMoneyId);
	    		$("").newMsg({}).show("金额调整,请发起复议!");
	    		return false;
	    	}
		});
}
//校验期限是否大于原贷款期限
function checkPeriod(obj){
	var v_newPeriod = $("#"+obj).val();
	var v_oldPeriod = $("#oldPeroidId").val();
	var v_productTypeId = $("#oldproductTypeId").val();
	var v_stats = "";
	//var proId  = $("#dtosignPeriod")[0].selectedIndex;
	//var newProName=$("#dtosignPeriod")[0].options[v_oldPeriod].text;
	if(v_newPeriod*1 > v_oldPeriod*1){//往大调整
		//$("").newMsg({}).show("借款期限应小于或等于"+v_oldPeriod+"！");
		//$("#"+obj).val(v_oldPeriod);
		v_stats = "1";
	}else if(v_newPeriod*1 < v_oldPeriod*1){
		v_stats = "2";
	}
	
	var url = contextRootPath+'/lbTProductFlowConf/checkMoneyPeriod';
	//通过ajax保存
	jyAjax(
		url,
		'type=2'+'&product='+v_productTypeId+"&status="+v_stats,
		function(msg){
			var v_status = msg.status;
	    	if("no" == msg.data){
	    		$("#"+obj).val(v_oldPeriod);
	    		$("").newMsg({}).show("期限调整,请发起复议!");
	    		return false;
	    	}
		});
}
//查看最新的审批结果意见
function viewAuditResult(v_ids){
	/*var v_ids=getIds("请选择待操作的数据！");
	if(!v_ids){
		return;
	}*/
	var dialogStruct={
			'display':contextRootPath+'/lbTReconsideration/prepareExecute/toViewAuditResult?intoId='+v_ids + "&isSign=true",
			'width':1100,
			'height':550,
			/*'isIframe':"false",*/
			'title':'审批意见',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
		};
		
		dialogAdd =jyDialog(dialogStruct);
		dialogAdd.open();
}


function audioVisual(){//录音录像
	//获取所在行的对象
	var v_objs=getIds("请选择录音录像数据！");
	var objs=iframe.iframeObj["table"].getSelectedObjs();
	var v_product = objs[0].signProductType;
	var v_videoAuditStatus = objs[0].videoAuditStatus;
	 var intoAppId = objs[0].intoAppId;
     if(!validateInfoDone(intoAppId)){return}
	var v_url = contextRootPath+'/lbtAudiovisualResult/checkProductType';
	//通过ajax保存
	jyAjax(
		v_url,
		'product='+v_product,
		function(msg){
			var v_status = msg.status;
	    	if('true' == msg.msg){
	    		$("").newMsg({}).show("房贷产品不需要录音录像！");
	    	}else {
	    		
	    		var v_signState = objs[0].signState;
	    		if(!v_objs){
	    			return;
	    		}
	    		var v_ids=v_objs;//v_objs.id;
	    		var url = contextRootPath+'/lbtsigncontract/isGenerateContract';
	    		//通过ajax保存
	    		jyAjax(
	    			url,
	    			'fkIntoAppId='+v_ids+'&signState='+v_signState,
	    			function(msg){
	    				var v_status = msg.status;
	    		    	if(v_status.indexOf('faild') >-1){
	    		    		$("").newMsg({}).show(msg.msg);
	    		    	}else {
	    		    		
	    		    		if(v_videoAuditStatus == "01" || v_videoAuditStatus =="02" || v_videoAuditStatus =="04" ||v_videoAuditStatus =="05"){
	    		    			jyDialog().confirm("已存在录制的签约录像，是否确定需要重新录制？确认后再进入录像页面！<br>提示：您可以点击查询按钮获取最新录像审核状态！", function(){
		    		    			saveAudioVisual(v_ids,v_signState);
		    				    });
	    		    		}else{
	    		    			saveAudioVisual(v_ids,v_signState);
	    		    		}
	    		    		
	    		    		
	    		    	}
	    			});
	    	}
		});
}
//已存在录制的签约录像，是否确定需要重新录制？确认后再进入录像页面



function  saveAudioVisual(id,signState){
	
	var url = contextRootPath+'/lbtsigncontract/assembleAudioVisualInfo';
	//通过ajax保存
	jyAjax(
		url,
		'id='+id+'&signState='+signState,
		function(msg){
			var v_status = msg.status;
	    	if(v_status.indexOf('faild') >-1){
	    		$("").newMsg({}).show(msg.msg);
	    	}else {
				var msgs = msg.msg;
				var param = msg.data;
				//var str=JSON.stringify(param);
				//window.open(encodeURI(encodeURI(url+str)));
				if(msgs != null ){
					$("").newMsg({}).show(msgs);
				}else{
					window.open(encodeURI(encodeURI(param)));
				}
				
	    	}
		});
	
}
/**
 * 签约用户签约用户是否被锁定
 */
function ckSignIsLimit(){
	var v_id = iframe.iframeObj["table"].getSelectedIds().join(",");
	if(!v_id){
		$("").newMsg({}).show("请选择待操作的数据！");
		return;
	}
	var objs=iframe.iframeObj["table"].getSelectedObjs();
	var intoAppId = objs[0].intoAppId;
	if(!judgeAntiToHumanDeal(intoAppId)){return};
	var url =contextRootPath+"/lbTSignLimit/ckUserSignLimit";
	jyAjax(
			url,
			'',
			function(msg){
				var v_status = msg.status;
				if(v_status.indexOf('ok') >-1){
					var data=msg.data;
					if(data=='1'){
						$("").newMsg({"waitTime":3000,"title":"操作提示"}).show("现在是限制时间,禁止操作");
						return false;
					}else if(data=='2'){
						signReason();
					}else{
						toUpdateMoney();
					}
				}
			});
}
/**
 * 填写签约原因
 * @param vId
 */
var signdialogView;
function signReason(){
	var dialogStruct={
			'display':contextRootPath+'/lbTSignLimit/prepareExecute/toView',
			'width':600,
			'height':400,
			'title':'签约原因',
			'buttons':[
 			           {'text':'保存','action':signReasonFrom,'isClose':false},
 			           {'text':'关闭','isClose':true}
 			]
	};
		
	 signdialogView = jyDialog(dialogStruct);
	 signdialogView.open();
}
/**
 * 签约原因点击保存
 */
function signReasonFrom(){
	 var obj = signdialogView.getIframe();
	 if(!obj.ckData()){
		 return;
	 }
	var v_id = iframe.iframeObj["table"].getSelectedIds().join(",");
	var signReason = obj.signReason.value;
	var signReasonDetail = obj.signReasonDetail.value;
	jyDialog({"type":"question"}).confirm("您确认要提交吗?",function(){
				var url =contextRootPath+"/lbTIntoInfo/editLbTCustomterInfo?id="+v_id+"&signReason="+signReason+"&signReasonDetail="+signReasonDetail;
				jyAjax(
						url,
						'',
						function(msg){
							var v_status = msg.status;
							if(v_status.indexOf('ok') >-1){
								signdialogView.close();
									toUpdateMoney();
							}
						});
		},"确认提示");
}
/**
 * 调用主数据接口,查询合同金额(只用于信贷产品)
 */
function getEsbContractSignMoney(v_meg){
		var productType=$("#oldproductTypeId").val();//产品类型
		if(!productType){
			v_meg="产品类型不能为空";
		}
		var auditAmount=$("#dtosignAmount").val().replace(",","");//审批额度 
		if(!auditAmount || auditAmount==""){
			v_meg="请输入审批额度";
		}
		var loanPeriod=$("#dtosignPeriod").val();//贷款期限
		if(!loanPeriod){
			v_meg="请选择贷款期限";
		}
		var apprPepaymentWay=$("#dtoapprPepaymentWay").val();
		if(!apprPepaymentWay){
			v_meg="请选择还款方式";
		}
		if(v_meg){
			return v_meg;
		}
		var url = contextRootPath + '/lbTIntoAuditResult/queryEsbContractSignMoney?intoAppId='+$("#dtoid").val()+'&auditAmount='+auditAmount+'&loanPeriod='+loanPeriod+'&apprPepaymentWay='+apprPepaymentWay+'&productType='+productType+'&comprehensiveRate=0'; 
		//通过ajax保存
		jyAjax(url,"",function(msg){
			var v_status = msg.status;
			var msgInfo=msg.msg;
			if(v_status.indexOf('ok') >-1){
				if(msgInfo=='creditLoan'){
					var signMoney=msg.data;
					if(parseFloat(signMoney)>parseFloat(200000)){
						$("label[id='numtochmoney']").attr("style","color:red");
						$("label[id='numtochmoney']").html("审批额度的合同金额超过20万");
						v_meg="该客户贷款的合同金额超过20万!";
						return v_meg;
					}else{
						$("label[id='numtochmoney']").attr("style","");
						$("label[id='numtochmoney']").html("");
						v_meg="1";//通过
					}
				}else if(msgInfo=='mortgageLoan'){//抵押贷
					v_meg="1";//通过
				}else{
					v_meg=msgInfo;
				}
			}else{
				v_meg=msgInfo;
			}
		},"","",false);
	return v_meg;
}
function viewBackReason(e){
	var dialogStruct={
			'display':contextRootPath+'/lbTConBackReasonInfo/prepareExecute/toQueryPage?intoId='+e,
			'width':1100,
			'height':550,
			'title':'退回原因',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
		};
		dialogAdd =jyDialog(dialogStruct);
		dialogAdd.open();
	}

//验证业务是否已被处理
function validateInfoDone(intoId){
	var v_boolean = false;
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



//验证业务是否已被处理
function checkIsOpenByIntoId(intoId, checkType){
	var v_boolean = false;
	var url= contextRootPath+'/coreCustodyOnSignContract/checkIsOpenByIntoId';
	var param = "intoId="+ intoId + "&checkType=" + checkType;
	jyAjax(url,param,function(msg){
		var status = msg.data;
		if(status.indexOf('yes') >-1){
			v_boolean = true;
		}else if(status.indexOf('noButPass') >-1){
			var msg = msg.msg;
			$("").newMsg({}).show(msg);
			v_boolean = true;
		}else{
			var msg = msg.msg;
			$("").newMsg({}).show(msg);
			v_boolean = false; 
		}
	},"","",false);
	return v_boolean;
}
/**
 * 打开 开立存管账户信息录入 页面
 * @param vId
 */
var custodyDialogAddObj;
function toOpenAccount(intoId){
	var dialogStruct={
			'display':contextRootPath+'/coreCustodyOnSignContract/prepareExecute/toOpenAccountPage?intoId='+intoId,
			'width':860,
			'height':560,
			'title':'开户',
			'buttons':[
			]
		};
	custodyDialogAddObj=jyDialog(dialogStruct);
	custodyDialogAddObj.open();
}

//开户后绑卡
function toTieOnCard(intoId){
	var dialogStruct={
			'display':contextRootPath+'/coreCustodyOnSignContract/prepareExecute/toTieOnCardPage?intoId='+intoId,
			'width':860,
			'height':560,
			'title':'绑卡',
			'buttons':[
			]
		};
	custodyDialogAddObj=jyDialog(dialogStruct);
	custodyDialogAddObj.open();
}