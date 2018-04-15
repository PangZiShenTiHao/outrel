//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAdd;
function openOpDialog(url,title,fun){
	var dialogStruct={
			'display':url,
			'title':title,
			'isIframe':'false',
			'buttons':[
			           {'text':'保存','action':fun},
			           {'text':'关闭','isClose':true}
			           ]
	};
	dialogAdd =jyDialog(dialogStruct);
	dialogAdd.open();
}
function toAddData(loanType,title){
	var parentTitle=getActiveTabTitle();
	if(!title) {
		title="新增进件信息";
	}
	var url=contextRootPath+'/lbTIntoInfo/prepareExecute/addLbTIntoInfo?operateBtn=add&loanType='+loanType+'&tabTitle='+title+'&parentTitle='+parentTitle;
	
	var obj = {
			"title" : title,
			"url" : url,
			"cascade": true,
			"closeFun":function(iframe,closeFun){
				var closeBtn=iframe.getBtn()[0];
				closeBtn.click();
			}
	};
	window.top.tabs.add(obj);
}

//utf-8
//点击新增按钮 事件跳转至 新增页面
function toAppendData(){
	var v_objs=getObjs("请选择待追加客户的数据！");
	if(!v_objs){
		return;
	}
	
	if(!checkIntoCanEdit(v_objs.id)) {
		jyDialog().alert("该进件状态已经变更，当前状态不允许编辑！<br>请重新查询再操作！");
		return;
	}
	
	if(v_objs.auditeState=="1050") {
		jyDialog().alert("请先保存进件信息, 再追加借款人!");
		return;
	}
	var into_code = v_objs.intoAppId;//进件编号
	
	var url = contextRootPath+'/car/prepareExecute/judgeProductType?intoAppId='+into_code;
//	//判断进件产品是否是抵押贷产品
	$.ajax({
		 type:"POST",
	     dataType:"JSON",
	     url:url,
	     success:function(result){
	    	 debugger;
	    	 if(result != "Y"){
	    			var v_ids=v_objs.id;
	    			var v_prodpType=v_objs.appProductType;
	    			var v_loanType=v_objs.loanType;
	    			var v_customerManager=v_objs.customerManager;
	    			
	    			var parentTitle=getActiveTabTitle();
	    			var title="追加客户("+v_objs.intoAppId+")";
	    			var url = contextRootPath+'/lbTIntoInfo/prepareExecute/appendLbTIntoInfo?operateBtn=add';
	    			url += '&id='+v_ids+"&appProductType="+v_prodpType+'&loanType='+v_loanType+'&customerManager='+v_customerManager+'&tabTitle='+title+'&parentTitle='+parentTitle;
	    			
	    			var obj = {
	    					"title" : title,
	    					"url" : url,
	    					"cascade": true,
	    					"closeFun":function(iframe,closeFun){
	    						debugger;
	    						var closeBtn=iframe.getBtn()[0];
	    						closeBtn.click();
	    					}
	    			};
	    			window.top.tabs.add(obj);
	    	 } else{
	    		 jyDialog().alert("抵押贷产品不支持追加借款人!");
	    	 }
	     }
	});

}

/**
 * 获取客户基本信息的所有参数
 * @returns
 */
function getCustomerForm(){
	var params=[];
	//客户主信息
	params.push($("#addNewsFormData2").serialize());
	//客户工作
	params.push($("#addNewsFormData3").serialize());
	//私营业主信息
	params.push('manageStr=' + encodeURIComponent(manageInfoTable.toJson()));
	//联系人信息
	params.push('contactStr=' + encodeURIComponent(linkPersonTable.toJson()));
	//房产信息
	params.push('houseStr=' + encodeURIComponent(houseInfoTable.toJson()));
	//保单信息
	params.push('insurpolicyStr=' + encodeURIComponent(insurpolicyTable.toJson()));
	//银行卡信息
	params.push('bankCardStr=' + encodeURIComponent(bankCardInfoTable.toJson()));
	
	var paramStr= {
		"canModifyCustomer":$("#canModifyCustomer").val(),
		"applyPrefix":$("#pyApplyPrefix").val()
	};
	params.push('paramStr=' + tools.parseJson2String(paramStr));
	
	return params.join("&");
}

/**
 * 获取进件申请信息的所有参数
 * @returns {String}
 */
function getIntoInfoForm(){
	return $("#addNewsFormData1").serialize()+"&intoRemark="+$("#addNewsFormData1 #dtoremark").val();
}

/**
 * 获取流水负债信息的所有参数
 * @returns
 */
function getSerialLiabilityForm(){
	sumFun(0);
	calculateUsedRate();
	calculateDebtSum();
	calculateIncomeDebtRatio();

	var params=[];
	var dtostartFromMonthSelectVal=$("#dtostartFromMonthSelect").val();
	if(undefined==dtostartFromMonthSelectVal) {
		dtostartFromMonthSelectVal=1;
	}
	params.push("&startFromMonthSelect="+dtostartFromMonthSelectVal);
	//流水系数
	params.push($("#serialInfo").serialize()+"&serialRemark="+$("#serialInfo #dtoremark").val());
	//流水明细
	params.push("serialInfoJson="+serialTable.toJson());
	//征信查询记录
	params.push($("#lbTLiability").serialize()+"&liabilityRemark="+$("#lbTLiability #dtoremark").val());
	//信用卡信息
	params.push("creditCardJson="+creditCardTable.toJson());
	//贷款情况
	params.push("loanJson="+loanTable.toJson());
	//贷款总概况
	params.push("summaryJson="+loanSummaryTable.toJson());
	
	return params.join("&");
}

function getIntoProductFormData(){
	var params=[];
	var prodInfoParam = $("#productFormData").serialize();
	params.push(prodInfoParam);
	
	var propNameStr = $("#productPropFormData #propNameStr").val();
	var propNameArray = propNameStr.split(",");
	var jsonArray = [];
	
	for(var i=0;i<propNameArray.length;i++) {
		var jsonObj = {
			"code":propNameArray[i],
			"defaultValue":$("#"+propNameArray[i]+"_DEFAULT").val(),
			"minValue":$("#"+propNameArray[i]+"_MIN").val(),
			"maxValue":$("#"+propNameArray[i]+"_MAX").val()
		}
		jsonArray.push(jsonObj);
	}
	params.push('prodInfoParamStr=' + tools.parseJson2String(jsonArray));
	
	var prodScopeParam = $("#productScopeFormData").serialize();
	params.push(prodScopeParam);
	
	return params.join("&");
}

/**
 * 保存进件信息
 * @returns {Function}
 */
function doAddForm(tabTitle,parentTitle){
	var intoId = $("#addNewsFormData1 #intoId").val();
	
	if(intoId && !checkIntoCanEdit(intoId)) {
		jyDialog().alert("该进件状态已经变更，当前状态不允许编辑！");
		return;
	}
	
	if(checkInto() && checkHomePartner()) {
		var params=getCustomerForm()+"&"+getIntoInfoForm()
		//校验黑名单
		checkBlackBeforeSaveInto(params, function() {
			params+="&"+getIntoProductFormData()+"&"+getSerialLiabilityForm();
			//校验通过, 保存进件信息
			var url=contextRootPath+'/lbTIntoInfo/insertLbTIntoInfo';
			//通过ajax保存
			jyAjax(
				url,
				params,
				function(msg){
					var v_status = msg.status;
					if(v_status.indexOf('ok') >-1){
						window.top.showMessage("保存成功!");
						//window.top.tabs.activeByTitle(parentTitle);
						flushTab(parentTitle);
						closeTab(tabTitle);
					}
			});
		});
	}
}

/**
 * 追加客户
 * @param intoInfoId
 * @returns {Function}
 */
