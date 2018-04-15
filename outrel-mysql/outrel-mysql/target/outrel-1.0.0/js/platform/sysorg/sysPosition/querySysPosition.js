/*//utf-8
var newFormrules={
		positionName: {required: true,maxlength: 50},
		positionCode: {required: true,maxlength: 50},
		orderBy:{isNum:true}
}
//表单提示信息,通常添加与修改表单页面的规则一致,仅当不一致时,再重新定义
var newFormMessages = {
	positionName: {required: "请填写岗位名称",maxlength: "岗位名称最多输入{0}个字符"},
	positionCode: {required: "请填写岗位编码",maxlength: "岗位编码最多输入{0}个字符"}
}
//校验 在页面加载完时,A需要初始化加载一次checkform("#formid");B按钮操作往后台提交数据时,先校验if(!checkform("#formid").form()) return; 
function checkform(formid){
	return $(formid).validate({rules:newFormrules,messages:newFormMessages,success:jySuccess,errorPlacement:jyErrorPlacement,highlight:jyHighlight});
}
*/

//点击新增按钮 事件跳转至 新增页面
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/sysPosition/prepareExecute/toAdd',
		'width':600,
		'height':400,
		'title':'新增',
		'isIframe':'false',
		'buttons':[
         {'text':'保存','action':doAddFrom,'isClose':true},
		 {'text':'关闭','isClose':true}
		]
	};
	
	var dialogAdd =jyDialog(dialogStruct).open();
}
//新增页面的保存操作
function doAddFrom(){
	
	//校验必填项
	/*if(!checkform("#addNewsFormData").form()) return;*/
	
	//校验必填项
	if ( $("#addNewsFormData").find(".checkError").length>0 || !checkFormFormat("addNewsFormData") || !checkIsNull($("#addNewsFormData")[0])) {
		jyDialog({"type":"info"}).alert("请正确填写！");
		//alert("请正确填写！");
		return false;
	}
	
	 var form = document.getElementById("addNewsFormData");
     if (checkIsNull(form)) {
    		//序列化 新增页面的form表单数据
    		var params=$("#addNewsFormData").serialize();
    		var url=contextRootPath+'/sysPosition/insertSysPosition';
    		//通过ajax保存
    		jyAjax(
    			url,
    			params,
    			function(msg){
    				//新增成功后，
    				$("").newMsg({}).show(msg.msg);;
    				var v_status = msg.status;
    	        	if(v_status.indexOf('ok') >-1){
    	        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
    	        		queryData();
    	        	}
    	  	});
     } else {
    	 jyDialog({"type":"warn"}).alert("请正确填写参数！");
         //alert("请正确填写参数");
     }

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
			'display':contextRootPath+'/sysPosition/prepareExecute/toUpdate?id='+v_ids,
			'width':600,
			'height':400,
			'title':'修改',
			'isIframe':'false',
			'buttons':[
             {'text':'保存','action':doUpdateFrom,'isClose':true},
			 {'text':'关闭','isClose':true}
			]
		};
		
	var dialogUpdate = jyDialog(dialogStruct).open();
}
//修改页面 的 保存操作
function doUpdateFrom(){
	
	//校验必填项
	/*if(!checkform("#updateNewsFormData").form()) return; */
	
	
	 var form = document.getElementById("updateNewsFormData");
     if (checkIsNull(form)) {
    	//序列化 新增页面的form表单数据
    		var params=$("#updateNewsFormData").serialize();
    		var url=contextRootPath+'/sysPosition/updateSysPosition';
    		//通过ajax保存
    		jyAjax(
    			url,
    			params,
    			function(msg){
    				//保存成功后，执行查询页面查询方法
    				$("").newMsg({}).show(msg.msg);;
    	        	var v_status = msg.status;
    	        	if(v_status.indexOf('ok') >-1){
    	        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
    	        		queryData();
    	        	}
    	  	});
     } else {
    	 jyDialog({"type":"warn"}).alert("请正确填写参数！");
    	 //alert("请正确填写参数");
     }
	
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
            url:contextRootPath+"/sysPosition/deleteSysPosition?ids="+v_ids,
			dataType:"JSON",
            success:function(msg){
            	$("").newMsg({}).show(msg.msg);;
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		iframe.iframeObj["table"].removeSelectedRow();
            		queryData();
            	}
            	
            	
            }
        });
	   },"确认提示");
	
	
	
	/*if(confirm("您确认要删除选择的数据吗？")){
        $.ajax({
            type:"POST",
            url:contextRootPath+"/sysPosition/deleteSysPosition?ids="+v_ids,
			dataType:"JSON",
            success:function(msg){
            	$("").newMsg({}).show(msg.msg);;
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		iframe.iframeObj["table"].removeSelectedRow();
            		queryData();
            	}
            	
            	
            }
        });
    }*/
}
//查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/sysPosition/prepareExecute/toView?id='+vId,
			'width':360,
			'height':300,
			'title':'查看明细',
			//'isIframe':'false',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}