//utf-8
//点击新增按钮 事件跳转至 新增页面

var dialogUpdate;
var addDlg1;//添加第一个界面：查询贷前
var addDlg2;//添加第二个界面：添加详情
function toAddData(){
	var dialogStruct={
			'display':contextRootPath+'/aftloanqueryDate/prepareExecute/toQueryBefloanForLoanInfo?function=advRepay',
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
	//关闭查询界面
	addDlg1.close();
	//打开新增界面
	var url=contextRootPath+'/laTDxretuahea/prepareExecute/toAddNext?'+selectObj+'&claimKind='+claimKind;
	var dialogStruct={
			'display':url,
			'width':1100,
			'height':750,
			'title':'新增预存款还款信息',
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


//新增页面的保存操作
function doAddFrom(){
	var dtocontractSource=$(addDlg2.iframe.contentDocument.getElementById("dtocontractSource")).val();
	
	/* delete by liuyu at 170524   该放款机构理财人-华瑞放款可做预存款还款
	if(dtocontractSource == "01"){
		 jyDialog({"type":"warn"}).alert("该放款机构理财人-华瑞放款不可做预存款还款");
		 return ;
	}
	 */
	
	//判断合同来源是否有特殊不可新增操作的
	var  url = contextRootPath+"/LaTContractConfigure/queryByserial?typeSerial=01&conSerial="+dtocontractSource;
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
		 jyDialog({"type":"warn"}).alert("该放款机构不可做提前还款");
		 return ;
	}
	var contractId=$(addDlg2.iframe.contentDocument.getElementById("dtocontractId")).val();
	var loanStatus=$(addDlg2.iframe.contentDocument.getElementById("dtoloanStatus")).val();
	var dtopayoffFlag = $(addDlg2.iframe.contentDocument.getElementById("dtopayoffFlag")).val();
	var repayDay =$(addDlg2.iframe.contentDocument.getElementById("dtorepayDay")).val();
	var regDate =$(addDlg2.iframe.contentDocument.getElementById("dtoregDate")).val();
	
	var dtodxretuaheaType =$(addDlg2.iframe.contentDocument.getElementById("dtodxretuaheaType")).val();
	var dtocurrPayDate =$(addDlg2.iframe.contentDocument.getElementById("dtocurrPayDate")).val();
	
	var dtocurRepayMoney =$(addDlg2.iframe.contentDocument.getElementById("dtocurRepayMoney")).val();
	var dtolosAmount =$(addDlg2.iframe.contentDocument.getElementById("dtolosAmount")).val();
	var dtosumAmt = accSub(Number(dtocurRepayMoney),Number(dtolosAmount));
	
	//var subamtLimit =$(addDlg2.iframe.contentDocument.getElementById("dtosubamtLimit")).val();
	
	//var rklistStat = $(addDlg2.iframe.contentDocument.getElementById("dtorklistStat")).val();
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
	//贷款状态
	if(loanStatus == "1"){
		jyDialog({"type":"warn"}).alert("贷款状态为逾期，不可新增提前还款申请");
		return ;
	}
	//结清状态
	if(dtopayoffFlag == "02"){
		jyDialog({"type":"warn"}).alert("结清状态为已结清，不可新增提前还款申请");
		return;
	}
	if(dtodxretuaheaType =="03" && loanStatus != "0"){
		jyDialog({"type":"warn"}).alert("只有正常状态的合同才能发起[本月月还预存]申请");
		return;
	}
	//alert("月还日："+dtocurrPayDate);
	
	//regDate = "2015-2-28";
	//alert("申请日："+regDate);
	if(dtodxretuaheaType =="03"){
		var day = getDays(dtocurrPayDate,regDate);
		if(!day){
			jyDialog({"type":"warn"}).alert("仅能在合同月还日前"+getMonthRepayLimitDate()+"天发起[本月月还预存]的申请。");
			return;
		}
		
		if(dtosumAmt<=0){
			jyDialog({"type":"warn"}).alert("挂账金额大于等于本月月还金额，不允许发起[本月月还预存]申请。");
			return;
		}
		
		/*var ascLastAmt = accSub(Number(dtosumAmt),Number(subamtLimit));
		if(ascLastAmt<=0){
			jyDialog({"type":"warn"}).alert("划扣金额小于等于限制金额["+subamtLimit+"]，不允许发起[本月月还预存]申请。");
			return;
		}*/
	}
	
	/*if(checkRepayDay(repayDay,regDate)){
		jyDialog({"type":"warn"}).alert("当前日期为月还日或月还日前一日，不允许新增预存款还款");
		return;
	}*/
	var form=addDlg2.iframe.contentDocument.getElementById("addNewsFormData");
	if(checkFormFormat($(form))){
		//序列化 新增页面的form表单数据
		var params=$(form).serialize();
		var url=contextRootPath+'/laTDxretuahea/insertLaTDxretuahea';
		//通过ajax保存
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
		jyDialog({"type":"warn"}).alert("红色区域输入有误！");
	}
}


//修改 事件
function toUpdateData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"warn"}).alert("请选择待修改的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"warn"}).alert("请选择一条数据！");
		return;
	}
	
	var objs = iframe.iframeObj["table"].getSelectedObjs();
	if(objs.length){
			if("01"!=objs[0]["listStat"]){
				jyDialog({"type":"warn"}).alert("请选择初始录入状态的数据！");
				return;
			}
	}


	var dialogStruct={
			'display':contextRootPath+'/laTDxretuahea/prepareExecute/toUpdate?id='+v_ids,
			'width':1100,
			'height':750,
			'title':'修改预存款还款信息',
			'isIframe':'false',
			'buttons':[
             {'text':'保存','action':doUpdateFrom},
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogUpdate =jyDialog(dialogStruct);
	dialogUpdate.open();
}
//修改页面 的 保存操作
function doUpdateFrom(){
	/*var regDate =$(dialogUpdate.iframe.contentDocument.getElementById("dtoregDate")).val();
	var dtodxretuaheaType =$(dialogUpdate.iframe.contentDocument.getElementById("dtodxretuaheaType")).val();
	var dtocurrPayDate =$(dialogUpdate.iframe.contentDocument.getElementById("dtocurrPayDate")).val();*/
	
	var regDate =document.getElementById("dtoregDate").value;
	var dtodxretuaheaType =document.getElementById("dtodxretuaheaType").value;
	var dtocurrPayDate =document.getElementById("dtocurrPayDate").value;
	
	var dtocurRepayMoney =document.getElementById("dtocurRepayMoney").value;
	var dtolosAmount =document.getElementById("dtolosAmount").value;
	var dtosumAmt = accSub(Number(dtocurRepayMoney),Number(dtolosAmount));
	
	//var subamtLimit =document.getElementById("dtosubamtLimit").value;
	
	if(dtodxretuaheaType =="03"){
		var day = getDays(dtocurrPayDate,regDate);
		if(!day){
			jyDialog({"type":"warn"}).alert("仅能在合同月还日前"+getMonthRepayLimitDate()+"天发起[本月月还预存]的申请。");
			return;
		}
		
		if(dtosumAmt<=0){
			jyDialog({"type":"warn"}).alert("挂账金额大于等于本月月还金额，不允许发起[本月月还预存]申请。");
			return;
		}
		
	/*	var ascLastAmt = accSub(Number(dtosumAmt),Number(subamtLimit));
		if(ascLastAmt<=0){
			jyDialog({"type":"warn"}).alert("划扣金额小于等于限制金额["+subamtLimit+"]，不允许发起[本月月还预存]申请。");
			return;
		}*/
	}
	
	//序列化 新增页面的form表单数据
	var form=document.getElementById("updateNewsFormData");
	if(checkFormFormat($(form))){
		var params=$(form).serialize();
		var url=contextRootPath+'/laTDxretuahea/updateLaTDxretuahea';
		//通过ajax保存
		jyAjax(
			url,
			params,
			function(msg){
				//保存成功后，执行查询页面查询方法
				$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
	        	var v_status = msg.status;
	        	if(v_status.indexOf('ok') >-1){
	        		dialogUpdate.close();
	        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
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
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"warn"}).alert("请选择待删除的数据！");
		return;
	}
	var objs = iframe.iframeObj["table"].getSelectedObjs();
	if(objs.length){
			if("01"!=objs[0]["listStat"]){
				jyDialog({"type":"warn"}).alert("请选择初始录入状态的数据！");
				return;
			}
	}
	jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
		var  url = contextRootPath+"/laTDxretuahea/deleteLaTDxretuahea?ids="+v_ids;
		var params = null;
		jyAjax(
				url,
				params,
				function(msg){
					//保存成功后，执行查询页面查询方法
					$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
		        	var v_status = msg.status;
		        	if(v_status.indexOf('ok') >-1){
		        		iframe.iframeObj["table"].removeSelectedRow();
		        	}
		        	//显示剩下数据
		        	queryData();
		  	});
	 },"确认提示");
	/*if(confirm("您确认要删除选择的数据吗？")){
		var  url = contextRootPath+"/laTDxretuahea/deleteLaTDxretuahea?ids="+v_ids;
		var params = null;
		jyAjax(
				url,
				params,
				function(msg){
					//保存成功后，执行查询页面查询方法
					$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
		        	var v_status = msg.status;
		        	if(v_status.indexOf('ok') >-1){
		        		iframe.iframeObj["table"].removeSelectedRow();
		        	}
		        	//显示剩下数据
		        	queryData();
		  	});
		
    }*/
}
//查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/laTDxretuahea/prepareExecute/toView?id='+vId,
			'width':1100,
			'height':750,
			'title':'查看预存款还款信息明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	jyDialog(dialogStruct).open();
}


