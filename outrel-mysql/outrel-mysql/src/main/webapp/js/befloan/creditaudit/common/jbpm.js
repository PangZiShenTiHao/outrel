/*
 *准备提交\执行 我的待办任务
 *进行 业务规则，
 *选人规则的校验
 */
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
}

function prepareSubTask(v_myTurn){
	debugger;
	console.log("===============开始执行时间  ： "+getNowFormatDate());
	
	var activeName = $("#acitityName").val();
	var bizType = $("#bizType").val();
	var tab_title ="审核意见";
	var iframeWindow = tabs.getActiveObj();
	var v_boolean = true;
	var v_meg="";
	var intoId = $("#intoId").val();
	
//	//判断业务是否已被反欺诈拒绝
//	v_boolean = validateInfoDone(v_boolean);
//	if(!v_boolean) {
//		return false;
//	}
//	//补件提报校验
//	if((activeName.indexOf("补充资料")>-1&&v_myTurn=="提交")
//			||(activeName.indexOf("信审专员初审")>-1&&(v_myTurn=="同意"||v_myTurn=="拒绝"))
//			||(activeName.indexOf("信审主管")>-1&&(v_myTurn=="同意"||v_myTurn=="拒绝"))
//			||(activeName.indexOf("信审经理")>-1&&(v_myTurn=="同意"||v_myTurn=="拒绝"))
//			||(activeName.indexOf("首席风险执行官")>-1&&(v_myTurn=="同意"||v_myTurn=="拒绝"))
//			||(activeName.indexOf("复议专员审核")>-1&&(v_myTurn=="同意"||v_myTurn=="拒绝"))
//			||(activeName.indexOf("复议主管审批")>-1&&(v_myTurn=="同意"||v_myTurn=="拒绝"))
//			||v_myTurn=="跳转"
//			||v_myTurn=="退回补充资料"
//			||v_myTurn=="补充调查"){
//		
//		if(!judgeAntiToHumanDeal(intoId)){return};
//	    
//	}
	//判断业务是否已被反欺诈拒绝及提报校验
	if(!validateIntoInfo(intoId)){return};
	
	
	if(v_myTurn=="客户放弃"){
		toCustDropAndQuit(v_myTurn);
		return ;
	}
	if(v_myTurn=="转办"){
		transferAssignee(iframeWindow);
		return ;
	}
	
	if(iframeWindow.title == "反欺诈项"){
		var iframeAntiWin = tabs.getTabWinByTitle("反欺诈项");
		if(v_myTurn =="调查命中"){
			v_boolean = iframeAntiWin.saveAntiSelectedObj();
			if(!v_boolean){
				return;
			}
		}else if(v_myTurn =="调查通过"){
			iframeAntiWin.updateAntiIntoFlag();
		}
	}
	
	var opt = $("#operate").val();
	//对退回补充资料、实地征信进行验证
	if(v_myTurn =="退回补充资料" || v_myTurn =="退回补件"){
		//判断是否达到该商品的最大补件次数
		v_boolean = validateMaxAttach(v_boolean);
		if(!v_boolean) {
			return false;
		}
		//判断是否填写相关的回退清单信息
		v_boolean = validateBackListCount(v_boolean);
		if(!v_boolean) {
			return false;
		}
	}
	
	//如果是反欺诈和回退清单tab,需要保存备注信息
	if(iframeWindow.title=="反欺诈项" || iframeWindow.title=="回退清单"){
		var iframeWinSave = tabs.getTabWinByTitle(iframeWindow.title);
		iframeWinSave.saveCommonComments(iframeWindow.title);
	}
	//判断审核意见中的审批结论是否有数据
	if(iframeWindow.title == tab_title){
		var iframeWin = tabs.getTabWinByTitle("审核意见");
		var _conclusion = iframeWin.$("#dtoauditConclusion").val();
		if(_conclusion==''){
			$("").newMsg({}).show("请选择审批结论！");
			return false;
		}
//		if(bizType == "1000"){
//			v_boolean = validateCustomerInfo(v_boolean);
//			if(!v_boolean) {
//				return false;
//			}
//		}

		//校验  审核意见是否保存是否满足校验条件
		if(iframeWin.validateForm()){
		}else{
			return false;
		}
	}
	
	if(iframeWindow.title =="线上稽核"){
		var iframeWin = tabs.getTabWinByTitle("线上稽核");
		if(!iframeWin.checkInto()){
			return false;
		}
	}
	
	//判断是房贷实地是否上传照片
	if(iframeWindow.title == "实地" ){
 		if(!checkHouseSdAttach()) {
			return false;
		}
    }
	//审核意见tab提交时判断是否所有配置事物都已经完成
	var audit_result = $("#auditResult").val();
	//如果审核结果是拒绝并加入黑名单，则不用进行实物验证
    if(iframeWindow.title == tab_title ){
    	if(audit_result!="3900" && audit_result!="3300"){
    		v_boolean = validateTransConfig(v_myTurn,v_boolean,activeName);
    		if(!v_boolean) {
    			return false;
    		}
    	}
    }
    
	//如果审核意见界面直接点击同意可保存审核信息
	if((iframeWindow.title == tab_title && v_myTurn=="同意")||(iframeWindow.title == tab_title && v_myTurn=="拒绝") || (activeName=="核价" &&  v_myTurn=="提交") 
			|| (iframeWindow.title == tab_title && v_myTurn=="提交")){	
		var iframeWin = tabs.getTabWinByTitle(tab_title);
		if(audit_result=="3100" || audit_result=="3200"){
			//验证黑名单
//			validateBlack();
			//验证是否有未处理的回退清单
//			v_boolean = validateUntreatedBackList(v_boolean);
//			if(!v_boolean) {
//    			return false;
//    		}
			//验证黑名单及验证是否有未处理的回退清单
			v_boolean = validateBlackAndUntreatedBackList();
			if(!v_boolean) {
    			return false;
    		}
			if(bizType == "1000" || bizType == "1001" || bizType == "1002"){//信审审批、客户复议审批、线上稽核审批
				v_meg = iframeWin.getEsbContractSignMoney(v_meg);
				if(v_meg!="" && v_meg!="1" ) {
					$("").newMsg({}).show(v_meg);
	    			return false;
	    		}
			}
			
		}
		iframeWin.doMergeForm(function(){
			  var _approval = iframeWin.$("#approval").val();//判断是否为循环贷
			  if(_approval=="Y"){//循环贷环节操作
				  promptOperateLooploan(iframeWin,iframeWin.revolving_credit_table,v_myTurn,v_boolean);
			  }else{//非循环贷环节操作
				  validateOperator(v_myTurn,v_boolean);
			  }
		});
	}else{
		if(iframeWindow.title =="线上稽核"){
			var iframeWin = tabs.getTabWinByTitle("线上稽核");
			iframeWin.doMergeForm(function(){});
		}else if(iframeWindow.title == tab_title){
			var iframeWin = tabs.getTabWinByTitle(tab_title);//审核意见
			iframeWin.doMergeForm(function(){});
		}
		validateOperator(v_myTurn, v_boolean);
	}
}


