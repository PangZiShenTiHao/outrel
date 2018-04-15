//查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/lbTContractOperateLog/prepareExecute/toView?id='+vId,
			'width':800,
			'height':500,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}