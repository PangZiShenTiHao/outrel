//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAdd;
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/lbTReserveCustomer/prepareExecute/toAdd',
		'width':1200,
		'height':500,
		'title':'新增',
		'isIframe':"false",
		'buttons':[
         {'text':'保存','action':doAddFrom},
		 {'text':'关闭','isClose':true}
		]
	};
	
	dialogAdd =jyDialog(dialogStruct);
	dialogAdd.open();
}
//新增页面的保存操作
function doAddFrom(){	
	var formObj=document.getElementById('addNewsFormData');
	if(!(checkIsNull(formObj)&&checkFormFormat($(formObj)))){
		return ;
	}	
	if(!checkOther()){
		return;
	}
	
	//序列化 新增页面的form表单数据
	var params=$("#addNewsFormData").serialize();
	var url=contextRootPath+'/lbTReserveCustomer/insertLbTReserveCustomer';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			$("").newMsg({}).show(msg.msg);
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		dialogAdd.close();
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		queryData();
        	}
  	});
	
}
//修改 事件
var dialogUpdate;
function toUpdateData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
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
	
	//当客户预约处于提交状态时，不能进行修改
	var sObj = iframe.iframeObj["table"].getSelectedObjs();
	var appointmentStatus=sObj[0].appointmentStatus;
	if(appointmentStatus==2){
		jyDialog({"type":"warn"}).alert("该条数据暂且不能进行修改！")
		return;
	}
	if(appointmentStatus==4){
		jyDialog({"type":"warn"}).alert("该条数据已经失效，不可进行操作！")
		return;
	}
	
	var dialogStruct={
			'display':contextRootPath+'/lbTReserveCustomer/prepareExecute/toUpdate?id='+v_ids,
			'width':1200,
			'height':500,
			'title':'修改',
			'isIframe':"false",
			'buttons':[
             {'text':'保存','action':doUpdateFrom},
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogUpdate = jyDialog(dialogStruct);
	dialogUpdate.open();
}

function checkOther(){
	var minBorrowingAmount = $("input[name='minBorrowingAmount']").val();
	var maxBorrowingAmount = $("input[name='maxBorrowingAmount']").val();
	if(minBorrowingAmount!='' && maxBorrowingAmount !=''){
		if(Number(minBorrowingAmount)>Number(maxBorrowingAmount)){
			jyDialog({"type":"warn"}).alert("最低借款额度不能大于最高借款额度!");
			return false;
		}
	}
	return true;
}

//修改页面 的 保存操作
function doUpdateFrom(){
	if(!($("#olddtocardType").val()==$("#dtocardType").val()&&$("#olddtocardId").val()==$("#dtocardId").val())){
		checkID(function(){
			var formObj=document.getElementById('updateNewsFormData');
			if(!(checkIsNull(formObj)&&checkFormFormat($(formObj)))){
				return;
			}
			if(!checkOther()){
				return;
			}
			//序列化 新增页面的form表单数据
			var params=$("#updateNewsFormData").serialize();
			var url=contextRootPath+'/lbTReserveCustomer/updateLbTReserveCustomer';
			//通过ajax保存
			jyAjax(
				url,
				params,
				function(msg){
					//保存成功后，执行查询页面查询方法
					$("").newMsg({}).show(msg.msg);
		        	var v_status = msg.status;
		        	if(v_status.indexOf('ok') >-1){
		        		dialogUpdate.close()
		        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
		        		queryData();
		        	}
		  	});
		})
	}else{
		var formObj=document.getElementById('updateNewsFormData');
		if(!(checkIsNull(formObj)&&checkFormFormat($(formObj)))){
			return;
		}
		if(!checkOther()){
			return;
		}
		//序列化 新增页面的form表单数据
		var params=$("#updateNewsFormData").serialize();
		var url=contextRootPath+'/lbTReserveCustomer/updateLbTReserveCustomer';
		//通过ajax保存
		jyAjax(
			url,
			params,
			function(msg){
				//保存成功后，执行查询页面查询方法
				$("").newMsg({}).show(msg.msg);
	        	var v_status = msg.status;
	        	if(v_status.indexOf('ok') >-1){
	        		dialogUpdate.close()
	        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
	        		queryData();
	        	}
	  	});
	};
}
//删除 事件
function deleteData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){		
		jyDialog({"type":"warn"}).alert("请选择待删除的数据！");
		return;
	}
	//当客户预约处于提交状态时，不能进行删除
	var sObj = iframe.iframeObj["table"].getSelectedObjs();
	var appointmentStatus=sObj[0].appointmentStatus;
	if(appointmentStatus==2){
		jyDialog({"type":"warn"}).alert("该条数据暂且不能进行删除！")
		return;
	}
	
	jyDialog().confirm("您确认要删除选择的数据吗？", function(){
        $.ajax({
            type:"POST",
            dataType:"JSON",
            url:contextRootPath+"/lbTReserveCustomer/deleteLbTReserveCustomer?ids="+v_ids,
            success:function(msg){
            	$("").newMsg({}).show(msg.msg);
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		iframe.iframeObj["table"].removeSelectedRow();
            	}
            }
        });
    })
}