function doAppendForm(intoInfoId,tabTitle,parentTitle){
	if(!checkIntoCanEdit(intoInfoId)) {
		jyDialog().alert("该进件状态已经变更，当前状态不允许编辑！");
		return;
	}
	
	if(checkInto()) {//通过校验
		var loanType = $("#addNewsFormData1 #dtoloanType").val();
		var params="intoId="+intoInfoId+"&loanType="+loanType+"&"+getCustomerForm();
		//校验黑名单
		checkBlackBeforeSaveInto(params, function() {
			params+="&"+getSerialLiabilityForm();
			//校验通过, 保存进件信息
			var url=contextRootPath+'/lbTIntoInfo/appendCustomerInfo';
			//通过ajax保存
			jyAjax(
				url,
				params,
				function(msg){
					var v_status = msg.status;
					if(v_status.indexOf('ok') >-1){
						window.top.showMessage("保存成功!");
						//window.top.tabs.activeByTitle(parentTitle);
						flushTab(parentTitle);
						closeTab(tabTitle);
					}
			});
		});
	}
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

//修改 事件
function toUpdateData(){
	var v_objs=getObjs("请选择待修改的数据！");
	if(!v_objs){
		return;
	}
	var v_ids=v_objs.id;
	
	if(!checkIntoCanEdit(v_ids)) {
		jyDialog().alert("该进件状态已经变更，当前状态不允许编辑！<br>请重新查询再操作！");
		return;
	}
	
	var parentTitle=getActiveTabTitle();
	var title="修改进件信息("+v_objs.intoAppId+")";
	var url=contextRootPath+'/lbTIntoInfo/prepareExecute/updateLbTIntoInfo?id='+v_ids+'&operateBtn=update&tabTitle='+title+'&parentTitle='+parentTitle;
	
	var obj = {
			"title" : title,
			"url" : url,
			"cascade": true,
			"closeFun":function(iframe,closeFun){
				var closeBtn=iframe.getBtn()[0];
				closeBtn.click();
			}
	};
	window.top.tabs.add(obj);
}
//获取更改的参数信息
function getUpdateFromParam(intoId, saveType) {
	var prodId = $("#prodId").val();
	var transCode = $("#transCode").val();
	var params = "prodId=" + prodId + "&transCode=" + transCode + "&"
			+ getIntoInfoForm() + "&" + getCustomerForm() + "&saveType=" + saveType;
	return params;
}
// 修改页面 的 保存操作
function doUpdateFrom(intoId,tabTitle,parentTitle){
	if(!checkIntoCanEdit(intoId)) {
		jyDialog().alert("该进件状态已经变更，当前状态不允许编辑！");
		return;
	}
	//校验
	if(checkInto() && checkHomePartner()) {
		var params=getUpdateFromParam(intoId,'1100');
		//校验黑名单
		checkBlackBeforeSaveInto(params, function(){
			
			params += "&" + getSerialLiabilityForm();
			var url=contextRootPath+'/lbTIntoInfo/updateLbTIntoInfo';
			//通过ajax保存
			jyAjax(
				url,
				params,
				function(msg){
					var v_status = msg.status;
					if(v_status.indexOf('ok') >-1){
						//更新成功后
						$("#doTempUpdateInto").css("display","none");
						window.top.showMessage("保存成功!",1500);
						//window.top.tabs.activeByTitle(parentTitle);
						//flushTab(parentTitle);
						//closeTab(tabTitle);
					}
				});
		});
	}
}
//共同居住者
function checkHomePartner(){
	var homePartner=$("input[name=homePartner]");
	if(homePartner.length>0){
		var check_push=[];
		for(var k in homePartner){
			if(homePartner[k].checked)
				check_push.push(homePartner[k].value);
		}
		if(check_push.length==0){
			$("").newMsg({}).show("请选择共同居住者!");
			return false;
		}
	}
	return true;
}
//删除 事件
function deleteData(){
	var v_objs=getObjs("请选择待删除的数据！");
	if(!v_objs){
		return;
	}
	var v_ids=v_objs.id;
	
	if(!checkIntoCanEdit(v_ids)) {
		jyDialog().alert("该进件状态已经变更，当前状态不允许编辑！<br>请重新查询再操作！");
		return;
	}
	
	var v_intoAppId=v_objs.intoAppId;
	var arr=checkOpenedTabByIntoId(v_intoAppId);
	if(arr.length>0) {
		jyDialog().alert("该进件有任务未完成,请完成后再操作!");
		return false;
	}

	jyDialog().confirm("您确认要删除选择的数据吗？", function(){
        var params="ids="+v_ids;
    	var url=contextRootPath+"/lbTIntoInfo/deleteLbTIntoInfo";
    	//通过ajax保存
    	jyAjax(
    			url,
    			params,
    			function(msg){
    				var v_status = msg.status;
    				if(v_status.indexOf('ok') >-1){
    					queryData();
    					$("").newMsg({}).show("操作成功!");
    				}
    			}
    	);
    });
}
//查看明细
function viewData(vId){
	var title="查看进件信息("+vId+")";
	var url=contextRootPath+'/lbTIntoInfo/prepareExecute/viewLbTIntoInfo?id='+vId+'&operateBtn=view&tabTitle='+title;
	
	var obj = {
			"title" : title,
			"url" : url
	};
	window.top.tabs.add(obj);
}

//查看明细
function viewDataByIntoAppId(vId,intoAppId){
	var title="查看进件信息("+intoAppId+")";
	var url=contextRootPath+'/lbTIntoInfo/prepareExecute/viewLbTIntoInfo?id='+vId+'&operateBtn=view&tabTitle='+title;
	
	var obj = {
			"title" : title,
			"url" : url
	};
	window.top.tabs.add(obj);
}

var dialogQuery;
//查询主借款人
function toQueryCustomerInfo(){
	var dialogStruct={
			'display':contextRootPath+'/lbTIntoInfo/prepareExecute/toQueryCustomerInfo',
			'width':950,
			'height':500,
			'title':'查询主借款人',
			'isIframe':'false',
			'buttons':[
			 {'text':'确定','action':queryCustomInerfo()},
			 {'text':'关闭','isClose':true}
			]
	};
		
	dialogQuery = jyDialog(dialogStruct);
	dialogQuery.open();
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

var checkTableArray = [];

/**
 *添加字段必填项校验事件
 **/
function setCheckColumn(confId,checkInitFun,bizNo){
	if(undefined==bizNo || null==bizNo || (bizNo+"").trim().length==0){
		bizNo="10000";
	}
	
	var url=contextRootPath+'/lbTNeedRequiredInfo/queryValidNeedRequiredListByProdId';
	var params={fkProConfId:confId,bizNo:bizNo};
	jyAjax(
		url,
		params,
		function(msg){
			if(msg.data){
				for(var i=0;i<msg.data.length;i++){
					var d=msg.data[i];
					var element=$("#"+d["checkName"]);
					element.attr("checkchname",d["checkChineseName"]);
					//element.attr("checktip",d["checkTip"]);
					switch(d["checkType"]){
						case "100":
							element.attr("notNull","true");
							break;	
						case "200":
							
						case "300":
							element.attr("checktype",d["checkOther"]);
							break;
						case "400":
							element.attr("regexp",d["checkOther"]);
							break;
						case "500":
							element.attr("checkfun",d["checkOther"]);
							break;
						case "600":
							var funStr=d["checkOther"];
							var fun=eval("("+funStr+")");
							fun(d);
					}
					if(d["maxLength"]){
						element.attr("maxLength",d["maxLength"]);
					}
				}
				
				if(checkInitFun) {
					checkInitFun();
				}
			}
		}
	);
}
/**
 * 多客户: 删除客户
 **/
function toDeleteCustomerData(){
	var v_obj=getObjs("请选择待删除客户的数据！");
	if(!v_obj){
		return;
	}
	
	if(!checkIntoCanEdit(v_obj.id)) {
		jyDialog().alert("该进件状态已经变更，当前状态不允许编辑！<br>请重新查询再操作！");
		return;
	}
	
	if(v_obj.isCommonBorrow != "1"){
		$("").newMsg({}).show("不是共同借款，不能删除从客户信息！");
		return;
	}
	
	var dialogStruct={
			'display':contextRootPath+'/lbTIntoInfo/prepareExecute/deleteLbTIntoCustomer?id='+v_obj.id,
			'width':750,
			'height':500,
			'title':'删除客户',
			'isIframe':'false',
			'buttons':[
			 {'text':'关闭','action':function() {
				 queryData();
			 },'isClose':true}
			]
		};

	dialogAdd =jyDialog(dialogStruct);
	dialogAdd.open();
}
//修改页面 的 保存操作
function doDeleteCustomerFrom(intoId){
	return function() {debugger;
		var v_objs=deleteCustomerTable.getSelectedObjs();
		//如果没有选中 数据则
		if(v_objs.length == 0){
			$("").newMsg({}).show("请选择待删除的数据！");
			return;
		}
		var customerIds = v_objs[0].id;
		for(var i=1;i<v_objs.length;i++) {
			customerIds+=","+v_objs[i].id;
		}
		
		jyDialog().confirm("您确认要删除选择的数据吗？", function(){
	        var params="intoId="+intoId+"&customerIds="+customerIds;
	    	var url=contextRootPath+"/lbTIntoInfo/deleteLbTCustomterInfo";
	    	//通过ajax保存
	    	jyAjax(
	    			url,
	    			params,
	    			function(msg){
	    				var v_status = msg.status;
	    				if(v_status.indexOf('ok') >-1){
	    					//新增成功后，
	    					deleteCustomerTable.removeSelectedRow();
	    					$("").newMsg({}).show("操作成功!");
	    				}
	    			}
	    	);
	    });
	}
}

//点击新增按钮 事件跳转至 新增页面
function toUploadIntoAttachment(){
	var v_objs=getObjs("请选择待上传附件的数据！");
	if(!v_objs){
		return;
	}
	var v_ids=v_objs.id;
	
	if(!checkIntoCanEdit(v_ids)) {
		jyDialog().alert("该进件状态已经变更，当前状态不允许编辑！<br>请重新查询再操作！");
		return;
	}
	
	var v_prodpType=v_objs.appProductType;	
	var parentTitle=getActiveTabTitle();
	var title="上传附件2("+v_objs.intoAppId+")";
	var url=contextRootPath+'/lbTIntoInfo/prepareExecute/uploadIntoAttachment?id='+v_ids+"&appProductType="+v_prodpType+'&tabTitle='+title+'&parentTitle='+parentTitle;
	debugger;
	var obj = {
			"title" : title,
			"url" : url,
			"cascade": true,
			"closeFun":function(obj,closeFun){
				flushTab(parentTitle);
				closeFun();
			}
	};
	window.top.tabs.add(obj);
}

//点击“押品管理”按钮
function toSecurityManage(){
	var v_objs=getObjs("请选择待管理押品的数据！");
	if(!v_objs){
		return;
	}
	
	if(!checkIntoCanEdit(v_objs.id)) {
		jyDialog().alert("该进件状态已经变更，当前状态不允许编辑！<br>请重新查询再操作！");
		return;
	}
	
	var into_code = v_objs.intoAppId;//进件编号
	var pruduct_type = v_objs.appProductType;
	var costomer_code = v_objs.fkCustCode;//客户编号
	var ownerName = v_objs.mainCustomer.custName;//客户姓名
	//发请求去判断该产品是否为车贷产品
	$.ajax({
		type:"post",
		dataType:"JSON",
		url:contextRootPath+'/car/prepareExecute/judgeProductType?intoAppId='+into_code,
		success:function(msg){
			if(msg=="Y"){
				var parentTitle=getActiveTabTitle();
				var title = "押品管理("+into_code+")";
				var parentTitle=getActiveTabTitle();
				var url=contextRootPath+'/car/prepareExecute/collateralManage?intoAppId='+into_code +'&pruductType='+pruduct_type+'&costomerCode='+costomer_code+"&ownerName="+ownerName+"&tabTitle="+title+"&parentTitle="+parentTitle;
//				var obj = {
//						"title" : title,
//						"url" : url,
//						"cascade": true,
//						"closeFun":function(obj,closeFun){
//							flushTab(parentTitle);
//							closeFun();
//						}
//				};
				var obj = {
						"title" : title,
						"url" : url,
						"cascade": true,
						"closeFun":function(iframe,closeFun){
//							debugger;
							var closeBtn=iframe.getBtn()[0];
							closeBtn.click();
						}
				};
				window.top.tabs.add(obj);
			}else{
				jyDialog().alert("请选择为抵押贷产品的进件！");
			}
		}
	});
	
}

/**
 * 保存进件时, 校验
 */
function checkInto() {
	var forms=["addNewsFormData1","addNewsFormData2","addNewsFormData3","serialInfo","lbTLiability"];
	var checkTrueCount=0;
	var nullErrors=[];
	var formatErrors=[];
	for(var i=0;i<forms.length;i++){
		var formObj=document.getElementById(forms[i]);
		submitCheckIsNull(formObj,null,nullErrors);
		checkFormFormat(formObj,null,null,formatErrors);
	}
	
	var tableNullmsg="";
	for(var i=0;i<checkTableArray.length;i++){
		var obj=checkTableArray[i];
		var tableObj=eval("("+obj["table"]+")");
		var checkmsg=obj["checkmsg"];
		if(tableObj.getRowsCount()<=0){
			$("#"+obj["div"]).addClass("expandSwapOver");
			tableNullmsg+=checkmsg+"<br/>";
			checkTrueCount+=1;
		}else{
			$("#"+obj["div"]).removeClass("expandSwapOver");
		}
	}
	
	var tableArray=[
	                 {"tableId":manageInfoTable,"tableName":"私营业主信息"}
	                ,{"tableId":linkPersonTable,"tableName":"联系人信息"}
	                ,{"tableId":houseInfoTable,"tableName":"房产信息"}
	                ,{"tableId":insurpolicyTable,"tableName":"保单信息"}
	                ,{"tableId":bankCardInfoTable,"tableName":"银行卡信息"}
	                ,{"tableId":serialTable,"tableName":"流水负债明细信息"}
	                ,{"tableId":creditCardTable,"tableName":"信用卡信息"}
	                ,{"tableId":loanTable,"tableName":"贷款明细信息"}
	                ,{"tableId":loanSummaryTable,"tableName":"贷款汇总信息"}
	];
//	var tableArray=[manageInfoTable,linkPersonTable,houseInfoTable,bankCardInfoTable,serialTable,creditCardTable,loanTable,loanSummaryTable];
	var cnt=0;
	var tableFormatmsg="";
	for(var i=0;i<tableArray.length;i++){
		var tableObj=tableArray[i];
		cnt=tableObj["tableId"].checkFormat();
		checkTrueCount+=cnt;
		if(cnt>0) {
			tableFormatmsg+="["+msgAddCss(tableObj["tableName"])+"]未通过校验<br/>";
		}
	}
	
	if(nullErrors.length) {
		var checkTip="["+msgAddCss(($(nullErrors[0]).attr("checkchname"))||"")+"]未通过校验";
		$("").newMsg({}).show(checkTip);
		return false;
	}
	
	if(formatErrors.length) {
		var checkTip="["+msgAddCss(($(formatErrors[0]).attr("checkchname"))||"")+"]未通过校验";
		$("").newMsg({}).show(checkTip);
		return false;
	}
	
	if(tableNullmsg.length>0) {
		$("").newMsg({}).show(msgAddCss(tableNullmsg));
		return false;
	}
	
	if(tableFormatmsg.length>0) {
		$("").newMsg({}).show(tableFormatmsg);
		return false;
	}
	
	//校验判断
	if(checkTrueCount>0){
		return false;
	}
	
	if(!checkContact()) {
		return false;
	}
	
	var mainOrSub=$("#addNewsFormData2 #mainOrSub").val();
	if(mainOrSub == "1") {
		var loanBankAccount=$("#addNewsFormData1 #dtoloanBankAccount").val();
		var receiveBankAccount=$("#addNewsFormData1 #dtoreceiveBankAccount").val();
		var selectedBankCardObj=getSelectedBankCardObj();
		var hasLoanBankCard=selectedBankCardObj["hasLoanBankCard"];
		var hasReceiveBankCard=selectedBankCardObj["hasReceiveBankCard"];
		if(loanBankAccount==""||receiveBankAccount==""||!hasLoanBankCard||!hasReceiveBankCard) {
			$("").newMsg({}).show("银行卡信息: <br/>请设定收款/放款银行卡账号!");
			return false;
		}
	}
	
	return true;
}

function msgAddCss(msg){
	return "<span style='font-weight:bolder;color:#ff0000;'>"+msg+"</span>"
}

/**
 * 将勾选的银行卡同步到进件部分
 */
function setBankCardtoInto(){
	var datas=bankCardInfoTable.getAllData();
	
	for(var i=0;i<datas.length;i++) {
		var data=datas[i];
		if(data.isLoanType==1) {
			$("#addNewsFormData1 #dtoloanName").val(data.accountName);
			$("#addNewsFormData1 #dtoloanBankAccount").val(data.bankCardAccount);
			$("#addNewsFormData1 #dtoloanBank").val(data.bankCode);
			$("#addNewsFormData1 #dtoloanSubBranchName").val(data.subBranchName);
		}

		if(data.isReceiveType==1) {
			$("#addNewsFormData1 #dtoreceiveName").val(data.accountName);
			$("#addNewsFormData1 #dtoreceiveBankAccount").val(data.bankCardAccount);
			$("#addNewsFormData1 #dtoreceiveBank").val(data.bankCode);
			$("#addNewsFormData1 #dtoreceiveSubBranchName").val(data.subBranchName);
		}
	}
}

function getSelectedBankCardObj(){
	var datas=bankCardInfoTable.getAllData();
	var bankCardObj={"hasLoanBankCard":false,"hasReceiveBankCard":false};
	
	if(datas&&datas.length){
		var hasCheckLoanBank=false;
		var hasCheckReceiveBank=false;
		for(var i=0;i<datas.length;i++) {
			var data=datas[i];
			if(data.isLoanType=='1') {
				var bankCard = {
						"loanName" : data.accountName,
						"loanBankAccount" : data.bankCardAccount,
						"loanBank" : data.bankCode,
						"loanSubBranchName" : data.subBranchName,
						"loanBankProvAreacode" : data.bankProvAreacode,
						"loanBankCityAreacode" : data.bankCityAreacode,
						"loanBankReservedPhone" : data.bankReservedPhone
				};
				bankCardObj["hasLoanBankCard"]=true;
				bankCardObj["loanBankCard"]=bankCard;
				hasCheckLoanBank=true;
				
				if(hasCheckLoanBank&&hasCheckReceiveBank) {
					break;
				}
			}
			
			if(data.isReceiveType=='1') {
				$("#addNewsFormData1 #dtoreceiveName").val(data.accountName);
				$("#addNewsFormData1 #dtoreceiveBankAccount").val(data.bankCardAccount);
				$("#addNewsFormData1 #dtoreceiveBank").val(data.bankCode);
				$("#addNewsFormData1 #dtoreceiveSubBranchName").val(data.subBranchName);
				var bankCard = {
						"receiveName" : data.accountName,
						"receiveBankAccount" : data.bankCardAccount,
						"receiveBank" : data.bankCode,
						"receiveSubBranchName" : data.subBranchName,
						"receiveBankProvAreacode" : data.bankProvAreacode,
						"receiveBankCityAreacode" : data.bankCityAreacode,
						"receiveBankReservedPhone" : data.bankReservedPhone
				};
				bankCardObj["hasReceiveBankCard"]=true;
				bankCardObj["receiveBankCard"]=bankCard;
				hasCheckReceiveBank=true;
				
				if(hasCheckLoanBank&&hasCheckReceiveBank) {
					break;
				}
			}
		}
	}
	
	return bankCardObj;
}

/**
 * 更改进件状态(提交/拒贷/放弃)
 * @param auditeState
 */
function updateAuditeState() {
	if(!checkIsNull("auditStateFormData")) {
		return;
	}
	
	var params=$("#auditStateFormData").serialize()
	var url=contextRootPath+'/lbTIntoInfo/updateAuditeState';
	//通过ajax保存
	jyAjax(
			url,
			params,
			function(msg){
				var v_status = msg.status;
				if(v_status.indexOf('ok') >-1){
					//新增成功后，
					$("").newMsg({}).show("操作成功!");
					dialogAdd.close();
					queryData();
				}
			}
	);
}

function openAuditeStateDialog(title,url){
	var dialogStruct={
			'display':url,
			'width':600,
			'height':312,
			'title':title,
			'isIframe':'false',
			'buttons':[
			           {'text':'提交','action':updateAuditeState},
			           {'text':'关闭','isClose':true}
			           ]
	};
	dialogAdd =jyDialog(dialogStruct);
	dialogAdd.open();
}

/**
 * 将进件更改为加急
 */
function updateIntoEms() {
	var v_objs=getObjs("请选择待操作的数据！");
	if(!v_objs){
		return;
	}
	
	if(v_objs.isEms == "1") {
		$("").newMsg({}).show("该进件已经标记为加急,请勿重复操作!");
		return;
	}
	
	var params="id=" + v_objs.id;
	var url=contextRootPath+'/lbTIntoInfo/updateIntoEms';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			var v_status = msg.status;
			if(v_status.indexOf('ok') >-1){
				//新增成功后，
				$("").newMsg({}).show("操作成功!");
				queryData();
			}
		}
	);
}

