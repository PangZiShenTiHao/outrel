//utf-8

var tree;

function loadUserListPage(nodeId,obj){
	//alert(nodeId+","+obj);
	loadUserList((obj!=null?(obj):null));
}

function loadUserList(obj){
	var orgId = null;
	var orgName =null;
	if(obj!=null){
		orgId = obj.ID;
		orgName=obj.NAME;
		orgName = encodeURIComponent(encodeURIComponent(orgName));
	}
	var orgType=$("#orgType").val();
	var data = {};
	if(orgId == null){
		orgId = '0';
	}
	data = {orgName:orgName,orgId:orgId,orgType:orgType};
	//$("#contentSwap").load(contextRootPath + "/vmuserVmorgMap/prepareExecute/toQueryPage"+"?orgType="+orgType+(orgId!=null?("&orgId="+orgId):""));
	$("#contentSwap").load(contextRootPath + "/vmuserVmorgMap/prepareExecute/toQueryPage",data);
}


function loadOrgTree(){
	var orgType=$("#orgType").val();
	var orgId = $("#orgId").val();
	//alert("获取的组织----"+orgType);
	var treeStr={"disabledLink":false,"isEdit":false,"check":false,"checkChildNodes":false,"url":contextRootPath+'/vmtreeInfo/queryTreeVMOrgByOrgType?orgType='+orgType+'&orgId=',"addFun":null,"editFun":null,"removeFun":null,"viewFun":loadUserListPage};
	tree=$("#innerPanel").jyTree(treeStr);
	tree.show();
}

//页面加载完后 
$(document).ready(function(){
	loadOrgTree();
	loadUserListPage();
});


