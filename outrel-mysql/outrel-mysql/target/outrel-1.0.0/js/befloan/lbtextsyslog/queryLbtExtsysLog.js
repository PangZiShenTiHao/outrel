//utf-8
//点击新增按钮 事件跳转至 新增页面
//删除 事件
function deleteData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"warn"}).alert("请选择待修改的数据！");
		return;
	}
	if(confirm("您确认要删除选择的数据吗？")){
        $.ajax({
            type:"POST",
            url:contextRootPath+"/lbtExtsysLog/deleteLbtExtsysLog?ids="+v_ids,
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
			'display':contextRootPath+'/lbtExtsysLog/prepareExecute/toView?id='+vId,
			'width':800,
			'height':500,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}