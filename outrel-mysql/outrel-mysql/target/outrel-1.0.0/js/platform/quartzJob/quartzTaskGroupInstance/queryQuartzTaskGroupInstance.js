//utf-8
//新增页面的保存操作
function pauseData(obj) {
	if (obj.isStop == 0) {
		jyDialog({"type":"info"}).alert("此任务在暂停状态！");
		//alert('此任务在暂停状态');
		return;
	}
	ajaxUrl(obj.groupState,0);
}

function ajaxUrl(no,st,va){
	
	$.ajax({
		type : "POST",
		url : contextRootPath + '/quartzTaskGroupInstance/stopGroupTask?no='
				+ no + '&val='+st+'&type='+va,
		success : function(msg) {
			if(st==0)
				$("").newMsg({}).show("暂停成功");
				//alert('暂停成功');
			else
				$("").newMsg({}).show("运行成功");
				//alert('运行成功');
			queryData();
		}
	});
}
// 删除 事件
function resumeData(obj) {
	if (obj.isStop == 1) {
		jyDialog({"type":"info"}).alert("此任务在运行状态！");
		//alert('此任务在运行状态');
		return;
	}
	ajaxUrl(obj.groupState,1);
}
// 查看明细
function resumeData1(obj) {
	if (obj.isStop == 1) {
		jyDialog({"type":"info"}).alert("此任务在运行状态！");
		//alert('此任务在运行状态');
		return;
	}
	ajaxUrl(obj.groupState,1,1);
}
//手工执行
function runAuto(obj){
	if(obj.autoExec==1){
		jyDialog({"type":"info"}).alert("此任务已经自动执行，请等待执行结果！");
		//alert('此任务已经自动执行，请等待执行结果');
		return;
	}
	$.ajax({
		type : "POST",
		dataType:"json",
		url : contextRootPath + '/quartzTaskGroupInstance/runAutoGroupTask?no='
				+ obj.groupState + '&autoExec='+1,
		success : function(msg) {
			if(msg&&msg.status=="ok"){
				$("").newMsg({}).show("此任务修改为自动执行");
				//alert("此任务修改为自动执行");
				queryData();
			}else{
				$("").newMsg({}).show("此任务修改失败");
				//alert("此任务修改失败");
			}
		}
	});
}

function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/quartzTaskGroupInstance/prepareExecute/toView?batchNo='+vId,
			'width':1200,
			'height':500,
			'title':'查看明细',
			'isIframe':'false',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}