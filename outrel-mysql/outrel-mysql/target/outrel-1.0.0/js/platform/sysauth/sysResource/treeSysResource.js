//utf-8
//点击新增按钮 事件跳转至 新增页面

function addFun(nodeId,obj){
	var dialogStruct={
			'display':contextRootPath+'/sysResource/prepareExecute/toAdd?pid='+obj.ID+'&pids='+obj.PIDS+'&type='+obj.TYPE,
			'width':600,
			'height':400,
			'title':'新增',
			'isIframe':'true',
			'buttons':[
	         {'text':'保存','action':doAddFrom,'isClose':true},
			 {'text':'关闭','isClose':true}
			]
		};
	 dialogAdd =jyDialog(dialogStruct);
	 dialogAdd.open();
}

//编辑
function editFun(nodeId,obj){
	var dialogStruct={
			'display':contextRootPath+'/sysResource/prepareExecute/toUpdate?id='+obj.ID+'&type='+obj.TYPE,
			'width':600,
			'height':400,
			'title':'修改',
			'isIframe':'true',
			'buttons':[
             {'text':'保存','action':doUpdateFrom,'isClose':true},
			 {'text':'关闭','isClose':true}
			]
		};
    dialogUpdate = jyDialog(dialogStruct);
	dialogUpdate.open();
}

//新增页面的保存操作
function doAddFrom(){
	//序列化 新增页面的form表单数据
	var form = dialogAdd.iframe.contentDocument.getElementById("addNewsFormData");
	if (checkIsNull(form)) {
		 var params= $(form).serialize();
			
			var url=contextRootPath+'/sysResource/insertSysResource';
			//通过ajax保存
			jyAjax(
				url,
				params,
				function(msg){
					//新增成功后，
					$("").newMsg({}).show(msg.msg);;
					var v_status = msg.status;
		        	if(v_status.indexOf('ok') >-1){
		        		tree.addByPojo(msg.data);
		        	}
		  	});
	}else{
		jyDialog({"type":"warn"}).alert("请完整的填写数据！");
		//alert("请完整的填写数据");
		return;
	}
	
   
}
//修改页面 的 保存操作
function doUpdateFrom(){
	//序列化 新增页面的form表单数据
	var form = dialogUpdate.iframe.contentDocument.getElementById("updateNewsFormData");
	if (checkIsNull(form)) {
		var params= $(form).serialize();
		var url=contextRootPath+'/sysResource/updateSysResource';
		//通过ajax保存
		jyAjax(
			url,
			params,
			function(msg){
				//保存成功后，执行查询页面查询方法
				$("").newMsg({}).show(msg.msg);;
	        	var v_status = msg.status;
	        	if(v_status.indexOf('ok') >-1){
	        		tree.edit(msg.data);
	        	}
	  	});
	}else{
		jyDialog({"type":"warn"}).alert("请完整的填写数据！");
		//alert("请完整的填写数据");
		return;
	}
	
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

//删除
function removeFun(nodeId,obj){
	jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
		var url=contextRootPath+"/sysResource/deleteSysResource?ids="+obj.ID;
		
		jyAjax(
				url,
				"",
				function(msg){
					$("").newMsg({}).show(msg.msg);;
					var v_status = msg.status;
	            	//删除成功后
	            	if(v_status.indexOf('ok') >-1){
	            		tree.remove(obj);
	            	}
		  	});
	   },"确认提示");
	
	
	/*if(confirm("您确认要删除选择的数据吗？")){
		
		var url=contextRootPath+"/sysResource/deleteSysResource?ids="+obj.ID;
		
		jyAjax(
				url,
				"",
				function(msg){
					$("").newMsg({}).show(msg.msg);;
					var v_status = msg.status;
	            	//删除成功后
	            	if(v_status.indexOf('ok') >-1){
	            		tree.remove(obj);
	            	}
		  	});
		
//        $.ajax({
//            type:"POST",
//            url:contextRootPath+"/sysResource/deleteSysResource?ids="+obj.ID,
//            success:function(msg){
//            	//if(msg.msg != undefined){
//            		$("").newMsg({}).show(msg.msg);;
//            	//}
//            	var v_status = msg.status;
//            	//删除成功后
//            	if(v_status.indexOf('ok') >-1){
//            		tree.remove(obj);
//            	}
//            }
//        });
    }*/
}

var tree;
jQuery(document).ready(function($) {
    var treeStr={"disabledLink":false,"isEdit":true,"check":false,"checkChildNodes":false,"url":contextRootPath+'/sysResource/queryTreeSysResource',"addFun":addFun,"editFun":editFun,"removeFun":removeFun};
    tree=$("#innerPanel").jyTree(treeStr);
    tree.show();
    setTimeout('expandTree()',500);//展开根节点，采用延时是因为此时树可能没有创建完成
});

function expandTree(){
	var zTree = tree.getTree();
	var nodes=zTree.getNodes();
    zTree.expandNode(nodes[0],true);
}