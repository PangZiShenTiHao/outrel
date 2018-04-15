//utf-8
//点击新增按钮 事件跳转至 新增页面
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/laTSmsapp/prepareExecute?operateData=toAdd',
		'width':800,
		'height':500,
		'title':'新增',
		'buttons':[
         {'text':'保存','action':doAddFrom,'isClose':true},
		 {'text':'关闭','isClose':true}
		]
	};
	
	var dialogAdd =jyDialog(dialogStruct).open();
}
//新增页面的保存操作
function doAddFrom(){
	//序列化 新增页面的form表单数据
	var params=$("#addNewsFormData").serialize();
	var url=contextRootPath+'/laTSmsapp/insertLaTSmsapp';
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
function changeSelectSms(){
	var selectCustNameAndPhone = $("#selectCustNameAndPhone").val();
	var selectCustNameAndPhoneTemp = selectCustNameAndPhone.split(":");
	$("#dtocusName").val(selectCustNameAndPhoneTemp[1]);
	$("#mobileNumber").val(selectCustNameAndPhoneTemp[2]);
	var type = selectCustNameAndPhoneTemp[0];
	if("本人" == type){
		$("#dtoselectSelf").show();
		$("#dtoselectOther").hide();
		var optionOne = $("#dtoselectSelf option:first");
		optionOne.prop("selected", 'selected');
		changeMsgTemplate(optionOne.val());
	}else{
		$("#dtoselectSelf").hide();
		$("#dtoselectOther").show();
		var optionOne = $("#dtoselectOther option:first");
		optionOne.prop("selected", 'selected');
		changeMsgTemplate(optionOne.val());
	}
	
	
}

function changeMsgTemplate(value){
	if(value != "" && typeof(value) != 'undefined'){
		$("#smsId").val(value);
		var url=contextRootPath+"/laTSmsapp/viewMessage";
		var params = {cusName:$("#dtocusName").val(),smsId:value,id:$("#dtoid").val(),userOrgId:$("#dtouserOrgId").val()};
		var jsonObj = tools.requestJsonRs(url, params);
	
		if(jsonObj.data != null){
			$("#dtosmsContext").val(jsonObj.data);
		}else{
			$("#dtosmsContext").val("");
			jyDialog({"type":"info"}).alert("没有对应的短信模板！");
		}
	}else{
		$("#smsId").val("");
		$("#dtosmsContext").val("");
		jyDialog({"type":"info"}).alert("没有对应的短信模板！");
	}
}

//修改 事件
function toUpdateData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待发送短信的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"info"}).alert("请选择一条数据！");
		return;
	}

	var dialogStruct={
			'display':contextRootPath+'/laTSmsapp/prepareExecute?operateData=toUpdate&id='+v_ids,
			'width':800,
			'height':500,
			'title':'单笔短信发送',
			'buttons':[
			 /*{'text':'短信预览','action':viewData,'isClose':false},*/
             {'text':'发送','action':doUpdateFrom,'isClose':false},
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogUpdate = jyDialog(dialogStruct);
	dialogUpdate.open();
}
//修改页面 的 保存操作
function doUpdateFrom(){
	//判断短信发送数量
	var stoId = $(dialogUpdate.iframe.contentDocument.getElementById("dtostoId")).val();
	var url2=contextRootPath+'/laTSmsapp/checkMsgNo?stoId='+stoId;
	$.ajax({
		type:"post",
		url:url2,
		success:function(result){
			debugger;
			if(result=="N" || result=="\"N\""){
				if(!checkForm()){
			        return ;
			    }
				/*var smsId = $(dialogUpdate.iframe.contentDocument.getElementById("smsId")).val();
				if(smsId != "01"){
					jyDialog({"type":"info"}).alert("没有对应的短信模板！");
			        return;
				}*/
				//序列化 新增页面的form表单数据
				var params=$(dialogUpdate.iframe.contentDocument.getElementById("updateNewsFormData")).serialize();
				debugger;
				var url=contextRootPath+'/laTSmsapp/insertLaTSmsapp';
				//通过ajax保存
				jyAjax(
					url,
					params,
					function(msg){
						//保存成功后，执行查询页面查询方法
			        	var v_status = msg.status;
			        	if(v_status.indexOf('ok') >-1){
			        		$("").newMsg({}).show(msg.msg);
			        		dialogUpdate.close();
			        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
			        		queryData();
			        	}else{
			        		jyDialog({"type":"warn"}).alert(msg.msg);
			        	}
			  	});
			} else if (result=="D" || result=="\"D\""){
				jyDialog({"type":"info"}).alert("对同一个逾期合同，在一天内只能发送一条催收短信！");
			} else if (result=="M" || result=="\"M\""){
				jyDialog({"type":"info"}).alert("对同一个逾期合同，在一个自然月内只能发送两条催收短信！");
			}else{
				jyDialog({"type":"info"}).alert("数据错误,请重新发送！");
			}
		}
	});
}

//批量发送短信
function batchMessages(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待发送短信的数据！");
		return;
	}
	 jyDialog({"type":"question"}).confirm("是否进行批量发送短信?",function(){
		 var dialogStruct={
					'display':contextRootPath+'/laTSmsapp/prepareExecute?operateData=toMsgTemplate&caseIds='+v_ids,
					'width':800,
					'height':500,
					'title':'批量短信发送',
					'buttons':[
					 /*{'text':'短信预览','action':viewData,'isClose':false},*/
		             {'text':'发送','action':doBatchMessages,'isClose':false},
					 {'text':'关闭','isClose':true}
					]
				};
				
			dialogBatch = jyDialog(dialogStruct);
			dialogBatch.open();
	   },"确认提示");
}

