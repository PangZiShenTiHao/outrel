function doAddFrom(successFun){
	//获取所有表格数据
	var allDatas = revolving_credit_table.getAllData();
	//获取选择的数据
	var obj = [];
	//正常状态合同的数目
	var normalLoanCount = 0;
	//筛选出已勾选的数据
	if(allDatas.length>0){
		for(var i=0;i<allDatas.length;i++){
			var data=allDatas[i];
			if(data["loanStatus"] =="09"){
				if(data["remark"]=="1"){
					obj.push(data);
				}
				normalLoanCount++;
			}
		}
	}
	var jsonStr = jyTools.parseJson2String(obj);
	var params = [];
	params.push('revolvingCreditJson='+jsonStr);
	params.push('prodId='+$("#prodId").val());
	params.push('custId='+$("#custId").val());
	params.push('intoId='+$("#intoId").val());
	params.push('dataCount='+normalLoanCount);
	params.push('processInsId=' + $("#processInsId",window.parent.document).val());
	params.push('productType=' + $("#dtoproductType").val());
	params.push('auditAmount='+$("#dtoauditAmount").val().replace(/,/g,""));
	params.push('loanPeriod='+$("#dtoloanPeriod").val());
	params.push('apprPepaymentWay=' + $("#apprPepaymentWay").val());
	var url = contextRootPath+'/lbTLooploanRef/insertLbTLooploanRef';
	jyAjax(url,params.join("&"),function(msg){
		var v_status = msg.status;
		if(v_status.indexOf('no') >-1){
			window.top.showMessage(msg.msg,3000);
		}else if(successFun!=undefined){//如果流程进行保存不弹出保存成功提示，
			successFun(); 
		}else{//点击保存按钮保存弹出提示
			window.top.showMessage(msg.msg,3000);
		}
	});
}

//判断是否进行过"重新评分"
function isReGetScore(){
	var url = contextRootPath + '/lbTCardScoreDetail/identifyScoreTimes';
	var params = "intoId="+$("#intoId").val()+"&prodId="+$("#prodId").val();
	jyAjax(url,params,function(msg){
		var data = msg.data;
		document.getElementById('status').value=""+data; 
	},"","",false);
}

function reGetScore(){
	var url = contextRootPath + '/lbTCardScoreDetail/compute';
	var params = "prodId=" + $("#prodId").val()+"&custId="+$("#custId").val()+"&intoId="+$("#intoId").val()+"&times=2"+"&intoCustRefId="+$("#intoCustRefId").val();
	//通过ajax重新评分
	jyAjax(url, params, function(msg) {
		var datas=msg.data;
		for(var i=0;i<datas.length;i++){
			if(datas[i]["scoreLevel"]!=null||datas[i]["scoreLevel"]!=""){
				window.document.getElementById ("scoreLevel"+i).innerHTML =datas[i]["scoreLevel"]
			}else if(datas[i]["scoreLevel"]==null||datas[i]["scoreLevel"]==""){
				window.document.getElementById ("scoreLevel"+i).innerHTML =" ";
			}	
			if(i==1){
				if(datas[i]["approveLoan"]!=null||datas[i]["approveLoan"]!=""){
					window.document.getElementById ("approveLoan").innerHTML =datas[i]["approveLoan"]
				}else if(datas[i]["approveLoan"]==null||datas[i]["approveLoan"]==""){
					window.document.getElementById ("approveLoan").innerHTML =" ";
				}	      
				if(datas[i]["approveNumber"]!=null||datas[i]["approveNumber"]!=""){
					window.document.getElementById ("approveNumber").innerHTML =datas[i]["approveNumber"]
				}else if(datas[i]["approveNumber"]==null||datas[i]["approveNumber"]==""){
					window.document.getElementById ("approveNumber").innerHTML =" ";
				}	
				if(datas[i]["sugMoneyMemo"]!=null||datas[i]["sugMoneyMemo"]!=""){
					window.document.getElementById ("sugMoneyMemo").innerHTML =datas[i]["sugMoneyMemo"]
				}else if(datas[i]["sugMoneyMemo"]==null||datas[i]["sugMoneyMemo"]==""){
					window.document.getElementById ("sugMoneyMemo").innerHTML =" ";
				}	 
				if(datas[i]["sugNumberMemo"]!=null||datas[i]["sugNumberMemo"]!=""){
					window.document.getElementById ("sugNumberMemo").innerHTML =datas[i]["sugNumberMemo"]
				}else if(datas[i]["sugNumberMemo"]==null||datas[i]["sugNumberMemo"]==""){
					window.document.getElementById ("sugNumberMemo").innerHTML =" ";
				}
				var scoreLevel2 = datas[i]["scoreLevel"];
				if(scoreLevel2=='N'&&(datas[i]["missColumns"]!=null||datas[i]["missColumns"]!="")){
					$("#missColumnstr").attr("style","display:' '");
					window.document.getElementById ("missColumns").innerHTML =datas[i]["missColumns"];
				}else{
					$("#missColumnstr").attr("style","display:none");
			    }
		   }
			   
		   
		}
		//判断是否进行过"重新评分"
		isReGetScore();
	});
}

/**
 *填加伸缩事件
 **/
function expandToggle(){
	$("#formSwap1").bind("click",function(ev){
		var obj=ev.srcElement || ev.target;
		var endObj=$(obj);
		var nextObj=endObj.parent().next();
		if(obj.tagName=="SPAN"&&endObj.hasClass("expandBtn")){
			if(endObj.hasClass("expandOver")){
				endObj.removeClass("expandOver");
				nextObj.show("blind");
			}else{
				endObj.addClass("expandOver");
				nextObj.hide("blind");
			}
		}
	});
}
/**
 * 切换审批结论相对字段进行展示控制(复议单独使用)
 * @param val
 */

var v_arr = ["dtoproductType","dtoagreeCode","dtocustClassify","dtoauditAmount","dtoloanPeriod","dtocheckIncome","apprPepaymentWay","dtomonthrepament",
             "dtodebetratio","dtointdebetratio","dtocomprehensiveRate","dtoinnerReviews","dtoouterRemark","dtoagreeCondition","dtooneRefuseReason","dtotwoRefuseReason"];