function judgeAntiToHumanDeal(intoAppId){
	var params = "";
	var url=contextRootPath+'/lbtAntiToHuman/judgeAntiToHumanDeal?intoAppId='+intoAppId;
	var falg = false;
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			debugger;
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		falg =  true;
        	}else{
        		$("").newMsg({}).show(msg.msg);
        		falg =  false;
        	}
     	},"","",false);
	
	return falg;
}
/**
 * 校验是否校验 批贷建议 是否查看
 * @param v_myTurn
 * @param v_boolean
 */
function validateOperator(v_myTurn,v_boolean) {
	var bizType = $("#bizType").val();
	//信审流程，选提交 或者 跨级提交时，校验批贷建议是否全部查看
	if(bizType == "1000" && (v_myTurn == "同意" || v_myTurn == "拒绝" || v_myTurn == "跳转")){
		
		var intoId = $("#intoId").val();
		var urlCheck = contextRootPath+"/lbTUpReportComment/checkIsHaveAdviseNoView?intoId="+intoId;
		jyAjax(urlCheck, '', function(msg){
			if(msg.data == true){//存在未查看的批贷建议

				//提示批贷建议确认信息，点确认即可继续
				var msg = msg.msg;
				jyDialog().confirm(""||msg, function(){
					
					afterValidateOperator(v_myTurn, v_boolean);
					
				});
				
			}else{//所有批贷建议已经查看
				
				afterValidateOperator(v_myTurn, v_boolean);
				
			}
		});
		
	}else{//非信审流程，照常处理
		
		afterValidateOperator(v_myTurn, v_boolean);
		
	}
}
/**
 * 完成 其他业务校验控制、查询下一个环节处理人、完成待办
 * @param v_myTurn
 * @param v_boolean
 * @returns {Boolean}
 */