function loadFun(loadIndex,loadMap,loadEndFun){
	var me=arguments.callee;
	var loadObj=loadMap[loadIndex];
	if(loadObj){
		$("#"+loadObj[0]).load(loadObj[1],function(responseTxt,statusTxt,xhr){
			if(statusTxt=="success"){
				loadIndex+=1;
				if(loadIndex<loadMap.length){
					me(loadIndex, loadMap,loadEndFun);
				}else{
					loadEndFun();
					
				}
			}
		});
	}
}

var intoAuditeState;
var intoTitle;
var intoV_ids;
//提交
function intoSubmit(auditeState,title,type) {
	var v_objs=getObjs("请选择待提交的数据！");
	if(!v_objs){
		return;
	}
	var v_ids=v_objs.id;
	
	if(!checkIntoCanEdit(v_ids)) {
		jyDialog().alert("该进件状态已经变更，当前状态不允许编辑！<br>请重新查询再操作！");
		return;
	}
	//进件规则校验
	if(!intoCheckModule(v_ids)){
		return;
	}
	var product_type = v_objs.appProductType;
	var into_code = v_objs.intoAppId;//进件编号
	//通过ajax请求判断 如果是车贷产品必须关联押品
	$.ajax({
		type:"post",
		dataType:"JSON",
		url:contextRootPath+'/car/relevanceCollateral?productType='+product_type+'&intoId='+into_code,
		success:function(msg){
			debugger;
		if("NO"==msg){
			$("").newMsg({"title":"提示：","waitTime":10000}).show("请为此抵押贷产品关联押品！");
		} 
//		else if("MAX"==msg){
//			$("").newMsg({"title":"提示：","waitTime":10000}).show("最多只能关联5个押品！请在“押品管理”里移除多余的押品。");
//		}
		else{
			var params="intoId=" + v_ids+"&type="+type;
			var url=contextRootPath+'/lbTIntoInfo/checkAttachBeforeSubmit';
		//通过ajax保存
		jyAjax(
			url,
			params,
			function(msg){
				var v_status = msg.status;
				if(v_status.indexOf('ok') >-1){
					debugger;
				//新增成功后，
				if(msg.data && msg.data.length> 0) {
					var datas = msg.data;
					var str = "";
					var strArray=[];
					var custName = "";
					for(var i=0;i<datas.length;i++) {
						if(custName != datas[i]["CUST_NAME"]) {
							custName = datas[i]["CUST_NAME"];
							if(i>0) {
								strArray.push(str);
							}
							str="<span style='font-weight:bolder;color:#ff0000;'>"+ custName +"</span>: ";
						}
						str+=(datas[i]["ATT_TYPE_NAME"]+"/");
					}
					strArray.push(str);
					$("").newMsg({"title":"请上传如下附件","waitTime":10000}).show(strArray);
				} else {
					var v_intoAppId=v_objs.intoAppId;
					var arr=checkOpenedTabByIntoId(v_intoAppId);
					if(arr.length>0) {
						jyDialog().alert("该进件有任务未完成,请完成后再操作!");
						return false;
					}
					
					if(type == 1){//提交
						intoAuditeState = auditeState;
						intoTitle = title;
						intoV_ids = v_ids;
						checkPhotoAttach(v_ids);
					}else{//提交录单
						
						//确定后，执行操作
						jyDialog().confirm("您确定要提交录单吗？", function(){
							var v_params="intoId=" + v_ids;
							var url = contextRootPath+'/lbTIntoInfo/submitRecordSingle';
							jyAjax(url,v_params,function(msg){
								
								if(msg.data == true){
									$("").newMsg({}).show("操作成功！");
					        		queryData();
								}else{
									$("").newMsg({}).show("操作失败！");
								}
								/*var v_status = msg.status;
					        	if(v_status.indexOf('ok') >-1){
					        		//新增成功后，
									
					        	}*/
							},"","",false);
						})
					}
					
				}
			} else {
				jyDialog().alert(msg.msg);
			}
		}
	 );
   }
  }
});
}

