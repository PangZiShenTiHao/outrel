//utf-8
//点击新增按钮 事件跳转至 新增页面
function toAddData(){
	var dialogStruct={
		'display':contextRootPath+'/extSftzData/prepareExecute/toAdd',
		'width':800,
		'height':500,
		'title':'新增',
		'isIframe':'false',
		'buttons':[
         {'text':'保存','action':doAddFrom,'isClose':true},
		 {'text':'关闭','isClose':true}
		]
	};
	
	var dialogAdd =jyDialog(dialogStruct).open();
}
//新增页面的保存操作
function doAddFrom(){
	//序列化 新增页面的form表单数据
	var params=$("#addNewsFormData").serialize();
	var url=contextRootPath+'/extSftzData/insertExtSftzData';
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
        		queryData();
        	}
  	});
}

//更新台账
function updateInfo(){
	var jjCreateTime_start = $("input[name='jjCreateTime_start']").val();
	var jjCreateTime_end = $("input[name='jjCreateTime_end']").val();
	
	if("" == jjCreateTime_start || ""==jjCreateTime_end){
		alert("台账日期不能为空！");
		return;
	}
	var url =contextRootPath + "/extSftzData/insertListExtSftzData?jjCreateTime_start=" + jjCreateTime_start + "&jjCreateTime_end=" + jjCreateTime_end;
	jyAjax(
			url,
			"",
			function(msg){
				//新增成功后，
				alert(msg.msg);
				var v_status = msg.status;
	        	if(v_status.indexOf('ok') >-1){
	        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
	        		queryData();
	        	}
	  	});
}