//utf-8
//点击新增按钮 事件跳转至 新增页面

var dialogAddObj;

function manualDivide(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		//jyDialog({"type":"info"}).alert("请选择待修改的数据！");
		$("").newMsg({}).show("请选择待操作的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		//jyDialog({"type":"info"}).alert("请选择一条数据！");
		$("").newMsg({}).show("请选择一条数据！");
		return;
	}

	var dialogStruct={
		'display':contextRootPath+'/lbtAreaOrgRef/prepareExecute/toUpdateOrgId?intoId='+v_ids,
		'width':400,
		'height':600,
		'title':'手动分单',
		//'isIframe':'false',
		'buttons':[
         {'text':'保存','action':doUpdateOrgIdFrom,'isClose':true},
		 {'text':'关闭','isClose':true}
		]
	};
	
	
	dialogAddObj =jyDialog(dialogStruct);
	dialogAddObj.open();
}
//新增页面的保存操作
function doUpdateOrgIdFrom(){
	var obj = dialogAddObj.getIframe();
	var v_intoId = obj.$("#intoId").val();
	var v_orgCode = obj.$("#dtoorgCode").val();
	if(v_orgCode == ""){
		
		//jyDialog({"type":"info"}).alert("请选择门店！");
		$("").newMsg({}).show("请选择门店！");
		//return;
	}else{
		var formName="addNewsInfoFormData";
		if(!(checkIsNull(formName)&&checkFormFormat(formName))) {
			return;
		}
		//序列化 新增页面的form表单数据
		//if(!checkIsNull($("#addNewsFormData"))) return;
		var params=obj.$("#addNewsInfoFormData").serialize();
		var url=contextRootPath+'/lbtAreaOrgRef/toUpdateOrgIdInfo?intoId='+v_intoId;
		//通过ajax保存
		jyAjax(
			url,
			params,
			function(msg){
				//新增成功后，
				$("").newMsg({}).show(msg.msg);
				var v_status = msg.status;
	        	if(v_status.indexOf('ok') >-1){
	        		//dialogAdd.close();
	        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
	        		queryData();
	        	}
	  	});
	}
}

//查看明细
function viewDataByIntoAppId(vId,intoAppId){
	var title="查看进件信息("+intoAppId+")";
	var url=contextRootPath+'/lbTIntoInfo/prepareExecute/viewLbTIntoInfo?id='+vId+'&operateBtn=view&tabTitle='+title;
	
	var obj = {
			"title" : title,
			"url" : url
	};
	window.top.tabs.add(obj);
}

