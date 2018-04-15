var cModify=new CModify();

//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAdd;
var dialogUpdate

function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/lbTCustomterInfo/prepareExecute/toAdd',
		'width':1600,
		'height':710,
		'isIframe':'false',
		'title':'新增',
		'buttons':[
         {'text':'保存','action':doAddFrom},
		 {'text':'关闭','isClose':true}
		]
	};
	
	dialogAdd =jyDialog(dialogStruct);
	dialogAdd.open();
}
//新增页面的保存操作
function doAddFrom(){
	
	var formObj=document.getElementById('addNewsFormData2');
	if(!(checkIsNull(formObj)&&checkFormFormat($(formObj),true))){
		return ;
	}
	
	//序列化 新增页面的form表单数据
	var params=$("#addNewsFormData2").serialize();
	var url=contextRootPath+'/lbTCustomterInfo/insertLbTCustomterInfo';
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
        		dialogAdd.close();
        	}
        }
	);
}
//修改 事件
function toUpdateData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog().alert("请选择待修改的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog().alert("请选择一条数据！");
		return;
	}

	var dialogStruct={
			'display':contextRootPath+'/lbTCustomterInfo/prepareExecute/toUpdate?id='+v_ids,
			'width':1600,
			'height':710,
			'isIframe':'false',
			'title':'修改',
			'buttons':[
             {'text':'保存','action':doUpdateFrom},
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogUpdate = jyDialog(dialogStruct);
	dialogUpdate.open();
}


//客户信息          修改      （栏位）--客户或者老客户
var dialogInfoUpdate
function toInfoUpdateData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog().alert("请选择待修改的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog().alert("请选择一条数据！");
		return;
	}
	var dialogStruct={
			'display':contextRootPath+'/lbTCustomterInfo/prepareExecute/toInfoUpdate?id='+v_ids,
			'title':'修改',
			"isIframe":'false',
			'buttons':[
             {'text':'保存','action':doColumnModifyInfos},
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogInfoUpdate = jyDialog(dialogStruct);
	dialogInfoUpdate.open();
}


//客户信息变更        展示  （栏位）
var columnModifyDialog;
function doColumnModifyInfos(){
	
	var formObj=document.getElementById('addNewsFormData2');
	if(!(checkIsNull(formObj)&&checkFormFormat($(formObj),true))){
		return ;
	}
	
/*	var params=$("#addNewsFormData2").serialize();
	var url = contextRootPath+'/lbTCustomterInfo/validateCustBlack';
	
	jyAjax(url, params, function(msg) {
		var v_status = msg.status;
    	if(v_status.indexOf('ok') >-1){
    		
    	}
	});*/
	
	var dialogStruct={
			'display':contextRootPath+'/lbTCustomterInfo/prepareExecute/columnModifyInfo',
			'title':'信息修改列表',
			'width':800,
			'height':500,
			"isIframe":'false',
			'buttons':[
			           {'text':'保存','action':doInfoUpdateFrom},
			           {'text':'关闭','isClose':true}
			           ]
	};
	
	columnModifyDialog = jyDialog(dialogStruct);
	columnModifyDialog.open();
	
}


//把客户信息变更   保存   栏位（栏位）
function doInfoUpdateFrom(){
	
	var columnModifyStr= cModify.getModifyJsonStr();
	var customterStr=$("#addNewsFormData2").serialize()+"&id="+modifyInfoId;
	params=customterStr+"&columuModifyStr="+columnModifyStr;
	url=contextRootPath+'/lbTCustomterInfo/updateLbTCustInfoIntoColumn';
	jyAjax(url,params,function(msg){
		$("").newMsg({}).show(msg.msg);
		if(msg.status.indexOf("ok")>-1){
			dialogInfoUpdate.close();
			columnModifyDialog.close();
		}
	});
}

//获取栏位信息
function getColumnModifyJson(){
	return cModify.getModifyObjs();
}

//修改页面 的 保存操作
function doUpdateFrom(){
	var formObj=document.getElementById('addNewsFormData2');
	if(!(checkIsNull(formObj)&&checkFormFormat($(formObj),true))){
		return;
	}
	
	var params = "";
	var url = contextRootPath+'/lbTCustomterInfo/hasIntoByCustId?custId=' + $("#custId").val();
	
	var flag = true;
	jyAjax(
			url,
			params,
			function(data){
				if(data.data == true) {
					jyDialog().alert('当前用户存在进件， 不可以进行修改。');
					flag = false;
				} else {
					
					var formObj=document.getElementById('addNewsFormData2');
					if(!(checkIsNull(formObj)&&checkFormFormat($(formObj),true))){
						return ;
					}
					
					//序列化 新增页面的form表单数据
					params=$("#addNewsFormData2").serialize()+"&columuModifyStr="+cModify.getModifyJsonStr();
					url=contextRootPath+'/lbTCustomterInfo/updateLbTCustomterInfo';
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
				        		dialogUpdate.close();
				        	}
				  	});
					
				}
	  	});
	
	/*alert(flag);
	if(flag == true) {
		var formObj=document.getElementById('addNewsFormData2');
		if(!(checkIsNull(formObj)&&checkFormFormat($(formObj)))){
			return ;
		}
		
		//序列化 新增页面的form表单数据
		params=$("#addNewsFormData2").serialize()+"&columuModifyStr="+cModify.getModifyJsonStr();
		url=contextRootPath+'/lbTCustomterInfo/updateLbTCustomterInfo';
		//通过ajax保存
		jyAjax(
			url,
			params,
			function(msg){
				//保存成功后，执行查询页面查询方法
				alert(msg.msg);
	        	var v_status = msg.status;
	        	if(v_status.indexOf('ok') >-1){
	        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
	        		queryData();
	        	}
	  	});
	}*/
}
//删除 事件
function deleteData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		alert("请选择待删除的数据！");
		return;
	}
	if(confirm("您确认要删除选择的数据吗？")){
        jyAjax( contextRootPath+"/lbTCustomterInfo/deleteLbTCustomterInfo?ids="+v_ids
        	  , ""
        	  , function(data) {
		        	$("").newMsg({}).show(data.msg);
		        	var v_status = data.status;
		        	//删除成功后
		        	if(v_status.indexOf('ok') >-1){
		        		iframe.iframeObj["table"].removeSelectedRow();
		        		queryData();
		        	}
		});
    }
}
// 查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/lbTCustomterInfo/prepareExecute/toView?id='+vId,
			'width':1400,
			'height':700,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}

