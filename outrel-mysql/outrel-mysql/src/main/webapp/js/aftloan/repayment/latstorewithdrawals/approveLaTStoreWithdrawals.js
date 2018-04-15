
 /**
  * 查看流程轨迹
  * @param obj
  */
 function viewWithdrawalsJbpmLogs(obj){
 	var url=contextRootPath+"/laTStoreWithdrawals/findJbpmByIntoIdAndBizType?id="+obj.id;
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
var dialogUpdate;
 function checkUploadFile(v_ids){
     var dialogStruct={
         'display':contextRootPath+'/laTImageBizAss/prepareExecute/toViewUpload?id='+v_ids+"&type=37",
         'width':1000,
         'height':800,
         'title':'附件查看',
         'buttons':[
             {'text':'关闭','isClose':true}
         ]
     };

     dialogUpdate =jyDialog(dialogStruct);
     dialogUpdate.open();
 }