//延期预约 事件
var dialogUpdate;
function toPossiblePostponeApply(possiblePostponeState){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	var obj = iframe.iframeObj["table"].getSelectedObjs();
	//如果没有选中 数据则
	if(v_ids == ""){		
		jyDialog({"type":"warn"}).alert("请选择待延期的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"warn"}).alert("请选择一条数据！");
		return;
	}
	var aa = obj[0].possiblePostponeState;
	if(possiblePostponeState==1){
		if(!(obj[0].appointmentStatus==2 && obj[0].possiblePostponeState=="0")){
			jyDialog({"type":"warn"}).alert("只有已提交状态并且延期预约状态为未延期的数据才能延期预约申请！");
			return;
		}
	}else if(possiblePostponeState==2){
		if(obj[0].possiblePostponeState!="1"){
			jyDialog({"type":"warn"}).alert("只有延期申请状态为延期申请的数据才能审批！");
			return;
		}
	}
	
	var dialogStruct={
			'display':contextRootPath+'/lbTReserveCustomer/prepareExecute/toUpdate?id='+v_ids + "&isPossiblePostpone=true" + "&possiblePostponeState=" + possiblePostponeState ,
			'width':1200,
			'height':500,
			'title':'延期预约',
			'isIframe':"false",
			'buttons':[
             {'text':'保存','action':possiblePostpone,'isClose':true},
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogUpdate = jyDialog(dialogStruct);
	dialogUpdate.open();
}

//延期预约申请 保存事件
function possiblePostpone(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	var possiblePostponeState = $("#possiblePostponeState").val();
	var possiblePostponeDay = $("#possiblePostponeDay").val();
	var dtosalesman = $("#dtosalesman").val();
	var id = $("#dtoid").val();
	var cardType = $("#dtocardType").val();
	var cardId = $("#dtocardId").val();
	var salesman = $("#dtosalesman").val();
	
	if(possiblePostponeDay=="" || possiblePostponeDay == undefined){
		jyDialog({"type":"warn"}).alert("延期预约天数不能为空！");
		return;
	}
	
	if(dtosalesman=="" || dtosalesman == undefined){
		jyDialog({"type":"warn"}).alert("客户经理不能为空！");
		return;
	}
	
	if(possiblePostponeState==2){
		possiblePostponeState = $('#possiblePostponeApply option:selected').val();
		if(possiblePostponeState=="" || possiblePostponeState == undefined){
			jyDialog({"type":"warn"}).alert("延期预约审批结果不能为空！");
			return;
		}
	}
	
	jyDialog().confirm("您确认要延期预约选择的数据吗？", function(){
        $.ajax({
            type:"POST",
            dataType:"JSON",
            url:contextRootPath+"/lbTReserveCustomer/updatePossiblePostponeApply?ids="+v_ids + "&possiblePostponeState=" + possiblePostponeState + "&possiblePostponeDay=" + possiblePostponeDay + "&ids=" + id + "&cardType=" + cardType+ "&cardId=" + cardId + "&salesman=" + salesman,
            success:function(msg){
            	$("").newMsg({}).show(msg.msg);
            	var v_status = msg.status;
            	//延期预约成功后
            	if(v_status.indexOf('ok') >-1){
            		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
	        		queryData();
            	}
            }
        });
    })
}

//提交 取消 事件
function SubmitData(a){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	
	var str ="";
	if(a == 2){
		str = "提交";
	}
	if(a == 3){
		str = "取消";
	}
	//如果没有选中 数据则
	if(v_ids == ""){		
		jyDialog({"type":"warn"}).alert("请选择待"+str+"的数据！");
		return;
	}
	
	//当客户预约处于提交状态时，不能再次进行提交；处于取消状态时，不能进行再次取消
	var sObj = iframe.iframeObj["table"].getSelectedObjs();
	for(i=0;i<sObj.length;i++){
		var appointmentStatus=sObj[i].appointmentStatus;
		if(appointmentStatus==4){
			jyDialog({"type":"warn"}).alert("该条数据已经失效，不可进行操作！")
			return;
		}
		if(a==2&&appointmentStatus==2){
			jyDialog({"type":"warn"}).alert("处于提交状态的数据不能重复提交！")
			return;
		}
		if(a==3&&appointmentStatus==3){
			jyDialog({"type":"warn"}).alert("处于取消状态的数据不能重复取消！")
			return;
		}
	}

	jyDialog().confirm("您确认要"+str+"选择的数据吗？",function(){
        $.ajax({
            type:"POST",
            dataType:"JSON",
            url:contextRootPath+"/lbTReserveCustomer/submitLbTReserveCustomer?ids="+v_ids+"&state=" +a,
            success:function(msg){
            	$("").newMsg({}).show(msg.msg);
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		queryData();
            	}
            }
        });
    })
};



//查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/lbTReserveCustomer/prepareExecute/toView?id='+vId,
			'width':1000,
			'height':500,
			'title':'查看明细',
			'isIframe':"false",
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}

function checkID(fun){
	var idType=$("#dtocardType").val(); 
	var idVal=$("#dtocardId").val(); 
	if((idType==""||idType==null)||(idVal==""||idVal==null)){
		return;
	} 
	//序列化 和用户基本信息进行身份校验，如果存在自动带出 相关信息
	//通过ajax校验
	$.ajax({
		type:"POST",
		url:contextRootPath+'/lbTReserveCustomer/isExistReserveCustomer.do?',
		data:"cardType="+idType+"&cardId="+idVal,//提交的表单信息
		dataType : 'json',
		success: function(data){
				var v_status = data.status;
	        	if(v_status.indexOf('ok') >-1){
	        		//校验成功后给出提示
	        		if(data.msg!=""&&data.msg!=null&&data.msg!="null"){
	        			jyDialog({"type":"warn"}).alert(data.msg+"不能进行预约！")
	        		}else{
	        			fun();
	        		}
	        	}
			}
	});	
 }
