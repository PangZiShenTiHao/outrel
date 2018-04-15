//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAdd;
var dialogAuditAdd;

function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/lbTBlacklistInfo/prepareExecute/toAdd',
		'width':700,
		'height':600,
		'title':'黑名单转入申请',
		'isIframe':'false',
		'buttons':[
         {'text':'确定','action':doAddFrom},
		 {'text':'关闭','isClose':true}
		]
	};
	
	dialogAdd =jyDialog(dialogStruct);
	dialogAdd.open();
}
//新增页面的保存操作
function doAddFrom(){
	var formName="addNewsFormData";
	if(!(checkIsNull(formName)&&checkFormFormat(formName))) {
		return;
	}

	var dataType = $('#dtodataType').val();
	var dataValue = $('#dtodataValue').val();
	//当黑名单类型是客户时
	if(dataType == '3' && !LOAN.util.isCheck18ID( dataValue.toLowerCase() )) {
		$('#dtodataValue').focus();
		$("").newMsg({}).show("请输入合法的证件号码!");
		return ;
	} 
	if(dataType == '4' && ( !regExps.mobilePhone.test(dataValue))){//当黑名单类型是移动电话时
		$('#dtodataValue').focus();
		$("").newMsg({}).show("请输入正确的手机号码!");
		return ;
	} 
	if((dataType == '5' || dataType == '6') && ( !regExps.fixedLineTelephone.test(dataValue))){//当黑名单类型是固定电话时
		$('#dtodataValue').focus();
		$("").newMsg({}).show("请输入正确的电话号码!<br>(区号与电话号码之间以横线'-'分隔)");
		return ;
	}
	if(dataType == '9' && ( !regExps.email.test(dataValue))){//当黑名单类型是email时
		$('#dtodataValue').focus();
		$("").newMsg({}).show("请输入正确的email!");
		return ;
	}
	
	var params=$("#addNewsFormData").serialize();
	var url=contextRootPath+'/lbTBlacklistInfo/intoBlacklist';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			$("").newMsg({}).show(msg.msg);
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		queryData();
        		dialogAdd.close();
        	}
  	});
}

function auditData(opType) {
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		$("").newMsg({}).show("请选择待审核的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		$("").newMsg({}).show("请选择一条数据！");
		return;
	}
	
	if(opType == '1') {
		var dialogStruct={
				'display':contextRootPath+'/lbTBlacklistInfo/prepareExecute/toAudit?id='+v_ids,
				'width':700,
				'height':600,
				'title':'黑名单转入申请审核',
				'isIframe':'false',
				'buttons':[
		         {'text':'提交','action':doAuditForm},
				 {'text':'关闭','isClose':true}
				]
			};
	} else {
		var dialogStruct={
				'display':contextRootPath+'/lbTBlacklistInfo/prepareExecute/toAudit?id='+v_ids,
				'width':700,
				'height':600,
				'title':'黑名单转出申请审核',
				'isIframe':'false',
				'buttons':[
		         {'text':'提交','action':doAuditForm},
				 {'text':'关闭','isClose':true}
				]
			};
	}
		
	dialogAuditAdd =jyDialog(dialogStruct);
	dialogAuditAdd.open();
}

function doAuditForm() {
	if(confirm("您确认要执行当前操作吗？")){
		
		//序列化 新增页面的form表单数据
		var url=contextRootPath+'/lbTBlacklistInfo/auditingBlackList';
		var params=$("#auditBlackListForm").serialize();
		jyAjax(
			url,
			params,
			function(msg){
				//新增成功后，
				$("").newMsg({}).show(msg.msg);
				var v_status = msg.status;
	        	if(v_status.indexOf('ok') >-1){
	        		queryData();
	        		dialogAuditAdd.close();
	        	}
	  	});
    }
}
