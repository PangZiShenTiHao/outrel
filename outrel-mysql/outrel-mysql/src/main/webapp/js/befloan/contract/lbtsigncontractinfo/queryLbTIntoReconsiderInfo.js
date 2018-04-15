var dialogAdd;


/*//查看明细
function viewData(vId){
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
}*/
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

//手动发起客户复议流程操作,使用原来的弹出层
function startReconsider(vid,custName,cusCard){
	
	var dialogStruct={
			'display':contextRootPath+'/lbTReconsideration/prepareExecute/toAdd?id='+vid+'&custName='+encodeURI(custName)+'&cusCard='+cusCard,
			'width':850,
			'height':520,
			'title':'客户复议申请',
			'isIframe':'false',
			'buttons':[
            {'text':'保存','action':subTask,'isClose':false},
            {'text':'关闭','isClose':true}
			]
	};
	
	dialogAdd =jyDialog(dialogStruct);
	dialogAdd.open();
}
//表单验证
function checkInto() {
	var forms=["addNewsFormData"];
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

function subTask(){
	//序列化 新增页面的form表单数据
	if(checkInto()){
		var v_result = $("#dtooldAuditResult").val();
		var v_oldPro = $("#dtooldProductType").val();
		var v_newPro = $("#dtonewProductType").val();
		var v_oldPeriod = $("#dtooldApprPeriod").val();
		var v_newPeriod = $("#dtonewApprPeriod").val();
		var v_oldMoney = $("#dtooldApprAmount").val();
		var v_newMoney = $("#dtonewApprAmount").val();
		var v_oldWay = $("#DtooldRepaymentId").val();
		var v_newWay = $("#dtonewRepaymentWay").val();
		
		if(v_result == '3100' || v_result == '3200'){//审核结果：同意或有条件同意
			//首先判断产品是否发生变化
			if(v_oldPro == v_newPro ){
				/*if(v_oldPeriod*1 < v_newPeriod*1 || v_oldMoney*1<v_newMoney*1 || v_oldWay != v_newWay){
					//可以发起复议
					//startFlow();
					addReconInfo();
				}else{
					$("").newMsg({}).show("不符合发起客户复议的规则！");
					return;
				}*/
				addReconInfo();
			}else{
				//可以发起复议
				//startFlow();
				addReconInfo();
			}
			
		}else{
			//可以发起复议
			//startFlow();
			addReconInfo();
		}
		
	}else{
		$("").newMsg({}).show("请输入相关合法的数据！");
		return;
	}
	
}
//新增 数据到 客户复议表
function addReconInfo(){
	var v_meg=getEsbContractSignMoney();
	if(v_meg!="1"){
		$("").newMsg({}).show(v_meg);
		return false;
	}
	var params=$("#addNewsFormData").serialize();
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
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		//closeWindow();
        		dialogAdd.close();
        		queryData();
        	}
  	});
}
/*
//发起复议流程
function startFlow(){
	
	//var params=$("#addNewsFormData").serialize();
	//var v_nextPartnerId =$("#dtoparamUserId").val();
	var v_nextPartnerId ="";
	var v_processKey= "reconsiderationKey";
	var url=contextRootPath+'/dojbpm/jbpmReconsideration/startReconsiderationWorkflow?nextPartnerId='+v_nextPartnerId+'&processKey='+v_processKey;
	//通过ajax保存
	jyAjax(
		url,
		'',
		function(msg){
			//新增成功后，
			$("").newMsg({}).show(msg.msg);
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		//closeWindow();
        		dialogAdd.close();
        		queryData();
        	}
  	});
}
*/
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

