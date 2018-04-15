//utf-8
var dialog;

//点击新增按钮 事件跳转至 新增页面
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/laTAgent/prepareExecute/toAdd',
		'width':800,
		'height':500,
		'title':'临时代理',
		'buttons':[
         {'text':'保存','action':doAddFrom,'isClose':true},
		 {'text':'关闭','isClose':true}
		]
	};
	
	
	dialog =jyDialog(dialogStruct);
	dialog.open();
}
//新增页面的保存操作
function doAddFrom(){
	//序列化 新增页面的form表单数据
	//var params=$("#addNewsFormData").serialize();
	var params=$(dialog.iframe.contentDocument.getElementById("addNewsFormData")).serialize();
	var url=contextRootPath+'/laTAgent/insertLaTAgent';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			
			//jyDialog({"type":"success"}).alert(msg.msg);
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		$("").newMsg({}).show(msg.msg);
        		queryData();
        	}
  	});
}


//临时代理添加 事件
function toSingleLaTAgent(){
	
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择要代理的案件！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"info"}).alert("请选择一条数据！");
		return;
	}
	
	var agents=iframe.iframeObj["table"].getSelectedObjs();
     if(agents[0].IS_AGENT=='Y'){
    	 jyDialog({"type":"info"}).alert("合同号"+agents[0].CONTRACT_ID+'已经代理不能再做代理，请重新选择');  
		  return;
	 }
	
	var dialogStruct={
			'display':contextRootPath+'/laTAgent/prepareExecute/toSingle?id='+v_ids,
			'width':800,
			'height':500,
			'title':'临时代理',
			'buttons':[
             {'text':'保存','action':doSingle,'isClose':false},
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialog =jyDialog(dialogStruct);
	dialog.open();
}
//单笔临时代理操作
function doSingle(){
	//序列化 新增页面的form表单数据
	var params=$(dialog.iframe.contentDocument.getElementById("addNewsFormData")).serialize();
	
	var dtoagentCollectorName = $(dialog.iframe.contentDocument.getElementById("dtoagentCollectorName")).val();
	
	if(isNull(dtoagentCollectorName)){
		jyDialog({"type":"info"}).alert("请选择分配对象！");
		return false;
	}
	
	
	var url=contextRootPath+'/laTAgent/insertLaTAgent';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//保存成功后，执行查询页面查询方法
			//jyDialog({"type":"success"}).alert(msg.msg);
        	var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		$("").newMsg({}).show(msg.msg);
        		queryData();
        		dialog.close();
        	}
  	});
}


//批量临时代理添加 事件
function toBatchInsertAgent(){
	
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择要代理的案件！");
		return;
	}
	

	var agents=iframe.iframeObj["table"].getSelectedObjs();
	for(var i=0;i<agents.length;i++){
		   if(agents[i].IS_AGENT=='Y'){
			   jyDialog({"type":"info"}).alert("合同号"+agents[i].CONTRACT_ID+'已经代理不能再做代理，请重新选择');  
		          return;
			}
		}

	var dialogStruct={
			'display':contextRootPath+'/laTAgent/prepareExecute/toBatch?ids='+v_ids,
			'width':800,
			'height':500,
			'title':'批量临时代理',
			'buttons':[
             {'text':'保存','action':batchInsertLaTAgent,'isClose':false},
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialog =jyDialog(dialogStruct);
	dialog.open();
}
//批量
function batchInsertLaTAgent(){

	var params=$(dialog.iframe.contentDocument.getElementById("addNewsFormData")).serialize();
	
	var dtoagentCollectorName = $(dialog.iframe.contentDocument.getElementById("dtoagentCollectorName")).val();
	
	
	if(isNull(dtoagentCollectorName)){
		jyDialog({"type":"info"}).alert("请选择分配对象！");
		return false;
	}
	
	var url=contextRootPath+'/laTAgent/batchInsertLaTAgent';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//保存成功后，执行查询页面查询方法
			//jyDialog({"type":"success"}).alert(msg.msg);
        	var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		$("").newMsg({}).show(msg.msg);
        		queryData();
        		dialog.close();
        	}
  	});

}


//修改页面 的 保存操作
function doUpdateFrom(){
	//序列化 新增页面的form表单数据
	
	var params=$(dialog.iframe.contentDocument.getElementById("addNewsFormData")).serialize();
	var url=contextRootPath+'/laTAgent/updateLaTAgent';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//保存成功后，执行查询页面查询方法
			//jyDialog({"type":"success"}).alert(msg.msg);
        	var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		$("").newMsg({}).show(msg.msg);
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		queryData();
        	}
  	});
}

//回收 事件 
function recyData(){
	
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待回收的案件！");
		return;
	}
	
	var agents=iframe.iframeObj["table"].getSelectedObjs();
	for(var i=0;i<agents.length;i++){
		   if(agents[i].IS_AGENT=='N'){
			   jyDialog({"type":"info"}).alert("合同号"+agents[i].CONTRACT_ID+'没有做代理不能回收，请重新选择');  
		          return;
			}
		}
	
	var url=contextRootPath+"/laTAgent/recyLaTAgent?ids="+v_ids;
	var params;
	
	//if(confirm("您确认要回收选择的案件吗？")){
	if(jyDialog({"type":"question"}).confirm("您确认要回收选择的案件吗？",function(){
		
		jyAjax(
				url,
				params,
				function(msg){
					//保存成功后，执行查询页面查询方法
					//jyDialog({"type":"success"}).alert(msg.msg);
		        	var v_status = msg.status;
		        	if(v_status.indexOf('ok') >-1){
		        		$("").newMsg({}).show(msg.msg);
		        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
		        		queryData();
		        	}
		  	});
    },"确认提示"));

}

function deleteData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待删除的数据！");
		return;
	}
	if(confirm("您确认要删除选择的数据吗？")){
        $.ajax({
            type:"POST",
            url:contextRootPath+"/laTAgent/deleteLaTAgent?ids="+v_ids,
            success:function(msg){
            	//jyDialog({"type":"success"}).alert(msg.msg);
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		$("").newMsg({}).show(msg.msg);
            		iframe.iframeObj["table"].removeSelectedRow();
            	}
            	
            	
            }
        });
    }
}




//查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/laTAgent/prepareExecute/toView?id='+vId,
			'width':800,
			'height':500,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}

//查看明细
function openDetail(appId){
	if (typeof(appId) == "undefined") { 
	   alert("进件号为空，无法查询！");
	   return ;
	}
	var dialogStruct={
			'display':contextRootPath+'/overdue/toDunCaseDetail?appId='+appId,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}