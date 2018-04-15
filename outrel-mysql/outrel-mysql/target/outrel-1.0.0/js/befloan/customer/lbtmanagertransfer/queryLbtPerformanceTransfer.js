//修改 事件
var dialogAddObj = null;
function toUpdateData(){
	var ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	var transferStatus= iframe.iframeObj["table"].getSelectedObjs("perforTransferStatus");
	//如果没有选中 数据则
	if (ids=='') {
		$("").newMsg({}).show("请选择修改的数据！");
		return;
	}
	//如果选择多个 择提示
	if(ids.indexOf(',')>-1){
		$("").newMsg({}).show("请选择一条数据！");
		return;
	}
	if(transferStatus!="" && transferStatus!='02'){
		$("").newMsg({}).show("只有业绩转移状态为保存成功的才能修改！");
		return;
	}
	var dialogStruct={
			'display':contextRootPath+'/lbtPerformanceTransfer/prepareExecute/toUpdate?id='+ids,
			'width':800,
			'height':600,
        'title': '修改',
			'buttons':[
			           {'text':'保存','action':doUpdateFrom,'isClose':false},
			           {'text':'关闭','isClose':true}
			]
			
		};
	dialogAddObj=jyDialog(dialogStruct);
	dialogAddObj.open();
}
//修改页面 的 保存操作
function doUpdateFrom(){
	var obj = dialogAddObj.getIframe();
    debugger
	if(!obj.checkMyDataForm()){
		return;
	}
	//序列化 新增页面的form表单数据
	var params = obj.saveMyData();
	var url=contextRootPath+'/lbtPerformanceTransfer/lbtPerformanceTransferData?type=1';
	//通过ajax保存
    obj.checkPerformanceTransfer(function () {
        jyAjax(
            url,
            params,
            function (result) {
                var v_status = result.status;
                if (v_status.indexOf('ok') > -1) {
                    dialogAddObj.close();
                    $("").newMsg({}).show(result.msg);
                    queryData();
                }
            })
    });
}
/**
 * 提交方法
 */
function prepareStartWorkflow(){
	var ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if (ids=='') {
		$("").newMsg({}).show("请选择修改的数据！");
		return;
	}
	
	var perforTransferStatusArray = iframe.iframeObj["table"].getSelectedObjs("perforTransferStatus");
	var count  = perforTransferStatusArray.length;
	for (var i = 0;i<count;i++){
		var transferStatus  = perforTransferStatusArray[i];
		if (transferStatus != "02") {
			jyDialog({
				"type" : "warn"
			}).alert("请选择单据状态为保存成功的数据！");
			return;
		}
	}
	selectNextPartner("分部总","performanceTransferKey");
}


//提交审批  事件  
function submitData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	var url =contextRootPath+"/jbpmPerformanceTransfer/performanceTransferWorkflow?nextPartnerId="+$("#dtoparamUserId").val()+"&ids="+v_ids+"&loginUserId="+$("#loginUserId").val();
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


/*
 * 回写
 * 方法名称必须是 subTask()
 */
function setPartnerInfo(v_userName, v_userId) {
	$("#nameInfo").val(v_userName);
	$("#dtoparamUserId").val(v_userId);
	var prepareType = $("#prepareType").val();
	if(prepareType=='1'){
		subTask("审批成功");
	}else{
		submitData();//会掉 业务js
	}
	
}

/**
 * 归属转移function
 */