//提交审批  事件  
function submitAppData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	var objs = iframe.iframeObj["table"].getSelectedObjs();
	var nowDates=document.getElementById("nowDate").value;
	if(objs.length){
		if("01"!=objs[0]["listStat"]){
			jyDialog({"type":"warn"}).alert("请选择初始录入状态的数据！");
			return;
		}
	}
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"warn"}).alert("请选择待提交的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"warn"}).alert("请选择一条数据！");
		return;
	}
	/*if(checkRepayDay(objs[0]["repayDay"],nowDates)){
		jyDialog({"type":"warn"}).alert("当前日期为月还日或月还日前一日，不允许提交预存款还款！");
		return;
	}*/
	//?????????
	var url =contextRootPath+"/dojbpm/jbpmDxretuahea/startDxretuaheaWorkflow?nextPartnerId="+$("#dtoparamUserId").val()+"&ids="+v_ids+"&loginUserId="+$("#loginUserId").val();
	jyDialog({"type":"question"}).confirm("您确认要提交选择的数据吗？",function(){
		var params = null;
		jyAjax(
				url,
				params,
				function(msg){
					//保存成功后，执行查询页面查询方法
					$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
		        	var v_status = msg.status;
		        	if(v_status.indexOf('ok') >-1){
		        		iframe.iframeObj["table"].removeSelectedRow();
		        	}
		        	//显示剩下数据
		        	queryData();
		  	});
	 },"确认提示");
	/*if(confirm("您确认要提交选择的数据吗？")){
		var params = null;
		jyAjax(
				url,
				params,
				function(msg){
					//保存成功后，执行查询页面查询方法
					$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
		        	var v_status = msg.status;
		        	if(v_status.indexOf('ok') >-1){
		        		iframe.iframeObj["table"].removeSelectedRow();
		        	}
		        	//显示剩下数据
		        	queryData();
		  	});
		
	}*/
}