function hideToggleRecon(val) {
	if(val == "" || val == "3100" ) {//同意
		$(".passTR").removeClass("hid");
		$(".rejectTR").addClass("hid");
		$(".passByFiletTR").addClass("hid");
		//更换产品信息(主要考虑到从拒绝等切回同意，总和费率不显示问题)
		//changeProductInfo();
		//是否需要验证表单
		isValidate(val);
	}else if(val == "3200"){//有条件同意
		$(".passTR").removeClass("hid");
		$(".rejectTR").addClass("hid");
		$(".passByFiletTR").removeClass("hid");
		//更换产品信息
		//changeProductInfo();
		isValidate(val);
	} else if( val == "3500" || val == "3350") {//复议审核拒绝
		$(".passTR").addClass("hid");
		$(".rejectTR").removeClass("hid");
		$(".passByFiletTR").addClass("hid");
		isValidate(val);
	}else if(val == "3300"){// 维持终审意见
		getFinalAuditInfo(val,'1000',$("#intoId").val())//查询信审审核终审信息
		isValidate(val);
	} else {
		$(".passTR").addClass("hid");//隐藏 通过代码、期限、额度
		$(".rejectTR").removeClass("hid");//一级拒贷、二级拒贷
		$(".passByFiletTR").addClass("hid");//通过条件
		isValidate(val);
	}
	if(!(val == "3300")){
		cancelFormReadOnly(v_arr);
		$("#finalAuditConclusion").val("");//将隐藏终审审批结论字段置空
		//是否展示产品分级
		isShowProClassfy($("#dtoproductType").val(),$("#intoId").val());
	}
	querySecondRefuseReasons();
	$("#auditResult").val(val);
	
	window.parent.changeBtns(val);
}

/**
 * 切换审批结论相对字段进行展示控制
 * @param val
 */
function hideToggle(val) {
	if(val == "" || val == "3100" ) {
		$(".passTR").removeClass("hid");
		$(".rejectTR").addClass("hid");
		$(".passByFiletTR").addClass("hid");
		//更换产品信息(主要考虑到从拒绝等切回同意，总和费率不显示问题)
		//changeProductInfo();
		//是否需要验证表单
		isValidate(val);
	}else if(val == "3200"){
		$(".passTR").removeClass("hid");
		$(".rejectTR").addClass("hid");
		$(".passByFiletTR").removeClass("hid");
		//更换产品信息
		//changeProductInfo();
		isValidate(val);
	} else if(val == "3300" || val == "3400") {
		$(".passTR").addClass("hid");
		$(".rejectTR").removeClass("hid");
		$(".passByFiletTR").addClass("hid");
		isValidate(val);
	} else {
		$(".passTR").addClass("hid");
		$(".rejectTR").removeClass("hid");
		$(".passByFiletTR").addClass("hid");
		isValidate(val);
	}
	querySecondRefuseReasons();
	$("#auditResult").val(val);
	
	window.parent.changeBtns(val);
}


//根据"一级拒贷原因 "，级联"二级拒贷原因 "
function querySecondRefuseReasons(){
	$("#dtooneRefuseReason").downLink({"linkObj":"dtotwoRefuseReason","defaultValue":$("#twoRefuse").val(),"type":"funAsync","linkFun":function(objValue,fun){
		var url= contextRootPath+"/lbTIntoAuditResult/querySecondRefuseReasonsList?refuseCode="+objValue+"&prodId="+$("#dtoproductType").val();
		jyAjax(url,"",function(msg){
			var datas=msg.data;
			if(datas!=null){
				for(var i=0;i<datas.length;i++){
					datas[i]["text"]=datas[i]["refuseReason"];
					datas[i]["value"]=datas[i]["refuseCode"];
				}
				fun(datas);
				checkAuditConclusion();
			}
		}) 
	}});	
}


//选择不同审批意见时相关的字段不进行验证
var agree_map ={"dtoagreeCode":"通过代码 ","dtoauditAmount":"审批额度","dtoloanPeriod":"贷款期限  ","dtocheckIncome":"核实收入","apprPepaymentWay":"还款方式 "}
var condition_agree_map ={"dtoagreeCode":"通过代码 ","dtoauditAmount":"审批额度","dtoloanPeriod":"贷款期限","dtocheckIncome":"核实收入","apprPepaymentWay":"还款方式 ","dtoagreeCondition":"通过条件"}
var refuse_map ={"dtooneRefuseReason":"一级拒贷原因","dtotwoRefuseReason":"二级拒贷原因"}

function isValidate(value) {
	if(value==""||value=="3100") {
		for(var key in agree_map){
		    var v_value=$("#"+key).val();
			if(v_value==""){
			  $("#"+key).attr("notnull","true");
			  $("#"+key).attr("checkchname",agree_map[key]);
			  setNullCss($("#"+key));
			}
	     }	
		 checkedInit();
	} else if(value=="3200"){
		 for(var key in condition_agree_map){
	 		    var v_value=$("#"+key).val();
	 			if(v_value==""){
	 			  $("#"+key).attr("notnull","true");
	 			  $("#"+key).attr("checkchname",condition_agree_map[key]);
	 			  setNullCss($("#"+key));
	 			}
	 	  }	 
		 checkedInit();
	}else{
		for(var key in refuse_map){
  		    var v_value=$("#"+key).val();
  			if(v_value==""){
  			  $("#"+key).attr("notnull","true");
  			  $("#"+key).attr("checkchname",refuse_map[key]);
  			  setNullCss($("#"+key));
  			}
  	     }	
		 for(var key in agree_map){
		    var v_value=$("#"+key).val();
			if(v_value==""){
			  $("#"+key).removeAttr("notNull");
			  removeNullCss($("#"+key));
			}
	     }	
	}
	return '';
}