//提交进件信息
function submmitIntoInformation(v_ids,auditeState,title){
	var url=contextRootPath+'/lbTIntoInfo/prepareExecute/LBTIntoInfoAuditRemark?id='+v_ids+'&auditeState='+auditeState;
	openAuditeStateDialog(title,url);
}

//验证合影附件
function checkPhotoAttach(v_ids){
	var v_params="intoId=" + v_ids;
	var url=contextRootPath+'/lbTIntoInfo/checkPhotoAttach';
	//通过ajax保存
	jyAjax(
		url,
		v_params,
		function(msg){
			var v_status = msg.status;
			if(v_status.indexOf('ok') >-1){
				if(msg.data && msg.data.length> 0) {
					var datas = msg.data;
					var isMust = datas[0]["is_must"];
					if(isMust==1){
						submmitIntoInformation(intoV_ids,intoAuditeState,intoTitle);
					}else{
						photoAttachCause();
					}
				}else {
					submmitIntoInformation(intoV_ids,intoAuditeState,intoTitle);
				}
			}
		}
	);
}

/**
 * 填写未上传合影附件原因
 * @param vId
 */
var viewPhotoAttach;
function photoAttachCause(){
	var dialogStruct={
			'display':contextRootPath+'/lbTIntoInfo/prepareExecute/viewPhotoAttachCause',
			'width':600,
			'height':400,
			'title':'未上传合影附件原因',
			'buttons':[
 			           {'text':'保存','action':savePhotoAttachCause,'isClose':false},
 			           {'text':'关闭','isClose':true}
 			]
	};
		
	viewPhotoAttach = jyDialog(dialogStruct);
	viewPhotoAttach.open();
}
/**
 * 未上传合影附件保存
 */
