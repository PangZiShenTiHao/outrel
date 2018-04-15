//utf-8
var dialogAdd;
//点击新增按钮 事件跳转至 新增页面
function toAddData(){
	/*var dialogStruct={
		'display':contextRootPath+'/lbTReconsideration/prepareExecute/toAdd',
		'width':800,
		'height':500,
		'title':'新增',
		'buttons':[
         {'text':'保存','action':doAddFrom,'isClose':true},
		 {'text':'关闭','isClose':true}
		]
	};
	var dialogAdd = jyDialog(dialogStruct).open();*/
	$.dialog({
		id:	'proTaskDialogId',
	    lock: true,
	    width:850,
	    height:500,
	    title:'发起客户复议流程',
	    content: 'url:'+contextRootPath+'/lbTReconsideration/prepareExecute/toAdd',
	    button: [{name: '保存',callback: function(){
                	 doAddFrom();
                	 return false;//触发事件后，不关闭页面
                 	},focus: true
	             },
                 {name: '关闭'}
	         ]
		});
}
//新增页面的保存操作
function doAddFrom(){
	//序列化 新增页面的form表单数据
	//var params=$("#addNewsFormData").serialize();
	var params=$(window.parent.document).find("[name='addDialogId']").contents().find("[id='addNewsFormData']").serialize();
	var url=contextRootPath+'/lbTReconsideration/insertLbTReconsideration';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			alert(msg.msg);
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//关闭窗口 调用弹出页面的 closeWindow方法
        		$(window.parent.document).find("[name='addDialogId']")[0].contentWindow.closeWindow();
        		//queryData();
        	}
  	});
}

//删除 事件
function deleteData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		alert("请选择待删除的数据！");
		return;
	}
	if(confirm("您确认要删除选择的数据吗？")){
        $.ajax({
            type:"POST",
            url:contextRootPath+"/lbTReconsideration/deleteLbTReconsideration?ids="+v_ids,
            success:function(msg){
            	alert(msg.msg);
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		iframe.iframeObj["table"].removeSelectedRow();
            	}
            	
            	
            }
        });
    }
}
//查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/lbTReconsideration/prepareExecute/toUpdate?bizInfId='+vId,
			'width':900,
			'height':550,
			'title':'查看客户复议信息',
			//'isIframe':'false',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
	var dialogView = jyDialog(dialogStruct).open();
}
//查看最新的审批结果意见
function viewAuditResult(v_ids){
	var dialogStruct={
			'display':contextRootPath+'/lbTReconsideration/prepareExecute/toViewAuditResult?intoId='+v_ids,
			'width':1100,
			'height':550,
			/*'isIframe':"false",*/
			'title':'审批意见',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
		};
		
		dialogAdd =jyDialog(dialogStruct);
		dialogAdd.open();
}