function saveForm(successFun,imagePath){
	if(validateForm()){
		var materialsEvaluation = $("input[name='materialsEvaluation']:checked").val();
		var telSurveyEvaluation = $("input[name='telSurveyEvaluation']:checked").val();
		if(undefined==materialsEvaluation){
			materialsEvaluation = "";
		}
		if(undefined==telSurveyEvaluation){
			telSurveyEvaluation = "";
		}
		auditConclusion = $("#dtoauditConclusion").val();
		var comprehensiveRate = $('#dtocomprehensiveRate').val();
		var params=[];
		params.push('id=' + $("#dtoid").val());
		params.push('fkIntoAppId=' + $("#dtofkIntoAppId").val());
		params.push('productType=' + $("#dtoproductType").val());
		params.push('auditConclusion=' + $("#dtoauditConclusion").val());
		params.push('innerReviews=' +  encodeURIComponent($("#dtoinnerReviews").val()));
		params.push('outerRemark=' +  encodeURIComponent($("#dtoouterRemark").val()));

		params.push('processId=' + $("#processInsId",window.parent.document).val());
		params.push('custId=' + $("#custId").val());
		params.push('prodId=' + $("#prodId").val());
		params.push('intoId=' + $("#intoId").val());
		params.push('transCode=' + $("#transCode").val());
		params.push('processInsId=' + $("#processInsId").val());
		params.push('bizInfId=' + $("#bizInfId").val());
		params.push('bizType=' + $("#bizType").val());
		params.push('acitityName=' + $("#acitityName").val());
		params.push('auditProductVersion=' + $("#auditProductVersion").val());
		params.push('materialsEvaluation=' + materialsEvaluation);
		params.push('telSurveyEvaluation=' + telSurveyEvaluation);
		if($("#dtocustClassify").val()!="" && $("#dtocustClassify").val()!=undefined){
			params.push('custClassify='+$("#dtocustClassify").val());	
		}
		if($("#dtoproClassify").val()!="" && $("#dtoproClassify").val()!=undefined){
			params.push('proClassify='+$("#dtoproClassify").val());	
		}
		if($("#dtoinsuranceType").val()!="" && $("#dtoinsuranceType").val()!=undefined){
			params.push('insuranceType='+$("#dtoinsuranceType").val());	
		}
		if($("#dtoauthorizedAccordin").val()!="" && $("#dtoauthorizedAccordin").val()!=undefined){
			params.push('authorizedAccordin='+$("#dtoauthorizedAccordin").val());	
		}
		var bizType = $("#bizType").val();
		if(bizType == "1001" && auditConclusion == "3300"){//针对复议环节，当审批结论为"维持终审意见"进行特殊处理
			auditConclusion = $("#finalAuditConclusion").val();
		}
		//不同的审核结果, 提交内容不同
		if(auditConclusion == "3100" || auditConclusion == "3200") {
			params.push('monthrepament=' + $("#dtomonthrepament").val());
			params.push('intdebetratio=' + $("#dtointdebetratio").val());
			params.push('debetratio=' + $("#dtodebetratio").val());
			params.push('comprehensiveRate='+comprehensiveRate);
			params.push('apprPepaymentWay=' + $("#apprPepaymentWay").val());
			params.push('agreeCondition=' +  encodeURIComponent($("#dtoagreeCondition").val()));
			params.push('auditAmount=' + $("#dtoauditAmount").val().replace(/,/g,""));
			params.push('loanPeriod=' + $("#dtoloanPeriod").val());
			params.push('agreeCode=' + $("#dtoagreeCode").val());
			params.push('checkIncome=' + $("#dtocheckIncome").val().replace(/,/g,""));
		}else if(auditConclusion == "3300"||auditConclusion == "3400" || auditConclusion == "3900" || auditConclusion == "3350" ) {
			params.push('oneRefuseReason='+ $("#dtooneRefuseReason").val());
			if(bizType == "1001" && auditConclusion == "3300"){//针对复议环节，当审批结论为"维持终审意见"进行特殊处理
				params.push('twoRefuseReason='+ $("#twoRefuseInfo").val());
			}else{
				params.push('twoRefuseReason='+ $("#dtotwoRefuseReason").val());
			}
		}
		var url = contextRootPath + '/lbTIntoAuditResult/mergeLbTIntoAuditResult';
		//通过ajax保存
		jyAjax(url,params.join("&"), function(msg) {
			if(successFun!=undefined){
				successFun(); 
			}else{
				 //如果流程进行保存不弹出保存成功提示，否则点击保存按钮保存弹出提示
				 //location.reload();
				 var approval = $("#approval").val();//是否为循环贷标识
				 if(approval=='Y'){
					 doAddFrom(); //保存循环贷历史数据
				 }else{
					 window.top.showMessage(msg.msg,3000);
				 }
			}
			parent.changeTab(imagePath);
			location.reload();
		},"","",false);	
		$("#dtoproductType").select("");
	}else {
		return false;
	}

}

//表单验证
function validateForm() {
//	var acitityName = $("#acitityName").val();
//	if(acitityName=="信审专员初审"){
//		var materialsEvaluation =   $("input:radio[name='materialsEvaluation']:checked").val();
//		var telSurveyEvaluation =   $("input:radio[name='telSurveyEvaluation']:checked").val();
//		if(materialsEvaluation=='' || materialsEvaluation == undefined ){
//			window.top.showMessage("请填写资料审核评价信息！");
//			return false;
//		}
//		if(telSurveyEvaluation=='' || telSurveyEvaluation== undefined){
//			window.top.showMessage("请填写电话调查评价信息！");
//			return false;
//		}
//		
//	}
	var forms = [ "updateNewsFormData" ];
	var checkTrueCount = 0;
	var nullErrors=[];
	var formatErrors=[];
	for (var i = 0; i < forms.length; i++) {
		var formObj = document.getElementById(forms[i]);
		 //非空校验
		 submitCheckIsNull(formObj,null,nullErrors);
		 //正则校验
		 checkFormFormat(formObj,null,null,formatErrors); 
	}
	if(nullErrors.length) {
		var checkTip=("["+$(nullErrors[0]).attr("checkchname")+"]"||"")+"校验未通过!";
		window.top.showMessage(checkTip);
		return false;
	}
	if(formatErrors.length) {
		var checkTip=("["+$(formatErrors[0]).attr("checkchname")+"]"||"")+"校验未通过!";
		window.top.showMessage(checkTip);
		return false; 
	} 
	//校验判断
	if (checkTrueCount > 0) {
		return false;
	}
	return true;
}



//计算费率总函数
function calculateRate(obj){
	var v_value = $("#" + obj).val().trim();
	var v_id = obj;
	var auditAmount = $('#dtoauditAmount').val().trim().replace(/,/g,"");//审批额度
	var loanPeriod = $('#dtoloanPeriod').val();//期数
	var comprehensiveRate = accDiv($('#dtocomprehensiveRate').val() ? $('#dtocomprehensiveRate').val() : 0, 100,4);//综合费
	var debtSum=$('#debtSum').val();//总负债
	var checkIncome = $('#dtocheckIncome').val().trim().replace(/,/g,""); //核实收入
	changeEvent(obj,agree_map);
	if(isNaN(checkIncome)){
		$('#dtocheckIncome').val('');
		$('#dtocheckIncome').focus();
		return false;
	}
	var intdebetratio;//内部负债率
	var debetratio;//负债率
	var monthrepament;//每月还款
	
	if (v_id == 'dtoauditAmount'){// 审核额度
		if(v_value!=""&&loanPeriod!=""){
			//每月还款= 审批额度/期数+审批额度*综合费率
			monthrepament = accAdd(accDiv(v_value, loanPeriod,2), accMul(v_value, comprehensiveRate,2),2);//每月还款
			compute(checkIncome,debtSum,monthrepament);
		}else{
			$("#dtomonthrepament").val("");
			$("#dtodebetratio").val("");//负债率	 
			$('#dtointdebetratio').val("");//内部负债率	
		}
	}else if(v_id == 'dtoloanPeriod'){//期数
		if(v_value!=""&&auditAmount!=""){
			monthrepament = accAdd(accDiv(auditAmount,v_value,2), accMul(auditAmount, comprehensiveRate,2),2);//每月还款
			compute(checkIncome,debtSum,monthrepament);
		}else{
			$("#dtomonthrepament").val("");
			$("#dtodebetratio").val("");//负债率	 
			$('#dtointdebetratio').val("");//内部负债率	
		}
	}else if(v_id == 'dtocheckIncome'||v_id == 'dtocomprehensiveRate'){//核实收入^综合费率
		if(auditAmount!=""&&loanPeriod!=""){
			monthrepament = accAdd(accDiv(auditAmount, loanPeriod,2), accMul(auditAmount, comprehensiveRate,2),2);//每月还款
			compute(checkIncome,debtSum,monthrepament);
		}else if(v_value==""){
			$("#dtodebetratio").val("");//负债率	 
			$('#dtointdebetratio').val("");//内部负债率	 
		}else{
			$("#dtomonthrepament").val("");
			$("#dtodebetratio").val("");//负债率	 
			$('#dtointdebetratio').val("");//内部负债率	
		}	
	}
}