//1、校验金额合法性 2、审批录入金额与初始录入金额比较大小
function checkAmount(element){
	//var error3="输入金额格式不对,请输入最多两位小数的正数";
	var value=element.value;

	var error="提前还款金额不能为空";
	if(value==""||value==undefined){
		return error;
	}
	
	value=value.trim();
	element.value=value;
	var error2 = "提前还款金额格式不合法";
	if((value+"").length<1 || isNaN(Number(value))){
		return error2;
	}
	
	if (value <= 0) {
		return "提前还款金额不能小于等于0";
	}
	var sumAmount;//总欠款
	var losAmount;//挂账
	var freezeBal;//冻结金额
	var money;//月还额
	var dxretuaheaType;//提前还款类型
	var subamtLimit;//月还预存金额差值限制
	if (addDlg2&&addDlg2.iframe.contentDocument) {
		sumAmount = $(addDlg2.iframe.contentDocument.getElementById("dtototaldebtAmount")).val();
		losAmount = $(addDlg2.iframe.contentDocument.getElementById("dtolosAmount")).val();
		freezeBal = $(addDlg2.iframe.contentDocument.getElementById("dtofreezeBal")).val();
		money = $(addDlg2.iframe.contentDocument.getElementById("dtocurRepayMoney")).val();
		dxretuaheaType = $(addDlg2.iframe.contentDocument.getElementById("dtodxretuaheaType")).val();
		subamtLimit =$(addDlg2.iframe.contentDocument.getElementById("dtosubamtLimit")).val();
	} else {
		sumAmount = document.getElementById("dtototaldebtAmount").value;
		losAmount = document.getElementById("dtolosAmount").value;
		freezeBal = document.getElementById("dtofreezeBal").value;
		money = document.getElementById("dtocurRepayMoney").value;
		dxretuaheaType = document.getElementById("dtodxretuaheaType").value;
		subamtLimit =document.getElementById("dtosubamtLimit").value;
	}
	if (sumAmount=="") {
		sumAmount = "0";
	}
	if (losAmount=="") {
		losAmount = "0";
	}
	if (money=="") {
		money = "0";
	}
	var hiddenValue=checkMax(value);
	if(hiddenValue <0){
		 return "提前还款金额不能大于欠款总金额["+sumAmount+"]减去(挂账金额["+losAmount+"]+冻结金额["+freezeBal+"])";
	}
	
	if(dxretuaheaType == "03"){
		var dtosumAmt = accSub(Number(money),Number(losAmount));
		var ascLastAmt = accSub(Number(value),Number(subamtLimit));
		if(ascLastAmt<0){
			return "提前还款金额不能小于限制金额["+subamtLimit+"]";
		}
		ascLastAmt = accSub(Number(dtosumAmt),Number(value));
		if(ascLastAmt<0){
			return "提前还款金额不能大于月还金额["+money+"]减去挂账金额["+losAmount+"]";
		}
	}else{
		var tocheck = checkMoney(value);
		if(tocheck < 0){
			return "提前还款金额不能小于月还金额["+money+"]减去挂账金额["+losAmount+"]";
		}
	}
}

