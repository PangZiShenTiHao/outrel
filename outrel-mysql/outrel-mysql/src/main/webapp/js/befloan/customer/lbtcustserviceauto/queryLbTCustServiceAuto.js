//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdateObj;
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/lbTCustServiceAuto/prepareExecute/toAdd',
		'width':1000,
		'height':600,
		'title':'自动分配',
		'buttons':[
		 {'text':'自动分配','action':autoAssignedFrom,'isClose':false},
         {'text':'保存','action':saveAssignedFrom,'isClose':false},
		 {'text':'关闭','isClose':true}
		]
	};
	
	dialogAddObj=jyDialog(dialogStruct);
	dialogAddObj.open();
}
/**
 * 转出客服
 */
function setCallFunToUserOld(v_ids,v_names){
	dialogAddObj.getIframe().setCallFunToUserOld(v_ids,v_names);
}
/**
 * 转入客服
 */
function setCallFunToUserNew(v_ids,v_names){
	dialogAddObj.getIframe().setCallFunToUserNew(v_ids,v_names);
}
/**
 * 在职客服
 */
function setCallFunToUserNow(v_ids,v_names){
	dialogAddObj.getIframe().setCallFunToUserNow(v_ids,v_names);
}
/**
 * 自动分配
 */
function autoAssignedFrom(){
	var obj = dialogAddObj.getIframe();
	//序列化 新增页面的form表单数据
	if(!obj.ckData()){
		return;
	}
	obj.queryCoreData();
}
/**
 * 点击保存时
 */
function saveAssignedFrom(){
	var obj = dialogAddObj.getIframe();
	var batchNo=obj.batchNo.value;
	//序列化 新增页面的form表单数据
	if(!obj.ckData()){
		return;
	}
	if(!batchNo){
		jyDialog({"type":"info"}).alert("请先点击自动分配！");
		return;
	}
	var params=obj.$("#addNewsFormData").serialize();
	var url=contextRootPath+'/lbTCustServiceAuto/insertLbTCustServiceAuto';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//保存成功后，执行查询页面查询方法
			$("").newMsg({}).show(msg.msg);
        	var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		dialogAddObj.close();
        		queryData();
        	}
  	});
}
/**
 * 点击删除
 */
function deleteData(){
	var id = iframe.iframeObj["table"].getSelectedIds().join(",");
	var applyState= iframe.iframeObj["table"].getSelectedObjs("applyState");
	var batchNo= iframe.iframeObj["table"].getSelectedObjs("batchNo");
	var disType= iframe.iframeObj["table"].getSelectedObjs("disType");
	if(id==''){
		jyDialog({"type":"info"}).alert("请选择待删除的数据！");
		return;
	}else if(applyState!="1"){
		jyDialog({"type":"info"}).alert("只能删除保存成功的申请！");
		return;
	}
	jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
		$.ajax({
            type:"POST",
            dataType:"json",
            url:contextRootPath+"/lbTCustServiceAuto/deleteLbTCustServiceAuto?ids="+id+"&batchNo="+batchNo+"&disType="+disType,
            success:function(msg){
            	$("").newMsg({}).show(msg.msg);
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		queryData();
            	}
            }
        });
	   },"确认提示");
}
/**
 * 点击批次号,查看自动分配详情
 */
function viewAutoBData(v_ids){
	var dialogStruct={
			'display':contextRootPath+'/lbTCustServiceAutoB/prepareExecute/toQueryPage?fkId='+v_ids,
			'width':1000,
			'height':600,
			'title':'合同自动分配详情',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
		};
		dialogAddObj=jyDialog(dialogStruct);
		dialogAddObj.open();
}
/**
 * 查看流程轨迹
 * @param obj
 */