//计算负债率
function  compute(checkIncome,debtSum,monthrepament){
	$("#dtomonthrepament").val(monthrepament);
	//负债率=(每月还款+总负债)/核实收入
	if(checkIncome==""){
		$("#dtodebetratio").val("");//负债率	
		$('#dtointdebetratio').val("");//内部负债率
		$('#dtocheckIncome').val('');
		$('#dtocheckIncome').focus();
	}else if(checkIncome<=0){
		return false;
	}else if(debtSum==""){
		debetratio = accDiv(monthrepament, checkIncome,4);
		$("#dtodebetratio").val(accMul(debetratio, 100,2));
		//内部负债率：=每月还款/核实收入
		intdebetratio= accDiv(monthrepament, checkIncome,4);
		$('#dtointdebetratio').val(accMul(intdebetratio,100,2));
	}else{
		debetratio = accDiv(accAdd(monthrepament, debtSum,2), checkIncome,4);
		$("#dtodebetratio").val(accMul(debetratio,100,2));
		intdebetratio = accDiv(monthrepament, checkIncome,4);
		$('#dtointdebetratio').val(accMul(intdebetratio,100,2));
	}  
}

function accMul(arg1, arg2,arg3) {
	return (parseFloat(arg1) * parseFloat(arg2)).toFixed(arg3);
}

function accDiv(arg1, arg2,arg3) {

	return (parseFloat(arg1) / parseFloat(arg2)).toFixed(arg3);
}

function accAdd(arg1, arg2,arg3) {

	return (parseFloat(arg1) + parseFloat(arg2)).toFixed(arg3);
}


//判断是否达到该商品的最大补件次数
function validateMaxAttach(v_boolean){
	var url= contextRootPath+'/lbTAddAttachConf/validateMaxPatchCountAndOverDay';
	var param = "prodId="+$("#prodId").val()+"&intoCustRefId="+$("#intoCustRefId").val()+"&bizType="+$("#bizType").val();
	jyAjax(url, param, function(msg) {
		var mgs = msg.msg ;
		if( mgs.indexOf('y') >-1){
			v_boolean = true;
		}else{
			 if(confirm(msg.msg+"确定提交吗？")){
				    v_boolean = true;
				}else {
					v_boolean = false;
				}
			}
	},"","",false);
	return v_boolean;
}




//判断是否所有配置事物都已经完成
function validateTransConfig(v_myTurn,v_boolean,activeName){
	if(v_myTurn=="提交" || v_myTurn=="拒绝" ||  v_myTurn=="同意" ){
		var params = "prodId="+$("#prodId").val()+"&intoId="+$("#intoId").val()+"&custId="+$("#custId").val()+"&activeName="+activeName;
		var url= contextRootPath+'/lbTTransactionRule/queryTransactionInfo';
		jyAjax(url,params,function(msg){
			var v_status = msg.status;
			if(v_status.indexOf('ok') >-1 && msg.data){
				var message =[];
				var datas = msg.data;
				if(datas.length > 0) {
					for(var i=0;i<datas.length;i++) {
						var data=datas[i];
						message.push(data.transName);
					}
					message.join(",")
					window.top.showMessage(message+"事项没有完成！");
					v_boolean = false;
				}else {
					v_boolean = true;
				}
			}
		},"","",false);
	}
	return v_boolean;
}

function hideBtns(){
	for (var i = 0; i < btns.length; i++) {
		if (btns[i].val() != "关闭") {
			btns[i].hide();
		}
		if (btns[i].val() == "拒绝并加入黑名单" && btns[i + 1].val() == "调查命中" && btns[i + 2].val() == "调查通过") {
			btns[i+2].after(btns[i]).after(btns[i+1]);
			btns[i+1].css("background","#ff0000");
			btns[i].css("background","#5CACEE");
				/*var a = btns[i].clone();
				var b = btns[i+1].clone();
				var obj=btns[i+2];
				obj.after(a);
				obj.after(b);
				btns[i].remove();
				btns[i+1].remove();
				btns[i] = a;
			    b.css("background","#ff0000");
			    a.css("background","#5CACEE");*/
		}
	}
}

function loadInfo(prodId,intoId,custId,intoCustRefId){
	$("#prodId").val(prodId);
	$("#intoId").val(intoId);
	$("#custId").val(custId);
	$("#intoCustRefId").val(intoCustRefId);
}

