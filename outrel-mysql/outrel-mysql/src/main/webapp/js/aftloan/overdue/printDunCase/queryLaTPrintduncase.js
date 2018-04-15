//utf-8
//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;
var dialogUpdateObj;
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/laTPrintduncase/prepareExecute/toAdd',
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
	var obj = dialogAddObj.getIframe();
	//序列化 新增页面的form表单数据
	var params=obj.$("#addNewsFormData").serialize();
	var url=contextRootPath+'/laTPrintduncase/insertLaTPrintduncase';
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
        	}
  	});
}
//打印
function doPrint(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待打印的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		alert("请选择一条数据！");
		return;
	}

	var dialogStruct={
			'display':contextRootPath+'/laTPrint/prepareExecute?operateData=toPrint&id='+v_ids,
			'width':900,
			'height':800,
			'title':'打印',
			'buttons':[
             /*{'text':'打印','action':printit,'isClose':true},
             {'text':'打印预览','action':printpreview,'isClose':true},
			 {'text':'关闭','isClose':true}*/
			]
		};
		
	dialogUpdate = jyDialog(dialogStruct);
	dialogUpdate.open();
}

//修改页面 的 保存操作
function doUpdateFrom(){
	var dunId = $("#dunid").val();
	var params={dunId:dunId};
	var url=contextRootPath+'/laTPrint/insertLaTPrintduncase';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//保存成功后，执行查询页面查询方法
        	var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		
        	}
  	});
}
//删除 事件
function deleteData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		alert("请选择待删除的数据！");
		return;
	}
	if(confirm("您确认要删除选择的数据吗？")){
        $.ajax({
            type:"POST",
            dataType:"JSON",
            url:contextRootPath+"/laTPrintduncase/deleteLaTPrintduncase?ids="+v_ids,
            success:function(msg){
            	alert(msg.msg);
            	var v_status = msg.status;
            	//删除成功后
            	if(v_status.indexOf('ok') >-1){
            		iframe.iframeObj["table"].removeSelectedRow();
            	}
            	
            	
            }
        });
    }
}
//查看明细
function viewData(obj){
	var v_ids = obj["ID"];
	var dialogStruct={
			'display':contextRootPath+'/laTPrint/prepareExecute?operateData=toView&dunId='+v_ids,
			'width':1100,
			'height':500,
			'title':'查看历史记录',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
		};
		
	dialogView = jyDialog(dialogStruct);
	dialogView.open();
}
