//utf-8

var tree;
function loadUserListPage(nodeId,obj){
	loadUserList((obj!=null?(obj.ID):null));
}

function loadUserList(acceptStore){
	$("#contentSwap").load(contextRootPath + "/handelMonitor/prepareExecute/searchInfoAuditeState"+(acceptStore!=null?("?acceptStore="+acceptStore):""));
}


function loadOrgTree(){
	var treeStr={"disabledLink":false,"isEdit":false,"check":false,"checkChildNodes":false,"url":contextRootPath+'/handelMonitor/queryTreeSysOrg',"addFun":null,"editFun":null,"removeFun":null,"viewFun":loadUserListPage};
	tree=$("#innerPanel").jyTree(treeStr);
	tree.show();
}

//页面加载完后 
$(document).ready(function(){
	
	loadUserListPage();
	
	loadOrgTree();
});


