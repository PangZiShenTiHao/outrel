
//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogUpdate;

var addDlg1;//添加第一个界面：查询贷前
var addDlg2;//添加第二个界面：添加详情

function toAddData(){
	var dialogStruct={
			'display':contextRootPath+'/aftloanqueryDate/prepareExecute/toQueryBefloanForLoanInfo?function=loanmain',
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
		jyDialog({"type":"info"}).alert("请先选择一条数据！");
		return;
	}
	//如果选择多个 择提示
	if(selectIds.indexOf(",") > -1){
		jyDialog({"type":"info"}).alert("只能选择一条数据！");
		return;
	}
	var claimKind = addDlg1.getIframe().getClaimKind();
	var selectObj = addDlg1.getIframe().getSelectedObjs();
	//关闭查询界面
	addDlg1.close();
	//打开新增界面
	var url=contextRootPath+'/laTDloanmain/prepareExecute/toAddNext?'+selectObj+'&claimKind='+claimKind;
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
	
    var dtocontractSource=$(addDlg2.iframe.contentDocument.getElementById("dtocontractSource")).val();
	var contractId=$(addDlg2.iframe.contentDocument.getElementById("dtocontractId")).val();
	var loanStatus=$(addDlg2.iframe.contentDocument.getElementById("dtoloanStatus")).val();
	var dtopayoffFlag=$(addDlg2.iframe.contentDocument.getElementById("dtopayoffFlag")).val();
	if(contractId =="" || loanStatus ==""){
		jyDialog({"type":"warn"}).alert("请确保数据完整！");
		return;
	}
	
	//结清状态
	if(dtopayoffFlag == "02"){
		jyDialog({"type":"warn"}).alert("结清不可新增！");
		return;
	}
	
	 var dtooldOpenBankCode = $(addDlg2.iframe.contentDocument.getElementById("dtobankCode")).val();//原开户行名称
	 var dtooldAccName = $(addDlg2.iframe.contentDocument.getElementById("dtoaccountName")).val(); //原账户户名
	 var dtooldBankCardNo = $(addDlg2.iframe.contentDocument.getElementById("dtoaccountNo")).val();  //原银行卡账号
	 
	 var dtonewOpenBankCode = $(addDlg2.iframe.contentDocument.getElementById("dtonewOpenBankCode")).val();//新开户行名称
	 var dtonewAccName =  $(addDlg2.iframe.contentDocument.getElementById("dtonewAccName")).val();  //新账户户名
	 var dtonewBankCardNo =  $(addDlg2.iframe.contentDocument.getElementById("dtonewBankCardNo")).val();//新银行卡账号
	/*if(dtooldOpenBankCode == dtonewOpenBankCode 
			&& dtooldAccName == dtonewAccName 
			&& dtooldBankCardNo == dtonewBankCardNo){
		jyDialog({"type":"warn"}).alert("新修改账户内容和原账户内容一致，请重新输入！");
		return ;
	}*/
	
	var obj = addDlg2.getIframe();
	//序列化 新增页面的form表单数据
	if(!checkIsNull(obj.$("#addNewsFormData"))) return;
	
	var dtonewRepayAcctPhone =  $(addDlg2.iframe.contentDocument.getElementById("dtonewRepayAcctPhone")).val();//新银行卡预留的手机号判断
	if(!checkPhone(dtonewRepayAcctPhone)){
		jyDialog({"type":"warn"}).alert("手机号格式不正确，请重新输入！");
		return ;
	}
	//序列化 新增页面的form表单数据
	var params=$(addDlg2.iframe.contentDocument.getElementById("addNewsFormData")).serialize();
	var form=addDlg2.iframe.contentDocument.getElementById("addNewsFormData");
	if(checkFormFormat($(form))){
		//var params=$(dialogAdd.iframe.contentDocument.getElementById("addNewsFormData")).serialize();
		var url=contextRootPath+'/laTDloanmain/insertLaTDloanmain';
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
			'display':contextRootPath+'/laTDloanmain/prepareExecute/toUpdate?id='+v_ids,
			'width':900,
			'height':650,
			'title':'修改还款账户变更',
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
		jyDialog({"type":"warn"}).alert("逾期不可修改贷款信息维护！");
		return ;
	}
	
	//结清状态
	if(dtopayoffFlag == "02"){
		jyDialog({"type":"warn"}).alert("结清不可修改款信息维护！");
		return;
	}
	//var obj = dialogUpdate.getIframe();
	//序列化 新增页面的form表单数据
	if(!checkIsNull(document.getElementById("updateNewsFormData"))) return;
	
	var dtonewRepayAcctPhone =  document.getElementById("dtonewRepayAcctPhone").value;//新银行卡预留的手机号判断
	if(!checkPhone(dtonewRepayAcctPhone)){
		jyDialog({"type":"warn"}).alert("手机号格式不正确，请重新输入！");
		return ;
	}
	var params=$("#updateNewsFormData").serialize();
	
	var form=document.getElementById("updateNewsFormData");
	if(checkFormFormat($(form))){
		//vvar params=$(dialogAdd.iframe.contentDocument.getElementById("updateNewsFormData")).serialize();
		var url=contextRootPath+'/laTDloanmain/updateLaTDloanmain';
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
		var  url = contextRootPath+"/laTDloanmain/deleteLaTDloanmain?ids="+v_ids;
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
		
		var  url = contextRootPath+"/laTDloanmain/deleteLaTDloanmain?ids="+v_ids;
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
			'display':contextRootPath+'/laTDloanmain/prepareExecute/toView?id='+vId,
			'width':900,
			'height':650,
			'title':'查看还款账户变更明细',
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
function checkPhone(phone){
	var reg = /^0?1[3|4|5|7|8][0-9]\d{8}$/;
	 if (reg.test(phone)) {
	      return true;
	 }else{
	      return false;
	 };
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
	}
	*/
	var dialogStruct={
			'display':contextRootPath+'/laTImageBizAss/prepareExecute/toViewUploads?id='+v_ids+"&type=06",
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

//生成委托扣款授权书
function generateFile(){
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
	var url =contextRootPath+"/laTDloanmain/generateFile?id="+v_ids;
	//通过ajax保存
	jyAjax(
			url,
			'',
			function(msg){
				//保存成功后，执行查询页面查询方法
				$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
	        	var v_status = msg.status;
	        	if(v_status.indexOf('ok') >-1){
	        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
	        		queryData();
	        	}
	  	});
}

//下载委托扣款授权书
function downloadFile(){
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
	var url =contextRootPath+"/laTDloanmain/downloadFile?id="+v_ids;
	var dialogStruct={
			'display':url,
			'width':800,
			'height':800,
			'title':'委托扣款授权书下载',
			'isIframe':'false',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
		};
	
	addDlg1 =jyDialog(dialogStruct);
	addDlg1.open();
}

