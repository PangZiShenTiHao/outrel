//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogUpdate;
var doId;

var addDlg1;//添加第一个界面：查询贷前
var addDlg2;//添加第二个界面：添加详情

function toAddData(){
	var dialogStruct={
			'display':contextRootPath+'/aftloanqueryDate/prepareExecute/toQueryBefloanForLoanInfo?function=takebreak',
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
    var contractSrc=addDlg1.getIframe().getSelectedContractSrc();
	//判断合同来源是否有特殊不可新增操作的
	var  url = contextRootPath+"/LaTContractConfigure/queryByserial?typeSerial=09&conSerial="+contractSrc;
	var falg = false;
	$.ajax({
		type:"POST",
		url:url,
		async:false,
		success:function(msg){
			if(msg.indexOf('ok') >-1){
				falg=false;
			}else{
				falg=true;
			}
		}
	});
	
	if(falg){
		 jyDialog({"type":"warn"}).alert("该放款机构不可紧急划扣！");
		 return ; 
	}
	//关闭查询界面
	addDlg1.close();
	//打开新增界面
	var url=contextRootPath+'/laTTakebreak/prepareExecute/toAddNext?'+selectObj+'&claimKind='+claimKind;
	var dialogStruct={
			'display':url,
			'width':1100,
			'height':750,
			'title':'新增紧急扣款信息',
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


// 新增并保存操作
function doAll(){
	var params=$(addDlg2.iframe.contentDocument.getElementById("addNewsFormData")).serialize();
	var beginDate1=$(addDlg2.iframe.contentDocument.getElementById("dtobeginDate")).val();
	var emrDebType=$(addDlg2.iframe.contentDocument.getElementById("dtoemrDebType")).val();
	var beginDate=new Date(beginDate1).format("yyyy-MM-dd");
	var now = $(addDlg2.iframe.contentDocument.getElementById("dtoregDate")).val();//数据库日期
	var nowDate =new Date(now).format("yyyy-MM-dd");
	var dtopayoffFlag=$(addDlg2.iframe.contentDocument.getElementById("dtopayoffFlag")).val();
	var dtocontractId=$(addDlg2.iframe.contentDocument.getElementById("dtocontractId")).val();
	var dtoloanStatus=$(addDlg2.iframe.contentDocument.getElementById("dtoloanStatus")).val();
	
	if(dtopayoffFlag=="02"){
		jyDialog({"type":"warn"}).alert("已结清数据不能 紧急扣款！");
		return;
	}
	if(emrDebType ==null || emrDebType==""){
		jyDialog({"type":"warn"}).alert("请添加紧急扣款类型！");
		return;
	}
	
	if(dtocontractId==""||dtoloanStatus==""){
		jyDialog({"type":"warn"}).alert("请完善数据！");
		return;
	}
	//拿数据库日期跟贷款发放日期做对比  当天放款
	if(emrDebType=="01" ){  //放款撤销
		if(nowDate==beginDate){
			var url=contextRootPath+'/laTTakebreak/insertLaTTakebreak';
			//通过ajax保存
			jyAjax(
				url,
				params,
				function(msg){
					//新增成功后，
					var v_status = msg.status;
		        	if(v_status.indexOf('ok') >-1){
		        		doId=msg.data.id;
		        		$.ajax({
		                    type:"POST",
		                    url:contextRootPath+"/laTTakebreak/takebreakToday?ids="+doId,  
		                    dataType:"JSON",
		                    success:function(msg1){
		                    	var v_status1 = msg1.status;
		                    	if(v_status1.indexOf('ok') >-1){
		                    		addDlg2.close();
		                    		queryData();
		                    	}else{
		                    		$("").newMsg({"waitTime":3000,"title":"操作提示"}).show("新增数据成功，但提交数据失败！");
		                    		addDlg2.close();
		                    		queryData();
		                    	}
		                    	
		                    }
		                });
		        	}
		  	});
		}else{
			jyDialog({"type":"warn"}).alert("贷款发放日期不是当天，不允许放款撤销！");
		}
		
	}else if(emrDebType=="02"){  
		if(dtoloanStatus=='1'){
			var url=contextRootPath+'/laTTakebreak/insertLaTTakebreak';
			//通过ajax保存
			jyAjax(
				url,
				params,
				function(msg){
					//新增成功后，
					var v_status = msg.status;
					$("#isStop").val("ok");
		        	if(v_status.indexOf('ok') >-1){
		        		doId=msg.data.id;
		        		selectNextPartner();
		        	}else{
		        		$("").newMsg({"waitTime":3000,"title":"操作提示"}).show("新增数据成功，但提交审批失败！");
		        		addDlg2.close();
	            		queryData();
		        	}
		  	});
		}else{
			jyDialog({"type":"warn"}).alert("只允许逾期合同进行强制结清！");
		}
		
	}else{
		jyDialog({"type":"warn"}).alert("紧急扣款类型错误！");
	}
}



//紧急扣款新增保存
function doAddFrom(){
	//序列化 新增页面的form表单数据
	//var params=$("#addNewsFormData").serialize();
	var dtocontractSource=$(addDlg2.iframe.contentDocument.getElementById("dtocontractSource")).val();
	if(dtocontractSource == "01"){
		 jyDialog({"type":"warn"}).alert("该放款机构理财人-华瑞放款不可做紧急扣款");
		 return ;
	}
	var params=$(addDlg2.iframe.contentDocument.getElementById("addNewsFormData")).serialize();
	var beginDate1=$(addDlg2.iframe.contentDocument.getElementById("dtobeginDate")).val();
	var emrDebType=$(addDlg2.iframe.contentDocument.getElementById("dtoemrDebType")).val();
	var emrDebRea=$(addDlg2.iframe.contentDocument.getElementById("dtoemrDebRea")).val();
	var beginDate=new Date(beginDate1).format("yyyy-MM-dd");
	var now = $(addDlg2.iframe.contentDocument.getElementById("dtoregDate")).val();//数据库日期
	var nowDate =new Date(now).format("yyyy-MM-dd");
	var dtopayoffFlag=$(addDlg2.iframe.contentDocument.getElementById("dtopayoffFlag")).val();
	var dtocontractId=$(addDlg2.iframe.contentDocument.getElementById("dtocontractId")).val();
	var dtoloanStatus=$(addDlg2.iframe.contentDocument.getElementById("dtoloanStatus")).val();
	if(dtopayoffFlag=="02"){
		jyDialog({"type":"warn"}).alert("已结清数据不能紧急扣款！");
		return;
	}
	if(emrDebType ==null || emrDebType==""){
		jyDialog({"type":"warn"}).alert("请添加紧急扣款类型！");
		return;
	}
	if(emrDebRea ==null || emrDebRea==""){
		jyDialog({"type":"warn"}).alert("请填写紧急扣款原因！");
		return;
	}
	
	if(dtocontractId==""||dtoloanStatus==""){
		jyDialog({"type":"warn"}).alert("请完善数据！");
		return;
	}
	if(emrDebType=="01" ){//放款撤销 
		
		if(nowDate==beginDate){//放款日期=当天
			var url=contextRootPath+'/laTTakebreak/insertLaTTakebreak';
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
		}else{
			jyDialog({"type":"warn"}).alert("贷款发放日期不是当天，不允许放款撤销！");
		}
	
	}else if(emrDebType=="02" ){//逾期强制结清
		if(nowDate!=beginDate){
			if(dtoloanStatus=='1'){
				var url=contextRootPath+'/laTTakebreak/insertLaTTakebreak';
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
			}else{
				jyDialog({"type":"warn"}).alert("只允许逾期合同进行强制结清！");
			}
			
		}else{
			jyDialog({"type":"warn"}).alert("当天发放的贷款，不允许强制结清！");
		}
	
	}else{
		jyDialog({"type":"warn"}).alert("紧急扣款类型错误！");
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
	if(obj[0]["listStat"] != "01"){
		jyDialog({"type":"warn"}).alert("只能修改单据状态为初始录入的数据！");
		return;
	}
	var dialogStruct={
			'display':contextRootPath+'/laTTakebreak/prepareExecute/toUpdate?id='+v_ids,
			'width':1100,
			'height':750,
			'title':'修改紧急扣款信息',
			'buttons':[
             {'text':'保存','action':doUpdateFrom},
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogUpdate = jyDialog(dialogStruct);
	dialogUpdate.open();
}
//修改页面 的 保存操作
function doUpdateFrom(){
	//序列化 新增页面的form表单数据
	//var params=$("#updateNewsFormData").serialize();
//	var params=$(dialogUpdate.iframe.contentDocument.getElementById("updateNewsFormData")).serialize();
	var url=contextRootPath+'/laTTakebreak/updateLaTTakebreak';
	
	var params=$(dialogUpdate.iframe.contentDocument.getElementById("updateNewsFormData")).serialize();
	var beginDate1=$(dialogUpdate.iframe.contentDocument.getElementById("dtobeginDate")).val();
	var emrDebType=$(dialogUpdate.iframe.contentDocument.getElementById("dtoemrDebType")).val();
	var emrDebRea=$(dialogUpdate.iframe.contentDocument.getElementById("dtoemrDebRea")).val();
	
	var beginDate=new Date(beginDate1).format("yyyy-MM-dd");
	var now = $(dialogUpdate.iframe.contentDocument.getElementById("dtoregDate")).val();//数据库日期
	var nowDate =new Date(now).format("yyyy-MM-dd");
	var dtoloanStatus=$(dialogUpdate.iframe.contentDocument.getElementById("dtoloanStatus")).val();
	
	if(emrDebRea ==null || emrDebRea==""){
		jyDialog({"type":"warn"}).alert("请填写紧急扣款原因！");
		return;
	}
	
	if(emrDebType=="01"){
		if(nowDate==beginDate){//放款日期=当天
			//通过ajax保存
			jyAjax(
					url,
					params,
					function(msg){
						//保存成功后，执行查询页面查询方法
						$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
			        	var v_status = msg.status;
			        	if(v_status.indexOf('ok') >-1){
			        		//修改成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
			        		dialogUpdate.close();
			        		queryData();
			        	}
			  	});
		}else{
			jyDialog({"type":"warn"}).alert("贷款发放日期不是当天，不允许放款撤销！");
		}
	}else if(emrDebType=="02"){
		if(dtoloanStatus=='1'){
			jyAjax(
					url,
					params,
					function(msg){
						//保存成功后，执行查询页面查询方法
						$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
			        	var v_status = msg.status;
			        	if(v_status.indexOf('ok') >-1){
			        		//修改成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
			        		dialogUpdate.close();
			        		queryData();
			        	}
			  	});
		}else{
			jyDialog({"type":"warn"}).alert("只允许逾期合同进行强制结清！");
		}
		
	}else{
		jyDialog({"type":"warn"}).alert("紧急扣款类型错误！");
	}
}
//删除 事件
function deleteData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	var objs = iframe.iframeObj["table"].getSelectedObjs();
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"warn"}).alert("请选择待删除的数据！");
		return;
	}
	
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"warn"}).alert("请选择一条数据！");
		return;
	}
	
	for(var i=0;i<objs.length;i++){
		if(objs[i]["listStat"]!="01"){
			jyDialog({"type":"warn"}).alert("只能删除单据状态为初始录入的数据！");
			return;
		}
	}
	jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
		$.ajax({
            type:"POST",
            url:contextRootPath+"/laTTakebreak/deleteLaTTakebreak?ids="+v_ids,
            dataType:"JSON",
            success:function(msg){
            	$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		iframe.iframeObj["table"].removeSelectedRow();
            	}
            }
        });
	   },"确认提示");
	
	/*if(confirm("您确认要删除选择的数据吗？")){
        $.ajax({
            type:"POST",
            url:contextRootPath+"/laTTakebreak/deleteLaTTakebreak?ids="+v_ids,
            dataType:"JSON",
            success:function(msg){
            	alert(msg.msg);
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		iframe.iframeObj["table"].removeSelectedRow();
            	}
            }
        });
    }*/
}
//查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/laTTakebreak/prepareExecute/toView?id='+vId,
			'width':1100,
			'height':750,
			'title':'查看紧急扣款信息',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}