function custTransfer(type){
	var ids='',intoId='';
	//获取id
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//获取进件id
	var v_intoId= iframe.iframeObj["table"].getSelectedObjs("intoAppId");
	//当前状态
	var transferStatus= iframe.iframeObj["table"].getSelectedObjs("perforTransferStatus");
	//如果没有选中 数据则
	if(v_ids==''){
		$("").newMsg({}).show("请选择操作数据！");
		return;
	}else{
		for(var i=0;i<v_intoId.length;i++){
			ids=v_ids+",";//主键
			if(v_intoId.length==1){
				intoId=v_intoId[i];
			}else{
				intoId=intoId+v_intoId[i]+",";//进件编号
			}
			if((transferStatus[i]!=null && transferStatus[i]!='01' && transferStatus[i]!='05' && transferStatus[i]!='06')){
				$("").newMsg({}).show("只有业绩转移为初始状态、审批通过或拒绝的才能归属转移！");
				return;
			}
		}
	}
	if(type==1){
		var url = contextRootPath+"/lbtPerformanceTransfer/prepareExecute/toTransfer?ids="+ids+"&intoId="+intoId;
		var dialogStruct={
				"display":url
				,"width":"850"
				,"height":"500"
				,title:'归属转移'
				,"buttons":[{"text":"保存","action":addFromSave1,"isClose":false},
						    		{"text":"关闭","isClose":true}]};
		dialogAddObj=jyDialog(dialogStruct);
		dialogAddObj.open();
	}else if(type==2){
		var url = contextRootPath+"/lbtPerformanceTransfer/prepareExecute/toTransferInfoInto?ids="+ids+"&intoId="+intoId + "&type="+type;
		var dialogStruct={
				"display":url
				,"width":"850"
				,"height":"500"
				,title:'进件转移'
				,"buttons":[{"text":"保存","action":addFromSave2,"isClose":false},
						    		{"text":"关闭","isClose":true}]};
		dialogAddObj=jyDialog(dialogStruct);
		dialogAddObj.open();
	}
	
}
/**
*轨迹转移页面 保存操作 
 */
function addFromSave1(){
	var obj = dialogAddObj.getIframe();
	//保存时，判断页面信息的必填项是否完整
	if(!obj.checkMyDataForm()){
		return ;
	}
	var params = obj.saveMyData();
	var url=contextRootPath+"/lbtPerformanceTransfer/lbtPerformanceTransferData?type=1";
	obj.checkPerformanceTransfer(function(){
		jyAjax(
				url,
				params,
				function(result){
					var v_status = result.status;
		        	if(v_status.indexOf('ok') >-1){
		        		dialogAddObj.close();//先关闭弹出层
		        		$("").newMsg({}).show(result.msg);
		        		queryData();
		        	}
			});
	});
	
}
/**
*轨迹转移页面 保存操作 
 */
function addFromSave2(){
	
	var obj = dialogAddObj.getIframe();
	//保存时，判断页面信息的必填项是否完整
	if(!obj.checkMyDataForm()){
		return ;
	}
	var manageTeamManagerCode = $("#manageTeamManagerCode").val();
	var manageTeamManagerName = $("#manageTeamManagerName").val();
	if(manageTeamManagerCode==""||manageTeamManagerName==""){
		$("").newMsg({}).show("所选门店没有查到门店经理的信息！");
		return;
	}
	var params = obj.saveMyData();
	var url=contextRootPath+"/lbtPerformanceTransfer/lbtPerformanceTransferData?type=2";
	obj.checkPerformanceTransfer(function(){
		jyAjax(
				url,
				params,
				function(result){
					var v_status = result.status;
		        	if(v_status.indexOf('ok') >-1){
		        		dialogAddObj.close();//先关闭弹出层
		        		$("").newMsg({}).show(result.msg);
		        		queryData();
		        	}
			});
		
	});
	
}

/**
 * 查看业绩转移轨迹
 * @param vId 进件id
 */
