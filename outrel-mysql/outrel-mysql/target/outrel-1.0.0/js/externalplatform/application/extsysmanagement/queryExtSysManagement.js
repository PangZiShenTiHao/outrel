//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdateObj;
var dialogAddFuncObj;
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/extSysManagement/prepareExecute/toAdd',
		'width':800,
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
	var url=contextRootPath+'/extSysManagement/insertExtSysManagement';
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
			'display':contextRootPath+'/extSysManagement/prepareExecute/toUpdate?id='+v_ids,
			'width':800,
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
	var url=contextRootPath+'/extSysManagement/updateExtSysManagement';
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
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待删除的数据！");
		return;
	}
	//对应系统下是否有功能校验
	var sysNo = iframe.iframeObj["table"].getSelectedObjs("sysCode");
	jyAjax( contextRootPath+'/extFunctionType/checkUnique',
			'&sysNo='+sysNo,
		function(msg){
			var v_status = msg.status;
        	if(v_status.indexOf('no') >-1){
        		jyDialog({"type":"info"}).alert(msg.msg);
        	}else{
        		jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
        			$.ajax({
        	            type:"POST",
        	            dataType:"json",
        	            url:contextRootPath+"/extSysManagement/deleteExtSysManagement?ids="+v_ids,
        	            success:function(msg){
        	            	$("").newMsg({}).show(msg.msg);
        	            	var v_status = msg.status;
        	            	//删除成功后
        	            	if(v_status.indexOf('ok') >-1){
        	            		iframe.iframeObj["table"].removeSelectedRow();
        	            	}	        	            	        	            	
        	            }
        	        });
        		   },"确认提示");
        	}
	  	} 	
	);
}

//添加功能类型
function toAddExtFuncType(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待添加功能的数据！");
		return;
	}
	var selectedObj = iframe.iframeObj["table"].getSelectedObjs()[0];
	var sysCode = selectedObj["sysCode"];//获取选中对象的系统编码
	var dialogStruct={
			'display':contextRootPath+'/extFunctionType/prepareExecute/toQueryPage?sysCode='+sysCode,
			'width':1000,
			'height':700,
			'title':'添加功能类型',
			'buttons':[
			  {'text':'关闭','isClose':true}
			]
		};
		dialogAddFuncObj=jyDialog(dialogStruct);
		dialogAddFuncObj.open();
} 

//查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/extSysManagement/prepareExecute/toView?id='+vId,
			'width':800,
			'height':500,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}
//校验字段唯一性
function checkUnique(obj,string){
	var params = string;
	if( $(obj).val()==null || $(obj).val()== "" ){
		$(obj).addClass("checkError");
		return;
	}
	jyAjax( contextRootPath+'/extSysManagement/checkUnique',
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