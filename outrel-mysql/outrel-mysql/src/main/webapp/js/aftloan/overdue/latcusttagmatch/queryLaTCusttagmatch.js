//utf-8
var dialog;
//点击新增按钮 事件跳转至 新增页面
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/laTCusttagmatch/prepareExecute/toAdd',
		'width':800,
		'height':500,
		'title':'新增',
		'buttons':[
         {'text':'保存','action':doAddFrom,'isClose': false},
		 {'text':'关闭','isClose':true}
		]
	};
	
	
	dialog =jyDialog(dialogStruct);
	dialog.open();
}

//新增页面的保存操作
function doAddFrom(){
	//序列化 新增页面的form表单数据 
	var params=$(dialog.iframe.contentDocument.getElementById("addNewsFormData")).serialize();
	if(!checkForm()){
        return ;
    }
	
	var url=contextRootPath+'/laTCusttagmatch/insertLaTCusttagmatch';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			//jyDialog({"type":"success"}).alert(msg.msg);
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		$("").newMsg({}).show(msg.msg);
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		queryData();
        		dialog.close();
        	}
  	});
}
//修改 事件
function toUpdateData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待修改的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"info"}).alert("请选择一条数据！");
		return;
	}

	var dialogStruct={
			'display':contextRootPath+'/laTCusttagmatch/prepareExecute/toUpdate?id='+v_ids,
			'width':800,
			'height':500,
			'title':'修改',
			'buttons':[
             {'text':'保存','action':doUpdateFrom,'isClose':false},
			 {'text':'关闭','isClose':true}
			]
		};
		
	
	dialog =jyDialog(dialogStruct);
	dialog.open();
}
//修改页面 的 保存操作
function doUpdateFrom(){
	//序列化 新增页面的form表单数据
	
	var params=$(dialog.iframe.contentDocument.getElementById("updateNewsFormData")).serialize();
	if(!checkForm()){
        return ;
    }
	
	var url=contextRootPath+'/laTCusttagmatch/updateLaTCusttagmatch';
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
//删除 事件
function deleteData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待删除的数据！");
		return;
	}
	
	var url=contextRootPath+"/laTCusttagmatch/deleteLaTCusttagmatch?ids="+v_ids;
	var params;
	
	if(jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
        jyAjax(
        		url,
        		params,
        		function(msg){
        			//保存成功后，执行查询页面查询方法
        			
                	var v_status = msg.status;
                	if(v_status.indexOf('ok') >-1){
                		$("").newMsg({}).show(msg.msg);
                		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
                		queryData();
                		//iframe.iframeObj["table"].removeSelectedRow();
                	}
          	});
	},"确认提示"));
}
//查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/laTCusttagmatch/prepareExecute/toView?id='+vId,
			'width':800,
			'height':500,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	
	var dialogView = jyDialog(dialogStruct).open();
}



function checkForm(){
	//序列化 新增页面的form表单数据
	 var dtocollWay = $(dialog.iframe.contentDocument.getElementById("dtocollWay")).val();
	    
	    var dtocontacts = $(dialog.iframe.contentDocument.getElementById("dtocontacts")).val();
	    
	    var dtoconnResult = $(dialog.iframe.contentDocument.getElementById("dtoconnResult")).val();
	    
	    var dtominNum = $(dialog.iframe.contentDocument.getElementById("dtominNum")).val();
	    
	    var dtomaxNum = $(dialog.iframe.contentDocument.getElementById("dtomaxNum")).val();
	    
	    var dtocaseCode = $(dialog.iframe.contentDocument.getElementById("dtocaseCode")).val();
	    
		
		if(isNull(dtocollWay)){
			jyDialog({"type":"info"}).alert("催收方式不能为空，请选择催收方式！");
			return;
		}
		
		if(isNull(dtocontacts)){
			jyDialog({"type":"info"}).alert("联系人不能为空，请选择联系人！");
			return;
		}
		
		if(isNull(dtoconnResult)){
			jyDialog({"type":"info"}).alert("联络结果不能为空，请选择联络结果！");
			return;
		}
		
		if(isNull(dtominNum)){
			jyDialog({"type":"info"}).alert("最小次数不能为空，请输入最小次数！");
			return;
		}
		
		if(isNull(dtomaxNum)){
			jyDialog({"type":"info"}).alert("最大次数不能为空，请输入最大次数！");
			return;
		}
		
		if(isNull(dtocaseCode)){
			jyDialog({"type":"info"}).alert("客户标签不能为空，请选择客户标签！");
			return;
		}
       
    return true;
}
