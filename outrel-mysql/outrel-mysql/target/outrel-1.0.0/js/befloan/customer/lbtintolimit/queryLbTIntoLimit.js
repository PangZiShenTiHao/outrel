
/*
 * 提交 执行 待办任务
 */
function changeSwitch(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选待变更的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"info"}).alert("请选择一条数据！");
		return;
	}
	
	var sObj = iframe.iframeObj["table"].getSelectedObjs();
	var oldLimitState=sObj[0].limitState;		
	var oldSwitchTimes=sObj[0].switchTimes;
	
	jyDialog().confirm("您确定要变更进件开关吗？", function(){
		var url= contextRootPath+'/lbTIntoLimit/updateLbTIntoLimit';
		var param = "id="+v_ids +"&oldLimitState="+oldLimitState+"&switchTimes="+oldSwitchTimes;
		jyAjax(url,param,function(msg){
			var v_status = msg.status;
			var msg = msg.msg;
			if(msg!=null ){
				$("").newMsg({}).show(msg);
			}
			if(v_status.indexOf('ok') >-1){
				queryData();
        	}
		},"","",false);
	});
}




//查看明细
function viewDataByIntoAppId(vId){
	var title="查看进件信息("+vId+")";
	var url=contextRootPath+'/lbTIntoInfo/prepareExecute/viewLbTIntoInfo?id='+vId+'&operateBtn=view&tabTitle='+title;
	
	var obj = {
			"title" : title,
			"url" : url
	};
	window.top.tabs.add(obj);
}

