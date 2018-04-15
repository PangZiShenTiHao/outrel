//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogUpdate,threePage,coreDeductedPage;
var addDlg1;//添加第一个界面：查询贷前
var addDlg2;//添加第二个界面：添加详情

function toAddData(){
	var dialogStruct={
			'display':contextRootPath+'/aftloanqueryDate/prepareExecute/toQueryBefloanForLoanInfo?function=advFinish',
			'width':1100,
			'height':750,
			'title':'查询贷款信息',
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
	var selectIds = addDlg1.getIframe().getSelectedIds().join(",");
	//如果没有选中 数据则
	if(selectIds == ""){
		jyDialog({"type":"warn"}).alert("请先选择一条数据！");
		return;
	}
	//如果选择多个 择提示
	if(selectIds.indexOf(",") > -1){
		jyDialog({"type":"warn"}).alert("只能选择一条数据！");
		return;
	}
	var claimKind = addDlg1.getIframe().getClaimKind();
	var selectObj = addDlg1.getIframe().getSelectedObjs();
    var contractSrc=addDlg1.getIframe().getSelectedContractSrc();
	//判断合同来源是否有特殊不可新增操作的
	var  url = contextRootPath+"/LaTContractConfigure/queryByserial?typeSerial=02&conSerial="+contractSrc;
	var falg = false;
	$.ajax({
		type:"POST",
		url:url,
		async:false,
		success:function(msg){
			if(msg.indexOf('ok') >-1){
				falg=false;
			}else{
				falg=true;
			}
		}
	});
	
	if(falg){
		 jyDialog({"type":"warn"}).alert("该放款机构不可提前结清！");
		 return ; 
	}
	
	
	//关闭查询界面
	addDlg1.close();
	//打开新增界面
	var url=contextRootPath+'/laTAdvfinished/prepareExecute/toAddNext?'+selectObj+'&claimKind='+claimKind;
	var dialogStruct={
			'display':url,
			'width':1100,
			'height':750,
			'title':'新增提前结清信息',
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


//页面录入的减免金额与核心返回的金额比较
function checkMax(value,element){
	var hiddenId;
	var hiddenValue;
	if (addDlg2&&addDlg2.iframe.contentDocument) {
		hiddenId=$(element).attr("extendId");
		hiddenValue=$(addDlg2.iframe.contentDocument.getElementById(hiddenId)).val();
	} else {
		hiddenId=$(element).attr("extendId");
		hiddenValue=$("#"+hiddenId).val();
	}
	if(undefined!=hiddenValue&&(hiddenValue+"").length<1){
		hiddenValue=0;
	}
	 if(Number(value)>Number(hiddenValue)){
		return hiddenValue;
	 }
	 return -1;
} 


//动态计算减免金额合计、结清金额
function addSerAmount(){
		//减免合计
		var addObjs=["dtoredcreditCost","dtoredinfoCost","dtoredconsCost","dtoredPenalty","dtoredpunInterest"];
		var totalValue=sumObjs(addObjs);
		if (addDlg2&&addDlg2.iframe.contentDocument) {
			$(addDlg2.iframe.contentDocument.getElementById("dtoappRedAmount")).val(totalValue ); 
		} else {
			$("#dtoappRedAmount").val(totalValue ); 
		}
		//计算提前结清金额
		var listAmount = getSettleAmt(totalValue);
		if(Number(listAmount) <= 0){// 提前还款金额<=0
			if (addDlg2&&addDlg2.iframe.contentDocument) {
				$(addDlg2.iframe.contentDocument.getElementById("dtolistAmount")).val(0);
				$(addDlg2.iframe.contentDocument.getElementById("dtolistAmountText")).val(0);
			} else {
				$("#dtolistAmount").val(0);
				$("#dtolistAmountText").val(0);
			}
		}else{// 提前还款金额保留2位小数
			if (addDlg2&&addDlg2.iframe.contentDocument) {
				$(addDlg2.iframe.contentDocument.getElementById("dtolistAmount")).val(listAmount );
				$(addDlg2.iframe.contentDocument.getElementById("dtolistAmountText")).val(listAmount );
			} else {
				$("#dtolistAmount").val(listAmount );
				$("#dtolistAmountText").val(listAmount );
			}
		}
}


//动态计算减免金额合计
function redSumAmount(){
	//减免合计
	var addObjs=["dtoredcreditCost","dtoredinfoCost","dtoredconsCost","dtoredPenalty","dtoredpunInterest"];
	var totalValue=sumObjs(addObjs);
	if (addDlg2&&addDlg2.iframe.contentDocument) {
		$(addDlg2.iframe.contentDocument.getElementById("dtoappRedAmount")).val(totalValue ); 
	} else {
		$("#dtoappRedAmount").val(totalValue ); 
	}
}

//减免合计=0审批页面减免值不能编辑
function checkAllRedSumAmount(){
	//减免合计
	var addObjs=["dtoredcreditCost","dtoredinfoCost","dtoredconsCost","dtoredPenalty","dtoredpunInterest","dtoredNorBase","dtoredNorNowBase","dtoredOverBase","dtoredNorInst","dtoredNorNowInst","dtoredOverInst"];
	var totalValue=sumObjs(addObjs);
	if(parseFloat(totalValue)==0){
		for ( var i=0;i<addObjs.length;i++) {
			$("#"+addObjs[i]).attr("disabled", true);
		}
	}
}

/**
 * 加法
 * @param feeObjs
 * @returns {Number}
 */
function sumObjs(feeObjs) {
	var patrn=/^(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/;
	var totalFee=0;
	for(var i=0;i<feeObjs.length;i++){
		var obj;
		if (addDlg2&&addDlg2.iframe.contentDocument) {
			obj=$(addDlg2.iframe.contentDocument.getElementById(feeObjs[i]));
		} else {
			obj=$("#"+feeObjs[i]);
		}
		var feeVal = obj.val();
		if(feeVal&&patrn.test(feeVal) ){
			totalFee+=Number(feeVal);
		}
	}
	return totalFee.toFixed(2);
}

/**
 * 服务费总和-合同减免金额
 * @param totalFee 三项服务费之和
 * @returns
 */
function diffRelief(totalFee) {
	var fee = 0;
	//合同减免费用金额
	var dtoredinfoCost;
	if (addDlg2&&addDlg2.iframe.contentDocument) {
		dtoredinfoCost=$(addDlg2.iframe.contentDocument.getElementById("dtoredinfoCost"));
	} else {
		dtoredinfoCost=$("#dtoredinfoCost");
	}
	//服务费总和-合同减免金额
	if (dtoredinfoCost.val() != "" && dtoredinfoCost.val() != undefined && dtoredinfoCost.val() != 0) {
		fee = Number(totalFee) - Number(dtoredinfoCost.val());
		if(fee<0){
			fee=0;
		}
	} else {
		fee = Number(totalFee);
	}
	return fee.toFixed(2);
}


function checkAmount(element){
	var error="输入金额格式不对,请输入最多两位小数的正数";
	var error1="最终收回金额小于发放金额，不允许操作";
	var error2="政策性减免金额必须小于等于政策性服务费与合同减免差额";
	var error3="请优先录入政策性减免金额再录入特殊减免金额";
	//var error4="特殊减免金额必须小于等于拖欠的本息（逾期本息+当期本息+未来期本）-合同减免金额-政策性减免金额";
	var value=element.value;
	value=value.trim();
	element.value=value;
	if((value+"").length<1){
		return;
	}
	var patrn=/^(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/;
	if(patrn.test(value)){
		if ($(element).attr("extendId") == "dtopunInterest" //罚息
			|| $(element).attr("extendId") == "dtopenalty" ) {//违约金
			// 比较初始值
			var hiddenValue=checkMax(value,element);
			if(hiddenValue>-1){
				 return $(element).attr("extendTitle")+"[<font color='red'>&nbsp;"+hiddenValue+"&nbsp;</font>]";
			}
		} else if ($(element).attr("extendId") == "dtocreditCost" ) {//政策性减免费用金额限制 
			//比较三项服务费减去合同减免金额
			var feeObjs=["dtoinfoCost","dtocreditCost","dtoconsCost"];
			var totalFee=sumObjs(feeObjs);
			totalFee = diffRelief(totalFee); 
			//比较三项服务费减去合同减免金额
		    if(Number(value)>Number(totalFee)){
				 return error2+"[<font color='red'>&nbsp;"+totalFee+"&nbsp;</font>]";;
			}
		} else if ($(element).attr("id") == "dtoredconsCost" ) {//特殊减免
			//政策性减免优先输入
			//政策性减免金额限制
			var feeObjs=["dtoinfoCost","dtocreditCost","dtoconsCost"];
			var totalFee=sumObjs(feeObjs);
			totalFee = diffRelief(totalFee); 
			//政策性减免金额 
			var lawRelief="";
			if (addDlg2&&addDlg2.iframe.contentDocument) {
				lawRelief=$(addDlg2.iframe.contentDocument.getElementById("dtoredcreditCost")).val();
			} else {
				lawRelief=$("#dtoredcreditCost").val();
			}
			//政策性服务费总额 大于0的情况，并且政策性减免金额 没有输入
			if (totalFee > 0 && (lawRelief == "" || lawRelief == 0 
						|| lawRelief == undefined || lawRelief == "undefined" 
						|| lawRelief == null || lawRelief == "null")) {
				return error3;
			}
			//逾期本息+当期本息+未来期本
			var specialFeeObjs=["dtodeductNorBase","dtodeductNorNowBase","dtodeductOverBase","dtodeductNorNowInst","dtodeductOverInst"];
			var specialTotalFee=sumObjs(specialFeeObjs);
			//合同减免金额+政策性减免金额
			var sFeeObjs=["dtoredinfoCost","diffFeeTextValue"];
			var sTotalFee=sumObjs(sFeeObjs);
			
			var feeObjs1=["dtoredconsCost"];
			var dtoredconsCostValue=sumObjs(feeObjs1);
			//alert("特殊减免上限金额："+(specialTotalFee-sTotalFee));
			if(dtoredconsCostValue>(specialTotalFee - sTotalFee)){
				return "特殊减免不能超过可减免上限金额【"+(specialTotalFee - sTotalFee).toFixed(2)+"】";
			}
			
		}
	}else{
		return error;
	}
	
	
	//验证减免金额是否输入，如果没输入则不进行校验
	var reliefObjs=["dtoredcreditCost", "dtoredconsCost","dtoredPenalty","dtoredpunInterest"];
	var reliefValue= sumObjs(reliefObjs);
	if (reliefValue == 0) {
		return;
	}
	
	//减免额度要保本
	//计算减免总金额
	var addObjs=["dtoredcreditCost","dtoredinfoCost","dtoredconsCost","dtoredPenalty","dtoredpunInterest"];
	var totalValue=sumObjs(addObjs);
	//提前结清金额+已还金额+挂账+冻结<放款金额
	if (checkOverMax(totalValue)) {
		return error1;
	}
}

/**
 * 减免金额是否过大导致不保本
 * @param totalValue
 * @returns {Boolean}
 */
function checkOverMax(totalValue) {
	var dtoprovideAmount;//贷款发放金额
	var dtoYhje;//已还金额
	var losAmount;//挂账
	var freezeBal;//冻结
	if (addDlg2&&addDlg2.iframe.contentDocument) {
		dtoprovideAmount=$(addDlg2.iframe.contentDocument.getElementById("dtoprovideAmount")).val();
		dtoYhje=$(addDlg2.iframe.contentDocument.getElementById("dtoyhje")).val();
		losAmount=$(addDlg2.iframe.contentDocument.getElementById("dtolosAmount")).val();
		freezeBal=$(addDlg2.iframe.contentDocument.getElementById("dtofreezeBal")).val();
	} else {
		dtoprovideAmount =  document.getElementById("dtoprovideAmount").value;//贷款发放金额
		dtoYhje = document.getElementById("dtoyhje").value;//已还金额
		losAmount = document.getElementById("dtolosAmount").value;//挂账
		freezeBal = document.getElementById("dtofreezeBal").value;//挂账
	}
	//提前结清金额
	var listAmount=getSettleAmt(totalValue);
	//提前结清金额+已还金额+挂账+冻结<放款金额
	if (Number(listAmount) + Number(dtoYhje) + Number(losAmount) + Number(freezeBal)< Number(dtoprovideAmount)) {
		return true;
	}
	return false;
}

/**
 * 提前结清金额
 * @returns {Number}
 */
function getSettleAmt(reliefValue) {
	var dtototalDebtAmount;//欠款总额
	var dtoprovideAmount;//贷款发放金额
	var dtodeductNorInst;//剩余正常利息
	var losAmount;//挂账
	var freezeBal;//冻结金额
	var curNorPark;//当期停车费
	var remainNorPark;//剩余正常停车费
	var dtocreditBalance;//剩余正常停车费
	if (addDlg2&&addDlg2.iframe.contentDocument) {
		dtototalDebtAmount=$(addDlg2.iframe.contentDocument.getElementById("dtototaldebtAmount")).val();
		dtoprovideAmount=$(addDlg2.iframe.contentDocument.getElementById("dtoprovideAmount")).val();
		dtodeductNorInst=$(addDlg2.iframe.contentDocument.getElementById("dtodeductNorInst")).val();
		losAmount=$(addDlg2.iframe.contentDocument.getElementById("dtolosAmount")).val();
		freezeBal=$(addDlg2.iframe.contentDocument.getElementById("dtofreezeBal")).val();
		curNorPark = $(addDlg2.iframe.contentDocument.getElementById("curNorPark")).val();//当期停车费
		remainNorPark = $(addDlg2.iframe.contentDocument.getElementById("remainNorPark")).val();//剩余正常停车费
		dtocreditBalance = $(addDlg2.iframe.contentDocument.getElementById("dtocreditBalance")).val();//保证金金额
	} else {
		dtototalDebtAmount = document.getElementById("dtototaldebtAmount").value;//欠款总额
		dtoprovideAmount =  document.getElementById("dtoprovideAmount").value;//贷款发放金额
		dtodeductNorInst = document.getElementById("dtodeductNorInst").value;//剩余正常利息
		losAmount = document.getElementById("dtolosAmount").value;//挂账
		freezeBal=document.getElementById("dtofreezeBal").value;//冻结
		curNorPark = document.getElementById("curNorPark").value;//当期停车费
		remainNorPark = document.getElementById("remainNorPark").value;//剩余正常停车费
		dtocreditBalance = document.getElementById("dtocreditBalance").value;//保证金金额
	}
	//提前结清金额=欠款总额-减免总金额-挂帐金额-剩余正常利息
	var listAmount = Number(dtototalDebtAmount) //欠款总额
					- Number(reliefValue) //减免总金额
					- Number(losAmount)//挂账
					- Number(freezeBal)//冻结
					-Number(dtodeductNorInst)//剩余正常利息
					-Number(curNorPark)//当期停车费
					-Number(remainNorPark)//剩余正常停车费
					-Number(dtocreditBalance)//保证金金额
					;
	return listAmount.toFixed(2);
}

/**
 * 验证前日期大于等于贷款到期日
 */
function checkEndDate(){
	var flag = false;
//	var date = $(addDlg2.iframe.contentDocument.getElementById("dtoregDate")).val();
//	var endDate = $(addDlg2.iframe.contentDocument.getElementById("dtoendDate")).val();
	var curr = $(addDlg2.iframe.contentDocument.getElementById("dtoloanCurrentPeriod")).val();
	var total = $(addDlg2.iframe.contentDocument.getElementById("dtototalTerm")).val();
//	var status = $(addDlg2.iframe.contentDocument.getElementById("dtoloanStatus")).val();
//	var tdate = new Date(date).getTime();
//	var edate = new Date(endDate).getTime();
	if(curr == total ){
		flag =true;
	}
	return flag;
}

function doAddFrom(){
	/* delete by liuyu at 170524 该放款机构理财人-华瑞放款可做提前结清
	var dtocontractSource=$(addDlg2.iframe.contentDocument.getElementById("dtocontractSource")).val();
	
	if(dtocontractSource == "01"){
		 jyDialog({"type":"warn"}).alert("该放款机构理财人-华瑞放款不可做提前结清");
		 return ;
	}*/
	
	var form=addDlg2.iframe.contentDocument.getElementById("addNewsFormData");
	var contractId=$(addDlg2.iframe.contentDocument.getElementById("dtocontractId")).val();
	var loanStatus=$(addDlg2.iframe.contentDocument.getElementById("dtoloanStatus")).val();
	var payoffFlag=$(addDlg2.iframe.contentDocument.getElementById("dtopayoffFlag")).val();
	var dtolistAmount = $(addDlg2.iframe.contentDocument.getElementById("dtolistAmount")).val();
	var repayDay =$(addDlg2.iframe.contentDocument.getElementById("dtorepayDay")).val();
	var regDate =$(addDlg2.iframe.contentDocument.getElementById("dtoregDate")).val();
	var listAmount=$(addDlg2.iframe.contentDocument.getElementById("dtolistAmount")).val();
	var loanPeriod=$(addDlg2.iframe.contentDocument.getElementById("dtoloanCurrentPeriod")).val();
	var redcreditCost = $(addDlg2.iframe.contentDocument.getElementById("dtoredcreditCost")).val();
	var diffFeeText = $(addDlg2.iframe.contentDocument.getElementById("diffFeeText")).val();
//	var rklistStat = document.getElementById("dtorklistStat").value;
//	var s = rklistStat.split(":");
//	for(var i =0;i<s.length;i++){
//		if(s[i] == "05"){
//			jyDialog({"type":"warn"}).alert("认款单据状态为审批中，请等待审批结果");
//			return;
//		}
//	}
	if(contractId =="" || loanStatus ==""){
		jyDialog({"type":"warn"}).alert("请确保数据完整");
		return;
	}
	
	if(payoffFlag == "02"){
		jyDialog({"type":"warn"}).alert("贷款已结清，不允许提前结清");
		return;
	}
	
//	if(dtolistAmount=="" ||dtolistAmount ==null || dtolistAmount==0){
//		jyDialog({"type":"warn"}).alert("提前结清金额为空，不允许提前结清");
//		return false;
//	}
//	var dtolistAmountnumber = Number(dtolistAmount);
//	if(dtolistAmountnumber<0){
//		jyDialog({"type":"warn"}).alert("提前结清金额为负，不允许提前结清");
//		return false;
//	}
	if( checkRepayDay(repayDay,regDate)){
		jyDialog({"type":"warn"}).alert("当前日期为月还日，不允许新增提前结清");
		return;
	}
	/*if(checkEndDate()){
		jyDialog({"type":"warn"}).alert("该合同当前期数等于最后一期不可提前结清");
		return;
	}*/
	//非划扣结清，检查其认款类型是否为【提前结清】
	/*if (Number(listAmount) <= 0) {
		var claimStatus = checkClaim(contractId, loanPeriod);
		if(claimStatus.indexOf('noClaim') > -1){
			jyDialog({"type":"warn"}).alert("请先做提前结清类型的认款，并且认款审批通过后，再申请提前结清！");
			return;
       	} else if(claimStatus.indexOf('claimNotCheck') > -1){
			jyDialog({"type":"warn"}).alert("提前结清类型的认款并未审批通过，请在认款审批通过后， 再申请提前结清！");
			return;
       	} else if(claimStatus.indexOf('error') > -1){
       		jyDialog({"type":"warn"}).alert("验证是否存在提前结清类型的认款时出错:"+msg);
			return;
       	}
	}*/
	//政策性减免必填
	if(redcreditCost =="" && parseFloat(diffFeeText)>0){
		jyDialog({"type":"warn"}).alert("请输入政策性减免金额");
		return;
	}
	
	if(checkFormFormat($(form))){
		var params=$(form).serialize();
		var url=contextRootPath+'/laTAdvfinished/insertLaTAdvfinished';
		jyAjax(
				url,
				params,
				function(msg){
					//新增成功后，
					$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
					var v_status = msg.status;
		        	if(v_status.indexOf('ok') >-1){
		        		addDlg2.close();
		        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
		        		queryData();
		        	}
				});
	}else{
		jyDialog({"type":"warn"}).alert("红色区域为输入有误！");
	}
}


function toUpdateData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	var objs = iframe.iframeObj["table"].getSelectedObjs();
	if(objs.length){
		if("01"!=objs[0]["listStat"]){
			jyDialog({"type":"warn"}).alert("请选择初始录入状态的数据！");
			return;
		}
	}

	if(v_ids == ""){
		jyDialog({"type":"warn"}).alert("请选择待修改的数据！");
		return;
	}

	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"warn"}).alert("请选择一条数据！");
		return;
	}

	var dialogStruct={
			'display':contextRootPath+'/laTAdvfinished/prepareExecute/toUpdate?id='+v_ids,
			'width':1150,
			'height':750,
			'title':'修改提前结清信息',
			'isIframe':'false',
			'buttons':[
             {'text':'保存','action':doUpdateFrom,'isClose':false},
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogUpdate =jyDialog(dialogStruct);
	dialogUpdate.open();
}


function doUpdateFrom(){
	var form=document.getElementById("updateNewsFormData");
	var redcreditCost = document.getElementById("dtoredcreditCost").value;
	var diffFeeText = document.getElementById("diffFeeText").value;
	//政策性减免必填
	if(redcreditCost =="" && parseFloat(diffFeeText)>0){
		jyDialog({"type":"warn"}).alert("请输入政策性减免金额");
		return;
	}
	if(checkFormFormat($(form))){
		var params=$(form).serialize();
		var url=contextRootPath+'/laTAdvfinished/updateLaTAdvfinished';
		jyAjax(
				url,
				params,
				function(msg){
					$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
					var v_status = msg.status;
					if(v_status.indexOf('ok') >-1){
						dialogUpdate.close();
						queryData();
					}
				});
	}else{
		jyDialog({"type":"warn"}).alert("红色区域为输入有误！");
	}
}
//删除 事件
function deleteData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	var v_listRedid = "";
	var v_listStopid = "";
	var v_listRepayid = "";
	var v_id = "";
	var objs = iframe.iframeObj["table"].getSelectedObjs();
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"warn"}).alert("请选择一条数据！");
		return;
	}
	
	if(v_ids == ""){
		jyDialog({"type":"warn"}).alert("请选择待删除的数据！");
		return;
	}
	
	if(objs.length){
		for(var i=0;i<objs.length;i++){
			
			if("01"!=objs[i]["listStat"]){
				jyDialog({"type":"warn"}).alert("当前单据状态不允许删除！");
				return;
			}
			v_listRedid =v_listRedid+objs[i]["listRedid"]+",";
			v_listStopid =v_listStopid+objs[i]["listStopid"]+",";
			if(objs[i]["listRepayid"]!=null){
				v_listRepayid =v_listRepayid+objs[i]["listRepayid"]+",";
			}else{
				v_listRepayid =v_listRepayid+",";
			}
			
		}
	}
	
	v_ids = v_ids+";"+v_listRedid+";"+v_listStopid+";"+v_listRepayid;
	jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
		var url= contextRootPath+"/laTAdvfinished/deleteLaTAdvfinished?ids="+v_ids+"&listId=" + objs[0]["listId"] + "&listType=02" ;
		jyAjax(url,"",function(msg){
			$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
        	var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		iframe.iframeObj["table"].removeSelectedRow();
        	}
        });
	 },"确认提示");
	
	/*if(confirm("您确认要删除选择的数据吗？")){
        var url= contextRootPath+"/laTAdvfinished/deleteLaTAdvfinished?ids="+v_ids;
        		jyAjax(url,"",function(msg){
        			$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
                	var v_status = msg.status;
                	if(v_status.indexOf('ok') >-1){
                		iframe.iframeObj["table"].removeSelectedRow();
                	}
                });
    }*/
}
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/laTAdvfinished/prepareExecute/toView?id='+vId,
			'width':1150,
			'height':750,
			'title':'查看提前结清信息明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}


