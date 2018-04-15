//查看明细
/*function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/lbTIntoInfo/viewCreditInfo?id='+vId,
			'width':1000,
			'height':600,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}
*/

function viewData(v_infId){
	var v_url= contextRootPath;
	v_viewURI = '/dojbpm/jbpmcreditaudit/prepareExecute/toViewAppInfo';
	v_url += encodeURI(v_viewURI);
	v_url = v_url +"?bizInfId="+encodeURI(v_infId);
	window.open(v_url,'viewHistInfoWindow'+v_infId);
}