function viewTransferLogs(obj){
	var dialogStruct={
			'display':contextRootPath+'/lbtPerformanceTransfer/prepareExecute/toQueryLog?fkIntoAppId='+obj.intoAppId,
			'width':1500,
			'height':600,
			'title':'查看业绩转移轨迹',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
	var dialogView = jyDialog(dialogStruct).open();
}
$(function(){
	/*
	 * 单击新所属团队，判断是否选择门店
	 */
	 $("#storeId").click(function(){
		 var parentId=$("#dtocomplOrg").val();
		 if(parentId==''){
			 $("").newMsg({}).show("请选择新所属门店！");
		 }
	 });
	 /*
	  * 改变团队时，异步查询相应的新团队经理编号 、新团队经理、新客户经理编号 、新客户经理
	  */
	 $("#storeId").change(function(){
			var orgId=$("#storeId").val();
			var storeName=$('#storeId option:selected').text();
			$("input[name=manageTeamStore]").val(storeName);
			if(orgId!=''){
				 var url=contextRootPath+"/lbtPerformanceTransfer/getUserByTeamId?orgId="+orgId;
				 jyAjax(
							url+"&positionId=86",//团队经理
							'',
							function(result){
							var v_status = result.status;
				        	 if(v_status.indexOf('ok') >-1){
				        		 //移除团队经理编号
				        		 $("#teamManageId  option").remove(); 
				        		 $("#teamManageId").append("<option value=''>--请选择--</option>");
				        		 //追加团队经理编号
				 				$("#teamManageId").append(result.data.split("@")[0]);
				 				//移除团队经理名称
				 				$("#teamManageName option").remove(); 
				        		 $("#teamManageName").append("<option value=''>--请选择--</option>");
				        		//追加团队经理名称
				 				$("#teamManageName").append(result.data.split("@")[1]);
				        	}
					});
				 
				 jyAjax(
						 url+"&positionId=163,86",//客户经理
							'',
							function(result){
							var v_status = result.status;
				        	 if(v_status.indexOf('ok') >-1){
				        		 //移除客户经理编号
				        		 $("#customerManageId option").remove(); 
				        		 $("#customerManageId").append("<option value=''>--请选择--</option>");
				        		 //追加客户经理编号
				 				$("#customerManageId").append(result.data.split("@")[0]);
				 				//移除客户经理名称
				 				$("#customerManageName option").remove(); 
				        		 $("#customerManageName").append("<option value=''>--请选择--</option>");
				        		 //追加客户经理名称
				 				$("#customerManageName").append(result.data.split("@")[1]);
				        	}
					});
			}else{
				 $("").newMsg({}).show("请选择新所属团队！");
			}
		 });
	 /*
	  * 选择新团队经理编号时，异步显示相应的经理名称
	  */
		 $("#teamManageId").change(function(){
			 var orgId=$("#storeId").val();
				if(orgId!=''){
				  //团队经理编号
					var teamUserId=$("#teamManageId").val();
					if(teamUserId!=''){
						 var url=contextRootPath+"/lbtPerformanceTransfer/getUserByParent?userNo="+teamUserId+"&orgId="+orgId+"&positionId=86";//团队经理
						 jyAjax(
									url,
									'',
									function(result){
									var v_status = result.status;
						        	 if(v_status.indexOf('ok') >-1){
						        		 //移除团队经理名称
						        		 $("#teamManageName  option").remove(); 
						        		 //追加团队经理名称
						 				$("#teamManageName").append(result.data);
						        	}
							});
					}
				}else{
					 $("").newMsg({}).show("请选择新所属团队！");
				}
			 
		 });
		 /*
		  * 选择新团队经理名称时，异步显示相应的经理编号
		  */
		 $("#teamManageName").change(function(){
			 var orgId=$("#storeId").val();
				if(orgId!=''){
				  //团队经理编号
					var teamManageName=$("#teamManageName").val();
					if(teamManageName!=''){
						 var url=contextRootPath+"/lbtPerformanceTransfer/getUserByParent?uName="+teamManageName+"&orgId="+orgId+"&positionId=86";//团队经理
						 jyAjax(
								 url,
									'',
									function(result){
									var v_status = result.status;
						        	 if(v_status.indexOf('ok') >-1){
						        		 //移除团队经理名称
						        		 $("#teamManageId  option").remove(); 
						        		 //追加团队经理名称
						 				$("#teamManageId").append(result.data);
						        	}
							});
					}
				}else{
					 $("").newMsg({}).show("请选择新所属团队！");
				}
			 
		 });
		 /*
		  *  选择新客户经理编号时，异步显示相应的新客户经理名称
		  */
		 $("#customerManageId").change(function(){
			 var orgId=$("#storeId").val();
				if(orgId!=''){
					//客户经理编号
					var customerUserId=$("#customerManageId").val();
					if(customerUserId!=''){
						 var url=contextRootPath+"/lbtPerformanceTransfer/getUserByParent?userNo="+customerUserId+"&orgId="+orgId+"&positionId=163,86";//客户经理
						 jyAjax(
								 url,
									'',
									function(result){
									var v_status = result.status;
						        	 if(v_status.indexOf('ok') >-1){
						        		 //移除客户经理名称
						        		 $("#customerManageName  option").remove(); 
						        		 //追加客户经理名称
						 				$("#customerManageName").append(result.data);
						        	}
							});
					}
				}else{
					 $("").newMsg({}).show("请选择新所属团队！");
				}
			 
		 });
		 /*
		  *  选择新客户经理名称时，异步显示相应的新客户经理编号
		  */
		 $("#customerManageName").change(function(){
			 var orgId=$("#storeId").val();
				if(orgId!=''){
					//客户经理编号
					var customerManageName=$("#customerManageName").val();
					if(customerManageName!=''){
						 var url=contextRootPath+"/lbtPerformanceTransfer/getUserByParent?uName="+customerManageName+"&orgId="+orgId+"&positionId=163,86";//客户经理
						 jyAjax(
								 url,
									'',
									function(result){
									var v_status = result.status;
						        	 if(v_status.indexOf('ok') >-1){
						        		 //移除客户经理名称
						        		 $("#customerManageId  option").remove(); 
						        		 //追加客户经理名称
						 				$("#customerManageId").append(result.data);
						        	}
							});
					}
				}else{
					 $("").newMsg({}).show("请选择新所属团队！");
				}
			 
		 });
		 queryInfo();
	});
/**
 * 根据门店显示出团队，根据团队显示出相应的管理人员
 */
function queryInfo(){
	//用户编辑时，根据门店id,得到团队列表
	var parentId=$("#dtocomplOrg").val();
	var teamId=$("#manageTeamStoreCode").val();
	 if(parentId){
		 var url=contextRootPath+"/lbtPerformanceTransfer/getOrgByParentId?parentId="+parentId+"&teamId="+teamId;
		 jyAjax(
					url,
					'',
					function(result){
					var v_status = result.status;
		        	 if(v_status.indexOf('ok') >-1){
		        		 //移除旧的列表
		        		 $("#storeId option").remove(); 
		        		 $("#storeId").append("<option value=''>--请选择--</option>");
		        		 //追加新的列表
		 				$("#storeId").append(result.data);
		        	}
			});
		 var teamManagerCode=$("#manageTeamManagerCode").val();
			var teamManagerName=$("#manageTeamManagerName").val();
			var customerManagerCode=$("#manageCustomerManagerCode").val();
			var customerManagerName=$("#manageCustomerManagerName").val();
					 var url=contextRootPath+"/lbtPerformanceTransfer/getUserByTeamId?orgId="+teamId
					 jyAjax(
								url+"&positionId=86&code="+teamManagerCode+"&codeName="+teamManagerName,//团队经理
								'',
								function(result){	
								var v_status = result.status;
					        	 if(v_status.indexOf('ok') >-1){
					        		 //移除团队经理编号
					        		 $("#teamManageId  option").remove(); 
					        		 $("#teamManageId").append("<option value=''>--请选择--</option>");
					        		 //追加团队经理编号
					 				$("#teamManageId").append(result.data.split("@")[0]);
					 				//移除团队经理名称
					 				$("#teamManageName option").remove(); 
					        		 $("#teamManageName").append("<option value=''>--请选择--</option>");
					        		//追加团队经理名称
					 				$("#teamManageName").append(result.data.split("@")[1]);
					        	}
						});
					 jyAjax(
							 url+"&positionId=163,86&code="+customerManagerCode+"&codeName="+customerManagerName,//客户经理
								'',
								function(result){
								var v_status = result.status;
					        	 if(v_status.indexOf('ok') >-1){
					        		 //移除客户经理编号
					        		 $("#customerManageId option").remove(); 
					        		 $("#customerManageId").append("<option value=''>--请选择--</option>");
					        		 //追加客户经理编号
					 				$("#customerManageId").append(result.data.split("@")[0]);
					 				//移除客户经理名称
					 				$("#customerManageName option").remove(); 
					        		 $("#customerManageName").append("<option value=''>--请选择--</option>");
					        		 //追加客户经理名称
					 				$("#customerManageName").append(result.data.split("@")[1]);
					        	}
						});
	 }
	 
		
}
var dialogOpen;
/**
 * 审批拒绝
 */
function approveRefuse(){
	var id = iframe.iframeObj["table"].getSelectedIds().join(",");
	if(id==""){
		$("").newMsg({}).show("请选择数据！");
		return false;
	}
	var dialogStruct={
			'display':contextRootPath+'/lbtPerformanceTransfer/prepareExecute/toQueryApproveRefuse?id='+id,
			'width':500,
			'height':240,
			'isIframe':'false',
			'title':'审批拒绝',
			'buttons':[
			           {'text':'保存','action':doRefuseFrom},
			           {'text':'关闭','isClose':true}
			]
			
		};
	dialogOpen=jyDialog(dialogStruct);
	dialogOpen.open();
}
//审批拒绝，保存操作
function doRefuseFrom(){
	
	var approvalRefusalCause = $("#approvalRefusalCause").val();
	if(!approvalRefusalCause){
		jyDialog({"type":"warn"}).alert("拒绝原因不能为空！");
		return;
	}
	subTask("审批拒绝",approvalRefusalCause);
	dialogOpen.close();
}
/**
 * 查看流程 处理轨迹
 * @param obj
 */
function viewTransferJbpmLogs(obj){
	var url=contextRootPath+"/lbTCustomTransfer/findJbpmByIntoIdAndBizType?intoAppId="+obj.intoAppId+"&type=perform";
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

/*
 *准备提交\执行 我的待办任务
 *进行 业务规则，
 *选人规则的校验
 */
function prepareSubTask(v_myTurn){
	var objs = iframe.iframeObj["table"].getSelectedObjs("");
	//如果没有选中 数据则
	if (objs.length<=0) {
		$("").newMsg({}).show("请选择要审批的数据！");
		return;
	}
	
	if(objs[0].perforTransferStatus=="04"){
		subTask("审批成功");
	}else{
		selectNextPartner("区域总","performanceTransferKey");
	}
	
	
}
/*
 * 提交 执行 待办任务
 */
function subTask(turnDirection,refuseMeg){
	var objs = iframe.iframeObj["table"].getSelectedObjs("");
	var nextPartnerId = "";
	if(objs[0].perforTransferStatus=="04"){
		nextPartnerId = $("#loginUserId").val();
	}else{
		nextPartnerId = $("#dtoparamUserId").val();
	}
	
	jyDialog({"type":"question"}).confirm("您确认要审批选择的任务吗？",function(){
		for(var i=0;i<objs.length;i++){
			var obj = objs[i];
			v_msg = JBPM.common.getOperateTaskStateInfo(obj.TASKID, obj.CUR_OWNER);
			if(v_msg == null || "" == v_msg){
				var params = "";
				params = params +"?taskId="+encodeURI(obj.TASKID)+"&processInsId="+encodeURI(obj.CUR_EXE_ID)+"&acitityName="+encodeURI(obj.CUR_ACT_NAME);
				params = params +"&bizInfId="+encodeURI(obj.BIZ_INF_ID)+"&bizTabName="+encodeURI(obj.BIZ_TAB_NAME)+"&bizTabId="+encodeURI(obj.BIZ_TAB_ID);
				params = params +"&bizType="+encodeURI(obj.BIZ_TYPE)+"&lockState="+encodeURI(obj.LOCK_STATE)+"&turnDirection="+encodeURI(turnDirection);
				params = params +"&nextPartnerId="+encodeURI(nextPartnerId) + "&id="+encodeURI(obj.id)+"&refuseMeg="+refuseMeg;
				var  url = contextRootPath+"/jbpmPerformanceTransfer/executePerformanceTransferWorkflow"+params;
				//通过ajax保存
				jyAjax(url,"",function(msg){
					var v_status = msg.status;
					if(v_status.indexOf('ok') >-1){
						if(i==(objs.length-1)){
							$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
							queryData();
						}
					}
				},"","",false);
			}
		}
		queryData();
	},"确认提示");
	
}
/*
 * 组装选中的参与者信息
 */
function makeupPartnerInfo(){
	var v_m = new JBPM.common.Map();//new Map
    v_m.put("result", "to");
    v_m.put("proTaskId",$("#dtotaskId").val()+"");
	v_m.put("proProcessInsId", $("#processInsId").val()+"");
	v_m.put("proAcitityName", $("#acitityName").val()+"");
	v_m.put("proBizTabId", $("#bizTabId").val()+"");
	v_m.put("proBizTabName", $("#bizTabName").val()+"");
	v_m.put("proBizInfId", $("#bizInfId").val()+"");
	var v_userId = $("#dtoparamUserId").attr("value");//指定参与者id
	v_m.put("owner",v_userId);
	var v_otherMap = v_m.toMapString();
	$("#dtootherParamJavaCode").val(v_otherMap);
}

//初始化用户组织信息store：门店 area：区域 segment：分部
function initUserOrg(type) {
	
	$.ajax({
		url : contextRootPath
				+ '/lbtPerformanceTransfer/queryOrgByUserCode',
		type : 'POST',
		dataType:'JSON',
		async : false,
		data : {
			store : type
		},
		success : function(obj) {
			
			var data = obj.data;
			$("#nameInfo").val(data.user_name);
			$("#dtoparamUserId").val(data.user_no);
		}
	});
}
function expExcel() {
	var params = $(".searchFrom").serialize();
	var url=contextRootPath + "/lbtPerformanceTransfer/countLbtPerformTransfer?" + params;
	jyAjax(
			url,
			params,
			function(result){
				var v_status = result.status;
	        	if(v_status.indexOf('ok') >-1){
	        		if(result.msg==''){
	        			window.location.href = contextRootPath + "/lbtPerformanceTransfer/excelTransfer?" + params;
	        		}else{
	        			jyDialog({"type":"info"}).alert(result.msg);
	        			return;
	        		}
	        	}
		});
}

$.ajaxSetup({  
    contentType: "application/x-www-form-urlencoded; charset=utf-8"  
});  
var DataDeal = {  
//将从form中通过$('#form').serialize()获取的值转成json  
           formToJson: function (data) {
        	   data= decodeURIComponent(data,true);//防止中文乱码 
               data=data.replace(/&/g,"\",\"");  
               data=data.replace(/=/g,"\":\"");  
               data="{\""+data+"\"}";  
               return data;  
            },  
};

//转移轨迹导出
function expTrailExcel() {
	var params = $(".searchFrom").serialize();
	var json=DataDeal.formToJson(params);//转化为json  
	var url=contextRootPath + "/lbtPerformanceTransfer/isExpTrailExcel?" + json;
	jyAjax(
			url,
			params,
			function(result){
				var v_status = result.status;
	        	if(v_status.indexOf('ok') >-1){
	        		window.location.href = contextRootPath + "/lbtPerformanceTransfer/expTrailExcel?" + params;
	        	}
		});
}
/*
 * 判断门店是否为空，如不为空，异步加载相应的团队
 */
 function queryTeam(){
	var parentId=$("#dtocomplOrg").val();
	 if(parentId!=''){
		 var url=contextRootPath+"/lbtPerformanceTransfer/getOrgByParentId?parentId="+parentId;
		 jyAjax(
					url,
					'',
					function(result){
					var v_status = result.status;
		        	 if(v_status.indexOf('ok') >-1){
		        		 //移除旧的列表
		        		 $("#storeId option").remove(); 
		        		 $("#storeId").append("<option value=''>--请选择--</option>");
		        		 //追加新的列表
		 				$("#storeId").append(result.data);
		        	}
			});
	 }else{
		 $("").newMsg({}).show("请选择新所属门店！");
	 }
}
 
 /**
 *查找门店经理信息 
  */
 function findStorManage(){
	 var manageStoreCode=$("#dtocomplOrg").val();
 	var url=contextRootPath+"/lbtPerformanceTransfer/findStorManage?manageStoreCode=" + manageStoreCode;
	jyAjax(
			url,
			'',
			function(result){
				debugger;
				var v_status = result.status;
				var resultData = result.data;
				if(resultData==""||resultData==null){
					$("").newMsg({}).show("所选门店没有查到门店经理的信息！");
					return;
				}
	        	if(v_status.indexOf('ok') >-1){
	        		var userId = result.data.USERID;
	        		var userName = result.data.USERNAME;
	        		
	        		$("#manageCustomerManagerCode").val(userId);
	        		$("#manageCustomerManagerName").val(userName);
	        	}
		});
 		
 	
 }