//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogUpdate,threePage;
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
	var url=contextRootPath+'/laTDeptRest/prepareExecute/toAddNext?'+selectObj+'&claimKind='+claimKind;
	var dialogStruct={
			'display':url,
			'width':1100,
			'height':750,
			'title':'新增展期信息',
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


//动态计算展期减免金额合计 违约金和罚息
function douSerAmount(){
		//违约金和罚息合计
		var addObjs=["dtopenalty","dtopunInterest"];
		var totalValue=sumObjs(addObjs);
		if (addDlg2&&addDlg2.iframe.contentDocument) {
			$(addDlg2.iframe.contentDocument.getElementById("dtoappRestRedAmount")).val(totalValue ); 
		} else {
			$("#dtoappRestRedAmount").val(totalValue ); 
		}
}

//动态计算展期合同金额   逾期本金 + 逾期利息 + 当前本金 + 当期利息 + 剩余期次本金
function czSerAmount(){
		//违约金和罚息合计
		var addObjs=["dtoredpunInterest","dtoredPenalty"];
		var restAllAmout=sumObjs(addObjs);
		
		//计算展期金额金额
		var totalValue = getSettleAmt(restAllAmout); 
		if (addDlg2&&addDlg2.iframe.contentDocument) {
			$(addDlg2.iframe.contentDocument.getElementById("dtoapprRestAmount")).val(totalValue ); 
			$(addDlg2.iframe.contentDocument.getElementById("dtoapprRestAmountText")).val(totalValue ); 
		} else {
			$("#dtoapprRestAmount").val(totalValue ); 
			$("#dtoapprRestAmountText").val(totalValue ); 
		}
}


//动态计算减免金额合计、结清金额
function addSerAmount(){
		//减免合计
		var addObjs=["dtoredinfoCost","dtoredconsCost","dtoredPenalty","dtoredpunInterest"];
		var totalValue=sumObjs(addObjs);
		if (addDlg2&&addDlg2.iframe.contentDocument) {
			$(addDlg2.iframe.contentDocument.getElementById("dtoappRedAmount")).val(totalValue ); 
			$(addDlg2.iframe.contentDocument.getElementById("dtoappRestRedAmount")).val(totalValue ); 
		} else {
			$("#dtoappRedAmount").val(totalValue ); 
			$("#dtoappRestRedAmount").val(totalValue ); 
		}
		
		
		//计算展期金额金额
		var restAmount = getSettleAmt(totalValue); 
		  
		if(Number(restAmount) > 0){
			if (addDlg2&&addDlg2.iframe.contentDocument) {
				$(addDlg2.iframe.contentDocument.getElementById("dtoapprRestAmount")).val(restAmount );
				$(addDlg2.iframe.contentDocument.getElementById("dtoapprRestAmountText")).val(restAmount );
			} else {
				$("#dtoapprRestAmount").val(restAmount);
				$("#dtoapprRestAmountText").val(restAmount);
			}
		}
}


//动态计算减免金额合计
function redSumAmount(){
	//减免合计
	var addObjs=["dtoredinfoCost","dtoredconsCost","dtoredPenalty","dtoredpunInterest"];
	var totalValue=sumObjs(addObjs);
	if (addDlg2&&addDlg2.iframe.contentDocument) {
		$(addDlg2.iframe.contentDocument.getElementById("dtoappRedAmount")).val(totalValue ); 
	} else {
		$("#dtoappRedAmount").val(totalValue ); 
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
		} else if ($(element).attr("id") == "dtoredconsCost" ) {//特殊减免
			//政策性减免优先输入
			//政策性减免金额限制
			var feeObjs=["dtoinfoCost","dtocreditCost","dtoconsCost"];
			var totalFee=sumObjs(feeObjs);
			totalFee = diffRelief(totalFee); 
			//政策性减免金额 
			var lawRelief="";
			if (addDlg2&&addDlg2.iframe.contentDocument) {
				//lawRelief=$(addDlg2.iframe.contentDocument.getElementById("dtoredcreditCost")).val();
			} else {
				//lawRelief=$("#dtoredcreditCost").val();
			}
			//政策性服务费总额 大于0的情况，并且政策性减免金额 没有输入
			if (totalFee > 0 && (lawRelief == "" || lawRelief == 0 
						|| lawRelief == undefined || lawRelief == "undefined" 
						|| lawRelief == null || lawRelief == "null")) {
				return error3;
			}
		}
	}else{
		return error;
	}
	
	
	//验证减免金额是否输入，如果没输入则不进行校验
	var reliefObjs=["dtoredpunInterest","dtoredPenalty"];
	var reliefValue= sumObjs(reliefObjs);
	if (reliefValue == 0) {
		return;
	}
	
	//减免额度要保本
	//计算减免总金额
	var addObjs=["dtoredpunInterest","dtoredPenalty"];
	var totalValue=sumObjs(addObjs);
	//提前结清金额+已还金额+挂账<放款金额
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
	if (addDlg2&&addDlg2.iframe.contentDocument) {
		dtoprovideAmount=$(addDlg2.iframe.contentDocument.getElementById("dtoprovideAmount")).val();
		dtoYhje=$(addDlg2.iframe.contentDocument.getElementById("dtoyhje")).val();
		losAmount=$(addDlg2.iframe.contentDocument.getElementById("dtolosAmount")).val();
	} else {
		dtoprovideAmount =  document.getElementById("dtoprovideAmount").value;//贷款发放金额
		dtoYhje = document.getElementById("dtoyhje").value;//已还金额
		losAmount = document.getElementById("dtolosAmount").value;//挂账
	}
	//提前结清金额
	var listAmount=getSettleAmt(totalValue);
	//提前结清金额+已还金额+挂账<放款金额
	if (Number(listAmount) + Number(dtoYhje) + Number(losAmount) < Number(dtoprovideAmount)) {
		return true;
	}
	return false;
}

