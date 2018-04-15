var tree;
function addFun(nodeId,obj){
	if(obj.TYPE==4){
		jyDialog({"type":"warn"}).alert("规则不能添加子节点！");
		//alert("规则不能添加子节点");
		return;
	}else{
		$("#contentSwap").load(contextRootPath+"/sysRuleList/prepareExecute/toAdd?pCode="+obj.ID);
	}
}
function editFun(nodeId,obj){
	$("#contentSwap").load(contextRootPath+"/sysRuleList/prepareExecute/toUpdate?code="+obj.ID);
	}
function removeFun(nodeId,obj){
	$.ajax({
        type:"POST",
        dataType:"json",
        url:contextRootPath+"/sysRuleList/deleteSysRuleList?code="+obj.ID,
        success:function(msg){
        	$("").newMsg({}).show(msg.msg);;
        	var v_status = msg.status;
        	//删除成功后
        	if(v_status.indexOf('ok') >-1){
				tree.remove(obj);
        	}
        }
    });
	}
function viewFun(nodeId,obj){
	if(obj.ID!='0')
		$("#contentSwap").load(contextRootPath+"/sysRuleList/prepareExecute/toView?code="+obj.ID);
	}
function reloadThis(obj){
		tree.addByPojo(obj);
	}
jQuery(document).ready(function($) {
    var treeStr={"disabledLink":false,"isEdit":true,"check":false,"checkChildNodes":false,
    		"url":contextRootPath+"/sysRuleList/queryListSysRuleList",
    		"addFun":addFun,"editFun":editFun,"removeFun":removeFun,"viewFun":viewFun};
    tree=$("#innerPanel").jyTree(treeStr);
    tree.show();
});
function updateSysRuleList(){
		var params=$("#updateNewsFormData").serialize();
		var url=contextRootPath+'/sysRuleList/updateSysRuleList';
		var pid;
		var code = $("#dtoruleCode").val();
		if(code.length==3){
			pid = 0;
		}else{
			pid = code.substring(0,code.length-3);
		}
		var obj = {ID:code, NAME:$("#dtochName").val(), PID:pid , TYPE:$("#dtoruleType").val()} ;
		//通过ajax保存
		jyAjax(
			url,
			params,
			function(msg){
				//新增成功后，
				$("").newMsg({}).show(msg.msg);;
				var v_status = msg.status;
	        	if(v_status.indexOf('ok') >-1){
	        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
	        		reloadThis(obj);
	        	}
	  	});
	}
function saveSysRuleList(){
		var params=$("#addNewsFormData").serialize();
		var url=contextRootPath+'/sysRuleList/insertSysRuleList';
		var pid;
		var code = $("#dtoruleCode").val();
		if(code.length==3){
			pid = 0;
		}else{
			pid = code.substring(0,code.length-3);
		}
		var icon;
		if($("#dtoruleType").val()==1){
			icon=contextRootPath+"/images/compile.gif";
		}else if($("#dtoruleType").val()==2){
				icon=contextRootPath+"/images/ruleset.gif";
		}else if($("#dtoruleType").val()==3){
			icon=contextRootPath+"/images/rulePackage.gif";
		}else if($("#dtoruleType").val()==4){
			icon=contextRootPath+"/images/rule.gif";
		}
		var obj = {ID:code, NAME:$("#dtochName").val(), PID:pid , TYPE:$("#dtoruleType").val(),icon:icon} ;
		//通过ajax保存
		jyAjax(
			url,
			params,
			function(msg){
				//新增成功后，
				$("").newMsg({}).show(msg.msg);;
				var v_status = msg.status;
	        	if(v_status.indexOf('ok') >-1){
	        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
	        		reloadThis(obj);
	        	}
	  	});
	}
	function changeHidden(val){
		var hiddenTr=$("#hiddenTr");
		if(val==3){
			hiddenTr.hide();
		}else{
			hiddenTr.show();
		}
		
	}