//提交数据，判断是当天紧急扣款还是逾期
function goTakebreakJBPM(str){
	var v_id = iframe.iframeObj["table"].getSelectedIds().join(",");
        if(str=="01"){ 
        	$.ajax({
                type:"POST",
                url:contextRootPath+"/laTTakebreak/takebreakToday?ids="+v_id, 
                dataType:"JSON",
                success:function(msg){
                	$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
                	queryData();
                }
            });
        }else if(str=="02"){
        	$.ajax({
                type:"POST",
                dataType:"JSON",
                url:contextRootPath+"/aftloanjbpm/jbpmTakebreak/startTakebreakWorkflow?nextPartnerId="+$("#dtoparamUserId").val()+"&id="+v_id+"&loginUserId="+$("#loginUserId").val(),  
                dataType:"JSON",
                success:function(msg){
                	$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
                	queryData();
                }
            });
        }else if(str=="03"){
        	$.ajax({
                type:"POST",
                dataType:"JSON",
                url:contextRootPath+"/aftloanjbpm/jbpmTakebreak/startTakebreakWorkflow?nextPartnerId="+$("#dtoparamUserId").val()+"&id="+doId+"&loginUserId="+$("#loginUserId").val(), 
                dataType:"JSON",
                success:function(msg){
                	$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
                	dialogUpdate.close();
                	queryData();
                }
            });
        }
}


