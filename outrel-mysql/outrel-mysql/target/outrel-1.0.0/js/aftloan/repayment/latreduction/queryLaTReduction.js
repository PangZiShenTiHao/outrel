//utf-8
//点击新增按钮 事件跳转至 新增页面
//打开查询贷前系统贷款信息列表页面
var dialogUpdate;
var addDlg1;//添加第一个界面：查询贷前
var addDlg2;//添加第二个界面：添加详情
function toAddData(){
	var dialogStruct={
			'display':contextRootPath+'/aftloanqueryDate/prepareExecute/toQueryBefloanForLoanInfo?function=reduction',
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
	var url=contextRootPath+'/laTReduction/prepareExecute/toAddNext?'+selectObj+'&claimKind='+claimKind;
	var dialogStruct={
			'display':url,
			'width':1100,
			'height':750,
			'title':'新增减免信息',
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

//动态计算减免金额合计
function addSerAmount(){
		var addObjs=["dtoredcreditCost","dtoredinfoCost","dtoredconsCost","dtoredPenalty","dtoredpunInterest","dtoredNorBase","dtoredNorNowBase","dtoredOverBase","dtoredNorInst","dtoredNorNowInst","dtoredOverInst"];
		var patrn=/^(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/;
		var totalValue=0;
		for(var i=0;i<addObjs.length;i++){
			var obj;
			if (addDlg2&&addDlg2.iframe.contentDocument) {
				obj=$(addDlg2.iframe.contentDocument.getElementById(addObjs[i]));
			} else {
				obj=$("#"+addObjs[i]);
			}
		
	/*		var v_ele = $("#"+addObjs[i]);
			var hiddenId=$(v_ele).attr("extendId");
			hiddenValue=$("#"+hiddenId).val();
			if(undefined==hiddenValue||(hiddenValue+"").length==0){
				v_ele.val("");
				v_ele.attr('disabled','true');
			
			}*/
			var value = obj.val();
			if(value&&patrn.test(value)&&checkMax(value,obj[0])<0){
					totalValue+=Number(value);
			}
		}
		if (addDlg2&&addDlg2.iframe.contentDocument) {
			$(addDlg2.iframe.contentDocument.getElementById("dtoappRedAmount")).val(totalValue.toFixed(2)); 
		} else {
			$("#dtoappRedAmount").val(totalValue.toFixed(2)); 
		}
}

//1、校验金额合法性 2、审批录入金额与初始录入金额比较大小
function checkAmount(element){
	var error="输入金额格式不对,请输入最多两位小数的正数";
	var error1="最终收回金额小于发放金额，不允许操作"; 
	var error2="欠款总额数据不正确，不允许操作";
	var error3="提前还款金额数据不正确，不允许操作";
	var error4="贷款发放金额数据不正确，不允许操作";
	var error5="已还金额数据不正确，不允许操作";
	var value=element.value;
	value=value.trim();
	element.value=value;
	if((value+"").length<1){
		return;
	}
	
	var patrn=/^(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/;
	if(patrn.test(value)){
		var hiddenValue=checkMax(value,element);
		if(hiddenValue>-1){
			 return $(element).attr("extendTitle")+"[<font color='red'>&nbsp;"+hiddenValue+"&nbsp;</font>]";
		}
	}else{
		return error;
	}
	//------------------------
	//计算减免总金额
	var addObjs=["dtoredcreditCost","dtoredinfoCost","dtoredconsCost","dtoredPenalty","dtoredpunInterest"];//,"dtoredNorBase","dtoredNorNowBase","dtoredOverBase","dtoredNorInst","dtoredNorNowInst","dtoredOverInst"
	var patrn=/^(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/;
	var totalValue=0;
	for(var i=0;i<addObjs.length;i++){
		var obj;
		if (addDlg2&&addDlg2.iframe.contentDocument) {
			obj=$(addDlg2.iframe.contentDocument.getElementById(addObjs[i]));
		} else {
			obj=$("#"+addObjs[i]);
		}
		
		var value = obj.val();
		if(value&&patrn.test(value)&&checkMax(value,obj[0])<0){
				totalValue+=Number(value);
		}
	}
	
	//计算提前结清金额
	var dtototalDebtAmount;//欠款总额
	var dtoprovideAmount;//贷款发放金额
	var dtoYhje;//已还金额
	var dtodeductNorInst;//剩余正常利息
	var losAmount;//挂账
	if (addDlg2&&addDlg2.iframe.contentDocument) {
		dtototalDebtAmount=$(addDlg2.iframe.contentDocument.getElementById("dtototaldebtAmount")).val();
		dtoprovideAmount=$(addDlg2.iframe.contentDocument.getElementById("dtoprovideAmount")).val();
		dtoYhje=$(addDlg2.iframe.contentDocument.getElementById("dtoyhje")).val();
		dtodeductNorInst=$(addDlg2.iframe.contentDocument.getElementById("dtodeductNorInst")).val();
		losAmount=$(addDlg2.iframe.contentDocument.getElementById("dtolosAmount")).val();
	} else {
		dtototalDebtAmount = document.getElementById("dtototaldebtAmount").value;//欠款总额
		dtoprovideAmount =  document.getElementById("dtoprovideAmount").value;//贷款发放金额
		dtoYhje = document.getElementById("dtoyhje").value;//已还金额
		dtodeductNorInst = document.getElementById("dtodeductNorInst").value;//剩余正常利息
		losAmount = document.getElementById("dtolosAmount").value;//挂账
	}
	
	if(dtototalDebtAmount=="undefined" || isNaN(Number(dtototalDebtAmount))){
		return error2;
	}
	if(dtoprovideAmount=="undefined" || isNaN(Number(dtoprovideAmount))){
		return error4;
	}
	if(dtoYhje=="undefined" || isNaN(Number(dtoYhje))){
		return error5;
	}
	
	//提前还款金额=欠款总额-减免总金额-挂帐金额-剩余正常利息
	var listAmount = Number(dtototalDebtAmount) //欠款总额
					- Number(totalValue) //减免总金额
					- Number(losAmount)//挂账
					-Number(dtodeductNorInst)//剩余正常利息
					;
	
	if(listAmount=="undefined" || isNaN(Number(listAmount))){
		return error3;
	}
	//提前结清金额+已还金额+挂账<放款金额
	if (Number(listAmount) + Number(dtoYhje) + Number(losAmount) < Number(dtoprovideAmount)) {
		return error1;
	}
}

/*function checkSelect(element){
	var value=element.value;
	var error="字段不能为空";
	if(value==""||value==undefined){
		return error;
	}
}*/

function checkNotNull(element){
	var value=element.value;
	var error="字段不能为空,请选择";
	if(value==""||value==undefined){
		return error;
	}
}



//新增页面的保存操作
function doAddFrom(){
	var document = addDlg2.getIframe().document;
	var form=document.getElementById("addNewsFormData");
	var dtoloanStatus=document.getElementById("dtoloanStatus").value;
	var dtocontractId=document.getElementById("dtocontractId").value;
	var dtoredKind=document.getElementById("dtoredKind").value;
	var overdueTerm=document.getElementById("dtooverdueTerm").value;
	if(dtoloanStatus==""||dtoloanStatus==undefined || dtocontractId==""||dtocontractId==undefined){
		jyDialog({"type":"warn"}).alert("请输入完整数据!");
		return;
	}
	if (dtoloanStatus!="1") {
		//减免类型为月还减免、贷款状态不是1-逾期，则提示
		jyDialog({"type":"warn"}).alert("仅逾期贷款可发起减免!");
		return;
	}
	if(!checkFormFormat($(form))){
		jyDialog({"type":"warn"}).alert("红色区域输入有误！");
		return;
	}
//	if (overdueTerm != "1") {
//		//减免类型为月还减免、贷款状态不是1-逾期，则提示
//		jyDialog({"type":"warn"}).alert("仅逾期M1贷款可发起月还减免!");
//		return;
//	}
//	if(Number(document.getElementById("dtoappRedAmount").value)>=(Number(document.getElementById("dtopenalty").value)+Number(document.getElementById("dtopunInterest").value))){
//		jyDialog({"type":"warn"}).alert("减免逾期本金、利息、罚息、违约金之和应小于实际罚息与违约金之和!");
//		return;
//	}

	/*if(Number(document.getElementById("dtototalRepayAmount").value)<(Number(document.getElementById("dtodeductNorNowBase").value)+Number(document.getElementById("dtodeductNorNowInst").value))){
		jyDialog({"type":"warn"}).alert("已还总金额应大于当期正常本金与当期正常利息之和!");
		return;
	}*/
	if(document.getElementById("dtoappRedAmount").value==null || document.getElementById("dtoappRedAmount").value=="" || Number(document.getElementById("dtoappRedAmount").value)<=0){
		jyDialog({"type":"warn"}).alert("减免金额不允许为零，请选择输入要减免的金额!");
		return;
	}
	
	if(Number(document.getElementById("dtoappRedAmount").value)>Number(document.getElementById("dtooverdueDebtAmount").value)){
		jyDialog({"type":"warn"}).alert("减免逾期本金、利息、罚息、违约金之和应小于或等于逾期欠款总额!");
		return;
	}
	
	
		//序列化 新增页面的form表单数据
		var params=$(form).serialize();
		var url=contextRootPath+'/laTReduction/insertLaTReduction';
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
	
}

//修改 事件
function toUpdateData(){
	//getValueForIndex("listStat",);
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
		jyDialog({"type":"warn"}).alert("请选择待修改的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"warn"}).alert("请选择一条数据！");
		return;
	}
	
	//alert($("#dtoappRedAmount").val().replace(",","")>=$("#dtooverdueDebtAmount").val().replace(",",""));
	
	var dialogStruct={
			'display':contextRootPath+'/laTReduction/prepareExecute/toUpdate?id='+v_ids,
			'width':1000,
			'height':800,
			'title':'修改减免信息',
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
//	if(Number(document.getElementById("dtoappRedAmount").value)>=(Number(document.getElementById("dtopenalty").value)+Number(document.getElementById("dtopunInterest").value))){
//		jyDialog({"type":"warn"}).alert("减免逾期本金、利息、罚息、违约金之和应小于实际罚息与违约金之和!");
//		return;
//	}
	if(document.getElementById("dtoappRedAmount").value==null || document.getElementById("dtoappRedAmount").value=="" || Number(document.getElementById("dtoappRedAmount").value)<=0){
		jyDialog({"type":"warn"}).alert("减免金额不允许为零，请选择输入要减免的金额!");
		return;
	}
	if(Number(document.getElementById("dtoappRedAmount").value)>Number(document.getElementById("dtooverdueDebtAmount").value)){
		jyDialog({"type":"warn"}).alert("减免逾期本金、利息、罚息、违约金之和应小于逾期欠款总额!");
		return;
	}
	//序列化 新增页面的form表单数据
	var form=document.getElementById("updateNewsFormData");
	if(checkFormFormat($(form))){
		var params=$(form).serialize();
		var url=contextRootPath+'/laTReduction/updateLaTReduction';
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
	var objs = iframe.iframeObj["table"].getSelectedObjs();
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"warn"}).alert("请选择待删除的数据！");
		return;
	}
	
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"warn"}).alert("请选择一条数据！");
		return;
	}
	
	for(var i=0;i<objs.length;i++){
		if("01"!=objs[i]["listStat"]){
			jyDialog({"type":"warn"}).alert("请选择初始录入状态的数据！");
			return;
		}
	}
	jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
		$.ajax({
            type:"POST",
            url:contextRootPath+"/laTReduction/deleteLaTReduction?ids="+v_ids,
            dataType:"json",
            success:function(msg){
            	$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		iframe.iframeObj["table"].removeSelectedRow();
            	}
            }
        });
	},"确认提示");
	/*if(confirm("您确认要删除选择的数据吗？")){
        $.ajax({
            type:"POST",
            url:contextRootPath+"/laTReduction/deleteLaTReduction?ids="+v_ids,
            dataType:"json",
            success:function(msg){
            	$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		iframe.iframeObj["table"].removeSelectedRow();
            	}
            }
        });
    }*/
}
//查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/laTReduction/prepareExecute/toView?id='+vId,
			'width':1000,
			'height':800,
			'title':'查看减免信息明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}

