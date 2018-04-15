<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib uri="/product" prefix="pc"%>
<%@ include file="/common/StaticJavascript2.jsp" %>
  
<div id="formPageSwap">
	<div id="funcTree"></div>
</div>

<script type="text/javascript">
	var tree;
	$(document).ready(function() {
		makeupTree();
	});

	function makeupTree() {
		var orgurl=contextRootPath+'/extFunctionType/queryTreeInfoBySysCode?sysCode=${sysCode}';
		var treeStr={"disabledLink":false,"isEdit":false,"check":true,"checkChildNodes":false,"url":orgurl,"loadFun":function(newTree,data) {
			var treeNodes=newTree.getNodes();
			for(var i=0;i<treeNodes.length;i++){
				recursion(newTree,treeNodes[i]);
				newTree.expandNode(treeNodes[i],true); 
			}
		}};
		tree=$("#funcTree").jyTree(treeStr);
		tree.show();
	}	
	
	function recursion(newTree,node1) {
		var tabDatas=funcTable.getAllData();
		if(node1&&tabDatas&&tabDatas.length>0) {
			var selectArray=[];
			for(var k=0;k<tabDatas.length;k++) {
				selectArray.push(tabDatas[k]["FUNC_CODE"]);
			}
			var selectStr=selectArray;
			
			var twoNodes=node1.children;
			if(selectStr.length>0) {
				newTree.checkNode(node1, true, false,false);
			}
			if(twoNodes&&twoNodes.length>0) {
				for(var i=0;i<twoNodes.length;i++){
					var node2=twoNodes[i];
					if(selectStr.indexOf(node2["CODE"])>-1) {
						newTree.checkNode(node1, true, false,false);
						newTree.checkNode(node2, true, false,false);
					}
					var threeNodes=node2.children;
					if(threeNodes&&threeNodes.length>0) {
						for(var j=0;j<threeNodes.length;j++){
							var node3=threeNodes[j];
							if(selectStr.indexOf(node3["CODE"])>-1) {
									newTree.checkNode(node1, true, false,false);
									newTree.checkNode(node2, true, false,false);
									newTree.checkNode(node3, true, false,false);
								}
							var fourNodes = node3.children;
							if(fourNodes&&fourNodes.length>0) {
								for(var m=0;m<fourNodes.length;m++){
									var node4=fourNodes[m];
									if(selectStr.indexOf(node4["CODE"])>-1) {
										newTree.checkNode(node1, true, false,false);
										newTree.checkNode(node2, true, false,false);
										newTree.checkNode(node3, true, false,false);
										newTree.checkNode(node4, true, false,false);
									}
									var fiveNodes = node4.children;
									if(fiveNodes&&fiveNodes.length>0) {
										
										for(var n=0;n<fiveNodes.length;n++){
											var node5=fiveNodes[n];
											
											if(selectStr.indexOf(node5["CODE"])>-1) {
												newTree.checkNode(node1, true, false,false);
												newTree.checkNode(node2, true, false,false);
												newTree.checkNode(node3, true, false,false);
												newTree.checkNode(node4, true, false,false);
												newTree.checkNode(node5, true, false,false);
											}
											var sixNodes = node5.children;
											if(sixNodes&&sixNodes.length>0) {
												for(var h=0;h<sixNodes.length;h++){
													var node6=sixNodes[h];
													if(selectStr.indexOf(node6["CODE"])>-1) {
														newTree.checkNode(node1, true, false,false);
														newTree.checkNode(node2, true, false,false);
														newTree.checkNode(node3, true, false,false);
														newTree.checkNode(node4, true, false,false);
														newTree.checkNode(node5, true, false,false);
														newTree.checkNode(node6, true, false,false);
													}
													
													var sevenNodes = node6.children;
													if(sevenNodes&&sevenNodes.length>0) {
														for(var g=0;g<sevenNodes.length;g++){
															var node7=sevenNodes[g];
															if(selectStr.indexOf(node7["CODE"])>-1) {
																newTree.checkNode(node1, true, false,false);
																newTree.checkNode(node2, true, false,false);
																newTree.checkNode(node3, true, false,false);
																newTree.checkNode(node4, true, false,false);
																newTree.checkNode(node5, true, false,false);
																newTree.checkNode(node6, true, false,false);
																newTree.checkNode(node7, true, false,false);
															}
															var eightNodes = node7.children;
															if(eightNodes&&eightNodes.length>0) {
																for(var p=0;p<eightNodes.length;p++){
																	var node8=eightNodes[p];
																	if(selectStr.indexOf(node8["CODE"])>-1) {
																		newTree.checkNode(node1, true, false,false);
																		newTree.checkNode(node2, true, false,false);
																		newTree.checkNode(node3, true, false,false);
																		newTree.checkNode(node4, true, false,false);
																		newTree.checkNode(node5, true, false,false);
																		newTree.checkNode(node6, true, false,false);
																		newTree.checkNode(node7, true, false,false);
																		newTree.checkNode(node8, true, false,false);
																	}
																}
															}
														}
													}
												}
											}
										}
									}
									
								}
							}
						}
					}
				}
			}
		}
		
	}
</script>
  
