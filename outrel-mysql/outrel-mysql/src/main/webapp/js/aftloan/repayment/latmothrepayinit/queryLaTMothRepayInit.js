//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdateObj;
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/component/upload/importContractTxtFile.jsp',
		'width':800,
		'height':500,
		'title':'新增',
		'buttons':[
         {'text':'确定','action':doAddFrom},
		 {'text':'取消','isClose':true}
		]
	};
	
	dialogAddObj=jyDialog(dialogStruct);
	dialogAddObj.open();
}
//新增页面的保存操作
function doAddFrom(){
	var obj = dialogAddObj.getIframe();
	var dtomonthRepayDay = obj.$("#dtomonthRepayDay").val();//月还日
	var dtorepayFun = obj.$("#dtorepayFun").val();//划扣方式
	if(dtomonthRepayDay == ''){
		$("").newMsg({}).show("月还日不能为空！");
		return;
	}
	if(dtorepayFun == ''){
		$("").newMsg({}).show("划扣方式不能为空！");
		return;
	}
	
	//序列化 新增页面的form表单数据
	if(!checkIsNull(obj.$("#addNewsFormData"))){
		$("").newMsg({}).show("页面的输入项是必填项，请输入！");
		return;
	}
	var params=obj.$("#addNewsFormData").serialize();
	var url=contextRootPath+'/laTMothRepayInit/saveMonthRepayInit';
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
			'display':contextRootPath+'/laTMothRepayInit/prepareExecute/toUpdate?id='+v_ids,
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
	var url=contextRootPath+'/laTMothRepayInit/updateLaTMothRepayInit';
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
	var listId = iframe.iframeObj["table"].getSelectedObjs()[0].listId;
	var coreState = iframe.iframeObj["table"].getSelectedObjs()[0].coreState;
	var state = iframe.iframeObj["table"].getSelectedObjs()[0].state;
	if(coreState=='2'){
		jyDialog({"type":"info"}).alert("已同步核心完成,不允许删除！");
		return;
	}
	if(coreState=='1'){
		jyDialog({"type":"info"}).alert("该批次向核心同步中,不允许删除！");
		return;
	}
	if(state=='2'){
		jyDialog({"type":"info"}).alert("该批次处于解析中,不允许删除！");
		return;
	}
	jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
		$.ajax({
            type:"POST",
            dataType:"json",
            url:contextRootPath+"/laTMothRepayInit/deleteLaTMothRepayInit?ids="+v_ids+"&listId="+listId,
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
function viewData(id){
	var dialogStruct={
			'display':contextRootPath+'/laTMothRepayInit/prepareExecute/toView?id='+id,
			'width':800,
			'height':500,
			'title':'批次下合同列表',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}