//还款金额不能小于月还金额
function checkMoney(value){
	//月还金额
	var money;
	//挂账
	var losAmount;
	if (addDlg2&&addDlg2.iframe.contentDocument) {
		money = $(addDlg2.iframe.contentDocument.getElementById("dtocurRepayMoney")).val();
		losAmount = $(addDlg2.iframe.contentDocument.getElementById("dtolosAmountText")).val();
	} else {
		money = document.getElementById("dtocurRepayMoney").value;
		losAmount = document.getElementById("dtolosAmountText").value;
	}
	var laValues = accSubtr(money,losAmount);
	var toValue = accSubtr(value, laValues);
	if(Number(toValue.replace(/[^\d\.-]/g, "")) < 0){
		hiddenValue=-1;
		return hiddenValue;
	}
	 return 0;
}


//页面录入的提前还款金额与核心返回的金额比较
function checkMax(value){
	var sumAmount;
	var losAmount;
	var freezeBal;//冻结金额
	if (addDlg2&&addDlg2.iframe.contentDocument) {
		sumAmount = $(addDlg2.iframe.contentDocument.getElementById("dtototaldebtAmount")).val();
		losAmount = $(addDlg2.iframe.contentDocument.getElementById("dtolosAmountText")).val();
		freezeBal = $(addDlg2.iframe.contentDocument.getElementById("dtofreezeBalText")).val();
	} else {
		sumAmount = document.getElementById("dtototaldebtAmount").value;
		losAmount = document.getElementById("dtolosAmountText").value;
		freezeBal = document.getElementById("dtofreezeBalText").value;
	}
	
	var laValues = accSubtr(sumAmount,losAmount);
	var laValuesLast = accSubtr(laValues,freezeBal);
	var toValue = accSubtr(laValuesLast,value);
	if(Number(toValue.replace(/[^\d\.-]/g, "")) < 0){
		hiddenValue=-1;
		return hiddenValue;
	}
	 return 0;
}


//去核心扣款
function coreDeducted(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	var objs = iframe.iframeObj["table"].getSelectedObjs();
	if(objs.length){
			if("06"!=objs[0]["listStat"]){
				jyDialog({"type":"warn"}).alert("请选择成功状态的数据！");
				return;
			}
	}
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"warn"}).alert("请选择待提交的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"warn"}).alert("请选择一条数据！");
		return;
	}
	//如果没有选中 数据则
	jyDialog({"type":"question"}).confirm("您确认要通知核心划扣吗？",function(){
		var url= contextRootPath+"/laTDxretuahea/coreDeducted?ids="+v_ids;
		jyAjax(url,"",function(msg){
			$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
        	var v_status = msg.status;
        	//划款成功后从新加载
        	if(v_status.indexOf('ok') >-1){
        		queryData();
        	}
        	
        });
	 },"确认提示");
	/*if(confirm("您确认要通知核心划扣吗？")){
        var url= contextRootPath+"/laTDxretuahea/coreDeducted?ids="+v_ids;
        		jyAjax(url,"",function(msg){
        			$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
                	var v_status = msg.status;
                	//划款成功后从新加载
                	if(v_status.indexOf('ok') >-1){
                		queryData();
                	}
                	
                });
    }*/
	
	
}

