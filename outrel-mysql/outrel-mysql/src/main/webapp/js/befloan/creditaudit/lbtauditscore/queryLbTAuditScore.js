var dialogAdd;
//utf-8
//点击新增按钮 事件跳转至 新增页面
function toAddData(prodId){
	//如果没有选中 数据则
//	var count =iframe.iframeObj["table"].getRowsCount();
//	
//	if(count){
//		$("").newMsg({}).show("请只插入一条数据");
//		return;
//	}
	var dialogStruct={
		'display':contextRootPath+'/lbTAuditScore/prepareExecute/toAdd?prodId='+prodId,
		'width':800,
		'height':500,
		'title':'新增',
		'isIframe':"false",
		'buttons':[
         {'text':'保存','action':doAddFrom,'isClose':true},
		 {'text':'关闭','isClose':true}
		]
	};

	dialogAdd =jyDialog(dialogStruct).open();
}

//新增页面的保存操作
function doAddFrom(){
	//序列化 新增页面的form表单数据
	//var params=dialogAdd.iframe.getAddSerializeForm();
	var formObj = document.getElementById("addNewsFormData");
	
	var formObj = $("#addNewsFormData")[0];
	if(!checkIsNull(formObj)) {
		$("").newMsg({}).show("页面的输入项是必填项，请输入！");
		return;
	}
	
	//其他参数用于进行事务必做判断
	var params = $("#addNewsFormData").serialize()+"&custId="+$("#custId").val()
				+"&prodId="+$("#prodId").val()+"&intoId="+$("#intoId").val()+"&transCode="+$("#transCode").val();
	if(!checkMyDataForm()){
		return;
	}
	var url=contextRootPath+'/lbTAuditScore/insertLbTAuditScore';
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
		alert("请选择待修改的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		alert("请选择一条数据！");
		return;
	}
		
		var dialogStruct={
			'display':contextRootPath+'/lbTAuditScore/prepareExecute/toUpdate?id='+v_ids,
			'width':800,
			'height':500,
			'title':'修改',
			'isIframe':"false",
			'buttons':[
             {'text':'保存','action':doUpdateFrom},
			 {'text':'关闭','isClose':true}
			]
		};
		dialogAdd = jyDialog(dialogStruct);
		dialogAdd.open();
}

//修改页面 的 保存操作
function doUpdateFrom(){
	//序列化 新增页面的form表单数据
	var formObj = $("#updateNewsFormData")[0];
	if(!checkIsNull(formObj)) {
		$("").newMsg({}).show("页面的输入项是必填项，请输入！");
		return;
	}
	var params=$("#updateNewsFormData").serialize();
	if(!checkMyDataForm()){
		return;
	}
	var url=contextRootPath+'/lbTAuditScore/updateLbTAuditScore';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//保存成功后，执行查询页面查询方法
			alert(msg.msg);
        	var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		dialogAdd.close();
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		queryData();
        	}
  	});
}


//删除 事件
function deleteData(){
	var v_ids = auditonlineTable.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		$("").newMsg({}).show("请选择待删除的数据！");
		return;
	}
	
	jyDialog().confirm("您确认要删除选择的数据吗？", function(){
		var url= contextRootPath+"/lbTAuditScore/deleteLbTAuditScore?ids="+v_ids;
		jyAjax(url,"",function(msg){
			$("").newMsg({}).show(msg.msg);
        	var v_status = msg.status;
        	//删除成功后
        	if(v_status.indexOf('ok') >-1){
        		auditonlineTable.iframeObj["table"].removeSelectedRow();
        	}
		},"","",false);
	})
}
//查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/lbTAuditScore/prepareExecute/toView?id='+vId,
			'width':800,
			'height':500,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}
//数据校验
function checkMyDataForm(){

	  var reg = new RegExp("^[0-9]*$");
	  var score = $("#dtoauditScore").val();
	  if(score==""){
		  alert("评分不能为空！");
		  $("#dtoauditScore").focus();
		  return false;
	  }
	  if(!reg.test(score)){
		  alert("评分 必须输入数字！");
		  $("#dtoauditScore").focus();
		  return false;
	  }

	  return true;
}