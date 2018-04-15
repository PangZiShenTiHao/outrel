//utf-8
var dialogAddObj;
//点击新增按钮 事件跳转至 新增页面
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/vmauthRegisterInfo/prepareExecute/toAdd',
		'width':800,
		'height':500,
		'title':'新增',
		'buttons':[
         {'text':'保存','action':doAddFrom,'isClose':false},
		 {'text':'关闭','isClose':true}
		]
	};
	
	dialogAddObj =jyDialog(dialogStruct);
	dialogAddObj.open();
}
//新增页面的保存操作
function doAddFrom(){
	var obj = dialogAddObj.getIframe();
	//序列化 新增页面的form表单数据
	var params=obj.$("#addNewsFormData").serialize();
	var url=contextRootPath+'/vmauthRegisterInfo/insertVmauthRegisterInfo';
	
	//是否全部通过 校验
	var flag = checkIsNull(obj.$("#addNewsFormData")[0]);
	
	if(!flag) return;
	
	flag = valiCode();
	if(!flag) return;
	flag = valiName();
	if(!flag) return;
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//新增成功后，
			$(window.top.body).newMsg({}).show(msg.msg);
			var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		dialogAddObj.close();
        		queryData();
        	}
  	});
}
function valiCode(){
	var obj = dialogAddObj.getIframe();
	var _code = obj.$("#dtovmtreeCode").val();
	if(_code == ""){
		$(window.top.body).newMsg({}).show("虚拟树代码不能为空！");
		return;
	}
	var _valiURL = contextRootPath+'/vmauthRegisterInfo/validateVmauthRegisterInfo';
	var _next = true;
	$.ajax({
        type:"POST",
        dataType:"JSON",
        async:false,
        url:_valiURL+"?vmCode="+_code,
        success:function(msg){
        	if(msg.msg !="")
        	$(window.top.body).newMsg({}).show(msg.msg);
        	var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        	}else{
        		_next=false;
        	}
        }
    });
	return _next;
}
function valiName(){
	var obj = dialogAddObj.getIframe();
	var _name = obj.$("#dtovmtreeName").val();
	if(_name == ""){
		$(window.top.body).newMsg({}).show("虚拟树名称不能为空！");
		return;
	}
	var _valiURL = contextRootPath+'/vmauthRegisterInfo/validateVmauthRegisterInfo';
	var _next = true;
	$.ajax({
        type:"POST",
        dataType:"JSON",
        async:false,
        url:_valiURL+"?vmName="+_name,
        success:function(msg){
        	if(msg.msg !="")
        	$(window.top.body).newMsg({}).show(msg.msg);
        	var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        	}else{
        		_next=false;
        	}
        }
    });
	return _next;
}
//删除 事件
function deleteData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待删除的数据！");
		//alert("请选择待删除的数据！");
		return;
	}
	
	  jyDialog({"type":"question"}).confirm("您确认要删除选择的数据吗？",function(){
		  $.ajax({
	            type:"POST",
	            dataType:"JSON",
	            url:contextRootPath+"/vmauthRegisterInfo/deleteVmauthRegisterInfo?ids="+v_ids,
	            success:function(msg){
	            	 $("").newMsg({}).show(msg.msg);
	            	//$("").newMsg({}).show(msg.msg);;
	            	var v_status = msg.status;
	            	//删除成功后
	            	if(v_status.indexOf('ok') >-1){
	            		iframe.iframeObj["table"].removeSelectedRow();
	            	}
	            	
	            	
	            }
	        });
		   },"确认提示");
	
	/*if(confirm("您确认要删除选择的数据吗？")){
        $.ajax({
            type:"POST",
            dataType:"JSON",
            url:contextRootPath+"/vmauthRegisterInfo/deleteVmauthRegisterInfo?ids="+v_ids,
            success:function(msg){
            	 $("").newMsg({}).show(msg.msg);
            	//$("").newMsg({}).show(msg.msg);;
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		iframe.iframeObj["table"].removeSelectedRow();
            	}
            	
            	
            }
        });
    }*/
}
//查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/vmauthRegisterInfo/prepareExecute/toView?id='+vId,
			'width':800,
			'height':560,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}