//针对按钮进行转换处理
function changeBtns(value){
	var showBtn = "";
	var isExit = "1";//传过来的按钮中是否存在提交按钮，如果存在则不用追加，否则追加提交按钮
	for(var j=0;j<btns.length;j++){
		var btn = btns[j];
		if(btn.val()=="提交"){
			isExit="2";//存在
			btn.show();
			return ;
		}
	}
	if(isExit=="1"){
		if(value == "3100" || value == "3200" || value == "3110"){
			showBtn="同意";
		}else if(value == "3300" || value == "3400" || value == "3500" || value == "3350"
			|| value == "3600" || value == "3900"){
			showBtn="拒绝";
		}else if(value=="3310"){//稽核审批退回信审
			showBtn="回退";
		}
		var btnStr='<input style="margin: 5px;" id="submitBtn" name="myProButn" type="button" value="提交"  onclick=prepareSubTask(\"'+showBtn+'\") class="ui-button ui-widget ui-state-default ui-corner-all" role="button">';
	    var tibaoBtn = '<input id="tibao"   class="ui-button ui-widget ui-state-default ui-corner-all"  name="myProButn" type="button" value="提报" onclick=doInstincInto(\"'+ $("#intoId").val() + '\") >';

		$("#divSubBtnId input").each(function(){
			var objId=this.id;
			if(objId!='restBtn' && objId!='approveAdviseBtn_id' && objId!='toCreditBtn'&&objId!='tibao'   ){//approveAdviseBtn_id:批贷建议   toCreditBtn:转信审
				$(this).hide();
			}
			var objValue = this.value;
			if(objValue == "跨级提交"){
				$(this).show();
			}
		})
		if ( $("#divSubBtnId input[id='submitBtn']").length <= 0 ) { 
			$("#divSubBtnId").prepend(btnStr);
			
		} else{
			 $("#divSubBtnId input[id='submitBtn']").remove(); 
			 $("#divSubBtnId").prepend(btnStr);
		}
		//添加提报按钮
		var acitityName = $("#acitityName").val();
		if(acitityName=="信审专员初审"||acitityName=="信审主管"
			  ||acitityName=="信审经理"||acitityName=="首席风险执行官"||acitityName=="复议专员审核"||acitityName=="复议主管审批"){
				
				if ( $("#divSubBtnId input[id='tibao']").length <= 0 ) {
					window.parent.$("#divSubBtnId input[id='restBtn']").before(tibaoBtn);
					
				} else{
					 $("#divSubBtnId input[id='tibao']").remove(); 
					 window.parent.$("#divSubBtnId input[id='restBtn']").before(tibaoBtn);
				}
			}
	}
	$("#auditResult").val(value);
}

function carBtn(){
	for(var i=0;i<btns.length;i++){
		if(btns[i].val()!="关闭" ){
			btns[i].hide();
		}
		if(btns[i].val()=="提交"){
			btns[i].show();
		}
	}
} 


//验证产品流程
function checkProductCycle(obj) {
	var formProdId = $("#prodId").val();
	var oldproductCode = $("#oldproductCode").val();
	var toProdId = obj.value;
	if(oldproductCode!=toProdId){
		if($('#dtoproductType option:selected').text().indexOf('在售')==-1){
			window.top.showMessage("产品已经停用,无法进行选择！",1000);
			$("#dtoproductType option[value='" + $("#prodId").val() + "']").attr("selected", "selected")
		}
	}
	//是否进行产品同步
	var url = contextRootPath + '/lbTProductFlowConf/checkProductProcess';
	var params = "fromProdId=" + formProdId + "&toProdId="+ toProdId;
	jyAjax(url, params, function(msg) {
		var msg = msg.msg;
		if (msg == 'no') {
			window.top.showMessage("产品流程不同,无法进行选择！",1000);
			$("#dtoproductType option[value='" + $("#prodId").val() + "']").attr("selected", "selected")
		}else{
			$("#prodId").val(obj.value);
			$("#dtoauditAmount").val('');
			$("#dtoauditConclusion").val('');
			//是否展示客群分类
			isShowClassify(obj.value);
			//是否展示保险类型和授信依据
			isShowInsuranceInfo(obj.value);
			//字段必输校验
			setCheckColumn(obj.value,"20000",function(){checkedInit(); });
			//更换产品信息
			changeProductInfo();
			//是否展示产品分级
			isShowProClassfy(obj.value,$("#intoId").val());
			
		}
	});
}

//查询是否展示产品分级
function isShowProClassfy(productCode,intoId){
	var v_boolean = false;
	var v_value = productCode;
	var url = contextRootPath + '/lbtStoreProClasfRef/getStoreProductConfInfo'; 
	var params="productCode="+v_value+"&intoId="+intoId;
	//通过ajax保存
	jyAjax(url, params, function(msg) {
		var v_date = msg.data.proClassfy;
		if(msg.msg=="Yes" ){
			$("#isCreditId").val('Yes');
			$("#dtoproClassify_title").css("display","");
			$("#dtoproClassify").css("display","");
			$("#dtoproClassify").val(msg.data.proClassfy);
			$("#dtoproClassify").attr("disabled",true);
			v_boolean = true;
		}else{
			$("#dtoproClassify_title").css("display","none");
			$("#dtoproClassify").css("display","none");
		}
	},"","",false); 
	return v_boolean;
}

//查询是否展示客群分类
function isShowClassify(productCode){
	var v_boolean = false;
	var v_value = productCode;
	var url = contextRootPath + '/lbTProductConf/getProductConfInfo'; 
	var params="productCode="+v_value;
	//通过ajax保存
	jyAjax(url, params, function(msg) {
		if(msg.msg=="0" ){
			$("#dtocustClassify_title").css("display","none");
			$("#dtocustClassify").css("display","none");
		}else{
			$("#dtocustClassify_title").css("display","");
			$("#dtocustClassify").css("display","");
			v_boolean = true;
		}
	},"","",false);
	return v_boolean;
}

//查询是否展示保险类型和授信依据(保悦贷)
function isShowInsuranceInfo(productCode){
	var v_boolean = false;
	var v_value = productCode;
	var url = contextRootPath + '/lbTProductConf/isShowInsuranceInfo'; 
	var params="productCode="+v_value;
	//通过ajax保存
	jyAjax(url, params, function(msg) {
		if(msg.msg=="0" ){//不展示
			$(".proClassTR").addClass("hid");
		}else{//展示
			$(".proClassTR").removeClass("hid");
			v_boolean = true;
		}
	},"","",false);
	return v_boolean;
}

//更换产品信息,从核心获取产品明细
function changeProductInfo(){
	var url = contextRootPath + '/lbTIntoAuditResult/getProductInfoByProductCode'; 
	var params="productCode="+$("#prodId").val()+"&type=1&intoId="+$("#intoId").val();
	//通过ajax保存
	jyAjax(url, params, function(msg) {
		if(msg.data){
			//产品类型更新，查询拒贷原因
			var datas=msg.data.list;
			if(datas){
				var selStr='<select id="dtooneRefuseReason" name="oneRefuseReason"  >';
				for(var i=0;i<datas.length;i++){
					var refuseReason  = datas[i]["refuseReason"];
					var refuseCode = datas[i]["refuseCode"];
					selStr += '<option value="'+refuseCode+'">'+refuseReason+'</option>';	
				}	
				selStr += "</select>"; 
				$("#dtooneRefuseReason").html(selStr);
				querySecondRefuseReasons();
			}
			//总和费率
			$("#dtocomprehensiveRate").val(parseFloat(msg.data.productInfoDTO.serviceRateProp.defaultValue).toFixed(3));
			var proctYear = msg.data.productInfoDTO.loanPeriods;
			var payMethod = msg.data.productInfoDTO.repaymentWayList;
			var versionNew = msg.data.productInfoDTO.version;
			$("#minProductValue").val(msg.data.productInfoDTO.loanLimitProp.minValue);
	        $("#maxProductValue").val(msg.data.productInfoDTO.loanLimitProp.maxValue);
			if(proctYear){
				proctYear=proctYear.split(",");
				var selStr=['<select id="dtoloanPeriod" name="loanPeriod"  >'];
				for(var i=0;i<proctYear.length;i++){
					selStr.push('<option value="'+proctYear[i]+'">'+proctYear[i]+'</option>')
				}
				selStr.push("</select>");
				$("#dtoloanPeriod").html(selStr.join());
			}
			if(payMethod){
				var paystr=['<select id="apprPepaymentWay" name="apprPepaymentWay"  >'];
				for(var j=0;j<payMethod.length;j++){
					paystr.push('<option value="'+payMethod[j].DICVALUE+'">'+payMethod[j].DICNAME+'</option>')
				}
				paystr.push("</select>");
				$("#apprPepaymentWay").html(paystr.join());
			}
			$("#auditProductVersion").val(versionNew);
		}
	},"","",false);  
}

