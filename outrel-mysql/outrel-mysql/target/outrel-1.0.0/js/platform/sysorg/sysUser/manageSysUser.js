//utf-8

var tree;
function loadUserListPage(nodeId,obj){
	loadUserList((obj!=null?(obj.ID):null));
}

function loadUserList(orgId){
	$("#contentSwap").load(contextRootPath + "/sysUser/prepareExecute/toQueryPage"+(orgId!=null?("?orgId="+orgId):""));
}


function loadOrgTree(){
	var treeStr={"disabledLink":false,"isEdit":false,"check":false,"checkChildNodes":false,"url":contextRootPath+'/sysOrg/queryTreeSysOrg',"addFun":null,"editFun":null,"removeFun":null,"viewFun":loadUserListPage};
	tree=$("#innerPanel").jyTree(treeStr);
	tree.show();
}

//页面加载完后 
$(document).ready(function(){
	
	loadUserListPage();
	
	loadOrgTree();
});


