//utf-8
//点击新增按钮 事件跳转至 新增页面
function toAddData(){
	$.dialog({
		id:	'addDialogId',
	    lock: true,
	    width:850,
	    height:500,
	    title:'新增',
	    content: 'url:'+contextRootPath+'/addWorkInfo/prepareExecute/toAdd',
	    button: [{name: '保存',callback: function(){
	    			 doAddFrom();
                	 return false;//触发事件后，不关闭页面
                 	},focus: true
	             },{name: '关闭'}]
		}).max();
}
//新增页面的保存操作
function doAddFrom(){
	//序列化 新增页面的form表单数据
	var params=$(window.parent.document).find("[name='addDialogId']").contents().find("[id='addNewsFormData']").serialize();
	var url=contextRootPath+'/addWorkInfo/insertAddWorkInfo';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			$(window.top.body).newMsg({}).show(msg.msg);
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//关闭窗口 调用弹出页面的 closeWindow方法
        		$(window.parent.document).find("[name='addDialogId']")[0].contentWindow.closeWindow();
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
	$.dialog({
		id:	'updateDialogId',
	    lock: true,
	    width:850,
	    height:500,
	    title:'修改',
	    content: 'url:'+contextRootPath+'/addWorkInfo/prepareExecute/toUpdate?id='+v_ids,
	    button: [{name: '保存',callback: function(){
	    			  doUpdateFrom();
                	 return false;//触发事件后，不关闭页面
                 	},focus: true
	             },{name: '关闭'}]
		}).max();
}
//修改页面 的 保存操作
function doUpdateFrom(){
	//序列化 新增页面的form表单数据
	var params=$(window.parent.document).find("[name='updateDialogId']").contents().find("[id='updateNewsFormData']").serialize();
	var url=contextRootPath+'/addWorkInfo/updateAddWorkInfo';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//保存成功后，执行查询页面查询方法
			//alert(msg.msg);
			$(window.top.body).newMsg({}).show(msg.msg);
        	var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//关闭窗口 调用弹出页面的 closeWindow方法
        		$(window.parent.document).find("[name='updateDialogId']")[0].contentWindow.closeWindow();
        	}
  	});
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
        $.ajax({
            type:"POST",
            url:contextRootPath+"/addWorkInfo/deleteAddWorkInfo?ids="+v_ids,
            success:function(msg){
            	alert(msg.msg);
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
			'display':contextRootPath+'/addWorkInfo/prepareExecute/toView?id='+vId,
			'width':800,
			'height':500,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}