function afterValidateOperator(v_myTurn,v_boolean) {
	var activeName = $("#acitityName").val();
	var bizType = $("#bizType").val();
	var iframeWindow = tabs.getActiveObj();
	//判断审核意见中的审批结论是否有数据 
	//如果是退回补充调查，再次进行提交时需要再次进行反欺诈评分
	if(iframeWindow.title == "审核意见" || iframeWindow.title == "调查表"){
		if(bizType == "1000"){
			if(activeName.indexOf("信审专员")>-1){
				v_boolean = validateInvokeLog(v_boolean,activeName);
				if(!v_boolean) {
					return false;
				}
			}
		}
	}
	//全部校验通过
	if(v_boolean){
		$("#dtoturnDirection").val(v_myTurn);//选中 option
		makeupPartnerInfo();//组装选人参数信息
		console.log("===============组装选人参数信息时间S  ： "+getNowFormatDate());
		var jump=JBPM.common.getTaskInfo(v_myTurn);
		console.log("===============组装选人参数信息时间 E ： "+getNowFormatDate());
		if(jump) return;
		//选人规则判断
		console.log("===============选人规则判断时间 S ： "+getNowFormatDate());
		var nextF = JBPM.common.decidedSelectPartnerRuleOfBiz(v_myTurn);
		console.log("===============选人规则判断时间 E ： "+getNowFormatDate());
		//需要人工 选择参与者的 则弹出页面 
		if(!nextF)	return;
		//真实执行待办任务的 方法
		var text="";
		if(v_myTurn==="调查命中"){
			text='<label style="color:#ff0000;font-weight:bold;">您确定要执行待办任务吗？</label>';
		}
		if(v_myTurn==="拒绝并加入黑名单"){
			text='<label style="color:#BF3EFF;font-weight:bold;">您确定要执行待办任务吗？</label>';
		}
		
		console.log("===============结束选人时间  ： "+getNowFormatDate());
		debugger;
		subTask(v_myTurn,text);
	}
}


function prepareJumpTask(v_myTurn){
	var v_boolean = true;
	//判断是否全部校验通过了
	if(v_boolean){
		$("#dtoturnDirection").val(v_myTurn);//选中 option
		makeupPartnerInfo();//组装选人参数信息
		//选人规则判断
		var nextF = JBPM.common.decidedSelectPartnerRule(v_myTurn);
		//需要人工 选择参与者的 则弹出页面 
		if(!nextF)	return;
		//真实执行待办任务的 方法
		subTask(v_myTurn);
	}
}

/*
 * 提交 执行 待办任务
 */
