//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAdd;
var addDlg2;
var dialogUpdate;
function toAddData(){
	var dialogStruct={
			'display':contextRootPath+'/laTPromrepayment/toDunCaseTaskListForStore',
			//'display':contextRootPath+'/aftloanqueryDate/prepareExecute/toQueryBefloanForLoanInfo?function=takebreak',
			'width':1000,
			'height':700,
			'title':'查询逾期合同',
			'buttons':[
			  {'name':'nextBtn','text':'下一步','action':openNextPage},
			  {'text':'关闭','isClose':true}
			]
		};
	dialogAdd=jyDialog(dialogStruct);
	dialogAdd.open();
}

function openNextPage(){
	var selectIds = dialogAdd.getIframe().getSelectedIds().join(",");
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
	var obj=dialogAdd.getIframe().getSelectedObjs();
	var caseId=selectIds;
	var contractNO=obj.CONTRACT_ID;
	//关闭查询界面
	dialogAdd.close();
	//打开新增界面
	var url=contextRootPath+'/laTPromrepayment/toAddPromentForStore?caseId='+caseId+"&contractNo="+contractNO;
	var dialogStruct={
			'display':url,
			'width':1000,
			'height':700,
			'title':'新增承诺还款',
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
	//序列化 新增页面的form表单数据
	//$(addDlg2.iframe.contentDocument.getElementById("addPromentForStore")).attr("type","text");
	var params=$(addDlg2.iframe.contentDocument.getElementById("addPromentForStore")).serialize();
	//$(addDlg2.iframe.contentDocument.getElementById("addPromentForStore")).attr("type","hidden");
	var dtoproAmount = $(addDlg2.iframe.contentDocument.getElementById("proAmount")).val();
	var dtoproType =0;
	 $.each($(addDlg2.iframe.contentDocument.getElementsByName("proType")),function(){
		 if(this.checked) dtoproType=this.value;
	 });
	var dtobal = $(addDlg2.iframe.contentDocument.getElementById("bal")).val();
	if(dtobal ==""){
		dtobal = 0;
	}
	var dtoproDate = $(addDlg2.iframe.contentDocument.getElementById("proTime")).val();
//	var dtoregDate = (new Date()).pattern("yyyy-MM-dd hh:mm:ss");
//	if(!isStartEndDate(dtoregDate,dtoproDate)){
//		alert('还款日期不能小于当前日期！');
//		return;
//	}
	if(isNull(dtoproDate)||dtoproDate==undefined){
		jyDialog({"type":"warn"}).alert("承诺付款时间不能为空！");
			return false;
	}
	if(dtoproType==0){
		if(!isMoney(rmoney(dtoproAmount))){
		  jyDialog({"type":"warn"}).alert("承诺付款金额格式不正确！");
			return false;
		}
		if(rmoney(dtoproAmount)>dtobal){
			jyDialog({"type":"warn"}).alert("还款金额必须小于等于欠款金额！");
			return false;
		}
		if(rmoney(dtoproAmount)<100){
			if(dtobal>=100){
				jyDialog({"type":"warn"}).alert("当剩余应还总额不低于100元，则承诺金额必须不低于100元！");
				return false;
			}
			if(rmoney(dtoproAmount)!=dtobal){
				jyDialog({"type":"warn"}).alert("当剩余应还总额不足100元，则必须全额划扣！");
				return false;
			}
		}
	}
	var url=contextRootPath+'/laTPromrepayment/insertLaTPromrepaymentForStore';
	var content="<br><br>合同号："+addDlg2.iframe.contentDocument.getElementById("contractId").value
	            +"<br> 承诺划扣方式："+(dtoproType==0?"固定金额<br> 承诺还款金额："+dtoproAmount:"欠款总额")					
				+"<br> 承诺还款日期："+dtoproDate;
	jyDialog({"type":"question"}).confirm(content, function(){
										jyAjax(
												url,
												params,
												function(msg){
													//新增成功后，
													
													var v_status = msg.status;
										        	if(v_status.indexOf('ok') >-1){
										        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
										        		jyDialog({"type":"success"}).alert(msg.msg);
										        		queryData();
										        		addDlg2.close();
										        	}else{
										        		jyDialog({"type":"error"}).alert(msg.msg);
										        	}
										  	});
									}, "请确认新增承诺还款信息", function(){/*addDlg2.close();*/});
	//通过ajax保存
	
}
var updateDialog;
//修改 事件
function toUpdateData(){
	var selectIds = iframe.iframeObj["table"].getSelectedIds().join(",");
	var listState=iframe.iframeObj["table"].getSelectedObjs("listStat").join(",");	 
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
	if(listState!="01"){
		jyDialog({"type":"error"}).alert("只有状态初始录入的承诺还款记录才能修改！");
		return;
	}
	var url=contextRootPath+'/laTPromrepayment/toUpdatePromentForStore?proId='+selectIds;
	var dialogStruct={
			'display':url,
			'width':1000,
			'height':670,
			'title':'修改承诺还款',
			'buttons':[
             {'text':'保存','action':doUpdateFrom},
			 {'text':'关闭','isClose':true}
			]
		};		
	updateDialog =jyDialog(dialogStruct);
	updateDialog.open();
}
//修改页面 的 保存操作
function doUpdateFrom(){
	var params=$(updateDialog.iframe.contentDocument.getElementById("addPromentForStore")).serialize();
	var dtoproAmount = $(updateDialog.iframe.contentDocument.getElementById("proAmount")).val();
	var dtoproType =0;
	 $.each($(updateDialog.iframe.contentDocument.getElementsByName("proType")),function(){
		 if(this.checked) dtoproType=this.value;
	 });
	var dtoproDate = $(updateDialog.iframe.contentDocument.getElementById("proTime")).val();
	
	var dtobal = $(updateDialog.iframe.contentDocument.getElementById("bal")).val();
	if(dtobal ==""){
		dtobal = 0;
	}
	
	if(isNull(dtoproDate)||dtoproDate==undefined){
		jyDialog({"type":"warn"}).alert("承诺付款时间不能为空！");
			return false;
	}
	if(dtoproType==0){
		if(!isMoney(rmoney(dtoproAmount))){
		  jyDialog({"type":"warn"}).alert("承诺付款金额格式不正确！");
			return false;
		}
		if(rmoney(dtoproAmount)>parseFloat(dtobal)){
			jyDialog({"type":"warn"}).alert("还款金额必须小于等于欠款金额！");
			return false;
		}
		if(rmoney(dtoproAmount)<100){
			if(dtobal>=100){
				jyDialog({"type":"warn"}).alert("当剩余应还总额不低于100元，则承诺金额必须不低于100元！");
				return false;
			}
			if(rmoney(dtoproAmount)!=dtobal){
				jyDialog({"type":"warn"}).alert("当剩余应还总额不足100元，则必须全额划扣！");
				return false;
			}
		}
	}
	var url=contextRootPath+'/laTPromrepayment/updateLaTPromrepaymentForStore';
	var content="合同号："+updateDialog.iframe.contentDocument.getElementById("contractId").value
	            +"<br> 承诺划扣方式："+(dtoproType==0?"固定金额<br> 承诺还款金额："+dtoproAmount:"欠款总额")					
				+"<br> 承诺还款日期："+dtoproDate;
	jyDialog({"type":"question"}).confirm(content, function(){
										jyAjax(
												url,
												params,
												function(msg){
													//新增成功后，
													var v_status = msg.status;
										        	if(v_status.indexOf('ok') >-1){
										        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
										        		jyDialog({"type":"success"}).alert(msg.msg);
										        		queryData();
										        		updateDialog.close();
										        	}else{
										        		jyDialog({"type":"error"}).alert(msg.msg);
										        	}
										  	});
									}, "请确认修改承诺还款信息", function(){/*addDlg2.close();*/});
	//通过ajax保存
	
}
//删除 事件
function deleteData(){
	var selectIds = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(selectIds == ""){
		jyDialog({"type":"warn"}).alert("请选择待取消的数据！");
		return;
	}
	if(selectIds.indexOf(",") > -1){
		jyDialog({"type":"warn"}).alert("只能选择一条数据！");
		return;
	}
	var listState=iframe.iframeObj["table"].getSelectedObjs("listStat").join(",");	 
	if(listState!="01"){
		jyDialog({"type":"error"}).alert("只有状态初始录入的承诺还款记录才能取消！");
		return;
	}
	jyDialog({"type":"question"}).confirm("请确认要取消选择承诺还款信息?", function(){
		$.ajax({
            type:"POST",
            url:contextRootPath+"/laTPromrepayment/deteleLaTPromrepaymentForStore?id="+selectIds,
            success:function(data){
            	var  msg = jQuery.parseJSON(data);
            	var v_status = msg.status;
	        	if(v_status.indexOf('ok') >-1){
	        		jyDialog({"type":"success"}).alert(msg.msg);
	        		queryData();
	        	}else{
	        		jyDialog({"type":"error"}).alert(msg.msg);
	        	}
           }
        });
	}, "请确认要取消选择承诺还款信息", function(){/*addDlg2.close();*/});
}
//查看明细
function viewData(vId){
}

function isStartEndDate(startTime,endTime){
	startTime = startTime.replace(/-/g, "/");
    endTime = endTime.replace(/-/g, "/");
    startTime = new Date(startTime);
    endTime = new Date(endTime);

    var days= endTime.getTime() - startTime.getTime(); 
    
    if(days<0)
    {
        return false;
    }
    else 
        return true;
}