//查询产品的最大审批金额 复议
function getIntoMaxApprAmountRecon(obj){
	var intoId = $("#dtointoAppId").val();//进件编号
	var auditAmount=$("#dtonewApprAmount").val().trim();
	if(auditAmount!=""&&isNaN(auditAmount)){
		$("#dtonewApprAmount").val('');
		$("#dtonewApprAmount").focus();
    return false;
	}else if(auditAmount==""){
		//calculateRate(obj);计算费率总函数
		$("#dtonewApprAmount").val('');
		$("#dtonewApprAmount").focus();
		return false;
	}
	
	var url = contextRootPath + '/lbTIntoAuditResult/getIntoMaxApprAmountByIntoId'; 
	var params="intoId="+intoId+"&auditAmount="+$("#dtonewApprAmount").val();
	jyAjax(url, params, function(msg) {
		
		var result = msg.msg;
		if(result == 'no'){
			$("").newMsg({}).show("审批额度应在"+msg.data.intoProductInfo.loanLimitProp.minValue+"和"+msg.data.intoProductInfo.loanLimitProp.maxValue+"范围内！");
			$("#dtonewApprAmount").val("");
			result = false;
		}else{
			//calculateRate(obj);
		}
	},"","",false);  
}
//判断审批金额是否在该产品的金额范围内
function getMoneyScopeRecon(obj){
	
	var v_max = $("#"+obj).attr('maxValue');
	var v_min = $("#"+obj).attr('minValue');
	var v_money = $("#"+obj).val();
	
	if(( v_money*1 < v_min*1) || (v_money*1 > v_max*1)){
		$("").newMsg({}).show("审批额度应在"+v_min+"和"+v_max+"范围内！");
		$("#"+obj).val('');
	}
	
}
//初始化 产品的贷款期限\还款方式 数据 （复议阶段）
function initialProductInfoRecon(type){
	var url = contextRootPath + '/lbTIntoAuditResult/getProductInfoByProductCode'; 
	var params="productCode="+$("#dtonewProductType").val()+"&type="+type+"&intoId="+$("#dtointoAppId").val();
	
	var v_oldApprPeriod = $("#dtooldApprPeriod").val();//贷款期限
	var v_pepaymentWay = $("#dtooldRepaymentWay").val();//还款方式
	//通过ajax保存
	jyAjax(url, params, function(msg) {
		if(msg.data){
			//总和费率
			//$("#dtocomprehensiveRate").val(msg.data.productInfoDTO.serviceRateProp.defaultValue);
          var proctYear=msg.data.productInfoDTO.loanPeriods;
          var payMethod=msg.data.productInfoDTO.repaymentWayList;
          $("#dtonewApprAmount").attr('minValue',msg.data.productInfoDTO.loanLimitProp.minValue);
          $("#dtonewApprAmount").attr('maxValue',msg.data.productInfoDTO.loanLimitProp.maxValue);
          
          $("#auditPeriodId").html('');
          if(proctYear){//贷款期限
          	proctYear=proctYear.split(",");
          	var selStr=['<select id="dtonewApprPeriod" name="newApprPeriod"  >'];
          	for(var i=0;i<proctYear.length;i++){
          		if(proctYear[i] == v_oldApprPeriod ){
          			selStr.push('<option selected=selected value="'+proctYear[i]+'">'+proctYear[i]+'</option>')
          		}else{
          			selStr.push('<option value="'+proctYear[i]+'">'+proctYear[i]+'</option>')
          		}
          		
          	}
          	selStr.push("</select>");
          	$("#auditPeriodId").html(selStr.join());
          }
          $("#apprPepaymentWay").html('');
          if(payMethod){//还款方式
          	var paystr=['<select id="dtonewRepaymentWay" name="newRepaymentWay"  >'];
          	for(var j=0;j<payMethod.length;j++){
          		if(payMethod[j].DICVALUE == v_pepaymentWay){
          			paystr.push('<option selected=selected value="'+payMethod[j].DICVALUE+'">'+payMethod[j].DICNAME+'</option>')
          		}else{
          			paystr.push('<option value="'+payMethod[j].DICVALUE+'">'+payMethod[j].DICNAME+'</option>')
          		}
          		
          	}
          	paystr.push("</select>");
          	$("#apprPepaymentWay").html(paystr.join());
          }
		}
	},"","",false);  
}