function viewJbpmLogs(obj){
	var url=contextRootPath+"/lbTCustServiceAuto/findJbpmByIdAndBizType?id="+obj.batchNo;
	jyAjax(
		url,
		'',
		function(result){
			var v_bizTabName=result.data.BIZ_TAB_NAME;
			var processInstantceId=result.data.PRO_INSTANCE_ID;
			var v_bizInfId=result.data.BIZ_INF_ID;
			$.dialog({
				id:	'viewWrokflowHisLog',
			    lock: true,
			    width:850,
			    height:800,
			    title:'查看流程轨迹',
			    content: 'url:'+contextRootPath+'/component/jbpm/persontask/viewWorkflowHisLog.jsp?processInstantceId='+encodeURI(processInstantceId)+'&bizTabName='+encodeURI(v_bizTabName)+'&bizInfId='+encodeURI(v_bizInfId)
			});
	});
}

/**
 * 提交审批
 */  
function submitAppData(){
	var ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	var url =contextRootPath+"/JbpmAutoService/autoServiceWorkflow?nextPartnerId="+$("#dtoparamUserId").val()+"&ids="+ids;
	jyDialog({"type":"question"}).confirm("您确认要提交选择的数据吗？",function(){
		jyAjax(
				url,
				'',
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
/*
 * 提交 执行 待办任务
 */
	function subTask(params){
		var turnDirection=$("#dtoturnDirection").val();
		var infoMeg="通过";
		if(params!=''){			
			infoMeg="拒绝";
		}
		var obj= iframe.iframeObj["table"].getSelectedObjs("");
		jyDialog({"type":"question"}).confirm("您确认对选择的["+obj.length+"]笔记录审批"+infoMeg+"吗？",function(){
			for(var i=0;i<obj.length;i++){
				makeupPartnerInfo(obj[i]);//遍历参数
				var otherParamJavaCode=$("#dtootherParamJavaCode").val();
				var url =contextRootPath+"/JbpmAutoService/executeAutoServiceWorkflow?processInsId="+obj[i].CUR_EXE_ID+"&bizTabId="+obj[i].BIZ_TAB_ID+"&acitityName="+obj[i].CUR_ACT_NAME+"&taskId="+obj[i].TASKID+"&turnDirection="+turnDirection+"&otherParamJavaCode="+otherParamJavaCode+"&id="+obj[i].id+"&refuseMeg="+params;
				//通过ajax保存
				jyAjax(url,"",function(msg){
					var v_status = msg.status;
					if(v_status.indexOf('ok') >-1){
						if(i==(obj.length-1)){
							$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
							queryData();
						}
					}
				},"","",false);
			}
			queryData();
		},"确认提示");
	}
/*
 * 组装选中的参与者信息
 */
 function makeupPartnerInfo(obj){
	 debugger
	 var v_m = new JBPM.common.Map();//new Map
	    v_m.put("result", "to");
	    v_m.put("proTaskId",obj.TASKID+"");
		v_m.put("proProcessInsId",obj.CUR_EXE_ID+"");
		v_m.put("proAcitityName", obj.CUR_ACT_NAME+"");
		v_m.put("proBizTabId", obj.BIZ_TAB_ID+"");
		v_m.put("proBizTabName", obj.BIZ_TAB_NAME+"");
		v_m.put("proBizInfId", obj.BIZ_INF_ID+"");
		var v_userId = $("#dtoparamUserId").attr("value");//指定参与者id
		v_m.put("owner",v_userId);
		var v_otherMap = v_m.toMapString();
		$("#dtootherParamJavaCode").val(v_otherMap);
	}
 /**
  * 审批拒绝
  */
 var serviceRefuseObj;
 function serviceRefuse(){
 	var url=contextRootPath+'/lbTCustServiceAuto/prepareExecute/toServiceRefuse';
 	var dialogStruct={
 			'display':url,
 			'width':500,
 			'height':240,
 			'title':'审批拒绝',
 			'buttons':[
 			           {'text':'保存','action':doRefuseFrom,'isClose':false},
 			           {'text':'关闭','isClose':true}
 			]
 			
 		};
 	serviceRefuseObj=jyDialog(dialogStruct);
 	serviceRefuseObj.open();
 }
/**
 * 审批拒绝，保存操作
 */
 function doRefuseFrom(){
	 var obj = serviceRefuseObj.getIframe();
	 if(!obj.ckData()){
		 return;
	 }
	//序列化 新增页面的form表单数据
	var params = obj.refuseReason.value;
	subTask(params);
	serviceRefuseObj.close();
 }