//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogUpdate;

var addDlg1;//添加第一个界面：查询贷前
var addDlg2;//添加第二个界面：添加详情
function toAddData(){
	var dialogStruct={
			'display':contextRootPath+'/aftloanqueryDate/prepareExecute/toQueryBefloanForLoanInfo?function=loanmainDay',
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
		alert("请先选择一条数据！");
		return;
	}
	//如果选择多个 择提示
	if(selectIds.indexOf(",") > -1){
		alert("只能选择一条数据！");
		return;
	}
	
	//tzy add at 2015.11.06 增加抵押贷产品判断
	var intoId = addDlg1.getIframe().getSelectedObjss("intoId");
	var isCarflag = isCarLoan(intoId);
	if(isCarflag=="Y"){
		jyDialog({"type":"warn"}).alert("抵押贷产品不允许还款日变更！");
		return;
	}
	
	var claimKind = addDlg1.getIframe().getClaimKind();
	var selectObj = addDlg1.getIframe().getSelectedObjs();
    var contractSrc=addDlg1.getIframe().getSelectedContractSrc();
    
    //理财人放款不允许还款日变更
    if(contractSrc=="ZJCG"){
    	jyDialog({"type":"warn"}).alert("理财人放款合同不允许还款日变更！");
		return;
    }
    
	//判断合同来源是否有特殊不可新增操作的
	var  url = contextRootPath+"/LaTContractConfigure/queryByserial?typeSerial=06&conSerial="+contractSrc;
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
		 jyDialog({"type":"warn"}).alert("该放款机构不可修改账单日！");
		 return ; 
	}
	
	
	//关闭查询界面
	addDlg1.close();
	//打开新增界面
	var url=contextRootPath+'/laTDloanmainDay/prepareExecute/toAddNext?'+selectObj+'&claimKind='+claimKind;
	var dialogStruct={
			'display':url,
			'width':1100,
			'height':750,
			'title':'新增',
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
	var contractId=$(addDlg2.iframe.contentDocument.getElementById("dtocontractId")).val();
	var loanStatus=$(addDlg2.iframe.contentDocument.getElementById("dtoloanStatus")).val();
	var dtopayoffFlag=$(addDlg2.iframe.contentDocument.getElementById("dtopayoffFlag")).val();
	
	var regDate =$(addDlg2.iframe.contentDocument.getElementById("dtomodifyDate")).val();
	
	var totalTerm=$(addDlg2.iframe.contentDocument.getElementById("dtototalTerm")).val();//贷款总期数
	var loanCurrentPeriod=$(addDlg2.iframe.contentDocument.getElementById("dtoloanCurrentPeriod")).val();//当前贷款期数
	if(contractId =="" || loanStatus ==""){
		jyDialog({"type":"warn"}).alert("请确保数据完整！");
		return;
	}
	//贷款状态
	if(loanStatus != "0"){
		jyDialog({"type":"warn"}).alert("只允许合同状态为正常的合同变更还款日！");
		return ;
	}
	
	if(totalTerm==loanCurrentPeriod){
		jyDialog({"type":"warn"}).alert("该合同当前贷款期次为最后一期，不允许变更还款日！");
		return ;
	}
	
	//判断还款日是否一致
	var dtorepayDay=$(addDlg2.iframe.contentDocument.getElementById("dtorepayDay")).val();//原还款日
	var dtonewrepaymentDay=$(addDlg2.iframe.contentDocument.getElementById("dtonewrepaymentDay")).val(); //新还款日
	
	
	if( checkRepayDay(dtorepayDay,regDate)){
		jyDialog({"type":"warn"}).alert("当前日期为还款日或还款日前一日，不允许新增变更还款日");
		return;
	}
	if(dtorepayDay  == dtonewrepaymentDay ){
		jyDialog({"type":"warn"}).alert("新还款日和原还款日一致，请重新输入！");
		return ;
	}
	

	//序列化 新增页面的form表单数据
	var params=$(addDlg2.iframe.contentDocument.getElementById("addNewsFormData")).serialize();
	var form=addDlg2.iframe.contentDocument.getElementById("addNewsFormData");
	if(checkFormFormat($(form))){
		//var params=$(dialogAdd.iframe.contentDocument.getElementById("addNewsFormData")).serialize();
		var url=contextRootPath+'/laTDloanmainDay/insertLaTDloanmain';
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
	
	var objs = iframe.iframeObj["table"].getSelectedObjs();
	if(objs.length){
		if("01"!=objs[0]["listStat"]){
			jyDialog({"type":"warn"}).alert("请选择初始录入状态的数据！");
			return;
		}
	}
	
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
	
	var dialogStruct={
			'display':contextRootPath+'/laTDloanmainDay/prepareExecute/toUpdate?id='+v_ids,
			'width':900,
			'height':650,
			'title':'修改还款日变更信息',
			'isIframe':'false',
			'buttons':[
             {'text':'保存','action':doUpdateFrom,'isClose':false},
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogUpdate =jyDialog(dialogStruct);
	dialogUpdate.open();
}
//修改页面 的 保存操作
function doUpdateFrom(){
	//序列化 新增页面的form表单数据
	
	var dtoloanStatus = document.getElementById("dtoloanStatus").value;
	var dtopayoffFlag = document.getElementById("dtopayoffFlag").value;
	
	//贷款状态
	if(dtoloanStatus == "02"){
		jyDialog({"type":"warn"}).alert("逾期状态的合同不可修改账单日！");
		return ;
	}
	//结清状态
	if(dtopayoffFlag == "02"){
		jyDialog({"type":"warn"}).alert("结清状态的合同不可修改账单日！");
		return;
	}
	//判断还款日是否一致
	var dtorepayDay=document.getElementById("dtorepaymentDay").value;//原还款日
	var dtonewrepaymentDay=document.getElementById("dtonewrepaymentDay").value; //新还款日
	if(dtorepayDay  == dtonewrepaymentDay ){
		jyDialog({"type":"warn"}).alert("新还款日和原还款日一致，请重新输入！");
		return ;
	}

	var params=$("#updateNewsFormData").serialize();
	var form=document.getElementById("updateNewsFormData");
	if(checkFormFormat($(form))){
		//vvar params=$(dialogAdd.iframe.contentDocument.getElementById("updateNewsFormData")).serialize();
		var url=contextRootPath+'/laTDloanmainDay/updateLaTDloanmain';
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
		jyDialog({"type":"warn"}).alert("红色区域输入有误！");
	}
	
}
//删除 事件
function deleteData(){
	
	var objs = iframe.iframeObj["table"].getSelectedObjs();
	if(objs.length){
		if("01"!=objs[0]["listStat"]){
			jyDialog({"type":"warn"}).alert("请选择初始录入状态的数据！");
			return;
		}
	}
	
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"warn"}).alert("请选择待删除的数据！");
		return;
	}
	jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
		var  url = contextRootPath+"/laTDloanmainDay/deleteLaTDloanmain?ids="+v_ids;
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
		var  url = contextRootPath+"/laTDloanmainDay/deleteLaTDloanmain?ids="+v_ids;
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
			'display':contextRootPath+'/laTDloanmainDay/prepareExecute/toView?id='+vId,
			'width':900,
			'height':650,
			'title':'查看还款日变更明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}

//点击新增页面贷款账号右侧按钮，查询核心数据，并弹出展示数据页面
/*function toQueryCoreData(){
	var dialogStruct={
			'display':contextRootPath+'/laTReduction/prepareExecute/toQueryCore',
			'width':800,
			'height':500,
			'title':'查询核心',
			'isIframe':'false',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
		};
	threePage=jyDialog(dialogStruct);
	threePage.open();
}*/

//提交审批  事件
function submitData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	var objs = iframe.iframeObj["table"].getSelectedObjs();
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
	
	jyDialog({"type":"question"}).confirm("您确认要提交选择的数据吗？",function(){
		$.ajax({
            type:"POST",
            url:contextRootPath+"/dojbpm/jbpmDloanmain/startDloanmainWorkflow?ids="+v_ids,
            success:function(msg){
            	$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
            	var v_status = msg.status;
            	//提交成功后
            	if(v_status.indexOf('ok') >-1){
            		iframe.iframeObj["table"].removeSelectedRow();
            	}
            	
            	
            }
        });
	 },"确认提示");
	/*if(confirm("您确认要提交选择的数据吗？")){
        $.ajax({
            type:"POST",
            url:contextRootPath+"/dojbpm/jbpmDloanmain/startDloanmainWorkflow?ids="+v_ids,
            success:function(msg){
            	$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
            	var v_status = msg.status;
            	//提交成功后
            	if(v_status.indexOf('ok') >-1){
            		iframe.iframeObj["table"].removeSelectedRow();
            	}
            	
            	
            }
        });
    }*/
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
	if( checkRepayDay(objs[0]["repaymentDay"],nowDates)){
		jyDialog({"type":"warn"}).alert("当前日期为还款日或还款日前一日，不允许提交还款日变更！");
		return;
	}
	//?????????
	var url =contextRootPath+"/dojbpm/jbpmDloanmain/startDloanmainWorkflow?nextPartnerId="+$("#dtoparamUserId").val()+"&ids="+v_ids+"&loginUserId="+$("#loginUserId").val();
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
	var error="卡格式输入不正确，请正确输入";
	var value=element.value;
	value=value.trim();
	
	var error2="字段不能为空";
	if(value==""||value==undefined){
		return error2;
	}
	
	element.value=value;
	if((value+"").length<1){
		return;
	}
	var patrn=/^\d{16}|\d{19}$/;
	
	if(!patrn.test(value)){
		//return $(element).attr("extendTitle")+"[<font color='red'>&nbsp;"+hiddenValue+"&nbsp;</font>]";
		return error;
	}
}
 

function checkSelect(element){
	var value=element.value;
	var error="字段不能为空";
	if(value==""||value==undefined){
		return error;
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
	
	/*var objs = iframe.iframeObj["table"].getSelectedObjs();
	if(objs.length){
		if("01"!=objs[0]["listStat"]){
			jyDialog({"type":"warn"}).alert("请选择初始录入状态的数据！");
			return;
		}
	}*/
	
	var dialogStruct={
			'display':contextRootPath+'/laTImageBizAss/prepareExecute/toViewUpload?id='+v_ids+"&type=16",
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