function toCoreDeducted(){
	
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	var objs = iframe.iframeObj["table"].getSelectedObjs();
	if(objs.length){
			if("01"!=objs[0]["listStat"]){
				jyDialog({"type":"warn"}).alert("请选择初始录入状态的数据！");
				return;
			}
	}
	if(v_ids == ""){
		jyDialog({"type":"warn"}).alert("请选择待提交的数据！");
		return;
	}
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"warn"}).alert("请选择一条数据！");
		return;
	}
	
	var listAmount = Number(objs[0]["listAmount"]);
	if (listAmount<=0) {
		jyDialog({"type":"warn"}).alert("提前结清金额小于等于0，无需划扣，可直接提交审批！");
		return;
	}
	
	//验证是否上传附件
	var isUpload = checkUpload(objs);
 	if(!isUpload){
 		jyDialog({"type":"warn"}).alert("请先上传附件！");
		return;
 	}
	
	var dialogStruct={
			'display':contextRootPath+'/laTAdvfinished/prepareExecute/toCoreDeducted?id='+v_ids,
			'width':800,
			'height':500,
			'title':'查询结清信息',
			'buttons':[
			 {'text':'确定','action':coreDeducted,'isClose':false},
			 {'text':'关闭','isClose':true}
			]
		};
	coreDeductedPage=jyDialog(dialogStruct);
	coreDeductedPage.open();
}

