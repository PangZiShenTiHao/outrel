//utf-8

//查看明细
function viewData(vId){
	
	var queryStartDate = document.getElementsByName("queryStartDate")[0].value;
	var queryEndDate = document.getElementsByName("queryEndDate")[0].value;
	var dialogStruct={
			'display':contextRootPath+'/laTPromrepayment/prepareExecute/toStatisticsDetailsView?orgId='+vId+'&queryStartDate='+queryStartDate+'&queryEndDate='+queryEndDate,
			'width':1300,
			'height':600,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}
//打开关闭划扣权限
function addOrDelDeducted(userId,id,type){
	var msg = "";
	var url = "";
	if(type ==0){
		msg = "您确定要关闭此用户的划扣权限吗？";
		url = "/laTDrawlimoptorSw/insertLaTDrawlimoptorSw?userId="+userId;
	}else{
		msg = "您确定要打开此用户的划扣权限吗？";
		url = "/laTDrawlimoptorSw/deleteLaTDrawlimoptorSwByUserId?ids="+id;
	}
	userId = "'"+userId+"'";
	jyDialog({"type":"question"}).confirm(msg, function(){
		$.ajax({
            type:"POST",
            url:contextRootPath+url,
            success:function(data){
            	var  msg = jQuery.parseJSON(data);
            	var v_status = msg.status;
	        	if(v_status.indexOf('ok') >-1){
	        		jyDialog({"type":"success"}).alert(msg.msg);
	        		queryData();
	        	}else{
	        		jyDialog({"type":"error"}).alert(msg.msg);
	        	}
           }
        });
	}, "确认提示");
}



//查看明细
function toPersonView(){
	
	var queryStartDate = document.getElementsByName("queryStartDate")[0].value;
	var queryEndDate = document.getElementsByName("queryEndDate")[0].value;
	var dialogStruct={
			'display':contextRootPath+'/laTPromrepayment/prepareExecute/toStatisticsStoresPersonView?queryStartDate='+queryStartDate+'&queryEndDate='+queryEndDate,
			'width':1300,
			'height':600,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}