//页面加载，查询产品的拒贷原因
function searchProductRefuseReason(){
	var url = contextRootPath + '/lbTIntoAuditResult/getProductInfoByProductCode'; 
	var params="productCode="+$("#dtoproductType").val()+"&type=1&intoId="+$("#intoId").val();
	//通过ajax保存
	jyAjax(url, params, function(msg) {
		if(msg.data){
			var datas=msg.data.list;
			if(datas!=null){
				var selStr='<select id="dtooneRefuseReason" name="oneRefuseReason"  >';
				for(var i=0;i<datas.length;i++){
					var refuseReason  = datas[i]["refuseReason"];
					var refuseCode = datas[i]["refuseCode"];
					selStr += '<option value="'+refuseCode+'">'+refuseReason+'</option>';	
				}	
				selStr += "</select>"; 
				$("#dtooneRefuseReason").html(selStr);
				querySecondRefuseReasons();
			}
		}
	});		
}


//查询产品的最大审批金额
function getIntoMaxApprAmount(obj){
	var intoId = $("#intoId").val();
	var auditAmount=$("#dtoauditAmount").val().trim().replace(/,/g,"");
	if(auditAmount!=""&&isNaN(auditAmount)){
		$("#dtoauditAmount").val('');
		$("#dtoauditAmount").focus();
		return false;
	}else if(auditAmount==""){
		calculateRate(obj);
		$("#dtoauditAmount").val('');
		$("#dtoauditAmount").focus();
		changeEvent(obj,agree_map);
		return false;
	}
	
	var v_min = $("#minProductValue").val();
	var v_max=  $("#maxProductValue").val();
	var v_money = $("#"+obj).val().replace(/,/g,"");
	
	if(( v_money*1 < v_min*1) || (v_money*1 > v_max*1)){
		window.top.showMessage("审批额度应在"+v_min+"和"+v_max+"范围内！");
		$("#"+obj).val('');
		return false;
	}else {
		calculateRate(obj);
	}
}

//页面加载 ，执行的方法    批注：审批结论 、 审批额度、 核实收入 、通过代码、  内部评语 、与外部备注不回显
function  executePageLoad(){
	if($("#isEdit").val()!="yes"){
		$("#dtoauditConclusion").val("");	
		$("#dtoauditAmount").val("");	
		$("#dtoagreeCode").val("");	
		$("#dtoinnerReviews").val("");	
		$("#dtoouterRemark").val("");
		$("#dtoagreeCondition").val("");
		$("#dtomonthrepament").val("");	
		$("#dtodebetratio").val("");
		$("#dtointdebetratio").val("");	
	}
}

/*
function changeBtns(value){
	if(mapping[value]){
		hideBtns();
		var btnNames = mapping[value];
		for(var i=0;i<btnNames.length;i++){
			var showBtnName = btnNames[i];
			for(var j=0;j<btns.length;j++){
				var btn = btns[j];
				if(showBtnName==btn.val() || btn.val()=="提交"){
					btn.show();
				}
			}
		}
	}
	$("#auditResult").val(value);
}*/


//必输项事件改变控制
function changeEvent(key,map){
	var v_value=$("#"+key).val();
    if(v_value==""){
    	$("#"+key).attr("notnull","true");
    	$("#"+key).attr("checkchname",map[key]);
    	return false;
    }
}

//审批结论切换过程中页面必输项控制
function checkAuditConclusion(){
	if($("#dtoauditConclusion").val() ==""||$("#dtoauditConclusion").val()=="3100") {
		 for(var key in refuse_map){
		    var v_value=$("#"+key).val();
			if(v_value==""){
			  $("#"+key).removeAttr("notnull");
			  $("#"+key).removeAttr("checkchname");
			  removeNullCss($("#"+key));
			
			}
	    }
		 for(var key in condition_agree_map){
			  var v_value=$("#"+key).val();
			  if(v_value==""){
				 $("#"+key).removeAttr("notnull");
				 $("#"+key).removeAttr("checkchname");
				 removeNullCss($("#"+key));
			  }
		  }
	    for(var key in agree_map){
		    var v_value=$("#"+key).val();
			if(v_value==""){
			  $("#"+key).attr("notnull","true");
			  $("#"+key).attr("checkchname",agree_map[key]);
			  setNullCss($("#"+key));
			}
		}
	}else if($("#dtoauditConclusion").val()=="3200"){
		  for(var key in agree_map){
		    var v_value=$("#"+key).val();
			if(v_value==""){
			  $("#"+key).removeAttr("notnull");
			  $("#"+key).removeAttr("checkchname");
			  removeNullCss($("#"+key));
			}
	       }
		   for(var key in refuse_map){
			    var v_value=$("#"+key).val();
				if(v_value==""){
				  $("#"+key).removeAttr("notnull");
				  $("#"+key).removeAttr("checkchname");
				  removeNullCss($("#"+key));
				}
		   }
		  for(var key in condition_agree_map){
			    var v_value=$("#"+key).val();
				if(v_value==""){
				  $("#"+key).attr("notnull","true");
				  $("#"+key).attr("checkchname",condition_agree_map[key]);
				  setNullCss($("#"+key));
				}
		  }
	}else{
		for(var key in agree_map){
		    var v_value=$("#"+key).val();
			if(v_value==""){
			  $("#"+key).removeAttr("notnull");
			  $("#"+key).removeAttr("checkchname");
			  removeNullCss($("#"+key));
			}
	   }
		for(var key in condition_agree_map){
		    var v_value=$("#"+key).val();
			if(v_value==""){
			  $("#"+key).removeAttr("notnull");
			  $("#"+key).removeAttr("checkchname");
			  removeNullCss($("#"+key));
			}
	   }
		for(var key in refuse_map){
		    var v_value=$("#"+key).val();
			if(v_value==""){
			  $("#"+key).attr("notnull","true");
			  $("#"+key).attr("checkchname",refuse_map[key]);
			  setNullCss($("#"+key));
			}
	  }	
	}	
}

