//utf-8

var tree;
function loadUserListPage(nodeId,obj){
//	alert(obj.ID);
	$(window.parent.document).find("#right").attr("src", contextRootPath +"/sysRoleUser/prepareExecute?operateData=toQueryPage&roleId="+obj.ID ); 
//	$(window.parent.document).find("#right").attr("src", contextRootPath +"/sysRoleUser/queryListSysRoleUser?roleId="+obj.ID ); 
}

function loadUserList(orgId){
	$("#contentSwap").load(contextRootPath + "/sysRole/prepareExecute?operateData=toQueryPage"+(roleId!=null?("&roleId="+orgId):""));
}


function loadOrgTree(){
	var treeStr={"disabledLink":false,"isEdit":false,"check":false,"checkChildNodes":false,"url":contextRootPath+'/sysRole/queryTreeSysRole',"addFun":null,"editFun":null,"removeFun":null,"viewFun":loadUserListPage};
	tree=$("#innerPanel").jyTree(treeStr);
	tree.show();
}

//页面加载完后 
$(document).ready(function(){
	
	loadOrgTree();
	//loadUserListPage();
	
});


