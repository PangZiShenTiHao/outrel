//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogUpdateObj;

var dialogAddOne;//添加第一个界面：查询贷前
var addDlgAddTwo;//添加第二个界面：添加详情
var addDlgAddThere;

var addDlgAddCutover;

function toAddData(){
	var dialogStruct={
			'display':contextRootPath+'/aftloanqueryDate/prepareExecute/toQueryBefloanForLoanInfo?function=bankcardcutover',
			'width':1100,
			'height':750,
			'title':'查询贷款信息',
			'buttons':[
			  {'name':'nextBtn','text':'下一步','action':openNextPage},
			  {'text':'关闭','isClose':true}
			]
		};
	dialogAddOne=jyDialog(dialogStruct);
	dialogAddOne.open();
}

//下一步
function openNextPage(){
	var selectIds = dialogAddOne.getIframe().getSelectedIds().join(",");
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
	var selectObj = dialogAddOne.getIframe().getSelectedObjs2();
	var jsonText = JSON.stringify(selectObj);
	var regS = new RegExp("\"","g");
	var obj = jsonText.replace(regS,"'");
	var contractId = dialogAddOne.getIframe().getSelectedObjss("contractCode");
	//关闭查询界面
	dialogAddOne.close();
	//打开新增界面
	var url=contextRootPath+'/laTBankCard/prepareExecute/toAddNextOne?contractId='+contractId+'&jsonText='+obj;
	var dialogStruct={
			'display':url,
			'width':1100,
			'height':750,
			'title':'新增还款账号切换信息',
			'buttons':[
             {'text':'上一步','action':openPrevPage},
	         {'text':'下一步','action':openNextPageOne},
			 {'text':'关闭','isClose':true}
			]
		};
		
	addDlgAddTwo =jyDialog(dialogStruct);
	addDlgAddTwo.open();
}

//上一步
function openPrevPage() {
	addDlgAddTwo.close();
	toAddData();
}


//下一步
function openNextPageOne(){
	var selectIds = addDlgAddTwo.getIframe().getSelectedIds().join(",");
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
	var selectObj = addDlgAddTwo.getIframe().getSelectedObjs();
	//贷前信息
	var befObj = addDlgAddTwo.getIframe().getBefObjValue();
	
	//关闭查询界面
	addDlgAddTwo.close();
	//打开新增界面
	var url=contextRootPath+'/laTBankCardCutover/prepareExecute/toAddNext?'+selectObj+'&befObj='+befObj;
	var dialogStruct={
			'display':url,
			'width':1100,
			'height':750,
			'title':'新增还款账号切换信息',
			'buttons':[
             {'text':'上一步','action':openPrevPageTwo},
	         {'text':'保存','action':doAddFrom},
			 {'text':'关闭','isClose':true}
			]
		};
		
	addDlgAddThere =jyDialog(dialogStruct);
	addDlgAddThere.open();
}

//上一步
function openPrevPageTwo() {
	
	var befObj = $(addDlgAddThere.iframe.contentDocument.getElementById("befObj")).val();
	var contractId = $(addDlgAddThere.iframe.contentDocument.getElementById("dtocontractId")).val();
	addDlgAddThere.close();
	var url=contextRootPath+'/laTBankCard/prepareExecute/toAddNextOne?contractId='+contractId+'&jsonText='+befObj;
	var dialogStruct={
			'display':url,
			'width':1100,
			'height':750,
			'title':'新增还款账号切换信息',
			'buttons':[
             {'text':'上一步','action':openPrevPage},
             {'text':'下一步','action':openNextPageOne},
    		 {'text':'关闭','isClose':true}
			]
		};
		
	addDlgAddTwo =jyDialog(dialogStruct);
	addDlgAddTwo.open();
}

