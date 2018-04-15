
//上传 合同扫描件
function uploadAppendix(type){
	var v_objs=getIds("请选择待上传附件的数据！");
	debugger;
	//获取所在行的对象
	var objs=iframe.iframeObj["table"].getSelectedObjs();
	var v_fkIntoAppId = objs[0].intoCode;
	var v_custId = objs[0].custId;
	if(!v_objs){
		return;
	}
	var v_ids=v_objs;//v_objs.id;
	var title;
	var isUpload;
	if(type==1){
		title="上传扫描件";
		isUpload="YES";
	}else{
		title="查看扫描件";
		isUpload="NO";
	}
	var url=contextRootPath+'/lbTContractInfo/prepareExecute/uploadAppendixFile?id='+v_ids+'&fkIntoAppId='+v_fkIntoAppId+"&custId="+v_custId +"&isUpload="+isUpload;
	openTab(title,url);
}
//获取选中行的ID
function getIds(alertMsg){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		$("").newMsg({}).show(alertMsg);
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		$("").newMsg({}).show("请选择一条数据！");
		return;
	}
	return v_ids;
}
//以tab形式打开连接
function openTab(title,url) {
	var obj = {
		"title" : title,
		"url" : url
	};
	window.top.tabs.add(obj);
}


