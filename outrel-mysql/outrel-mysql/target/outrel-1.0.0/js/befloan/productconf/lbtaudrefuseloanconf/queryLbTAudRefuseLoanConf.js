//utf-8

//新增页面的保存操作
function doAddFrom(){
	//序列化 新增页面的form表单数据
	var params=$("#addNewsFormData").serialize();
	var url=contextRootPath+'/lbTAudRefuseLoanConf/insertLbTAudRefuseLoanConf';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			alert(msg.msg);
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		tree.addByPojo(msg.data);
        		dialog.close();
        	}
  	});
}
//修改页面 的 保存操作
function doUpdateFrom(nodeId,obj){
	return function(){
		//序列化 新增页面的form表单数据
		var params=$("#updateNewsFormData").serialize();
		var url=contextRootPath+'/lbTAudRefuseLoanConf/updateLbTAudRefuseLoanConf';
		//通过ajax保存
		jyAjax(
			url,
			params,
			function(msg){
				//保存成功后，执行查询页面查询方法
				alert(msg.msg);
	        	var v_status = msg.status;
	        	if(v_status.indexOf('ok') >-1){
	        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
	        		tree.edit(msg.data);
	        		dialog.close();
	        	}
	  	});
	}
}

//查看
function viewFun(nodeId,obj){
	var dialogStruct={
			'display':contextRootPath+'/lbTAudRefuseLoanConf/prepareExecute/toView?id='+obj.ID,
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
	//序列化 新增页面的form表单数据
	var params={"id":obj.ID}
	var url=contextRootPath+"/lbTAudRefuseLoanConf/deleteLbTAudRefuseLoanConf";
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
        	alert(msg.msg);
        	var v_status = msg.status;
        	//删除成功后
        	if(v_status.indexOf('ok') >-1){
        		tree.remove(obj);
        	}
        });
}