function subTask(v_myTurn,text){
	
	jyDialog().confirm(text||"您确定要执行待办任务吗？", function(){
		//组装选中的参与者信息
		makeupPartnerInfo(v_myTurn);
		$("[name^='myProButn']").attr("disabled",true);
		
		/* 当流程为：信审审批、客户复议审批、线上稽核审批，
		 * 页面为 审核意见 页面
		 * 操作为"拒绝"，"跳转"
		 */
		var iframeWin = tabs.getTabWinByTitle("审核意见");
		var bizTypeT = $("#bizType").val();
		var tab_titleT ="审核意见";
		var iframeWindowT = tabs.getActiveObj();
		var intoIdT = $("#intoId").val();
		if(iframeWindowT.title == tab_titleT
				&&(bizTypeT == "1000" || bizTypeT == "1001" || bizTypeT == "1002")&&(v_myTurn=="拒绝"||v_myTurn=="跳转")){
			var refuseReson= iframeWin.$('#dtotwoRefuseReason option:selected').val();
			var _conclusion = iframeWin.$("#dtoauditConclusion").val();
			if( _conclusion="3300"){//审核拒绝
				var openUrl= contextRootPath+'/lbTIntoLimit/changeLbTIntoLimit?fkIntoAppId='+intoIdT+'&refuseReson='+refuseReson;
				jyAjax(openUrl,"",function(data){
					/*var v_status = data.status;
					if(v_status.indexOf('ok') >-1){
					}*/
				});
			}
		}
		
		//如果需要 保存业务操作 数据 则异步先保存
		//异步保存成功后 再 执行工作流（执行待办任务）
		var url= contextRootPath+'/dojbpm/jbpmcreditaudit/executeCreditAuditWorkFlow.do';
		var parem = $("#bizFormData").serialize();
		jyAjax(url,parem,function(data){
			var v_status = data.status;
			if(v_status.indexOf('ok') >-1){
				closeWindow();
			}
		});
	});
}
/*
 * 关闭任务窗口
 */
function closeWindow(){
	try{
		window.opener.refreshThePage();
		var api = frameElement.api, W = api.opener;
		//获取父页面的值
		api.close();
		//调用父页面查询 关闭时刷新父页面
		W.queryData();
	}catch(e){
		window.close();
	}
}