//字段必输校验
function setCheckColumn(confId,bizNo,checkInitFun){
	var url=contextRootPath+'/lbTNeedRequiredInfo/queryValidNeedRequiredListByProdId';
	var params={fkProConfId:confId,bizNo:bizNo};
	jyAjax(
		url,
		params,
		function(msg){
		    if(msg.data&& msg.data.length>0){
			   for(var i=0;i<msg.data.length;i++){
				   var d=msg.data[i];
				   var element=$("#"+d["checkName"]);
				   element.attr("checkchname",d["checkChineseName"]);
				   element.attr("notNull","true");
				   var checkName= d["checkName"];
				   if(checkName=="dtocustClassify"){//商悦贷：产品客群分类
				      $("#dtoinsuranceType").removeAttr("notnull");
				      $("#dtoinsuranceType").removeAttr("checkchname");
				      $("#dtoauthorizedAccordin").removeAttr("notnull");
				      $("#dtoauthorizedAccordin").removeAttr("checkchname");
				   }else if(checkName=="dtoinsuranceType"||checkName=="dtoauthorizedAccordin"){//保悦贷：保险类型&授信依据
				      $("#dtocustClassify").removeAttr("notnull");
				      $("#dtocustClassify").removeAttr("checkchname");
				   }
			   }  
		   }else{
			    $("#dtocustClassify").removeAttr("notnull");
				$("#dtocustClassify").removeAttr("checkchname");
				$("#dtoinsuranceType").removeAttr("notnull");
				$("#dtoinsuranceType").removeAttr("checkchname");
				$("#dtoauthorizedAccordin").removeAttr("notnull");
				$("#dtoauthorizedAccordin").removeAttr("checkchname");
		  }
		  if(checkInitFun){
			checkInitFun();
		  } 
		}
	);
}

function checkNum(obj) {
	var v_value = $(obj).val().replace(/,/g,"");
	if (!(/^(\d*(\.\d+)?)$/.test(v_value)) || eval(v_value)<= 0) {
		return '请输入大于0的有效数字';
	}
	return '';
}

//查看合同明细
function viewContractDetail(contractId,contractAmount,loanAmount,planLoanDate,prodName){
	if(planLoanDate == undefined||planLoanDate==null||planLoanDate=="NULL"||planLoanDate=="null"||planLoanDate==""){
		planLoanDate = "";
	}else{
		planLoanDate = new Date(planLoanDate.replace(/-/g,'/')).getTime();
	}
	var dialogStruct={
			'display':contextRootPath+'/laTLedgerQuery/prepareExecute/toCoreForLoanInfo?contractId='+contractId+'&contractAmount='+contractAmount+'&provideAmount='+loanAmount+'&planLoanDate='+planLoanDate+'&prodName='+prodName,
			'width':1100,
			'height':600,
			'title':'查看贷款详细信息',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};	
	var dialogView = jyDialog(dialogStruct).open();
}

function getFinalAuditInfo(value,bizType,intoId){
	var url = contextRootPath + '/lbTIntoAuditResult/queryFinalAuditByIntoIdAndBizType';
	$.ajax({ 
        type: "post", 
        url: url, 
        data: {bizType:bizType,intoId:intoId},
        cache:false, 
        async:false, 
        dataType : 'json',
        success: function(msg){
        	if(msg.data){
        	   var auditResult = msg.data;
        	   var productType = auditResult["productType"];
        	   var auditConclusion = auditResult["auditConclusion"];
 			   //依据审核结论，展示不同审核内容
 			   hideToggle(auditConclusion);
 			   $("#finalAuditConclusion").val(auditConclusion);//将查询出的终审审核结论赋予隐藏字段
 			   $("#dtoauditConclusion").val(value);//审批结论赋值为"维持终审意见"
 			   setFormValueReadOnly(v_arr,auditResult);//复议环节，当审批结论为"维持终审意见"时，将信审审核结果信息展示到输入页面
 			   checkConfigItem(auditResult,intoId,productType);//核实配置项是否展示并赋值  
 			   setFormRead(v_arr);//设置信审审核结果信息为只读（除审批结论之外） 
 			   if(auditConclusion == "3300"||auditConclusion == "3400" || auditConclusion == "3900" || auditConclusion == "3350" ){
				   var val=auditResult["twoRefuseReason"];
				   var valInfo = getRefuseInfo(val);
				   $("#dtotwoRefuseReason").next(".readOnlyDiv").html(valInfo);
				   $("#twoRefuseInfo").val(val);//审批结论赋值为"维持终审意见"
		       }
           }}
        });
  }


//查询二级拒贷原因中文含义
function getRefuseInfo(refuseCode){
	var refuseInfo = "";
	var v_value = refuseCode;
	var url = contextRootPath + '/lbTIntoAuditResult/querySecondRefuseInfo'; 
	var params="refuseCode="+v_value;
	//通过ajax保存
	jyAjax(url, params, function(msg) {
		if(msg.data){
			var refuseLoanConf = msg.data;
			var refuseReason = refuseLoanConf["refuseReason"];
			refuseInfo = refuseReason;
		}
	},"","",false);
	return refuseInfo;
}

/**
 * 方法描述：取消form表单或指定字段的只读功能。前题是之前的表单使用setFormRead做了只读操作
 * 参数描述：可以设置为表单名称，也可以设置字段数组["dtoproductType","dtoauditConclusion"]
 */
function cancelFormReadOnly(formName) {
    if (typeof(formName) == "string") {
        eachForm(formName,function(element) {
            var end = $(element);
            var hideElements = end.parent().find(".readOnlyDiv");
            if (hideElements.length) {
                hideElements[0].hide();
                end.show();
            }
        })
    }else if(typeof(formName) == "object") {
       if (formName instanceof Array) {
            for (var i = 0; i < formName.length; i++) {
            	 var element=document.getElementById(formName[i]);
            	 var end = $(element);
            	 var hideElements = end.parent().find(".readOnlyDiv");
            	 if (hideElements.length) {
            		 $(hideElements[0]).empty();
                     $(hideElements[0]).hide();
                     end.show();
         		}
            }
        }
    }
}


/**
 * 方法描述：复议环节，当审批结论为"维持终审意见"时，将信审审核结果信息展示到输入页面
 * 参数描述：设置字段数组["dtoproductType","dtoauditConclusion"]
 */
