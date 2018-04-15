//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAdd;
var dialogUpdate;
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/laTPromrepayment/prepareExecute/toAdd',
		'width':1100,
		'height':750,
		'title':'新增',
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
	//序列化 新增页面的form表单数据
	var params=$(dialogAdd.iframe.contentDocument.getElementById("addNewsFormData")).serialize();
	var dtoproAmount = $(dialogAdd.iframe.contentDocument.getElementById("dtoproAmount")).val();
	var dtobal = $(dialogAdd.iframe.contentDocument.getElementById("dtobal")).val();
	if(dtoproAmount ==""){
		dtoproAmount = 0;
	}
	if(dtobal ==""){
		dtobal = 0;
	}
	if(dtoproAmount>dtobal){
		alert("还款金额必须小于等于贷款余额！");
		return;
	}
	
	var dtoproDate = $(dialogAdd.iframe.contentDocument.getElementById("dtoproDate")).val();
	var dtoregDate = $(dialogAdd.iframe.contentDocument.getElementById("dtoregDate")).val();
	if(!isStartEndDate(dtoregDate,dtoproDate)){
		alert('还款日期不能小于当前日期！');
		return;
	}
	
	var url=contextRootPath+'/laTPromrepayment/insertLaTPromrepayment';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			alert(msg.msg);
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
		alert("请选择待修改的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		alert("请选择一条数据！");
		return;
	}

	var dialogStruct={
			'display':contextRootPath+'/laTPromrepayment/prepareExecute/toUpdate?id='+v_ids,
			'width':1100,
			'height':750,
			'title':'修改',
			'buttons':[
             {'text':'保存','action':doUpdateFrom,'isClose':true},
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogUpdate = jyDialog(dialogStruct);
	dialogUpdate.open();
}
//修改页面 的 保存操作
function doUpdateFrom(){
	//序列化 新增页面的form表单数据
	var params=$(dialogUpdate.iframe.contentDocument.getElementById("updateNewsFormData")).serialize();
	var url=contextRootPath+'/laTPromrepayment/updateLaTPromrepayment';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//保存成功后，执行查询页面查询方法
			alert(msg.msg);
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
		alert("请选择待删除的数据！");
		return;
	}
	if(confirm("您确认要删除选择的数据吗？")){
        $.ajax({
            type:"POST",
            url:contextRootPath+"/laTPromrepayment/deleteLaTPromrepayment?ids="+v_ids,
            success:function(msg){
            	alert(msg.msg);
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
			'display':contextRootPath+'/laTPromrepayment/prepareExecute/toView?id='+vId,
			'width':900,
			'height':600,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}

function isStartEndDate(startTime,endTime){
	startTime = startTime.replace(/-/g, "/");
    endTime = endTime.replace(/-/g, "/");
    startTime = new Date(startTime);
    endTime = new Date(endTime);

    var days= endTime.getTime() - startTime.getTime(); 
    
    if(days<0)
    {
        return false;
    }
    else 
        return true;
}