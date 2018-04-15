//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdateObj;
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/laTPromrepayment/prepareExecute/toAdd',
		'width':800,
		'height':500,
		'title':'新增',
		'buttons':[
         {'text':'保存','action':doAddFrom,'isClose':true},
		 {'text':'关闭','isClose':true}
		]
	};
	
	dialogAddObj=jyDialog(dialogStruct);
	dialogAddObj.open();
}
//修改 事件
function toUpdateData(obj){
	var selectIds = obj.id;
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
//新增页面的保存操作
function doAddFrom(){
	var obj = dialogAddObj.getIframe();
	//序列化 新增页面的form表单数据
	var params=obj.$("#addNewsFormData").serialize();
	var url=contextRootPath+'/laTPromrepayment/insertLaTPromrepayment';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			alert(msg.msg);
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		queryData();
        	}
  	});
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
			if(rmoney(dtoproAmount)<=100){
				if(dtobal>=100){
					jyDialog({"type":"warn"}).alert("当剩余应还总额不低于100元，则承诺金额必须不低于100元！");
					return false;
				}
				if(rmoney(dtoproAmount)!=parseFloat(dtobal)){
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
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		alert("请选择待删除的数据！");
		return;
	}
	if(confirm("您确认要删除选择的数据吗？")){
        $.ajax({
            type:"POST",
            url:contextRootPath+"/laTPromrepayment/deleteLaTPromrepayment?ids="+v_ids,
            success:function(msg){
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
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/laTPromrepayment/prepareExecute/toView?id='+vId,
			'width':800,
			'height':500,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}