function setFormValueReadOnly(formName,Object){
	debugger;
	if(typeof(formName) == "object") {
		 if (formName instanceof Array) {
			 for (var i = 0; i < formName.length; i++) {
				 var v_id = formName[i];
				 var element=document.getElementById(v_id);
            	 var end = $(element);
            	 if (element.tagName == "SELECT") {
            	    var v_value = end.val();
       			    $("#"+v_id+"option[value='"+v_value+"']").removeAttr("selected");
       			    v_value = Object[element.name];
       			    end.val(v_value);
       			    $("#"+v_id+"option[value='"+v_value+"']").attr("selected","selected");
            	 }else if(element.tagName == "INPUT"||element.tagName == "TEXTAREA"){
            		var v_value = Object[element.name];
            		end.val(v_value); 
            	 }
			 }  
		 }
	}	
}

 /**
 * 核实配置项是否展示并赋值
 */
function checkConfigItem(auditResult,intoId,productType){
	   //是否展示客群分类
		if(isShowClassify(productType)){
		   $("#dtocustClassify").val(auditResult["custClassify"]);
		}
        //是否展示保险类型和授信依据
		if(isShowInsuranceInfo(productType)){
		   $("#dtoinsuranceType").val(auditResult["insuranceType"]);
		   $("#dtoauthorizedAccordin").val(auditResult["authorizedAccordin"]); 
		}
		//是否展示产品分级
		if(isShowProClassfy(productType,intoId)){
		   $("#dtoproClassify").val(auditResult["proClassify"]);
		}
}

//移除产品非必输校验字段
function removeCheckColumn(params){
	   var url=contextRootPath+'/lbTNeedRequiredInfo/queryNonNeedRequiredListByProdId';
	   jyAjax(url,params,function(msg){
		   if(msg.data&& msg.data.length>0){
			   for(var i=0;i<msg.data.length;i++){
				   var d=msg.data[i];
				   var element=$("#"+d["checkName"]);
				   element.removeAttr("notnull");
				   element.removeAttr("checkchname");
			   }
		   }   
	   }
	 ); 	
}


//在录入金额字段的后方，展示录入金额对应的大写汉字金额
function numToChMoney() {
	try{
		var setChMoney=function(that){
			$(that).nextAll("label[class='numtochmoney']").html(jyTools.numToCny($(that).val()));
		}
		$("#dtoauditAmount").bind("keyup",function(ev){
			setChMoney(this);
		});
		$("#dtocheckIncome").bind("keyup",function(ev){
			setChMoney(this);
		});
		setChMoney($("#dtoauditAmount"));
		setChMoney($("#dtocheckIncome"));
	}catch(err){
	}
}

//将数字格式化格式化金额，以"三位一逗"的形式展示
function outputmoney(number) {
	number = number.replace(/\,/g, "");
	if(isNaN(number) || number == "")return "";
	number = Math.round(number * 100) / 100;
	if (number < 0)
	      return '-' + outputdollars(Math.floor(Math.abs(number) - 0) + '') + outputcents(Math.abs(number) - 0);
	else
	     return outputdollars(Math.floor(number - 0) + '') + outputcents(number - 0);
} 

//输出元
function outputdollars(number) {
    if (number.length <= 3)
        return (number == '' ? '0' : number);
    else {
        var mod = number.length % 3;
        var output = (mod == 0 ? '' : (number.substring(0, mod)));
        for (i = 0; i < Math.floor(number.length / 3); i++) {
            if ((mod == 0) && (i == 0))
                output += number.substring(mod + 3 * i, mod + 3 * i + 3);
            else
                output += ',' + number.substring(mod + 3 * i, mod + 3 * i + 3);
        }
        return (output);
    }
}

//输出角/分
function outputcents(amount) {
    amount = Math.round(((amount) - Math.floor(amount)) * 100);
    return (amount < 10 ? '.0' + amount : '.' + amount);
}

//将数字格式化为金额，使用减逗号处理金额

function transMoneyComma(obj)
{
  var v_value;
  if(obj){
	  v_value = obj.value.replace(/,/g,""); 
  }
  return v_value;
}
/**
 * 调用主数据接口,查询合同金额(只用于信贷产品,proType=01)
 */
function getEsbContractSignMoney(v_meg){
	var proType=$("#proType").val();
	if(proType=='01'){//信贷产品
		var productType=$("select[name=productType]").val();//产品类型
		if(!productType){
			v_meg="请选择产品类型";
		}
		var comprehensiveRate=$("input[name=comprehensiveRate]").val();//综合费率
		if(!comprehensiveRate){
			v_meg="综合费率不能为空";
		}
		var auditAmount=$("input[name=auditAmount]").val().replace(",","");//审批额度 
		if(!auditAmount || auditAmount==""){
			v_meg="请输入审批额度";
		}
		var loanPeriod=$("select[name=loanPeriod]").val();//贷款期限
		if(!loanPeriod){
			v_meg="请选择贷款期限";
		}
		var apprPepaymentWay=$("select[name=apprPepaymentWay]").val();//还款方式
		if(!apprPepaymentWay){
			v_meg="请选择还款方式";
		}
		if(v_meg){
			$("").newMsg({}).show(v_meg);
			return v_meg;
		}
		var url = contextRootPath + '/lbTIntoAuditResult/queryEsbContractSignMoney?intoAppId='+$("#intoId").val()+'&auditAmount='+auditAmount+'&loanPeriod='+loanPeriod+'&apprPepaymentWay='+apprPepaymentWay+'&productType='+productType+'&comprehensiveRate='+comprehensiveRate; 
		//通过ajax保存
		jyAjax(url,"",function(msg){
			var v_status = msg.status;
			var msgInfo=msg.msg;
			if(v_status.indexOf('ok') >-1){
				if(msgInfo=='creditLoan'){
					var signMoney=msg.data;
					if(parseFloat(signMoney)>parseFloat(200000)){
						$("label[id='numtochmoney']").attr("style","color:red;");
						$("label[id='numtochmoney']").html("审批额度的合同金额超过20万");
						v_meg="该客户贷款的合同金额超过20万!";
						return v_meg;
					}else{
						$("label[id='numtochmoney']").attr("style","");
						var errorHtml=$("label[id='numtochmoney']").html();
						if(errorHtml=='审批额度的合同金额超过20万'){
							$("label[id='numtochmoney']").html("");
						}
						v_meg="1";//通过
					}
				}else if(msgInfo=='mortgageLoan'){//抵押贷
					v_meg="1";//通过
				}else{
					$("").newMsg({}).show(msgInfo);
					return msgInfo;
				}
			}else{
				$("").newMsg({}).show(msgInfo);
				return msgInfo;
			}
		},"","",false);
	}else{
		v_meg="1";//通过
	}
	return v_meg;
}