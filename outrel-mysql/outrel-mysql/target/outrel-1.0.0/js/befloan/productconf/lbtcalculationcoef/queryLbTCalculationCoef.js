//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdateObj;
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/lbTCalculationCoef/prepareExecute/toAdd',
		'width':800,
		'height':500,
		'title':'新增',
		'buttons':[
         {'text':'保存','action':doAddFrom,'isClose':false},
		 {'text':'关闭','isClose':true}
		]
	};
	dialogAddObj=jyDialog(dialogStruct);
	dialogAddObj.open();
}
//新增页面的保存操作
function doAddFrom(){
	var obj = dialogAddObj.getIframe();
	var formObj=obj.$("#addNewsFormData")[0];
	if(!checkIsNull(formObj)) {
		$("").newMsg({}).show("页面的输入项是必填项，请输入！");
		return;
	}
	if(!validateData(formObj)) return ;
	//序列化 新增页面的form表单数据
	var params=obj.$("#addNewsFormData").serialize();
	var url=contextRootPath+'/lbTCalculationCoef/insertLbTCalculationCoef';
	if(checkExsit(params)) return false ;
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
        		dialogAddObj.close();
        	}
  	});
}


//校验是否已存在对应的产品配置
function checkExsit(params){
	var url=contextRootPath+'/lbTCalculationCoef/checkExsit';
	//通过ajax保存
	var isExsit = false ;
	$.ajax({
        type:"POST",
        dataType:"JSON",
        async:false,
		url:url,
		data:params,
		success:function(msg){
			var v_status = msg.status;
        	if(v_status.indexOf('isExsit') >-1){
        		//已存在时弹出提示信息
        		$("").newMsg({}).show(msg.msg);
        		isExsit= true ;
        	}
		}
  	});
	return isExsit ;
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
			'display':contextRootPath+'/lbTCalculationCoef/prepareExecute/toUpdate?id='+v_ids,
			'width':800,
			'height':500,
			'title':'修改',
			'buttons':[
             {'text':'保存','action':doUpdateFrom,'isClose':false},
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogUpdateObj = jyDialog(dialogStruct);
	dialogUpdateObj.open();
}
//修改页面 的 保存操作
function doUpdateFrom(){
	var obj = dialogUpdateObj.getIframe();
	var formObj=obj.$("#updateNewsFormData")[0];
	if(!checkIsNull(formObj)) {
		$("").newMsg({}).show("页面的输入项是必填项，请输入！");
		return;
	}
	if(!validateData(formObj)) return ;
	//序列化 新增页面的form表单数据
	var params=obj.$("#updateNewsFormData").serialize();
	var url=contextRootPath+'/lbTCalculationCoef/updateLbTCalculationCoef';
	if(checkExsit(params)) return false ;
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
        		dialogUpdateObj.close();
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
	if(confirm("您确认要删除选择的数据吗？")){
        $.ajax({
            type:"POST",
            dataType:"JSON",
            url:contextRootPath+"/lbTCalculationCoef/deleteLbTCalculationCoef?ids="+v_ids,
            success:function(msg){
            	$("").newMsg({}).show(msg.msg);
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
			'display':contextRootPath+'/lbTCalculationCoef/prepareExecute/toView?id='+vId,
			'width':800,
			'height':500,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
	
	var dialogView = jyDialog(dialogStruct).open();
}

//页面校验
function validateData(formObj){
	var dtocoefficientval = $("#dtocoefficient",formObj).val();
	var patrn=/^(([\d]+))(\.(\d){1,2})?$/;
	if(!patrn.test(dtocoefficientval)){
		$("").newMsg({}).show("计算系数只能为正浮点数,最多保留小数点后两位有效数字。");
		return false ;
	}
	return true ;
}