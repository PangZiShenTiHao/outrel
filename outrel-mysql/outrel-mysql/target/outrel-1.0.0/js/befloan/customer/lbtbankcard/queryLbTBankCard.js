//utf-8
var bankCardDialogAdd;
var bankCardDialogUpdate;
//点击新增按钮 事件跳转至 新增页面
function toAddBCData(intoCustRefId,mainOrSub){
	return function() {
		var dialogStruct={
				'display':contextRootPath+'/lbTBankCard/prepareExecute/toAdd?intoCustRefId='+intoCustRefId+'&mainOrSub='+mainOrSub,
				'width':700,
				'height':400,
				'isIframe':'false',
				'title':'新增',
				'buttons':[
		         {'text':'保存','action':doAddBCFromToTable},
				 {'text':'关闭','isClose':true}
				]
			};
			
		bankCardDialogAdd =jyDialog(dialogStruct);
		bankCardDialogAdd.open();
	}
}

//新增页面的保存操作
function doAddBCFromToTable(){debugger;
	var formName="bankCardAddFormData";
	if(!(checkIsNull(formName)&&checkFormFormat(formName))) {
		return;
	}
	
	var pojo=formToJson(formName);
	pojo["isReceiveType"]=pojo["isLoanType"];
	
	if(checkBankCard(pojo)) {
		return;
	}
	
	var mainOrSub=$("#"+formName+" #mainOrSub").val();
	if(mainOrSub&&mainOrSub=='1'&&pojo["isLoanType"]=="1") {
		setIntoBankCard(pojo);
	}
	
	pojo["baseExt2"]=getSelectedAreaText("dtobankProvAreacode");
	pojo["baseExt3"]=getSelectedAreaText("dtobankCityAreacode");
	
	bankCardInfoTable.addPojo(pojo);
	bankCardDialogAdd.close();
}

//新增页面的保存操作
function doAddBCFrom(){
	//序列化 新增页面的form表单数据
	var params=$("#addNewsFormData").serialize();
	var url=contextRootPath+'/lbTBankCard/insertLbTBankCard';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			$("").newMsg({}).show(msg.msg);
			debugger;
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		bankCardInfoTable.addPojo(msg.data);
        		bankCardInfoTable.flush();
        		bankCardDialogAdd.close();
        	}
  	});
}
//修改 事件
function toUpdateBCData(mainOrSub){
	return function(){
		var v_ids = bankCardInfoTable.getSelectedIds().join(",");
		//如果没有选中 数据则
		if(v_ids == ""){
			$("").newMsg({}).show("请选择待修改的数据！");
			return;
		}
		//如果选择多个 择提示
		if(v_ids.indexOf(",") > -1){
			$("").newMsg({}).show("请选择一条数据！");
			return;
		}
		
		var obj = bankCardInfoTable.getSelectedObjs()[0];
		var jsonStr = bankCardInfoTable.dataToJsonStr(obj,"editObj");
		jsonStr=encodeURIComponent(jsonStr);

		var dialogStruct={
				'display':contextRootPath+'/lbTBankCard/toUpdateByPageData?jsonStr='+jsonStr+'&mainOrSub='+mainOrSub,
				'width':700,
				'height':400,
				'isIframe':'false',
				'title':'修改',
				'buttons':[
	             {'text':'保存','action':doUpdateBCFromToTable},
				 {'text':'关闭','isClose':true}
				]
			};
			
		bankCardDialogUpdate = jyDialog(dialogStruct);
		bankCardDialogUpdate.open();
	}
}

//新增页面的保存操作
function doUpdateBCFromToTable(){
	var formName="bankCardUpdateFormData";
	if(!(checkIsNull(formName)&&checkFormFormat(formName))) {
		return;
	}
	
	var pojo=formToJson(formName);
	pojo["isReceiveType"]=pojo["isLoanType"];
	
	if(checkBankCard(pojo)) {
		return;
	}
	var mainOrSub=$("#"+formName+" #mainOrSub").val();
	if(mainOrSub&&mainOrSub=='1') {
		if(pojo["isLoanType"]=="1") {
			setIntoBankCard(pojo);
		}
		
		if($("#his_isLoanType").val()=="1"&&pojo["isLoanType"]=="0") {
			removeIntoBankCard();
		}
	}
	
	pojo["baseExt2"]=getSelectedAreaText("dtobankProvAreacode");
	pojo["baseExt3"]=getSelectedAreaText("dtobankCityAreacode");
	
	bankCardInfoTable.modifyPojo(pojo);
	bankCardDialogUpdate.close();
}

