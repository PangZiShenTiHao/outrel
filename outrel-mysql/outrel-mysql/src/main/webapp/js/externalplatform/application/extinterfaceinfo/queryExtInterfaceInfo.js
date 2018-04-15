//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdateObj;
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/extInterfaceInfo/prepareExecute/toAdd',
		'width':900,
		'height':500,
		'title':'新增',
		'isIframe':"false",
		'buttons':[
         {'text':'保存','action':doAddFrom},
		 {'text':'关闭','isClose':true}
		]
	};
	
	dialogAddObj=jyDialog(dialogStruct);
	dialogAddObj.open();
}
//新增页面的保存操作
function doAddFrom(){
	//校验必填项
	var formObj="addNewsFormData";
	if($("#"+formObj).find(".checkError").length>0||!(checkIsNull(formObj)&&checkFormFormat($(formObj),true))){
		jyDialog({"type":"info"}).alert("请正确填写！");
		return;
	}
	var params=$("#addNewsFormData").serialize();
	var url=contextRootPath+'/extInterfaceInfo/insertExtInterfaceInfo';
	var options = {  
	            url:url,//后台的处理，也就是form里的action  
	            data:params,
	            type:"POST",  
	            dataType:"json", //数据格式，有XML，html，json，默认为文本  
	            success:function(msg){  
	            	//新增成功后，
	    			$("").newMsg({}).show(msg.msg);
	    			var v_status = msg.status;
	            	if(v_status.indexOf('ok') >-1){
	            		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
	            		dialogAddObj.close();
	            		queryData();
	            	}
	            }  
	         };  
	      $("#addNewsFormData").ajaxSubmit(options);  
}
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
			'display':contextRootPath+'/extInterfaceInfo/prepareExecute/toUpdate?id='+v_ids,
			'width':900,
			'height':500,
			'title':'修改',
			'isIframe':"false",
			'buttons':[
             {'text':'保存','action':doUpdateFrom},
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogUpdateObj = jyDialog(dialogStruct);
	dialogUpdateObj.open();
}
//修改页面 的 保存操作
function doUpdateFrom(){
	//校验必填项
	var formObj="updateNewsFormData";
	if($("#"+formObj).find(".checkError").length>0||!(checkIsNull(formObj)&&checkFormFormat($(formObj),true))){
		jyDialog({"type":"info"}).alert("请正确填写！");
		return;
	}
	//序列化 新增页面的form表单数据
	var params=$("#updateNewsFormData").serialize();
	var url=contextRootPath+'/extInterfaceInfo/updateExtInterfaceInfo';
	var options = {  
            url:url,//后台的处理，也就是form里的action  
            data:params,
            type:"POST",  
            dataType:"json", //数据格式，有XML，html，json，默认为文本  
            success:function(msg){  
            	//新增成功后，
    			$("").newMsg({}).show(msg.msg);
    			var v_status = msg.status;
            	if(v_status.indexOf('ok') >-1){
            		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
            		dialogUpdateObj.close();
            		queryData();
            	}
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
	//对应功能点下是否有接口，有则不能删除
	var interfaceNo = iframe.iframeObj["table"].getSelectedObjs("interfaceNo");
	jyAjax( 
		contextRootPath+"/extFunctionInterfaceRef/checkUnique",
		"&interfaceNo="+interfaceNo,
		function(data){
 			var v_status = data.status;
        	if(v_status.indexOf('no') >-1){
        		jyDialog({"type":"info"}).alert(data.msg);
        	}else{
				jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
					$.ajax({
			            type:"POST",
			            dataType:"json",
			            url:contextRootPath+"/extInterfaceInfo/deleteExtInterfaceInfo?ids="+v_ids+"&interfaceNo="+interfaceNo,
			            success:function(msg){
			            	$("").newMsg({}).show(msg.msg);
			            	var v_status = msg.status;
			            	//删除成功后
			            	if(v_status.indexOf('ok') >-1){
			            		iframe.iframeObj["table"].removeSelectedRow();
			            		$(parent.document).find("#right").attr("src",contextRootPath+"/extInterfaceParamsRef/prepareExecute/toQueryPage?interfaceNo=-1");
			            	}          	
			            }
			        });
				   },"确认提示");
        	}
	  	} 	
	);
}
//查看明细
function viewData(vId){
	var code = iframe.iframeObj["table"].getSelectedObjs("interfaceNo");
	if(code.length==0){
		code="-1";
	}
	$(parent.document).find("#right").attr("src",contextRootPath+"/extInterfaceParamsRef/prepareExecute/toQueryPage?interfaceNo="+code);
}
//校验字段唯一性
function checkUnique(obj,string){
	var params = string;
	if( $(obj).val()==null || $(obj).val()== "" ){
		$(obj).addClass("checkError");
		return;
	}
	jyAjax( contextRootPath+'/extInterfaceInfo/checkUnique',
			params,
			function(msg){
				//新增成功后，
				var v_status = msg.status;
	        	if(v_status.indexOf('ok') >-1){
	        		$(obj).removeClass("checkError");
	        	}else{
	        		$(obj).addClass("checkError");
	        	}
	  	},
		function(msg){
	  		$("").newMsg({}).show(msg.msg);
    		$(obj).addClass("checkError");
	  	}  	
	);
}

//查看模板内容
function viewContent(vId){
	var dialogStruct={
			'display':contextRootPath+'/extInterfaceInfo/prepareExecute/toViewContent?id='+vId,
			'width':800,
			'height':500,
			'title':'模板内容',
			'isIframe':'false',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}