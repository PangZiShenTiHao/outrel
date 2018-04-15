//查看明细
function viewData(intoId,hitIntoId){
	debugger;
	var dialogStruct={
			'display':contextRootPath+'/lbtAntiFreezeDetail/prepareExecute/toQueryPage?fkIntoId='+intoId+"&hitIntoId="+hitIntoId,
			'width':800,
			'height':500,
			'title':'查看欺诈处理详情',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
	var dialogView = jyDialog(dialogStruct).open();
}