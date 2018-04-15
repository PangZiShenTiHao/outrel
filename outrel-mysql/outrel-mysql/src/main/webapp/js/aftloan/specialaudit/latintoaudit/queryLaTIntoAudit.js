//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdateObj;
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/laTIntoAudit/prepareExecute/toAdd',
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

/**
 * 新增稽核任务
 */
function addTask(type) {
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		$("").newMsg({}).show("请选择需稽核数据！");
		return;
	}
	var url=contextRootPath+'/laTIntoAudit/insertLaTIntoAudit';
	var params="v_ids=" + v_ids+"&type="+type;
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			var v_status = msg.status;
			if(v_status.indexOf('ok') >-1){
				//新增成功后，				
				$("").newMsg({}).show(msg.msg);
				window.parent.parent.dialogAddObj.close();				
				window.parent.parent.queryData();
			} else {
				jyDialog().alert(msg.msg);
			}
			
			
  	});
}

// 新增专项稽核任务
function toAddIntoChange(){
	var url= contextRootPath+'/laTIntoAudit/prepareExecute/toAdd';
    var dialogStruct={
			'display':url,
			'width':1100,
			'height':900,
			'modal':false, 
			'title':'新增线下稽核任务',
			'isIframe':"true",
			'buttons':[
			     {'text':'关闭','isClose':true}
			]
	};
    dialogAddObj=jyDialog(dialogStruct);
	dialogAddObj.open();
} 

//新增页面的保存操作
function doAddFrom(){
	var obj = dialogAddObj.getIframe();
	//序列化 新增页面的form表单数据
	if(!checkIsNull(obj.$("#addNewsFormData"))) return;
	var params=obj.$("#addNewsFormData").serialize();
	var url=contextRootPath+'/laTIntoAudit/insertLaTIntoAudit';
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

	var dialogStruct={
			'display':contextRootPath+'/laTIntoAudit/prepareExecute/toUpdate?id='+v_ids,
			'width':800,
			'height':500,
			'title':'修改',
			'buttons':[
             {'text':'保存','action':doUpdateFrom,'isClose':true},
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogUpdateObj = jyDialog(dialogStruct);
	dialogUpdateObj.open();
}
//修改页面 的 保存操作
function doUpdateFrom(){
	var obj = dialogUpdateObj.getIframe();
	//序列化 新增页面的form表单数据
	if(!checkIsNull(obj.$("#updateNewsFormData"))) return;
	var params=obj.$("#updateNewsFormData").serialize();
	var url=contextRootPath+'/laTIntoAudit/updateLaTIntoAudit';
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
            url:contextRootPath+"/laTIntoAudit/deleteLaTIntoAudit?ids="+v_ids,
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
			'display':contextRootPath+'/laTIntoAudit/prepareExecute/toSubmit?auditID='+vId+'&viewFlag=YES',
			'width':1200,
			'height':700,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}


function submitData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	var v_infId =  iframe.iframeObj["table"].getSelectedObjs("intoAppId");

	var v_auditState =  iframe.iframeObj["table"].getSelectedObjs("auditState");	
	var contractId =  iframe.iframeObj["table"].getSelectedObjs("contractId");

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
	
	 $.ajax({
         type:"POST",
         url:contextRootPath+'/laTIntoAudit/selectLaTIntoAuditstate?id=' + v_ids,
         success:function(msg){        	      	
         	if(msg.indexOf('ok') >-1){
         		jyDialog({"type":"info"}).alert("只有待处理状态的稽核任务才能进行处理！");
         		return;
         	}else{
         		var v_url= encodeURI ( contextRootPath +'/dojbpm/jbpmcreditaudit/prepareExecute/toViewAppInfo1');
         		v_url = v_url +"?bizInfId="+encodeURI(v_infId)+"&auditId="+encodeURI(v_ids)+"&contractId="+encodeURI(contractId);
         		window.open(v_url,'viewHistInfoWindow'+v_infId);
         	}
         }
     });	
}
/*
 * 查询条件[信审员]：非必输，点击后弹出【审批人员选择页面】，每次仅能选择一个。
 */
function selectUser(code,orgId){
	var title = window.top.tabs.getActiveObj().title;
	var v_url = contextRootPath+'/component/dialoguser/selectVmTreeUser.jsp?a=a&showLowerUser=false&orgType=LOAN&orgId='+orgId;
	if(code=='creUserName'){
		v_url = v_url+'&callFun=setCreUser&tabTitle='+title;
	}else if(code=='creLastUserName'){
		v_url = v_url+'&callFun=setCreLastUser&tabTitle='+title;
	}else if(code=='auditOperateName'){
		v_url = v_url+'&callFun=setAuditOperateUser&tabTitle='+title;
	}else{
		v_url = v_url+'&callFun=callFunSetUser&tabTitle='+title;
	}
	$.dialog({
		id:	'selectUserDialogId',
	    lock: true,
	    width:420,
	    height:680,
	    title:'选择审核人员信息',
	    content: 'url:'+ v_url
		}); 
}

/*
 * 查询条件"信审员"设置回调姓名
 */
function callFunSetUser(objs){
	var v_names = "";
	var v_ids = "";
	for(var i = 0;i < objs.length; i++){
		if(v_ids!=""){
			v_ids +=",";
			v_names+=",";
		}
		v_names +=objs[i].userName;
		v_ids +=objs[i].id;
	}
}
/*
 * 查询条件"信审初审专员"设置回调姓名
 */
function setCreUser(v_ids,v_names){
	$("[name='creUserName']").val(v_names);
	$("[name='creUserId']").val(v_ids);
}

/**
 * 查询条件"稽核专员"设置回调姓名
 */
function setAuditOperateUser(v_ids,v_names){
	$("[name='auditOperateName']").val(v_names);
	$("[name='auditOperate']").val(v_ids);
}
/*
 * 查询条件"信审终审专员"设置回调姓名
 */
function setCreLastUser(v_ids,v_names){
	$("[name='creLastUserName']").val(v_names);
	$("[name='creLastUser']").val(v_ids);
}