function doBatchMessages(){
	//短信模板
	var msgTemplate = $(dialogBatch.iframe.contentDocument.getElementById("msgTemplate")).val();
	var url=contextRootPath+"/laTSmsapp/viewMessage";
	var params = {cusName:'',smsId:msgTemplate};
	var jsonObj = tools.requestJsonRs(url, params);

	if(jsonObj.data == null){
		jyDialog({"type":"info"}).alert("没有对应的短信模板！");
		return;
	}
	
	var v_ids = $(dialogBatch.iframe.contentDocument.getElementById("caseIds")).val();
	var params={caseIds:v_ids,msgTemplate:msgTemplate};
	var url=contextRootPath+"/laTSmsapp/batchMessagesSent";
	jyAjax(url,params,function(result){
		dialogBatch.close();
		$("").newMsg({}).show(result.msg);
		//location.reload();
	})
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
            url:contextRootPath+"/laTSmsapp/deleteLaTSmsapp?ids="+v_ids,
            success:function(msg){
            	alert(msg.msg);
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		iframe.iframeObj["table"].removeSelectedRow();
            	}
            	
            	
            }
        });
    }
}
//查看历史数据
function toViewData(obj){
	var v_ids = obj["ID"];
	var dialogStruct={
			'display':contextRootPath+'/laTSmsapp/prepareExecute?operateData=toView&id='+v_ids,
			'width':1100,
			'height':500,
			'title':'查看历史记录',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogView = jyDialog(dialogStruct);
	dialogView.open();
}
//全量发送短信
function messagesSentAll(){
	if(window.confirm("是否进行全量发送短信?")){
		var msgTemplate = $("#msgTemplate").val();
		//var msgTemplate = iframe.iframeObj["form"].getObj("msgTemplate").val();
		var params={msgTemplate:msgTemplate};
		var url=contextRootPath+"/laTSmsapp/messagesSentAll";
		jyAjax(url,params,function(result){
			alert(result.msg);
			location.reload();
		})
	}
}
function checkForm(){
    var dtomobileNumber = $(dialogUpdate.iframe.contentDocument.getElementById("mobileNumber")).val();//手机号
    var dtocreateBy=$(dialogUpdate.iframe.contentDocument.getElementById("dtocreateBy")).val();
    var smsId = $(dialogUpdate.iframe.contentDocument.getElementById("smsId")).val();
    var dtosmsContext = $(dialogUpdate.iframe.contentDocument.getElementById("dtosmsContext")).val();
    //手机号校验
	if(isNull(dtomobileNumber)){
		jyDialog({"type":"warn"}).alert("请填写手机号");
		return false;
	}
	//催收员
	if(isNull(dtocreateBy)){
		jyDialog({"type":"warn"}).alert("请填写催收员");
		return false;
	}
	//短信内容
	if(isNull(dtosmsContext)){
		jyDialog({"type":"warn"}).alert("请填写短信内容");
		return false;
	}
    /*
        校验手机格式
    */
	if(!checkMobile(dtomobileNumber)){
        jyDialog({"type":"warn"}).alert("手机号码格式不正确");
        return false;
    }
	
    return true;
}