function coreDeducted(){
	
	var form=coreDeductedPage.iframe.contentDocument.getElementById("coreDeductedNewsFormData");
	
	
	var params=$(form).serialize();
	var url= contextRootPath+"/laTAdvfinished/coreDeducted";
	jyAjax(
			url,
			params,
			function(msg){
				$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
				var v_status = msg.status;
				if(v_status.indexOf('ok') >-1){
					coreDeductedPage.close();
					queryData();
				}
			});
	
	
	
	/*jyDialog({"type":"question"}).confirm("您确认要通知核心划扣吗？",function(){
		var url= contextRootPath+"/laTAdvfinished/coreDeducted";
 		jyAjax(url,"",function(msg){
 			$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
         	var v_status = msg.status;
         	if(v_status.indexOf('ok') >-1){
         		iframe.iframeObj["table"].removeSelectedRow();
         	}
         });
	 },"确认提示");*/
	
}

function checkUpload(objs) {
	var isUpload = false;
  	var  url = contextRootPath+"/laTImageBizAss/checkUpload?listId="+objs[0]["listId"] + "&listType=02";
	$.ajax({
		type:"POST",
		url:url,
		async:false,
		success:function(msg){
			if(msg.indexOf('ok') >-1){
				isUpload = true;
			} else {
				isUpload = false;
			}
		}
	});
	return isUpload;
}

