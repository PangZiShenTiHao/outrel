var dialogAdd;
var cModify;
//生成合同（修改贷款额度、贷款期限）
function toUpdateMoney(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则进行提醒
	if(v_ids == ""){
		$("").newMsg({}).show("请选择待操作的数据！");
		return;
	}
	// 获取所在行的对象
	var objs=iframe.iframeObj["table"].getSelectedObjs();
	
    var v_cardId = objs[0].cardId;
    var v_custName = objs[0].custName;
    var v_rollState = objs[0].rollState;
    if(v_rollState != "509" && "502" != v_rollState){
    	$("").newMsg({}).show("费用扣划未完成或者扣划失败不能生成合同，请先进行费用扣划。");
		return;
    }
    
	var dialogStruct={
			'display':contextRootPath+'/lbtsigncontract/prepareExecute/toUpdateHouseRollLoan?id='+v_ids+"&carId="+v_cardId+"&custName="+encodeURI(v_custName),
			'width':800,
			'height':650,
			'title':'合同签约信息确认',
			'isIframe':'false',
			'buttons':[
             {'text':'保存','action':checkContractShape,'isClose':false},
			 {'text':'关闭','isClose':true}
			]
		};

	dialogAdd =jyDialog(dialogStruct);
	dialogAdd.open();
	
}

function checkContractShape(){
	var params = $("#updateNewsFormData").serialize();
	var v_contractShape = $("#dtocontractShape","#updateNewsFormData").val();
    var url = contextRootPath+'/lbtsigncontract/checkLoanContractSignState';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			var v_status = msg.status;
			var dialogStruct ;
			if(v_status.indexOf('ok') >-1 && msg.data.isSignature == "1") {
				$("").newMsg({}).show("当前电子合同已签章，需先作废原合同！");
				return false;
			} else {
	        	if(v_status.indexOf('ok') >-1 && "1" == msg.data.contractShape && "0" == v_contractShape){
				    jyDialog().confirm("当前为电子合同，请确认是否更改合同生成形式？", function(){
				    	updateMoney();
				    });
	        	}else if(v_status.indexOf('ok') >-1 && "0" == msg.data.contractShape && "1" == v_contractShape){
	        		jyDialog().confirm("当前为纸质合同，请确认是否更改合同生成形式？", function(){
				    	updateMoney();
				    });
	        	}else{
	        		updateMoney();
	        	}
			}
	});
	
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
	var v_id = $("#dtoid").val();
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

		var v_remaker="" ;
		//贷款金额 或贷款期限 向上调整 弹出 确认框
		if((v_oldMoney*1 < v_newMoney*1) ){

			$("").newMsg({}).show("审批金额不能大于"+v_oldMoney+"!");
				return;
			}else if((v_oldPeroid*1 < v_newPeroid*1)){
			
			$("").newMsg({}).show("借款期限不能大于"+v_oldPeroid+"!");
				return;
		}else{
			$("#resultId").val('NO');
			saveUpdateData(v_remaker,v_cusName,v_carId,v_newMoney,v_newPeroid,v_id,v_loanDate,v_oldProId,v_repaymentWay);
		}
	}else{
		$("").newMsg({}).show("请选择或输入合法的内容！");
		return;
	}
}

