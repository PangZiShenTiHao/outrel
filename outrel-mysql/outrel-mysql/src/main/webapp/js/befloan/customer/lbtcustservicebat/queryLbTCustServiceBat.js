//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdateObj;
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/lbTCustServiceBat/prepareExecute/toAdd',
		'width':800,
		'height':500,
		'title':'新增',
		'buttons':[
         {'text':'保存','action':doAddFrom,'isClose':false},
		 {'text':'关闭','isClose':true}
		]
	};
	
	dialogAddObj=jyDialog(dialogStruct);
	dialogAddObj.open();
}

function setCallFunToUser(v_ids,v_names){
	//通过 弹出层的dialog 获取 iframe 对象后再调用其对应的方法
	dialogAddObj.getIframe().setCallFunToUser(v_ids,v_names);
}
//新增页面的保存操作
function doAddFrom(){
	
	var obj = dialogAddObj.getIframe();
	
	var userName = obj.$("#userName").val();
	var dtoreason = obj.$("#dtoreason").val();
    var dtoremark = obj.$("#dtoremark").val();
    var fileNm = obj.$("#fileNm").val();
    if(fileNm=="no"){
		jyDialog({"type":"warn"}).alert("请上传文件！");
		return false;
	}
	if(userName==""){
		jyDialog({"type":"warn"}).alert("请选择经理！");
		return false;
	}
	if(dtoreason==""){
		jyDialog({"type":"warn"}).alert("请选择转移原因！");
		return false;
	}
	if(dtoreason == '6' && (dtoremark == ''|| dtoremark==null || dtoremark == 'undefined')){
		jyDialog({"type":"warn"}).alert("转移原因为其他时，需填写其他原因！");
		return false;
	}else if(dtoreason != '6' && dtoremark != ""){
		jyDialog({"type":"warn"}).alert("转移原因不为其他时，无需填写其他原因！");
		return false;
	}
	
	//序列化 新增页面的form表单数据
	if(!checkIsNull(obj.$("#addLeave"))) return;
	var params=obj.$("#addLeave").serialize();
	var url=contextRootPath+'/lbTCustServiceBat/insertLbTCustServiceBat';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		jyDialog({"type":"info"}).alert(msg.msg);
        		dialogAddObj.close();
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		queryData();
        	}else{
        		jyDialog().alert(msg.msg,"","",100,100);
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
	var obj = iframe.iframeObj["table"].getSelectedObjs("");
	if(obj!=''){
		//02:分部总，03:区域总，04:普惠总部
		if(obj[0].applyState=="02" || obj[0].applyState=="03" || obj[0].applyState=="04"|| obj[0].applyState=="05"|| obj[0].applyState=="06"){
			$("").newMsg({}).show("流程已提交，不允许删除！");
			return;
		}
	}
	
	var batchNo = obj[0].batchNo;
	jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
		$.ajax({
            type:"POST",
            dataType:"json",
            url:contextRootPath+"/lbTCustServiceBat/deleteLbTCustServiceBat?ids="+v_ids+"&batchNo="+batchNo,
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
 * 提交审批  事件
 */  
function submitAppData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	var url =contextRootPath+"/jbpmServiceManagerBatchTransfer/serviceManagerBatchTransferWorkflow?nextPartnerId="+$("#dtoparamUserId").val()+"&ids="+v_ids;
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