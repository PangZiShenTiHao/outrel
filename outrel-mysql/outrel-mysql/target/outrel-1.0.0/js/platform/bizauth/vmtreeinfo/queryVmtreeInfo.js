//utf-8
//点击新增按钮 事件跳转至 新增页面
function toAddTreeData(){
	var dialogStruct={
		'display':contextRootPath+'/vmtreeInfo/prepareExecute/toAdd',
		'width':800,
		'height':500,
		'title':'新增',
		'buttons':[
         {'text':'保存','action':doAddTreeFrom,'isClose':true},
		 {'text':'关闭','isClose':true}
		]
	};
	
	var dialogAdd =jyDialog(dialogStruct).open();
}
//新增页面的保存操作
function doAddTreeFrom(){
	//序列化 新增页面的form表单数据
	var params=$("#addNewsFormData").serialize();
	var url=contextRootPath+'/vmtreeInfo/insertVmtreeInfo';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			jyDialog().$("").newMsg({}).show(msg.msg);;
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		queryData();
        	}
  	});
}
//修改 事件
function toUpdateTreeData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待修改的数据！");
		//jyDialog().alert("请选择待修改的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"info"}).alert("请选择一条数据！");
		//jyDialog().alert("请选择一条数据！");
		return;
	}
	var orgId=iframe.iframeObj["table"].getSelectedObjs()[0].orgId;
	var orgType=iframe.iframeObj["table"].getSelectedObjs()[0].orgType;
    var dialogStruct={
			'display':contextRootPath+'/vmtreeInfo/prepareExecute/toManage?orgId='+orgId+"&orgType="+orgType,
			'width':1000,
			'height':600,
			'title':'业务树管理维护',
			'buttons':[
             {'text':'关闭','isClose':true}
			]
		};
		
	jyDialog(dialogStruct).open();
}

//删除 事件
function deleteTreeData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待删除的数据！");
		//jyDialog().alert("请选择待删除的数据！");
		return;
	}
	
  jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
	  $.ajax({
            type:"POST",
            url:contextRootPath+"/vmtreeInfo/deleteVmtreeInfo?ids="+v_ids,
            success:function(msg){
            	jyDialog().$("").newMsg({}).show(msg.msg);;
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
function viewTreeData(vId,orgType){
	var dialogStruct={
			'display':contextRootPath+'/vmtreeInfo/prepareExecute/toView?orgId='+vId+"&orgType="+orgType,
			'width':800,
			'height':500,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}
/**
 * 快速调岗
 */
var changeOrgDialog;
function changePostion(){
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
	var orgId=iframe.iframeObj["table"].getSelectedObjs()[0].orgId;
	var orgType=iframe.iframeObj["table"].getSelectedObjs()[0].orgType;
    var dialogStruct={
			'display':contextRootPath+'/vmtreeInfo/prepareExecute/toChangeBizPostion?orgId='+orgId+"&orgType="+orgType,
			'width':800,
			'height':600,
			'isIframe':'true',
			'title':'业务虚拟树快速调岗',
			'buttons':[
			 {'text':'保存','action':doChangeOrg,'isClose':false},
             {'text':'关闭','isClose':true}
			]
		};
		
    changeOrgDialog =jyDialog(dialogStruct);
    changeOrgDialog.open();
}
/**
 * 实现具体的快速调岗
 */
function doChangeOrg(){
	var obj = changeOrgDialog.getIframe();
	//判断是否都全部通过校验
	if(!checkIsNull(obj.$("#updateNewsFormData")))	return ;
	
	jyDialog({"type":"question"}).confirm("您确认要保存吗？",function(){
		//序列化 新增页面的form表单数据
		var params=obj.$("#updateNewsFormData").serialize();
		var url=contextRootPath+'/vmdataPriv/fastChangeOrg';
		//通过ajax保存
		jyAjax(
			url,
			params,
			function(msg){
				//jyDialog().$("").newMsg({}).show(msg.msg);
				jyDialog({"type":"info"}).alert(msg.msg);
				//changeOrgDialog.close();//关闭弹出层
	  	});
	 },"确认提示");
}