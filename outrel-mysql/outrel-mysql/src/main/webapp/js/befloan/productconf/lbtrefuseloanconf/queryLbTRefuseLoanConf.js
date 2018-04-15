//utf-8
//点击新增按钮 事件跳转至 新增页面
/*function toAddData(prodId){
	var dialogStruct={
		'display':contextRootPath+'/lbTRefuseLoanConf/prepareExecute/toAdd?prodId='+prodId,
		'width':800,
		'height':500,
		'title':'新增',
		'isIframe':"false",
		'buttons':[
         {'text':'保存','action':doAddFrom,'isClose':true},
		 {'text':'关闭','isClose':true}
		]
	};
	
	var dialogAdd =jyDialog(dialogStruct).open();
}*/


//新增页面的保存操作
function doAddFrom(){
	//序列化 新增页面的form表单数据
	var params=$("#addNewsFormData").serialize();
	var url=contextRootPath+'/lbTRefuseLoanConf/insertLbTRefuseLoanConf';
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
/*//修改 事件
function toUpdateData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		alert("请选择待修改的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		alert("请选择一条数据！");
		return;
	}

	var dialogStruct={
			'display':contextRootPath+'/lbTRefuseLoanConf/prepareExecute/toUpdate?id='+v_ids,
			'width':800,
			'height':500,
			'title':'修改',
			'isIframe':"false",
			'buttons':[
             {'text':'保存','action':doUpdateFrom,'isClose':true},
			 {'text':'关闭','isClose':true}
			]
		};
		
	var dialogUpdate = jyDialog(dialogStruct).open();
}*/
//修改页面 的 保存操作
function doUpdateFrom(nodeId,obj){
	return function(){
		//序列化 新增页面的form表单数据
		var params=$("#updateNewsFormData").serialize();
		var url=contextRootPath+'/lbTRefuseLoanConf/updateLbTRefuseLoanConf';
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
			'display':contextRootPath+'/lbTRefuseLoanConf/prepareExecute/toView?id='+obj.ID,
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
	var url=contextRootPath+"/lbTRefuseLoanConf/deleteLbTRefuseLoanConf";
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
   /* $.ajax({
        type:"POST",         
        url:contextRootPath+"/lbTRefuseLoanConf/deleteLbTRefuseLoanConf?id="+obj.ID,
        success:function(msg){
        	alert(msg.msg);
        	var v_status = msg.status;
        	//删除成功后
        	if(v_status.indexOf('ok') >-1){
        		tree.remove(obj);
        	}
        }
    });*/
}