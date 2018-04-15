//utf-8
//表单规则,通常添加与修改表单页面的规则一致,仅当不一致时,再重新定义
var newFormrules={
	title: {
		required: true,
		minlength: 3,
		maxlength: 50
	},
	body: {
		required: true,
		minlength: 3,
		maxlength: 250
	},
	startDate: {
		required: true
	},
	endDate: {
		required: true
	},
	type:{
		required: true
	},
	urgentFlag:{
		required: true
	},
	sysFlag:{
		required: true
	}
}
//表单提示信息,通常添加与修改表单页面的规则一致,仅当不一致时,再重新定义
var newFormMessages = {
	title: {
		required: "标题必须填写",
		minlength: "标题至少输入{0}个字符",
		maxlength: "标题最多输入{0}个字符",
	},
	body: {
		required: "内容必须填写",
		minlength: "内容至少输入{0}个字符",
		maxlength: "内容最多输入{0}个字符",
	},
	startDate: {
		required: "生效日期必须填写"
	},
	endDate: {
		required: "失效日期必须填写"
	},
	type:{
		required: "必须选择",
	},
	urgentFlag:{
		required: "必须选择",
	},
	sysFlag:{
		required: "必须选择",
	}
}
//校验 在页面加载完时,A需要初始化加载一次checkform("#formid");B按钮操作往后台提交数据时,先校验if(!checkform("#formid").form()) return; 
function checkform(formid){
	return $(formid).validate({rules:newFormrules,messages:newFormMessages,success:jySuccess,errorPlacement:jyErrorPlacement,highlight:jyHighlight});
}


//点击新增按钮 事件跳转至 新增页面
var sysmessageDialog = null;//弹出窗口
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/sysMessage/prepareExecute/toAdd',
		'width':800,
		'height':600,
		'title':'发布消息',
		'isIframe':'false',
		'buttons':[
         {'text':'保存','action':doAddFrom,'isClose':false},
		 {'text':'关闭','isClose':true}
		]
	};
	
	sysmessageDialog = jyDialog(dialogStruct);
	sysmessageDialog.open();
}

//新增页面的保存操作
function doAddFrom(){
	if(!checkform("#addNewsFormData").form()) return; 
	//序列化 新增页面的form表单数据
	var params=$("#addNewsFormData").serialize();
	var url=contextRootPath+'/sysMessage/insertSysMessage';
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
        		sysmessageDialog.close();
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
			'display':contextRootPath+'/sysMessage/prepareExecute/toUpdate?id='+v_ids,
			'width':800,
			'height':600,
			'title':'重发消息',
			'isIframe':'false',
			'buttons':[
             {'text':'保存','action':doUpdateFrom,'isClose':false},
			 {'text':'关闭','isClose':true}
			]
		};
		
	sysmessageDialog = jyDialog(dialogStruct);
	sysmessageDialog.open();
}
//修改页面 的 保存操作
function doUpdateFrom(){
	if(!checkform("#updateNewsFormData").form()) return;
	//序列化 新增页面的form表单数据
	var params=$("#updateNewsFormData").serialize();
	var url=contextRootPath+'/sysMessage/redoInsertSysMessage';
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
        		sysmessageDialog.close();
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
            url:contextRootPath+"/sysMessage/deleteSysMessage?ids="+v_ids,
            dataType: 'json',
            success:function(msg){
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
            url:contextRootPath+"/sysMessage/deleteSysMessage?ids="+v_ids,
            dataType: 'json',
            success:function(msg){
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
//删除 事件
function deleteMyData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待删除的数据！");
		return;
	}
	jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
		$.ajax({
            type:"POST",
            url:contextRootPath+"/sysMessagecenter/deleteSysMessage?ids="+v_ids,
            dataType: 'json',
            success:function(msg){
            	$("").newMsg({}).show(msg.msg);;
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		iframe.iframeObj["table"].removeSelectedRow();
            	}
            	
            	
            }
        });
	   },"确认提示");
	
	
	
	
	/*if(confirm("您确认要删除选择的数据吗？")){
        $.ajax({
            type:"POST",
            url:contextRootPath+"/sysMessagecenter/deleteSysMessage?ids="+v_ids,
            dataType: 'json',
            success:function(msg){
            	$("").newMsg({}).show(msg.msg);;
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		iframe.iframeObj["table"].removeSelectedRow();
            	}
            	
            	
            }
        });
    }*/
}
//查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/sysMessage/prepareExecute/toView?id='+vId,
			'width':800,
			'height':500,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}
//查看我的消息明细
function viewMyData(vId){
	var dialogStruct={
			'display':contextRootPath+'/sysMessagecenter/prepareExecute/toView?id='+vId,
			'width':800,
			'height':500,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}
var dialogUserSelect = {};//此变量为弹出框确定以及关闭的关键变量，固定必须

var receiveUserData = function(datas){//此方法为 弹出框控件选择后的数据接收方法，固定必须
	var k = '';
	var v = '';
	
	$.each(datas,function(i,data){
		k = k + this.id +",";
		v = v + this.userName +",";
	});
	
	$("#dtouserid").val(k);
	$("#dtouserName").text(v);
}
//选择用户组件
function selectUser(){
	//取到元素id
	var dialogStruct={
			'display':contextRootPath+'/component/system/sysUserSelect.jsp?check=true',
			'width':900,
			'height':800,
			'title':'选择用户',
			'buttons':[],
			'isIframe':'false'
		};
	dialogUserSelect =jyDialog(dialogStruct);
	dialogUserSelect.open();
}