//修改页面 的 保存操作
function doUpdateBCFrom(){
	//序列化 新增页面的form表单数据
	var params=$("#updateNewsFormData").serialize();
	var url=contextRootPath+'/lbTBankCard/updateLbTBankCard';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//保存成功后，执行查询页面查询方法
			$("").newMsg({}).show(msg.msg);
        	var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		queryData();
        	}
  	});
}
//删除 事件
function deleteBCData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		$("").newMsg({}).show("请选择待删除的数据！");
		return;
	}
	if(confirm("您确认要删除选择的数据吗？")){
        $.ajax({
            type:"POST",
            url:contextRootPath+"/lbTBankCard/deleteLbTBankCard?ids="+v_ids,
            success:function(msg){
            	$("").newMsg({}).show(msg.msg);
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		iframe.iframeObj["table"].removeSelectedRow();
            	}
            	
            	
            }
        });
    }
}
//查看明细
function viewBCData(vId){
	var dialogStruct={
			'display':contextRootPath+'/lbTBankCard/prepareExecute/toView?id='+vId,
			'width':800,
			'height':500,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}

function getSelectedAreaText(selectedId) {
	var areaText="";
	if($("#"+selectedId+" option:selected").val() != "") {
		areaText=$("#"+selectedId+" option:selected").text();
	}
	
	return areaText;
}

function checkBankCardAccount(obj) {
	var val=$(obj).val();
	var regExp=/^\d+$/;
	
	if(val!=""&&!regExp.test(val)) {
		return "请输入合法的银行帐号";
	}

	return "";
}

function checkBankReservedPhone(obj) {
	var val=$(obj).val();
	var regExp=/^[1][0-9]{10}$/;
	
	if(val!=""&&!regExp.test(val)) {
		return "请输入有效的手机号码";
	}

	return "";
}

function checkBankCard(pojo) {
	var flag=false;
	var datas = bankCardInfoTable.getAllData();
	for(var i=0;i<datas.length;i++){
		var data=datas[i];
		if(data["id"]!=pojo["id"]&&data["bankCardAccount"]==pojo["bankCardAccount"]){
			$("").newMsg({}).show("该银行账号已经存在于该客户的银行卡列表中,不能重复添加");
			flag=true;
			break;
		}
		if(pojo["isLoanType"]=="1"&&data["isLoanType"]=="1"&&data["id"]!=pojo["id"]&&data["bankCardAccount"]!=pojo["bankCardAccount"]){
			$("").newMsg({}).show("该进件已经设置收款/放款银行卡(如需变更,请修改已有设置,再进行变更)");
			flag=true;
			break;
		}
	}
	return flag;
}

function setIntoBankCard(pojo){
	$("#addNewsFormData1 #dtoloanName").val(pojo["accountName"]);
	$("#addNewsFormData1 #dtoloanBankAccount").val(pojo["bankCardAccount"]);
	$("#addNewsFormData1 #dtoloanBank").val(pojo["bankCode"]);
	$("#addNewsFormData1 #dtoloanSubBranchName").val(pojo["subBranchName"]);
	$("#addNewsFormData1 #dtoloanBankProvAreacode").val(pojo["bankProvAreacode"]);
	$("#addNewsFormData1 #dtoloanBankCityAreacode").val(pojo["bankCityAreacode"]);
	$("#addNewsFormData1 #dtoloanBankReservedPhone").val(pojo["bankReservedPhone"]);
	
	$("#addNewsFormData1 #dtoreceiveName").val(pojo["accountName"]);
	$("#addNewsFormData1 #dtoreceiveBankAccount").val(pojo["bankCardAccount"]);
	$("#addNewsFormData1 #dtoreceiveBank").val(pojo["bankCode"]);
	$("#addNewsFormData1 #dtoreceiveSubBranchName").val(pojo["subBranchName"]);
	$("#addNewsFormData1 #dtoreceiveBankProvAreacode").val(pojo["bankProvAreacode"]);
	$("#addNewsFormData1 #dtoreceiveBankCityAreacode").val(pojo["bankCityAreacode"]);
	$("#addNewsFormData1 #dtoreceiveBankReservedPhone").val(pojo["bankReservedPhone"]);
}

function removeIntoBankCard(){
	$("#addNewsFormData1 #dtoloanName").val("");
	$("#addNewsFormData1 #dtoloanBankAccount").val("");
	$("#addNewsFormData1 #dtoloanBank").val("");
	$("#addNewsFormData1 #dtoloanSubBranchName").val("");
	$("#addNewsFormData1 #dtoloanBankProvAreacode").val("");
	$("#addNewsFormData1 #dtoloanBankCityAreacode").val("");
	$("#addNewsFormData1 #dtoloanBankReservedPhone").val("");
	
	$("#addNewsFormData1 #dtoreceiveName").val("");
	$("#addNewsFormData1 #dtoreceiveBankAccount").val("");
	$("#addNewsFormData1 #dtoreceiveBank").val("");
	$("#addNewsFormData1 #dtoreceiveSubBranchName").val("");
	$("#addNewsFormData1 #dtoreceiveBankProvAreacode").val("");
	$("#addNewsFormData1 #dtoreceiveBankCityAreacode").val("");
	$("#addNewsFormData1 #dtoreceiveBankReservedPhone").val("");
}

function checkSubBranchName(obj) {
	var subBranchName = $(obj).val().replace(/\s/g,'');
	$(obj).val(subBranchName);
	var regExp=/^[\u4e00-\u9fa5]*$/g;
	if (subBranchName!='' && !regExp.test(subBranchName)) {
		return "只允许输入汉字";
	}

	return "";
}