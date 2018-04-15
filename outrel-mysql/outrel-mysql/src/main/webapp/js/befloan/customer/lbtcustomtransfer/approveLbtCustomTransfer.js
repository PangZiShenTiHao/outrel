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
				makeupPartnerInfo(obj[i])//遍历参数
				var otherParamJavaCode=$("#dtootherParamJavaCode").val();
				var url =contextRootPath+"/jbpmServiceManagerTransfer/executeServiceTransferWorkflow?processInsId="+obj[i].CUR_EXE_ID+"&bizTabId="+obj[i].BIZ_TAB_ID+"&acitityName="+obj[i].CUR_ACT_NAME+"&taskId="+obj[i].TASKID+"&turnDirection="+turnDirection+"&otherParamJavaCode="+otherParamJavaCode+"&contractId="+obj[i].contractId+"&refuseMeg="+params;
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
 	var intoAppId = iframe.iframeObj["table"].getSelectedObjs("fkIntoAppId");
 	var url=contextRootPath+'/lbTCustomTransfer/prepareExecute/toServiceRefuse?intoAppId='+intoAppId;
 	var dialogStruct={
 			'display':url,
 			'width':500,
 			'height':300,
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