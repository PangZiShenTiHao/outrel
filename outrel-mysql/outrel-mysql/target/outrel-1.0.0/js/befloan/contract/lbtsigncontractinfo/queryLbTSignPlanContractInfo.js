var dialogAdd;
var cModify;

var addDlg1;//添加第一个界面：查询贷前
var addDlg2;//添加第二个界面：添加详情
//修改贷款额度、贷款期限
function toGenPlan(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	
	//如果没有选中 数据则进行提醒
	if(v_ids == ""){
		$("").newMsg({}).show("请选择待操作的数据！");
		return;
	}
	// 获取所在行的对象
	var objs=iframe.iframeObj["table"].getSelectedObjs();
	
    //获取签章字段
    var v_isSignature = objs[0].planIsSignature;
    
    if(v_isSignature == 1){
    	
    	$("").newMsg({}).show("当前电子合同已签章，需先作废原合同！");
    }else{
    	continueNext(objs,v_ids);
    					
    }
	
}

function continueNext(objs,v_ids){
	    
		var dialogStruct={
				'display':contextRootPath+'/lbTContractInfo/prepareExecute/toGenPlanInfo?id='+v_ids,
				'width':800,
				'height':450,
				'title':'还款计划生成合同',
				'isIframe':'false',
				'buttons':[
	             {'text':'保存','action':saveUpdateData,'isClose':false},
				 {'text':'关闭','isClose':true}
				]
			};

		dialogAdd =jyDialog(dialogStruct);
		dialogAdd.open();
}

//保存 相关的update 数据
function saveUpdateData (){
	//栏位的相关数据
	var params = $("#updateNewsFormData").serialize();
	
	var url=contextRootPath+'/lbTContractInfo/doOperatGenertPlan';
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
        		dialogAdd.close();
        		queryData();
        		
        	}
  	});
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


//合同下载
function toDownLoadFile(){
	var v_ids=getIds("请选择要下载的数据！");
	debugger;
	// 获取所在行的对象
	var objs=iframe.iframeObj["table"].getSelectedObjs();
    var v_contractId = objs[0].contractId;
	if(!v_ids){
		return;
	}
	var dialogStruct={
			'display':contextRootPath+'/lbTContractInfo/prepareExecute/downLoad?Id='+v_ids+'&contractNo='+v_contractId+"&planContractShape=0",
			'width':800,
			'height':800,
			'title':'合同下载',
			'isIframe':'false',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
		};
	if(objs[0].planContractShape == '1' && objs[0].planIsSignature != '1' && objs[0].planisGenerat == '1') {
		dialogStruct={
				'display':contextRootPath+'/lbTContractInfo/prepareExecute/downLoad?Id='+v_ids+'&contractNo='+v_contractId+"&planContractShape=1",
				'width':800,
				'height':800,
				'title':'合同下载',
				'isIframe':'false',
				'buttons':[
				 {'text':'PC电子签章','action':signSealFrom('1'),'isClose':false},
				 //{'text':'手机电子签章','action':signSealFrom('2'),'isClose':false},          
				 {'text':'关闭','isClose':true}
				]
			};
	}
	dialogAdd =jyDialog(dialogStruct);
	dialogAdd.open();
}

//签章操作
function signSealFrom(pcOrApp){
	debugger
	return function(){
		var params= $("#addNewsFormData").serialize();
		var contractList = $("#contractList").val();
		//操作电子合同签章按钮时， 判断合同签章协议是否有值
		if(contractList==null||contractList==""||contractList=="[]"){
			$("").newMsg({}).show("合同签章协议不能为空，请核实！"); 
			return false;
		}
		params = params + '&pcOrApp=' + pcOrApp;
		var url = contextRootPath+'/lbtsigncontract/aftloanSignSeal';
		if(pcOrApp == '1') {
			jyDialog().confirmSize(msg, 700, 800, function(){
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
			});
		} else {
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
	};
}


//上传 合同扫描件
function uploadIntoAtta(){
	var v_objs=getIds("请选择待上传附件的数据！");
	//获取所在行的对象
	var objs=iframe.iframeObj["table"].getSelectedObjs();
	var v_fkIntoAppId = objs[0].fkIntoAppId;
	var v_custId = objs[0].fkCustId;
	if(!v_objs){
		return;
	}
	var v_ids=v_objs;//v_objs.id;
	var title="上传扫描件";
	var url=contextRootPath+'/lbTContractInfo/prepareExecute/uploadContractFile?id='+v_ids+'&fkIntoAppId='+v_fkIntoAppId+"&custId="+v_custId;
	openTab(title,url);
}

//查看进件的操作日志
function viewOperateLog(fkIntoAppId){
	var url = contextRootPath+'/lbtsigncontract/viewLog?intoAppId='+fkIntoAppId;
	window.open(url,'newwindow');
}

//查看明细
function viewData(vId,intoAppId){
	var title="查看进件信息("+intoAppId+")";
	var url=contextRootPath+'/lbTIntoInfo/prepareExecute/viewLbTIntoInfo?id='+vId+'&operateBtn=view&tabTitle='+title;
	openTab(title,url);
}
//以tab形式打开连接
function openTab(title,url) {
	var obj = {
		"title" : title,
		"url" : url
	};
	window.top.tabs.add(obj);
}

function doSaveFrom(){
	var params1111=$("#addNewsFormData").serialize();
	var params=$(window.parent.document).find("[name='addDialogId']").contents().find("[id='addNewsFormData']").serialize();
	var url=contextRootPath+'/lbTReconsideration/insertLbTReconsideration';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			$("").newMsg({}).show(msg.msg);
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//关闭窗口 调用弹出页面的 closeWindow方法
        		$(window.parent.document).find("[name='addDialogId']")[0].contentWindow.closeWindow();
        	}
  	});
}

//查看最新的审批结果意见
function viewAuditResult(v_ids){
	var dialogStruct={
			'display':contextRootPath+'/lbTReconsideration/prepareExecute/toViewAuditResult?intoId='+v_ids,
			'width':1100,
			'height':550,
			'title':'审批意见',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
		};
		
		dialogAdd =jyDialog(dialogStruct);
		dialogAdd.open();
}

