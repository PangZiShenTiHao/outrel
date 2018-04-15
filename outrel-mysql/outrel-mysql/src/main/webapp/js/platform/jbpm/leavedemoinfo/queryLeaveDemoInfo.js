//utf-8
//点击新增按钮 事件跳转至 新增页面
function toAddData(){
	$.dialog({
		id:	'addDialogId',
	    lock: true,
	    width:850,
	    height:500,
	    title:'新增',
	    content: 'url:'+contextRootPath+'/dojbpm/leaveDemoInfo/prepareExecute/toAdd',
	    button: [{name: '发起审批流程',callback: function(){
                	doAddFrom();
                    return false;//触发事件后，不关闭页面
                 	},focus: true
	             },
                 {name: '关闭'}
	         ]
		});
}
//新增页面的保存操作
function doAddFrom(){
	//序列化 新增页面的form表单数据$("#addNewsFormData").serialize();
	var params=$(window.parent.document).find("[name='addDialogId']").contents().find("[id='addNewsFormData']").serialize();
	var url=contextRootPath+'/dojbpm/leaveDemoInfo/startLeaveDemoInfo';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			$("").newMsg({}).show(msg.msg);;
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//关闭窗口 调用弹出页面的 closeWindow方法
        		$(window.parent.document).find("[name='addDialogId']")[0].contentWindow.closeWindow();
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
            url:contextRootPath+"/dojbpm/leaveDemoInfo/deleteLeaveDemoInfo?ids="+v_ids,
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
            url:contextRootPath+"/dojbpm/leaveDemoInfo/deleteLeaveDemoInfo?ids="+v_ids,
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
	$.dialog({
		id:	'viewDialogId',
	    lock: true,
	    width:850,
	    height:500,
	    title:'查看明细',
	    content: 'url:'+contextRootPath+'/dojbpm/leaveDemoInfo/prepareExecute/toView?id='+vId,
	    button: [{name: '关闭',focus: true}]
		});
}

