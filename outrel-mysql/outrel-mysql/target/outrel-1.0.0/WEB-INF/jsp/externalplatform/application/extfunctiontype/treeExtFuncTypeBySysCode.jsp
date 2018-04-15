<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ include file="/common/StaticJavascript.jsp"%>
<style type="text/css">
	.leftPanel {
		position: absolute;
		left: 2px;
		top: 10px;
		bottom: 2px;
		width: 90%;
		border: 1px solid #CCC9C9;
		border-radius: 5px;
		-moz-border-radius: 5px;
		-webkit-border-radius: 5px;
		background: #FAFAFA;
	}
	
	.leftPanel .innerPanel {
		position: absolute;
		left: 0px;
		top: 10px;
		bottom: 0px;
		right: 0px;
		overflow: auto;
	}
	
	.contentPanel {
		position: absolute;
		left: 310px;
		top: 10px;
		bottom: 2px;
		right: 2px;
		border: 1px solid #CCC9C9;
		border-radius: 5px;
		-moz-border-radius: 5px;
		-webkit-border-radius: 5px;
		background: #FAFAFA;
	}
	
	.leftPanel .titleSwap,.contentPanel .titleSwap {
		display: block;
		margin: -10px 0px 0px 20px;
		text-align: left;
	}
	
	.leftPanel .innerTitle,.contentPanel .innerTitle {
		background: #FAFAFA;
		padding: 0px 5px;
	}
	
	.leftPanel .contentSwap,.contentPanel .contentSwap {
		margin: 5px;
	}
	
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
		margin-top: 6px;
		color: #FF0000;
	}
</style>

<title>树</title>

<div class="leftPanel">
	<div class="titleSwap">
		<!-- <label class="innerTitle">机构树</label> -->
	</div>
	<div class="contentSwap">
		<div class="innerPanel" id="innerPanel">
			<div style="padding-left: 8px;">
				<input type="button" value="分配" onclick="distribute();" />
			</div>
			<div class="ztree" id="treeDemo"></div>
		</div>
	</div>
</div>

<script type="text/javascript">
	var tree;
	jQuery(document).ready(function($) {
	    var treeStr={"disabledLink":false,"isEdit":false,"check":true,"checkChildNodes":false,"url":contextRootPath+'/extFunctionType/queryTreeInfoBySysCode?sysCode=${sysCode}'};
	    tree=$("#innerPanel").jyTree(treeStr);
	    tree.show();
	});
	
	//分配拒贷参数
	function distribute(){
		var nodes = tree.getTree().getCheckedNodes(true);
		var ids = '';
		if(nodes && nodes.length) {
			for(var i=0;i<nodes.length;i++) {
				ids += nodes[i].ID + ',';
			}
		}
		if(ids == '') {
			jyDialog({"type":"info"}).alert("请选择要分配的功能类型！");
			return;
		}
		$.ajax({
	        type:"POST",
	        dataType: "json",
	        url:contextRootPath+"/extFunctionType/distributeFuncType?ids="+ids+"&sysCode=${sysCode}",
	        success:function(msg){
	        	var v_status = msg.status;
	        	if(v_status.indexOf('ok') >-1){
	        		$("").newMsg({}).show(msg.msg);
	        	} else {
	        		$("").newMsg({}).show(msg.msg);
	        	}
				
	        }
	    });
	}
</script>