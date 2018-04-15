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
							var url = contextRootPath
									+ "/jbpmServiceManagerBatchTransfer/executeServiceTransferWorkflow?processInsId="+ obj[i].CUR_EXE_ID + "&bizTabId="+ obj[i].BIZ_TAB_ID + "&acitityName="+ obj[i].CUR_ACT_NAME + "&taskId="+ obj[i].TASKID + "&turnDirection="+ turnDirection + "&otherParamJavaCode="+ otherParamJavaCode + "&refuseMeg="+ params + "&id="+ obj[i].id + "&nextPartnerId="+$("#dtoparamUserId").val();
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
 	var id = iframe.iframeObj["table"].getSelectedObjs("id");
 	var url=contextRootPath+'/lbTCustServiceBat/prepareExecute/toServiceRefuse?id='+id;
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
 
//查看明细
 function viewData(batchNo){
 	var dialogStruct={
 			'display':contextRootPath+'/lbTCustServiceBat/prepareExecute/toView?batchNo='+batchNo,
 			'width':800,
 			'height':500,
 			'title':'批次下合同列表',
 			'buttons':[
 			 {'text':'关闭','isClose':true}
 			]
 	};
 		
 	var dialogView = jyDialog(dialogStruct).open();
 }
 /**
  * 查看流程轨迹
  * @param obj
  */
 function viewTransferJbpmLogs(obj){
 	var url=contextRootPath+"/lbTCustServiceBat/findJbpmByIntoIdAndBizType?id="+obj.id;
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