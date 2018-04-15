//utf-8
//点击新增按钮 事件跳转至 新增页面
function doDeductWay(type){ 
	//type 为1 时，转为系统自动批量划扣；为0时，门店手工单笔划扣
	var data=iframe.iframeObj["table"].getSelectedObjs();
	if(data==undefined||data.length==0){
		jyDialog({"type":"warn"}).alert("请选择要操作的数据!");
		return 
	}
	var contractIds="";
	$.each(data,function(){
		contractIds+=","+this.contractId;
	});
     contractIds=contractIds.substr(1);
//     alert(contractIds);
	var  url = contextRootPath+"/laTMonthpaydeduct/updateDeductWayForContractIds?contractIds="+contractIds+"&type="+type;
	$.ajax({
		type:"POST",
		url:url,
		async:false,
		success:function(data){
			var msg = $.parseJSON(data);
			var v_status = msg.status;
			jyDialog({"type":"warn"}).alert(msg.msg);
        	if(v_status.indexOf('ok') >=0){
        		queryData();
			}
		}
	});
}
//查看明细

function viewpaydetail(contractId){
	var dialogStruct={
			'display':contextRootPath+'/laTLedgerQuery/prepareExecute/toQueryPayTransInfo?contractId='+contractId,
			'width':1100,
			'height':620,
			'title':'查看还款流水明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	 jyDialog(dialogStruct).open();
}

function viewContractDetail(contractId){
	
}