var custTransferDialog;
//客户转移
function custTransfer(varFlag){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		$("").newMsg({}).show("请选择待转移的客户！");
		return;
	}
	var dialogStruct={
		'display':contextRootPath+'/lbTCustomterInfo/prepareExecute/choiceAcc?id='+v_ids+'&myFlag='+varFlag,
		'title':'客户转移',
		"isIframe":'false',
		'width':400,
		'height':300,
		'buttons':[
         {'text':'提交','action':custTransferSave},
		 {'text':'关闭','isClose':true}
		]
	};
		
	custTransferDialog = jyDialog(dialogStruct);
	custTransferDialog.open();
}

function custTransferSave(){
	//序列化 保存客户转移页面的form表单数据
	var params=$("#custTransferForm").serialize();
	var custIds = $("#custIds").val();
	var customerManager = $("#customerManager").val();
	debugger;
	if(custIds==""||customerManager==""){
		$("").newMsg({}).show("客户经理不能为空！");
		return;
	}
	var url=contextRootPath+'/lbTCustomterInfo/custTransferSave';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//客户转移成功后，
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		$("").newMsg({}).show(msg.msg);
        		queryData();
        		custTransferDialog.close();
        	}
        }
	);
	
}

//查看客户转移轨迹
function viewCustTransferLog(vId){
	var dialogStruct={
			'display':contextRootPath+'/lbTCusttransferLog/prepareExecute/toQueryLog?fkCustId='+vId,
			'width':500,
			'height':600,
			'title':'查看客户转移轨迹',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}