function savePhotoAttachCause(){
	 var obj = viewPhotoAttach.getIframe();
	 if(!obj.ckData()){
		 return;
	 }
	var v_id = iframe.iframeObj["table"].getSelectedIds().join(",");
	var photoAttachCause = obj.photoAttachCause.value;
	var photoAttachRemark = obj.photoAttachRemark.value;
	jyDialog({"type":"question"}).confirm("您确认要保存吗?",function(){
				var url =contextRootPath+"/lbTIntoInfo/updateIntoInfoPhotoAttach?id="+v_id + "&photoAttachCause=" + photoAttachCause + "&photoAttachRemark=" + photoAttachRemark;
				jyAjax(
						url,
						'',
						function(msg){
							var v_status = msg.status;
							if(v_status.indexOf('ok') >-1){
								viewPhotoAttach.close();
								submmitIntoInformation(intoV_ids,intoAuditeState,intoTitle);
							}else{
								return false;
							}
						});
		},"确认提示");
}

//拒贷
function toStoreRefuse(auditeState,title) {
	var v_objs=getObjs("请选择待操作的数据！");
	if(!v_objs){
		return;
	}
	
	if(!checkIntoCanEdit(v_objs.id)) {
		jyDialog().alert("该进件状态已经变更，当前状态不允许编辑！<br>请重新查询再操作！");
		return;
	}
	
	var v_intoAppId=v_objs.intoAppId;
	var arr=checkOpenedTabByIntoId(v_intoAppId);
	if(arr.length>0) {
		jyDialog().alert("该进件有任务未完成,请完成后再操作!");
		return false;
	}
	
	var url=contextRootPath+'/lbTIntoInfo/prepareExecute/LBTIntoInfoRefuse?id='+v_objs.id+"&appProductType="+v_objs.appProductType+'&auditeState='+auditeState;
	var dialogStruct={
			'display':url,
			'width':600,
			'height':400,
			'title':title,
			'isIframe':'false',
			'buttons':[
			           {'text':'提交','action':storeRefuse},
			           {'text':'关闭','isClose':true}
			           ]
	};
	dialogAdd =jyDialog(dialogStruct);
	dialogAdd.open();
}


//根据"一级拒贷原因 "，级联"二级拒贷原因 "
function querySecondRefuseReasons(){
	$("#dtooneRefuseReason").downLink({"linkObj":"dtotwoRefuseReason","defaultValue":$("#twoRefuse").val(),"type":"funAsync","linkFun":function(objValue,fun){
		var url= contextRootPath+"/lbTIntoInfo/querySecondRefuseReasonsInfo?refuseCode="+objValue+"&level=1";
		jyAjax(url,"",function(msg){
			var datas=msg.data;
			if(datas!=null){
				for(var i=0;i<datas.length;i++){
					datas[i]["text"]=datas[i]["refuseReason"];
					datas[i]["value"]=datas[i]["refuseCode"];
				}
				datas.unshift({"value":"","text":"--请选择--"});
				fun(datas);
			}else{
				$("#dtotwoRefuseReason")[0].options.length=0;
				datas.unshift({"value":"","text":"--请选择--"});
			}
		}); 
	}});	
}
//拒贷
function storeRefuse() {
	if(!checkIsNull("auditStateFormData")) {
		return;
	}
	var params=$("#auditStateFormData").serialize();
	var url=contextRootPath+'/lbTIntoInfo/intoStoreRefuse';
	//通过ajax保存
	jyAjax(
			url,
			params,
			function(msg){
				var v_status = msg.status;
				if(v_status.indexOf('ok') >-1){
					//新增成功后，
					$("").newMsg({}).show("操作成功!");
					dialogAdd.close();
					queryData();
				}
			}
	);
}