//更换产品信息,从核心获取产品明细 (复议阶段)
function changeProductInfoRecon(type){
	var url = contextRootPath + '/lbTIntoAuditResult/getProductInfoByProductCode'; 
	var params="productCode="+$("#dtonewProductType").val()+"&type="+type+"&intoId="+$("#dtointoAppId").val();
	//通过ajax保存
	jyAjax(url, params, function(msg) {
		if(msg.data){
			//总和费率
			//$("#dtocomprehensiveRate").val(msg.data.productInfoDTO.serviceRateProp.defaultValue);
          var proctYear=msg.data.productInfoDTO.loanPeriods;
          var payMethod=msg.data.productInfoDTO.repaymentWayList;
          $("#dtonewApprAmount").attr('minValue',msg.data.productInfoDTO.loanLimitProp.minValue);
          $("#dtonewApprAmount").attr('maxValue',msg.data.productInfoDTO.loanLimitProp.maxValue);
          if(proctYear){//贷款期限
          	proctYear=proctYear.split(",");
          	var selStr=['<select id="dtonewApprPeriod" name="newApprPeriod"  >'];
          	for(var i=0;i<proctYear.length;i++){
          		selStr.push('<option value="'+proctYear[i]+'">'+proctYear[i]+'</option>')
          	}
          	selStr.push("</select>");
          	$("#auditPeriodId").html(selStr.join());
          }
          
          if(payMethod){//还款方式
          	var paystr=['<select id="apprPepaymentWay" name="apprPepaymentWay"  >'];
          	for(var j=0;j<payMethod.length;j++){
          		paystr.push('<option value="'+payMethod[j].DICVALUE+'">'+payMethod[j].DICNAME+'</option>')
          	}
          	paystr.push("</select>");
          	$("#apprPepaymentWay").html(paystr.join());
          }
		}
	},"","",false);  
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
//点击新增按钮 事件跳转至 新增页面
function toUploadIntoAttachmentRecon(){
	var v_objs=getObjs("请选择待上传附件的数据！");
	if(!v_objs){
		return;
	}
	var v_ids=v_objs.id;
	var v_prodpType=v_objs.signProductType;
	var parentTitle=getActiveTabTitle();
	var title="上传附件("+v_ids+")";
	
	//URL中添加&isHiddenDelPic=Y，用于判断是否隐藏删除附件图片按钮，URL指向的页面复用较多，这里只修改 发起客户复议 功能进入的部分
	//updSource=FY,用于判断复议中是否上传影响资料，这里标识是复议进入
	var url=contextRootPath+'/lbTIntoInfo/prepareExecute/uploadIntoAttachment?id='+v_ids+"&appProductType="+v_prodpType+'&tabTitle='+title+'&parentTitle='+parentTitle + '&isHiddenDelPic=Y&updSource=FY';

	var obj = {
			"title" : title,
			"url" : url,
			"closeFun":function(obj,closeFun){
				flushTab(parentTitle);
				closeFun();
			}
	};
	window.top.tabs.add(obj);
}
//获取当前活动tab的标题
function getActiveTabTitle() {
	return window.top.tabs.getActiveObj().title;
}

//刷新指定的tab(按照tab标题)
function flushTab(tabTitle) {
	var winObj=window.top.tabs.getTabWinByTitle(tabTitle);
	if(winObj){
		winObj.queryData();
	}
}

//发起客户复议流程
function startFlow(intoId){
	jyDialog().confirm("您确定要提交吗？", function(){
		var v_nextPartnerId ="";
		var v_processKey= "reconsiderationKey";//废弃，processKey在Java类里写的，这里传值不用了
		var url=contextRootPath+'/dojbpm/jbpmReconsideration/startReconsiderationWorkflow?nextPartnerId='+v_nextPartnerId+'&processKey='+v_processKey+'&intoId='+intoId;
		var param = '';
		jyAjax(url,param,function(msg){
			$("").newMsg({}).show(msg.msg);
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		//closeWindow();
        		//dialogAdd.close();
        		queryData();
        	}
		},"","",false);
	});
}

/**
 * 调用主数据接口,查询合同金额(只用于信贷产品)
 */
function getEsbContractSignMoney(v_meg){
		var productType=$("#dtonewProductType").val();//产品类型
		if(!productType){
			v_meg="产品类型不能为空";
		}
		var auditAmount=$("#dtonewApprAmount").val().replace(",","");//审批额度 
		if(!auditAmount || auditAmount==""){
			v_meg="请输入审批额度";
		}
		var loanPeriod=$("#dtonewApprPeriod").val();//贷款期限
		if(!loanPeriod){
			v_meg="请选择贷款期限";
		}
		var apprPepaymentWay=$("#dtonewRepaymentWay").val();
		if(!apprPepaymentWay){
			v_meg="请选择还款方式";
		}
		if(v_meg){
			$("").newMsg({}).show(v_meg);
			return v_meg;
		}
		var url = contextRootPath + '/lbTIntoAuditResult/queryEsbContractSignMoney?intoAppId='+$("#dtointoAppId").val()+'&auditAmount='+auditAmount+'&loanPeriod='+loanPeriod+'&apprPepaymentWay='+apprPepaymentWay+'&productType='+productType+'&comprehensiveRate=0'; 
		//通过ajax保存
		jyAjax(url,"",function(msg){
			var v_status = msg.status;
			var msgInfo=msg.msg;
			if(v_status.indexOf('ok') >-1){
				if(msgInfo=='creditLoan'){
					var signMoney=msg.data;
					if(parseFloat(signMoney)>parseFloat(200000)){
						$("label[id='numtochmoney']").attr("style","color:red");
						$("label[id='numtochmoney']").html("新审核金额的合同金额超过20万");
						v_meg="该客户贷款的合同金额超过20万!";
						return v_meg;
					}else{
						$("label[id='numtochmoney']").attr("style","");
						$("label[id='numtochmoney']").html("");
						v_meg="1";
					}
				}else if(msgInfo=='mortgageLoan'){//抵押贷
					v_meg="1";
				}else{
					$("").newMsg({}).show(msgInfo);
					return msgInfo;
				}
			}else{
				$("").newMsg({}).show(msgInfo);
				return msgInfo;
			}
		},"","",false);
	
	return v_meg;
}