//验证客服补件业务是否已被处理
function validateInfoDone(v_boolean){
	var url= contextRootPath+'/lbTIntoAuditResult/validateInfoDone';
	var param = "intoId="+ $('#intoId').val()+"&auditState=2400";
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

//验证回退清单
function validateBackListCount(v_boolean){
	var url= contextRootPath+'/returnlist/validateBackInfo?intoCustRefId=' + $('#intoCustRefId').val();
	jyAjax(url,"",function(msg){
		var msg = msg.msg;
		if(msg.indexOf('yes') >-1){
			v_boolean = true;
		}else{
			$("").newMsg({}).show("请添加需要补充的资料信息！");
			v_boolean = false;
		}
	},"","",false);
	return v_boolean;
}

//提交审核时验证宅电和邮件
function validateCustomerInfo(v_boolean){
	var url= contextRootPath+'/lbTAuditCheck/valiateLbTAuditCheck';
	var param = "intoId="+ $('#intoId').val();
	jyAjax(url,param,function(msg){
		var msg = msg.data;
		if(msg=='1'){
			$("").newMsg({}).show("请对客户信息(申请单)中的电子邮件进行检查！");
			v_boolean = false;
		}else if(msg=='2'){
			$("").newMsg({}).show("请对客户信息(申请单)中的住宅电话 进行检查！");
			v_boolean = false;
		}else if(msg=='3'){
			$("").newMsg({}).show("请对客户信息(申请单)中的邮件、住宅电话进行检查！");
			v_boolean = false;
		}
	},"","",false);
	return v_boolean;
}


//验证反欺诈调用结果
function validateInvokeLog(v_boolean,isSurvey){
	debugger;
	var url= contextRootPath+'/lbtAntiToHuman/secondInsAndScore';
	var param = "intoId="+ $('#intoId').val()+"&isSurvey="+isSurvey;
	jyAjax(url,param,function(msg){
		var msg = msg.msg;
		debugger;
		if(msg!=null ){
			$("").newMsg({}).show(msg);
			v_boolean = false;
		}
	},"","",false);
	return v_boolean;
}


/**
 * 保存公共备注信息
 */
function saveCommonComments(title){
	var _reamrkVal = encodeURIComponent($("#remarkPointId").val());
	if(_reamrkVal != "" && _reamrkVal != undefined){
 		parent.makeupPartnerInfo();//调用autitloan 相关js 方法组装流程参数信息
	 	var params = parent.$("#bizFormData").serialize();
 		var remarkDateJson = params+"&systemActiveInfo="+title+"&optionRemark="+_reamrkVal;
	 	var url =contextRootPath+'/dojbpm/OperateJbpm4BizOptionController/opeateJbpm4BizOption.do';
	 	jyAjax(url,remarkDateJson,function(msg){
			var msg = msg.msg;
		},"","",false);
 	}
}



/***
 * 切换标签页
 * @param path
 */
function changeTab(path){
	var title=tabs.getActiveObj()["title"];
	tabs.replaceIconByTitle(title,path);
}

/***
 * 显示消息时长
 * @param message
 * @param time
 */
function showMessage(message,time){
	var t=time||6000;
	$("").newMsg({"waitTime":t}).show(message);
}


/***
 * 客户放弃
 */
function customerDropInfo(){
	//组装选中的参与者信息
	if(!checkIsNull("auditStateFormData")) {
		return;
	}
	var reason = $("#dtoreason").val();
	var remark = $("#dtoremark").val();
	var v_myTurn = "客户放弃";
	makeupPartnerInfo(v_myTurn);
	$("#dtoturnDirection").val(v_myTurn);
	$("[name^='myProButn']").attr("disabled",true);
	//如果需要 保存业务操作 数据 则异步先保存
	//异步保存成功后 再 执行工作流（执行待办任务）
	var url= contextRootPath+'/dojbpm/jbpmcreditaudit/executeCreditAuditWorkFlow.do';
	var parem = $("#bizFormData").serialize()+ "&reason="+encodeURI(reason)+"&remark="+encodeURI(remark);
	jyAjax(url,parem,function(data){
		var v_status = data.status;
		if(v_status.indexOf('ok') >-1){
			closeWindow();
		}
	});
}


function toCustDropAndQuit(v_myTurn) {
	var url=contextRootPath+'/lbTIntoInfo/prepareExecute/LBTIntoInfoQuit?id='+$("#intoId").val()+"&appProductType="+$("#prodId").val()+'&auditeState=3600';
	var dialogStruct={
			'display':url,
			'width':600,
			'height':352,
			'title':'客户放弃',
			'isIframe':'false',
			'buttons':[
			           {'text':'提交','action':customerDropInfo},
			           {'text':'关闭','isClose':true}
			           ]
	};
	dialogAdd =jyDialog(dialogStruct);
	dialogAdd.open();
}

function validateBlack() {
	var url = contextRootPath+'/lbTIntoInfo/validateBlackBeforeSaveInfo?custId='+$("#custId").val();
	jyAjax(url,"",function(msg){
			var v_status = msg.status;
			if(v_status.indexOf('ok') >-1){
				if(msg.data && msg.data.length> 0) {
					var datas = msg.data;
					var str="";
					var title="<span style='font-weight:bolder;color:#ff0000;'>以下信息存在于黑名单中！</span><br/>";
					var flag = false;
					for(var i=0;i<datas.length;i++) {
						str+=(i+1)+")"+datas[i]["param"]+": "+datas[i]["dataValue"]+"<br/>";
						flag = true;
					}
					if(flag) {
						jyDialog().alert(title+str,"警告:");
					}
				}
			}
		}
	);
}
// 验证房贷产品是否上传实地照片
function checkHouseSdAttach() {
	var checkResult = false;
	var params = "intoId=" + $('#intoId').val();
	var url = contextRootPath + '/lbTIntoInfo/checkHouseSdAttach';
	jyAjax(url,params,function(msg){
		var v_status = msg.status;
		if (v_status.indexOf('ok') > -1) {
			if (msg.data && msg.data.length > 0) {
				var datas = msg.data;
				var str = "";
				var strArray = [];
				var custName = "";
				for (var i = 0; i < datas.length; i++) {
					if (custName != datas[i]["CUST_NAME"]) {
						custName = datas[i]["CUST_NAME"];
						if (i > 0) {
							strArray.push(str);
						}
						str = "<span style='font-weight:bolder;color:#ff0000;'>"
								+ custName + "</span>: ";
					}
					str += (datas[i]["ATT_TYPE_NAME"] + "/");
				}
				strArray.push(str);
				$("").newMsg({"title" : "请上传如下附件","waitTime" : 10000}).show(strArray);
				checkResult = false;
			}else {
				checkResult = true;
			}
		} else {
				jyDialog().alert(msg.msg);
				checkResult = false;
		}
	},"","",false);
	return checkResult;
}

/**
 * 信审各个环节，若未进行在途借款勾选，进行提示"您未选择任何在途借款,是否确认提交？"操作
 */
function promptOperateLooploan(iframeWin,revolving_credit_table,v_myTurn,v_boolean){
  	    var objJsons = revolving_credit_table.getAllData();
    	var _conclusion = iframeWin.$("#dtoauditConclusion").val()
    	if(objJsons.length>0){
    		    if(!isOverDueStatusContract(objJsons)&&isNormalStatusContract(objJsons)){//判断该循环贷客户是否有正常状态的合同
   		    	  if(!isCheckNormalStatusContract(objJsons)){ //1-1 为任何借新还旧合同选择，进行提示
   		    		 jyDialog().confirm("您未选择任何在途借款,是否确认提交？", function(){
   		    			 iframeWin.doAddFrom(function(){
      			    		 validateOperator(v_myTurn,v_boolean);
      			    	 });
   		    		 });
   			      }else{//1-2  已选择借新还旧合同，进行保存操作
   			    	  if(v_myTurn == "拒绝"){
   			    		 $("").newMsg({}).show("拒绝时无需选择任何在途借款！");
  		  			     return false;
   			    	  }
   			    	  iframeWin.doAddFrom(function(){
   			    		 validateOperator(v_myTurn,v_boolean);
   			    	  });
   			      }
   		        }else if(isOverDueStatusContract(objJsons)){ //若存在"逾期"的合同，只能进行"拒绝"操作
   		        	 if(_conclusion == "3300" || _conclusion == "3400" || _conclusion == "3500" ||_conclusion == "3350"
  		  			     || _conclusion== "3600" || _conclusion == "3900"){
  		        		 validateOperator(v_myTurn,v_boolean); 
  		        	 }else if(_conclusion == "3100" || _conclusion == "3200"){
  		        		 $("").newMsg({}).show("此客户不符合循环贷申请条件,请进行拒绝操作！");
  		  			     return false;
  		        	 }
   		        }else{//该循环贷客户无正常状态的合同，按非循环贷正常流程执行
   		        	validateOperator(v_myTurn,v_boolean);
   		        } 
        }else{
        	 //无法查询循环贷客户历史合同信息，可以进行拒绝操作！
	       	 if(_conclusion == "3300" || _conclusion == "3400" || _conclusion == "3500" ||_conclusion == "3350"
				     || _conclusion== "3600" || _conclusion == "3900"){
	      		 validateOperator(v_myTurn,v_boolean); 
	      	 }else if(_conclusion == "3100" || _conclusion == "3200"){
	      		 $("").newMsg({}).show("无法查询循环贷客户历史合同信息,请进行拒绝操作！");
				 return false;
	      	 }
        } 
	  return v_boolean;
}

//判断循环贷是否有正常状态的合同
function isNormalStatusContract(objJsons){
	 var i =objJsons.length;
	 while (i--) {
         if (objJsons[i]["loanStatus"] =="09") {
          return true;
         }   
     }  
	 return false;
}

//判断循环贷是否已勾选在途借款
function isCheckNormalStatusContract(objJsons){
	 var i =objJsons.length;
	 while (i--) {
        if (objJsons[i]["remark"] =="1") {
         return true;
        }   
    }  
	 return false;
}

//判断循环贷是否有逾期状态的合同
function isOverDueStatusContract(objJsons){
	 var i =objJsons.length;
	 while (i--) {
         if (objJsons[i]["loanStatus"] =="10") {
          return true;
         }   
     }  
	 return false;
}


/***
 * 转办
 */
function transferAssignee(iframeWindow){
	var remark = "";
	if(iframeWindow.title=="转办日志"){
		var iframeWinSave = tabs.getTabWinByTitle(iframeWindow.title);
		remark = iframeWinSave.$("#transferlog").val();
	}
	//获取任务ID
	var selectedId = $("#dtotaskId").val();
	if(selectedId=="" && logValue != undefined){
		jyDialog({"type":"warn"}).alert("请选择要转办的任务！");
		return ;
	} 
	var v_tasks = selectedId;
	$.dialog({
		id:	'transferAssignee',
		lock: true,
		width:600,
		height:750,
		title:'转移任务',
		content: 'url:'+contextRootPath+'/component/jbpm/befloan/updateAssignee.jsp?tasks='+v_tasks+"&"+parent.$("#bizFormData").serialize()+"&remark="+remark
	});
}

//验证是否有未处理的回退清单
function validateUntreatedBackList(v_boolean) {
	var url = contextRootPath+'/returnlist/validateUntreatedBackList?intoCustRefId='+$("#intoCustRefId").val()+'&taskId='+$("#dtotaskId").val();
	jyAjax(url,"",function(msg){
		var msg = msg.msg;
		if(msg.indexOf('yes') >-1){
			$("").newMsg({}).show("请先删除未处理的回退清单！");
			v_boolean = false;
		}else{
			v_boolean = true;
		}
	},"","",false);
	return v_boolean;
}

//判断进件是否被作为关联件冻结
function antiFreezeResultDeal(intoAppId){
	var params = "";
	var url=contextRootPath+'/lbTIntoInfo/antiFreezeResultDeal?intoAppId='+intoAppId;
	var falg = false;
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			var v_status = msg.status;
	      	if(v_status.indexOf('ok') >-1){
	      		falg =  true;
	      	}else{
	      		$("").newMsg({}).show(msg.msg);
	      		falg =  false;
	      	}
	   	},"","",false);
	
	return falg;
}



