//utf-8
//点击新增按钮 事件跳转至 新增页面
function toAddData(){
	window.location=contextRootPath+'/sysPrvOrgAuth/prepareExecute/toAdd'+searchId;
	//$("#contentSwap").load(contextRootPath+'/sysPrvOrgAuth/prepareExecute/toAdd');
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
	$("#contentSwap").load(contextRootPath+'/sysPrvOrgAuth/prepareExecute/toUpdate?id='+v_ids);
}
//修改页面 的 保存操作
function doUpdateFrom(){
	//序列化 新增页面的form表单数据
	var params=$("#updateNewsFormData").serialize();
	var url=contextRootPath+'/sysPrvOrgAuth/updateSysPrvOrgAuth';
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
}
//删除 事件
function deleteData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待删除的数据！");
		//alert("请选择待删除的数据！");
		return;
	}
	jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
		$.ajax({
            type:"POST",
            url:contextRootPath+"/sysPrvOrgAuth/deleteSysPrvOrgAuth?ids="+v_ids,
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
            url:contextRootPath+"/sysPrvOrgAuth/deleteSysPrvOrgAuth?ids="+v_ids,
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
//权限更新
function updateData(){
    $.ajax({
        type:"POST",
        url:contextRootPath+"/sysPrvAuthResult/insertSysAuthResult",
        dataType: 'json',
        success:function(msg){
        	//queryData();
        	$("").newMsg({}).show(msg.msg);;
        }
    });
}

var dialogOrgSelect;//此变量必须：弹出框的对象，关闭弹出框时需要调用

var receiveData = function(datas){//此方法为 弹出框树形控件选择后的数据接收方法，固定必须
	   $("input[name='orgId']").val(datas[0].ID);
	   $("input[name='orgName']").val(datas[0].NAME);
}
//弹出树形选择界面的方法 不做限制，只要能弹出选择框就行
function selectOrg(){
	var dialogStruct={
			'display':contextRootPath+'/component/system/treeSysOrgSelect.jsp?orgId=1',
			'width':400,
			'height':500,
			'title':'选择机构',
			'buttons':[],
			'isIframe':'false'
		};
		dialogOrgSelect =jyDialog(dialogStruct);
		dialogOrgSelect.open();
}