//提交取消强制结清
//function goTakebreakJBPM(str){
//	var v_id = iframe.iframeObj["table"].getSelectedIds().join(",");
//	var url = contextRootPath+"/aftloanjbpm/jbpmTakebreak/startCancelTakebreakWorkflow?nextPartnerId="+$("#dtoparamUserId").val()+"&id="+v_id+"&loginUserId="+$("#loginUserId").val();
//	$.ajax({
//	     type:"POST",
//	     dataType:"JSON",
//	     url:url,
//	     success:function(msg){
//	            alert(msg.msg);
//	            var v_status = msg.status;
//	            if(v_status.indexOf('ok') >-1){
//	            	queryData();
//	            }
//	        }
//	     });
//}

//提交取消强制结清
function cancelData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
//	var objs = iframe.iframeObj["table"].getSelectedObjs();
//	//如果没有选中 数据则
//	if(v_ids == ""){
//		jyDialog({"type":"warn"}).alert("请选择一条数据！");
//		return;
//	}
//	
//	//如果选择多个 择提示
//	if(v_ids.indexOf(",") > -1){
//		jyDialog({"type":"warn"}).alert("请选择一条数据！");
//		return;
//	}
//	if(objs[0]["listStat"] == "01" || objs[0]["listStat"] == "05" || objs[0]["listStat"] == "07" || objs[0]["listStat"] == "19" || objs[0]["emrDebType"] == "01"){
//		jyDialog({"type":"warn"}).alert("该数据不能取消强制结清！");
//		return;
//	}
//	jyDialog({"type":"question"}).confirm("您确认要提交取消强制结清选择的数据吗？",function(){
		var url = contextRootPath+"/aftloanjbpm/jbpmTakebreak/startCancelTakebreakWorkflow?nextPartnerId="+$("#dtoparamUserId").val()+"&id="+v_ids+"&loginUserId="+$("#loginUserId").val();
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
//	   },"确认提示");
	
/*	jyDialog({"type":"question"}).confirm("您确认要提交取消强制结清选择的数据吗？",function(){
		$.ajax({
            type:"POST",
            url:contextRootPath+"/laTTakebreak/cancelData?ids="+v_ids,
            dataType:"JSON",
            success:function(msg){
            	$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
            	var v_status = msg.status;
            	//成功后
            	if(v_status.indexOf('ok') >-1){
            		queryData();
            	}
            }
        });
	   },"确认提示");*/
	
	/*if(confirm("您确认要提交取消强制结清选择的数据吗？")){
        $.ajax({
            type:"POST",
            url:contextRootPath+"/laTTakebreak/cancelData?ids="+v_ids,
            dataType:"JSON",
            success:function(msg){
            	$("").newMsg({"waitTime":3000,"title":"操作提示"}).show(msg.msg);
            	var v_status = msg.status;
            	//成功后
            	if(v_status.indexOf('ok') >-1){
            		queryData();
            	}
            }
        });
    }*/
}