//放弃
function toStoreQuit(auditeState,title) {
	var v_objs=getObjs("请选择待操作的数据！");
	if(!v_objs){
		return;
	}
	
	if(!checkIntoCanEdit(v_objs.id)) {
		jyDialog().alert("该进件状态已经变更，当前状态不允许编辑！<br>请重新查询再操作！");
		return;
	}
	
	var v_intoAppId=v_objs.intoAppId;
	var arr=checkOpenedTabByIntoId(v_intoAppId);
	if(arr.length>0) {
		jyDialog().alert("该进件有任务未完成,请完成后再操作!");
		return false;
	}
	
	var url=contextRootPath+'/lbTIntoInfo/prepareExecute/LBTIntoInfoQuit?id='+v_objs.id+"&appProductType="+v_objs.appProductType+'&auditeState='+auditeState;
	var dialogStruct={
			'display':url,
			'width':600,
			'height':355,
			'title':title,
			'isIframe':'false',
			'buttons':[
			           {'text':'提交','action':storeQuit},
			           {'text':'关闭','isClose':true}
			           ]
	};
	dialogAdd =jyDialog(dialogStruct);
	dialogAdd.open();
}

//放弃
function storeQuit() {
	if(!checkIsNull("auditStateFormData")) {
		return;
	}
	
	var params=$("#auditStateFormData").serialize()
	var url=contextRootPath+'/lbTIntoInfo/intoStoreQuit';
	//通过ajax保存
	jyAjax(
			url,
			params,
			function(msg){
				var v_status = msg.status;
				if(v_status.indexOf('ok') >-1){
					//新增成功后，
					$("").newMsg({}).show("操作成功!");
					dialogAdd.close();
					queryData();
				}
			}
	);
}

/**
 * 保存之前校验黑名单
 * @param params
 * @returns {Boolean}
 */
function checkBlackBeforeSaveInto(params, saveFun) {
	var url=contextRootPath+'/lbTIntoInfo/checkBlackBeforeSaveInto';
	jyAjax(
		url,
		params,
		function(msg){
			var v_status = msg.status;
			if(v_status.indexOf('ok') >-1){
				//新增成功后，
				if(msg.data && msg.data.length> 0) {
					var datas=msg.data;
					var str="";
					var title1="<span style='font-weight:bolder;color:#ff0000;'>以下信息存在于黑名单中, 确定要保存吗？</span><br/>";
					var title2="<span style='font-weight:bolder;color:#ff0000;'>以下信息存在于黑名单中, 无法进行保存！</span><br/>";
					var flag=false;
					for(var i=0;i<datas.length;i++) {
						if(datas[i]["dataType"]=="3") {
							flag=true;
						}
						str+=(i+1)+")"+datas[i]["param"]+": "+datas[i]["dataValue"]+"<br/>";
					}
					
					if(flag) {
						jyDialog().alert(title2+str,"警告:");
					} else {
						jyDialog().confirm(title1+str, function(){
							saveFun();
					    });
					}
				} else {
					//通过黑名单校验
					saveFun();
				}
			}
		}
	);
}

//以tab形式打开连接
function openTab(title,url,closeFun) {
	var obj = {
		"title" : title,
		"url" : url,
		"closeFun":closeFun
	};
	window.top.tabs.add(obj);
}

//关闭tab(按照tab标题)
function closeTab(tabTitle) {
	window.top.tabs.close(tabTitle);
}

//关闭tab(按照tab标题),并且刷新父tab
function closeTab(tabTitle, parentTitle) {
	if(parentTitle) {
		//flushTab(parentTitle)
		//window.top.tabs.activeByTitle(parentTitle);
	}
	
	window.top.tabs.close(tabTitle);
}

//关闭tab(按照tab标题),并且刷新父tab
function closeTabAndFlushP(tabTitle, parentTitle) {
	if(parentTitle) {
		flushTab(parentTitle);
	}
	
	window.top.tabs.close(tabTitle);
}

//确定并关闭tab(按照tab标题)
var closeBit=0;
function closeTabWithConfirm(tabTitle,parentTitle,closeFun) {
	window.top.tabs.activeByTitle(tabTitle);
	if(closeBit<1){
		closeBit=1;
		jyDialog().confirm("您确认要关闭当前窗口吗？", function(){debugger;
			//closeFun(tabTitle);
			if(parentTitle) {
				flushTab(parentTitle);
			}
			window.top.tabs.close(tabTitle);
		},"",function(){
			closeBit=0;
		});
	}
}
 
//刷新指定的tab(按照tab标题)
function flushTab(tabTitle) {
	var winObj=window.top.tabs.getTabWinByTitle(tabTitle);
	if(winObj){
		winObj.queryData();
	}
}

//获取当前活动tab的标题
function getActiveTabTitle() {
	return window.top.tabs.getActiveObj().title;
}

//流水负债:显示tab时,重新计算table的大小,才能正常显示
function resizeSerialModule() {
	setTimeout(function() {
		checkedInitForm("lbTLiability");
		checkedInitForm("serialInfo");
		serialTable.resize();
		creditCardTable.resize();
		loanTable.resize();
		loanSummaryTable.resize();
	},10);
}

//
function viewIntoAttachment(){
	var v_objs=getObjs("请选择待查看附件的数据！");
	if(!v_objs){
		return;
	}
	var v_ids=v_objs.id;
	var v_prodpType=v_objs.appProductType;	

	var parentTitle=getActiveTabTitle();
	var title="查看附件("+v_objs.intoAppId+")";
	var url=contextRootPath+'/lbTIntoInfo/prepareExecute/viewIntoAttachment?id='+v_ids+"&appProductType="+v_prodpType+'&tabTitle='+title+'&parentTitle='+parentTitle;

	var obj = {
			"title" : title,
			"url" : url
	};
	window.top.tabs.add(obj);
}

//校验联系人个数
function checkContact() {
	var datas = linkPersonTable.getAllData();
	var contactNum=0;
	var urgentContactNum=0;
	var homeContactNum=0;
	var jobContactNum=0;
	
	for(var i=0;i<datas.length;i++){
		var data=datas[i];
		switch (data["contactType"]) {
			case "1":
				contactNum++;
				break;
			case "2":
				urgentContactNum++;
				break;
			case "3":
				homeContactNum++;
				break;
			case "4":
				jobContactNum++;
				break;
		}
	}
/*	
	if(contactNum<1) {
		$("").newMsg({}).show("联系人个数不能少于1个!");
		return false;
	}*/
	
	if(urgentContactNum<1) {
		$("").newMsg({}).show("紧急联系人个数不能少于1个!");
		return false;
	}
	
	if(homeContactNum<$("#homeNum").val()) {
		$("").newMsg({}).show("家庭联系人个数不能少于"+$("#homeNum").val()+"个!");//动态修改家庭联系人必输个数（针对车贷产品才配置1 默认为2）
		return false;
	}
	
//	if(jobContactNum<1) {
//		$("").newMsg({}).show("工作联系人个数不能少于1个!");
//		return false;
//	}
	
	return true;
}

//
function checkOpenedTabByIntoId(intoId) {
	var tabList=window.top.tabs.tabList
	var titleArray=[];
	for(var i=0;i<tabList.length;i++){
		var tabObj=tabList[i];
		var title=tabObj["title"];
		if(title&&title.indexOf("("+intoId+")")>-1 && tabObj.cascade){
			titleArray.push(title);
		}
	}
	
	return titleArray;
	
	/*	var titleArray=checkOpenedTabByIntoId(v_objs.id);
	if(titleArray.length>0) {
		var msg="当前进件存在尚未关闭的编辑页面,请先关闭,再操作!<br/>具体信息如下:<br/>"+titleArray.join("<br/>");
		//jyDialog().alert(msg,"警告:");
		jyDialog().confirm(msg, function(){
			
	    });
		return false;
	}*/
}