//新增页面的保存操作
function doAddFrom(){
	var obj = addDlgAddThere.getIframe();
	//序列化 新增页面的form表单数据
	if(!checkIsNull(obj.$("#addNewsFormData"))) return;
	
	var dtooldBankCardNo = $(addDlgAddThere.iframe.contentDocument.getElementById("dtooldBankCardNo")).val();//原银行卡账号
	var dtonewBankCardNo = $(addDlgAddThere.iframe.contentDocument.getElementById("dtonewBankCardNo")).val();//新银行卡账号
	if(dtooldBankCardNo == dtonewBankCardNo){
		jyDialog({"type":"warn"}).alert("新银行卡号于原银行卡号相同，请重新选择！");
		return ;
	}
	
	var params=obj.$("#addNewsFormData").serialize();
	var url=contextRootPath+'/laTBankCardCutover/insertLaTBankCardCutover';
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
        		queryData();
        		addDlgAddThere.close();
        	}
  	});
}
//修改 事件
function toUpdateData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待修改的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"info"}).alert("请选择一条数据！");
		return;
	}

	var dialogStruct={
			'display':contextRootPath+'/laTBankCardCutover/prepareExecute/toUpdate?id='+v_ids,
			'width':800,
			'height':500,
			'title':'修改',
			'buttons':[
             {'text':'保存','action':doUpdateFrom,'isClose':true},
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogUpdateObj = jyDialog(dialogStruct);
	dialogUpdateObj.open();
}
//修改页面 的 保存操作
function doUpdateFrom(){
	var obj = dialogUpdateObj.getIframe();
	//序列化 新增页面的form表单数据
	if(!checkIsNull(obj.$("#updateNewsFormData"))) return;
	
	var dtooldBankCardNo = $(dialogUpdateObj.iframe.contentDocument.getElementById("dtooldBankCardNo")).val();//原银行卡账号
	var dtonewBankCardNo = $(dialogUpdateObj.iframe.contentDocument.getElementById("dtonewBankCardNo")).val();//新银行卡账号
	if(dtooldBankCardNo == dtonewBankCardNo){
		jyDialog({"type":"warn"}).alert("新银行卡号于原银行卡号相同，请重新选择！");
		return ;
	}
	
	
	var params=obj.$("#updateNewsFormData").serialize();
	var url=contextRootPath+'/laTBankCardCutover/updateLaTBankCardCutover';
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
function deleteData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待删除的数据！");
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
		$.ajax({
            type:"POST",
            dataType:"json",
            url:contextRootPath+"/laTBankCardCutover/deleteLaTBankCardCutover?ids="+v_ids,
            success:function(msg){
            	$("").newMsg({}).show(msg.msg);
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		iframe.iframeObj["table"].removeSelectedRow();
            	}
            	
            	
            }
        });
	   },"确认提示");
}
//查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/laTBankCardCutover/prepareExecute/toView?id='+vId,
			'width':800,
			'height':500,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}
//提交 事件
function toSubmitData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择需要提交的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"info"}).alert("请选择一条数据！");
		return;
	}
	jyDialog({"type":"question"}).confirm("您确认要提交选择的数据吗？",function(){
		$.ajax({
            type:"POST",
            dataType:"json",
            url:contextRootPath+"/laTBankCardCutover/submitLaTBankCardCutover?id="+v_ids,
            success:function(msg){
            	$("").newMsg({}).show(msg.msg);
            	var v_status = msg.status;
            	//提交成功后
            	if(v_status.indexOf('ok') >-1){
            		queryData();
            	}
            	
            	
            }
        });
	   },"确认提示");
}

function toBankCardCutover(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择需要提交的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"info"}).alert("请选择一条数据！");
		return;
	}
	var selectedObjs = iframe.iframeObj["table"].getSelectedObjs();
	var objs = jyTools.obj2Params(selectedObjs[0]);
	
	//打开新增界面
	var url=contextRootPath+'/laTBankCardCutover/prepareExecute/addDlgAddCutover?'+objs;
	var dialogStruct={
			'display':url,
			'width':1100,
			'height':750,
			'title':'新增还款账号切换信息',
			'buttons':[
	         {'text':'提交','action':toSubmitCutoverData},
			 {'text':'关闭','isClose':true}
			]
		};
		
	addDlgAddCutover =jyDialog(dialogStruct);
	addDlgAddCutover.open();
}

//提交 事件
function toSubmitCutoverData(){
	var v_ids = addDlgAddCutover.getIframe().getSelectedObjss("id");
	var bankCardAccount = addDlgAddCutover.getIframe().getSelectedObjss("bankCardAccount");
	var loanAcctNo = addDlgAddCutover.getIframe().getBankCardAccount();
	if(loanAcctNo == bankCardAccount){
		jyDialog({"type":"warn"}).alert("新银行卡号于原银行卡号相同，请重新选择！");
		return ;
	}
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择切换的划扣账号！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"info"}).alert("请选择一条数据！");
		return;
	}
	jyDialog({"type":"question"}).confirm("您确认要提交选择的数据吗？",function(){
		$.ajax({
            type:"POST",
            dataType:"json",
            url:contextRootPath+"/laTBankCardCutover/submitLaTBankCardCutoverTwo?id="+v_ids,
            success:function(msg){
            	$("").newMsg({}).show(msg.msg);
            	var v_status = msg.status;
            	//提交成功后
            	if(v_status.indexOf('ok') >-1){
            		queryData();
            	}
            	addDlgAddCutover.close();
            	
            }
        });
	   },"确认提示");
}

