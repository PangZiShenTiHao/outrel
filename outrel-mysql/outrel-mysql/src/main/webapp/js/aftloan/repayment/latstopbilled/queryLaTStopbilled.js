//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogUpdate,threePage;
var doId;

var addDlg1;//添加第一个界面：查询贷前
var addDlg2;//添加第二个界面：添加详情

function toAddData(){
	var dialogStruct={
			'display':contextRootPath+'/aftloanqueryDate/prepareExecute/toQueryBefloanForLoanInfo?function=stopbilled',
			'width':1100,
			'height':750,
			'title':'查询贷款信息',
			'buttons':[
			  {'name':'nextBtn','text':'下一步','action':openNextPage},
			  {'text':'关闭','isClose':true}
			]
		};
	addDlg1=jyDialog(dialogStruct);
	addDlg1.open();
}
//下一步
function openNextPage(){
	var selectIds = addDlg1.getIframe().getSelectedIds().join(",");
	//如果没有选中 数据则
	if(selectIds == ""){
		jyDialog({"type":"warn"}).alert("请先选择一条数据！");
		return;
	}
	//如果选择多个 择提示
	if(selectIds.indexOf(",") > -1){
		jyDialog({"type":"warn"}).alert("只能选择一条数据！");
		return;
	}
	var claimKind = addDlg1.getIframe().getClaimKind();
	var selectObj = addDlg1.getIframe().getSelectedObjs();
	//关闭查询界面
	addDlg1.close();
	//打开新增界面
	var url=contextRootPath+'/laTStopbilled/prepareExecute/toAddNext?'+selectObj+'&claimKind='+claimKind;
	var dialogStruct={
			'display':url,
			'width':1100,
			'height':750,
			'title':'新增息费计停信息',
			'buttons':[
             {'text':'上一步','action':openPrevPage},
	         {'text':'保存','action':doAddFrom},
			 {'text':'关闭','isClose':true}
			]
		};
		
	 addDlg2 =jyDialog(dialogStruct);
	 addDlg2.open();
}
//上一步
function openPrevPage() {
	addDlg2.close();
	toAddData();
}



//新增页面的保存操作
function doAddFrom(){
	//序列化 新增页面的form表单数据
//	var params=$("#addNewsFormData").serialize();
	var params=$(addDlg2.iframe.contentDocument.getElementById("addNewsFormData")).serialize();
	var url=contextRootPath+'/laTStopbilled/insertLaTStopbilled';
	var stopType=$(addDlg2.iframe.contentDocument.getElementById("dtostopType")).val();
	var dtocontractId=$(addDlg2.iframe.contentDocument.getElementById("dtocontractId")).val();
	var dtopayoffFlag=$(addDlg2.iframe.contentDocument.getElementById("dtopayoffFlag")).val();
	var dtocompinteFlag=$(addDlg2.iframe.contentDocument.getElementById("dtocompinteFlag")).val();
	var dtoloanStatus=$(addDlg2.iframe.contentDocument.getElementById("dtoloanStatus")).val();
	if(dtopayoffFlag=="2"){
		jyDialog({"type":"warn"}).alert("已结清数据不能息费计停！");
		return;
	}
	if(dtocompinteFlag=="02"){
		jyDialog({"type":"warn"}).alert("已停息贷款不能息费计停！");
		return;
	}
	if(stopType=='' || dtocontractId==''||dtoloanStatus==""){
		jyDialog({"type":"warn"}).alert("请完善数据！");
		return;
	}else{
		//通过ajax保存
		jyAjax(
			url,
			params,
			function(msg){
				//新增成功后，
				$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
				var v_status = msg.status;
	        	if(v_status.indexOf('ok') >-1){
	        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
	        		addDlg2.close();
	        		queryData();
	        	}
	  	});
	}
	
}
//修改 事件
function toUpdateData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	var obj = iframe.iframeObj["table"].getSelectedObjs();
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"warn"}).alert("请选择待修改的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"warn"}).alert("请选择一条数据！");
		return;
	}
