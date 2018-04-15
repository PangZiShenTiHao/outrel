//utf-8
//点击新增按钮 事件跳转至 新增页面
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/laTAssist/prepareExecute/toAdd',
		'width':800,
		'height':500,
		'title':'新增',
		'buttons':[
         {'text':'保存','action':doAddFrom,'isClose':true},
		 {'text':'关闭','isClose':true}
		]
	};
	
	var dialogAdd =jyDialog(dialogStruct).open();
}
//新增页面的保存操作
function doAddFrom(){
	//序列化 新增页面的form表单数据
	var params=$("#addNewsFormData").serialize();
	var url=contextRootPath+'/laTAssist/insertLaTAssist';
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
		jyDialog({"type":"warn"}).alert("请选择待协助申请的数据！");
		return;
	}

	var dialogStruct={
			'display':contextRootPath+'/laTAssist/prepareExecute?operateData=toUpdate&id='+v_ids,
			'width':800,
			'height':500,
			'title':'协助申请',
			'buttons':[
             {'text':'保存','action':doUpdateFrom,'isClose':false},
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogUpdate = jyDialog(dialogStruct);
	dialogUpdate.open();
}
//修改页面 的 保存操作
function doUpdateFrom(){
	if(!checkForm()){
        return ;
    }
	//序列化 新增页面的form表单数据
	var params=$(dialogUpdate.iframe.contentDocument.getElementById("updateNewsFormData")).serialize();
	var url=contextRootPath+'/laTAssist/updateLaTAssist';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//保存成功后，执行查询页面查询方法
        	var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		$("").newMsg({}).show(msg.msg);
        		dialogUpdate.close();
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		queryData();
        	}else{
        		jyDialog({"type":"warn"}).alert(msg.msg);
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
            url:contextRootPath+"/laTAssist/deleteLaTAssist?ids="+v_ids,
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
			'display':contextRootPath+'/laTAssist/prepareExecute/toView?id='+vId,
			'width':800,
			'height':500,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}

function checkForm(){
//    var startTime = $(dialogUpdate.iframe.contentDocument.getElementById("dtoassTime")).val();//开始时间
//    var endTime = $(dialogUpdate.iframe.contentDocument.getElementById("dtoendDate")).val();//结束时间
    var dunDeparmentName = $(dialogUpdate.iframe.contentDocument.getElementById("dunDeparmentName")).val();//协助门店
    var collectorName = $(dialogUpdate.iframe.contentDocument.getElementById("collectorName")).val();//催收员 
    var dtocollWay = $(dialogUpdate.iframe.contentDocument.getElementById("dtocollWay")).val();//催收方式 
    /*
        校验开始时间不能大于结束时间
    */
//    if(!timeSimpleCompare(startTime,endTime)){
//        return false;
//    }
    /*
        校验不能为空
    */
//    if(isNull(endTime)){
//        alert("结束时间不能为空！");
//        return false;
//    }
//    /*
//	    校验不能为空
//	*/
//	if(isNull(startTime)){
//	    alert("开始时间不能为空！");
//	    return false;
//	}
	/*
	    校验不能为空
	*/
	if(isNull(dunDeparmentName)){
	    jyDialog({"type":"warn"}).alert("协助门店不能为空！");
	    return false;
	}
	/*
	校验不能为空
	*/
	if(isNull(collectorName)){
		jyDialog({"type":"warn"}).alert("催收员不能为空！");
		return false;
	}
	/*
	校验不能为空
	*/
	if(isNull(dtocollWay)){
		jyDialog({"type":"warn"}).alert("请选择催收方式！");
		return false;
	}
    return true;
}