function validateIntoInfo(intoAppId){
	var params = "";
	var url=contextRootPath+'/lbTIntoAuditResult/validateIntoInfo?intoId='+intoAppId;
	var falg = false;
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		falg =  true;
        	}else{
        		$("").newMsg({}).show(msg.msg);
        		falg =  false;
        	}
     	},"","",false);
	
	return falg;
}


function validateBlackAndUntreatedBackList(){
	var v_boolean = true;
	var url = contextRootPath+'/lbTIntoInfo/validateBlackAndUntreatedBackList?custId='+$("#custId").val()+'&intoCustRefId='+$("#intoCustRefId").val()+'&taskId='+$("#dtotaskId").val();
	jyAjax(url,"",function(msg){
			var v_status = msg.status;
			if(v_status.indexOf('ok') >-1){
				if(msg.data && msg.data.length> 0) {
					var datas = msg.data;
					var str="";
					var title="<span style='font-weight:bolder;color:#ff0000;'>以下信息存在于黑名单中！</span><br/>";
					var flag = false;
					for(var i=0;i<datas.length;i++) {
						str+=(i+1)+")"+datas[i]["param"]+": "+datas[i]["dataValue"]+"<br/>";
						flag = true;
					}
					if(flag) {
						jyDialog().alert(title+str,"警告:");
					}
				}
			}
			
			var msg = msg.msg;
			if(msg.indexOf('yes') >-1){
				$("").newMsg({}).show("请先删除未处理的回退清单！");
				v_boolean = false;
			}else{
				v_boolean = true;
			}
		},"","",false);
	return v_boolean;
    }