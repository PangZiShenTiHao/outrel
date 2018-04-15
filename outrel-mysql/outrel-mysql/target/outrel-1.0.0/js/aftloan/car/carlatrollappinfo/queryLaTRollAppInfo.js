//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdateObj;
function toAddData(contractId){
	var dialogStruct={
		'display':contextRootPath+'/laTRollAppInfo/prepareExecute/toAdd?contractId='+contractId,
		'width':1200,
		'height':700,
		'title':'新增',
		'buttons':[
         {'text':'保存','action':doAddFrom,'isClose':false},
		 {'text':'关闭','isClose':true}
		]
	};
	dialogAddObj=jyDialog(dialogStruct);
	dialogAddObj.open();
}
//下一步
function openNextPage(){
	var selectIds = dialogAddObj.getIframe().getSelectedIds().join(",");
	var contractId = dialogAddObj.getIframe().getSelectedObjss("contractId");
	//如果没有选中 数据则
	if(selectIds == ""){
		jyDialog({"type":"info"}).alert("请先选择一条数据！");
		return;
	}
	//判断合同来源是否有特殊不可新增操作的
//	var  url = contextRootPath+"/LaTContractConfigure/queryByserial?typeSerial=08&conSerial=" ;
//	var falg = false;
//	$.ajax({
//		type:"POST",
//		url:url,
//		async:false,
//		success:function(msg){
//			if(msg.indexOf('ok') >-1){
//				falg=false;
//			}else{
//				falg=true;
//			}
//		}
//	});
//	
//	if(falg){
//		 jyDialog({"type":"warn"}).alert("该放款机构不可退款！");
//		 return ; 
//	}
	
	//关闭查询界面
	dialogAddObj.close();
	toAddData(contractId);
}
//上一步
function openPrevPage() {
	dialogAddObj.close();
	toAddData();
}
function toQueryContract(){
	var dialogStruct={
		'display':contextRootPath+'/laTRollAppInfo/prepareExecute/toQueryContract',
		'width':1200,
		'height':700,
		'title':'新增',
		'buttons':[
         {'text':'下一步','action':openNextPage,'isClose':false},
		 {'text':'关闭','isClose':true}
		]
	};
	
	dialogAddObj=jyDialog(dialogStruct);
	dialogAddObj.open();
}

//页面校验
function validateData(formObj){
	if(!validateDoubleValue(formObj,"dtorollCost","展期应付总费用")) return false ;
	if(!validateDoubleValue(formObj,"dtorollAmount","展期本息合计")) return false ;
	if(!validateDoubleValue(formObj,"dtorollPrincipal","展期本金")) return false ;
	return true ;
}

function validateDoubleValue(formObj,domId,msg){
	var dtocoefficientval = $("#"+domId,formObj).val();
	var patrn=/^(([\d]+))(\.(\d){1,2})?$/;
	if(!patrn.test(dtocoefficientval)){
		$("").newMsg({}).show(msg+"只能为正浮点数,最多保留小数点后两位有效数字。");
		return false ;
	}
	return true ;
}

//新增页面的保存操作
function doAddFrom(){
	var obj = dialogAddObj.getIframe();
	var formObj=obj.$("#addNewsFormData")[0];
	if(!checkIsNull(formObj)) {
		$("").newMsg({}).show("页面的输入项是必填项，请输入！");
		return;
	}
//	if(!validateData(formObj)) return ;
	
	var obj = dialogAddObj.getIframe();
	//序列化 新增页面的form表单数据
	var params=obj.$("#addNewsFormData").serialize();
	var url=contextRootPath+'/laTRollAppInfo/insertLaTRollAppInfo';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			jyDialog({"type":"info"}).alert(msg.msg);
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		queryData();
        		dialogAddObj.close();
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
	var v_objs=iframe.iframeObj["table"].getSelectedObjs()[0];
	var v_rollState = v_objs.rollState ;
	if(v_rollState != "101"){
		jyDialog({"type":"warn"}).alert("只能选择申请单状态为已保存的数据！");
		return ;
	}
	
	var dialogStruct={
			'display':contextRootPath+'/laTRollAppInfo/prepareExecute/toUpdate?id='+v_ids,
			'width':1200,
			'height':700,
			'title':'修改',
			'buttons':[
             {'text':'保存','action':doUpdateFrom,'isClose':false},
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogUpdateObj = jyDialog(dialogStruct);
	dialogUpdateObj.open();
}
//修改页面 的 保存操作
function doUpdateFrom(){
	var obj = dialogUpdateObj.getIframe();
	var formObj=obj.$("#updateNewsFormData")[0];
	if(!checkIsNull(formObj)) {
		$("").newMsg({}).show("页面的输入项是必填项，请输入！");
		return;
	}
//	if(!validateData(formObj)) return ;
	//序列化 新增页面的form表单数据
	var params=obj.$("#updateNewsFormData").serialize();
	var url=contextRootPath+'/laTRollAppInfo/updateLaTRollAppInfo';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//保存成功后，执行查询页面查询方法
			jyDialog({"type":"info"}).alert(msg.msg);
        	var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		queryData();
        		dialogUpdateObj.close();
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
	var v_objs=iframe.iframeObj["table"].getSelectedObjs()[0];
	var v_rollState = v_objs.rollState ;
	if(v_rollState != "101"){
		jyDialog({"type":"warn"}).alert("只能选择单据状态为已保存的数据！");
		return ;
	}
	if(confirm("您确认要删除选择的数据吗？")){
        $.ajax({
            type:"POST",
            dataType:"JSON",
            url:contextRootPath+"/laTRollAppInfo/deleteLaTRollAppInfo?ids="+v_ids,
            success:function(msg){
            	jyDialog({"type":"info"}).alert(msg.msg);
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
			'display':contextRootPath+'/laTRollAppInfo/prepareExecute/toView?id='+vId,
			'width':1200,
			'height':700,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
	var dialogView = jyDialog(dialogStruct).open();
}

//点击新增按钮 事件跳转至 新增页面
function toUploadIntoAttachment(){
	var v_objs=getObjs("请选择待上传附件的数据！");
	if(!v_objs){
		return;
	}
	var v_ids=v_objs.intoAppId;
	var v_rollState = v_objs.rollState ;
	if(v_rollState != "101"){
		jyDialog({"type":"warn"}).alert("只能选择单据状态为已保存的数据！");
		return ;
	}
	
//	var v_prodpType=v_objs.apprProductType;
//	if(!v_prodpType) v_prodpType=v_objs.appProductType ;
	var v_prodpType=v_objs.appProductType;
	
	var parentTitle=window.top.tabs.getActiveObj().title;
	var title="展期申请上传附件("+v_objs.intoAppId+")";
	var url=contextRootPath+'/lbTIntoInfo/prepareExecute/uploadIntoAttachment?id='+v_ids+"&appProductType="+v_prodpType+'&tabTitle='+title+'&parentTitle='+parentTitle;
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

//刷新指定的tab(按照tab标题)
function flushTab(tabTitle) {
	try{
		var winObj=window.top.tabs.getTabWinByTitle(tabTitle);
		winObj.queryData();
	} catch(e) {
		
	}
}



