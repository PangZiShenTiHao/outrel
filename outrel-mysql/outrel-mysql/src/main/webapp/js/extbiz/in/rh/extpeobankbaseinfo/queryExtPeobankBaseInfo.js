//删除 事件
function toUpdateData(type){
	if(type=='1'){
		var intoIds = iframe.iframeObj["table"].getSelectedObjs("intoId");
		//如果没有选中 数据则
		if(intoIds == ""){
			jyDialog({"type":"info"}).alert("请选择待更新的数据！");
			return;
		}
		jyDialog({"type":"question"}).confirm("您确认要更新选择的数据吗？",function(){
			$.ajax({
	            type:"POST",
	            dataType:"json",
	            url:contextRootPath+"/extPeobankBaseInfo/updateExtPeobank?intoIds="+intoIds+"&type="+type,
	            success:function(msg){
	            	$("").newMsg({}).show(msg.msg);
	            	queryData();
	            }
	        });
		   },"确认提示");
	}else if(type=='2'){
		var params=$("form").serialize();
		debugger;
		jyDialog({"type":"question"}).confirm("您确认要更新该时间段内的数据吗？",function(){
			$.ajax({
	            type:"POST",
	            dataType:"json",
	            url:contextRootPath+"/extPeobankBaseInfo/updateExtPeobank?type="+type+"&"+params,
	            success:function(msg){
	            	$("").newMsg({}).show(msg.msg);
	            }
	        });
		   },"确认提示");
	}
}
