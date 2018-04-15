//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdateObj;
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/extProviderInfo/prepareExecute/toAdd',
		'width':400,
		'height':300,
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
//添加子项
function toAddDetailData(obj){
	var providerCode = obj['providerCode'];
	var dialogStruct={
			'display':contextRootPath+'/extProviderInterfaceRef/prepareExecute/toAdd&providerCode='+providerCode,
			'width':400,
			'height':500,
			'title':'新增',
			'isIframe':'false',
			'buttons':[
	         {'text':'保存','action':doAddFromDetail},
			 {'text':'关闭','isClose':true}
			]
		};
		
		var dialogAdd =jyDialog(dialogStruct).open();
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
	var url=contextRootPath+'/extProviderInfo/insertExtProviderInfo';
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
        		dialogAddObj.close();
        		queryData();
        	}
  	});
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
			'display':contextRootPath+'/extProviderInfo/prepareExecute/toUpdate?id='+v_ids,
			'width':400,
			'height':300,
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
	var params=$("#updateNewsFormData").serialize();
	var url=contextRootPath+'/extProviderInfo/updateExtProviderInfo';
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
        		dialogUpdateObj.close();
        		queryData();
        	}
  	});
}
//删除 事件
function deleteData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	var providerCode = iframe.iframeObj["table"].getSelectedObjs("providerCode");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待删除的数据！");
		return;
	}
	jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
		$.ajax({
            type:"POST",
            dataType:"json",
            url:contextRootPath+"/extProviderInfo/deleteExtProviderInfo?ids="+v_ids+"&providerCode="+providerCode,
            success:function(msg){
            	$("").newMsg({}).show(msg.msg);
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		iframe.iframeObj["table"].removeSelectedRow();	
            		$(parent.document).find("#right").attr("src",contextRootPath+"/extProviderInterfaceRef/prepareExecute/toQueryPage?providerCode=-1");
            	}
            	
            	
            }
        });
	   },"确认提示");
}
//查看明细
function viewData(code){
	var code = iframe.iframeObj["table"].getSelectedObjs("providerCode");
	if(code.length==0){
		code="-1";
	}
	$(parent.document).find("#right").attr("src",contextRootPath+"/extProviderInterfaceRef/prepareExecute/toQueryPage?providerCode="+code);
}
//校验字段唯一性
function checkUnique(obj,string){
	var params = string;
	if( $(obj).val()==null || $(obj).val()== "" ){
		$(obj).addClass("checkError");
		return;
	}
	jyAjax( contextRootPath+'/extProviderInfo/checkUnique',
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