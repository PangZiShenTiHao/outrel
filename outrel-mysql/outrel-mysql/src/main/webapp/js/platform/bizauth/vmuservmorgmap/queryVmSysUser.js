//utf-8

//点击新增按钮 事件跳转至 新增页面
var dialogAddObj;

function toAddData(){
	var orgId=$("#orgId").val();
	var orgType=$("#orgType").val();
	var orgName=$("#orgName").val();
	
	var dialogStruct={
		'display':contextRootPath+'/vmuserVmorgMap/prepareExecute/toAdd?orgId='+orgId+'&orgType='+orgType+'&orgName='+orgName,
		'width':800,
		'height':500,
		'title':'新增',
		'buttons':[
         {'text':'保存','action':doAddFrom,'isClose':true},
		 {'text':'关闭','isClose':true}
		]
	};
	
	dialogAddObj =jyDialog(dialogStruct);
	dialogAddObj.open();
}
//新增页面的保存操作
function doAddFrom(){
	//序列化 新增页面的form表单数据
	var obj =dialogAddObj.getIframe();
	var params=obj.$("#addNewsFormData").serialize();
	var url=contextRootPath+'/vmuserVmorgMap/insertVmuserVmorgMap';
	
	var flag = validateCode();
	if(!flag) return;
	
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
        		queryData();
        	}
  	});
}

//校验重复性
function validateCode(){
	var obj = dialogAddObj.getIframe();
	var userIds = obj.$("#dtouserId").val();
	var orgId = obj.$("#dtoorgId").val();
    var orgType = obj.$("#orgType").val();
	
	var str= new Array();   
	  
	if(userIds == ""){
		$(window.top.body).newMsg({}).show("用户ID不能为空！");
		return;
	}
	var _valiURL = contextRootPath+'/vmuserVmorgMap/validateVmuserVmorgMap';
	var _next = true;
	$.ajax({
        type:"POST",
        dataType:"JSON",
        async:false,
        url:_valiURL+"?userId="+userIds+"&orgId="+orgId+"&orgType="+orgType,
        success:function(msg){
        	if(msg.msg !="")
              $("").newMsg({}).show(msg.msg);;
        	//$(window.top.body).newMsg({}).show(msg.msg);
        	var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        	}else{
        		_next=false;
        	}
        }
    });
	return _next;
}



//修改 事件
function toUpdateData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	//如果没有选中 数据则
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待修改的数据！");
		//alert("请选择待修改的数据！");
		return;
	}
	//如果选择多个 择提示
	if(v_ids.indexOf(",") > -1){
		jyDialog({"type":"info"}).alert("请选择一条数据！");
		//alert("请选择一条数据！");
		return;
	}

	var dialogStruct={
			'display':contextRootPath+'/vmuserVmorgMap/prepareExecute/toUpdate?id='+v_ids,
			'width':800,
			'height':500,
			'title':'修改',
			'buttons':[
             {'text':'保存','action':doUpdateFrom,'isClose':true},
			 {'text':'关闭','isClose':true}
			]
		};
		
	var dialogUpdate = jyDialog(dialogStruct).open();
}
//修改页面 的 保存操作
function doUpdateFrom(){
	//序列化 新增页面的form表单数据
	var params=$("#updateNewsFormData").serialize();
	var url=contextRootPath+'/vmuserVmorgMap/updateVmruleMapping';
	//通过ajax保存
	jyAjax(
		url,
		params,
		function(msg){
			//保存成功后，执行查询页面查询方法
			$("").newMsg({}).show(msg.msg);;
        	var v_status = msg.status;
        	if(v_status.indexOf('ok') >-1){
        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
        		queryData();
        	}
  	});
}
//删除 事件
function deleteData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	
	//如果没有选中 数据
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待删除的数据！");
		return;
	}
	
	//被选中的行对象
	var selectedObjs = iframe.iframeObj["table"].getSelectedObjs();
	var orgType = $("#orgType").val();//虚拟树类型
	
	var userIdsAndOrgIdsStr = "";//被选中行的userId#orgId，每行以,分隔
	var len = selectedObjs.length;
    for(var i=0 ; i<len; i++){
    	if(i < len-1){
    		userIdsAndOrgIdsStr += selectedObjs[i].userId+"#"+selectedObjs[i].orgId+",";
    	}
    	if(i == len-1){
    		userIdsAndOrgIdsStr += selectedObjs[i].userId+"#"+selectedObjs[i].orgId;
    	}
    }
	
	var params;
	jyDialog({"type":"question"}).confirm("您确认要删除选择的员工吗？",function(){
        var url=contextRootPath+"/vmuserVmorgMap/deleteVmuserVmorgMapByUserIdsAndOrgIds?userIdsAndOrgIdsStr="+encodeURIComponent(userIdsAndOrgIdsStr)+"&orgType="+orgType;
			//通过ajax保存
			jyAjax(
				url,
				params,
				function(msg){
					//保存成功后，执行查询页面查询方法
					$("").newMsg({}).show(msg.msg);
		        	var v_status = msg.status;
		        	if(v_status.indexOf('ok') >-1){
		        		//新增成功后 刷新页面 或 只查询 id为msg.data['id'] 的  数据
		        		queryData();
		        	}
		  	});
	   },"确认提示");
}

