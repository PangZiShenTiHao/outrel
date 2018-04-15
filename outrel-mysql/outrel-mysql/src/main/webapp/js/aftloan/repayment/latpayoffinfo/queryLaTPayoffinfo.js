//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogUpdate;

var addDlg1;//添加第一个界面：查询贷前
var addDlg2;//添加第二个界面：添加详情
function toAddData(){
	var dialogStruct={
			'display':contextRootPath+'/aftloanqueryDate/prepareExecute/toQueryBefloanForLoanInfo?function=payoff',
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
	var url=contextRootPath+'/laTPayoffinfo/prepareExecute/toAddNext?'+selectObj+'&claimKind='+claimKind;
	var dialogStruct={
			'display':url,
			'width':1100,
			'height':750,
			'title':'新增结清贷款信息',
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
	var params=$(addDlg2.iframe.contentDocument.getElementById("addNewsFormData")).serialize();
	var payoffFlag = $(addDlg2.iframe.contentDocument.getElementById("dtopayoffFlag")).val();
	var dtoloanStatus = $(addDlg2.iframe.contentDocument.getElementById("dtoloanStatus")).val();

	if (dtoloanStatus != "4" && dtoloanStatus != "2") {//核心贷款状态:0-正常 1-逾期 2-正常结清 3-撤销 4-提前结清 
		jyDialog({"type":"warn"}).alert("贷款状态不是结清状态，不能进行打印结清通知操作！");
		return;
	}
//	if (dtoloanStatus != "2") {//核心贷款状态:0-正常 1-逾期 2-正常结清 3-撤销 4-提前结清 
//		jyDialog({"type":"warn"}).alert("贷款状态不是结清状态，不能进行打印结清通知操作！");
//		return;
//	}
	if(payoffFlag != "02"){
		jyDialog({"type":"warn"}).alert("结清状态不是已结清状态，不能进行打印结清通知操作！");
		return;
	}
	
	var contractId = $(addDlg2.iframe.contentDocument.getElementById("dtocontractId")).val();
	if(contractId =="" || contractId==null){
		jyDialog({"type":"warn"}).alert("对不起，您还没有选择合同信息，请先选择合同信息再进行保存操作！");
		return;	
	}
	//通过ajax保存
	var url=contextRootPath+'/laTPayoffinfo/insertLaTPayoffinfo';
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		queryData();
        		addDlg2.close();
        	}
  	});
}
//修改 事件
function toUpdateData(){
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
			'display':contextRootPath+'/laTPayoffinfo/prepareExecute/toUpdate?id='+v_ids,
			'width':800,
			'height':500,
			'title':'修改结清贷款信息',
			'buttons':[
             {'text':'保存','action':doUpdateFrom,'isClose':false},
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogUpdate = jyDialog(dialogStruct);
	dialogUpdate.open();
}
//修改页面 的 保存操作
function doUpdateFrom(){
	//序列化 新增页面的form表单数据
	var params=$(dialogUpdate.iframe.contentDocument.getElementById("updateNewsFormData")).serialize();
	var url=contextRootPath+'/laTPayoffinfo/updateLaTPayoffinfo';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//保存成功后，执行查询页面查询方法
			$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
        	var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		queryData();
        		dialogUpdate.close();
        	}
  	});
}

//删除 事件
function deleteData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"warn"}).alert("请选择待删除的数据！");
		return;
	}
	
	jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
		$.ajax({
            type:"POST",
            url:contextRootPath+"/laTPayoffinfo/deleteLaTPayoffinfo?ids="+v_ids,
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
            url:contextRootPath+"/laTPayoffinfo/deleteLaTPayoffinfo?ids="+v_ids,
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
			'display':contextRootPath+'/laTPayoffinfo/prepareExecute/toView?id='+vId,
			'width':1100,
			'height':600,
			'title':'查看结清通知单明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}
 
function toPrint(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"warn"}).alert("请选择待打印的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"warn"}).alert("请选择一条数据进行打印操作！");
		return;
	}
	var contractSource = iframe.iframeObj["table"].getSelectedObjs()[0].contractSource;
	var url = "toPrint";
	if(contractSource=="HAXT"){
		url = "toPrintHAXT";
	}
	if(contractSource=="FZDY"){
		url = "toPrintFZDY";
	}

	if(contractSource=="XS" || contractSource=="XQ"){
		url = "toPrintXSXQ";

	}
	if(contractSource=="01"){
		url = "toPrintJYLC";
	}
	
	var dialogStruct={
			'display':contextRootPath+'/laTPayoffinfo/prepareExecute/'+url+'?id='+v_ids,
			'width':800,
			'height':600,
			'title':'打印结清通知单',
			'buttons':[
             // {'text':'打印','action':printit,'isClose':true},
             {'text':'打印预览','action':printpreview,'isClose':true},
            // {'text':'下载','action':download,'isClose':true},
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogUpdate = jyDialog(dialogStruct);
	dialogUpdate.open();
}

function printpreview() {
//	debugger;
	doUpdateLog();
	dialogUpdate.getIframe().window.print();
	
}

function doUpdateLog(){	
//	debugger;
//	var payoffFlag = $(dialogUpdate.iframe.contentDocument.getElementById("dunid")).val();
	//var dunId = $("#dunid").val();	
	if (dialogUpdate && dialogUpdate.getIframe()) {
		var id = dialogUpdate.getIframe().$("#dunid").val();	
		//通过ajax保存
		var url=contextRootPath+"/laTPayoffinfo/updatePrintLog";
	    var params = "id=" + id;
		//通过ajax保存
		jyAjax(
			url,
			params,
			function(msg){
//				$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
				var v_status = msg.status;
	        	if(v_status.indexOf('ok') >-1){
	        		dialogUpdate.close();
	        	}
		});
	}
}
function todownload(){

     var selectObj = iframe.iframeObj["table"].getSelectedObjs();	
     //合同编号
	 var v_intoAppId = selectObj[0].contractId;
	 //金额
	 var v_contractAmount = selectObj[0].contractAmount;
	 //日期
	 var v_payoffDate = selectObj[0].payoffDate;
	 
	 var v_contractSource = selectObj[0].contractSource;
	 //客户姓名
	 var v_custName = selectObj[0].custName;
	 var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
		jyDialog({"type":"question"}).confirm("您确认要下载吗？",function(){
            window.location.href=contextRootPath+"/laTPayoffinfo/downloadPdf?ids="+v_ids+"&custName="+encodeURI(encodeURI(v_custName))+"&intoAppId="+v_intoAppId+"&payoffDate="+v_payoffDate+"&contractAmount="+v_contractAmount+"&contractSource="+v_contractSource;
			// $.ajax({
	        //     type:"POST",
	        //     dataType:"json",
	        //     url:contextRootPath+"/laTPayoffinfo/downloadPdf?ids="+v_ids+"&custName="+encodeURI(encodeURI(v_custName))+"&intoAppId="+v_intoAppId+"&payoffDate="+v_payoffDate+"&contractAmount="+v_contractAmount+"&contractSource="+v_contractSource,
	        //     success:function(msg){
	        //     	var v_status = msg.status;
	        //     	if(v_status.indexOf('ok') >-1){
   		// window.location.href=msg.msg;
           //
	        //     	}
	        //     	//$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
	        //     	//var v_status = msg.status;
	        //     	//删除成功后
	        //     }
	        // });
		   },"确认提示");
		

}	 
	   