//	alert(obj[0]["listStat"]);
	if(obj[0]["listStat"] == "01"){
		var dialogStruct={
				'display':contextRootPath+'/laTStopbilled/prepareExecute/toUpdate?id='+v_ids,
				'width':1100,
				'height':750,
				'title':'修改息费计停信息',
				'buttons':[
	             {'text':'保存','action':doUpdateFrom,'isClose':true},
				 {'text':'关闭','isClose':true}
				]
			};
			
		dialogUpdate = jyDialog(dialogStruct);
		dialogUpdate.open();
	}else{
		jyDialog({"type":"warn"}).alert("此条数据不能修改！");
	}
	
}
//修改页面 的 保存操作
function doUpdateFrom(){
	//序列化 新增页面的form表单数据
	var params=$(dialogUpdate.iframe.contentDocument.getElementById("updateNewsFormData")).serialize();
	var url=contextRootPath+'/laTStopbilled/updateLaTStopbilled';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//保存成功后，执行查询页面查询方法
			$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
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
	var obj = iframe.iframeObj["table"].getSelectedObjs();
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"warn"}).alert("请选择待删除的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"warn"}).alert("请选择一条数据进行删除操作！");
		return;
	}
	if(obj[0]["listStat"] == "01"){
		
		jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
			var url= contextRootPath+"/laTStopbilled/deleteLaTStopbilled?ids="+v_ids;
			jyAjax(url,"",function(msg){
				$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
	        	var v_status = msg.status;
	        	//删除成功后
	        	if(v_status.indexOf('ok') >-1){
	        		iframe.iframeObj["table"].removeSelectedRow();
	        	}
	        });
		   },"确认提示");
		
		/*if(confirm("您确认要删除选择的数据吗？")){
			var url= contextRootPath+"/laTStopbilled/deleteLaTStopbilled?ids="+v_ids;
			jyAjax(url,"",function(msg){
				$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
	        	var v_status = msg.status;
	        	//删除成功后
	        	if(v_status.indexOf('ok') >-1){
	        		iframe.iframeObj["table"].removeSelectedRow();
	        	}
	        });
	    }*/
	}else{
		jyDialog({"type":"warn"}).alert("只能删除单据状态为初始录入的数据！");
	}
	
}
//查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/laTStopbilled/prepareExecute/toView?id='+vId,
			'width':1100,
			'height':750,
			'title':'查看息费计停信息',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}

//申请取消息费计停
function applyCancel(){
	var v_id = iframe.iframeObj["table"].getSelectedIds().join(",");
	var url = contextRootPath+"/aftloanjbpm/jbpmStopbilled/startCancelStopWorkflow?nextPartnerId="+$("#dtoparamUserId").val()+"&id="+v_id+"&loginUserId="+$("#loginUserId").val();
	$.ajax({
	     type:"POST",
	     url:url,
	     dataType:"JSON",
	     success:function(msg){
	    	  $("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
	          var v_status = msg.status;
	          if(v_status.indexOf('ok') >-1){
	            	queryData();
	          }
	     }
	});
}



//申请息费计停
function applyStop(){
	var v_id = iframe.iframeObj["table"].getSelectedIds().join(",");
	var url = contextRootPath+"/aftloanjbpm/jbpmStopbilled/startStopbilledWorkflow?nextPartnerId="+$("#dtoparamUserId").val()+"&id="+v_id+"&loginUserId="+$("#loginUserId").val();
	$.ajax({
	     type:"POST",
	     dataType:"JSON",
	     url:url,
	     success:function(msg){
	            $("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
	            var v_status = msg.status;
	            if(v_status.indexOf('ok') >-1){
	            	queryData();
	            }
	        }
	     });
}

//新增并提交
function doAll(){
	var params=$(addDlg2.iframe.contentDocument.getElementById("addNewsFormData")).serialize();
	var url=contextRootPath+'/laTStopbilled/insertLaTStopbilled';
	var stopType=$(addDlg2.iframe.contentDocument.getElementById("dtostopType")).val();
	var dtocontractId=$(addDlg2.iframe.contentDocument.getElementById("dtocontractId")).val();
	var dtopayoffFlag=$(addDlg2.iframe.contentDocument.getElementById("dtopayoffFlag")).val();
	var dtoloanStatus=$(addDlg2.iframe.contentDocument.getElementById("dtoloanStatus")).val();
	
	if(dtopayoffFlag=="2"){
		jyDialog({"type":"warn"}).alert("已结清数据不能息费计停！");
		return;
	}
	if(stopType=='' || dtocontractId=='' || dtoloanStatus==""){
		jyDialog({"type":"warn"}).alert("请完善数据！");
		return;
	}else{
		//通过ajax保存
		jyAjax(
			url,
			params,
			function(msg){
				//新增成功后，
				var v_status = msg.status;
	        	if(v_status.indexOf('ok') >-1){
	        		doId=msg.data.id;
	        		$("#isStop").val("do");
	        		selectNextPartner();
	        	}
	  	});
	}
}


//新增并提交时的申请息费计停
function applyStop1(){
	var url = contextRootPath+"/aftloanjbpm/jbpmStopbilled/startStopbilledWorkflow?nextPartnerId="+$("#dtoparamUserId").val()+"&id="+doId+"&loginUserId="+$("#loginUserId").val();
	$.ajax({
	     type:"POST",
	     dataType:"JSON",
	     url:url,
	     success:function(msg){
	            var v_status = msg.status;
	            if(v_status.indexOf('ok') >-1){
	            	$("").newMsg({"waitTime":3000,"title":"操作提示"}).show("保存并提交数据成功！");
	            	addDlg2.close();
	            }else{
	            	$("").newMsg({"waitTime":3000,"title":"操作提示"}).show("保存数据成功，但提交数据失败！");
	            	addDlg2.close();
	            }
	        }
	     });
}


//检验文本框的长度，maxLength最大长度，errorMsg错误提示
function t1(maxLength,errorMsg){
	var textareaValue=$(addDlg2.iframe.contentDocument.getElementById("dtostopReason")).val();
	if (null != textareaValue && textareaValue.length > 0 && undefined != textareaValue) {
        var length = textareaValue.replace(/[\u4E00-\u9FA5]/g, 'xx').length;
        if (length > maxLength) {
           alert(errorMsg);
          return ;
        }
    }
	alert("ok");//继续以后的操作
}
