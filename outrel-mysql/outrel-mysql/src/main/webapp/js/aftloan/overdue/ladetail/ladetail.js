//utf-8
var dialog;

function toReservationProcessing(id){
	
	$.dialog({
		id:	'reservationProcessingView',
	    lock: true,
	    width:300,
	    height:250,
	    zIndex: 5999,
	    title:'约定处理',
	    content: 'url:'+contextRootPath+"/overdue/toReservationProcessing?id="+id
//	    button: [{name: '保存',callback: function(){
//	    	addReservationProcessing();
//                	 return false;//触发事件后，不关闭页面
//                 	},focus: true
//	             },
//                 {name: '关闭'}
//	         ]
		});
//	var dialogStruct={"title":"约定处理","display":contextRootPath+"/overdue/toReservationProcessing?id="+id,"width":"400","height":"300","buttons":[{"text":"保存","action":addReservationProcessing,"isClose":false},{"text":"关闭","isClose":true}]};
//	dialog=jyDialog(dialogStruct);
//	dialog.open();
}

function addReservationProcessing(){
	jyDialog({"type":"warn"}).alert($(window.parent.document)[0]);
//	var datAdd = $("#datAddStr",$(window.parent.document).find("[name='reservationProcessingView']").contentDocument).val();
//	
//	if(datAdd==""){
//		alert("约定时间不能为空");
//		return ;
//	}
//	var params = $("#addTclPopup",$(window.parent.document).find("[name='reservationProcessingView']").contentDocument).serialize();
//	alert(params);
//	var url=contextRootPath+"/overdue/addReservationProcessing";
//	jyAjax(url,params,function(result){
//		alert(result.msg);
//	})
}


// 弹出催收客户联系信息变更界面
function editCusTel(obj){
	if(obj == ""||obj==undefined){
		jyDialog({"type":"warn"}).alert("客户编码不能为空！");
		return;
	}
	var dd=new Date().getTime();
	$.dialog({
		id:	'flowSubmitView',
	    lock: true,
	    width:1320,
	    zIndex: 5999,
	    height:550,
	    title:'修改客户联系信息',
	    content: 'url:'+contextRootPath+'/laTCustinfochange/prepareExecute/toUpdateInsert?custCode='+obj+'&t='+dd,
//	    button: [{name: '保存',callback: function(){
//	    	addFlowSubmit();
//                	 return false;//触发事件后，不关闭页面
//                 	},focus: true
//	             },
//                 {name: '关闭'}
//	         ]
		});
}

function custaghistory(id){
	$.dialog({
		id:	'custaghistoryView',
	    lock: true,
	    width:1100,
	    zIndex: 5999,
	    height:500,
	    title:'历史标签',
	    content: 'url:'+contextRootPath+'/laTCusttagrec/prepareExecute/toQueryPage?id='+id
		});
}

function editProInfo(id){
	$.dialog({
		id:	'editProInfoView',
	    lock: true,
	    width:1100,
	    zIndex: 5999,
	    height:600,
	    title:'承诺还款信息',
	    content: 'url:'+contextRootPath+'/laTPromrepayment/prepareExecute/toQueryPage?id='+id
		});
}

function flowSubmit(id){
	$.dialog({
		id:	'flowSubmitView',
	    lock: true,
	    width:400,
	    zIndex: 5999,
	    height:300,
	    title:'流程提交',
	    content: 'url:'+contextRootPath+'/overdue/toFlowSubmit?id='+id
//	    button: [{name: '保存',callback: function(){
//	    	addFlowSubmit();
//                	 return false;//触发事件后，不关闭页面
//                 	},focus: true
//	             },
//                 {name: '关闭'}
//	         ]
		});
}

//查看明细
function openDetail(id,appId,proId,cusId){
	if (typeof(appId) == "undefined") { 
	   jyDialog({"type":"warn"}).alert("进件号为空，无法查询！");
	   return ;
	}
	var dialogStruct={
			'display':contextRootPath+'/overdue/toDunCaseDetail?id='+id+'&appId='+appId+'&proId='+proId+'&cusId='+cusId,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}