/**
 * 暂存进件信息
 */
function doTempSaveInto(tabTitle,parentTitle){
	var intoId = $("#addNewsFormData1 #intoId").val();
	
	if(intoId && !checkIntoCanEdit(intoId)) {
		jyDialog().alert("该进件状态已经变更，当前状态不允许编辑！");
		return;
	}
	
	var params=getCustomerForm()+"&"+getIntoInfoForm()
	//校验黑名单
	checkBlackBeforeSaveInto(params, function() {
		params+="&"+getIntoProductFormData()+"&"+getSerialLiabilityForm();
		//校验通过, 保存进件信息
		var url=contextRootPath+'/lbTIntoInfo/tempSaveLbTIntoInfo';
		//通过ajax保存
		jyAjax(
			url,
			params,
			function(msg){
				var v_status = msg.status;
				if(v_status.indexOf('ok') >-1){
					var datas=msg.data;
					$("#addNewsFormData1 #intoId").val(datas.intoId||"");
					$("#addNewsFormData2 #custId").val(datas.custId||"");
					$("#addNewsFormData2 #dtocustCode").val(datas.custCode||"");
					$("#addNewsFormData2 #dtocustomerVersion").val(datas.custVer||"");
					$("#addNewsFormData3 #jobId").val(datas.jobId||"");
					window.top.showMessage("暂存成功!",1500);
					//flushTab(parentTitle);
				} else {
					jyDialog().alert(msg.msg);
				}
		});
	});
}

/**
 * 追加客户--暂存
 */
function doTempSaveAppendCust(intoInfoId,tabTitle,parentTitle){
	if(!checkIntoCanEdit(intoInfoId)) {
		jyDialog().alert("该进件状态已经变更，当前状态不允许编辑！");
		return;
	}
	
	var loanType = $("#addNewsFormData1 #dtoloanType").val();
	var params="intoId="+intoInfoId+"&loanType="+loanType+"&"+getCustomerForm();
	//校验黑名单
	checkBlackBeforeSaveInto(params, function() {
		params+="&"+getSerialLiabilityForm();
		//校验通过, 保存进件信息
		var url=contextRootPath+'/lbTIntoInfo/tempSaveAppendCustInfo';
		//通过ajax保存
		jyAjax(
			url,
			params,
			function(msg){
				var v_status = msg.status;
				if(v_status.indexOf('ok') >-1){
					var datas=msg.data;
					$("#addNewsFormData2 #custId").val(datas.custId||"");
					$("#addNewsFormData2 #dtocustCode").val(datas.custCode||"");
					$("#addNewsFormData2 #dtocustomerVersion").val(datas.custVer||"");
					$("#addNewsFormData3 #jobId").val(datas.jobId||"");
					window.top.showMessage("暂存成功!",1500);
					//flushTab(parentTitle);
				} else {
					jyDialog().alert(msg.msg);
				}
		});
	});
}

//修改页面 的 暂存操作
function doTempUpdateInto(intoId,tabTitle,parentTitle){
	if(!checkIntoCanEdit(intoId)) {
		jyDialog().alert("该进件状态已经变更，当前状态不允许编辑！");
		return;
	}
	
	var params=getUpdateFromParam(intoId,'1050');
	//校验黑名单
	checkBlackBeforeSaveInto(params, function(){
		params += "&" + getSerialLiabilityForm();
		var url=contextRootPath+'/lbTIntoInfo/updateLbTIntoInfo';
		//通过ajax保存
		jyAjax(
			url,
			params,
			function(msg){
				var v_status = msg.status;
				if(v_status.indexOf('ok') >-1){
					//更新成功后
					window.top.showMessage("暂存成功!",1500);
					//flushTab(parentTitle);
				}
			});
	});
}

//填写撤销备注
function cancelRemark(operateStatus,statusName,auditeState){
	
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");

	if(!v_ids){
		return;
	}
	
	var dialogStruct={
			'display':contextRootPath+'/lbtsigncontract/prepareExecute/retrunOperation?ids='+v_ids+"&operateStatus="+operateStatus+"&statusName="+statusName+"&auditeState="+auditeState,
			'width':600,
			'height':300,
			'title':'撤销录单',
			'buttons':[
	         {'text':'保存','action':addIntoLogFrom,'isClose':false},
			 {'text':'关闭','isClose':true}
			]
		};
		
		dialogAdd =jyDialog(dialogStruct);
		dialogAdd.open();
	
}

function addIntoLogFrom(){
	
	var obj = dialogAdd.getIframe();
	var remark =obj.$("#dtooperateContent").val();
	
	if(remark == null || remark ==""){
		$("").newMsg({}).show("请填写备注！");
		return;
	}
	var params= obj.$("#addNewsFormData").serialize();
	var url = contextRootPath+'/lbtsigncontract/operationCanleByID';
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

//查看附件
function viewAttach() {
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		$("").newMsg({}).show("请选择查看的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		$("").newMsg({}).show("一次只能选择一条数据！");
		return;
	}
	var selectObj = iframe.iframeObj["table"].getSelectedObjs();
	
	var params="custId="+selectObj[0].fkCustCode+"&intoId="+v_ids;
	var url = contextRootPath+'/lbTContractInfo/viewAttachInfo?'+params;
	window.open(url,'newwindowAttach'+selectObj[0].intoCode);
}
/**
 * 根据产品类型验证是否为车贷产品，如果不是车贷产品返回true，如果是车贷产品则验证押品是否估值如果估值则返回true，反之返回false
 * @param intoId(进件编号) appProductType(产品类型)
 * @returns boolean
 */
function checkProTypeAndGuarAssessed(intoId,appProductType){
 	var flag = false;
	$.ajax({
		type:"post",
		async:false,
		dataType:"JSON",
		url:contextRootPath+'/lbTIntoInfo/checkProTypeAndGuarAssessed?intoAppId='+intoId+'&appProductType='+appProductType,
		success:function(msg){
		 var v_status = msg.status;
		 if(msg.status.indexOf('ok') >-1){
     		if(msg.msg == "true") {
     			flag = true;
     	   }
		 }
	   }
	});
	return flag;
}	

function furtherInformation(){
	var v_objs=getObjs("请选择待查看补件详情的数据！");
	debugger;
	if(!v_objs){
		return;
	}
//	var v_ids=v_objs.id;
	var v_intoCutRefId=v_objs.intoCutRefId;	

//	var parentTitle=getActiveTabTitle();
	var title="补件详情("+v_objs.intoAppId+")";
	var url=contextRootPath+'/returnlist/returnlist?code=AUDIT_HTQD&operate=hide&intoCutRefId='+v_intoCutRefId;
	
	$.ajax({
		type:"POST",
		url:contextRootPath+'/returnlist/isHaveResut?intoCutRefId='+v_intoCutRefId,
		success:function(msg){
			if(msg==='"F"'){
				jyDialog({"type":"info"}).alert("该进件无补件信息！");
			}else{
				
				var obj = {
						"title" : title,
						"url" : url
						};
				window.top.tabs.add(obj);
			}
		}
	});
}
function viewContactInfo(){
		var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
		//如果没有选中 数据则
		if(v_ids == ""){
			$("").newMsg({}).show("请选择查看的数据！");
			return;
		}
		//如果选择多个 择提示
		if(v_ids.indexOf(",") > -1){
			$("").newMsg({}).show("一次只能选择一条数据！");
			return;
		}	

		var url=contextRootPath+'/extJxlOperate/prepareExecute/toView?intoId='+v_ids;
		var obj = {
					"title" : "手机通话信息",
					"url" : url
				  };
		window.top.tabs.add(obj);
				
}

function checkIntoCanEdit(intoId){
	var canEdit = false;
	var url = contextRootPath+'/lbTIntoInfo/checkIntoCanEdit?intoId=' + intoId;
	//通过ajax保存
	jyAjax(
		url,
		'',
		function(msg){debugger;
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		try{
        			canEdit = Boolean(msg.data);
        		}catch(e){}
        	}
  	},null,null,false);
	
	return canEdit;
}

