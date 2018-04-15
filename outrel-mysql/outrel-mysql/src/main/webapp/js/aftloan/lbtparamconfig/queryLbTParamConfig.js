//utf-8
//表单规则,通常添加与修改表单页面的规则一致,仅当不一致时,再重新定义
var newFormrules_add={
	configName: {
		required: true,
		maxlength: 50
	},
	configCode: {
		required: true,
		maxlength: 50
	},
	configValue: {
		required: true,
		maxlength: 100
	}
}
//表单提示信息,通常添加与修改表单页面的规则一致,仅当不一致时,再重新定义
var newFormMessages_add = {
	configName: {
		required: "请填写配置项名称",
		maxlength: "配置项名称最多输入{0}个字符",
	},
	configCode: {
		required: "请填写配置项编码",
		maxlength: "配置项编码最多输入{0}个字符",
	},
	configValue: {
		required: "请填写配置项值",
		maxlength: "配置项值最多输入{0}个字符",
	}
}

//校验 在页面加载完时,A需要初始化加载一次checkform("#formid");B按钮操作往后台提交数据时,先校验if(!checkform("#formid").form()) return; 
function checkform(formid){
	var t = $(formid).validate({rules:newFormrules_add,messages:newFormMessages_add,success:jySuccess,errorPlacement:jyErrorPlacement,highlight:jyHighlight});
	return t;
}

//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdateObj;
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/lbTParamConfig/prepareExecute/toAdd',
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
}
//新增页面的保存操作
function doAddFrom(){
	var obj = dialogAddObj.getIframe();
	//序列化 新增页面的form表单数据
	if(!checkIsNull(obj.$("#addNewsFormData"))) return;
	var params=obj.$("#addNewsFormData").serialize();
	var url=contextRootPath+'/lbTParamConfig/insertLbTParamConfig';
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
		jyDialog({"type":"info"}).alert("请选择待修改的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"info"}).alert("请选择一条数据！");
		return;
	}

	var dialogStruct={
			'display':contextRootPath+'/lbTParamConfig/prepareExecute/toUpdate?id='+v_ids,
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
	var obj = dialogUpdateObj.getIframe();
	//序列化 新增页面的form表单数据
	if(!checkIsNull(obj.$("#updateNewsFormData"))) return;
	var params=obj.$("#updateNewsFormData").serialize();
	var url=contextRootPath+'/lbTParamConfig/updateLbTParamConfig';
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
		jyDialog({"type":"info"}).alert("请选择待删除的数据！");
		return;
	}
	jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
		$.ajax({
            type:"POST",
            dataType:"json",
            url:contextRootPath+"/lbTParamConfig/deleteLbTParamConfig?ids="+v_ids,
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
//查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/lbTParamConfig/prepareExecute/toView?id='+vId,
			'width':800,
			'height':500,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}

//唯一性验证
function queryParamCodeIsExist(code){
	$.ajax({
        type:"POST",
        dataType:"json",
        url:contextRootPath+"/lbTParamConfig/queryParamCodeIsExist?code="+code,
        success:function(msg){
        	if(msg.data>0){
        		 $("").newMsg({}).show("该编码已经存在");
        		//alert("该编码已经存在！");
        		$('#dtoconfigCode').val('');
        	}
        }
    });
}