//点击新增页面贷款账号右侧按钮，查询核心数据，并弹出展示数据页面
/*var threePage;
function toQueryCoreData(){
	var dialogStruct={
			'display':contextRootPath+'/laTReduction/prepareExecute/toQueryCore',
			'width':800,
			'height':500,
			'title':'查询核心',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
		};
	threePage=jyDialog(dialogStruct);
	threePage.open();
}*/



//提交审批  事件  test
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
	            url:contextRootPath+"/dojbpm/jbpmReduction/startReductionWorkflow?ids="+v_ids,
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
            url:contextRootPath+"/dojbpm/jbpmReduction/startReductionWorkflow?ids="+v_ids,
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
	//?????????
	var v_url =contextRootPath+"/dojbpm/jbpmReductionApp/startReductionAppWorkflow?nextPartnerId="+$("#dtoparamUserId").val()+"&ids="+v_ids+"&loginUserId="+$("#loginUserId").val();
	jyDialog({"type":"question"}).confirm("您确认要提交选择的数据吗？",function(){
		$.ajax({
			type:"POST",
			url:v_url,
			dataType:"json",
			success:function(msg){
				$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
				var v_status = msg.status;
				//提交成功后
				if(v_status.indexOf('ok') >-1){
					queryData();
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
				//提交成功后
				if(v_status.indexOf('ok') >-1){
					queryData();
				}
				
				
			}
		});
	}*/
}


//上传文件
/*function toUploadFile(){
	//getValueForIndex("listStat",);
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
		jyDialog({"type":"warn"}).alert("请选择待修改的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"warn"}).alert("请选择一条数据！");
		return;
	}
	
	var dialogStruct={
			'display':contextRootPath+'/laTImageBizAss/prepareExecute/toUpload?id='+v_ids,
			'width':1000,
			'height':800,
			'title':'上传',
			'isIframe':'false',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogUpdate =jyDialog(dialogStruct);
	dialogUpdate.open();
}*/

//设置减免项是否可用
function setItemDisabledByFunc() {
	var contractStatus = $("#dtoloanStatus").val(); 
	var dtoredKind = $("#dtoredKind").val(); 
	$("#dtoredNorBase").attr("disabled", true);
	$("#dtoredNorNowBase").attr("disabled", true);
	$("#dtoredNorInst").attr("disabled", true);
	$("#dtoredNorNowInst").attr("disabled", true);
	$("#dtoredinfoCost").attr("disabled", true);
	$("#dtoredcreditCost").attr("disabled", true);
	$("#dtoredconsCost").attr("disabled", true);
	
	$("#dtoredPenalty").attr("disabled", true);//违约金
	$("#dtoredpunInterest").attr("disabled", true);//罚息
	$("#dtoredOverBase").attr("disabled", true);//逾期本金
	$("#dtoredOverInst").attr("disabled", true);//逾期利息
	/*if (dtoredKind == "01") {
		//01月还减免，1-逾期： 可减免项目为[罚息、违约金]
		//$("#dtoredOverBase").attr("disabled", false);dtoredPenalty  dtopunInterest
		//$("#dtoredOverInst").attr("disabled", false);
	}else if(dtoredKind == "06"){//车贷产品
		 //判断是否为抵押贷产品
	    var intoAppid = document.getElementById("dtointoAppId").value;
	    var isCarflag = isCarLoan(intoAppid);
		if(isCarflag=="Y"){
			$("#dtoredOverBase").attr("disabled", true);
			$("#dtoredOverInst").attr("disabled", true);
		}else{
			$("#dtoredOverBase").attr("disabled", false);
			$("#dtoredOverInst").attr("disabled", false);
		}
	}*/
	$("#dtoredinfoCost").val("");//合同减免金额
}


/* 展期减免、月还减免：仅逾期贷款可发起月还减免，展期减免
   	展期可减免项目为罚息和违约金，减免金额<=罚息+违约金 
   	月还可减免项目为罚息和违约金、逾期本金、逾期利息，减免金额<=罚息+违约金+逾期本金+逾期利息 
   */
function checkRedKind(val){
	//判断是否为抵押贷产品
    var intoAppid = document.getElementById("dtointoAppId").value;
    var isCarflag = isCarLoan(intoAppid);
    var map = {};
    map['1'] = "逾期减免";
    map['2'] = "存居间人账号";
    map['3'] = "系统原因";
    map['4'] = "展期减免";
    map['5'] = "其他";
    
	if (val == "01") {
		$("#dtoredPenalty").attr("disabled", false);//违约金
		$("#dtoredpunInterest").attr("disabled", false);//罚息
		$("#dtoredOverBase").attr("disabled", false);//逾期本金
		$("#dtoredOverInst").attr("disabled", false);//逾期利息
		//先删除减免原因选择然后添加
		$('#dtoreductionReason option').each(function(){
			if($(this).val() != ''){
				$(this).remove();
			}
		});
		for(var prop in map){
		    if(map.hasOwnProperty(prop)){
		    	if(prop !="4"){
		    		$("#dtoreductionReason").append("<option value='"+prop+"'>"+map[prop]+"</option>");
		    	}
		    }
		}
		
		//$("#dtoreductionReason option[value='4']").remove();//删除索引值为0的Option
	}else if(val == "06"){//车贷产品
		if(isCarflag=="Y"){
			$("#dtoredPenalty").attr("disabled", false);//违约金
			$("#dtoredpunInterest").attr("disabled", false);//罚息
			$("#dtoredOverBase").attr("disabled", true);
			$("#dtoredOverInst").attr("disabled", true);
			var allTerm=document.getElementById("dtototalTerm").value;
			var nowTerm=document.getElementById("dtoloanCurrentPeriod").value;
			if(allTerm != nowTerm){
				$('#dtoredKind option[value=""]').attr("selected",true);
				jyDialog({"type":"warn"}).alert("抵押贷合同，只允许最后一期进行展期减免！");
			}
			
			//先删除减免原因选择然后添加
			$('#dtoreductionReason option').each(function(){
				if($(this).val() != ''){
					$(this).remove();
				}
			});
			for(var prop in map){
			    if(map.hasOwnProperty(prop)){
			    	if(prop =="4"){
			    		$("#dtoreductionReason").append("<option value='"+prop+"'>"+map[prop]+"</option>");
			    	}
			    }
			}
			
		}else{
			$('#dtoredKind option[value=""]').attr("selected",true);
			jyDialog({"type":"warn"}).alert("该合同为非抵押贷合同，不允许选择展期减免，请重新选择减免类型！");
		}
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
			'display':contextRootPath+'/laTImageBizAss/prepareExecute/toViewUpload?id='+v_ids+"&type=05",
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
			'display':contextRootPath+'/laTImageBizAss/prepareExecute/toViewUpload?id='+v_ids+"&type=05",
			'width':1100,
			'height':800,
			'title':'附件查看',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogUpdate =jyDialog(dialogStruct);
	dialogUpdate.open();
}

function checkUpload(objs) {
	var isUpload = false;
  	var  url = contextRootPath+"/laTImageBizAss/checkUpload?listId="+objs[0]["listId"] + "&listType=05";
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

function toRevocation(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	var objs = iframe.iframeObj["table"].getSelectedObjs();
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"warn"}).alert("请选择待撤销的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"warn"}).alert("请选择一条数据！");
		return;
	}
	if(objs.length){
		if("06"!=objs[0]["listStat"]){
			jyDialog({"type":"warn"}).alert("请选择成功状态的数据进行撤销操作！");
			return;
		}
		if("06"!=objs[0]["redKind"]){
			jyDialog({"type":"warn"}).alert("请选择减免类型为【展期减免】的数据进行撤销操作！");
			return;
		}
	}
	
	jyDialog({"type":"question"}).confirm("您确认要撤销选择的数据吗？",function(){
		 $.ajax({
	            type:"POST",
	            url:contextRootPath+'/laTReduction/revocationLaTReduction?id='+v_ids,
	            dataType:"json",
	            success:function(msg){
	            	$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
	            	var v_status = msg.status;
	            	//提交成功后
	            	if(v_status.indexOf('ok') >-1){
	            		queryData();
	            	}
	            }
	        });
	},"确认提示");
}


