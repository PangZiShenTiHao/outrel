//utf-8
//点击新增按钮 事件跳转至 新增页面
function toAddData(){
	window.location=contextRootPath+'/sysPrvUserShare/prepareExecute/toAdd'+searchId;
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
            url:contextRootPath+"/sysPrvUserShare/deleteSysPrvUserShare?ids="+v_ids,
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
            url:contextRootPath+"/sysPrvUserShare/deleteSysPrvUserShare?ids="+v_ids,
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

var dialogUserSelect;//此变量为弹出框确定以及关闭的关键变量，固定必须
var receiveUserData = function(datas){//此方法为 弹出框控件选择后的数据接收方法，固定必须
	$("input[name='fromUserId']").val(datas[0].id);
	$("input[name='fromUserName']").val(datas[0].userName);
}

function selectUser(){
	//取到元素id
	var dialogStruct={
			'display':contextRootPath+'/component/system/sysUserSelect.jsp',
			'width':900,
			'height':800,
			'title':'选择用户',
			'buttons':[],
			'isIframe':'false'
		};
	dialogUserSelect =jyDialog(dialogStruct);
	dialogUserSelect.open();
}
