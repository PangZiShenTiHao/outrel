//utf-8
//点击新增按钮 事件跳转至 新增页面

var dialogAdd = {};
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/sysTemplate/prepareExecute/toAdd',
		'width':800,
		'height':500,
		'title':'新增',
		'isIframe':'false',
		'buttons':[
         {'text':'保存','action':doAddFrom,'isClose':false},
		 {'text':'关闭','isClose':true}
		]
	};
	dialogAdd =jyDialog(dialogStruct);
	dialogAdd.open();
}

//新增页面的保存操作
function doAddFrom(){
	
	//校验必填项
	if ( $("#addNewsFormData").find(".checkError").length>0 || !checkFormFormat("addNewsFormData") || !checkIsNull($("#addNewsFormData")[0])) {
		jyDialog({"type":"info"}).alert("请正确填写！");
		//alert("请正确填写！");
		return false;
	}
	
	//序列化 新增页面的form表单数据
	var params=$("#addNewsFormData").serialize();
	var url=contextRootPath+'/sysTemplate/insertSysTemplate';
    var options = {  
            url:url,//后台的处理，也就是form里的action  
            data:params,
            type:"POST",  
            dataType:"json", //数据格式，有XML，html，json，默认为文本  
            success:function(msg){  
            	$("").newMsg({}).show(msg.msg);;
            	if('failed'!=msg.status){
            		dialogAdd.close();
            		queryData();
            	}
            }  
         };  
      $("#addNewsFormData").ajaxSubmit(options);  
}

var dialogUpdate = {};
//修改 事件
function toUpdateData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待修改的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"info"}).alert("请选择一条数据！");
		return;
	}

	var dialogStruct={
			'display':contextRootPath+'/sysTemplate/prepareExecute/toUpdate?id='+v_ids,
			'width':800,
			'height':500,
			'title':'修改',
			'isIframe':'false',
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
	
	//校验必填项
	if ( $("#updateNewsFormData").find(".checkError").length>0 || !checkFormFormat("updateNewsFormData") || !checkIsNull($("#updateNewsFormData")[0])) {
		jyDialog({"type":"info"}).alert("请正确填写！");
		//alert("请正确填写！");
		return false;
	}
	
	//序列化 新增页面的form表单数据
	var params=$("#updateNewsFormData").serialize();
	
	//序列化 新增页面的form表单数据
	var params=$("#updateNewsFormData").serialize();
	var url=contextRootPath+'/sysTemplate/updateSysTemplate';
//	var url=contextRootPath+'/sysTemplate/insertSysTemplate';
    var options = {  
            url:url,//后台的处理，也就是form里的action  
            data:params,
            type:"POST",  
            dataType:"json", //数据格式，有XML，html，json，默认为文本  
            success:function(msg){  
            	$("").newMsg({}).show(msg.msg);;
            	dialogUpdate.close();
            	queryData();
            }  
         };  
    $("#updateNewsFormData").ajaxSubmit(options);  
}
//删除 事件
function deleteData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待删除的数据！");
		return;
	}
	jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
		$.ajax({
            type:"POST",
            url:contextRootPath+"/sysTemplate/deleteSysTemplate?ids="+v_ids,
            success:function(msg){
            	msg = eval("("+msg+")");
            	$("").newMsg({}).show(msg.msg);;
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		iframe.iframeObj["table"].removeSelectedRow();
            		iframe.iframeObj["table"].query();
            	}
            	
            	
            }
        });
	   },"确认提示");
	
	
	
	/*if(confirm("您确认要删除选择的数据吗？")){
        $.ajax({
            type:"POST",
            url:contextRootPath+"/sysTemplate/deleteSysTemplate?ids="+v_ids,
            success:function(msg){
            	msg = eval("("+msg+")");
            	$("").newMsg({}).show(msg.msg);;
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		iframe.iframeObj["table"].removeSelectedRow();
            		iframe.iframeObj["table"].query();
            	}
            	
            	
            }
        });
    }*/
}
//查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/sysTemplate/prepareExecute/toView?id='+vId,
			'width':600,
			'height':500,
			'title':'查看明细',
			'isIframe':'false',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}


//查看明细
function viewContent(vId){
	var dialogStruct={
			'display':contextRootPath+'/sysTemplate/prepareExecute/toViewContent?id='+vId,
			'width':800,
			'height':500,
			'title':'查看明细',
			'isIframe':'false',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}
