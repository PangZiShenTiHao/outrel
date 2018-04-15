var tree;
function loadUserListPage(nodeId,obj,type){
	var type = $("#typeID").val();
	loadUserList((obj!=null?(obj.ID):null),type);
}

function loadUserList(orgId,type){
	
	if(type == 0){
		$("#contentSwap").load(contextRootPath + "/lbtAreaOrgRef/prepareExecute/toManagePage"+(orgId!=null?("?orgId="+orgId):""));
	}else if(type == 1){
		$("#contentSwap").load(contextRootPath + "/lbtStoreProClasfRef/prepareExecute/toManagePage"+(orgId!=null?("?orgId="+orgId):""));
	}
	
}


function loadOrgTree(){
	var treeStr={"disabledLink":false,"isEdit":false,"check":false,"checkChildNodes":false,"url":contextRootPath+'/sysOrg/queryTreeSysOrg?a=a&orgId=301',"addFun":null,"editFun":null,"removeFun":null,"viewFun":loadUserListPage};
	tree=$("#innerPanel").jyTree(treeStr);
	tree.show();
}

//页面加载完后 
$(document).ready(function(){
	var v_type = $("#typeID").val();
	loadUserListPage('','',v_type);
	//loadUserListPage(v_type);
	loadOrgTree();
});