function submitData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");;
	var v_url =contextRootPath+"/dojbpm/jbpmAdvfinished/startAdvfinishedWorkflow?nextPartnerId="+$("#dtoparamUserId").val()+"&ids="+v_ids+"&loginUserId="+$("#loginUserId").val();
	
	jyDialog({"type":"question"}).confirm("您确认要提交选择的数据吗？",function(){
		$.ajax({
            type:"POST",
            url:v_url,
            dataType:"json",
            success:function(msg){
            	$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
            	var v_status = msg.status;
            	if(v_status.indexOf('ok') >-1){
            		queryData();
            		//iframe.iframeObj["table"].removeSelectedRow();
            	}
            }
        });
	 },"确认提示");
	
	/*if(confirm("您确认要提交选择的数据吗？")){
        $.ajax({
            type:"POST",
            url:v_url,
            dataType:"json",
            success:function(msg){
            	$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
            	var v_status = msg.status;
            	if(v_status.indexOf('ok') >-1){
            		iframe.iframeObj["table"].removeSelectedRow();
            	}
            	
            	
            }
        });
    }*/
}

function checkPassRepayDay(){
	var objs = iframe.iframeObj["table"].getSelectedObjs();
	var contractId = objs[0]["contractId"];
	var flag = false;
	/*$.ajax({
		type:"POST",
		url:contextRootPath+'/aftloanqueryDate/queryCoreForLoanInfo?contractId='+contractId,
		async:false,
		dataType:"json",
		success:function(msg){
			var v_status = msg.status;
			if(v_status.indexOf('ok') >-1){
				var data = msg.data;
				for ( var i = 0; i < data.length; i++) {
					repayDate = data[i].currPayDate
				}
			}else{
				flag = "1"
			}
		}
	});*/
	
	if(objs.length){
		var nowDate =$("#nowDate").val();//系统时间
		var regDate = objs[0]["regDate"];//申请时间
		var currPayDate = objs[0]["currPayDate"];//申请时当前还款日
		
		var rdate = new Date(regDate).getTime();
		var ndate = new Date(nowDate).getTime();
		var rpdate = new Date(currPayDate).getTime();
		
		
		if(ndate>=rpdate && rdate<rpdate && "03"==objs[0]["listStat"]){
			flag = true;		
		}
	}
	return flag;
}