function checkSelect(element){
	var value=element.value;
	var error="字段不能为空";
	if(value==""||value==undefined){
		return error;
	}
}



//减法函数，用来得到精确的减法结果
//说明：javascript的减法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的减法结果。
//调用：accSubtr(arg1,arg2) 
//返回值：arg1减去arg2的精确结果

function accSubtr(arg1,arg2){ 

 var r1,r2,m,n;  
 try {r1=arg1.toString().split( "." )[1].length;} catch (e){r1=0;} 
 try {r2=arg2.toString().split( "." )[1].length;} catch (e){r2=0;} 
 m=Math.pow(10,Math.max(r1,r2)); 
 // 动态控制精度长度
 n=(r1>=r2)?r1:r2;  
 arg1 = arg1.replace(/[^\d\.-]/g, "");   
 arg2 = arg2.replace(/[^\d\.-]/g, "");   

 //alert((Number(arg1)*m-Number(arg2)*m)/m);
 //((arg1*m-arg2*m)/m).toFixed(n)
 return fmoney(((arg1*m-arg2*m)/m).toFixed(n),n); 

}   


function fmoney(s, n)   
{   
   //n = n > 0 && n < = 20 ? n : 2;   
   s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";   
   var l = s.split(".")[0].split("").reverse(),   
   r = s.split(".")[1];   
   t = "";   
   for(i = 0; i < l.length; i ++ )   
   {   
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");   
   }   
   return t.split("").reverse().join("") + "." + r;   
}

//校验月还日前一日&月还日无法提交、新增
function checkRepayDay(repayDay,regDate){
	var day= regDate.substring(regDate.lastIndexOf("-")+1); //当前日期(1-31)
    var month=regDate.substring(regDate.indexOf("-")+1,regDate.lastIndexOf("-"));//月数
    var years=regDate.substring(0,regDate.indexOf("-"));
    if(repayDay=="" || repayDay==null){
    	 return false;
    }
    if(parseInt(repayDay)==1){
    	if(parseInt(repayDay)==parseInt(day)){
    		return true;
    	}
    	if(parseInt(month)==2){
    		var myDate = new Date();
    		var years=myDate.getFullYear(); 
    		if(0==parseInt(years)%4&&((parseInt(years)%100!=0)||(parseInt(years)%400==0))){
    			if( parseInt(day)==29 ){
        			return true;
    	    	}
    			return false;
    		}else{
    			if(parseInt(day)==28 ){
        			return true;
    	    	}
    			return false;
    		}
    		
    	}else if(parseInt(month)==4 ||parseInt(month)==6 ||parseInt(month)==9 ||parseInt(month)==11){
    		if( parseInt(day)==30 ){
    				return true;
		    	}
    		return false;
    	}else{
    			if(parseInt(day)==31){
    				return true;
		    	}
    			return false;
    	 }
    	return false;
    }else{
	    if(parseInt(repayDay)==parseInt(day) ||(parseInt(repayDay)-1)==parseInt(day)){
	    	return true;
        }
	    return false;
    }
}


function checkNotNull(element){
	var value=element.value;
	var error="字段不能为空,请选择";
	if(value==""||value==undefined){
		return error;
	}
}


//上传文件
function toUploadFile(){
	//getValueForIndex("listStat",);
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	var objs = iframe.iframeObj["table"].getSelectedObjs();
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"warn"}).alert("请先选择一条数据！");
		return;
	}
	
