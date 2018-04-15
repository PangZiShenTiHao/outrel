//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdateObj;
function toAddContact(contractId){
	return function() {
		var dialogStruct={
				'display':contextRootPath+'/laTTipContact/prepareExecute/toAdd?contractId='+contractId,
				'width':800,
				'height':500,
				'title':'新增',
				'buttons':[
		         {'text':'保存','action':doAddContactFrom,'isClose':true},
				 {'text':'关闭','isClose':true}
				]
			};
		dialogAddObj=jyDialog(dialogStruct);
		dialogAddObj.open();
	}
}

//新增页面的保存操作
function doAddContactFrom(){
	var obj = dialogAddObj.getIframe();
	var phone = $(obj.dtophone).val();
	if(!(/^(\d*(\.\d+)?)$/.test(phone)) || eval(phone) < 0){
		jyDialog({"type":"warn"}).alert("手机号请输入数字！");
		return;
	}
	if('' != phone && phone.length > 11){
		jyDialog({"type":"info"}).alert("手机号长度不能大于11位！");
		return;
	}
	var orderBy = $(obj.dtoorderBy).val();
	if(!(/^(\d*(\.\d+)?)$/.test(orderBy)) || eval(orderBy) < 0){
		jyDialog({"type":"info"}).alert("星级请输入数字！");
		return;
	}
	if(!(/^[-+]?[1-9][0-9]*$/.test(orderBy))){
		jyDialog({"type":"info"}).alert("星级只能填写整数！");
		return;
	}
	if(eval(orderBy) >= 100){
		jyDialog({"type":"info"}).alert("星级只能填写两位数，小于100！");
		return;
	}
	//序列化 新增页面的form表单数据
	if(!checkIsNull(obj.$("#addNewsFormData"))) return;
	var params=obj.$("#addNewsFormData").serialize();
	var url=contextRootPath+'/laTTipContact/insertLaTTipContact';
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
        	}
  	});
}
//修改 事件
function toUpdateContact(){
	var v_ids = contactInfoTable.getSelectedIds().join(",");
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
			'display':contextRootPath+'/laTTipContact/prepareExecute/toUpdate?id='+v_ids,
			'width':800,
			'height':500,
			'title':'修改',
			'buttons':[
             {'text':'保存','action':doUpdateContact,'isClose':true},
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogUpdateObj = jyDialog(dialogStruct);
	dialogUpdateObj.open();
}
//修改页面 的 保存操作
function doUpdateContact(){
	var obj = dialogUpdateObj.getIframe();
	var orderBy = $(obj.dtoorderBy).val();
	if(!(/^(\d*(\.\d+)?)$/.test(orderBy)) || eval(orderBy) < 0){
		jyDialog({"type":"info"}).alert("星级请输入数字！");
		return;
	}
	if(!(/^[-+]?[1-9][0-9]*$/.test(orderBy))){
		jyDialog({"type":"info"}).alert("星级只能填写整数！");
		return;
	}
	if(eval(orderBy) >= 100){
		jyDialog({"type":"info"}).alert("星级只能填写两位数，小于100！");
		return;
	}
	//序列化 新增页面的form表单数据
	if(!checkIsNull(obj.$("#updateNewsFormData"))) return;
	var params=obj.$("#updateNewsFormData").serialize();
	var url=contextRootPath+'/laTTipContact/updateLaTTipContact';
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
	jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
		$.ajax({
            type:"POST",
            dataType:"json",
            url:contextRootPath+"/laTTipContact/deleteLaTTipContact?ids="+v_ids,
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
			'display':contextRootPath+'/laTTipContact/prepareExecute/toView?id='+vId,
			'width':800,
			'height':500,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}


//唯一性验证
function queryPhoneIsExist(phone,contractId){
	$.ajax({
        type:"POST",
        dataType:"json",
        url:contextRootPath+"/laTTipContact/queryPhoneIsExist?phone="+phone+"&contractId="+contractId,
        success:function(msg){
        	if(msg.data>0){
        		 $("").newMsg({}).show("该手机号码已经存在");
        		$('#dtophone').val('');
        	}
        }
    });
}

