//新增页面的保存操作
function doAddFrom(){
	//序列化 新增页面的form表单数据
	var params=$("#addNewsFormData").serialize();
	var url=contextRootPath+'/lbTFieldAffirm/insertLbTFieldAffirm';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			window.top.showMessage(msg.msg,1000)
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		queryData();
        	}
  	});
}

//居住地外访（经营场所外访）  value 回退清单的主键
function vistorFun(affrimType,value){
	return function() {
		var custRefId = $("#intoCustRefId").val();
		var params="custRefId="+custRefId +"&type="+affrimType+"&id="+value;
		var url=contextRootPath+'/lbTFieldAffirm/queryBtnByIntoCustRefId';
		var btns ;
		jyAjax(url,params,function(msg){
	        		if(msg.msg=='ok') {
	        			btns = [
	        			        {'text':'保存','action':doAddFrom,'isClose':true},
	        			        {'text':'关闭','isClose':true}
	        			        ]
	        		}else {
	        			btns = [
	        			        {'text':'关闭','isClose':true}
	        			        ]
	        		}
	        		var dialogStruct={
	        				'display':contextRootPath+'/lbTFieldAffirm/queryByIntoCustRefIdAndType?custRefId='+custRefId +"&type="+affrimType+"&fkBackId="+value,
	        				'width':900,
	        				'height':600,
	        				'title':'外访信息',
	        				'isIframe':'false',
	        				'buttons':btns
	        		}
	        		var dialogView = jyDialog(dialogStruct).open();
		  	});
		
	};
}



//报告类型和实地征信主键
function viewReport(reportType,fkbackId){
	//序列化 新增页面的form表单数据
	var url=contextRootPath+'/lbTFieldAffirm/queryVisitReport?custRefId='+$("#intoCustRefId").val() +"&type="+reportType+"&fkBackId="+fkbackId;
	//通过ajax保存
	jyAjax(url,"",
		function(msg){
		if(msg.msg=='ok') {
			var dialogStruct={
    				'display':contextRootPath+'/lbTFieldAffirm/queryByIntoCustRefIdAndType?custRefId='+$("#intoCustRefId").val() +"&type="+reportType+"&fkBackId="+fkbackId,
    				'width':900,
    				'height':800,
    				'title':'实地征信报告',
    				'isIframe':'false',
    				'buttons':[
	        			        {'text':'关闭','isClose':true}
	        			        ]
    		}
    		var dialogView = jyDialog(dialogStruct).open();
		}else{
			$("").newMsg({}).show("暂无该类外访报告！");
		}
  	});
}

//查看

function viewItem(vId){
  return function() {
	var dialogStruct={
			'display':contextRootPath+'/lbTIntoInfo/prepareExecute/affirmLbTIntoInfo?id='+vId+'&operateBtn=view',
			'width':1060,
			'height':750,
			'title':'查看明细',
			/*'isIframe':'false',*/
			'buttons':[{'text':'关闭','isClose':true}]
	};
	var dialogView = jyDialog(dialogStruct).open();
  }
}

//附件
function viewFile(vId){
	var dialogStruct={
			'display':contextRootPath+'/lbTFieldAffirm/prepareExecute/toView?id='+vId,
			'width':900,
			'height':800,
			'title':'经营场所外访',
			'buttons':[
			             {'text':'保存','action':doUpdateFrom,'isClose':true},
						 {'text':'关闭','isClose':true}
						]
	};
	var dialogView = jyDialog(dialogStruct).open();
}