//	if(objs.length){
//		if("01"!=objs[0]["listStat"]){
//			jyDialog({"type":"warn"}).alert("请选择初始录入状态的数据！");
//			return;
//		}
//	}
	
	var dialogStruct={
			'display':contextRootPath+'/laTImageBizAss/prepareExecute/toViewUpload?id='+v_ids+"&type=03",
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
//查看附件
function checkUploadFile(v_ids){	
	var dialogStruct={
			'display':contextRootPath+'/laTImageBizAss/prepareExecute/toViewUpload?id='+v_ids+"&type=03",
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
//验证是否上传附件
function checkUpload(objs) {
	var isUpload = false;
  	var  url = contextRootPath+"/laTImageBizAss/checkUpload?listId="+objs[0]["listId"] + "&listType=03";
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


function checkDxretuaheaType(val){
	var dtocurRepayMoney = document.getElementById("dtocurRepayMoney").value;
	var dtolosAmount = document.getElementById("dtolosAmount").value;
	//var dtosumAmt = Number(dtocurRepayMoney)-Number("38176.73");
	var dtosumAmt = accSub(Number(dtocurRepayMoney),Number(dtolosAmount));
	var subamtLimit =document.getElementById("dtosubamtLimit").value;
	if(val == "03"){
		var ascLastAmt = accSub(Number(dtosumAmt),Number(subamtLimit));
		document.getElementById("dtosumAmt").value= dtosumAmt;
		if(ascLastAmt>=0){
			$("#dtosumAmt").attr("readonly", false);
		}else{
			$("#dtosumAmt").attr("readonly", true);
		}
	}else{
		document.getElementById("dtosumAmt").value= "";
		$("#dtosumAmt").attr("readonly", false);
	}
}

//两个浮点数相减
function accSub(num1,num2){
   var r1,r2,m;
   try{
       r1 = num1.toString().split('.')[1].length;
   }catch(e){
       r1 = 0;
   }
   try{
       r2=num2.toString().split(".")[1].length;
   }catch(e){
       r2=0;
   }
   m=Math.pow(10,Math.max(r1,r2));
   n=(r1>=r2)?r1:r2;
   return (Math.round(num1*m-num2*m)/m).toFixed(n);
}
//获取两个时间间的天数
function getDays(strDateStart,strDateEnd){
	   var strSeparator = "-"; //日期分隔符
	   var oDate1;
	   var oDate2;
	   var iDays;
	   oDate1= strDateStart.split(strSeparator);
	   oDate2= strDateEnd.split(strSeparator);
	   var strDateS = new Date(oDate1[0], oDate1[1]-1, oDate1[2]);
	   var strDateE = new Date(oDate2[0], oDate2[1]-1, oDate2[2]);
	  // alert((strDateS - strDateE ) / 1000 / 60 / 60 /24);
	   //alert(strDateS+"----"+strDateE);
	   //iDays = parseInt(Math.abs(strDateS - strDateE ) / 1000 / 60 / 60 /24)//把相差的毫秒数转换为天数 
	   iDays = (strDateS - strDateE ) / 1000 / 60 / 60 /24;
	   //alert(iDays);
	   if(iDays > getMonthRepayLimitDate()){
		  return false;
	   }
	   if(iDays <= 0){
		   return false;
	   }
	   return true;
	}

function getMonthRepayLimitDate(){
	var dtomonthRepayLimitDate;
	if (addDlg2&&addDlg2.iframe.contentDocument) {
		dtomonthRepayLimitDate = $(addDlg2.iframe.contentDocument.getElementById("dtomonthRepayLimitDate")).val();
	} else {
		dtomonthRepayLimitDate = document.getElementById("dtomonthRepayLimitDate").value;
	}
	if('' == dtomonthRepayLimitDate || 'undefined' == dtomonthRepayLimitDate || 'null' == dtomonthRepayLimitDate){
		return 6;
	}else{
		return dtomonthRepayLimitDate;
	}
}


function loadDxretuaheaType(){
	var dtodxretuaheaType = document.getElementById("dtodxretuaheaType").value;
	var dtocurRepayMoney = document.getElementById("dtocurRepayMoney").value;
	var dtolosAmount = document.getElementById("dtolosAmount").value;
	//var dtosumAmt = Number(dtocurRepayMoney)-Number("38176.73");
	var dtosumAmt = accSub(Number(dtocurRepayMoney),Number(dtolosAmount));
	var subamtLimit =document.getElementById("dtosubamtLimit").value;
	if(dtodxretuaheaType == "03"){
		var ascLastAmt = accSub(Number(dtosumAmt),Number(subamtLimit));
		if(ascLastAmt>=0){
			$("#dtosumAmt").attr("readonly", false);
		}else{
			$("#dtosumAmt").attr("readonly", true);
		}
	}
}


var approveDlg;
function batchApprove(title){
	var objs = iframe.iframeObj["table"].getSelectedObjs();
	if(objs.length<1){
		jyDialog({"type":"warn"}).alert("请至少选择一条数据！");
		return;
	}
	var contractIds ="";
	for (var i=0;i<objs.length;i++)
	{
		/*if(i==0){
			contractIds = "'"+objs[i]["contractId"]+"'";
		}else{
			contractIds += ",'"+objs[i]["contractId"]+"'";
		}*/
		
		var v_msg = "";
		var obj = objs[i];
		v_msg = JBPM.common.getOperateTaskStateInfo(obj.TASKID,JS_CUR_LOGIN_USER_ID);
		if(v_msg == null || "" == v_msg){
			if(contractIds ==""){
				contractIds = "'"+objs[i]["contractId"]+"'";
			}else{
				contractIds += ",'"+objs[i]["contractId"]+"'";
			}
		}
	}
	if(contractIds ==""){
		jyDialog({"type":"warn"}).alert("您所选的任务均被他人认领，请选择未认领或您已认领任务。");
		return;
	}
	
	var dialogStruct={
			'display':contextRootPath+'/laTDxretuahea/prepareExecute/toBatchApprovePage?contractIds='+contractIds+'&title='+title,
			'width':1100,
			'height':700,
			'title':'批量'+title+'确认',
			'buttons':[
			  {'name':'nextBtn','text':'批量'+title,'action':catchApproveSub},
			  {'text':'关闭','isClose':true}
			]
		};
	approveDlg=jyDialog(dialogStruct);
	approveDlg.open();
}

function catchApproveSub(){

	var objs=approveDlg.getIframe().getAllData();
	if(objs.length<1){
		jyDialog({"type":"warn"}).alert("请至少选择一条数据！");
		return;
	}
	var optionRemark=$(approveDlg.iframe.contentDocument.getElementById("optionRemarkId")).val();
	var title=$(approveDlg.iframe.contentDocument.getElementById("titleId")).val();
	if(title =="不同意" && (optionRemark ==null || optionRemark=="")){
		jyDialog({"type":"warn"}).alert("审批不同意必须填写审批意见！");
		return;
	}
	jyDialog({"type":"question"}).confirm("您确认要批量审批选择的任务吗？",function(){
		for(var i=0;i<objs.length;i++){
			obj = objs[i];
			v_msg = JBPM.common.getOperateTaskStateInfo(obj.TASKID,JS_CUR_LOGIN_USER_ID);
			if(v_msg == null || "" == v_msg){
				var params = "";
				params = params +"?taskId="+encodeURI(obj.TASKID)+"&processInsId="+encodeURI(obj.CUR_EXE_ID)+"&acitityName="+encodeURI(obj.CUR_ACT_NAME);
				params = params +"&bizInfId="+encodeURI(obj.BIZ_INF_ID)+"&bizTabName="+encodeURI(obj.BIZ_TAB_NAME)+"&bizTabId="+encodeURI(obj.BIZ_TAB_ID);
				params = params +"&bizType="+encodeURI(obj.BIZ_TYPE)+"&lockState="+encodeURI(obj.LOCK_STATE)+"&turnDirection="+encodeURI(title)+"&optionRemark="+encodeURI(optionRemark);
				
				var  url = contextRootPath+"/dojbpm/jbpmDxretuahea/executeReductionWorkflows.do"+params;
				var params = null;
				jyAjax(
						url,
						params,
						function(msg){
							//只要不报错就认为成功
				  	},null,null,false);
			}
		}
		$("").newMsg({"waitTime":3000,"title":"操作提示"}).show("批量审批成功！");
		approveDlg.close();
		queryData();
	},"确认提示");
	/*jyDialog({"type":"question"}).confirm("您确认要批量审批选择的数据吗？",function(){
		var  url = contextRootPath+"/dojbpm/jbpmDxretuahea/executeReductionWorkflows?ids="+v_ids;
		var params = null;
		jyAjax(
				url,
				params,
				function(msg){
					//保存成功后，执行查询页面查询方法
					$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
		        	var v_status = msg.status;
		        	if(v_status.indexOf('ok') >-1){
		        		iframe.iframeObj["table"].removeSelectedRow();
		        	}
		        	//显示剩下数据
		        	queryData();
		  	});
	 },"确认提示");*/
	
}


function deleteHisData(obj){
	
	jyDialog({"type":"question"}).confirm("您确定要删除选择的任务吗？",function(){
		removeById(obj.id);
	},"确认提示");
	
}


