 function selectDepart(obj,orgType){
		//取到元素id
	 if(orgType==undefined) orgType='CS';
	   var fillElementId = $(obj).attr("id");
		var dialogStruct={
				'display':contextRootPath+'/vmtreeInfo/prepareExecute/toSelectTree?fillElementId='+fillElementId+'&url=/vmtreeInfo/queryTreeVMOrgByOrgType?orgType='+orgType,
				'width':400,
				'height':320,
				'title':'请选择催收组',
				'isIframe':'false',
				'buttons':[]
			};
			dialogOrgSelect =jyDialog(dialogStruct);
			dialogOrgSelect.open();
}