/**
 * 计算展期金额
 * @returns {Number}
 */
function getSettleAmt(reliefValue) {
	var dtototaldebtAmount;//欠款总额
	var dtodeductNorInst ;//剩余正常利息
	if (addDlg2&&addDlg2.iframe.contentDocument) {
		dtototaldebtAmount=$(addDlg2.iframe.contentDocument.getElementById("dtototaldebtAmount")).val();
		dtodeductNorInst=$(addDlg2.iframe.contentDocument.getElementById("dtodeductNorInst")).val();
	} else {
		dtototaldebtAmount = document.getElementById("dtototaldebtAmount").value;//欠款总额
		dtodeductNorInst =  document.getElementById("dtodeductNorInst").value;//剩余正常利息
	}
	if(Number(reliefValue)<=0){
		reliefValue=0;
	}
	//提前结清金额=欠款总额-减免总金额-挂帐金额-剩余正常利息
	var listAmount = Number(dtototaldebtAmount) //欠款总额
					- Number(reliefValue) //减免总金额
					-Number(dtodeductNorInst)//剩余正常利息
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
	var form=addDlg2.iframe.contentDocument.getElementById("addNewsFormData");
	var contractId=$(addDlg2.iframe.contentDocument.getElementById("dtocontractId")).val();
	var loanStatus=$(addDlg2.iframe.contentDocument.getElementById("dtoloanStatus")).val();
	var payoffFlag=$(addDlg2.iframe.contentDocument.getElementById("dtopayoffFlag")).val();
	var dtolistAmount = $(addDlg2.iframe.contentDocument.getElementById("dtolistAmount")).val();
	//var repayDay =$(addDlg2.iframe.contentDocument.getElementById("dtorepayDay")).val();
	//获取贷款到期日期 
	var repayDay =$(addDlg2.iframe.contentDocument.getElementById("dtoendDateText")).val();
	repayDay = repayDay.substring(repayDay.lastIndexOf("-")+1);
	var regDate =$(addDlg2.iframe.contentDocument.getElementById("dtoregDate")).val();
	var listAmount=$(addDlg2.iframe.contentDocument.getElementById("dtolistAmount")).val();
	var loanPeriod=$(addDlg2.iframe.contentDocument.getElementById("dtoloanCurrentPeriod")).val();
	//var redcreditCost = $(addDlg2.iframe.contentDocument.getElementById("dtoredcreditCost")).val();
	var diffFeeText = $(addDlg2.iframe.contentDocument.getElementById("diffFeeText")).val();
	var apprPeriod = $(addDlg2.iframe.contentDocument.getElementById("dtoapprPeriod")).val();//产品期次
	var apprPeriodName = $(addDlg2.iframe.contentDocument.getElementById("dtoproductName")).val();//产品名称
	var dtopayoffFlag=$(addDlg2.iframe.contentDocument.getElementById("dtopayoffFlag")).val();
	
	var overdueTerm=$(addDlg2.iframe.contentDocument.getElementById("dtooverdueTerm")).val();
//	var rklistStat = document.getElementById("dtoapprPeriod").value;
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
	if(dtopayoffFlag!="01"){
		jyDialog({"type":"warn"}).alert("只允许未结清的合同进行展期");
		return;
	}
	/*if(loanStatus!="1"){
		jyDialog({"type":"warn"}).alert("只允许逾期的合同进行展期");
		return;
	}
	if(Number(overdueTerm) <2){
		jyDialog({"type":"warn"}).alert("只允许逾期M2或M2以上的合同进行展期");
		return;
	}*/
	if(apprPeriod =="" || apprPeriod==undefined ){
		jyDialog({"type":"warn"}).alert("新还款期次不能为空");
		return;
	}
	
	if(Number(apprPeriod)>36 && apprPeriodName.indexOf('优悦贷')<0){
		jyDialog({"type":"warn"}).alert("只允许优悦贷选择36期以上还款期次,请重新选择");
		return;
	}
	
	if( checkRepayDay(repayDay,regDate)){
		jyDialog({"type":"warn"}).alert("当前日期为月还日，不允许展期");
		return;
	}
	/**
	 
	 if(checkEndDate()){
		jyDialog({"type":"warn"}).alert("该合同当前期数等于最后一期不可进行展期");
		return;
	}
	 */
	
	//非划扣结清，检查其认款类型是否为【提前结清】
	if (Number(listAmount) <= 0) {
		var claimStatus = checkClaim(contractId, loanPeriod);
		if(claimStatus.indexOf('noClaim') > -1){
			jyDialog({"type":"warn"}).alert("请先做提前结清类型的认款，并且认款审批通过后，再申展期！");
			return;
       	} else if(claimStatus.indexOf('claimNotCheck') > -1){
			jyDialog({"type":"warn"}).alert("提前结清类型的认款并未审批通过，请在认款审批通过后， 再申展期！");
			return;
       	} else if(claimStatus.indexOf('error') > -1){
       		jyDialog({"type":"warn"}).alert("验证是否存在展期类型的认款时出错:"+msg);
			return;
       	}
	}
	
	
	if(checkFormFormat($(form))){
		var params=$(form).serialize();
		var url=contextRootPath+'/laTDeptRest/insertLaTDeptRest';
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


function checkSelect(element){
	var value=element.value;
	var error="字段不能为空";
	if(value==""||value==undefined){
		return error;
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
			'display':contextRootPath+'/laTDeptRest/prepareExecute/toUpdate?id='+v_ids,
			'width':1150,
			'height':750,
			'title':'修改展期信息',
			'isIframe':'false',
			'buttons':[
             {'text':'保存','action':doUpdateFrom,'isClose':false},
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogUpdate =jyDialog(dialogStruct);
	dialogUpdate.open();
}

//修改的方法
function doUpdateFrom(){
	var apprPeriod = $("#dtoapprPeriod").val();
	if(apprPeriod =="" || apprPeriod==undefined ){
		jyDialog({"type":"warn"}).alert("新还款期次不能为空");
		return;
	}

	var form=document.getElementById("updateNewsFormData");
		
	if(checkFormFormat($(form))){
		var params=$(form).serialize();
		var url=contextRootPath+'/laTDeptRest/updateLaTDeptRest';
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
			
			if(!checkPassRepayDay() && "01"!=objs[i]["listStat"] && "04"!=objs[i]["listStat"] ){
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
		var url= contextRootPath+"/laTDeptRest/deleteLaTDeptRest?ids="+v_ids+"&listId=" + objs[0]["listId"]  ;
		jyAjax(url,"",function(msg){
			$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
        	var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		iframe.iframeObj["table"].removeSelectedRow();
        	}
        });
	 },"确认提示");
	

}
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/laTDeptRest/prepareExecute/toView?id='+vId,
			'width':1150,
			'height':750,
			'title':'查看展期信息明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}



function coreDeducted(){
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
	
	jyDialog({"type":"question"}).confirm("您确认要通知核心划扣吗？",function(){
		var url= contextRootPath+"/laTDeptRest/coreDeducted?ids="+v_ids;
 		jyAjax(url,"",function(msg){
 			$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
         	var v_status = msg.status;
         	if(v_status.indexOf('ok') >-1){
         		iframe.iframeObj["table"].removeSelectedRow();
         	}
         });
	 },"确认提示");
	
	
	
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
/**
 * 提交展期信息
 */
function submitData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");;
	var v_url =contextRootPath+"/laTDeptRest/submitDeptRest?ids="+v_ids;
	
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
            	}
            }
        });
	 },"确认提示");
	
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
	/*$("#dtoredPenalty").attr("disabled", false);
	$("#dtoredpunInterest").attr("disabled", false);*/
	
	if(($("#dtopenalty").val()+"").length>1){
        $(document.getElementById("dtoredPenalty")).removeAttr("disabled");
   }
   if(($("#dtopunInterest").val()+"").length>1){
        $(document.getElementById("dtoredpunInterest")).removeAttr("disabled");
   }
	
	//$(document.getElementById("dtoredPenalty")).val($("#dtopenalty").val());
    //$(document.getElementById("dtoredpunInterest")).val($("#dtopunInterest").val());
    addSerAmount();
//    douSerAmount();
    czSerAmount();
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
	var check_url = contextRootPath+"/laTDeptRest/checkClaim?contractId="+contractId+"&loanPeriod="+loanPeriod;
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
	var url=contextRootPath+'/laTDeptRest/prepareExecute/toTrail?'+selectobj+'&claimKind=';
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

