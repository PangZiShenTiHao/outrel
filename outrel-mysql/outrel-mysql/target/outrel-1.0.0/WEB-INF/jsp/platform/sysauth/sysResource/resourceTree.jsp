<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" >
<head>
  <title>资源树</title>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- 相关js方法 -->
<script type="text/javascript">
	//页面加载完后 
	var tree;
	$(document).ready(function(){
		//初始化资源树
		var treeStr={"disabledLink":false,"isEdit":false,"check":true,"checkChildNodes":false,"url":contextRootPath+'/sysResource/queryTreeSysResource',"viewFun":viewFun};
	    tree=$("#innerPanel").jyTree(treeStr);
	    tree.show();
	    setTimeout('expandTree()',500);
	});
	
	function expandTree(){
		var zTree = tree.getTree();
		var nodes = zTree.getNodes();
		zTree.expandNode(nodes[0],true);
	}
	
	//查看
	function viewFun(nodeId,obj){
		var dialogStruct={
				'display':contextRootPath+'/sysResource/prepareExecute/toView?id='+obj.ID,
				'width':800,
				'height':500,
				'title':'查看明细',
				'buttons':[
				 {'text':'关闭','isClose':true}
				]
		};
		var dialogView = jyDialog(dialogStruct).open();
	}
	
	//保存
	$('#saveRoleResource').bind('click',function(){
		//获取所选择的角色
		var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
		if(v_ids == ""){
			jyDialog({"type":"info"}).alert("请选择角色！");
			return;
		}
		//获取树的节点
		var nodes =tree.getTree().getCheckedNodes();
/* 		if ( nodes.length == 0) {
			alert("请先选择一个资源");
			return ;
		} */
		var nodeIdArray = [];
		for(var i=0, l=nodes.length; i<l; i++){
			nodeIdArray[i]= nodes[i].ID;
		}
		
		
		var parmas = {'roleid':v_ids,'resoureids':nodeIdArray.join(",")};
		
		$.ajax({
			url: contextRootPath + '/sysAcl/saveSysAcl',
			type: 'POST',
			async: false,
			dataType: 'json',
			data: {
				roleId: v_ids,
				resourceIds:nodeIdArray.join(","),
				t:new Date().getTime()
			},
			error: function() {
				$("").newMsg({}).show("保存错误");
				//alert('保存错误');
			},
			success: function(result) {
				//alert(result.msg);
				$("").newMsg({}).show(result.msg);
				reloadTree(v_ids);
			}
		});
		
		
	});
	//取消
	$('#cancelRoleResource').bind('click',function(){
		selectedRole();
	});	
	
</script>
<style type="text/css">
	 .ztree li span.button.add {
            margin-left: 2px;
            margin-right: -1px;
            background-position: -144px 0;
            vertical-align: top;
        }
        .ztree li span.button.all {
            margin-left: 2px;
            margin-right: -1px;
            background-position: -1026px 0;
            vertical-align: top;
        }
        .ztree li span.button.all a {
            margin-top:6px;
            color:#FF0000;
        }
        .optcls{
        	height:300px;
            text-align:center;
            position:absolute;
            margin-left:40%;
        	margin-bottom:10px;
        }
        .innerPanel{
        	min-height:300px;
        }
</style>
</head>
<body style="background-color:#FFFFFF">
			<div class="innerPanel  resizable  ui-widget-content ui-corner-all ui-resizable" id="innerPanel">
				  <div>
				  	<h3 class="ui-widget-header ui-corner-all">
				  		<div class="titleSpan">资源树</div>
				  	</h3>
				  </div>	
				  <div>
				  	<div class="rTree">
				  		<div class="ztree" id="treeDemo"></div>
				  	</div>
				    <div  class="opt">
				    	<div class="saveBtn optcls">
					      <button id="saveRoleResource" type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button"><span class="ui-button-text">保存</span></button>
					      <button id="cancelRoleResource" type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only" role="button"><span class="ui-button-text">取消</span></button>
						</div>
				    </div> 
				  </div>
			      
			</div>
</body>
</html>
