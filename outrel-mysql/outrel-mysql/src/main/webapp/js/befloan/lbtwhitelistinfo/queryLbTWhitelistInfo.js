//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdateObj;

var addDlg1;//添加第一个界面：查询贷前
var addDlg2;//添加第二个界面：添加详情
// 申请
function toAddData(){
	var dialogStruct={
			'display':contextRootPath+'/lbTWhitelistInfo/prepareExecute/toQueryAbnormalLoanInfo',
			'width':1100,
			'height':750,
			'title':'查询异常客户信息',
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
	var contractSrc=addDlg1.getIframe().getSelectedContractSrc();

	//关闭查询界面
	addDlg1.close();
	//打开新增界面
	var url=contextRootPath+'/lbTWhitelistInfo/prepareExecute/toAddNext?'+selectObj+'&claimKind='+claimKind;
	var dialogStruct={
			'display':url,
			'width':1100,
			'height':750,
			'title':'异常客户资格申请',
			'buttons':[ 
			           {'text':'保存','action':doAddFrom},
			           {'text':'关闭','isClose':true}
			           ]
	};

	addDlg2 =jyDialog(dialogStruct);
	addDlg2.open();
}


// 保存申请原因信息
function doAddFrom(){
	var form=addDlg2.iframe.contentDocument.getElementById("addNewsFormData");
	if(form.elements.remark.value == ''
		||form.elements.remark.value==null || form.elements.remark.value == 'undefined') {
		$("").newMsg({}).show("请录入备注信息 ！");
		return;
	}
	
	// 判断该进件是否参与审批过	 
	var intoAppId = form.elements.intoAppId.value;
	var v_Typeurl = contextRootPath+"/lbTWhitelistInfo/isAppWhiteListInfo?intoAppId="+intoAppId;
	jyAjax(
			v_Typeurl,
			'',
			function(msg){
				if(msg.data == "true"){
					$("").newMsg({}).show("该进件已经申请过异常客户资格申请！");
					return false;
				} else {
					if(checkFormFormat($(form))){
						var params=$(form).serialize();
						var url=contextRootPath+'/lbTWhitelistInfo/insertLbTWhitelistInfo';
						jyAjax(
								url,
								params,
								function(msg){
									//新增成功后，
									$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
									var v_status = msg.status;
									if(v_status.indexOf('ok') >-1){
										addDlg2.close();
				 						queryData();
									}
								});
					}else{
						jyDialog({"type":"warn"}).alert("红色区域为输入有误！");
					}
				}
			}
	);
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
	var v_rollState = v_objs.auditingState ;

	if(v_rollState != "01"){
		jyDialog({"type":"warn"}).alert("只能选择单据状态为已保存的数据！");
		return ;
	}

	jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
		$.ajax({
			type:"POST",
			dataType:"json",
			url:contextRootPath+"/lbTWhitelistInfo/deleteLbTWhitelistInfo?ids="+v_ids,
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

//上传附件功能 
function toUploadIntoAttachment(){
	var v_objs=getObjs("请选择待上传附件的数据！");
	if(!v_objs){
		return;
	} 
 
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");

	var selectObj = iframe.iframeObj["table"].getSelectedObjs()[0];
	var url = contextRootPath+'/laTImageBizAss/prepareExecute/toViewUpload?id='+v_ids+"&type=33" ;

	var dialogStruct={
			'display':url,
			'width':1100,
			'height':800,
			'title':'上传',
			'buttons':[
			           {'text':'关闭','isClose':true}
			           ]
	};

	dialogUpdate =jyDialog(dialogStruct);
	dialogUpdate.open();
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

//提交审批  事件  
function submitAppData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	 
	var url =contextRootPath+"//whiteListJbpm/whiteListJbpmController/startWhiteListWorkflow?nextPartnerId="+$("#dtoparamUserId").val()+"&ids="+v_ids+"&loginUserId="+$("#loginUserId").val();
	jyDialog({"type":"question"}).confirm("您确认要提交选择的数据吗？",function(){
		var params = null;
		jyAjax(
				url,
				params,
				function(msg){
					//保存成功后，执行查询页面查询方法
					$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
					var v_status = msg.status;
					if(v_status.indexOf('ok') >-1){
						//显示剩下数据
						queryData();
					}
				});
	},"确认提示");
}
