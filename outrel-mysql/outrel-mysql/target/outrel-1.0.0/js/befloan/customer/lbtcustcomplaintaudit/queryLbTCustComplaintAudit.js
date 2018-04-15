//utf-8
//点击新增按钮 事件跳转至 新增页面
/*var dialogAddObj;*/
var dialogUpdateObj;
/*function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/lbTCustComplaintAudit/prepareExecute/toAdd',
		'width':800,
		'height':500,
		'title':'新增',
		'buttons':[
         {'text':'保存','action':doAddFrom,'isClose':true},
		 {'text':'关闭','isClose':true}
		]
	};
	
	dialogAddObj=jyDialog(dialogStruct);
	dialogAddObj.open();
}*/


var dialogAuditObj;
//新增页面的保存操作
function doAddFrom(){
	var formObj=document.getElementById('addNewsFormData');
	if(!(checkIsNull(formObj)&&checkFormFormat($(formObj)))){
		return ;
	}
	
	var obj = dialogAuditObj.getIframe();
	//序列化 新增页面的form表单数据
	var params=obj.$("#addNewsFormData").serialize();
	var url=contextRootPath+'/lbTCustComplaintAudit/insertLbTCustComplaintAudit';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			$("").newMsg({}).show(msg.msg);
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		queryData();
        	}
  	});
}
//修改 事件
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
	
	var sObj = iframe.iframeObj["table"].getSelectedObjs();
	var status=sObj[0].custComplaintDTO.complaintStatus;
	if(!(status=='10'||status=='01')){  //‘10’待审核状态     ‘01’客户投诉提交状态
		jyDialog({"type":"warn"}).alert("该条数据不能进行修改！");
		return;
	}
	
	var complaintId=sObj[0].custComplaintDTO.id;
	var dialogStruct={
			'display':contextRootPath+'/lbTCustComplaintAudit/prepareExecute/toUpdate?id='+v_ids+'&complaintId='+complaintId,
			'width':800,
			'height':500,
			'title':'修改',
			'buttons':[
             {'text':'保存','action':doUpdateFrom,'isClose':true},
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogUpdateObj = jyDialog(dialogStruct);
	dialogUpdateObj.open();
}
//修改页面 的 保存操作
function doUpdateFrom(){
	var formObj=document.getElementById('updateNewsFormData');
	if(!(checkIsNull(formObj)&&checkFormFormat($(formObj)))){
		return ;
	}
	var obj = dialogUpdateObj.getIframe();
	//序列化 新增页面的form表单数据
	var params=obj.$("#updateNewsFormData").serialize();
	var url=contextRootPath+'/lbTCustComplaintAudit/updateLbTCustComplaintAudit';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//保存成功后，执行查询页面查询方法
			$("").newMsg({}).show(msg.msg);
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
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"warn"}).alert("请选择待删除的数据！");
		return;
	}
	if(confirm("您确认要删除选择的数据吗？")){
        $.ajax({
            type:"POST",
            dataType:"JSON",
            url:contextRootPath+"/lbTCustComplaintAudit/deleteLbTCustComplaintAudit?ids="+v_ids,
            success:function(msg){
            	$("").newMsg({}).show(msg.msg);
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		iframe.iframeObj["table"].removeSelectedRow();
            	}
            	
            	
            }
        });
    }
}
//查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/lbTCustComplaint/prepareExecute/toViewPro?id='+vId,
			'width':800,
			'height':500,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}

//查看客户投诉明细
function viewCustComplainData(vId){
	var dialogStruct={
			'display':contextRootPath+'/lbTCustComplaint/prepareExecute/toViewPro?id='+vId,
			'width':800,
			'height':500,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
	var dialogView = jyDialog(dialogStruct).open();
}

//查看客户信息详情
function viewCustData(vId){
	var dialogStruct={
			'display':contextRootPath+'/lbTCustomterInfo/prepareExecute/toView?id='+vId,
			'width':1000,
			'height':580,
			'title':'查看明细',
			'isIframe':'false',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}

//审核
function audit(){
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
	var sObj = iframe.iframeObj["table"].getSelectedObjs();
	var complaintStatus=sObj[0].custComplaintDTO.complaintStatus;
	if(complaintStatus!='01'&&complaintStatus=='10'){
		jyDialog({"type":"warn"}).alert("该条数据处于待审核状态,请进行修改！");
		return;
	}
	if(complaintStatus!='01'){
		jyDialog({"type":"warn"}).alert("该条数据不能进行审核！");
		return;
	}
	var complaintId=sObj[0].custComplaintDTO.id;
	var dialogStruct={
			'display':contextRootPath+'/lbTCustComplaintAudit/prepareExecute/toAudit?id='+v_ids+"&complaintId="+complaintId,
			'width':700,
			'height':500,
			'title':'审核',
			'buttons':[
             {'text':'提交','action':doAddFrom,'isClose':true},
			 {'text':'关闭','isClose':true}
			]
	};
		
	dialogAuditObj = jyDialog(dialogStruct);
	dialogAuditObj.open();
}