// 保存 相关的update 数据
function saveUpdateData (v_remaker,v_cusName,v_carId,v_newMoney,newPeroid,v_id,loanDate,newProId,v_repaymentWay){
	
	//栏位的相关数据
	var v_param = "";
	var params = $("#updateNewsFormData").serialize()+ "&columuModifyStr=" + cModify.getModifyJsonStr()+v_param;
	var url=contextRootPath+'/lbtsigncontract/updateMoneyOrPeroidForHouseRollLoan';
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


//展期申请状态的修改
function operatorUpdateState(id,state,stateName,isGener){
	
	var dialogStruct={
		'display':contextRootPath+'/lbtsigncontract/prepareExecute/toAddRefuseRoll?id='+id+"&statusName="+stateName+"&operateStatus="+state+"&isGener="+isGener,
		'width':600,
		'height':300,
		'title':stateName,
		'buttons':[
         {'text':'保存','action':addFrom,'isClose':false},
		 {'text':'关闭','isClose':true}
		]
	};
	
	
	var url=contextRootPath+'/lbtsigncontract/isExpenseDeduction?rollAppId='+id;
	jyAjax(
    		url,
    		"",
    		function(msg){
    			var v_status = msg.status;
            	if(v_status.indexOf('ok') >-1){
            		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
            		dialogAdd =jyDialog(dialogStruct);
            		dialogAdd.open();
            	}else{
            		$("").newMsg({}).show("改展期业务已进行费用划扣操作，不能"+stateName);
            	}
      	});
}
//新增页面的保存操作
function addFrom(){
	//序列化 新增页面的form表单数据
	var obj = dialogAdd.getIframe();
	var v_dtoreason = obj.$("#reasonId").val();
	var v_content = obj.$("#dtooperateContent").val();
	
	var params= obj.$("#addNewsFormData").serialize()+"&dtoreason="+v_dtoreason;
	//进件校验
	if(v_dtoreason == null || v_dtoreason ==""){
		$("").newMsg({}).show("请选择拒绝原因");
		return false;
	}
	if(v_content == null || v_content ==""){
		$("").newMsg({}).show("请填写意见");
		return false;
	}
	
	var url = contextRootPath+'/lbtsigncontract/updateRollStateByID';
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

//获取选中行的对象
function getObjs(alertMsg){
	var v_objs=iframe.iframeObj["table"].getSelectedObjs();
	//如果没有选中 数据则
	if(v_objs.length == 0){
		$("").newMsg({}).show(alertMsg);
		return;
	}
	//如果选择多个 择提示
	if(v_objs.length > 1){
		$("").newMsg({}).show("请选择一条数据！");
		return;
	}
	return v_objs[0];
}

//退回操作
function returnOperation(returnData,returnState,newData,newState){
	
	var v_ids=getIds("请选择待操作的数据！");
	if(!v_ids){
		return;
	}
	
	var dialogStruct={
			//'display':contextRootPath+'/lbtsigncontract/prepareExecute/retrunOperation?id='+v_ids+"&backData="+returnData+"&backName="+returnState+"&operateStatus="+newData+"&statusName="+newState,
			'display':contextRootPath+'/lbtsigncontract/prepareExecute/retrunOperation?id='+v_ids+"&backData="+returnData+"&backName="+returnState+"&operateStatus="+returnData+"&statusName="+newState,
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
	if(!v_ids){
		return;
	}
	var objs=iframe.iframeObj["table"].getSelectedObjs();
	var rollAppNo = objs[0].rollAppNo ;
	
	var url = contextRootPath+'/lbtsigncontract/checkLoanContractSignState?rollAppNo='+rollAppNo;
	//通过ajax保存
	jyAjax(
		url,
		"",
		function(msg){
			//新增成功后，
			var v_status = msg.status;
			var dialogStruct ;
        	if(v_status.indexOf('ok') >-1 && "1" == msg.data.contractShape && "0" == msg.data.isSignature){
        		dialogStruct={
        				'display':contextRootPath+'/lbtsigncontract/prepareExecute/downLoadForRollLoan?rollAppId='+v_ids,
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
        	}else{
        		dialogStruct={
        				'display':contextRootPath+'/lbtsigncontract/prepareExecute/downLoadForRollLoan?rollAppId='+v_ids,
        				'width':800,
        				'height':800,
        				'title':'合同下载',
        				'isIframe':'false',
        				'buttons':[
        				 {'text':'关闭','isClose':true}
        				]
        			};
        	}
			dialogAdd =jyDialog(dialogStruct);
    		dialogAdd.open();
  	});
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
		var url = contextRootPath+'/lbtsigncontract/signSeal?type=1';
		//通过ajax保存
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
	}
}

//电子合同作废页面
function toDzhtCancelView(){
	var v_ids=getIds("请选择要作废的数据！");
	// 获取所在行的对象
	var objs=iframe.iframeObj["table"].getSelectedObjs();
	var rollAppNo = objs[0].rollAppNo;
	
	var url = contextRootPath+'/lbtsigncontract/checkLoanContractSignState?rollAppNo='+rollAppNo;
	//通过ajax保存
	jyAjax(
			url,
			'',
			function(msg){
				//新增成功后，
				var v_status = msg.status;
				var dialogStruct ;
	        	if(v_status.indexOf('ok') >-1 && "1" == msg.data.contractShape ){
	        		if("1" != msg.data.isSignature){
	        			$("").newMsg({}).show('该电子合同还没完成签章，不能作废，可重新生成合同！');
	        			return;
	        		}
	        		dialogStruct={
	        				'display':contextRootPath+'/lbtsigncontract/prepareExecute/cancel?rollAppId='+v_ids+'&isRollType=1',
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
	        	}else if(v_status.indexOf('ok') >-1 && "0" == msg.data.contractShape ){
	        		$("").newMsg({}).show('当前为纸质合同，不能作废！');
	    			return;
	        	}
		});
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
if(!v_objs){
	return;
}
var v_ids=v_objs;//v_objs.id;
var url = contextRootPath+'/lbtsigncontract/isGenerateContractForRollLoan';
//通过ajax保存
jyAjax(
	url,
	'rollAppId='+v_ids,
	function(msg){
		var v_status = msg.status;
    	if(v_status.indexOf('faild') >-1)
    		$("").newMsg({}).show(msg.msg);
    	else {
    		var title="上传扫描件";
    		var url=contextRootPath+'/lbtsigncontract/prepareExecute/uploadContractFileForRollLoan?rollAppId='+v_ids;
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
//费用扣划
function toExpenseDeduction(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则进行提醒
	if(v_ids == ""){
		$("").newMsg({}).show("请选择待操作的数据！");
		return;
	}
	// 获取所在行的对象
	var objs=iframe.iframeObj["table"].getSelectedObjs();
	
    var v_cardId = objs[0].cardId;
    var v_custName = objs[0].custName;
    var v_rollState = objs[0].rollState;
    //增加费用划扣校验
    var url=contextRootPath+'/lbtsigncontract/isExpenseDeduction?rollAppId='+v_ids;
	var dialogStruct={
			'display':contextRootPath+'/lbtsigncontract/prepareExecute/toExpenseHouseDeduction?id='+v_ids ,
			'width':800,
			'height':650,
			'title':'展期费用扣划信息确认',
			'isIframe':'false',
			'buttons':[
             {'text':'保存','action':expenseDeduction,'isClose':false},
			 {'text':'关闭','isClose':true}
			]
		};
	jyAjax(
    		url,
    		"",
    		function(msg){
    			var v_status = msg.status;
            	if(v_status.indexOf('ok') >-1){
            		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
            		dialogAdd =jyDialog(dialogStruct);
            		dialogAdd.open();
            	}else{
            		$("").newMsg({}).show(msg.msg);
            	}
      	});
	
}
function expenseDeduction(){
	//栏位的相关数据
	var v_param = "";
	var params = $("#updateNewsFormData").serialize() +v_param;
	var url=contextRootPath+'/lbtsigncontract/expenseHouseDeduction';
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
	
	if(( v_money*1 < v_min*1) || (v_money*1 > v_max*1)){
		$("").newMsg({}).show("审批额度应在"+v_min+"和"+v_max+"范围内！");
		$("#"+obj).val('');
	}else if(v_money*1 > v_oldMoneyId*1){//修改后的审批金额大于原来的审批金额
		$("").newMsg({}).show("审批额度应小于或等于"+v_oldMoneyId+"！");
		$("#"+obj).val(v_oldMoneyId);
	}
}
//校验期限是否大于原贷款期限
function checkPeriod(obj){
	var v_newPeriod = $("#"+obj).val();
	var v_oldPeriod = $("#oldPeroidId").val();
	
	//var proId  = $("#dtosignPeriod")[0].selectedIndex;
	//var newProName=$("#dtosignPeriod")[0].options[v_oldPeriod].text;
	if(v_newPeriod*1 > v_oldPeriod*1){
		$("").newMsg({}).show("借款期限应小于或等于"+v_oldPeriod+"！");
		$("#"+obj).val(v_oldPeriod);
	}
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
//查看最新的审批结果意见
function viewAuditResult(v_ids){
	/*var v_ids=getIds("请选择待操作的数据！");
	if(!v_ids){
		return;
	}*/
	var dialogStruct={
			'display':contextRootPath+'/lbTReconsideration/prepareExecute/toViewAuditResultForRollLoan?intoId='+v_ids,
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
