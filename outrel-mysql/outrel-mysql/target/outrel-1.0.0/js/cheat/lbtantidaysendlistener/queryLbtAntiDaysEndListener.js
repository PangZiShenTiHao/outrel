 //执行日终任务
 function doAntiDaysEndTask(syncType, createTime) {
	var url = contextRootPath+ '/lbtAntiDaysEndListener/doAntiManualDaysEndTask';
	var params = "syncType=" + syncType + "&createTime=" + createTime+ "&operateMethod=2";
	//通过ajax保存
	jyAjax(url, params, function(msg) {
		var result = msg.data;
		if(result.indexOf('S') >-1){
		   $("").newMsg({}).show(msg.msg);
		}else{
			jyDialog({"type":"error"}).alert(msg.msg);
		}
		//重新查询监控列表
		queryData();
	});
}
 
//查看明细
 function viewData(vId){
 	var dialogStruct={
 			'display':contextRootPath+'/lbtAntiDaysEndListener/prepareExecute/toView?id='+vId,
 			'width':800,
 			'height':500,
 			'title':'查看明细',
 			'buttons':[
 			 {'text':'关闭','isClose':true}
 			]
 	};
 		
 	var dialogView = jyDialog(dialogStruct).open();
 } 
 
 