function viewSimplePReport(){
	var v_obj=getObjs("请选择待查看的进件！");
	if(!v_obj){
		return;
	}
	
	var dialogStruct={
		'display':contextRootPath+'/extShPersonalReport/prepareExecute/toView?intoId='+v_obj.id,
		'width':1000,
		'height':520,
		'title':'查看简版征信',
		/*'isIframe':"false",*/
		'buttons':[
		 {'text':'关闭','isClose':true}
		]
	};
	
	 jyDialog(dialogStruct).open();
}


function custServiceTransfer(){
	var tabObj = iframe.iframeObj["table"];
	//获取选中行的进件编号
    var v_ids = tabObj.getSelectedIds();
    //如果没有选中 数据则
  //如果没有选中 数据则
	if(v_ids == ""){
		$("").newMsg({}).show("请选择操作数据！");
		return;
	}
    //获取选中行的数据
	var selectedObj = tabObj.getSelectedObjs()[0];
	var auditeState = selectedObj["auditeState"];//进件状态
	var acceptStore = selectedObj["baseExt4"];//进件门店
	var manageStore = selectedObj["baseExt5"];//管理门店
	//进行门店客服转移的条件：进件门店与管理门店不一致（进件状态为已暂存）
	if (auditeState != "1050" || acceptStore == manageStore) {
		$("").newMsg({}).show("不允许进行团队主任转移！");
		return;	
	}
	var url = contextRootPath+ '/lbTCustServiceTransferLog/prepareExecute/toViewCustService?intoId='+ v_ids;
	var dialogStruct={
		"display":url
		,"width":"850"
		,"height":"500"
		,title:'团队主任转移'
		,"buttons":[{"text":"保存","action":addFromSave,"isClose":false},
		{"text":"关闭","isClose":true}]};
	dialogAddObj=jyDialog(dialogStruct);
	dialogAddObj.open();
}

/*
*新增页面的 保存操作
*/
function addFromSave(){
	var obj = dialogAddObj.getIframe();
	if(!obj.checkMyDataForm()){
		return ;
	}
	var params = obj.saveMyData();
	var url = contextRootPath+ '/lbTCustServiceTransferLog/insertLbTCustServiceTransferLog';
	jyAjax(
		url,
		params,
		function(result){
			var v_status = result.status;
        	if(v_status.indexOf('ok') >-1){
        		dialogAddObj.close();//先关闭弹出层
        		$("").newMsg({}).show(result.msg);
        		//弹出操作成功
        		queryData();
        	}
	});
}
//附件信息列表
function attachmentDownload(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"warn"}).alert("请选择待下载附件的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"warn"}).alert("一次只能选择一条数据！");
		return;
	}
	var intoId = iframe.iframeObj["table"].getSelectedObjs()[0].intoAppId;
	var dialogStruct={
			'display':contextRootPath +'/lbTContractInfo/prepareExecute/attaDownload?intoAppId='+intoId,
			'width':1000,
			'height':500,
			'title':'附件列表',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
	var dialogView = jyDialog(dialogStruct).open();
}
/**
 * 判断房悦贷产品
 */
/*function checkHouseLoanProduct(){
	var productName=$("#dtoappProductType").val();
	if("PTL160600126,PTL150400008".indexOf(productName)>-1){//PTL150400008:房悦贷A,PTL160600126:房悦贷B
		var houseType=houseInfoTable.datas[0].houseType;
		if("2,3".indexOf(houseType)>-1){//2:商业按揭房,3:公积金按揭房
			var accEndNo=$("[extname=accEndNo] div").html();
			if(!accEndNo){
				$("").newMsg({}).show("请添写流水明细信息!");
				$("#serialInfoDetail_descript").html("【必填】");
				return false;
			}
		}
	}
	return true;
}*/

//复议审批   转信审 
function openCreditFlow(){
	var id = $("#bizInfId").val();
	var intoId = $("#intoId").val();
	var v_boolean = true;
	v_boolean = validateInfoIsDone(intoId);//是否已被处理
	if(!v_boolean) {
		return false;
	}
	
	//是否提报处理
	if(!judgeAntiToHumanDeal(intoId)){return};
	
	jyDialog().confirm("您确定要转信审处理吗？", function(){
		$("#divSubBtnId input[id='toCreditBtn']").attr("disabled",true);
		//转信审
		jyAjax(
			contextRootPath+"/lbTIntoInfo/toNewCreditAudit?reconId=" + id + "&intoId=" + intoId,
			"",
			function(result){
				if(result.data == "success"){
					alert("操作成功");
					closeWindow();
				}else{
					$("").newMsg({}).show(result.msg);
					$("#divSubBtnId input[id='toCreditBtn']").attr("disabled",false);
				}
			}
		);
	});
}

//判断提报反欺诈是否已处理
function intoCheckModule(intoId){
	var params = "";
	var url=contextRootPath+'/lbTIntoInfo/intoCheckModule?intoId='+intoId;
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

/**
 * 工作件查询、工作件审批添加重复件标识
 * @param cardId
 */

function  repeatView(intoId,msg){
	var id='#'+intoId;
	layer.tips('重复件个数['+msg+']',  id, {
			tips: [1, '#3595CC'],//代表颜色谈出
			time: 2000	      //显示时间1000=1秒
		});
}

function doRepeatView(intoId,msg,repeatId){
		if(msg>1){
			/*alert("大于1，值为："+msg)	*/
	/*		var v_url= contextRootPath;
			v_viewURI = '/workfile/toRepeatPage';
			v_url += encodeURI(v_viewURI);
			v_url = v_url +"?intoId="+encodeURI(intoId);
			
			window.open(v_url,'viewHistInfoWindow');*/
			var url = contextRootPath+ '/workfile/toRepeatPage?intoId='+intoId;
			var dialogStruct={
				"display":url
				,"width":"850"
				,"height":"500"
				,title:'重复进件列表'
				,"buttons":[{"text":"关闭","isClose":true}]};
			dialogAddObj=jyDialog(dialogStruct);
			dialogAddObj.open();
		}else{
				$.ajax({
				type:"POST",
				url:contextRootPath+'/workfile/getRepeatList?intoId='+repeatId,
				async: false,
				dataType:"json",
				success:function(msg){
					 var v_infId = msg[0]["ID"];
					 var v_bizType='';
					 var v_tabName='';
					 var v_bizTabId='';
					 var v_proInsId='';
					 viewRepeatHistBizInfo(v_bizType,v_infId,v_tabName,v_bizTabId,v_proInsId);
				}
			});
			
			
		}
		
	}


	/**
	 * v_taskId 任务ID
	 * v_proInsId 流程实例ID
	 * v_actNa 当前节点名称
	 * v_infId 业务表主键ID
	 * v_tabName 业务表名
	 */
	function viewRepeatHistBizInfo(v_bizType,v_infId,v_tabName,v_bizTabId,v_proInsId){
		debugger;
		var v_url= contextRootPath;
		v_viewURI = '/dojbpm/jbpmcreditaudit/prepareExecute/toViewAppInfo';
		v_url += encodeURI(v_viewURI);
		v_url = v_url +"?bizInfId="+encodeURI(v_infId)+"&operation=repeat";
		
		window.open(v_url,'viewHistInfoWindow'+v_infId);
	}
	 
	 