<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="/product" prefix="pc"%>
<%@ include file="/common/StaticJavascript2.jsp" %>
  
<div id="formPageSwap">
	<div id="providerTree"></div>
</div>

<script type="text/javascript">
	var tree;
	$(document).ready(function() {
		makeupTree();
	});

	function makeupTree() {
		var orgurl=contextRootPath+'/extProviderInterfaceRef/queryTreeInfoByProviderCode?providerCode=${providerCode}';
		var treeStr={"disabledLink":false,"isEdit":false,"check":true,"checkChildNodes":false,"url":orgurl,"loadFun":function(newTree,data) {
			var treeNodes=newTree.getNodes();
			for(var i=0;i<treeNodes.length;i++){
				recursion(newTree,treeNodes[i]);
				newTree.expandNode(treeNodes[i],true); 
			}
		}};
		tree=$("#providerTree").jyTree(treeStr);
		tree.show();
	}	
	
	function recursion(newTree,node1) {
		var tabDatas=iframe.getAllData();
		if(node1&&tabDatas&&tabDatas.length>0) {
			var selectArray=[];
			for(var k=0;k<tabDatas.length;k++) {
				selectArray.push(tabDatas[k]["interfaceNo"]);
			}
			var selectStr=selectArray;
			
			if(selectStr.indexOf(node1["CODE"])>-1) {
				newTree.checkNode(node1, true, false,false);
			}
		}
		
	}
</script>
  