//刷新权限数据功能
function refreshData(){
	var v_ids = iframe.iframeObj["table"].getSelectedIds().join(",");
	
	var userids=iframe.iframeObj["table"].getSelectedObjs();
	var orgId=$("#orgId").val();
	var orgType=$("#orgType").val();
	
	var str="";
        var len=userids.length;
        for(var i=0;i<len;i++){
        	var str1=userids[i].userId;
        	if(i<len-1){
        		str+=str1+",";
        	}
        	if(i==len-1){
        		str+=str1;
        	}
        }
	
	//如果没有选中 数据
	if(v_ids == ""){
		jyDialog({"type":"info"}).alert("请选择待刷新的数据！");
		//alert("请选择待刷新的数据！");
		return;
	}
	var params;
	
	 jyDialog({"type":"question"}).confirm("您确认要刷新选择的员工的数据权限吗？",function(){
		 var url=contextRootPath+"/vmuserVmorgMap/refreshVmuserVmorgMap?userid="+str+"&orgId="+orgId+"&orgType="+orgType;
			//通过ajax保存
			jyAjax(
				url,
				params,
				function(msg){
					//刷新成功后，执行查询页面查询方法
					$("").newMsg({}).show(msg.msg);;
		        	var v_status = msg.status;
		        	if(v_status.indexOf('ok') >-1){
		        		//刷新成功后 刷新页面 
		        		queryData();
		        	}
		  	});
	   },"确认提示");
	
	
	
	/*if(confirm("您确认要刷新选择的员工的数据权限吗？")){
		var url=contextRootPath+"/vmuserVmorgMap/refreshVmuserVmorgMap?userid="+str+"&orgId="+orgId+"&orgType="+orgType;
		//通过ajax保存
		jyAjax(
			url,
			params,
			function(msg){
				//刷新成功后，执行查询页面查询方法
				$("").newMsg({}).show(msg.msg);;
	        	var v_status = msg.status;
	        	if(v_status.indexOf('ok') >-1){
	        		//刷新成功后 刷新页面 
	        		queryData();
	        	}
	  	});
    }*/
}


//查看明细
function viewData(vId){
	var dialogStruct={
			'display':contextRootPath+'/vmuserVmorgMap/prepareExecute/toView?id='+vId,
			'width':500,
			'height':300,
			'title':'查看明细',
			'buttons':[
			 {'text':'关闭','isClose':true}
			]
	};
		
	var dialogView = jyDialog(dialogStruct).open();
}


function cleanData(){
	var orgId=$("#orgId").val();
	var orgType=$("#orgType").val();
	var params;
	jyDialog({"type":"question"}).confirm("您确认要清理离职员工的数据权限吗？",function(){
		 var url=contextRootPath+"/vmuserVmorgMap/cleanVmuserVmorgMap?orgId="+orgId+"&orgType="+orgType;
			//通过ajax保存
			jyAjax(
				url,
				params,
				function(msg){
					//刷新成功后，执行查询页面查询方法
					$("").newMsg({}).show(msg.msg);;
		        	var v_status = msg.status;
		        	if(v_status.indexOf('ok') >-1){
		        		//刷新成功后 刷新页面 
		        		queryData();
		        	}
		  	});
	   },"确认提示");
}