//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAdd;
//修改 事件
function toUpdateData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		alert("请选择待修改的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		alert("请选择一条数据！");
		return;
	}
		
	$.dialog({
		id:	'addDialogId',
	    lock: true,
	    width:100,
	    height:500,
	    title:'修改信审员授权额度',
	    content: 'url:'+contextRootPath+'/lbTCalPhoneLog/prepareExecute/toUpdate?id='+v_ids,
	    button: [{name: '保存',callback: function(){
	    			doUpdateFrom();
                	 return false;//触发事件后，不关闭页面
                 	},focus: true
	             },
                 {name: '关闭'}
	         ]
		});
}
//修改页面 的 保存操作
function doUpdateFrom(){
	var params=$(window.parent.document).find("[name='addDialogId']").contents().find("[id='updateNewsFormData']").serialize();
	var url=contextRootPath+'/lbTCalPhoneLog/updateLbTCalPhoneLog';
	//通过ajax更新数据
	jyAjax(
		url,
		params,
		function(msg){
			//更新成功后，
			$("").newMsg({}).show(msg.msg);
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//关闭窗口 调用弹出页面的 closeWindow方法
        		$(window.parent.document).find("[name='addDialogId']")[0].contentWindow.closeWindow();
        	}
  	});
}

//编辑
var dialogView ;
function showEditData(vId,conName, conRelation, contactType ,phone, custIntoRefId,custId,prodId,intoId,transCode,editInfo){
	var url=contextRootPath+'/lbTCalPhoneLog/prepareExecute/toViewInfo?surverMainId='+vId+"&custIntoRefId="+custIntoRefId+"&conName="+encodeURI(conName)+"&relation="+conRelation+"&contactType="+contactType+"&phone="+phone+
	"&custId="+custId+"&prodId="+prodId+"&intoId="+intoId+"&transCode="+transCode+"&editInfo="+editInfo;
	var title='电联调查';
	window.top.windowTopDialog_(url,title,function(dialogObj){
		 saveAllData(dialogObj);
	 },function(){
		 queryData();
	 });
}

//查看
var dialogView ;
function showViewData(vId,conName, conRelation, contactType ,phone, custIntoRefId,custId,prodId,intoId,transCode,editInfo){
	var url=contextRootPath+'/lbTCalPhoneLog/prepareExecute/toViewInfo?surverMainId='+vId+"&custIntoRefId="+custIntoRefId+"&conName="+encodeURI(conName)+"&relation="+conRelation+"&contactType="+contactType+"&phone="+phone+
	"&custId="+custId+"&prodId="+prodId+"&intoId="+intoId+"&transCode="+transCode+"&editInfo="+editInfo;
	var title='电联调查';
	var dialogStruct={
			'display':url,
			'title':title,
			'width':900,
			'height':500,
			'modal':false,
			'buttons':[
			           {'text':'关闭','isClose':true}
			 ]
	};
//	TopDialog =jyDialog(dialogStruct);
//	TopDialog.open();
	
	window.top.windowTopDialog(dialogStruct);
}


/**
 * 保存方法
 */
function saveAllData(dialogObj){
	iframeObj = dialogObj.getIframe();
	iframeObj.saveData();
	iframeObj.saveNewData();
}


function expandToggle(){
	$("#formSwap").bind("click",function(ev){
		var obj=ev.srcElement || ev.target;
		var endObj=$(obj);
		var nextObj=endObj.parent().next();
		if(obj.tagName=="SPAN"&&endObj.hasClass("expandBtn")){
			if(endObj.hasClass("expandOver")){
				endObj.removeClass("expandOver");
				nextObj.show("blind");
			}else{
				endObj.addClass("expandOver");
				nextObj.hide("blind");
			}
		}
	});
}