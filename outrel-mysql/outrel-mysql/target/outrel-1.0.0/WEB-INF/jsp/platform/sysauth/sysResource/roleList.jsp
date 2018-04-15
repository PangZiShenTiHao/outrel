<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
  <title>角色列表</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- 相关js方法 -->
<script>
	var iframe;
	
	//定义form表单 查询 方法
	function queryData(){
		iframe.iframeObj["table"].query();
	}
	//定义 form表单 重置方法
	function resetData(){
		iframe.iframeObj["form"].reset();
	}
	//初始化 查询页面元素
	function initFn(){
		//定义 form表单查询 信息
		 var formStructure={
			// 定义form表单 字段信息
			columns : [
			 {display : ' 角色名称 ', code : 'roleName', width : 150,  type:'text'}
	        ,{display : ' 角色编码 ', code : 'roleCode', width : 150,  type:'text'}
			],
			//定义form 表单 按钮信息
			buttons:[
			 {"text":"查询","fun":queryData,icon:"ui-icon-search"}
			,{"text":"重置","fun":resetData,icon:"ui-icon-extlink"}
			]
		}
		//定义工具条	
		var toolbar={
			title:"查询列表"
		}
		//定义 table 列表信息	
		var tableStructure = {
			//定义table 列表的表头信息
			columns : [
			 {display : ' 角色名称 ', code : 'roleName', width : 160, align : 'left', type:'fun', isOrder : false,
			  value:function (obj){
						return "<a href='javascript:void(0)' onclick='viewData("+obj.id+")'>"+obj.roleName+"</a>";
				    }	 
			 }
			,{display : ' 角色编码 ', code : 'roleCode', width : 100, align : 'left', type:'text', isOrder : false}
		   ],
			url : contextRootPath+"/sysRole/queryListSysRole",
			pageSize : 10,
			selectType : 'radio',
			isCheck : true,
			rownumbers : true,
			pages : [ 10, 20, 30 ],
			trHeight : 30,
			primaryKey:"id",
		    clickFun:selectedRole
		    //checkedFun:selectedRole
		};
		//组装 searchIframe 的相关参数		
		var searchIframe={"toolbar":toolbar,"form":formStructure,"table":tableStructure};	
		//初始化 form 表单 table 列表 及工具条 
		iframe=$("#content").newSearchIframe(searchIframe);
		iframe.show();
	}
	
	//查看明细
	function viewData(vId){
		var dialogStruct={
				'display':contextRootPath+'/sysRole/prepareExecute/toView?id='+vId,
				'width':800,
				'height':500,
				'title':'查看明细',
				'buttons':[
				 {'text':'关闭','isClose':true}
				]
		};
			
		var dialogView = jyDialog(dialogStruct).open();
	}
	
	/**
	 *选中角色行，初始化右测资源树
	 */
	function selectedRole(v){
		var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
		//没有选中则不展示右侧 信息
		if(!v_ids){
			v_ids="-1";
			 var treeStr={"disabledLink":false,"isEdit":false,"check":true,"checkChildNodes":false,"url":contextRootPath + '/sysAcl/querySysAclByRoleId?roleId='+v_ids,"viewFun":viewFun};
			$(".ztree").remove();
			tree=$("#innerPanel").jyTree(treeStr);
			tree.show();
			setTimeout('expandTree()',500);
		}else{
			var treeStr={"disabledLink":false,"isEdit":false,"check":true,"checkChildNodes":false,"url":contextRootPath + '/sysAcl/querySysAclByRoleId?roleId='+v_ids,"viewFun":viewFun};
			$(".ztree").remove();
			tree=$("#innerPanel").jyTree(treeStr);
			tree.show();
			setTimeout('expandTree()',500);
		}
		
	}
	
	
	/**
	 *选中角色行，初始化右测资源树
	 */
	function reloadTree(v){
		var treeStr={"disabledLink":false,"isEdit":false,"check":true,"checkChildNodes":false,"url":contextRootPath + '/sysAcl/querySysAclByRoleId?roleId='+v,"viewFun":viewFun};
		$(".ztree").remove();
		tree=$("#innerPanel").jyTree(treeStr);
		tree.show();
		setTimeout('expandTree()',500);
	}
	
	function expandTree(){
		var zTree = tree.getTree();
		 var nodes = zTree.getNodes();   
	    zTree.expandNode(nodes[0], true); 
	}
	
	/**
	 *刷新树
	 */
	function refresh(selectedNodes){
		var tmp = selectedNodes.split(",");
		var nodes =tree.getTree().getNodes();
		var allnodes = tree.getTree().transformToArray(nodes);
		for(var i=0;i<tmp.length;i++){
			for(var j=0;j<allnodes.length;j++){
				if(tmp[i] == allnodes[j].ID){
					allnodes[j].checked = true;
					tree.getTree().updateNode(allnodes[j]);
			    } 
			}
		}
		
		
	}
</script> 
<script type="text/javascript">
	//页面加载完后 
	$(document).ready(function(){
		//初始化角色
		initFn();
	});
</script>
</head>
<body style="background-color:#FFFFFF">
	<div class="container">
		<div class="leftClass">
			<!-- 角色表-->
			<div id="content" class="contentCls"></div>
		</div>
	</div>
	
</body>

</html>
