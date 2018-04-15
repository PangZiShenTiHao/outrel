//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdateObj;
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/lbtDecisionModuleType/prepareExecute/toAdd',
		'width':800,
		'height':500,
		'title':'新增',
		'buttons':[
         {'text':'保存','action':doAddFrom,'isClose':true},
		 {'text':'关闭','isClose':true}
		]
	};
	
	dialogAddObj=jyDialog(dialogStruct);
	dialogAddObj.open();
}

//新增页面的保存操作
function doAddFrom(){
	//序列化 新增页面的form表单数据
	var params=$("#addNewsFormData").serialize();
	var url=contextRootPath+'/lbtDecisionModuleType/insertLbtDecisionModuleType';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			alert(msg.msg);
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		tree.addByPojo(msg.data);
        	}
  	});
}

//修改页面 的 保存操作
function doUpdateFrom(nodeId,obj){
	return function(){
		//序列化 新增页面的form表单数据
		var params=$("#updateNewsFormData").serialize();
		var url=contextRootPath+'/lbtDecisionModuleType/updateLbtDecisionModuleType';
		//通过ajax保存
		jyAjax(
			url,
			params,
			function(msg){
				//保存成功后，执行查询页面查询方法
				alert(msg.msg);
				debugger;
	        	var v_status = msg.status;
	        	if(v_status.indexOf('ok') >-1){
	        		if(msg.data.validateState == '1') {
	        			tree.edit(msg.data);
	        		} else {
	        			tree.remove(obj);
	        		}
	        	}
	  	});
	}
}

//查看
function viewFun(nodeId,obj){
	var dialogStruct={
			'display':contextRootPath+'/lbtDecisionModuleType/prepareExecute/toView?id='+obj.ID,
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
	if(confirm("您确认要删除选择的数据吗？")){
        $.ajax({
            type:"POST",
            dataType: "json",
            url:contextRootPath+"/lbtDecisionModuleType/deleteLbtDecisionModuleType?ids="+obj.ID,
            success:function(msg){
            	alert(msg.msg);
            	debugger;
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		tree.remove(obj);
            	}
            }
        });
    }
}