//设置减免项是否可用
function setItemDisabledByFunc() {
	$("#dtoredNorBase").attr("disabled", true);
	$("#dtoredNorNowBase").attr("disabled", true);
	$("#dtoredOverBase").attr("disabled", true);
	$("#dtoredNorInst").attr("disabled", true);
	$("#dtoredNorNowInst").attr("disabled", true);
	$("#dtoredOverInst").attr("disabled", true);
	var contractStatus = $("#dtoloanStatus").val();
	if (contractStatus=="0") {
		//0-正常, 可减免项目为[信息管理费、信用审核费、咨询服务费]
		$("#dtoredpunInterest").attr("disabled", true);
		$("#dtoredPenalty").attr("disabled", true);
	}
	//设置政策性减免金额不可用
	setCreditCostDisabled();
}

//设置政策性减免金额不可用
function setCreditCostDisabled() {
	//三项服务费<合同减免金额，政策性减免金额不可用
	var feeObjs=["dtoinfoCost","dtocreditCost","dtoconsCost"];
	var patrn=/^(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/;
	var totalFee=0;//三项服务费
	for(var i=0;i<feeObjs.length;i++){
		var obj =$("#"+feeObjs[i]);
		var feeVal = obj.val();
		if(feeVal&&patrn.test(feeVal) ){
			totalFee+=Number(feeVal);
		}
	}
	debugger;
	//合同减免金额
	var dtoredinfoCost =$("#dtoredinfoCost").val();
	if (dtoredinfoCost == "" || dtoredinfoCost == undefined) {
		dtoredinfoCost = 0;
	}
	// 政策性减免金额不可用
    if(Number(totalFee) <= Number(dtoredinfoCost)){
		 $("#dtoredcreditCost").attr("disabled", true);
	}
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
	
//	var objs = iframe.iframeObj["table"].getSelectedObjs();
//	if(objs.length){
//		if("01"!=objs[0]["listStat"]){
//			jyDialog({"type":"warn"}).alert("请选择初始录入状态的数据！");
//			return;
//		}
//	}
	
	var dialogStruct={
			'display':contextRootPath+'/laTImageBizAss/prepareExecute/toViewUpload?id='+v_ids+"&type=02",
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

function checkUploadFile(v_ids){	
	var dialogStruct={
			'display':contextRootPath+'/laTImageBizAss/prepareExecute/toViewUpload?id='+v_ids+"&type=02",
			'width':1000,
			'height':800,
			'title':'附件查看',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogUpdate =jyDialog(dialogStruct);
	dialogUpdate.open();
}

//设置减免服务费总额\差额
function setRfVal() {
	//三项服务费之和
	var addObjs=["dtoinfoCost","dtocreditCost","dtoconsCost" ];
	var totalValue=sumObjs(addObjs);
    if (totalValue < 0) {
  	   totalValue = 0;
    } 
	$("#lawFeeText").val(totalValue);
	//服务费总和与合同减免费用差额
	var diffFee = diffRelief(totalValue); 
	if (diffFee < 0 ) {
		diffFee = 0;
	} 
	$("#diffFeeText").val(diffFee);
	$("#diffFeeTextValue").val(diffFee);
}


//校验月还日无法提交、新增
function checkRepayDay(repayDay,regDate){
    var day= regDate.substring(regDate.lastIndexOf("-")+1); //当前日期(1-31)
    if(repayDay=="" || repayDay==null){
    	 return false;
    }else{
    	if(parseInt(repayDay)==parseInt(day)){
			return true;
    	}else{
    		return false;
    	}
    }
}



/*
 *非划扣结清，检查其认款类型是否为【提前结清】
 */
function checkClaim(contractId, loanPeriod) {
	var status = "";
	var check_url = contextRootPath+"/laTAdvfinished/checkClaim?contractId="+contractId+"&loanPeriod="+loanPeriod;
	$.ajax({
       type:"POST",
       url:check_url,
	   async:false,
       dataType:"json",
       success:function(msg){ 
    	    status = msg.status;
       }
   }); 
   return status;
}

/*
 *提交前先去实时查询结清金额并作出判断
 */
function getListAmount(id) {
	var status = "";
	var listAmount = 0;
	var check_url = contextRootPath+"/laTAdvfinished/getListAmount?id="+id;
	$.ajax({
       type:"POST",
       url:check_url,
	   async:false,
       dataType:"json",
       success:function(msg){ 
    	    status = msg.status;
    	    if(status == "ok"){
    	    	listAmount = msg.data;
    	    }
       }
   }); 
   return listAmount;
}

//试算
function toTrail(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");

	if(v_ids == ""){
		jyDialog({"type":"warn"}).alert("请选择待修改的数据！");
		return;
	}

	var objs = iframe.iframeObj["table"].getSelectedObjs();
	var contractId = objs[0]["contractCode"];
	var cardType = objs[0]["cardType"];
	var cardId = objs[0]["cardId"];
	var custName = objs[0]["custName"];
	var custId = objs[0]["custId"];
	var repayType = objs[0]["repayType"];
	var intoCode = objs[0]["intoCode"];
	var contractAmount = objs[0]["contractAmount"];
	var contractSrc = objs[0]["contractSrc"];
	var provideAmount = objs[0]["provideAmount"];
	var prodCode = objs[0]["prodCode"];
	var prodName = objs[0]["prodName"];
	var clientManag = objs[0]["clientManag"];
	var storeCode = objs[0]["storeCode"];
	var storeCodeName = objs[0]["storeCodeName"];
	var opUserCode = objs[0]["opUserCode"];
	var opUserCodeName = objs[0]["opUserCodeName"];
	var clientManagName = objs[0]["clientManagName"];
	var clientManag = objs[0]["clientManag"];
	var status = objs[0]["status"];
	var selectobj = 'contractCode='+contractId+'&cardType='+cardType+'&cardId='
					+cardId+'&custName='+custName+'&custId='+custId+'&repayType='
					+repayType+'&intoCode='+intoCode+'&contractAmount='+contractAmount
					+'&contractSrc='+contractSrc+'&provideAmount='+provideAmount
					+'&prodCode='+prodCode+'&prodName='+prodName+'&clientManag='
					+clientManag+'&storeCode='+storeCode+'&storeCodeName='+storeCodeName
					+'&opUserCode='+opUserCode+'&opUserCodeName='+opUserCodeName
					+'&clientManagName='+clientManagName+'&clientManag='+clientManag+'&status='+status;
	var url=contextRootPath+'/laTAdvfinished/prepareExecute/toTrail?'+selectobj+'&claimKind=';
	var dialogStruct={
			'display':url,
			'width':1100,
			'height':750,
			'title':'结清试算信息',
			'buttons':[{'text':'关闭','isClose':true}]
		};
		
	addDlg1 =jyDialog(dialogStruct);
	addDlg1.open();

}
