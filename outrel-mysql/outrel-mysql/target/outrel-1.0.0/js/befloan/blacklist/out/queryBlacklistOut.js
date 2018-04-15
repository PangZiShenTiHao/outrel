/*function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/lbTBlacklistInfo/prepareExecute/toAddOutBlackList',
		'width':700,
		'height':600,
		'title':'黑名单转出申请',
		'isIframe':'false',
		'buttons':[
         {'text':'确定','action':doAddFrom,'isClose':true},
		 {'text':'关闭','isClose':true}
		]
	};
	
	var dialogAdd =jyDialog(dialogStruct).open();
}*/

function rollOutApply() {debugger;
	var objs = iframe.iframeObj["table"].getSelectedObjs();
	
	if(objs&&objs.length) {
		var obj=objs[0];
		var params = "dataType=" + obj.dataType;
		params += "&dataValue=" + obj.dataValue;
		params += "&instruction=" + (obj.instruction?obj.instruction:"");
		params += "&linkIntoId=" + (obj.linkIntoId?obj.linkIntoId:"");
		params += "&blackSource=" + (obj.blackSource?obj.blackSource:"");
		params += "&opType=2";
		params += "&initSystem=" + obj.initSystem; 
		params += "&remark=" + (obj.remark?obj.remark:"");
		
		var url = contextRootPath + '/lbTBlacklistInfo/rolloutBlacklist';
		jyAjax(url, params, function(msg) {
			$("").newMsg({}).show(msg.msg);
			var v_status = msg.status;
			if (v_status.indexOf('ok') > -1) {
				iframe.iframeObj["form"].reset();
				queryData();
			}
		});
	}
}