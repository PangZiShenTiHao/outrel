//组织结构树
function treeMenuModel(name,name2,orgId,url1,selectType){
	var url;
	if(null != orgId || undefined != orgId){
		url=contextRootPath + '/vmtreeInfo/queryTreeVMOrgByOrgType?orgType=LOAN&orgId=' + orgId;
	}else if(null != url1 || undefined != url1){
		url=contextRootPath + url1;
	}else{
		url=contextRootPath + '/vmtreeInfo/queryVmTreeSysOrg?orgType=LOAN&_orgId=${curUser.orgId}';
	}
	var selType = 'checkbox';
	if("radio" == selectType){
		selType = 'radio';
	}
	$("[name='"+name2+"']").next(".custom-combobox").find("a").treeMenu(
	   			{"treeUrl":url
	   			,"treeType":selType,"disabledLink":"true"
	   			,"treeIdObj":$("[name='"+name+"']")
		   		,"treeNameObj":$("[name='"+name2+"']").next(".custom-combobox").find("input")
		   		,"width":"200"
		   		,"height":"300"});
}

//组织结构树带事件
function treeMenuChange(name,name2,orgId,url1,selectType,valueChange,callBackLoan){
	var url;
	if(null != orgId || undefined != orgId){
		url=contextRootPath + '/vmtreeInfo/queryTreeVMOrgByOrgType?orgType=LOAN&orgId=' + orgId;
	}else if(null != url1 || undefined != url1){
		url=contextRootPath + url1;
	}else{
		url=contextRootPath + '/vmtreeInfo/queryVmTreeSysOrg?orgType=LOAN&_orgId=${curUser.orgId}';
	}
	var selType = 'checkbox';
	if("radio" == selectType){
		selType = 'radio';
	}
	$("[name='"+name2+"']").next(".custom-combobox").find("a").treeMenuLoan(
	   			{"treeUrl":url
	   			,"treeType":selType,"disabledLink":"true"
	   			,"treeIdObj":$("[name='"+name+"']")
		   		,"treeNameObj":$("[name='"+name2+"']").next(".custom-combobox").find("input")
		   		,"width":"200"
		   		,"height":"300"
	   			,"valueChange":callBackLoan
	   			,"callBackLoan":callBackLoan});
}

//值传递改变
function valueChange(name,name2){

	$("select[name='"+name2+"'] + span >input").blur(function(){
			$("input[name='"+name+"']").val($("select[name='"+name2+"'] ").val());
		});

}

//截取数据去除LOAN
function subValue(name){
	
	var valueName = $("[name='"+name+"']").val();
	var valueNames = valueName.split(",");
	var valueNameEnd = "";
	var i;
	for(i = 0;i<valueNames.length;i++){
		var valueNameSub = "";
		if(valueName != ''){
			valueNameSub = valueNames[i].replace(/[^0-9]/g,"");
			valueNameEnd = valueNameEnd + valueNameSub + ",";
		}
		
	}
	valueNameEnd = valueNameEnd.substring(0,valueNameEnd.length-1);
	$("[name='"+name+"']").val(valueNameEnd);
}